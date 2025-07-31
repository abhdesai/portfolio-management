// Portfolio calculation utilities
export const calculatePortfolioMetrics = (portfolio: any) => {
  const invested = portfolio.transactions
    .filter((tx: any) => tx.type === 'buy')
    .reduce((sum: number, tx: any) => sum + (tx.price * tx.quantity), 0);
  const realized = portfolio.transactions
    .filter((tx: any) => tx.type === 'sell')
    .reduce((sum: number, tx: any) => sum + (tx.price * tx.quantity), 0);
  const netValue = invested - realized;
  const currentValue = portfolio.currentValue || 0;
  
  return { invested, realized, netValue, currentValue };
};

export const sortTransactions = (transactions: any[], field: string, order: 'asc' | 'desc') => {
  return [...transactions].sort((a: any, b: any) => {
    let aValue: any, bValue: any;
    switch (field) {
      case 'date':
        aValue = new Date(a?.date ?? '').getTime();
        bValue = new Date(b?.date ?? '').getTime();
        break;
      case 'ticker':
        aValue = String(a?.stockSymbol ?? '').toUpperCase();
        bValue = String(b?.stockSymbol ?? '').toUpperCase();
        break;
      case 'company':
        aValue = String(a?.companyName ?? '').toUpperCase();
        bValue = String(b?.companyName ?? '').toUpperCase();
        break;
      case 'type':
        aValue = String(a?.type ?? '').toUpperCase();
        bValue = String(b?.type ?? '').toUpperCase();
        break;
      case 'price':
        aValue = a?.price ?? 0;
        bValue = b?.price ?? 0;
        break;
      case 'quantity':
        aValue = a?.quantity ?? 0;
        bValue = b?.quantity ?? 0;
        break;
      case 'value':
        aValue = (a?.price ?? 0) * (a?.quantity ?? 0);
        bValue = (b?.price ?? 0) * (b?.quantity ?? 0);
        break;
      default:
        aValue = new Date(a?.date ?? '').getTime();
        bValue = new Date(b?.date ?? '').getTime();
    }
    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const validatePortfolioName = (name: string, existingPortfolios: any[]) => {
  if (name.length < 8) {
    return 'Portfolio name must be at least 8 characters long';
  }
  if (existingPortfolios.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    return 'A portfolio with this name already exists';
  }
  return '';
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString(undefined, { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  });
};

export const formatPercentage = (value: number, total: number) => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(2)}%`;
}; 