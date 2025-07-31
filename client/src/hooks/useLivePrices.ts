import { useState, useEffect } from 'react';

interface PriceData {
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

export function useLivePrices(portfolios: any[]) {
  const [priceMap, setPriceMap] = useState<{ [key: string]: PriceData }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      try {
        const symbols = new Set<string>();
        portfolios.forEach(portfolio => {
          portfolio.transactions.forEach((tx: any) => {
            if (tx.type === 'buy') symbols.add(tx.stockSymbol);
          });
        });
        const symbolList = Array.from(symbols);
        
        if (symbolList.length === 0) {
          setPriceMap({});
          setLoading(false);
          return;
        }
        const response = await fetch(`/api/stock/prices?symbols=${symbolList.join(',')}`);
        if (!response.ok) throw new Error('Failed to fetch prices');
        const prices = await response.json();
        setPriceMap(prices);
      } catch (error) {
        console.error('❌ Error fetching prices:', error);
        setPriceMap({});
      } finally {
        setLoading(false);
      }
    }
    if (portfolios.length > 0) fetchPrices();
    else setPriceMap({});
  }, [portfolios]);
  return { priceMap, loading };
} 