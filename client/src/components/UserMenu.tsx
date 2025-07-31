import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import defaultAvatar from '../default-avatar.png';
import { stringAvatar } from '../utils/avatar';

const UserMenu = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="User menu">
        <IconButton onClick={handleMenu} sx={{ p: 0 }}>
          {user?.avatarUrl ? (
            <Avatar alt={user.name} src={user.avatarUrl} />
          ) : defaultAvatar ? (
            <Avatar alt="Default Avatar" src={defaultAvatar} />
          ) : (
            <Avatar>{stringAvatar(user?.name || user?.email)}</Avatar>
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            minWidth: 200
          }
        }}
      >
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', textAlign: 'left' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {user?.email}
          </Typography>
          <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
            {(user?.role || '').toUpperCase()}
          </Typography>
        </Box>
        <MenuItem 
          component={RouterLink} 
          to="/profile" 
          onClick={handleClose}
          sx={{ py: 1.5, px: 3 }}
        >
          Your Profile
        </MenuItem>
        <MenuItem 
          onClick={() => { handleClose(); onLogout(); }}
          sx={{ py: 1.5, px: 3 }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu; 