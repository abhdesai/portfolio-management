import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Link } from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';
import apiCall from '../utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Pre-fill token from URL parameters
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

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

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      showNotification(passwordValidation.message, 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await apiCall('/auth/reset-password', {
        method: 'POST',
        data: { token, newPassword }
      });
      
      if (res.error) {
        throw new Error(res.error.message || 'Reset failed');
      }
      showNotification('Password reset successful! Please log in.', 'success');
      navigate('/login');
    } catch (err: any) {
      showNotification(err.message || 'Reset failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Reset Password</Typography>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <form onSubmit={handleReset}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="New Password" 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              fullWidth 
              required 
              helperText={`Password must be at least 8 characters with uppercase, lowercase, number, and special character. ${getPasswordStrength(newPassword).strength ? `Strength: ${getPasswordStrength(newPassword).strength}` : ''}`}
              FormHelperTextProps={{
                style: { color: getPasswordStrength(newPassword).color }
              }}
            />
            <TextField 
              label="Confirm New Password" 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              fullWidth 
              required 
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
              {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
            <Link component="button" onClick={() => navigate('/login')} sx={{ mt: 1 }}>
              Back to Login
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword; 