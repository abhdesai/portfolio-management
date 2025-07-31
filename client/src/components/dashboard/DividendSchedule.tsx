import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Chip,
  IconButton,
  Collapse
} from '@mui/material';
import { ArrowUpward, ArrowDownward, ExpandMore, ExpandLess } from '@mui/icons-material';

interface DividendData {
  symbol: string;
  amount: number;
  date: string;
  exDate?: string;
  shares: number;
  dividendPerShare: number;
}

interface DividendScheduleProps {
  dividendSchedule: DividendData[];
  loading: boolean;
  error: string | null;
}

const DividendSchedule: React.FC<DividendScheduleProps> = ({
  dividendSchedule,
  loading,
  error
}) => {
  // Sorting state
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Expanded state for hierarchical table
  const [expandedTickers, setExpandedTickers] = useState<Set<string>>(new Set());

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Sorting function
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Toggle expanded state for ticker
  const toggleTickerExpansion = (ticker: string) => {
    const newExpanded = new Set(expandedTickers);
    if (newExpanded.has(ticker)) {
      newExpanded.delete(ticker);
    } else {
      newExpanded.add(ticker);
    }
    setExpandedTickers(newExpanded);
  };

  // Group dividends by ticker and sort
  const groupedDividendSchedule = useMemo(() => {
    if (!dividendSchedule) return [];
    
    // Group by ticker
    const grouped = dividendSchedule.reduce((acc, dividend) => {
      if (!acc[dividend.symbol]) {
        acc[dividend.symbol] = [];
      }
      acc[dividend.symbol].push(dividend);
      return acc;
    }, {} as Record<string, DividendData[]>);

    // Sort dividends within each group
    Object.keys(grouped).forEach(ticker => {
      grouped[ticker].sort((a, b) => {
        let aValue: any;
        let bValue: any;
        
        switch (sortField) {
          case 'exDate':
            aValue = a.exDate ? new Date(a.exDate).getTime() : 0;
            bValue = b.exDate ? new Date(b.exDate).getTime() : 0;
            break;
          case 'date':
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
            break;
          case 'shares':
            aValue = a.shares;
            bValue = b.shares;
            break;
          case 'dividendPerShare':
            aValue = a.dividendPerShare;
            bValue = b.dividendPerShare;
            break;
          case 'amount':
            aValue = a.amount;
            bValue = b.amount;
            break;
          default:
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    });

    // Convert to array and sort tickers
    return Object.entries(grouped)
      .map(([ticker, dividends]) => ({
        ticker,
        dividends,
        totalAmount: dividends.reduce((sum, d) => sum + d.amount, 0),
        totalShares: dividends[0]?.shares || 0,
        latestDate: Math.max(...dividends.map(d => new Date(d.date).getTime()))
      }))
      .sort((a, b) => {
        if (sortField === 'symbol') {
          return sortDirection === 'asc' 
            ? a.ticker.localeCompare(b.ticker)
            : b.ticker.localeCompare(a.ticker);
        }
        // Sort by latest date by default
        return sortDirection === 'asc' ? a.latestDate - b.latestDate : b.latestDate - a.latestDate;
      });
  }, [dividendSchedule, sortField, sortDirection]);

  if (loading) {
    return (
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Dividend Schedule
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={40} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Dividend Schedule
          </Typography>
          <Typography color="error" variant="body2">
            Error loading dividend data: {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!dividendSchedule || dividendSchedule.length === 0) {
    return (
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Dividend Schedule
          </Typography>
          <Typography color="text.secondary" variant="body2">
            No dividend history found for your current holdings.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Dividend Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ex-dates are approximated (3 business days before payment date) as historical ex-dividend dates require premium API access.
        </Typography>
        
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: '50px' }}></TableCell>
                <TableCell 
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => handleSort('symbol')}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Ticker
                    {sortField === 'symbol' && (
                      sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Total Dividends</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Shares Owned</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Latest Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedDividendSchedule.slice(0, 20).map((group) => (
                <React.Fragment key={group.ticker}>
                  {/* Group Header Row */}
                  <TableRow 
                    hover 
                    sx={{ 
                      backgroundColor: 'grey.50',
                      '&:hover': { backgroundColor: 'grey.100' }
                    }}
                  >
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleTickerExpansion(group.ticker)}
                      >
                        {expandedTickers.has(group.ticker) ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={group.ticker} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'success.main' }}>
                      {formatCurrency(group.totalAmount)}
                    </TableCell>
                    <TableCell align="right">
                      {group.totalShares.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {formatDate(new Date(group.latestDate).toISOString())}
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded Details */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={expandedTickers.has(group.ticker)} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Dividend Ex-Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Shares Owned</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Dividend Per Share</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Total Dividend Paid</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {group.dividends.map((dividend, index) => (
                                <TableRow key={index} hover>
                                  <TableCell>{dividend.exDate ? formatDate(dividend.exDate) : 'N/A'}</TableCell>
                                  <TableCell>{formatDate(dividend.date)}</TableCell>
                                  <TableCell align="right">{dividend.shares.toLocaleString()}</TableCell>
                                  <TableCell align="right">{formatCurrency(dividend.dividendPerShare)}</TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 600, color: 'success.main' }}>
                                    {formatCurrency(dividend.amount)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {groupedDividendSchedule.length > 20 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            Showing top 20 tickers by latest dividend. Total: {groupedDividendSchedule.length} tickers with dividends.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DividendSchedule; 