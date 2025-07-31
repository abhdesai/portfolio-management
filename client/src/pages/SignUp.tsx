import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link,
  Autocomplete
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { clientDebug, clientTechDebug, clientError, clientWarn } from '../utils/debug';

const defaultAvatar = '/default-avatar.png';

interface AddressSuggestion {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    neighbourhood?: string;
    town?: string;
    village?: string;
    county?: string;
  };
}

interface AddressFields {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const initialForm = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const SignUp: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Address autocomplete state
  const [addressFields, setAddressFields] = useState<AddressFields>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [addressSearchValue, setAddressSearchValue] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/\d/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)' };
    }
    return { isValid: true, message: '' };
  };

  // Real-time password strength indicator
  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (!password) return { strength: '', color: 'inherit' };
    
    const validation = validatePassword(password);
    if (validation.isValid) {
      return { strength: 'Strong', color: '#4caf50' };
    }
    
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];
    
    const passedChecks = checks.filter(Boolean).length;
    
    if (passedChecks <= 2) return { strength: 'Weak', color: '#f44336' };
    if (passedChecks <= 3) return { strength: 'Fair', color: '#ff9800' };
    return { strength: 'Good', color: '#2196f3' };
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 8) return 'Username must be at least 8 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Valid email is required';
      case 'phone':
        if (!value.trim()) {
          return 'Phone number is required';
        }
        // Allow international phone numbers with optional +, spaces, dashes, and parentheses
        const phoneRegex = /^[\+]?[0-9\-\s\(\)]{7,20}$/;
        return phoneRegex.test(value) ? '' : 'Valid phone number is required';
      case 'password':
        if (!value.trim()) {
          return 'Password is required';
        }
        const passwordValidation = validatePassword(value);
        return passwordValidation.isValid ? '' : passwordValidation.message;
      case 'confirmPassword':
        return value === form.password ? '' : 'Passwords do not match';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/png' && file.type !== 'image/svg+xml') {
      showNotification('Only PNG and SVG files are allowed.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showNotification('File size must be less than 5MB.', 'error');
      return;
    }

    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const searchAddress = async (query: string) => {
    if (query.length < 2) {
      setAddressSuggestions([]);
      return;
    }
    setAddressLoading(true);
    try {
      const protocol = window.location.protocol.replace(':', '');
      const port = window.location.port;
      const clientMode = protocol === 'https' ? 'https' : 'http';
      const url = `/api/address/search?q=${encodeURIComponent(query)}&limit=7`;
      
      clientDebug(`[CLIENT] Protocol: ${protocol}, Port: ${port}, Mode: ${clientMode}`);
      clientDebug(`[CLIENT] API URL: ${url}`);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'X-Client-Mode': clientMode
        }
      });
      
      clearTimeout(timeoutId);
      
      clientTechDebug('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 503) {
          clientWarn('Address service temporarily unavailable');
          setAddressSuggestions([]);
          return;
        }
        throw new Error(`Address search failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      clientTechDebug('Address search results:', data);
      clientTechDebug('Number of results:', data?.length || 0);
      
      if (!Array.isArray(data)) {
        clientError('Unexpected response format:', data);
        setAddressSuggestions([]);
        return;
      }
      
      setAddressSuggestions(data);
    } catch (error: any) {
      clientError('Address search error:', error);
      if (error.name === 'AbortError') {
        clientWarn('Address search timed out');
      }
      // Don't show error notification for address search failures
      setAddressSuggestions([]);
    } finally {
      setAddressLoading(false);
    }
  };

  const handleAddressSearch = (value: string) => {
    setAddressSearchValue(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.length >= 2) {
      // Add a small delay to prevent too many requests
      searchTimeoutRef.current = setTimeout(() => {
        searchAddress(value);
        setAddressOpen(true);
      }, 300);
    } else {
      setAddressSuggestions([]);
      setAddressOpen(false);
    }
  };

  const handleAddressSelect = (suggestion: AddressSuggestion | null) => {
    if (suggestion) {
      const address = suggestion.address || {};
      const newAddressFields = {
        street: `${address.house_number || ''} ${address.road || ''}`.trim(),
        city: address.city || address.town || address.village || address.suburb || '',
        state: address.state || address.county || '',
        zipCode: address.postcode || '',
        country: address.country || ''
      };
      setAddressFields(newAddressFields);
      setAddressSuggestions([]);
      setAddressSearchValue('');
    }
  };

  const handleAddressFieldChange = (field: keyof AddressFields, value: string) => {
    setAddressFields(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate all form fields
    Object.keys(form).forEach(field => {
      const error = validateField(field, form[field as keyof typeof form]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification('Please fix the validation errors.', 'error');
      return;
    }
    
    setLoading(true);
    try {
      // Create FormData for the request (handles both file and text data)
      const formDataToSend = new FormData();
      // Add text fields
      Object.keys(form).forEach(key => {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, form[key as keyof typeof form]);
        }
      });
      // Add address fields
      Object.keys(addressFields).forEach(key => {
        formDataToSend.append(key, addressFields[key as keyof typeof addressFields]);
      });
      // Add avatar file if selected
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }
      // Use fetch instead of apiCall for multipart/form-data
      const res = await fetch('/auth/signup', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Sign up failed');
      }
      if (data.requiresVerification) {
        showNotification('Registration successful! Please check your email to verify your account before logging in.', 'success');
        navigate('/login');
      } else {
        showNotification('Registration successful! Please log in.', 'success');
        navigate('/login');
      }
    } catch (err: any) {
      showNotification(err.message || 'Sign up failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f4f6f8 0%, #e3f2fd 100%)',
      py: 4
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 4
      }}>
        <img src="../logo.svg" alt="App Logo" style={{ width: 80, height: 80, marginBottom: 16 }} />
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            letterSpacing: 1,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Stock Portfolio and Returns Management
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Professional portfolio tracking and analysis platform
        </Typography>
      </Box>

      <Box sx={{ p: 4, maxWidth: 600, width: '100%', mx: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Create Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join our portfolio management platform to track and analyze your investments
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="First Name *"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                required
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
              <TextField
                label="Last Name *"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                required
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
            </Box>
            
            <TextField
              label="Username *"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username || 'Username must be at least 8 characters (letters, numbers, underscores only)'}
              fullWidth
              required
              variant="outlined"
              sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
            />
            
            <TextField
              label="Email Address *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || 'We\'ll use this for important account notifications'}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 0.5 }}
            />
            
            <TextField
              label="Phone Number *"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone || 'Enter your phone number (e.g., +1-555-123-4567)'}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 0.5 }}
            />

            {/* Address Section */}
            <Typography variant="h6" sx={{ mt: 1, mb: 0.5, fontWeight: 600 }}>
              Address Information
            </Typography>

            <Autocomplete
              freeSolo
              options={addressSuggestions}
              getOptionLabel={(option) => 
                typeof option === 'string' ? option : option.display_name
              }
              inputValue={addressSearchValue}
              onInputChange={(_, newValue) => handleAddressSearch(newValue)}
              onChange={(_, newValue) => handleAddressSelect(newValue as AddressSuggestion)}
              open={addressOpen}
              onOpen={() => setAddressOpen(true)}
              onClose={() => setAddressOpen(false)}
              loading={addressLoading}
              filterOptions={(x) => x} // Disable built-in filtering
              noOptionsText={
                addressSearchValue.length >= 2 
                  ? addressLoading 
                    ? "Searching..." 
                    : "No addresses found. Try a different search term."
                  : "Start typing to search for your address"
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Address"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 0.5 }}
                  helperText={
                    addressSearchValue.length >= 2 
                      ? addressLoading 
                        ? "Searching for addresses..." 
                        : addressSuggestions.length === 0 
                          ? "No results found. You can still type your address manually below."
                          : `${addressSuggestions.length} address(es) found`
                      : "Start typing to search for your address"
                  }
                />
              )}
            />
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              💡 Tip: If address search doesn't work, you can manually enter your address in the fields below.
            </Typography>

            <TextField
              label="Street Address"
              value={addressFields.street}
              onChange={(e) => handleAddressFieldChange('street', e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 0.5 }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="City"
                value={addressFields.city}
                onChange={(e) => handleAddressFieldChange('city', e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
              <TextField
                label="State/Province"
                value={addressFields.state}
                onChange={(e) => handleAddressFieldChange('state', e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Zip/Postal Code"
                value={addressFields.zipCode}
                onChange={(e) => handleAddressFieldChange('zipCode', e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
              <TextField
                label="Country"
                value={addressFields.country}
                onChange={(e) => handleAddressFieldChange('country', e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
            </Box>

            <Typography variant="h6" sx={{ mt: 1, mb: 0.5, fontWeight: 600 }}>
              Security
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Password *"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={`${errors.password || 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'} ${getPasswordStrength(form.password).strength ? `• Strength: ${getPasswordStrength(form.password).strength}` : ''}`}
                FormHelperTextProps={{
                  style: { color: errors.password ? '#d32f2f' : getPasswordStrength(form.password).color }
                }}
                fullWidth
                required
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
              <TextField
                label="Confirm Password *"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
                required
                variant="outlined"
                sx={{ flex: 1, minWidth: 200, mb: 0.5 }}
              />
            </Box>

            <Typography variant="h6" sx={{ mt: 1, mb: 0.5, fontWeight: 600 }}>
              Profile Picture (Optional)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
              {/* The Avatar component was removed from imports, so this will be commented out */}
              {/*
              <Avatar src={preview || defaultAvatar} sx={{ width: 64, height: 64 }} />
              */}
              <Button variant="outlined" component="label">
                Upload Avatar (PNG/SVG)
                <input type="file" accept="image/png,image/svg+xml" hidden onChange={handleAvatarChange} />
              </Button>
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                mt: 1
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component="button" onClick={() => navigate('/login')} sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp; 