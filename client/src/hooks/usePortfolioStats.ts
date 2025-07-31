import { useMemo } from 'react';

interface PriceData {
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

export const usePortfolioStats = (portfolios: any[], currentPrices: {[key: string]: PriceData}) => {
  const portfolioStats = useMemo(() => {
    const totalPortfolios = portfolios.length;
    const totalTransactions = portfolios.reduce((sum, p) => sum + p.transactions.length, 0);
    
    // Calculate total invested and realized
    const totalInvested = portfolios.reduce((sum, p) => {
      return sum + p.transactions
        .filter((tx: any) => tx.type === 'buy')
        .reduce((txSum: number, tx: any) => txSum + (tx.price * tx.quantity), 0);
    }, 0);
    const totalRealized = portfolios.reduce((sum, p) => {
      return sum + p.transactions
        .filter((tx: any) => tx.type === 'sell')
        .reduce((txSum: number, tx: any) => txSum + (tx.price * tx.quantity), 0);
    }, 0);
    
    // Calculate net cost (total invested - total realized)
    const netCost = totalInvested - totalRealized;
    
    // Calculate current live value using current prices
    const liveValue = portfolios.reduce((sum, p) => {
      return sum + p.transactions.reduce((portfolioSum: number, tx: any) => {
        if (tx.type === 'buy') {
          const currentPrice = currentPrices[tx.stockSymbol]?.price || tx.price;
          return portfolioSum + (tx.quantity * currentPrice);
        } else if (tx.type === 'sell') {
          const currentPrice = currentPrices[tx.stockSymbol]?.price || tx.price;
          return portfolioSum - (tx.quantity * currentPrice);
        }
        return portfolioSum;
      }, 0);
    }, 0);
    
    // Calculate gain/loss
    const gainLoss = liveValue - netCost;
    const gainLossPercent = netCost > 0 ? (gainLoss / netCost) * 100 : 0;
    
    // Calculate today's change
    let todaysChange = 0;
    let todaysChangePercent = 0;
    
    portfolios.forEach(portfolio => {
      portfolio.transactions.forEach((tx: any) => {
        const priceData = currentPrices[tx.stockSymbol];
        
        if (priceData && priceData.previousClose && priceData.price) {
          const quantity = tx.type === 'buy' ? tx.quantity : -tx.quantity;
          const dailyChange = quantity * priceData.change;
          todaysChange += dailyChange;
        }
      });
    });
    
    // Calculate today's change percentage based on previous day's total value
    const previousDayValue = portfolios.reduce((sum, p) => {
      return sum + p.transactions.reduce((portfolioSum: number, tx: any) => {
        if (tx.type === 'buy') {
          const previousPrice = currentPrices[tx.stockSymbol]?.previousClose || tx.price;
          return portfolioSum + (tx.quantity * previousPrice);
        } else if (tx.type === 'sell') {
          const previousPrice = currentPrices[tx.stockSymbol]?.previousClose || tx.price;
          return portfolioSum - (tx.quantity * previousPrice);
        }
        return portfolioSum;
      }, 0);
    }, 0);
    
    todaysChangePercent = previousDayValue > 0 ? (todaysChange / previousDayValue) * 100 : 0;
    
    // Calculate number of unique tickers
    const uniqueTickers = new Set<string>();
    portfolios.forEach(portfolio => {
      portfolio.transactions.forEach((tx: any) => {
        uniqueTickers.add(tx.stockSymbol);
      });
    });
    const numberOfTickers = uniqueTickers.size;
    
    return {
      totalPortfolios,
      totalTransactions,
      totalInvested,
      totalRealized,
      netCost,
      liveValue,
      gainLoss,
      gainLossPercent,
      numberOfTickers,
      todaysChange,
      todaysChangePercent
    };
  }, [portfolios, currentPrices]);

  return portfolioStats;
}; 