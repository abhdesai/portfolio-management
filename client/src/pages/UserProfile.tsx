import React, { useState, useRef } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';
import defaultAvatar from '../default-avatar.png';
import { stringAvatar } from '../utils/avatar';
import ChangePassword from '../components/ChangePassword';
import { clientDebug, clientTechDebug, clientError, clientWarn } from '../utils/debug';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  avatarUrl: string | null;
  role: string;
}

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

const UserProfile = ({ user, onUserUpdate }: { user: User; onUserUpdate?: (user: User) => void }) => {
  // Get address fields from user object
  const getAddressFields = (): AddressFields => {
    return {
      street: user?.street || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      country: user?.country || ''
    };
  };

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [addressFields, setAddressFields] = useState<AddressFields>(
    getAddressFields()
  );
  const [addressSearchValue, setAddressSearchValue] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl || null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const { showNotification } = useNotification();
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value.trim() && emailRegex.test(value) ? '' : 'Valid email is required';
      case 'phone':
        if (!value.trim()) {
          return 'Phone number is required';
        }
        // Allow international phone numbers with optional +, spaces, dashes, and parentheses
        const phoneRegex = /^[\+]?[0-9\-\s\(\)]{7,20}$/;
        return phoneRegex.test(value) ? '' : 'Valid phone number is required';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setSelectedFile(file);
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
      // Logging for traceability (optional)
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
        clientError(`Address search failed: ${response.status} ${response.statusText}`);
        setAddressSuggestions([]);
        return;
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
      // Parse OpenStreetMap address components
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
      setAddressSearchValue(''); // Clear the search field after selection
    }
  };

  const handleAddressFieldChange = (field: keyof AddressFields, value: string) => {
    setAddressFields(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showNotification('Please fix the validation errors.', 'error');
      return;
    }

    setLoading(true);

    try {
      // Create FormData for the request (handles both file and text data)
      const formDataToSend = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof typeof formData]);
      });
      
      // Add address fields
      formDataToSend.append('street', addressFields.street);
      formDataToSend.append('city', addressFields.city);
      formDataToSend.append('state', addressFields.state);
      formDataToSend.append('zipCode', addressFields.zipCode);
      formDataToSend.append('country', addressFields.country);
      
      // Add avatar file if selected
      if (selectedFile) {
        formDataToSend.append('avatar', selectedFile);
      }

      // Debug: Log what we're sending
      clientDebug('Sending profile update:', {
        formData,
        addressFields,
        hasAvatar: !!selectedFile
      });

      // Update profile (including avatar if provided)
      const updateResponse = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        clientError('Profile update error:', {
          status: updateResponse.status,
          statusText: updateResponse.statusText,
          errorData
        });
        throw new Error(errorData.message || `Failed to update profile (${updateResponse.status})`);
      }

      const updatedUser = await updateResponse.json();
      
      showNotification('Profile updated successfully!', 'success');
      setSelectedFile(null);
      setPreview(null);
      setAvatar(updatedUser.avatarUrl);
      
      // Update the user object in parent component if needed
      if (typeof user === 'object') {
        Object.assign(user, updatedUser);
      }

      // Update global user state and sessionStorage
      onUserUpdate?.(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));

    } catch (err: any) {
      showNotification(err.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = () => {
    return (
      formData.firstName !== user?.firstName ||
      formData.lastName !== user?.lastName ||
      formData.email !== user?.email ||
      formData.phone !== user?.phone ||
      addressFields.street !== user?.street ||
      addressFields.city !== user?.city ||
      addressFields.state !== user?.state ||
      addressFields.zipCode !== user?.zipCode ||
      addressFields.country !== user?.country ||
      selectedFile !== null
    );
  };

  return (
    <Box sx={{ 
      width: '100%',
      padding: '0',
      margin: '0',
      boxSizing: 'border-box'
    }}>
      {/* White box container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: { xs: 1, sm: 2, md: 4 },
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'left', width: '100%', color: '#2962FF', fontWeight: 700 }}>User Profile</Typography>
        
        <Box sx={{ width: '100%' }}>
          {/* Avatar Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 4 }}>
            <Avatar
              src={preview || avatar || defaultAvatar}
              alt={`${user?.firstName} ${user?.lastName}`}
              sx={{ width: 120, height: 120, mb: 2 }}
            >
              {!avatar && !preview && stringAvatar(`${user?.firstName} ${user?.lastName}`)}
            </Avatar>
            
            <Button variant="contained" component="label" sx={{ mb: 1 }}>
              Upload Avatar (PNG/SVG)
              <input type="file" accept="image/png,image/svg+xml" hidden onChange={handleFileChange} />
            </Button>
            
            {preview && (
              <Typography variant="caption" color="text.secondary">
                Preview - Click Save to upload
              </Typography>
            )}
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
            />
            
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              required
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
            
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone || 'Required - international format recommended (e.g., +1-555-123-4567)'}
              required
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
            
            {/* Address Search */}
            <Autocomplete
              freeSolo
              options={addressSuggestions}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                return option.display_name || '';
              }}
              loading={addressLoading}
              inputValue={addressSearchValue}
              onInputChange={(_, value) => handleAddressSearch(value)}
              onChange={(_, value) => {
                if (typeof value === 'string' || value === null) {
                  handleAddressSelect(null);
                } else {
                  handleAddressSelect(value);
                }
              }}
              open={addressOpen}
              onOpen={() => setAddressOpen(true)}
              onClose={() => setAddressOpen(false)}
              filterOptions={(x) => x} // Disable built-in filtering
              noOptionsText={
                addressSearchValue.length >= 2 
                  ? addressLoading 
                    ? "Searching..." 
                    : "No addresses found. Try a different search term."
                  : "Start typing to search for your address"
              }
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Address"
                  variant="outlined"
                  fullWidth
                  helperText={
                    addressSearchValue.length >= 2 
                      ? addressLoading 
                        ? "Searching for addresses..." 
                        : addressSuggestions.length === 0 
                          ? "No results found. You can still type your address manually below."
                          : `${addressSuggestions.length} address(es) found`
                      : "Start typing to search for your address"
                  }
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {addressLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            
            {/* Address Fields */}
            <TextField
              fullWidth
              label="Street Address"
              value={addressFields.street}
              onChange={(e) => handleAddressFieldChange('street', e.target.value)}
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
            
            <TextField
              fullWidth
              label="City"
              value={addressFields.city}
              onChange={(e) => handleAddressFieldChange('city', e.target.value)}
            />
            
            <TextField
              fullWidth
              label="State/Province"
              value={addressFields.state}
              onChange={(e) => handleAddressFieldChange('state', e.target.value)}
            />
            
            <TextField
              fullWidth
              label="ZIP/Postal Code"
              value={addressFields.zipCode}
              onChange={(e) => handleAddressFieldChange('zipCode', e.target.value)}
            />
            
            <TextField
              fullWidth
              label="Country"
              value={addressFields.country}
              onChange={(e) => handleAddressFieldChange('country', e.target.value)}
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !hasChanges()}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            
            {hasChanges() && (
              <Button
                variant="outlined"
                onClick={() => {
                  setFormData({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    phone: user?.phone || ''
                  });
                  setAddressFields(getAddressFields());
                  setSelectedFile(null);
                  setPreview(null);
                  setErrors({});
                }}
              >
                Reset
              </Button>
            )}
            
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setChangePasswordOpen(true)}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Change Password Dialog */}
      <ChangePassword
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </Box>
  );
};

export default UserProfile; 