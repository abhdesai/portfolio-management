import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

const MainNav = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define navigation items based on user role
  const navItems = user?.role === 'admin' 
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'User Management', path: '/admin' },
        { label: 'User Profile', path: '/profile' },
        { label: 'Test', path: '/test' },
      ]
    : [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Portfolios', path: '/portfolios' },
        { label: 'Administration', path: '/admin' },
        { label: 'User Profile', path: '/profile' },
        { label: 'Test', path: '/test' },
      ];
  
  const currentTab = navItems.findIndex(item => location.pathname.startsWith(item.path));

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        mb: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Tabs
          value={currentTab === -1 ? false : currentTab}
          onChange={(_, idx) => navigate(navItems[idx].path)}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem'
            }
          }}
        >
          {navItems.map(item => (
            <Tab key={item.path} label={item.label} />
          ))}
        </Tabs>
        <Box>
          <UserMenu user={user} onLogout={onLogout} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav; 