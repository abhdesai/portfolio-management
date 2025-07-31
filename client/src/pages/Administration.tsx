import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Tooltip,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as VerifiedUserIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { stringAvatar } from '../utils/avatar';
import PortfolioImportSection from './PortfolioImportSection';

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
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

interface EditUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  role: string;
}

const Administration = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const { showNotification } = useNotification();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  });
  const [newUserErrors, setNewUserErrors] = useState<Record<string, string>>({});

  const [editUser, setEditUser] = useState<EditUser>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    role: 'user'
  });

  const [sortField, setSortField] = useState<'firstName' | 'email' | 'createdAt'>('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'firstName' | 'email' | 'createdAt') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue: any, bValue: any;
    switch (sortField) {
      case 'firstName':
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
        break;
      case 'email':
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
    }
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

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

  // Get current user from sessionStorage
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      showNotification(err.message || 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Validate new user fields
  const validateNewUserField = (field: string, value: string): string => {
    switch (field) {
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
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Valid email is required';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[0-9\-\s\(\)]{7,20}$/;
        return phoneRegex.test(value) ? '' : 'Valid phone number is required';
      case 'password':
        if (!value.trim()) return 'Password is required';
        const passwordValidation = validatePassword(value);
        return passwordValidation.isValid ? '' : passwordValidation.message;
      default:
        return '';
    }
  };

  // Add new user
  const handleAddUser = async () => {
    // Validate all fields
    const errors: Record<string, string> = {};
    Object.keys(newUser).forEach(key => {
      const error = validateNewUserField(key, newUser[key as keyof NewUser]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setNewUserErrors(errors);
      showNotification('Please fix the validation errors.', 'error');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add user');
      }

      showNotification('User added successfully!', 'success');
      setOpenDialog(false);
      setNewUser({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'user'
      });
      setNewUserErrors({});
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      showNotification(err.message || 'Failed to add user', 'error');
    }
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (user: User) => {
    setDeletingUser(user);
    setOpenDeleteDialog(true);
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    try {
      const response = await fetch(`/api/users/${deletingUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      showNotification('User deleted successfully!', 'success');
      setOpenDeleteDialog(false);
      setDeletingUser(null);
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      showNotification(err.message || 'Failed to delete user', 'error');
    }
  };

  // Edit user
  const handleEditUser = async () => {
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(editUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      showNotification('User updated successfully!', 'success');
      setOpenEditDialog(false);
      setEditingUser(null);
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      showNotification(err.message || 'Failed to update user', 'error');
    }
  };

  // Open edit dialog
  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setEditUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      street: user.street || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      country: user.country || '',
      role: user.role
    });
    setOpenEditDialog(true);
  };

  const handleInputChange = (field: keyof NewUser, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
    const error = validateNewUserField(field, value);
    setNewUserErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleEditInputChange = (field: keyof EditUser, value: string) => {
    setEditUser(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <AdminIcon fontSize="small" /> : <PersonIcon fontSize="small" />;
  };

  if (loading) {
    return (
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (currentUser?.role === 'admin') {
    // Render user management for admin users
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
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#2962FF' }}>
              User Administration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage users, roles, and permissions
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add User
          </Button>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
          gap: 3, 
          mb: 4 
        }}>
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', p: 0, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main', textAlign: 'center' }}>
                {users.length}
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'center', fontWeight: 500 }}>
                Total Users
              </Typography>
            </CardContent>
          </Card>
          
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', p: 0, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'info.main', textAlign: 'center' }}>
                {users.filter(u => u.role === 'user').length}
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'center', fontWeight: 500 }}>
                Regular Users
              </Typography>
            </CardContent>
          </Card>
          
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', p: 0, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'success.main', textAlign: 'center' }}>
                {users.filter(u => u.role === 'admin').length}
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'center', fontWeight: 500 }}>
                Administrators
              </Typography>
            </CardContent>
          </Card>
          
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', p: 0, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'warning.main', textAlign: 'center' }}>
                {users.filter(u => u.avatarUrl).length}
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'center', fontWeight: 500 }}>
                With Avatars
              </Typography>
            </CardContent>
          </Card>
          
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', p: 0, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'error.main', textAlign: 'center' }}>
                {users.filter(u => !u.emailVerified).length}
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary', textAlign: 'center', fontWeight: 500 }}>
                Unverified Users
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Users Table */}
        <Card elevation={2}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('firstName')}>
                    User {sortField === 'firstName' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('email')}>
                    Contact {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Verification</TableCell>
                  <TableCell sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
                    Joined {sortField === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow 
                    key={user.id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'grey.50'
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={user.avatarUrl || undefined}
                          sx={{ width: 40, height: 40 }}
                        >
                          {!user.avatarUrl && stringAvatar(`${user.firstName} ${user.lastName}`)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            @{user.username}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon fontSize="small" color="action" />
                          <Typography variant="body2">{user.email}</Typography>
                        </Box>
                        {user.phone && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" color="action" />
                            <Typography variant="body2">{user.phone}</Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getRoleIcon(user.role)}
                        label={user.role.toUpperCase()}
                        color={user.role === 'admin' ? 'error' : 'default'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {user.emailVerified ? (
                          <>
                            <VerifiedUserIcon fontSize="small" color="success" />
                            <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                              Verified
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CancelIcon fontSize="small" color="error" />
                            <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
                              Unverified
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {formatDate(user.createdAt)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title={user.id === currentUser?.id ? "You cannot edit your own account from this interface" : `Edit ${user.firstName} ${user.lastName}`}>
                          <span>
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenEditDialog(user)}
                              disabled={user.id === currentUser?.id}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title={user.id === currentUser?.id ? "You cannot delete your own account" : `Delete ${user.firstName} ${user.lastName}`}>
                          <span>
                            <IconButton
                              color="error"
                              onClick={() => handleOpenDeleteDialog(user)}
                              disabled={user.id === currentUser?.id}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Add User Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => {
            setOpenDialog(false);
            setNewUserErrors({});
          }} 
          maxWidth="sm" 
          fullWidth
        >
          <DialogTitle>
            Add New User
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 3, mt: 1 }}>
              <TextField
                fullWidth
                label="Username"
                value={newUser.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                error={!!newUserErrors.username}
                helperText={newUserErrors.username || 'Username must be at least 8 characters (letters, numbers, underscores only)'}
                required
                variant="outlined"
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={newUser.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={!!newUserErrors.firstName}
                  helperText={newUserErrors.firstName}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={!!newUserErrors.lastName}
                  helperText={newUserErrors.lastName}
                  required
                  variant="outlined"
                />
              </Box>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!newUserErrors.email}
                helperText={newUserErrors.email}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Phone"
                value={newUser.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={!!newUserErrors.phone}
                helperText={newUserErrors.phone || 'Required - international format recommended (e.g., +1-555-123-4567)'}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={!!newUserErrors.password}
                helperText={`${newUserErrors.password || 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'} ${getPasswordStrength(newUser.password).strength ? `• Strength: ${getPasswordStrength(newUser.password).strength}` : ''}`}
                FormHelperTextProps={{
                  style: { color: newUserErrors.password ? '#d32f2f' : getPasswordStrength(newUser.password).color }
                }}
                required
                variant="outlined"
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={newUser.role}
                  label="Role"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenDialog(false);
              setNewUserErrors({});
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddUser}
              variant="contained"
              disabled={
                !newUser.username ||
                !newUser.firstName ||
                !newUser.lastName ||
                !newUser.email ||
                !newUser.phone ||
                !newUser.password ||
                Object.values(newUserErrors).some(v => !!v)
              }
            >
              Add User
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog 
          open={openEditDialog} 
          onClose={() => setOpenEditDialog(false)} 
          maxWidth="md" 
          fullWidth
        >
          <DialogTitle>
            Edit User: {editingUser?.firstName} {editingUser?.lastName}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 3, mt: 1 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={editUser.firstName}
                  onChange={(e) => handleEditInputChange('firstName', e.target.value)}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={editUser.lastName}
                  onChange={(e) => handleEditInputChange('lastName', e.target.value)}
                  required
                  variant="outlined"
                />
              </Box>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editUser.email}
                onChange={(e) => handleEditInputChange('email', e.target.value)}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Phone"
                value={editUser.phone}
                onChange={(e) => handleEditInputChange('phone', e.target.value)}
                required
                helperText="Required - international format recommended (e.g., +1-555-123-4567)"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Street"
                value={editUser.street}
                onChange={(e) => handleEditInputChange('street', e.target.value)}
                variant="outlined"
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={editUser.city}
                  onChange={(e) => handleEditInputChange('city', e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="State"
                  value={editUser.state}
                  onChange={(e) => handleEditInputChange('state', e.target.value)}
                  variant="outlined"
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={editUser.zipCode}
                  onChange={(e) => handleEditInputChange('zipCode', e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Country"
                  value={editUser.country}
                  onChange={(e) => handleEditInputChange('country', e.target.value)}
                  variant="outlined"
                />
              </Box>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={editUser.role}
                  label="Role"
                  onChange={(e) => handleEditInputChange('role', e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} variant="contained">
              Update User
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {deletingUser?.firstName} {deletingUser?.lastName}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        </Box>
      </Box>
    );
  } else {
    // Render portfolio file upload for non-admin users
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
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#2962FF' }}>
            Portfolio File Upload
          </Typography>
          <PortfolioImportSection />
        </Box>
      </Box>
    );
  }
};

export default Administration; 