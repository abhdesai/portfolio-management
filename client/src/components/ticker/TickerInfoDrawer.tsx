import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ExpandableText from '../common/ExpandableText';
import NewsList from '../common/NewsList';
import EventsList from '../common/EventsList';
import ReusableChartWidget from '../ReusableChartWidget';

interface TickerInfoDrawerProps {
  open: boolean;
  onClose: () => void;
  tickerInfo: any;
  tickerNews: any[];
  tickerEvents: any;
  drawerTransaction: any;
  drawerChartData: any[];
  drawerWidth: number;
  drawerLoading: boolean;
  onResizeMouseDown: (e: React.MouseEvent) => void;
  minDrawerWidth: number;
  maxDrawerWidth: number;
}

const TickerInfoDrawer: React.FC<TickerInfoDrawerProps> = ({
  open,
  onClose,
  tickerInfo,
  tickerNews,
  tickerEvents,
  drawerTransaction,
  drawerChartData,
  drawerWidth,
  drawerLoading,
  onResizeMouseDown,
  minDrawerWidth,
  maxDrawerWidth
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ 
        width: drawerWidth, 
        maxWidth: '99vw', 
        bgcolor: 'background.paper', 
        minHeight: '100vh', 
        position: 'relative', 
        p: 0, 
        borderLeft: '2px solid #e0e0e0' 
      }}>
        {/* Resizer */}
        <Box
          sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, cursor: 'ew-resize', zIndex: 2 }}
          onMouseDown={onResizeMouseDown}
        />
        
        {/* Header Section */}
        {tickerInfo && (
          <Box sx={{
            px: 4, pt: 3, pb: 2,
            background: 'background.paper',
            color: 'text.primary',
            borderTopRightRadius: 8,
            borderBottom: '1px solid #e0e0e0',
            boxShadow: 1,
            position: 'relative',
            minHeight: 120
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', gap: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: 1, mb: 0.5 }}>
                  {typeof tickerInfo.symbol === 'string' ? tickerInfo.symbol : ''}
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.85, fontWeight: 500 }}>
                  {typeof tickerInfo.name === 'string' ? tickerInfo.name : ''}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 120 }}>
                {(() => {
                  let priceNum = null;
                  if (typeof tickerInfo.price === 'object' && tickerInfo.price !== null) {
                    if (typeof tickerInfo.price.regularMarketPrice === 'number') {
                      priceNum = tickerInfo.price.regularMarketPrice;
                    }
                  } else if (typeof tickerInfo.price === 'number') {
                    priceNum = tickerInfo.price;
                  } else if (typeof tickerInfo.price === 'string') {
                    const parsed = Number(tickerInfo.price);
                    if (!isNaN(parsed)) {
                      priceNum = parsed;
                    }
                  }
                  if (priceNum !== null) {
                    return (
                      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0, textAlign: 'right' }}>
                        ${priceNum} {typeof tickerInfo.currency === 'string' ? tickerInfo.currency : ''}
                      </Typography>
                    );
                  }
                  return null;
                })()}
                {(typeof tickerInfo.change === 'number' || typeof tickerInfo.changePercent === 'number') && (
                  <Typography variant="body1" sx={{ 
                    color: tickerInfo.change >= 0 ? 'success.main' : 'error.main', 
                    fontWeight: 600, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    justifyContent: 'flex-end', 
                    textAlign: 'right' 
                  }}>
                    {tickerInfo.change >= 0 ? (
                      <ArrowUpward fontSize="inherit" sx={{ verticalAlign: 'middle' }} />
                    ) : (
                      <ArrowDownward fontSize="inherit" sx={{ verticalAlign: 'middle' }} />
                    )}
                    {typeof tickerInfo.change === 'number' ? (tickerInfo.change >= 0 ? '+' : '') + tickerInfo.change : ''}
                    {typeof tickerInfo.changePercent === 'number' ? ` (${tickerInfo.changePercent.toFixed(2)}%)` : ''}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}
        
        <Divider sx={{ my: 0 }} />
        
        {/* Company Description */}
        {tickerInfo && (
          <Box sx={{ px: 4, py: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
              Company Info
            </Typography>
            <ExpandableText 
              text={typeof tickerInfo.assetProfile?.longBusinessSummary === 'string' ? tickerInfo.assetProfile.longBusinessSummary : ''} 
              maxChars={350} 
            />
          </Box>
        )}
        
        <Divider sx={{ my: 0 }} />
        
        {/* Transaction Details Table */}
        {drawerTransaction && (
          <Box sx={{ px: 4, py: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
              Transaction Details
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{new Date(drawerTransaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={drawerTransaction.type.toUpperCase()} 
                      color={drawerTransaction.type === 'buy' ? 'success' : 'error'} 
                      size="small" 
                      sx={{ fontSize: 11, height: 20 }} 
                    />
                  </TableCell>
                  <TableCell>
                    {drawerTransaction.price.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                  </TableCell>
                  <TableCell>{drawerTransaction.quantity}</TableCell>
                  <TableCell>
                    {(drawerTransaction.price * drawerTransaction.quantity).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
        
        {/* Stock Performance Section */}
        {drawerTransaction && drawerChartData.length > 0 && (
          <Box sx={{ px: 4, py: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
              Stock Performance
            </Typography>
            <ReusableChartWidget
              lineSeriesData={[{ data: drawerChartData, options: { color: '#2962FF', lineWidth: 2 } }]}
              histogramSeriesData={[{
                data: [{
                  time: new Date(drawerTransaction.date).toISOString().split('T')[0],
                  value: drawerTransaction.type === 'sell'
                    ? -Math.abs(drawerTransaction.price * drawerTransaction.quantity)
                    : Math.abs(drawerTransaction.price * drawerTransaction.quantity),
                }],
                options: { color: drawerTransaction.type === 'sell' ? '#FF9800' : '#2E7D32' }
              }]}
              transactionDetailsMap={{
                [new Date(drawerTransaction.date).toISOString().split('T')[0]]: [{
                  stockSymbol: drawerTransaction.stockSymbol,
                  type: drawerTransaction.type,
                  quantity: drawerTransaction.quantity,
                  price: drawerTransaction.price,
                  value: Math.abs(drawerTransaction.price * drawerTransaction.quantity),
                  portfolioName: drawerTransaction.portfolioName || 'Portfolio'
                }]
              }}
              height={300}
              width={drawerWidth - 80}
              defaultFilter="1Y"
              enableScrolling={true}
            />
          </Box>
        )}
        
        {/* News section */}
        <Box sx={{ px: 4, py: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
            Recent News
          </Typography>
          <Box>
            <NewsList news={tickerNews || []} initialCount={7} />
          </Box>
        </Box>
        
        {/* Events section */}
        <Box sx={{ px: 4, py: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
            Upcoming Events
          </Typography>
          <EventsList events={tickerEvents || { events: [] }} />
        </Box>
        
        {/* Loading overlay */}
        {drawerLoading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 10
          }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default TickerInfoDrawer; 