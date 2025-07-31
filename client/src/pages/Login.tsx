import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, FormControlLabel, Checkbox, Box, Card } from '@mui/material';
import logo from '../logo.svg';
import apiCall from '../utils/api';
import { useNotification } from '../contexts/NotificationContext';
import { clientDebug, clientError } from '../utils/debug';

const REMEMBERED_USERNAME_KEY = 'rememberedUsername';

const Login = ({ onLogin }: { onLogin: (token: string, user: any) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    // Note: We can't make this user-specific on mount since we don't know the user yet
    // This is a limitation of the "remember me" feature
    // For now, we'll use a generic key but clear it on logout
    const remembered = sessionStorage.getItem(REMEMBERED_USERNAME_KEY);
    if (remembered) {
      setUsername(remembered);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clientDebug('Attempting login with username:', username);
    
    try {
      clientDebug('Making POST request to /auth/login');
      const res = await apiCall('/auth/login', {
        method: 'POST',
        data: { username, password }
      });
      
      if (res.error) {
        throw new Error(res.error.message || 'Login failed');
      }
      
      clientDebug('Login response:', res.data);
      
      onLogin(res.data.token, res.data.user);
      if (remember) {
        sessionStorage.setItem(REMEMBERED_USERNAME_KEY, username);
      } else {
        sessionStorage.removeItem(REMEMBERED_USERNAME_KEY);
      }
    } catch (err: any) {
      clientError('Login error:', err);
      clientError('Error response:', err.response);
      clientError('Error message:', err.message);
      
      let errorMessage = 'Login failed';
      if (err.response) {
        // Server responded with error status
        const responseData = err.response.data;
        if (responseData?.requiresVerification) {
          errorMessage = 'Please verify your email address before logging in. Check your inbox for the verification link.';
        } else {
          errorMessage = responseData?.message || `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check if the backend is running.';
      } else {
        // Something else happened
        errorMessage = err.message || 'Login failed';
      }
      
      showNotification(errorMessage, 'error');
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
      
      <Card elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', mx: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access your portfolio dashboard
          </Typography>
        </Box>
        
        {/* Content continues below */}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoComplete="username"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoComplete="current-password"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} color="primary" />}
            label="Remember me"
            sx={{ mb: 3 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            Sign In
          </Button>
        </form>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Don't have an account?{' '}
            <a href="/signup" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
              Sign Up
            </a>
          </Typography>
          <Typography variant="body2">
            <a href="/forgot-password" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
              Forgot Password?
            </a>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Login; 