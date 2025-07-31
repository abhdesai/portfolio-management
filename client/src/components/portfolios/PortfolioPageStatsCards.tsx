import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton
} from '@mui/material';

interface PortfolioPageStatsCardsProps {
  stats: {
    totalPortfolios: number;
    totalTransactions: number;
    totalInvested: number;
    totalRealized: number;
    netCost: number;
    numberOfTickers: number;
  };
  loading: boolean;
}

const PortfolioPageStatsCards: React.FC<PortfolioPageStatsCardsProps> = ({ stats, loading }) => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' },
      gap: 2, 
      mb: 4 
    }}>
      {/* Buy Cost - Regular Card */}
      <Card elevation={1}>
        <CardContent sx={{ 
          p: 2, 
          height: 103, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={32} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '32px'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'success.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {formatCurrency(stats.totalInvested)}
              </Typography>
            </Box>
          )}
          <Typography sx={{ 
            fontSize: '1.1rem', 
            color: 'text.secondary', 
            textAlign: 'center', 
            fontWeight: 500,
            lineHeight: 1.2,
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0
          }}>
            Buy Cost
          </Typography>
        </CardContent>
      </Card>

      {/* Sell Cost - Regular Card */}
      <Card elevation={1}>
        <CardContent sx={{ 
          p: 2, 
          height: 103, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={32} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '32px'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'error.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {formatCurrency(stats.totalRealized)}
              </Typography>
            </Box>
          )}
          <Typography sx={{ 
            fontSize: '1.1rem', 
            color: 'text.secondary', 
            textAlign: 'center', 
            fontWeight: 500,
            lineHeight: 1.2,
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0
          }}>
            Sell Cost
          </Typography>
        </CardContent>
      </Card>

      {/* Net Cost - Regular Card */}
      <Card elevation={1}>
        <CardContent sx={{ 
          p: 2, 
          height: 103, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={32} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '32px'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'info.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {formatCurrency(stats.netCost)}
              </Typography>
            </Box>
          )}
          <Typography sx={{ 
            fontSize: '1.1rem', 
            color: 'text.secondary', 
            textAlign: 'center', 
            fontWeight: 500,
            lineHeight: 1.2,
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0
          }}>
            Net Cost
          </Typography>
        </CardContent>
      </Card>

      {/* Number of Portfolios - Regular Card */}
      <Card elevation={1}>
        <CardContent sx={{ 
          p: 2, 
          height: 103, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={32} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '32px'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'secondary.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {stats.totalPortfolios}
              </Typography>
            </Box>
          )}
          <Typography sx={{ 
            fontSize: '1.1rem', 
            color: 'text.secondary', 
            textAlign: 'center', 
            fontWeight: 500,
            lineHeight: 1.2,
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0
          }}>
            Number of Portfolios
          </Typography>
        </CardContent>
      </Card>

      {/* Number of Transactions - Regular Card */}
      <Card elevation={1}>
        <CardContent sx={{ 
          p: 2, 
          height: 103, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={32} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '32px'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'warning.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {stats.totalTransactions}
              </Typography>
            </Box>
          )}
          <Typography sx={{ 
            fontSize: '1.1rem', 
            color: 'text.secondary', 
            textAlign: 'center', 
            fontWeight: 500,
            lineHeight: 1.2,
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0
          }}>
            Number of Transactions
          </Typography>
        </CardContent>
      </Card>

      {/* Number of Tickers - Regular Card */}
      <Card elevation={1}>
        <CardContent sx={{ 
          p: 2, 
          height: 103, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          {loading ? (
            <Skeleton variant="text" width="80%" height={32} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '32px'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'warning.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {stats.numberOfTickers}
              </Typography>
            </Box>
          )}
          <Typography sx={{ 
            fontSize: '1.1rem', 
            color: 'text.secondary', 
            textAlign: 'center', 
            fontWeight: 500,
            lineHeight: 1.2,
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0
          }}>
            Number of Tickers
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PortfolioPageStatsCards; 