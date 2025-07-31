import { useState, useEffect } from 'react';
import apiCall from '../utils/api';

interface DividendData {
  symbol: string;
  amount: number;
  date: string;
  shares: number;
  dividendPerShare: number;
  exDate?: string;
  paymentDate?: string;
}

interface DividendCalculation {
  totalDividends: number;
  dividendsByYear: { [year: string]: number };
  dividendsByTicker: { [ticker: string]: any };
  dividendSchedule: DividendData[];
  loading: boolean;
  error: string | null;
}

export const useDividendData = (portfolioData: any[]) => {
  const [dividendData, setDividendData] = useState<DividendCalculation>({
    totalDividends: 0,
    dividendsByYear: {},
    dividendsByTicker: {},
    dividendSchedule: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    const calculateDividends = async () => {
      if (!portfolioData.length) {
        setDividendData(prev => ({ ...prev, loading: false }));
        return;
      }

      setDividendData(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Extract unique stock symbols from all portfolios
        const uniqueSymbols = new Set<string>();
        portfolioData.forEach(portfolio => {
          if (portfolio.transactions && portfolio.transactions.length > 0) {
            portfolio.transactions.forEach((tx: any) => {
              if (tx.stockSymbol) {
                uniqueSymbols.add(tx.stockSymbol);
              }
            });
          }
        });

        const symbols = Array.from(uniqueSymbols);
        console.log('📊 Calculating dividends for symbols:', symbols);

        // Fetch dividend data for each symbol
        const response = await apiCall('/api/stock/dividends', {
          method: 'POST',
          data: { symbols }
        });

        if (response.data) {
          const { dividendSchedule, totalDividends, dividendsByYear, dividendsByTicker } = response.data;
          
          console.log('💰 Dividend calculation results:', {
            totalDividends,
            dividendsByYear,
            scheduleLength: dividendSchedule.length
          });

          setDividendData({
            totalDividends,
            dividendsByYear,
            dividendsByTicker,
            dividendSchedule,
            loading: false,
            error: null
          });
        } else {
          throw new Error(response.error?.message || 'Failed to fetch dividend data');
        }
      } catch (error) {
        console.error('❌ Error calculating dividends:', error);
        setDividendData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to calculate dividends'
        }));
      }
    };

    calculateDividends();
  }, [portfolioData]);

  return dividendData;
}; 