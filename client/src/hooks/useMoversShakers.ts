import { useState, useEffect } from 'react';
import apiCall from '../utils/api';

interface TickerData {
  ticker: string;
  change: number;
  changePercent: number;
}

interface MoversShakersData {
  movers: TickerData[];
  shakers: TickerData[];
}

export const useMoversShakers = () => {
  const [data, setData] = useState<MoversShakersData>({ movers: [], shakers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoversShakers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiCall('/api/stock/movers-shakers');
        
        console.log('🔍 API Response:', response);
        
        if (response.error) {
          console.error('❌ API Error:', response.error);
          setError(response.error.message || 'Failed to fetch movers and shakers data');
          
          // Check if this is a fallback response
          if (response.data && response.data.fallback) {
            console.log('⚠️ Using fallback data due to API issues');
          }
          
          // Fallback to mock data if API fails - reflecting a down market
          setData({
            movers: [
              { ticker: 'NVDA', change: 2.34, changePercent: 1.1 },
              { ticker: 'AAPL', change: 1.89, changePercent: 0.9 },
              { ticker: 'MSFT', change: 1.45, changePercent: 0.7 },
              { ticker: 'GOOGL', change: 1.12, changePercent: 0.5 },
              { ticker: 'AMZN', change: 0.78, changePercent: 0.3 },
              { ticker: 'META', change: 0.45, changePercent: 0.2 },
              { ticker: 'NFLX', change: 0.23, changePercent: 0.1 },
              { ticker: 'TSLA', change: 0.12, changePercent: 0.05 }
            ],
            shakers: [
              { ticker: 'TSLA', change: -8.32, changePercent: -4.2 },
              { ticker: 'NVDA', change: -5.89, changePercent: -3.1 },
              { ticker: 'META', change: -4.12, changePercent: -2.8 },
              { ticker: 'NFLX', change: -3.45, changePercent: -2.3 },
              { ticker: 'AMD', change: -2.78, changePercent: -1.9 },
              { ticker: 'AAPL', change: -2.45, changePercent: -1.7 },
              { ticker: 'MSFT', change: -2.12, changePercent: -1.5 },
              { ticker: 'GOOGL', change: -1.89, changePercent: -1.3 }
            ]
          });
        } else {
          setData(response.data);
        }
      } catch (err) {
        setError('Failed to fetch movers and shakers data');
        // Fallback to mock data - reflecting a down market
        setData({
          movers: [
            { ticker: 'NVDA', change: 2.34, changePercent: 1.1 },
            { ticker: 'AAPL', change: 1.89, changePercent: 0.9 },
            { ticker: 'MSFT', change: 1.45, changePercent: 0.7 },
            { ticker: 'GOOGL', change: 1.12, changePercent: 0.5 },
            { ticker: 'AMZN', change: 0.78, changePercent: 0.3 },
            { ticker: 'META', change: 0.45, changePercent: 0.2 },
            { ticker: 'NFLX', change: 0.23, changePercent: 0.1 },
            { ticker: 'TSLA', change: 0.12, changePercent: 0.05 }
          ],
          shakers: [
            { ticker: 'TSLA', change: -8.32, changePercent: -4.2 },
            { ticker: 'NVDA', change: -5.89, changePercent: -3.1 },
            { ticker: 'META', change: -4.12, changePercent: -2.8 },
            { ticker: 'NFLX', change: -3.45, changePercent: -2.3 },
            { ticker: 'AMD', change: -2.78, changePercent: -1.9 },
            { ticker: 'AAPL', change: -2.45, changePercent: -1.7 },
            { ticker: 'MSFT', change: -2.12, changePercent: -1.5 },
            { ticker: 'GOOGL', change: -1.89, changePercent: -1.3 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMoversShakers();
  }, []);

  return { data, loading, error };
}; 