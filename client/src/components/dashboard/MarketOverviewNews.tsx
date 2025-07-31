import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Skeleton,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Article,
  AttachMoney,
  LocalFireDepartment
} from '@mui/icons-material';
import apiCall from '../../utils/api';

interface MarketOverviewNewsProps {
  loading: boolean;
}

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface NewsItem {
  id: string;
  title: string;
  category: 'breaking' | 'earnings' | 'ipo' | 'general';
  timestamp: string;
  url: string;
}

const MarketOverviewNews: React.FC<MarketOverviewNewsProps> = ({ loading }) => {
  const [marketData, setMarketData] = useState<MarketIndex[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [marketLoading, setMarketLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  // Fetch real market data
  useEffect(() => {
    const fetchMarketData = async () => {
      if (loading) return;
      
      setMarketLoading(true);
      try {
        const indices = [
          { name: 'S&P 500', symbol: '^GSPC' },
          { name: 'NASDAQ', symbol: '^IXIC' },
          { name: 'VIX', symbol: '^VIX' },
          { name: 'Oil', symbol: 'CL=F' }
        ];
        
        const promises = indices.map(async (index) => {
          try {
            const response = await apiCall(`/api/ticker/info?symbol=${index.symbol}`);
            
            if (response.error) {
              console.error(`Failed to fetch ${index.name} data:`, response.error);
              return {
                name: index.name,
                value: 0,
                change: 0,
                changePercent: 0
              };
            }
            
            const data = response.data;
            return {
              name: index.name,
              value: data.price || 0,
              change: data.change || 0,
              changePercent: data.changePercent || 0
            };
          } catch (error) {
            console.error(`Error fetching ${index.name} data:`, error);
            return {
              name: index.name,
              value: 0,
              change: 0,
              changePercent: 0
            };
          }
        });
        
        const results = await Promise.all(promises);
        setMarketData(results);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setMarketData([]);
      } finally {
        setMarketLoading(false);
      }
    };
    
    fetchMarketData();
  }, [loading]);

  // Fetch real news data
  useEffect(() => {
    const fetchNewsData = async () => {
      if (loading) return;
      
      setNewsLoading(true);
      try {
        // Fetch news for major market indices
        const symbols = ['^GSPC', '^IXIC', 'AAPL', 'MSFT', 'GOOGL'];
        const allNews: NewsItem[] = [];
        
        for (const symbol of symbols) {
          try {
            const response = await apiCall(`/api/ticker/news?symbol=${symbol}`);
            
            if (response.error) {
              console.error(`Failed to fetch news for ${symbol}:`, response.error);
              continue;
            }
            
            const news = response.data || [];
            const symbolNews = news.slice(0, 2).map((item: any, index: number) => ({
              id: `${symbol}-${index}`,
              title: item.title || item.headline || 'Market News',
              category: getNewsCategory(item.title || ''),
              timestamp: item.pubDate ? new Date(item.pubDate).toLocaleString() : 'Recent',
              url: item.link || '#'
            }));
            
            allNews.push(...symbolNews);
          } catch (error) {
            console.error(`Error fetching news for ${symbol}:`, error);
          }
        }
        
        // Sort by timestamp and take the most recent
        const sortedNews = allNews
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 6);
        
        setNewsData(sortedNews);
      } catch (error) {
        console.error('Error fetching news data:', error);
        setNewsData([]);
      } finally {
        setNewsLoading(false);
      }
    };
    
    fetchNewsData();
  }, [loading]);

  const getNewsCategory = (title: string): 'breaking' | 'earnings' | 'ipo' | 'general' => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('earnings') || lowerTitle.includes('profit') || lowerTitle.includes('revenue')) {
      return 'earnings';
    }
    if (lowerTitle.includes('ipo') || lowerTitle.includes('initial public offering')) {
      return 'ipo';
    }
    if (lowerTitle.includes('breaking') || lowerTitle.includes('urgent') || lowerTitle.includes('alert')) {
      return 'breaking';
    }
    return 'general';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breaking':
        return <LocalFireDepartment sx={{ color: '#FF6B6B', fontSize: 16 }} />;
      case 'earnings':
        return <AttachMoney sx={{ color: '#4ECDC4', fontSize: 16 }} />;
      case 'ipo':
        return <TrendingUp sx={{ color: '#45B7D1', fontSize: 16 }} />;
      default:
        return <Article sx={{ color: '#95A5A6', fontSize: 16 }} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breaking':
        return '#FF6B6B';
      case 'earnings':
        return '#4ECDC4';
      case 'ipo':
        return '#45B7D1';
      default:
        return '#95A5A6';
    }
  };

  if (loading || marketLoading) {
    return (
      <Card elevation={1} sx={{ height: 400 }}>
        <CardContent>
          <Skeleton variant="text" width="50%" height={32} sx={{ mb: 2 }} />
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
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          📰 Market Overview & News
        </Typography>

        {/* Market Indices */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 1.5,
            p: 1.5,
            bgcolor: 'grey.50',
            borderRadius: 1
          }}>
            {marketData.map((index) => (
              <Box key={index.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {index.name}:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {index.name === 'Oil' ? `$${index.value.toFixed(2)}` : index.value.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    {index.change >= 0 ? (
                      <TrendingUp sx={{ color: 'success.main', fontSize: 14 }} />
                    ) : (
                      <TrendingDown sx={{ color: 'error.main', fontSize: 14 }} />
                    )}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: index.change >= 0 ? 'success.main' : 'error.main',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    >
                      {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* News Section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
            Recent News
          </Typography>
          
          {newsLoading ? (
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
            </Box>
          ) : (
            <List sx={{ flex: 1, p: 0, '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
              {newsData.map((news, index) => (
                <React.Fragment key={news.id}>
                  <ListItem 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'grey.50', borderRadius: 1 }
                    }}
                    onClick={() => window.open(news.url, '_blank')}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {getCategoryIcon(news.category)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            lineHeight: 1.3,
                            color: 'text.primary'
                          }}
                        >
                          {news.title}
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
                          {news.timestamp}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < newsData.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </React.Fragment>
              ))}
            </List>
          )}

          {/* View All News Button */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button 
              variant="outlined" 
              size="small"
              sx={{ 
                fontSize: '0.75rem',
                textTransform: 'none',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              View All News →
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketOverviewNews; 