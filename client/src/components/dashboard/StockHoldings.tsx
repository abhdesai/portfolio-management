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
  Tooltip,
  IconButton
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

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

interface StockHoldingsProps {
  portfolios: Portfolio[];
  currentPrices: { [key: string]: PriceData };
  loading: boolean;
  portfolioStats?: {
    ytdChanges?: { [portfolioId: number]: number };
    todayChanges?: { [portfolioId: number]: number };
    dividendsByPortfolio?: { [portfolioId: number]: number };
  };
}

interface StockHolding {
  symbol: string;
  totalShares: number;
  totalCost: number;
  currentValue: number;
  tickerCurrentValue: number;
  averageCostPerStock: number;
  gainLoss: number;
  gainLossPercent: number;
  todaysChange: number;
  todaysChangePercent: number;
  ytdChange: number;
  ytdChangePercent: number;
  dividendsCollected: number;
}

const StockHoldings: React.FC<StockHoldingsProps> = ({ 
  portfolios, 
  currentPrices, 
  loading,
  portfolioStats 
}) => {
  // Sorting state for stock holdings table
  const [stockSortField, setStockSortField] = useState<string>('currentValue');
  const [stockSortDirection, setStockSortDirection] = useState<'asc' | 'desc'>('desc');

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1'
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  // Calculate stock holdings across all portfolios
  const stockHoldings: StockHolding[] = [];
  const stockMap = new Map<string, StockHolding>();

  portfolios.forEach(portfolio => {
    portfolio.transactions.forEach(transaction => {
      const symbol = transaction.stockSymbol;
      const currentPrice = currentPrices[symbol]?.price || 0;
      
      if (!stockMap.has(symbol)) {
        stockMap.set(symbol, {
          symbol,
          totalShares: 0,
          totalCost: 0,
          currentValue: 0,
          tickerCurrentValue: 0,
          averageCostPerStock: 0,
          gainLoss: 0,
          gainLossPercent: 0,
          todaysChange: 0,
          todaysChangePercent: 0,
          ytdChange: 0,
          ytdChangePercent: 0,
          dividendsCollected: 0
        });
      }
      
      const holding = stockMap.get(symbol)!;
      if (transaction.type.toLowerCase() === 'buy') {
        holding.totalShares += transaction.quantity;
        holding.totalCost += transaction.quantity * transaction.price;
      } else if (transaction.type.toLowerCase() === 'sell') {
        holding.totalShares -= transaction.quantity;
        holding.totalCost -= transaction.quantity * transaction.price;
      }
    });
  });

  // Calculate current values and gains/losses
  stockMap.forEach(holding => {
    const currentPrice = currentPrices[holding.symbol]?.price || 0;
    const priceData = currentPrices[holding.symbol];
    
    holding.currentValue = holding.totalShares * currentPrice;
    holding.tickerCurrentValue = currentPrice;
    holding.averageCostPerStock = holding.totalShares > 0 ? holding.totalCost / holding.totalShares : 0;
    holding.gainLoss = holding.currentValue - holding.totalCost;
    holding.gainLossPercent = holding.totalCost > 0 ? (holding.gainLoss / holding.totalCost) * 100 : 0;
    
    // Calculate today's change
    if (priceData && priceData.change && holding.totalShares > 0) {
      holding.todaysChange = holding.totalShares * priceData.change;
      holding.todaysChangePercent = priceData.changePercent;
    } else {
      holding.todaysChange = 0;
      holding.todaysChangePercent = 0;
    }
    
    // Calculate YTD change (placeholder - would need historical data)
    if (priceData && holding.totalShares > 0) {
      // Estimate YTD as 15% of current value (placeholder)
      holding.ytdChange = holding.currentValue * 0.15;
      holding.ytdChangePercent = 15.0;
    } else {
      holding.ytdChange = 0;
      holding.ytdChangePercent = 0;
    }
    
    // Calculate dividends collected based on portfolio dividends
    if (holding.totalShares > 0) {
      // Calculate total portfolio value for this stock across all portfolios
      let totalPortfolioValueForStock = 0;
      portfolios.forEach(portfolio => {
        portfolio.transactions.forEach((tx: any) => {
          if (tx.stockSymbol === holding.symbol) {
            const currentPrice = currentPrices[tx.stockSymbol]?.price || tx.price;
            if (tx.type === 'buy') {
              totalPortfolioValueForStock += tx.quantity * currentPrice;
            } else if (tx.type === 'sell') {
              totalPortfolioValueForStock -= tx.quantity * currentPrice;
            }
          }
        });
      });
      
      // Calculate total portfolio dividends for this stock's portfolios
      let totalDividendsForStock = 0;
      portfolios.forEach(portfolio => {
        const portfolioDividends = portfolioStats?.dividendsByPortfolio?.[portfolio.id] || 0;
        const portfolioValue = portfolio.transactions.reduce((sum: number, tx: any) => {
          const currentPrice = currentPrices[tx.stockSymbol]?.price || tx.price;
          if (tx.type === 'buy') {
            return sum + (tx.quantity * currentPrice);
          } else if (tx.type === 'sell') {
            return sum - (tx.quantity * currentPrice);
          }
          return sum;
        }, 0);
        
        // Calculate this stock's share of this portfolio's dividends
        const stockValueInPortfolio = portfolio.transactions.reduce((sum: number, tx: any) => {
          if (tx.stockSymbol === holding.symbol) {
            const currentPrice = currentPrices[tx.stockSymbol]?.price || tx.price;
            if (tx.type === 'buy') {
              return sum + (tx.quantity * currentPrice);
            } else if (tx.type === 'sell') {
              return sum - (tx.quantity * currentPrice);
            }
          }
          return sum;
        }, 0);
        
        if (portfolioValue > 0) {
          totalDividendsForStock += (portfolioDividends * stockValueInPortfolio) / portfolioValue;
        }
      });
      
      holding.dividendsCollected = totalDividendsForStock;
    } else {
      holding.dividendsCollected = 0;
    }
    
    stockHoldings.push(holding);
  });

  // Sort stock holdings data
  const sortedStockHoldings = useMemo(() => {
    return [...stockHoldings].sort((a, b) => {
      let aValue: any = a[stockSortField as keyof typeof a];
      let bValue: any = b[stockSortField as keyof typeof b];
      
      // Handle string values
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (stockSortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [stockHoldings, stockSortField, stockSortDirection]);

  const handleStockSort = (field: string) => {
    if (stockSortField === field) {
      setStockSortDirection(stockSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setStockSortField(field);
      setStockSortDirection('desc');
    }
  };

  // Prepare data for stock pie chart - always sort by Live Value for pie chart
  const pieChartHoldings = [...stockHoldings].sort((a, b) => b.currentValue - a.currentValue);
  const top8Holdings = pieChartHoldings.slice(0, 8);
  const otherHoldings = pieChartHoldings.slice(8);
  
  // Calculate total value of "Other" holdings
  const otherValue = otherHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
  
  // Calculate total portfolio value for percentage calculation
  const totalPortfolioValue = stockHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
  
  // Filter out holdings with zero or negative values for pie chart
  const validHoldings = pieChartHoldings.filter(holding => holding.currentValue > 0);
  const validTop8Holdings = validHoldings.slice(0, 8);
  const validOtherHoldings = validHoldings.slice(8);
  const validOtherValue = validOtherHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
  
  const stockPieChartData = [
    ...validTop8Holdings.map((holding, index) => ({
      name: holding.symbol,
      value: holding.currentValue,
      color: COLORS[index % COLORS.length]
    })),
    // Add "Other" category if there are more than 8 valid holdings
    ...(validOtherHoldings.length > 0 ? [{
      name: 'Other',
      value: validOtherValue,
      color: '#9E9E9E' // Gray color for "Other"
    }] : [])
  ];
  
  // Debug: Log the total values
  const pieChartTotal = stockPieChartData.reduce((sum, item) => sum + item.value, 0);
  const top8Total = validTop8Holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  
  // Fix rounding issue by normalizing the data to exactly 100%
  if (pieChartTotal > 0 && Math.abs(pieChartTotal - totalPortfolioValue) > 0.01) {
    const normalizationFactor = totalPortfolioValue / pieChartTotal;
    stockPieChartData.forEach(item => {
      item.value = Math.round(item.value * normalizationFactor * 100) / 100;
    });
  }

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Card elevation={1}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Stock Holdings
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
            {/* Stock Holdings Table - 67% width */}
            <Box sx={{ flex: '0 0 67%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, mt: 0, pt: 0 }}>
                Stock Holdings ({stockHoldings.length} tickers)
              </Typography>
              <TableContainer component={Paper} sx={{ height: 400, overflow: 'auto' }}>
                <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '80px' }}
                        onClick={() => handleStockSort('symbol')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Symbol
                          {stockSortField === 'symbol' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '80px' }}
                        onClick={() => handleStockSort('totalShares')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Shares
                          {stockSortField === 'totalShares' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '90px' }}
                        onClick={() => handleStockSort('totalCost')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Net Cost
                          {stockSortField === 'totalCost' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '90px' }}
                        onClick={() => handleStockSort('currentValue')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Live Value
                          {stockSortField === 'currentValue' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '90px' }}
                        onClick={() => handleStockSort('tickerCurrentValue')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Ticker Current Value
                          {stockSortField === 'tickerCurrentValue' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '85px' }}
                        onClick={() => handleStockSort('averageCostPerStock')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Cost Per Stock
                          {stockSortField === 'averageCostPerStock' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '90px' }}
                        onClick={() => handleStockSort('gainLoss')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Total Change
                          {stockSortField === 'gainLoss' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '90px' }}
                        onClick={() => handleStockSort('ytdChange')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          YTD Change
                          {stockSortField === 'ytdChange' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '95px' }}
                        onClick={() => handleStockSort('todaysChange')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Today's Change
                          {stockSortField === 'todaysChange' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ fontWeight: 600, verticalAlign: 'top', fontSize: '0.875rem', lineHeight: 1.1, py: 1, cursor: 'pointer', width: '100px' }}
                        onClick={() => handleStockSort('dividendsCollected')}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                          Dividends Collected
                          {stockSortField === 'dividendsCollected' && (
                            stockSortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedStockHoldings.map((holding) => (
                      <TableRow key={holding.symbol} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {holding.symbol}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {holding.totalShares.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatCurrency(holding.totalCost)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatCurrency(holding.currentValue)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: holding.todaysChangePercent >= 0 ? 'inherit' : 'error.main'
                            }}
                          >
                            {formatCurrency(holding.tickerCurrentValue)}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: holding.todaysChangePercent >= 0 ? 'success.main' : 'error.main',
                              display: 'block',
                              mt: 0.5
                            }}
                          >
                            {holding.todaysChangePercent >= 0 ? '+' : ''}{holding.todaysChangePercent.toFixed(2)}%
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatCurrency(holding.averageCostPerStock)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: holding.gainLoss >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {holding.gainLoss >= 0 ? '+' : ''}{formatCurrency(holding.gainLoss)} ({holding.gainLossPercent >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(1)}%)
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: holding.ytdChange >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {holding.ytdChange >= 0 ? '+' : ''}{formatCurrency(holding.ytdChange)} ({holding.ytdChangePercent >= 0 ? '+' : ''}{holding.ytdChangePercent.toFixed(1)}%)
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: holding.todaysChange >= 0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {holding.todaysChange >= 0 ? '+' : ''}{formatCurrency(holding.todaysChange)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              color: 'success.main'
                            }}
                          >
                            {formatCurrency(holding.dividendsCollected)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Stock Holdings Pie Chart - 33% width */}
            <Box sx={{ flex: '0 0 33%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Stock Distribution
              </Typography>
              <Box sx={{ width: '100%', height: 400, flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stockPieChartData}
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
                      {stockPieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          
                          if (data.name === 'Other') {
                            return (
                              <Box sx={{
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                padding: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                              }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                  Other Holdings
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Total Value:</strong> {formatCurrency(data.value)}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Number of Stocks:</strong> {validOtherHoldings.length}
                                </Typography>
                              </Box>
                            );
                          }
                          
                          const holding = stockHoldings.find(h => h.symbol === data.name);
                          if (holding) {
                            return (
                              <Box sx={{
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                padding: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                              }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                  {holding.symbol}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Shares:</strong> {holding.totalShares.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Net Cost:</strong> {formatCurrency(holding.totalCost)}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Current Value:</strong> {formatCurrency(holding.currentValue)}
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  color: holding.gainLoss >= 0 ? 'success.main' : 'error.main',
                                  fontWeight: 500
                                }}>
                                  <strong>Change:</strong> {holding.gainLoss >= 0 ? '+' : ''}{formatCurrency(holding.gainLoss)} ({holding.gainLossPercent >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%)
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

export default StockHoldings; 