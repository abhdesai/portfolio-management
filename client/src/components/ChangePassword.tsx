import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNotification } from '../contexts/NotificationContext';
import apiCall from '../utils/api';
import { clientError } from '../utils/debug';

interface ChangePasswordProps {
  open: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

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
      case 'currentPassword':
        return value.trim() ? '' : 'Current password is required';
      case 'newPassword':
        if (!value.trim()) {
          return 'New password is required';
        }
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) {
          return passwordValidation.message;
        }
        if (value === formData.currentPassword) {
          return 'New password must be different from current password';
        }
        return '';
      case 'confirmPassword':
        if (!value.trim()) {
          return 'Please confirm your new password';
        }
        if (value !== formData.newPassword) {
          return 'Passwords do not match';
        }
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        showNotification('You must be logged in to change your password', 'error');
        return;
      }

      const res = await apiCall('/auth/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }
      });

      if (res.error) {
        showNotification(res.error.message || 'Failed to change password', 'error');
      } else {
        showNotification('Password changed successfully!', 'success');
        // Reset form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({});
        onClose();
      }
    } catch (error: any) {
      clientError('Change password error:', error);
      showNotification('An error occurred while changing password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Change Password</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your current password and choose a new password. Your new password must be at least 8 characters long with uppercase, lowercase, number, and special character.
          </Typography>
          
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            error={!!errors.newPassword}
            helperText={`${errors.newPassword || 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'} ${getPasswordStrength(formData.newPassword).strength ? `• Strength: ${getPasswordStrength(formData.newPassword).strength}` : ''}`}
            FormHelperTextProps={{
              style: { color: errors.newPassword ? '#d32f2f' : getPasswordStrength(formData.newPassword).color }
            }}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
            required
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Changing Password...' : 'Change Password'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassword; 