import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  Skeleton,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Notifications,
  Add,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Warning,
  CheckCircle,
  Close
} from '@mui/icons-material';
import apiCall from '../../utils/api';

interface QuickActionsAlertsProps {
  loading: boolean;
}

interface Alert {
  id: string;
  type: 'price' | 'dividend' | 'drop' | 'target';
  message: string;
  timestamp: string;
  read: boolean;
  action?: string;
}

const QuickActionsAlerts: React.FC<QuickActionsAlertsProps> = ({ loading }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [alertsLoading, setAlertsLoading] = useState(false);

  // Fetch real alerts from backend
  useEffect(() => {
    const fetchAlerts = async () => {
      if (loading) return;
      
      setAlertsLoading(true);
      try {
        // For now, we'll generate alerts based on portfolio data
        // In a real implementation, you'd have an alerts API endpoint
        const response = await apiCall('/api/portfolios');
        
        if (response.error) {
          console.error('Failed to fetch portfolio data for alerts:', response.error);
          setAlerts([]);
          return;
        }
        
        const portfolios = response.data || [];
        const generatedAlerts: Alert[] = [];
        
        // Generate price alerts based on current holdings
        portfolios.forEach((portfolio: any) => {
          portfolio.transactions.forEach((tx: any) => {
            if (tx.type === 'buy') {
              // Check if current price is significantly different from purchase price
              const currentPrice = portfolio.tickers?.[tx.stockSymbol]?.price;
              if (currentPrice) {
                const priceChange = ((currentPrice - tx.price) / tx.price) * 100;
                
                if (priceChange >= 10) {
                  generatedAlerts.push({
                    id: `target-${tx.id}`,
                    type: 'target',
                    message: `${tx.stockSymbol} hit ${priceChange > 0 ? 'profit' : 'loss'} target (${priceChange.toFixed(1)}%)`,
                    timestamp: new Date().toLocaleString(),
                    read: false,
                    action: priceChange > 0 ? 'Take Profit' : 'Buy More'
                  });
                } else if (priceChange <= -5) {
                  generatedAlerts.push({
                    id: `drop-${tx.id}`,
                    type: 'drop',
                    message: `${tx.stockSymbol} dropped ${Math.abs(priceChange).toFixed(1)}% from purchase price`,
                    timestamp: new Date().toLocaleString(),
                    read: false,
                    action: 'Buy More'
                  });
                }
              }
            }
          });
        });
        
        // Add some system alerts
        if (portfolios.length === 0) {
          generatedAlerts.push({
            id: 'welcome',
            type: 'target',
            message: 'Welcome! Create your first portfolio to get started',
            timestamp: new Date().toLocaleString(),
            read: false,
            action: 'Add Portfolio'
          });
        }
        
        // Sort by timestamp (newest first) and limit to 5 alerts
        const sortedAlerts = generatedAlerts
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5);
        
        setAlerts(sortedAlerts);
        setUnreadCount(sortedAlerts.filter(alert => !alert.read).length);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setAlerts([]);
      } finally {
        setAlertsLoading(false);
      }
    };
    
    fetchAlerts();
  }, [loading]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'target':
        return <TrendingUp sx={{ color: 'success.main', fontSize: 18 }} />;
      case 'drop':
        return <TrendingDown sx={{ color: 'error.main', fontSize: 18 }} />;
      case 'dividend':
        return <AttachMoney sx={{ color: 'info.main', fontSize: 18 }} />;
      default:
        return <Warning sx={{ color: 'warning.main', fontSize: 18 }} />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'target':
        return 'success';
      case 'drop':
        return 'error';
      case 'dividend':
        return 'info';
      default:
        return 'warning';
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    const alert = alerts.find(a => a.id === alertId);
    if (alert && !alert.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleQuickAction = (action: string) => {
    // Handle quick actions - would navigate to appropriate page
    console.log('Quick action:', action);
    
    // In a real implementation, you'd navigate to the appropriate page
    switch (action) {
      case 'Add Transaction':
        // Navigate to add transaction page
        break;
      case 'Create Alert':
        // Open alert creation dialog
        break;
      case 'View All Alerts':
        // Navigate to alerts page
        break;
      case 'Take Profit':
        // Navigate to sell transaction page
        break;
      case 'Buy More':
        // Navigate to buy transaction page
        break;
      case 'Add Portfolio':
        // Navigate to add portfolio page
        break;
      default:
        break;
    }
  };

  if (loading || alertsLoading) {
    return (
      <Card elevation={1} sx={{ height: 400 }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={1} sx={{ height: 400 }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            ⚡ Quick Actions & Alerts
          </Typography>
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} new`}
              color="error"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 0.75
              }}
              onClick={() => handleQuickAction('Add Transaction')}
            >
              Add Transaction
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Notifications />}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 0.75
              }}
              onClick={() => handleQuickAction('Create Alert')}
            >
              Create Alert
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 0.75
              }}
              onClick={() => handleQuickAction('View All Alerts')}
            >
              View All Alerts
            </Button>
          </Box>
        </Box>

        {/* Alerts Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
            Recent Alerts
          </Typography>
          
          {alerts.length === 0 ? (
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              color: 'text.secondary'
            }}>
              <CheckCircle sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                No new alerts
              </Typography>
            </Box>
          ) : (
            <List sx={{ flex: 1, p: 0, '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
              {alerts.map((alert, index) => (
                <React.Fragment key={alert.id}>
                  <ListItem 
                    sx={{ 
                      bgcolor: alert.read ? 'transparent' : 'success.light',
                      borderRadius: 1,
                      opacity: alert.read ? 0.7 : 1
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {getAlertIcon(alert.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: alert.read ? 400 : 600,
                            fontSize: '0.875rem',
                            lineHeight: 1.3,
                            color: 'text.primary'
                          }}
                        >
                          {alert.message}
                        </Typography>
                      }
                      secondary={
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.75rem'
                          }}
                        >
                          {alert.timestamp}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {alert.action && !alert.read && (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            py: 0.25,
                            px: 1,
                            minWidth: 'auto',
                            textTransform: 'none'
                          }}
                          onClick={() => handleQuickAction(alert.action!)}
                        >
                          {alert.action}
                        </Button>
                      )}
                      {!alert.read && (
                        <Tooltip title="Mark as read">
                          <IconButton
                            size="small"
                            onClick={() => handleMarkAsRead(alert.id)}
                            sx={{ p: 0.5 }}
                          >
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Dismiss">
                        <IconButton
                          size="small"
                          onClick={() => handleDismissAlert(alert.id)}
                          sx={{ p: 0.5 }}
                        >
                          <Close sx={{ fontSize: 16, color: 'text.secondary' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                  {index < alerts.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActionsAlerts; 