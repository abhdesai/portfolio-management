import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Alert,
  Box
} from '@mui/material';

interface AddPortfolioDialogProps {
  open: boolean;
  onClose: () => void;
  portfolioName: string;
  portfolioDescription: string;
  error: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const AddPortfolioDialog: React.FC<AddPortfolioDialogProps> = ({
  open,
  onClose,
  portfolioName,
  portfolioDescription,
  error,
  onNameChange,
  onDescriptionChange,
  onAdd,
  onCancel
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Portfolio</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            autoFocus
            label="Portfolio Name *"
            type="text"
            fullWidth
            variant="outlined"
            value={portfolioName}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAdd()}
            placeholder="e.g., Growth Portfolio, Retirement Fund"
            helperText={error || 'At least 8 characters'}
            error={!!error}
            required
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={portfolioDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Optional description of your portfolio strategy, goals, or notes"
            helperText="Describe your investment strategy or portfolio purpose"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onAdd} 
          color="primary" 
          variant="contained"
          disabled={!portfolioName.trim() || !!error}
        >
          Create Portfolio
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeletePortfolioDialogProps {
  open: boolean;
  onClose: () => void;
  portfolio: any;
  onConfirm: () => void;
}

export const DeletePortfolioDialog: React.FC<DeletePortfolioDialogProps> = ({
  open,
  onClose,
  portfolio,
  onConfirm
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Portfolio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the portfolio <strong>"{portfolio?.name}"</strong>?
          <br />
          This will also delete all {portfolio?.transactions?.length || 0} transactions in this portfolio.
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete Portfolio
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DeleteTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  transaction: any;
  onConfirm: () => void;
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  open,
  onClose,
  transaction,
  onConfirm
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this transaction?
          <br />
          <strong>
            {transaction?.stockSymbol} - {transaction?.type.toUpperCase()} {transaction?.quantity} shares at {transaction?.price?.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
          </strong>
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 