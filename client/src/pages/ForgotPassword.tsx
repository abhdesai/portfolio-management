import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Link, Alert } from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';
import apiCall from '../utils/api';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'request' | 'confirmation'>('request');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string }>({});
  const { showNotification } = useNotification();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid for submission
  const isFormValid = (): boolean => {
    return username.trim() !== '' && 
           email.trim() !== '' && 
           validateEmail(email) && 
           Object.keys(errors).length === 0;
  };

  // Handle field validation
  const handleFieldChange = (field: 'username' | 'email', value: string) => {
    const newErrors = { ...errors };
    
    if (field === 'username') {
      setUsername(value);
      if (!value.trim()) {
        newErrors.username = 'Username is required';
      } else {
        delete newErrors.username;
      }
    }
    
    if (field === 'email') {
      setEmail(value);
      if (!value.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }
    
    setErrors(newErrors);
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      showNotification('Please fill in all required fields with valid information', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const res = await apiCall('/auth/forgot-password', {
        method: 'POST',
        data: { username, email }
      });
      
      // Always show success message regardless of response for security
      // Don't reveal whether the user exists or not
      showNotification('If a matching username and email combination is found, a password reset email has been sent. Please check your inbox.', 'success');
      setStep('confirmation');
    } catch (err: any) {
      showNotification('An error occurred. Please try again.', 'error');
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', mx: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
          {step === 'request' ? 'Forgot Password' : 'Check Your Email'}
        </Typography>
        
        {step === 'request' ? (
          <form onSubmit={handleRequest}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Enter your username and email address. If a matching combination is found, a password reset email will be sent to your email address.
            </Alert>
            
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              margin="normal"
              required
              variant="outlined"
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              margin="normal"
              required
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading || !isFormValid()}
              sx={{ mt: 3, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Send Reset Email'}
            </Button>
          </form>
        ) : (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We've sent a password reset email to <strong>{email}</strong>.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please check your email inbox and click the reset link to continue with password reset.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                If you don't see the email, please check your spam folder.
              </Typography>
            </Alert>
            
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={() => setStep('request')}
              sx={{ mb: 2 }}
            >
              Try Different Email
            </Button>
          </Box>
        )}
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Link href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Back to Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword; 