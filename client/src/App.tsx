import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';
import Administration from './pages/Administration';
import AdministrationUser from './pages/AdministrationUser';
import UserProfile from './pages/UserProfile';
import MainNav from './components/MainNav';
import { NotificationProvider } from './contexts/NotificationContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { clientStartup } from './utils/debug';
import SimpleLightweightChart from './components/SimpleLightweightChart';
import AdminDashboard from './pages/AdminDashboard';

function PortfolioProviderWrapper() {
  return (
    <PortfolioProvider>
      <Outlet />
    </PortfolioProvider>
  );
}

function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const u = sessionStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const navigate = useNavigate();
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  // Log client configuration on app load
  useEffect(() => {
    clientStartup('\n' + '='.repeat(60));
    clientStartup('🚀 CLIENT APPLICATION STARTED');
    clientStartup('='.repeat(60));
    clientStartup(`🌐 Protocol: ${window.location.protocol}`);
    clientStartup(`🔒 HTTPS Mode: ${window.location.protocol === 'https:'}`);
    clientStartup(`📱 Port: ${window.location.port}`);
    clientStartup(`📍 URL: ${window.location.href}`);
    clientStartup(`🔧 Environment: ${process.env.NODE_ENV}`);
    clientStartup('='.repeat(60) + '\n');
  }, []);

  // Auto-logout after 20 minutes of inactivity
  useEffect(() => {
    if (!token) return;
    const resetTimer = () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(() => {
        setToken('');
        setUser(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        // Clear remembered username (security: prevent username leakage between users)
        sessionStorage.removeItem('rememberedUsername');
        navigate('/login');
        window.location.reload();
      }, 20 * 60 * 1000); // 20 minutes
    };
    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [token, navigate]);

  const handleLogin = (token: string, user: any) => {
    setToken(token);
    setUser(user);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    
    // Dispatch custom event to notify PortfolioProvider
    window.dispatchEvent(new Event('authChange'));
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Clear remembered username (security: prevent username leakage between users)
    sessionStorage.removeItem('rememberedUsername');
    
    // Dispatch custom event to notify PortfolioProvider
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/login');
  };

  return (
    <NotificationProvider>
      <Container maxWidth="xl">
        {token && user && <MainNav user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={
            token ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/signup" element={
            token ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} /> : <SignUp />
          } />
          <Route path="/forgot-password" element={
            token ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} /> : <ForgotPassword />
          } />
          <Route path="/reset-password" element={
            token ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} /> : <ResetPassword />
          } />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* User routes wrapped in a single PortfolioProvider */}
          {token && user && user.role !== 'admin' && (
            <Route element={<PortfolioProviderWrapper />}>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/portfolios" element={<Portfolios />} />
            </Route>
          )}

          <Route path="/admin" element={
            token
              ? (user?.role === 'admin'
                  ? <Administration />
                  : <AdministrationUser />)
              : <Navigate to="/login" />
          } />

          {/* Make /profile available to both admin and user */}
          <Route path="/profile" element={
            token ? <UserProfile user={user} onUserUpdate={setUser} /> : <Navigate to="/login" />
          } />
          <Route path="/test" element={<SimpleLightweightChart />} />
          {/* Catch-all route for frontend routes only - exclude API routes */}
          <Route path="*" element={
            (() => {
              const path = window.location.pathname;
              // Don't redirect API routes, metrics, docs, or health endpoints
              if (path.startsWith('/api/') || 
                  path === '/metrics' || 
                  path === '/api-docs' || 
                  path === '/api-docs/' || 
                  path === '/' || 
                  path === '/test') {
                return null; // Let the proxy handle these
              }
              // Redirect other frontend routes
              return <Navigate to={token ? (user?.role === 'admin' ? '/admin' : '/dashboard') : '/login'} />;
            })()
          } />
        </Routes>
      </Container>
    </NotificationProvider>
  );
}

export default App;
