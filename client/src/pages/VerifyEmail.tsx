import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import apiCall from '../utils/api';
import logo from '../logo.svg';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Only use token from URL, no username/email
  const token = searchParams.get('token');

  useEffect(() => {
    // Always reset state on token change
    setLoading(true);
    setError(null);
    setVerified(false);
    if (!token) {
      setLoading(false);
      setError('Invalid verification link. Please check your email for the correct link.');
      return;
    }
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const res = await apiCall('/auth/verify-email', {
        method: 'POST',
        data: { token }
      });
      if (res.error) {
        throw new Error(res.error.message || 'Verification failed');
      }
      const data = res.data;
      setError(null);
      if (data.alreadyVerified || (data.message && data.message.includes('already verified'))) {
        setVerified(true);
        showNotification('Email is already verified! You can log in.', 'success');
      } else if (data.verified || data.message.includes('successfully')) {
        setVerified(true);
        showNotification('Email verified successfully! You can now log in.', 'success');
      } else {
        setVerified(true);
        showNotification('Email verification completed!', 'success');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
      showNotification(err.message || 'Verification failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
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
        <img src={logo} alt="App Logo" style={{ width: 80, height: 80, marginBottom: 16 }} />
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
      
      <Card elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%', mx: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Email Verification
          </Typography>
          
          {loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="body1">
                Verifying your email address...
              </Typography>
            </Box>
          )}

          {/* Show error OR success, never both */}
          {!loading && error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && verified && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Alert severity="success" sx={{ width: '100%' }}>
                Your email has been successfully verified!
              </Alert>
              <Typography variant="body1" color="text.secondary">
                Your account is now active and you can log in to start managing your portfolios.
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleLogin}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                Go to Login
              </Button>
            </Box>
          )}

          {!loading && !verified && !error && (
            <Typography variant="body1" color="text.secondary">
              Processing verification...
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default VerifyEmail; 