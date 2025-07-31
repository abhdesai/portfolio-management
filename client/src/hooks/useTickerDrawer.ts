import { useState, useEffect, useRef, useCallback } from 'react';
import apiCall from '../utils/api';

export const useTickerDrawer = () => {
  // Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTicker, setDrawerTicker] = useState<string | null>(null);
  const [drawerTransaction, setDrawerTransaction] = useState<any | null>(null);
  const [drawerChartData, setDrawerChartData] = useState<any>(null);
  
  // Ticker data states
  const [tickerInfo, setTickerInfo] = useState<any>(null);
  const [tickerChart, setTickerChart] = useState<any>(null);
  const [tickerNews, setTickerNews] = useState<any[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerError, setDrawerError] = useState<string | null>(null);
  const [tickerEvents, setTickerEvents] = useState<any>(null);
  
  // Drawer resizing logic
  const [drawerWidth, setDrawerWidth] = useState(900);
  const minDrawerWidth = 400;
  const maxDrawerWidth = 1400;
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(900);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = drawerWidth;
    document.body.style.cursor = 'ew-resize';
    e.preventDefault();
  };

  // Drawer resize effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = Math.min(maxDrawerWidth, Math.max(minDrawerWidth, startWidth.current + (startX.current - e.clientX)));
      setDrawerWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [drawerWidth]);

  // Fetch ticker info/chart/news when drawerTicker changes
  useEffect(() => {
    if (
      !drawerTicker ||
      typeof drawerTicker !== 'string' ||
      drawerTicker === 'undefined' ||
      drawerTicker === 'null' ||
      !drawerTicker.trim() ||
      drawerTicker.trim().length < 1 ||
      drawerTicker.trim().length > 10
    ) {
      console.warn('Skipping chart API call due to invalid drawerTicker:', drawerTicker);
      return;
    }
    
    if (!/^[A-Za-z0-9]+$/.test(drawerTicker.trim())) {
      console.warn('Ticker contains invalid characters, skipping:', drawerTicker);
      return;
    }
    
    console.log('Making chart API call with drawerTicker:', drawerTicker);
    setDrawerLoading(true);
    setDrawerError(null);
    
    Promise.all([
      fetch(`/api/ticker/info?symbol=${drawerTicker}`).then(r => r.json()),
      fetch(`/api/ticker/news?symbol=${drawerTicker}`).then(r => r.json()),
      fetch(`/api/ticker/events?symbol=${drawerTicker}`).then(r => r.json())
    ]).then(([info, news, events]) => {
      setTickerInfo(info);
      setTickerNews(news);
      setTickerEvents(events);
      setDrawerLoading(false);
    }).catch(err => {
      setDrawerError('Failed to load ticker data');
      setDrawerLoading(false);
    });
  }, [drawerTicker]);

  // Fetch chart data for drawer transaction
  useEffect(() => {
    if (!drawerTransaction || !drawerTransaction.stockSymbol || !drawerTransaction.date) {
      setDrawerChartData([]);
      return;
    }
    
    const symbol = drawerTransaction.stockSymbol;
    const txDate = new Date(drawerTransaction.date);
    const end = Math.floor(Date.now() / 1000);
    const startDate = new Date(txDate);
    startDate.setMonth(startDate.getMonth() - 6);
    const start = Math.floor(startDate.getTime() / 1000);
    
    apiCall(`/api/ticker/chart?symbol=${symbol}&period1=${start}&period2=${end}&interval=1d`).then(res => {
      if (res.data && Array.isArray(res.data.quotes)) {
        const dataMap = new Map<string, number>();
        res.data.quotes
          .filter((q: any) => q.close != null && q.date)
          .forEach((q: any) => {
            const time = q.date.split('T')[0];
            dataMap.set(time, parseFloat(q.close));
          });
        const chartData = Array.from(dataMap.entries()).map(([time, value]) => ({ time, value }));
        setDrawerChartData(chartData);
      }
    }).catch(err => {
      console.error('Error fetching chart data:', err);
      setDrawerChartData([]);
    });
  }, [drawerTransaction]);

  const openDrawer = useCallback((ticker: string, transaction?: any) => {
    setDrawerTicker(ticker);
    if (transaction) {
      setDrawerTransaction(transaction);
    }
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setDrawerTicker(null);
    setDrawerTransaction(null);
    setDrawerChartData(null);
    setTickerInfo(null);
    setTickerNews([]);
    setTickerEvents(null);
    setDrawerError(null);
  }, []);

  return {
    // Drawer state
    drawerOpen,
    drawerTicker,
    drawerTransaction,
    drawerChartData,
    drawerWidth,
    drawerLoading,
    drawerError,
    
    // Ticker data
    tickerInfo,
    tickerNews,
    tickerEvents,
    
    // Actions
    openDrawer,
    closeDrawer,
    handleResizeMouseDown,
    
    // Constants
    minDrawerWidth,
    maxDrawerWidth
  };
}; 