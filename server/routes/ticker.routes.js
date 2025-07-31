const express = require('express');
const router = express.Router();
const yahooFinance = require('yahoo-finance2').default;
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const { stockDataLimiter } = require('../middleware/rateLimit');

/**
 * @swagger
 * /api/ticker/company-name:
 *   get:
 *     summary: Get company name for a ticker symbol
 *     description: Retrieves the company name for a given ticker symbol using Yahoo Finance
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticker symbol (e.g., AAPL, MSFT)
 *     responses:
 *       200:
 *         description: Company name retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 companyName:
 *                   type: string
 *                   description: The company name
 *       400:
 *         description: Symbol is required
 *       404:
 *         description: Company not found
 */
router.get('/company-name', stockDataLimiter, async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) {
    return res.status(400).json({ message: 'Symbol is required' });
  }
  try {
    const quote = await yahooFinance.quote(symbol);
    const companyName = quote.longName || quote.shortName || symbol;
    res.json({ companyName });
  } catch (err) {
    res.status(404).json({ message: 'Company not found', companyName: '' });
  }
});

/**
 * @swagger
 * /api/ticker/info:
 *   get:
 *     summary: Get company info and real-time price for a ticker
 *     description: Returns company profile, real-time price, and stats for the given ticker symbol using Yahoo Finance.
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticker symbol (e.g., AAPL, MSFT)
 *     responses:
 *       200:
 *         description: Ticker information retrieved successfully
 *       404:
 *         description: Ticker not found
 *       500:
 *         description: Server error
 */
router.get('/info', stockDataLimiter, async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required' });
    const [quote, summary, assetProfile] = await Promise.all([
      yahooFinance.quote(symbol),
      yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail', 'price', 'financialData', 'defaultKeyStatistics'] }),
      yahooFinance.quoteSummary(symbol, { modules: ['assetProfile'] })
    ]);
    res.json({
      symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      currency: quote.currency,
      name: quote.shortName || quote.longName,
      exchange: quote.fullExchangeName,
      marketCap: quote.marketCap,
      ...summary,
      ...assetProfile
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticker info', message: error.message });
  }
});

/**
 * @swagger
 * /api/ticker/chart:
 *   get:
 *     summary: Get historical price chart data for a ticker
 *     description: Returns historical price data for the given ticker symbol using Yahoo Finance.
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ticker symbol (e.g., AAPL)
 *       - in: query
 *         name: range
 *         schema:
 *           type: string
 *           default: 1mo
 *         description: Chart range (e.g., 1d, 5d, 1mo, 3mo, 6mo, 1y, 5y, max)
 *       - in: query
 *         name: interval
 *         schema:
 *           type: string
 *           default: 1d
 *         description: Data interval (e.g., 1m, 2m, 5m, 15m, 1h, 1d, 1wk, 1mo)
 *       - in: query
 *         name: period1
 *         schema:
 *           type: integer
 *         description: Start time as UNIX timestamp (overrides range if both period1 and period2 are provided)
 *       - in: query
 *         name: period2
 *         schema:
 *           type: integer
 *         description: End time as UNIX timestamp (overrides range if both period1 and period2 are provided)
 *     responses:
 *       200:
 *         description: Chart data
 *       400:
 *         description: Bad request - missing or invalid symbol
 *       500:
 *         description: Internal server error
 */
router.get('/chart', stockDataLimiter, async (req, res) => {
  try {
    const { symbol, range = '1mo', interval = '1d', period1, period2 } = req.query;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Symbol is required' });
    }

    // Clean and validate the symbol
    const cleanSymbol = symbol.trim().toUpperCase();
    if (!cleanSymbol || cleanSymbol.length === 0) {
      return res.status(400).json({ error: 'Invalid symbol provided' });
    }

    appDebug('📈 Chart API Debug:', { symbol: cleanSymbol, range, interval, period1, period2 });

    let options = {};
    
    // Set up options - use simple defaults to avoid validation issues
    if (period1 && period2) {
      // Use period1/period2 if both provided
      const isValidTimestamp = (v) => {
        const num = parseInt(v);
        return !isNaN(num) && num > 0;
      };
      
      if (!isValidTimestamp(period1) || !isValidTimestamp(period2)) {
        return res.status(400).json({ error: 'Invalid period1 or period2 values' });
      }
      
      options = {
        period1: parseInt(period1),
        period2: parseInt(period2),
        interval: '1d'
      };
    } else {
      // Use period1/period2 approach like the working batch API
      const now = Math.floor(Date.now() / 1000);
      const oneMonthAgo = now - (30 * 24 * 60 * 60); // 30 days ago
      options = { 
        period1: oneMonthAgo,
        period2: now,
        interval: '1d' 
      };
    }

    appDebug('📊 Fetching chart data for symbol:', cleanSymbol);
    appDebug('📊 Options:', options);
    
    // Call Yahoo Finance API with the cleaned symbol and options
    let result;
    try {
      appDebug('📊 Calling yahooFinance.chart with:', { symbol: cleanSymbol, options });
      result = await yahooFinance.chart(cleanSymbol, options);
    } catch (error) {
      appDebug('❌ Yahoo Finance API error:', error.message);
      return res.status(500).json({ 
        error: 'Failed to fetch chart data',
        message: error.message 
      });
    }
    
    appDebug('📊 Yahoo Finance Response:', {
      symbol: cleanSymbol,
      hasResult: !!result,
      resultType: typeof result,
      hasQuotes: !!result?.quotes,
      quotesLength: result?.quotes?.length || 0,
      meta: result?.meta
    });
    
    if (!result || !result.quotes || !Array.isArray(result.quotes) || result.quotes.length === 0) {
      return res.status(404).json({ error: 'No chart data found for symbol' });
    }

    // Format the response to match the expected structure
    const formattedData = result.quotes.map(quote => ({
      date: quote.date,
      open: quote.open,
      high: quote.high,
      low: quote.low,
      close: quote.close,
      volume: quote.volume
    }));

    appDebug('✅ Chart data fetched successfully:', {
      symbol: cleanSymbol,
      dataPoints: formattedData.length,
      firstDate: formattedData[0]?.date,
      lastDate: formattedData[formattedData.length - 1]?.date
    });

    res.json({
      symbol: cleanSymbol,
      quotes: formattedData,
      meta: {
        range,
        interval,
        period1,
        period2,
        dataPoints: formattedData.length,
        ...result.meta
      }
    });

  } catch (err) {
    techError('❌ Yahoo Finance chart error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch chart data',
      message: err.message 
    });
  }
});

/**
 * @swagger
 * /api/ticker/batch/chart:
 *   post:
 *     summary: Get chart data for multiple tickers with custom date ranges
 *     description: Returns historical price data for multiple tickers with individual date ranges
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tickers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     symbol:
 *                       type: string
 *                       description: Ticker symbol (e.g., AAPL, MSFT)
 *                     period1:
 *                       type: integer
 *                       description: Start time as UNIX timestamp
 *                     period2:
 *                       type: integer
 *                       description: End time as UNIX timestamp
 *                     interval:
 *                       type: string
 *                       enum: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
 *                       default: 1d
 *                       description: Data interval
 *                 description: Array of ticker objects with individual date ranges
 *     responses:
 *       200:
 *         description: Batch chart data retrieved successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
router.post('/batch/chart', stockDataLimiter, async (req, res) => {
  try {
    const { tickers } = req.body;
    
    appDebug('🔍 Batch Chart API Debug:', {
      tickersCount: tickers?.length,
      tickers: tickers
    });
    
    if (!tickers || !Array.isArray(tickers) || tickers.length === 0) {
      return res.status(400).json({ error: 'Tickers array is required and must not be empty' });
    }
    
    // Validate each ticker object
    const isValidTimestamp = (v) => {
      const num = parseInt(v);
      return !isNaN(num) && num > 0;
    };
    const validatedTickers = [];
    
    for (const ticker of tickers) {
      if (!ticker.symbol) {
        return res.status(400).json({ error: 'Each ticker must have a symbol' });
      }
      
      if (!ticker.period1 || !ticker.period2) {
        return res.status(400).json({ error: `Both period1 and period2 are required for ticker ${ticker.symbol}` });
      }
      
      if (!isValidTimestamp(ticker.period1) || !isValidTimestamp(ticker.period2) || ticker.period2 <= ticker.period1) {
        return res.status(400).json({ 
          error: `Invalid date range for ticker ${ticker.symbol}: period1 and period2 must be valid UNIX timestamps and period2 > period1` 
        });
      }
      
      validatedTickers.push({
        symbol: ticker.symbol.trim().toUpperCase(),
        period1: Number(ticker.period1),
        period2: Number(ticker.period2),
        interval: ticker.interval || '1d'
      });
    }
    
    appDebug('📊 Validated tickers:', validatedTickers);
    
    // Fetch data for all tickers in parallel
    const results = {};
    const promises = validatedTickers.map(async (tickerConfig) => {
      const { symbol, period1, period2, interval } = tickerConfig;
      
      try {
        appDebug(`📈 Fetching chart data for ${symbol} (${new Date(period1 * 1000).toISOString()} to ${new Date(period2 * 1000).toISOString()})...`);
        
        const chartOptions = {
          period1,
          period2,
          interval
        };
        
        const chart = await yahooFinance.chart(symbol, chartOptions);
        
        appDebug(`📊 Yahoo Finance Response for ${symbol}:`, {
          symbol,
          hasQuotes: !!chart.quotes,
          quotesLength: chart.quotes?.length || 0,
          meta: chart.meta,
          dataGranularity: chart.meta?.dataGranularity
        });
        
        // If we got intraday data but wanted daily, try again with explicit daily request
        if (chart.meta?.dataGranularity === '5m' && interval === '1d') {
          appDebug(`🔄 Got intraday data for ${symbol}, retrying with explicit daily request...`);
          const dailyChartOptions = {
            period1,
            period2,
            interval: '1d'
          };
          
          const dailyChart = await yahooFinance.chart(symbol, dailyChartOptions);
          appDebug(`📈 Yahoo Finance Daily Response for ${symbol}:`, {
            symbol,
            hasQuotes: !!dailyChart.quotes,
            quotesLength: dailyChart.quotes?.length || 0,
            meta: dailyChart.meta,
            dataGranularity: dailyChart.meta?.dataGranularity
          });
          
          const simplified = (dailyChart.quotes || []).map(q => ({
            date: q.date,
            open: q.open,
            high: q.high,
            low: q.low,
            close: q.close,
            volume: q.volume
          }));
          
          results[symbol] = {
            meta: dailyChart.meta,
            quotes: simplified
          };
        } else {
          const simplified = (chart.quotes || []).map(q => ({
            date: q.date,
            open: q.open,
            high: q.high,
            low: q.low,
            close: q.close,
            volume: q.volume
          }));
          
          results[symbol] = {
            meta: chart.meta,
            quotes: simplified
          };
        }
        
        appInfo(`✅ Successfully fetched ${results[symbol].quotes.length} data points for ${symbol}`);
        
      } catch (error) {
        techError(`❌ Error fetching chart data for ${symbol}:`, error);
        results[symbol] = {
          error: error.message,
          quotes: []
        };
      }
    });
    
    // Wait for all requests to complete
    await Promise.all(promises);
    
    appInfo('📊 Batch Chart Data Summary:', {
      totalTickers: validatedTickers.length,
      successfulTickers: Object.keys(results).filter(symbol => !results[symbol].error).length,
      failedTickers: Object.keys(results).filter(symbol => results[symbol].error).length
    });
    
    return res.json(results);
    
  } catch (error) {
    techError('❌ Batch chart endpoint error:', error);
    res.status(500).json({ error: 'Failed to fetch batch chart data', message: error.message });
  }
});

/**
 * @swagger
 * /api/ticker/news:
 *   get:
 *     summary: Get recent news for a ticker
 *     description: Returns recent news headlines for the given ticker symbol using Yahoo Finance.
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ticker symbol (e.g., AAPL)
 *     responses:
 *       200:
 *         description: News headlines
 *       400:
 *         description: Bad request - missing or invalid symbol
 *       500:
 *         description: Internal server error
 */
router.get('/news', stockDataLimiter, async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required' });
    const news = await yahooFinance.search(symbol);
    res.json(news.news || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news', message: error.message });
  }
});

/**
 * @swagger
 * /api/ticker/events:
 *   get:
 *     summary: Get recent events (earnings, dividends, splits) for a ticker
 *     description: Returns recent earnings, dividend history, and split history for the given ticker symbol using Yahoo Finance.
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ticker symbol (e.g., AAPL)
 *     responses:
 *       200:
 *         description: Recent events
 *       400:
 *         description: Bad request - missing or invalid symbol
 *       500:
 *         description: Internal server error
 */
router.get('/events', stockDataLimiter, async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }
  try {
    // Use basic quote first to get earnings information
    const quote = await yahooFinance.quote(symbol);
    let events = [];
    
    // Add dividend information if available (more reliable)
    if (quote.trailingAnnualDividendRate && quote.trailingAnnualDividendRate > 0) {
      events.push({
        type: 'Dividend',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        label: `Dividend (${quote.trailingAnnualDividendRate.toFixed(2)} annual)`
      });
    }
    
    // Add earnings information if available (disabled due to date parsing issues)
    // if (quote.earningsTimestamp) {
    //   try {
    //     const earningsDate = new Date(quote.earningsTimestamp);
    //     const now = new Date();
    //     if (earningsDate > now && earningsDate.getFullYear() < 2030) {
    //       events.push({
    //         type: 'Earnings',
    //         date: earningsDate.toISOString(),
    //         label: 'Earnings'
    //       });
    //     }
    //   } catch (dateError) {
    //     appDebug('Failed to parse earnings date:', dateError.message);
    //   }
    // }
    
    // Filter to only future events and sort by date ascending (earliest first)
    const now = new Date();
    events = events
      .filter(e => e.date && new Date(e.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Return top 5 future events
    res.json({ events: events.slice(0, 5) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events', message: err.message });
  }
});

module.exports = router; 