import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  IconButton,
  Tooltip
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface Portfolio {
  id: number;
  name: string;
  description?: string;
  transactions: any[];
}

interface PriceData {
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

interface PortfolioOverviewProps {
  portfolios: Portfolio[];
  currentPrices: { [key: string]: PriceData };
  loading: boolean;
  portfolioStats?: {
    ytdChanges?: { [portfolioId: number]: number };
    todayChanges?: { [portfolioId: number]: number };
    dividendsByPortfolio?: { [portfolioId: number]: number };
  };
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1'
];

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ 
  portfolios, 
  currentPrices, 
  loading,
  portfolioStats 
}) => {
  // Sorting state for portfolio table
  const [portfolioSortField, setPortfolioSortField] = useState<string>('totalValue');
  const [portfolioSortDirection, setPortfolioSortDirection] = useState<'asc' | 'desc'>('desc');

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const calculatePortfolioValue = (portfolio: Portfolio) => {
    let totalValue = 0;
    let totalCost = 0;
    let shares: { [symbol: string]: number } = {};

    // Calculate shares owned for each symbol
    portfolio.transactions.forEach(tx => {
      const symbol = tx.stockSymbol;
      if (!shares[symbol]) shares[symbol] = 0;
      
      if (tx.type.toLowerCase() === 'buy') {
        shares[symbol] += tx.quantity;
        totalCost += tx.quantity * tx.price;
      } else if (tx.type.toLowerCase() === 'sell') {
        shares[symbol] -= tx.quantity;
        totalCost -= tx.quantity * tx.price;
      }
    });

    // Calculate current value using live prices
    Object.entries(shares).forEach(([symbol, shareCount]) => {
      if (shareCount > 0) {
        const currentPrice = currentPrices[symbol]?.price || 0;
        totalValue += shareCount * currentPrice;
      }
    });

    return { totalValue, totalCost, shares };
  };

  // Calculate portfolio data
  const portfolioData = useMemo(() => {
    return portfolios.map(portfolio => {
      const { totalValue, totalCost, shares } = calculatePortfolioValue(portfolio);
      const uniqueTickers = Object.keys(shares).filter(symbol => shares[symbol] > 0).length;
      
      return {
        id: portfolio.id,
        name: portfolio.name,
        description: portfolio.description,
        totalCost,
        totalValue,
        uniqueTickers,
        gainLoss: totalValue - totalCost,
        gainLossPercent: totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0,
        ytdChange: portfolioStats?.ytdChanges?.[portfolio.id] || 0,
        todayChange: portfolioStats?.todayChanges?.[portfolio.id] || 0,
        dividends: portfolioStats?.dividendsByPortfolio?.[portfolio.id] || 0
      };
    });
  }, [portfolios, currentPrices, portfolioStats]);

  // Sort portfolio data
  const sortedPortfolioData = useMemo(() => {
    return [...portfolioData].sort((a, b) => {
      let aValue: any = a[portfolioSortField as keyof typeof a];
      let bValue: any = b[portfolioSortField as keyof typeof b];
      
      if (portfolioSortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [portfolioData, portfolioSortField, portfolioSortDirection]);

  const handlePortfolioSort = (field: string) => {
    if (portfolioSortField === field) {
      setPortfolioSortDirection(portfolioSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setPortfolioSortField(field);
      setPortfolioSortDirection('desc');
    }
  };

  // Prepare data for portfolio pie chart
  const portfolioPieChartData = useMemo(() => {
    return portfolioData.map((portfolio, index) => ({
      name: portfolio.name,
      value: portfolio.totalValue,
      color: COLORS[index % COLORS.length]
    }));
  }, [portfolioData]);

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Portfolio Overview
            </Typography>
            <Skeleton variant="rectangular" height={400} />
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Portfolio Table - 67% width */}
            <Box sx={{ flex: '0 0 67%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, mt: 0, pt: 0 }}>
                Portfolio Overview ({portfolioData.length} portfolios)
              </Typography>
              <TableContainer component={Paper} sx={{ height: 400, overflow: 'auto' }}>
                <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '25%' }}
                        onClick={() => handlePortfolioSort('name')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Portfolio
                          {portfolioSortField === 'name' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('totalCost')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Net Cost
                          {portfolioSortField === 'totalCost' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('totalValue')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Live Value
                          {portfolioSortField === 'totalValue' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('uniqueTickers')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Number of Tickers
                          {portfolioSortField === 'uniqueTickers' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('gainLoss')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Total Change
                          {portfolioSortField === 'gainLoss' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('ytdChange')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          YTD Change
                          {portfolioSortField === 'ytdChange' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('todayChange')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Today's Change
                          {portfolioSortField === 'todayChange' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer' }}
                        onClick={() => handlePortfolioSort('dividends')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Dividends Collected
                          {portfolioSortField === 'dividends' && (
                            portfolioSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedPortfolioData.map((portfolio) => (
                      <TableRow key={portfolio.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {portfolio.name}
                            </Typography>
                            {portfolio.description && (
                              <Tooltip title={portfolio.description} placement="top">
                                <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
                                  {portfolio.description.length > 20 ? `${portfolio.description.substring(0, 20)}...` : portfolio.description}
                                </Typography>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatCurrency(portfolio.totalCost)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatCurrency(portfolio.totalValue)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {portfolio.uniqueTickers}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: portfolio.gainLoss >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {portfolio.gainLoss >= 0 ? '+' : ''}{formatCurrency(portfolio.gainLoss)} ({portfolio.gainLossPercent >= 0 ? '+' : ''}{portfolio.gainLossPercent.toFixed(1)}%)
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: portfolio.ytdChange >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {portfolio.ytdChange >= 0 ? '+' : ''}{formatCurrency(portfolio.ytdChange)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: portfolio.todayChange >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {portfolio.todayChange >= 0 ? '+' : ''}{formatCurrency(portfolio.todayChange)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: 'success.main'
                            }}
                          >
                            {formatCurrency(portfolio.dividends)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Portfolio Distribution Pie Chart - 33% width */}
            <Box sx={{ flex: '0 0 33%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Portfolio Distribution
              </Typography>
              <Box sx={{ width: '100%', height: 400, flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioPieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => {
                        const { percent, cx, cy, midAngle, innerRadius, outerRadius } = props;
                        if (!percent) return '';
                        
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        
                        // If segment is large enough (>4%), put label inside
                        if (percent > 0.04) {
                          return (
                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold">
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          );
                        }
                        
                        // For smaller segments, put label outside with line
                        const outerX = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
                        const outerY = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
                        const lineX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
                        const lineY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
                        
                        return (
                          <g>
                            <line x1={lineX} y1={lineY} x2={outerX} y2={outerY} stroke="#666" strokeWidth={1} />
                            <text x={outerX} y={outerY} fill="#666" textAnchor="middle" dominantBaseline="central" fontSize="10">
                              {`${(percent * 100).toFixed(0)}%`}
                            </text>
                          </g>
                        );
                      }}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolioPieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const portfolio = portfolioData.find(p => p.name === data.name);
                          if (portfolio) {
                            return (
                              <Box sx={{
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                padding: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                              }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                  {portfolio.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Total Value:</strong> {formatCurrency(portfolio.totalValue)}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Total Cost:</strong> {formatCurrency(portfolio.totalCost)}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: portfolio.gainLoss >= 0 ? 'success.main' : 'error.main',
                                  fontWeight: 500
                                }}>
                                  <strong>Gain/Loss:</strong> {portfolio.gainLoss >= 0 ? '+' : ''}{formatCurrency(portfolio.gainLoss)} ({portfolio.gainLossPercent >= 0 ? '+' : ''}{portfolio.gainLossPercent.toFixed(2)}%)
                                </Typography>
                              </Box>
                            );
                          }
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PortfolioOverview; 