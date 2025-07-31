import React from 'react';
import { Box, Typography, Card, CardContent, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface TickerData {
  ticker: string;
  change: number;
  changePercent: number;
}

interface TopMoversShakersProps {
  movers: TickerData[];
  shakers: TickerData[];
  loading: boolean;
}

const TopMoversShakers: React.FC<TopMoversShakersProps> = ({ movers, shakers, loading }) => {
  const formatCurrency = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const TickerBox: React.FC<{ ticker: string; change: number; isPositive: boolean }> = ({ 
    ticker, 
    change, 
    isPositive 
  }) => (
    <Box 
      sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 0.5,
        px: 1.5,
        py: 0.5,
        mx: 0.5,
        width: 120,
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        minHeight: 'fit-content'
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600,
          fontSize: '0.9rem',
          color: 'text.primary'
        }}
      >
        {ticker}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600,
          fontSize: '0.9rem',
          color: isPositive ? 'success.main' : 'error.main'
        }}
      >
        {formatCurrency(change)}
      </Typography>
    </Box>
  );

  const MoversShakersRow: React.FC<{ 
    title: string; 
    data: TickerData[]; 
    isPositive: boolean; 
    icon: React.ReactNode;
    loading: boolean;
  }> = ({ title, data, isPositive, icon, loading }) => {
    // Limit to 8 tickers per row
    const maxTickersPerRow = 8;
    const limitedData = data.slice(0, maxTickersPerRow);

    return (
      <Box sx={{ mb: 0.5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: isPositive ? 'success.main' : 'error.main',
              mr: 2,
              width: 140,
              whiteSpace: 'nowrap'
            }}>
              {icon}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  ml: 1,
                  fontSize: '1.2rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {title}
              </Typography>
            </Box>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton 
                key={i} 
                variant="rectangular" 
                width={80} 
                height={32} 
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: isPositive ? 'success.main' : 'error.main',
              mr: 2,
              width: 140,
              whiteSpace: 'nowrap'
            }}>
              {icon}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  ml: 1,
                  fontSize: '1.2rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {title}
              </Typography>
            </Box>
            {limitedData.length > 0 ? (
              limitedData.map((item, index) => (
                <TickerBox
                  key={`${item.ticker}-${index}`}
                  ticker={item.ticker}
                  change={item.change}
                  isPositive={isPositive}
                />
              ))
            ) : (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  py: 1
                }}
              >
                No data available
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Card 
        elevation={1} 
        sx={{ 
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: { xs: 0.25, sm: 0.5, md: 0.75 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: 'fit-content'
        }}
      >
        <MoversShakersRow
          title="Top Movers"
          data={movers}
          isPositive={true}
          icon={<TrendingUp />}
          loading={loading}
        />
        
        <MoversShakersRow
          title="Top Shakers"
          data={shakers}
          isPositive={false}
          icon={<TrendingDown />}
          loading={loading}
        />
      </Card>
    </Box>
  );
};

export default TopMoversShakers; 