import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { usePortfolioContext } from '../contexts/PortfolioContext';
import { useNotification } from '../contexts/NotificationContext';
import { clientError } from '../utils/debug';

export const usePortfolioData = () => {
  const { portfolios, setPortfolios, loading, fetchPortfolios } = usePortfolioContext();
  const { showNotification } = useNotification();
  
  // Portfolio management states
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<any | null>(null);
  const [addPortfolioOpen, setAddPortfolioOpen] = useState(false);
  const [deletePortfolioOpen, setDeletePortfolioOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<any | null>(null);
  const [editTransactionOpen, setEditTransactionOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<any | null>(null);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [newPortfolioDescription, setNewPortfolioDescription] = useState('');
  const [addPortfolioError, setAddPortfolioError] = useState('');

  // Portfolio-specific sorting states
  const [portfolioSortFields, setPortfolioSortFields] = useState<{[portfolioId: string]: string}>({});
  const [portfolioSortOrders, setPortfolioSortOrders] = useState<{[portfolioId: string]: 'asc' | 'desc'}>({});

  // Lazy loading states
  const [expandedPortfolios, setExpandedPortfolios] = useState<Set<string>>(new Set());
  const [loadedPortfolios, setLoadedPortfolios] = useState<Set<string>>(new Set());
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 7 });
  const VISIBLE_PORTFOLIOS = 5;

  // Intersection observer ref for loading more portfolios
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Calculate sorted portfolios early
  const sortedPortfolios = useMemo(() => {
    return portfolios.sort((a, b) => {
      const aValue = a.currentValue || 0;
      const bValue = b.currentValue || 0;
      return bValue - aValue; // Decreasing order
    });
  }, [portfolios]);

  // Get visible portfolios for virtual scrolling
  const visiblePortfolios = useMemo(() => {
    return sortedPortfolios.slice(visibleRange.start, visibleRange.end);
  }, [sortedPortfolios, visibleRange.start, visibleRange.end]);

  // Memoize portfolio metrics calculations
  const portfolioMetricsMap = useMemo(() => {
    const metrics: { [key: string]: any } = {};
    visiblePortfolios.forEach(portfolio => {
      const invested = portfolio.transactions
        .filter((tx: any) => tx.type === 'buy')
        .reduce((sum: number, tx: any) => sum + (tx.price * tx.quantity), 0);
      const realized = portfolio.transactions
        .filter((tx: any) => tx.type === 'sell')
        .reduce((sum: number, tx: any) => sum + (tx.price * tx.quantity), 0);
      const netValue = invested - realized;
      const currentValue = portfolio.currentValue || 0;
      metrics[portfolio.id] = { invested, realized, netValue, currentValue };
    });
    return metrics;
  }, [visiblePortfolios]);

  // Memoize sorted transactions for each portfolio
  const sortedTransactionsMap = useMemo(() => {
    const transactions: { [key: string]: any[] } = {};
    visiblePortfolios.forEach(portfolio => {
      const sortField = portfolioSortFields[portfolio.id] || 'date';
      const sortOrder = portfolioSortOrders[portfolio.id] || 'desc';
      const sorted = [...portfolio.transactions].sort((a: any, b: any) => {
        let aValue: any, bValue: any;
        switch (sortField) {
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
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      transactions[portfolio.id] = sorted;
    });
    return transactions;
  }, [visiblePortfolios, portfolioSortFields, portfolioSortOrders]);

  // Lazy loading helper functions
  const loadMorePortfolios = useCallback(() => {
    setVisibleRange(prev => ({
      start: prev.start,
      end: Math.min(prev.end + VISIBLE_PORTFOLIOS, sortedPortfolios.length)
    }));
  }, [sortedPortfolios.length]);

  const handleAccordionExpand = useCallback((portfolioId: string, isExpanded: boolean) => {
    if (isExpanded) {
      setLoadedPortfolios(prev => {
        const newSet = new Set(prev);
        newSet.add(portfolioId);
        return newSet;
      });
    }
    setExpandedPortfolios(prev => {
      const newSet = new Set(prev);
      if (isExpanded) {
        newSet.add(portfolioId);
      } else {
        newSet.delete(portfolioId);
      }
      return newSet;
    });
  }, []);

  // Memory management - clean up loaded portfolios when they're far from view
  useEffect(() => {
    const cleanupTimer = setTimeout(() => {
      const visibleIds = new Set(visiblePortfolios.map(p => String(p.id)));
      setLoadedPortfolios(prev => {
        const newSet = new Set(prev);
        Array.from(newSet).forEach(id => {
          if (!visibleIds.has(id) && !expandedPortfolios.has(id)) {
            newSet.delete(id);
          }
        });
        return newSet;
      });
    }, 60000);

    return () => clearTimeout(cleanupTimer);
  }, [visiblePortfolios, expandedPortfolios]);

  // Intersection observer for loading more portfolios with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && visibleRange.end < sortedPortfolios.length) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              loadMorePortfolios();
            }, 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [visibleRange.end, sortedPortfolios.length, loadMorePortfolios]);

  // Optimized helper functions using memoized data
  const getPortfolioMetrics = useCallback((portfolio: any) => {
    return portfolioMetricsMap[portfolio.id] || {
      invested: 0,
      realized: 0,
      netValue: 0,
      currentValue: 0
    };
  }, [portfolioMetricsMap]);

  const getSortedTransactions = useCallback((portfolio: any) => {
    return sortedTransactionsMap[portfolio.id] || [];
  }, [sortedTransactionsMap]);

  const handlePortfolioSortChange = useCallback((portfolioId: string, field: string) => {
    setPortfolioSortFields(prev => ({
      ...prev,
      [portfolioId]: field
    }));
    setPortfolioSortOrders(prev => ({
      ...prev,
      [portfolioId]: prev[portfolioId] === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Portfolio CRUD operations
  const validatePortfolioName = useCallback((name: string) => {
    if (name.length < 8) {
      return 'Portfolio name must be at least 8 characters long';
    }
    if (portfolios.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      return 'A portfolio with this name already exists';
    }
    return '';
  }, [portfolios]);

  const handleAddPortfolio = useCallback(async () => {
    const error = validatePortfolioName(newPortfolioName);
    setAddPortfolioError(error);
    if (error) return;
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ 
          name: newPortfolioName.trim(),
          description: newPortfolioDescription.trim()
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        setAddPortfolioError(error.message || 'Failed to create portfolio');
        showNotification(error.message || 'Failed to create portfolio', 'error');
        return;
      }
      
      const newPortfolio = await response.json();
      setNewPortfolioName('');
      setNewPortfolioDescription('');
      setAddPortfolioOpen(false);
      setAddPortfolioError('');
      
      setPortfolios(prev => [...prev, { 
        ...newPortfolio, 
        description: newPortfolio.description || '', 
        transactions: [], 
        currentValue: 0, 
        tickers: {} 
      }]);
      
      showNotification('Portfolio added successfully!', 'success');
      fetchPortfoliosNoLoading();
    } catch (error) {
      clientError('Error creating portfolio:', error);
      showNotification('Failed to create portfolio', 'error');
    } finally {
      setAddPortfolioOpen(false);
      setNewPortfolioName('');
      setNewPortfolioDescription('');
      setAddPortfolioError('');
    }
  }, [newPortfolioName, newPortfolioDescription, validatePortfolioName, setPortfolios, showNotification]);

  const confirmDeletePortfolio = useCallback(async () => {
    if (!portfolioToDelete) return;
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/api/portfolios/${portfolioToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete portfolio');
      }
      
      setPortfolios(prev => prev.filter(p => p.id !== portfolioToDelete.id));
      setDeletePortfolioOpen(false);
      setPortfolioToDelete(null);
      showNotification('Portfolio deleted successfully!', 'success');
      fetchPortfoliosNoLoading();
    } catch (error) {
      clientError('Error deleting portfolio:', error);
      showNotification('Failed to delete portfolio', 'error');
    } finally {
      setDeletePortfolioOpen(false);
      setPortfolioToDelete(null);
    }
  }, [portfolioToDelete, setPortfolios, showNotification]);

  const handleDeletePortfolio = useCallback((portfolio: any) => {
    setPortfolioToDelete(portfolio);
    setDeletePortfolioOpen(true);
  }, []);

  const fetchPortfoliosNoLoading = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('/api/portfolios', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch portfolios');
      }
      const data = await response.json();
      setPortfolios(data);
    } catch (error) {
      clientError('Error fetching portfolios:', error);
      showNotification('Failed to fetch portfolios', 'error');
    }
  }, [setPortfolios, showNotification]);

  // Transaction operations
  const handleAddTransaction = useCallback((portfolio: any) => {
    setSelectedPortfolio(portfolio);
    setAddTransactionOpen(true);
  }, []);

  const handleTransactionAdded = useCallback((portfolioId: number, newTransaction: any) => {
    setPortfolios(prev => prev.map(p =>
      p.id === portfolioId
        ? { ...p, transactions: [...p.transactions, newTransaction] }
        : p
    ));
    setAddTransactionOpen(false);
    setSelectedPortfolio(null);
    showNotification('Transaction added successfully!', 'success');
    fetchPortfoliosNoLoading();
  }, [setPortfolios, showNotification, fetchPortfoliosNoLoading]);

  const handleTransactionEdited = useCallback((portfolioId: number, updatedTransaction: any) => {
    setPortfolios(prev => prev.map(p =>
      p.id === portfolioId
        ? { ...p, transactions: p.transactions.map((tx: any) => tx.id === updatedTransaction.id ? updatedTransaction : tx) }
        : p
    ));
    setEditTransactionOpen(false);
    setTransactionToEdit(null);
    showNotification('Transaction updated successfully!', 'success');
    fetchPortfoliosNoLoading();
  }, [setPortfolios, showNotification, fetchPortfoliosNoLoading]);

  const handleEditTransaction = useCallback((transaction: any, portfolio: any) => {
    setTransactionToEdit({ ...transaction, companyName: transaction.companyName, portfolioId: portfolio.id });
    setEditTransactionOpen(true);
  }, []);

  const handleDeleteTransaction = useCallback((transaction: any) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDeleteTransaction = useCallback(async () => {
    if (!transactionToDelete) return;
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/api/portfolios/${transactionToDelete.portfolioId}/transactions/${transactionToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      
      setPortfolios(prev => prev.map(p =>
        p.id === transactionToDelete.portfolioId
          ? { ...p, transactions: p.transactions.filter((tx: any) => tx.id !== transactionToDelete.id) }
          : p
      ));
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
      showNotification('Transaction deleted successfully!', 'success');
      fetchPortfoliosNoLoading();
    } catch (error) {
      clientError('Error deleting transaction:', error);
      showNotification('Failed to delete transaction', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  }, [transactionToDelete, setPortfolios, showNotification, fetchPortfoliosNoLoading]);

  // Initial data loading
  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {
    // Data
    portfolios: visiblePortfolios,
    sortedPortfolios,
    loading,
    loadMoreRef,
    
    // Portfolio states
    addTransactionOpen,
    setAddTransactionOpen,
    selectedPortfolio,
    setSelectedPortfolio,
    deleteDialogOpen,
    setDeleteDialogOpen,
    transactionToDelete,
    setTransactionToDelete,
    addPortfolioOpen,
    setAddPortfolioOpen,
    deletePortfolioOpen,
    setDeletePortfolioOpen,
    portfolioToDelete,
    setPortfolioToDelete,
    editTransactionOpen,
    setEditTransactionOpen,
    transactionToEdit,
    setTransactionToEdit,
    newPortfolioName,
    setNewPortfolioName,
    newPortfolioDescription,
    setNewPortfolioDescription,
    addPortfolioError,
    setAddPortfolioError,
    
    // Lazy loading states
    expandedPortfolios,
    loadedPortfolios,
    visibleRange,
    portfolioSortFields,
    portfolioSortOrders,
    
    // Helper functions
    getPortfolioMetrics,
    getSortedTransactions,
    handleAccordionExpand,
    handlePortfolioSortChange,
    validatePortfolioName,
    
    // CRUD operations
    handleAddPortfolio,
    confirmDeletePortfolio,
    handleDeletePortfolio,
    handleAddTransaction,
    handleTransactionAdded,
    handleTransactionEdited,
    handleEditTransaction,
    handleDeleteTransaction,
    confirmDeleteTransaction,
    
    // Loading states
    sortedPortfoliosLength: sortedPortfolios.length
  };
}; 