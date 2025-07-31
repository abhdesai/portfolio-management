import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';
import apiCall from '../utils/api';

interface AddTransactionProps {
  open: boolean;
  onClose: () => void;
  portfolioId: number;
  portfolioName: string;
  onTransactionAdded: (transaction: any) => void;
  editMode?: boolean;
  transactionToEdit?: any;
}

const AddTransaction: React.FC<AddTransactionProps> = ({
  open,
  onClose,
  portfolioId,
  portfolioName,
  onTransactionAdded,
  editMode = false,
  transactionToEdit = null
}) => {
  const [formData, setFormData] = useState({
    stockSymbol: '',
    type: 'buy',
    quantity: '',
    price: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [companyName, setCompanyName] = useState('');
  const [companyLoading, setCompanyLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { showNotification } = useNotification();

  // Fetch company name when stockSymbol changes
  useEffect(() => {
    const fetchCompanyName = async () => {
      if (!formData.stockSymbol.trim()) {
        setCompanyName('');
        return;
      }
      setCompanyLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const { data } = await apiCall(`/api/ticker/company-name?symbol=${formData.stockSymbol.trim().toUpperCase()}`, {
          headers: { 'Authorization': token ? `Bearer ${token}` : '' }
        });
        setCompanyName(data?.companyName || '');
      } catch (e) {
        setCompanyName('');
      } finally {
        setCompanyLoading(false);
      }
    };
    fetchCompanyName();
  }, [formData.stockSymbol]);

  // Populate form data and company name when editing
  useEffect(() => {
    if (editMode && transactionToEdit) {
      setFormData({
        stockSymbol: transactionToEdit.stockSymbol || '',
        type: transactionToEdit.type || 'buy',
        quantity: transactionToEdit.quantity?.toString() || '',
        price: transactionToEdit.price?.toString() || '',
        date: transactionToEdit.date ? new Date(transactionToEdit.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      if (transactionToEdit.companyName) {
        setCompanyName(transactionToEdit.companyName);
      } else {
        setCompanyName(''); // Will be fetched by the stockSymbol effect
      }
    }
  }, [editMode, transactionToEdit]);

  // Fetch company name if missing when editing
  useEffect(() => {
    if (editMode && transactionToEdit && !transactionToEdit.companyName && transactionToEdit.stockSymbol) {
      const fetchCompanyName = async () => {
        setCompanyLoading(true);
        try {
          const token = sessionStorage.getItem('token');
          const { data } = await apiCall(`/api/ticker/company-name?symbol=${transactionToEdit.stockSymbol.trim().toUpperCase()}`, {
            headers: { 'Authorization': token ? `Bearer ${token}` : '' }
          });
          setCompanyName(data?.companyName || '');
        } catch (e) {
          setCompanyName('');
        } finally {
          setCompanyLoading(false);
        }
      };
      fetchCompanyName();
    }
  }, [editMode, transactionToEdit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.stockSymbol.trim()) {
      newErrors.stockSymbol = 'Stock symbol is required';
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('Please fix the validation errors.', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const method = editMode ? 'PUT' : 'POST';
      const url = editMode 
        ? `/api/portfolios/${portfolioId}/transactions/${transactionToEdit.id}`
        : `/api/portfolios/${portfolioId}/transactions`;

      const { data, error } = await apiCall(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        data: {
          stockSymbol: formData.stockSymbol.toUpperCase(),
          type: formData.type,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
          date: formData.date
        }
      });

      if (error) {
        throw new Error(error.message || `Failed to ${editMode ? 'update' : 'add'} transaction`);
      }

      showNotification(`Transaction ${editMode ? 'updated' : 'added'} successfully!`, 'success');
      onTransactionAdded(data.transaction);
      handleClose();
    } catch (error: any) {
      showNotification(error.message || `Failed to ${editMode ? 'update' : 'add'} transaction`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      stockSymbol: '',
      type: 'buy',
      quantity: '',
      price: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="span">{editMode ? 'Edit' : 'Add'} Transaction</Typography>
        <Typography variant="body2" color="text.secondary">
          Portfolio: {portfolioName}
        </Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Stock Symbol *"
              value={formData.stockSymbol}
              onChange={(e) => handleInputChange('stockSymbol', e.target.value)}
              error={!!errors.stockSymbol}
              helperText={errors.stockSymbol || 'Enter the stock ticker symbol (e.g., AAPL, MSFT)'}
              fullWidth
              required
              variant="outlined"
              placeholder="AAPL"
            />
            {/* Show company name as plain text below stock symbol */}
            <Box sx={{ mt: -1, mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Company Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, backgroundColor: '#f5f5f5', px: 1, py: 0.5, borderRadius: 1 }}>
                {companyLoading ? 'Loading...' : (companyName || '-')}
              </Typography>
            </Box>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Transaction Type *</InputLabel>
              <Select
                value={formData.type}
                label="Transaction Type *"
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="sell">Sell</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Quantity *"
              type="number"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              error={!!errors.quantity}
              helperText={errors.quantity || 'Number of shares'}
              fullWidth
              required
              variant="outlined"
              inputProps={{ min: 1 }}
            />

            <TextField
              label="Price per Share *"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              error={!!errors.price}
              helperText={errors.price || 'Price per share in USD'}
              fullWidth
              required
              variant="outlined"
              inputProps={{ min: 0, step: 0.01 }}
            />

            <TextField
              label="Date *"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              error={!!errors.date}
              helperText={errors.date || 'Transaction date'}
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />

            <Alert severity="info" sx={{ mt: 1 }}>
              <Typography variant="body2">
                <strong>Note:</strong> Company name will be automatically fetched using the stock symbol.
              </Typography>
            </Alert>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={20} /> : `${editMode ? 'Update' : 'Add'} Transaction`}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTransaction; 