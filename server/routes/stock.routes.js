const express = require('express');
const router = express.Router();
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');

/**
 * @swagger
 * /api/stock/prices:
 *   get:
 *     summary: Get real-time stock prices for a list of symbols
 *     description: Returns the latest price for each requested stock symbol using Yahoo Finance.
 *     parameters:
 *       - in: query
 *         name: symbols
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of stock symbols (e.g., AAPL,GOOGL,MSFT)
 *     responses:
 *       200:
 *         description: Real-time prices for requested symbols
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: number
 *       400:
 *         description: Bad request - missing symbols parameter
 *       500:
 *         description: Internal server error
 */
router.get('/prices', async (req, res) => {
  try {
    const { symbols } = req.query;
    if (!symbols) {
      return res.status(400).json({ error: 'Query parameter "symbols" is required' });
    }
    const symbolList = symbols.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
    if (symbolList.length === 0) {
      return res.status(400).json({ error: 'No valid symbols provided' });
    }
    const yahooFinance = require('yahoo-finance2').default;
    const results = await Promise.all(symbolList.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);
        return { 
          symbol, 
          price: quote.regularMarketPrice,
          previousClose: quote.regularMarketPreviousClose,
          change: quote.regularMarketPrice - quote.regularMarketPreviousClose,
          changePercent: ((quote.regularMarketPrice - quote.regularMarketPreviousClose) / quote.regularMarketPreviousClose) * 100
        };
      } catch (err) {
        return { symbol, price: null, previousClose: null, change: null, changePercent: null };
      }
    }));
    const prices = {};
    results.forEach(({ symbol, price, previousClose, change, changePercent }) => {
      prices[symbol] = { price, previousClose, change, changePercent };
    });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock prices', message: error.message });
  }
});

/**
 * @swagger
 * /api/stock/chart:
 *   get:
 *     summary: Get historical chart data for a stock
 *     description: Returns historical price data for charting purposes.
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock symbol (e.g., AAPL)
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *         description: Start date in YYYY-MM-DD format
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *         description: End date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Historical price data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   close:
 *                     type: number
 *       400:
 *         description: Bad request - missing parameters
 *       500:
 *         description: Internal server error
 */
router.get('/chart', async (req, res) => {
  try {
    const { symbol, startDate, endDate } = req.query;
    
    if (!symbol || !startDate || !endDate) {
      return res.status(400).json({ error: 'Query parameters "symbol", "startDate", and "endDate" are required' });
    }

    // For now, generate mock data
    // In production, this would fetch real data from Yahoo Finance or another API
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Generate mock price data with some realistic variation
    const basePrice = 100 + Math.random() * 100; // Random base price between 100-200
    const chartData = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Add some random price movement
      const priceChange = (Math.random() - 0.5) * 2; // -1 to +1
      const price = basePrice + (i * 0.1) + priceChange; // Slight upward trend with noise
      
      chartData.push({
        date: date.toISOString().split('T')[0],
        close: Math.round(price * 100) / 100
      });
    }
    
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chart data', message: error.message });
  }
});

/**
 * @swagger
 * /api/movers-shakers:
 *   get:
 *     summary: Get today's top movers and shakers
 *     description: Returns the top performing and worst performing stocks from user portfolios.
 *     responses:
 *       200:
 *         description: Top movers and shakers data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticker:
 *                         type: string
 *                       change:
 *                         type: number
 *                       changePercent:
 *                         type: number
 *                 shakers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticker:
 *                         type: string
 *                       change:
 *                         type: number
 *                       changePercent:
 *                         type: number
 *       500:
 *         description: Internal server error
 */
router.get('/movers-shakers', async (req, res) => {
  try {
    appDebug('🔍 Fetching movers and shakers data...');
    
    // Get all unique tickers from user portfolios
    const prisma = require('../utils/database');
    
    // Get all unique stock symbols from transactions
    const transactions = await prisma.transaction.findMany({
      select: {
        stockSymbol: true
      },
      distinct: ['stockSymbol']
    });
    
    const symbols = transactions.map(t => t.stockSymbol);
    appDebug('📊 Found symbols in database:', symbols);
    
    if (symbols.length === 0) {
      appWarn('⚠️ No symbols found in database, using test symbols');
      // Use some common test symbols if no data in database
      symbols.push('AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA');
    }
    
    // Get current prices and calculate changes
    const yahooFinance = require('yahoo-finance2').default;
    const stockData = [];
    
    // Test the Yahoo Finance connection first
    try {
      appDebug('🧪 Testing Yahoo Finance connection...');
      const testQuote = await yahooFinance.quote('AAPL');
      appInfo('✅ Yahoo Finance connection successful:', {
        symbol: testQuote.symbol,
        price: testQuote.regularMarketPrice,
        previousClose: testQuote.regularMarketPreviousClose
      });
    } catch (err) {
      techError('❌ Yahoo Finance connection failed:', err.message);
      // Return error response
      return res.status(500).json({
        error: 'Yahoo Finance API is not available',
        message: err.message,
        fallback: true
      });
    }
    
    appDebug('📈 Fetching price data for symbols:', symbols);
    
    for (const symbol of symbols) {
      try {
        appDebug(`🔍 Fetching data for ${symbol}...`);
        const quote = await yahooFinance.quote(symbol);
        
        // Validate that we have real data
        if (!quote.regularMarketPrice || !quote.regularMarketPreviousClose) {
          appWarn(`⚠️ Invalid data for ${symbol}:`, quote);
          continue;
        }
        
        const previousClose = quote.regularMarketPreviousClose;
        const currentPrice = quote.regularMarketPrice;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        // Additional validation - check if data seems reasonable
        if (Math.abs(changePercent) > 50) {
          appWarn(`⚠️ Suspicious change for ${symbol}: ${changePercent}% - skipping`);
          continue;
        }
        
        appDebug(`${symbol}: Previous=$${previousClose}, Current=$${currentPrice}, Change=$${change}, %=${changePercent}%`);
        
        stockData.push({
          ticker: symbol,
          change: Math.round(change * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100
        });
        
        // Log if there's a symbol mismatch
        if (quote.symbol !== symbol) {
          appWarn(`⚠️ Symbol mismatch: Database has ${symbol}, Yahoo returned ${quote.symbol}`);
        }
      } catch (err) {
        // Skip stocks that can't be fetched
        techError(`❌ Failed to fetch data for ${symbol}:`, err.message);
      }
    }
    
    appDebug('📊 Processed stock data:', stockData);
    
    // Sort by percentage change
    stockData.sort((a, b) => b.changePercent - a.changePercent);
    
    // Get top 8 movers (positive changes)
    const movers = stockData
      .filter(stock => stock.change > 0)
      .slice(0, 8);
    
    // Get top 8 shakers (negative changes)
    const shakers = stockData
      .filter(stock => stock.change < 0)
      .slice(0, 8);
    
    appDebug('📈 Top movers:', movers);
    appDebug('📉 Top shakers:', shakers);
    
    await prisma.$disconnect();
    
    res.json({
      movers,
      shakers,
      timestamp: new Date().toISOString(),
      dataSource: 'Yahoo Finance API'
    });
    
  } catch (error) {
    techError('❌ Error fetching movers and shakers:', error);
    res.status(500).json({ 
      error: 'Failed to fetch movers and shakers data', 
      message: error.message 
    });
  }
});

// Simple in-memory cache for dividend data (clears on server restart)
const dividendCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes - increased cache duration

// Calculate dividends for portfolio holdings using Yahoo Finance
router.post('/dividends', async (req, res) => {
  const { symbols } = req.body;
  
  if (!symbols || !Array.isArray(symbols)) {
    return res.status(400).json({ error: 'Symbols array is required' });
  }

  // Check cache first
  const cacheKey = symbols.sort().join(',');
  appDebug('🔍 Cache key:', cacheKey);
  appDebug('🔍 Cache size:', dividendCache.size);
  
  const cached = dividendCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    appDebug('💰 Returning cached dividend data');
    return res.json(cached.data);
  } else if (cached) {
    appDebug('⏰ Cache expired, recalculating...');
  } else {
    appDebug('🆕 No cache found, calculating...');
  }

  appDebug('💰 Calculating dividends for symbols:', symbols.length);

  try {
    const prisma = require('../utils/database');
    const yahooFinance = require('yahoo-finance2').default;

    const dividendSchedule = [];
    const dividendsByYear = {};
    const dividendsByTicker = {};
    let totalDividends = 0;

    // Get all transactions for all symbols in one query
    appDebug('📈 Fetching all transactions...');
    const allTransactions = await prisma.transaction.findMany({
      where: {
        stockSymbol: { in: symbols }
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Group transactions by symbol for faster lookup
    const transactionsBySymbol = {};
    allTransactions.forEach(tx => {
      if (!transactionsBySymbol[tx.stockSymbol]) {
        transactionsBySymbol[tx.stockSymbol] = [];
      }
      transactionsBySymbol[tx.stockSymbol].push(tx);
    });

        // Process symbols in parallel with optimized batching
    appDebug('📊 Fetching dividend data in parallel...');
    
    // Process symbols in batches to avoid overwhelming the API
    const batchSize = 5; // Process 5 symbols at a time
    const results = [];
    
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      appDebug(`📦 Processing batch ${Math.floor(i/batchSize) + 1}: ${batch.join(', ')}`);
      
      const batchPromises = batch.map(async (symbol) => {
        try {
          const dividendHistory = await yahooFinance.historical(symbol, {
            period1: '1990-01-01',
            period2: new Date().toISOString().split('T')[0],
            events: 'dividends'
          });

          const transactions = transactionsBySymbol[symbol] || [];
          if (!dividendHistory || dividendHistory.length === 0 || transactions.length === 0) {
            return { symbol, dividends: [] };
          }

          const symbolDividends = [];

          // Calculate dividends for each dividend event
          dividendHistory.forEach(dividend => {
            const paymentDate = new Date(dividend.date);
            const year = paymentDate.getFullYear().toString();
            
            // Calculate ex-dividend date (3 business days before payment)
            const exDividendDate = new Date(paymentDate);
            let businessDaysSubtracted = 0;
            while (businessDaysSubtracted < 3) {
              exDividendDate.setDate(exDividendDate.getDate() - 1);
              if (exDividendDate.getDay() !== 0 && exDividendDate.getDay() !== 6) {
                businessDaysSubtracted++;
              }
            }
            
            // Calculate shares owned on ex-dividend date
            let sharesOwned = 0;
            transactions.forEach(tx => {
              const txDate = new Date(tx.date);
              if (txDate <= exDividendDate) {
                if (tx.type.toUpperCase() === 'BUY') {
                  sharesOwned += tx.quantity;
                } else if (tx.type.toUpperCase() === 'SELL') {
                  sharesOwned -= tx.quantity;
                }
              }
            });
            
            // Only calculate dividend if shares were owned
            if (sharesOwned > 0) {
              const dividendAmount = dividend.dividends * sharesOwned;
              
              symbolDividends.push({
                symbol,
                amount: dividendAmount,
                date: dividend.date,
                exDate: exDividendDate.toISOString().split('T')[0],
                shares: sharesOwned,
                dividendPerShare: dividend.dividends,
                year
              });
            }
          });

          return { symbol, dividends: symbolDividends };
        } catch (symbolError) {
          console.error(`❌ Error processing ${symbol}:`, symbolError.message);
          return { symbol, dividends: [] };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    
    // Aggregate results
    results.forEach(result => {
      result.dividends.forEach(dividend => {
        dividendSchedule.push({
          symbol: dividend.symbol,
          amount: dividend.amount,
          date: dividend.date,
          exDate: dividend.exDate,
          shares: dividend.shares,
          dividendPerShare: dividend.dividendPerShare
        });
        
        // Group by year
        if (!dividendsByYear[dividend.year]) {
          dividendsByYear[dividend.year] = 0;
        }
        dividendsByYear[dividend.year] += dividend.amount;
        
        // Group by ticker
        if (!dividendsByTicker[dividend.symbol]) {
          dividendsByTicker[dividend.symbol] = {
            totalAmount: 0,
            totalShares: 0,
            dividendCount: 0,
            dividends: []
          };
        }
        dividendsByTicker[dividend.symbol].totalAmount += dividend.amount;
        dividendsByTicker[dividend.symbol].totalShares = dividend.shares; // Current shares
        dividendsByTicker[dividend.symbol].dividendCount += 1;
        dividendsByTicker[dividend.symbol].dividends.push({
          amount: dividend.amount,
          date: dividend.date,
          exDate: dividend.exDate,
          shares: dividend.shares,
          dividendPerShare: dividend.dividendPerShare
        });
        
        totalDividends += dividend.amount;
      });
    });

    // Sort dividend schedule by date (newest first)
    dividendSchedule.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Sort years in descending order
    const sortedYears = Object.keys(dividendsByYear).sort((a, b) => parseInt(b) - parseInt(a));
    const sortedDividendsByYear = {};
    sortedYears.forEach(year => {
      sortedDividendsByYear[year] = dividendsByYear[year];
    });

    // Sort tickers by total dividend amount (descending)
    const sortedTickers = Object.keys(dividendsByTicker).sort((a, b) => 
      dividendsByTicker[b].totalAmount - dividendsByTicker[a].totalAmount
    );
    const sortedDividendsByTicker = {};
    sortedTickers.forEach(ticker => {
      sortedDividendsByTicker[ticker] = dividendsByTicker[ticker];
    });

    appInfo('💰 Dividend calculation complete:', {
      totalDividends: totalDividends.toFixed(2),
      yearsWithDividends: Object.keys(sortedDividendsByYear),
      tickersWithDividends: Object.keys(sortedDividendsByTicker),
      totalDividendEvents: dividendSchedule.length
    });

    await prisma.$disconnect();

    const responseData = {
      totalDividends: parseFloat(totalDividends.toFixed(2)),
      dividendsByYear: sortedDividendsByYear,
      dividendsByTicker: sortedDividendsByTicker,
      dividendSchedule,
      timestamp: new Date().toISOString(),
      dataSource: 'Yahoo Finance API'
    };

    // Cache the result
    dividendCache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now()
    });

    res.json(responseData);

  } catch (error) {
    techError('❌ Error calculating dividends:', error);
    res.status(500).json({
      error: 'Failed to calculate dividends',
      message: error.message
    });
  }
});

// Test endpoint to verify the route is working
router.get('/test', (req, res) => {
  res.json({ message: 'Stock routes are working!', timestamp: new Date().toISOString() });
});

module.exports = router; 