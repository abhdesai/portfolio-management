import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface TransactionTableProps {
  transactions: any[];
  portfolioId: string;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  onSort: (portfolioId: string, field: string) => void;
  onEdit: (transaction: any, portfolio: any) => void;
  onDelete: (transaction: any) => void;
  onTickerClick: (ticker: string, transaction: any) => void;
  portfolio: any;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  portfolioId,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
  onTickerClick,
  portfolio
}) => {
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? 
      <ArrowUpward fontSize="inherit" sx={{ verticalAlign: 'middle', fontSize: 16 }} /> : 
      <ArrowDownward fontSize="inherit" sx={{ verticalAlign: 'middle', fontSize: 16 }} />;
  };

  const handleSort = (field: string) => {
    onSort(portfolioId, field);
  };

  return (
    <>
      {/* Transaction count above the table */}
      <Box sx={{ width: '100%', pl: 1, textAlign: 'left' }}>
        <Typography variant="body2" sx={{ mb: 0 }}>
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ height: 28 }}>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 80, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('ticker')}
            >
              Ticker {renderSortIcon('ticker')}
            </TableCell>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 120, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('company')}
            >
              Company Name {renderSortIcon('company')}
            </TableCell>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 60, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('type')}
            >
              Type {renderSortIcon('type')}
            </TableCell>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 80, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('date')}
            >
              Date {renderSortIcon('date')}
            </TableCell>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 80, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('price')}
            >
              Price {renderSortIcon('price')}
            </TableCell>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 80, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('quantity')}
            >
              Quantity {renderSortIcon('quantity')}
            </TableCell>
            <TableCell 
              sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 80, whiteSpace: 'nowrap', cursor: 'pointer' }} 
              onClick={() => handleSort('value')}
            >
              Value {renderSortIcon('value')}
            </TableCell>
            <TableCell sx={{ py: 0.2, px: 1, fontSize: 13, fontWeight: 600, minWidth: 80, whiteSpace: 'nowrap' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx: any) => (
            <TableRow key={tx.id} sx={{ height: 28 }}>
              <TableCell 
                sx={{ py: 0.2, px: 1, fontSize: 13, cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
                onClick={() => onTickerClick(tx.stockSymbol, tx)}
              >
                {tx.stockSymbol}
              </TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>{tx.companyName}</TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>
                <Chip 
                  label={tx.type.toUpperCase()} 
                  color={tx.type === 'buy' ? 'success' : 'error'} 
                  size="small" 
                  sx={{ fontSize: 11, height: 20 }} 
                />
              </TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>
                {new Date(tx.date).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>
                {tx.price.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
              </TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>{tx.quantity}</TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>
                <Typography color={tx.type === 'buy' ? 'success.main' : 'error.main'} sx={{ fontSize: 13 }}>
                  {(tx.price * tx.quantity * (tx.type === 'buy' ? 1 : -1)).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 0.2, px: 1, fontSize: 13 }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Tooltip title="Edit Transaction">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onEdit(tx, portfolio)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Transaction">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => onDelete(tx)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionTable; 