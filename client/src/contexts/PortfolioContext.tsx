import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export interface Portfolio {
  id: number;
  name: string;
  description?: string;
  transactions: any[];
  createdAt: string;
  updatedAt: string;
  tickers?: Record<string, any>;
  currentValue?: number;
}

interface PortfolioContextType {
  portfolios: Portfolio[];
  loading: boolean;
  fetchPortfolios: () => Promise<void>;
  setPortfolios: React.Dispatch<React.SetStateAction<Portfolio[]>>;
  refreshPortfolios: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchInProgress = useRef(false);

  const fetchPortfolios = useCallback(async () => {
    if (fetchInProgress.current) {
      // Prevent duplicate fetches
      return;
    }
    fetchInProgress.current = true;
    const token = sessionStorage.getItem('token');
    
    console.log('🔍 PortfolioContext Debug:');
    console.log('🔑 Token exists:', !!token);
    console.log('🔑 Token length:', token ? token.length : 0);
    
    // Only fetch portfolios if user is authenticated
    if (!token) {
      console.log('❌ No token found, clearing portfolios');
      setPortfolios([]);
      setLoading(false);
      fetchInProgress.current = false;
      return;
    }

    setLoading(true);
    try {
      console.log('📡 Fetching portfolios with token...');
      const response = await fetch('/api/portfolios', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📊 Portfolios fetched successfully:', data.length, 'portfolios');
        setPortfolios(data);
      } else {
        console.log('❌ Failed to fetch portfolios, status:', response.status);
        // If unauthorized, clear portfolios
        setPortfolios([]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch portfolios:', error);
      setPortfolios([]);
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  }, []);

  // Alias for clarity
  const refreshPortfolios = fetchPortfolios;

  // Fetch portfolios once on provider mount, but only if authenticated
  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchPortfolios();
    }
  }, [fetchPortfolios]);

  // Listen for authentication state changes
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          // User logged in, fetch portfolios
          fetchPortfolios();
        } else {
          // User logged out, clear portfolios
          setPortfolios([]);
          setLoading(false);
        }
      }
    };

    // Listen for storage events (when user logs in/out in another tab)
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (when user logs in/out in same tab)
    const handleAuthChange = () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        fetchPortfolios();
      } else {
        setPortfolios([]);
        setLoading(false);
      }
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [fetchPortfolios]);

  return (
    <PortfolioContext.Provider value={{ portfolios, loading, fetchPortfolios, setPortfolios, refreshPortfolios }}>
      {children}
    </PortfolioContext.Provider>
  );
}; 