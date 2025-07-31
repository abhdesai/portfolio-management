import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Skeleton,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { usePortfolioContext } from '../contexts/PortfolioContext';
import { useLivePrices } from '../hooks/useLivePrices';
import { usePortfolioStats } from '../hooks/usePortfolioStats';
import { useMoversShakers } from '../hooks/useMoversShakers';
import { useDividendData } from '../hooks/useDividendData';
import PortfolioStatsCards from '../components/portfolios/PortfolioStatsCards';

// Dashboard Components
import PortfolioPerformanceChart from '../components/dashboard/PortfolioPerformanceChart';
import TopMoversShakers from '../components/dashboard/TopMoversShakers';
import DividendSchedule from '../components/dashboard/DividendSchedule';
import PortfolioOverview from '../components/dashboard/PortfolioOverview';
import StockHoldings from '../components/dashboard/StockHoldings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

const Dashboard = ({ user }: { user: any }) => {
  const { portfolios, loading } = usePortfolioContext();
  const { priceMap, loading: pricesLoading } = useLivePrices(portfolios);
  const portfolioStats = usePortfolioStats(portfolios, priceMap);
  const { data: moversShakersData, loading: moversShakersLoading, error: moversShakersError } = useMoversShakers();
  const { totalDividends, dividendSchedule, dividendsByTicker, loading: dividendLoading, error: dividendError } = useDividendData(portfolios);

  // Tab state
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#2962FF' }}>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your portfolio overview and market insights
            </Typography>
          </Box>
        </Box>

        {/* Top 6 Stats Cards - Including Dividends */}
        <PortfolioStatsCards 
          stats={{
            ...portfolioStats,
            totalDividends: totalDividends
          }} 
          loading={loading || pricesLoading || dividendLoading} 
        />

        {/* Top Movers & Shakers */}
        <TopMoversShakers
          movers={moversShakersData.movers}
          shakers={moversShakersData.shakers}
          loading={moversShakersLoading}
        />

        {/* Tabbed Sections */}
        <Box sx={{ width: '100%', mt: 4 }}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="dashboard tabs"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minHeight: '48px'
                }
              }}
            >
              <Tab label="Portfolio Cost vs Live Value" {...a11yProps(0)} />
              <Tab label="Portfolio Overview" {...a11yProps(1)} />
              <Tab label="Stock Holdings" {...a11yProps(2)} />
              <Tab label="Dividend Payout" {...a11yProps(3)} />
            </Tabs>
          </Paper>

          {/* Tab Panel 1: Portfolio Cost vs Live Value */}
          <TabPanel value={tabValue} index={0}>
            <PortfolioPerformanceChart
              portfolioData={portfolios}
              loading={loading}
            />
          </TabPanel>

          {/* Tab Panel 2: Portfolio Overview */}
          <TabPanel value={tabValue} index={1}>
            <PortfolioOverview
              portfolios={portfolios}
              currentPrices={priceMap}
              loading={loading || pricesLoading}
              portfolioStats={{
                dividendsByPortfolio: portfolios.reduce((acc, portfolio) => {
                  // Calculate dividends for this portfolio based on its own transactions and holdings
                  let portfolioDividends = 0;
                  
                  if (dividendSchedule && dividendSchedule.length > 0) {
                    // Get all transactions for this specific portfolio
                    const portfolioTransactions = portfolio.transactions;
                    
                    // Group transactions by symbol for this portfolio
                    const portfolioHoldings: { [symbol: string]: any[] } = {};
                    portfolioTransactions.forEach(tx => {
                      if (!portfolioHoldings[tx.stockSymbol]) {
                        portfolioHoldings[tx.stockSymbol] = [];
                      }
                      portfolioHoldings[tx.stockSymbol].push(tx);
                    });
                    
                    // Calculate dividends for each dividend event based on this portfolio's holdings
                    dividendSchedule.forEach(dividend => {
                      const symbol = dividend.symbol;
                      const dividendDate = new Date(dividend.date);
                      const exDate = new Date(dividend.exDate || dividend.date);
                      
                      // Check if this portfolio holds this symbol
                      if (portfolioHoldings[symbol]) {
                        // Calculate shares owned by this portfolio on the ex-dividend date
                        let sharesOwned = 0;
                        portfolioHoldings[symbol].forEach(tx => {
                          const txDate = new Date(tx.date);
                          if (txDate <= exDate) {
                            if (tx.type.toLowerCase() === 'buy') {
                              sharesOwned += tx.quantity;
                            } else if (tx.type.toLowerCase() === 'sell') {
                              sharesOwned -= tx.quantity;
                            }
                          }
                        });
                        
                        // If portfolio owned shares on ex-dividend date, calculate dividend
                        if (sharesOwned > 0) {
                          const dividendAmount = dividend.dividendPerShare * sharesOwned;
                          portfolioDividends += dividendAmount;
                        }
                      }
                    });
                  }
                  
                  acc[portfolio.id] = portfolioDividends;
                  return acc;
                }, {} as { [portfolioId: number]: number }),
                ytdChanges: portfolios.reduce((acc, portfolio) => {
                  // For now, using a placeholder calculation
                  // In a real implementation, this would use historical data from the start of the year
                  const portfolioValue = portfolio.transactions.reduce((sum: number, tx: any) => {
                    if (tx.type === 'buy') {
                      return sum + (tx.quantity * (priceMap[tx.stockSymbol]?.price || tx.price));
                    } else if (tx.type === 'sell') {
                      return sum - (tx.quantity * (priceMap[tx.stockSymbol]?.price || tx.price));
                    }
                    return sum;
                  }, 0);
                  acc[portfolio.id] = portfolioValue * 0.15; // Placeholder: 15% of current value
                  return acc;
                }, {} as { [portfolioId: number]: number }),
                todayChanges: portfolios.reduce((acc, portfolio) => {
                  // Calculate today's change based on current holdings and movers/shakers data
                  let todayChange = 0;
                  
                  if (moversShakersData.movers && moversShakersData.shakers) {
                    const allMovers = [...moversShakersData.movers, ...moversShakersData.shakers];
                    
                    // Calculate current holdings for this portfolio
                    const holdings: { [symbol: string]: number } = {};
                    portfolio.transactions.forEach((tx: any) => {
                      const symbol = tx.stockSymbol;
                      if (!holdings[symbol]) holdings[symbol] = 0;
                      
                      if (tx.type.toLowerCase() === 'buy') {
                        holdings[symbol] += tx.quantity;
                      } else if (tx.type.toLowerCase() === 'sell') {
                        holdings[symbol] -= tx.quantity;
                      }
                    });
                    
                    // Calculate today's change based on current holdings
                    Object.entries(holdings).forEach(([symbol, shares]) => {
                      if (shares > 0) {
                        const mover = allMovers.find((m: any) => m.ticker === symbol);
                        if (mover) {
                          const change = shares * (mover.change || 0);
                          todayChange += change;
                        }
                      }
                    });
                  }
                  
                  acc[portfolio.id] = todayChange;
                  return acc;
                }, {} as { [portfolioId: number]: number })
              }}
            />
          </TabPanel>

          {/* Tab Panel 3: Stock Holdings */}
          <TabPanel value={tabValue} index={2}>
            <StockHoldings
              portfolios={portfolios}
              currentPrices={priceMap}
              loading={loading || pricesLoading}
              portfolioStats={{
                dividendsByPortfolio: portfolios.reduce((acc, portfolio) => {
                  // Calculate dividends for this portfolio based on its own transactions and holdings
                  let portfolioDividends = 0;
                  
                  if (dividendSchedule && dividendSchedule.length > 0) {
                    // Get all transactions for this specific portfolio
                    const portfolioTransactions = portfolio.transactions;
                    
                    // Group transactions by symbol for this portfolio
                    const portfolioHoldings: { [symbol: string]: any[] } = {};
                    portfolioTransactions.forEach(tx => {
                      if (!portfolioHoldings[tx.stockSymbol]) {
                        portfolioHoldings[tx.stockSymbol] = [];
                      }
                      portfolioHoldings[tx.stockSymbol].push(tx);
                    });
                    
                    // Calculate dividends for each dividend event based on this portfolio's holdings
                    dividendSchedule.forEach(dividend => {
                      const symbol = dividend.symbol;
                      const dividendDate = new Date(dividend.date);
                      const exDate = new Date(dividend.exDate || dividend.date);
                      
                      // Check if this portfolio holds this symbol
                      if (portfolioHoldings[symbol]) {
                        // Calculate shares owned by this portfolio on the ex-dividend date
                        let sharesOwned = 0;
                        portfolioHoldings[symbol].forEach(tx => {
                          const txDate = new Date(tx.date);
                          if (txDate <= exDate) {
                            if (tx.type.toLowerCase() === 'buy') {
                              sharesOwned += tx.quantity;
                            } else if (tx.type.toLowerCase() === 'sell') {
                              sharesOwned -= tx.quantity;
                            }
                          }
                        });
                        
                        // If portfolio owned shares on ex-dividend date, calculate dividend
                        if (sharesOwned > 0) {
                          const dividendAmount = dividend.dividendPerShare * sharesOwned;
                          portfolioDividends += dividendAmount;
                        }
                      }
                    });
                  }
                  
                  acc[portfolio.id] = portfolioDividends;
                  return acc;
                }, {} as { [portfolioId: number]: number }),
                ytdChanges: portfolios.reduce((acc, portfolio) => {
                  // For now, using a placeholder calculation
                  // In a real implementation, this would use historical data from the start of the year
                  const portfolioValue = portfolio.transactions.reduce((sum: number, tx: any) => {
                    if (tx.type === 'buy') {
                      return sum + (tx.quantity * (priceMap[tx.stockSymbol]?.price || tx.price));
                    } else if (tx.type === 'sell') {
                      return sum - (tx.quantity * (priceMap[tx.stockSymbol]?.price || tx.price));
                    }
                    return sum;
                  }, 0);
                  acc[portfolio.id] = portfolioValue * 0.15; // Placeholder: 15% of current value
                  return acc;
                }, {} as { [portfolioId: number]: number }),
                todayChanges: portfolios.reduce((acc, portfolio) => {
                  // Calculate today's change based on current holdings and movers/shakers data
                  let todayChange = 0;
                  
                  if (moversShakersData.movers && moversShakersData.shakers) {
                    const allMovers = [...moversShakersData.movers, ...moversShakersData.shakers];
                    
                    // Calculate current holdings for this portfolio
                    const holdings: { [symbol: string]: number } = {};
                    portfolio.transactions.forEach((tx: any) => {
                      const symbol = tx.stockSymbol;
                      if (!holdings[symbol]) holdings[symbol] = 0;
                      
                      if (tx.type.toLowerCase() === 'buy') {
                        holdings[symbol] += tx.quantity;
                      } else if (tx.type.toLowerCase() === 'sell') {
                        holdings[symbol] -= tx.quantity;
                      }
                    });
                    
                    // Calculate today's change based on current holdings
                    Object.entries(holdings).forEach(([symbol, shares]) => {
                      if (shares > 0) {
                        const mover = allMovers.find((m: any) => m.ticker === symbol);
                        if (mover) {
                          const change = shares * (mover.change || 0);
                          todayChange += change;
                        }
                      }
                    });
                  }
                  
                  acc[portfolio.id] = todayChange;
                  return acc;
                }, {} as { [portfolioId: number]: number })
              }}
            />
          </TabPanel>

          {/* Tab Panel 4: Dividend Payout */}
          <TabPanel value={tabValue} index={3}>
            <DividendSchedule
              dividendSchedule={dividendSchedule}
              loading={dividendLoading}
              error={dividendError}
            />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 