export function calculateLiveValue(portfolio: any, priceMap: { [key: string]: number }) {
  let value = 0;
  portfolio.transactions.forEach((tx: any) => {
    if (tx.type === 'buy') {
      const price = priceMap[tx.stockSymbol] ?? 0;
      value += price * tx.quantity;
    }
    if (tx.type === 'sell') {
      const price = priceMap[tx.stockSymbol] ?? 0;
      value -= price * tx.quantity;
    }
  });
  return value;
}

export function calculateAllPortfoliosLiveValue(portfolios: any[], priceMap: { [key: string]: number }) {
  return portfolios.reduce((sum, p) => sum + calculateLiveValue(p, priceMap), 0);
} 