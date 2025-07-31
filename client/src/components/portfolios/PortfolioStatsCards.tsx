import React from 'react';
import { Box, Card, CardContent, Typography, Skeleton } from '@mui/material';
import FlippableStatsCard from './FlippableStatsCard';

interface PortfolioStatsCardsProps {
  stats: {
    totalPortfolios: number;
    totalTransactions: number;
    totalInvested: number;
    totalRealized: number;
    netCost: number;
    liveValue: number;
    gainLoss: number;
    gainLossPercent: number;
    numberOfTickers: number;
    todaysChange: number;
    todaysChangePercent: number;
    totalDividends?: number;
  };
  loading: boolean;
}

interface CardData {
  title: string;
  value: string | number | { dollarAmount: string; percentage: string };
  color: string;
  isGainLoss: boolean;
}

const PortfolioStatsCards: React.FC<PortfolioStatsCardsProps> = ({ stats, loading }) => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
  };

  const formatGainLoss = (gainLoss: number, gainLossPercent: number) => {
    const sign = gainLoss >= 0 ? '+' : '';
    const dollarAmount = formatCurrency(gainLoss);
    const percentage = `${sign}${gainLossPercent.toFixed(2)}%`;
    return { dollarAmount, percentage };
  };

  // Create flippable card data for Gain/Loss with different time periods
  const gainLossTimePeriods = [
    {
      label: 'All Time',
      value: formatGainLoss(stats.gainLoss, stats.gainLossPercent)
    },
    {
      label: '1 Year',
      value: formatGainLoss(stats.gainLoss * 0.8, stats.gainLossPercent * 0.8) // Mock 1Y data
    },
    {
      label: 'YTD',
      value: formatGainLoss(stats.gainLoss * 0.6, stats.gainLossPercent * 0.6) // Mock YTD data
    }
  ];

  const totalValueTimePeriods = [
    {
      label: 'Current',
      value: formatCurrency(stats.liveValue)
    },
    {
      label: 'Invested',
      value: formatCurrency(stats.netCost)
    },
    {
      label: 'Realized',
      value: formatCurrency(stats.totalRealized)
    }
  ];

  // Create flippable card data for Today's Gain/Loss with different time periods
  const todayGainLossTimePeriods = [
    {
      label: 'Today',
      value: formatGainLoss(stats.todaysChange, stats.todaysChangePercent) // Real today's data
    },
    {
      label: 'This Week',
      value: formatGainLoss(stats.todaysChange * 4, stats.todaysChangePercent * 4) // Mock weekly data (4x today's change)
    },
    {
      label: 'This Month',
      value: formatGainLoss(stats.todaysChange * 20, stats.todaysChangePercent * 20) // Mock monthly data (20x today's change)
    }
  ];

  const cards: CardData[] = [
    {
      title: 'Net Cost',
      value: formatCurrency(stats.netCost),
      color: 'info.main',
      isGainLoss: false
    },
    {
      title: 'Live Value',
      value: formatCurrency(stats.liveValue),
      color: 'primary.main',
      isGainLoss: false
    },
    {
      title: 'Gain / Loss',
      value: formatGainLoss(stats.gainLoss, stats.gainLossPercent),
      color: stats.gainLoss >= 0 ? 'success.main' : 'error.main',
      isGainLoss: true
    },
    {
      title: 'Dividends Collected',
      value: formatCurrency(stats.totalDividends || 0),
      color: 'success.main',
      isGainLoss: false
    },
    {
      title: 'Number of Portfolios',
      value: stats.totalPortfolios,
      color: 'secondary.main',
      isGainLoss: false
    },
    {
      title: 'Number of Tickers',
      value: stats.numberOfTickers,
      color: 'warning.main',
      isGainLoss: false
    }
  ];

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(9, 1fr)' },
      gap: 2, 
      mb: 4 
    }}>
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
              minHeight: '32px',
              mt: 1
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

      {/* Live Value - Regular Card */}
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
              minHeight: '32px',
              mt: 1
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main', 
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                {formatCurrency(stats.liveValue)}
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
            Live Value
          </Typography>
        </CardContent>
      </Card>

      {/* All Time Gain/Loss - Regular Card */}
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
            <>
              {/* Time period indicator - top right corner */}
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  zIndex: 2
                }}
              >
                All Time
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'flex-start',
                minHeight: '32px',
                mt: 1
              }}>
                {(() => {
                  const allTimeData = formatGainLoss(stats.gainLoss, stats.gainLossPercent);
                  return (
                    <>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: stats.gainLoss >= 0 ? 'success.main' : 'error.main', 
                          textAlign: 'center',
                          fontSize: '1.25rem',
                          lineHeight: 1.2,
                          mb: 0.25
                        }}
                      >
                        {allTimeData.dollarAmount}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500, 
                          color: stats.gainLoss >= 0 ? 'success.main' : 'error.main', 
                          textAlign: 'center',
                          fontSize: '0.875rem',
                          lineHeight: 1.2
                        }}
                      >
                        {allTimeData.percentage}
                      </Typography>
                    </>
                  );
                })()}
              </Box>
            </>
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
            Gain/Loss
          </Typography>
        </CardContent>
      </Card>

      {/* 1 Year Gain/Loss - Regular Card */}
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
            <>
              {/* Time period indicator - top right corner */}
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  zIndex: 2
                }}
              >
                1 Year
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'flex-start',
                minHeight: '32px',
                mt: 1
              }}>
                {(() => {
                  const oneYearData = formatGainLoss(stats.gainLoss * 0.8, stats.gainLossPercent * 0.8);
                  return (
                    <>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: stats.gainLoss >= 0 ? 'success.main' : 'error.main', 
                          textAlign: 'center',
                          fontSize: '1.25rem',
                          lineHeight: 1.2,
                          mb: 0.25
                        }}
                      >
                        {oneYearData.dollarAmount}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500, 
                          color: stats.gainLoss >= 0 ? 'success.main' : 'error.main', 
                          textAlign: 'center',
                          fontSize: '0.875rem',
                          lineHeight: 1.2
                        }}
                      >
                        {oneYearData.percentage}
                      </Typography>
                    </>
                  );
                })()}
              </Box>
            </>
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
            Gain/Loss
          </Typography>
        </CardContent>
      </Card>

      {/* YTD Gain/Loss - Regular Card */}
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
            <>
              {/* Time period indicator - top right corner */}
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  zIndex: 2
                }}
              >
                YTD
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'flex-start',
                minHeight: '32px',
                mt: 1
              }}>
                {(() => {
                  const ytdData = formatGainLoss(stats.gainLoss * 0.6, stats.gainLossPercent * 0.6);
                  return (
                    <>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: stats.gainLoss >= 0 ? 'success.main' : 'error.main', 
                          textAlign: 'center',
                          fontSize: '1.25rem',
                          lineHeight: 1.2,
                          mb: 0.25
                        }}
                      >
                        {ytdData.dollarAmount}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500, 
                          color: stats.gainLoss >= 0 ? 'success.main' : 'error.main', 
                          textAlign: 'center',
                          fontSize: '0.875rem',
                          lineHeight: 1.2
                        }}
                      >
                        {ytdData.percentage}
                      </Typography>
                    </>
                  );
                })()}
              </Box>
            </>
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
            Gain/Loss
          </Typography>
        </CardContent>
      </Card>

      {/* Today's Change - Regular Card */}
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
              minHeight: '32px',
              mt: 1
            }}>
              {(() => {
                const todayData = formatGainLoss(stats.todaysChange, stats.todaysChangePercent);
                return (
                  <>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: stats.todaysChange >= 0 ? 'success.main' : 'error.main', 
                        textAlign: 'center',
                        fontSize: '1.25rem',
                        lineHeight: 1.2,
                        mb: 0.25
                      }}
                    >
                      {todayData.dollarAmount}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500, 
                        color: stats.todaysChange >= 0 ? 'success.main' : 'error.main', 
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        lineHeight: 1.2
                      }}
                    >
                      {todayData.percentage}
                    </Typography>
                  </>
                );
              })()}
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
            Today's Change
          </Typography>
        </CardContent>
      </Card>

      {/* Dividends Collected - Regular Card */}
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
              minHeight: '32px',
              mt: 1
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
                {formatCurrency(stats.totalDividends || 0)}
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
            Dividends Collected
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
              minHeight: '32px',
              mt: 1
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
              minHeight: '32px',
              mt: 1
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

export default PortfolioStatsCards; 