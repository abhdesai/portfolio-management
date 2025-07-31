const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const prisma = require('../utils/database');
const { appDebug, techDebug, appError, techError, appInfo, techInfo, appWarn, techWarn } = require('../utils/debug');
const ExcelJS = require('exceljs');
const yahooFinance = require('yahoo-finance2').default;
const { authMiddleware, requireRole } = require('../middleware/auth');
const { uploadLimiter } = require('../middleware/rateLimit');

// Multer storage for Excel uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `portfolio_${req.user.userId}_${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('excel') && !file.mimetype.includes('spreadsheetml')) {
      return cb(new Error('Only Excel files are allowed.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * @swagger
 * tags:
 *   name: Portfolios
 *   description: Portfolio and transaction management
 */

// --- Portfolio CRUD Operations ---
/**
 * @swagger
 * /api/portfolios:
 *   post:
 *     summary: Create a new portfolio
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Portfolio name
 *               description:
 *                 type: string
 *                 description: Optional portfolio description
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, requireRole('user'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Portfolio name is required' });
    }
    if (name.trim().length < 8) {
      return res.status(400).json({ message: 'Portfolio name must be at least 8 characters' });
    }

    // Check if portfolio with same name already exists for this user
    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { name: name.trim(), userId }
    });

    if (existingPortfolio) {
      return res.status(400).json({ message: 'A portfolio with this name already exists' });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        userId
      }
    });

    res.status(201).json(portfolio);
  } catch (error) {
    techDebug('Create portfolio error:', error);
    res.status(500).json({ message: 'Failed to create portfolio' });
  }
});

/**
 * @swagger
 * /api/portfolios/{id}:
 *   delete:
 *     summary: Delete a portfolio and all its transactions
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio ID
 *     responses:
 *       200:
 *         description: Portfolio deleted successfully
 *       404:
 *         description: Portfolio not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, requireRole('user'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.userId;

    const portfolio = await prisma.portfolio.findFirst({
      where: { id, userId }
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Delete all transactions first (due to foreign key constraint)
    await prisma.transaction.deleteMany({
      where: { portfolioId: id }
    });

    // Delete the portfolio
    await prisma.portfolio.delete({
      where: { id }
    });

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    techDebug('Delete portfolio error:', error);
    res.status(500).json({ message: 'Failed to delete portfolio' });
  }
});

// --- Portfolio File Upload (Full/Incremental) ---
/**
 * @swagger
 * /api/portfolios/upload:
 *   post:
 *     summary: Upload portfolio Excel file (full or incremental)
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               mode:
 *                 type: string
 *                 enum: [full, incremental]
 *                 description: Upload mode
 *     responses:
 *       200:
 *         description: Upload summary
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

// Helper: Parse Excel file and extract data (robust date handling)
async function parsePortfolioExcel(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];
  const rows = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    // Now expect: portfolio, description, ticker, type, date, price, quantity
    const [portfolio, description, ticker, type, dateRaw, price, quantity] = row.values.slice(1);
    let date;
    if (dateRaw instanceof Date) {
      date = new Date(Date.UTC(dateRaw.getFullYear(), dateRaw.getMonth(), dateRaw.getDate()));
    } else if (typeof dateRaw === 'number') {
      date = new Date(Math.round((dateRaw - 25569) * 86400 * 1000));
    } else if (typeof dateRaw === 'string') {
      date = new Date(dateRaw);
    } else {
      date = null;
    }
    rows.push({
      portfolio: String(portfolio).trim(),
      description: description !== undefined ? String(description).trim() : '',
      ticker: String(ticker).trim(),
      type: String(type).toLowerCase().trim(),
      date,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10)
    });
  });
  return rows;
}

// Helper: Fetch company name for a ticker using yahoo-finance2
async function fetchCompanyName(ticker) {
  try {
    const quote = await yahooFinance.quote(ticker);
    return quote.longName || quote.shortName || ticker;
  } catch (err) {
    techDebug(`Failed to fetch company name for ${ticker}:`, err.message);
    return ticker;
  }
}

// Helper: Calculate invested, realized, net values
function calculatePortfolioValues(transactions) {
  let invested = 0, realized = 0;
  for (const tx of transactions) {
    if (tx.type === 'buy') invested += tx.price * tx.quantity;
    if (tx.type === 'sell') realized += tx.price * tx.quantity;
  }
  return {
    investedValue: invested,
    realizedValue: realized,
    netInvestmentValue: invested - realized
  };
}

// Helper: Validate a row from Excel
function validateRow(row) {
  if (!row.portfolio || !row.ticker || !row.type || !row.date || isNaN(row.price) || isNaN(row.quantity)) {
    return 'Missing or invalid data in one or more columns.';
  }
  if (!['buy', 'sell'].includes(row.type)) {
    return 'Transaction type must be "buy" or "sell".';
  }
  if (!(row.date instanceof Date) || isNaN(row.date.getTime())) {
    return 'Invalid date format.';
  }
  if (row.price <= 0 || row.quantity <= 0) {
    return 'Price and quantity must be positive numbers.';
  }
  return null;
}

router.post('/upload', authMiddleware, requireRole('user'), uploadLimiter, upload.single('file'), async (req, res) => {
  try {
    const mode = req.body.mode;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    if (!['full', 'incremental'].includes(mode)) {
      return res.status(400).json({ message: 'Invalid upload mode' });
    }
    const userId = req.user.userId;
    const rows = await parsePortfolioExcel(req.file.path);
    if (!rows.length) return res.status(400).json({ message: 'No data found in file' });

    // If full upload, delete all portfolios and all transactions for the user
    if (mode === 'full') {
      // Delete all transactions for all portfolios of the user
      const userPortfolios = await prisma.portfolio.findMany({ where: { userId } });
      const portfolioIds = userPortfolios.map(p => p.id);
      if (portfolioIds.length > 0) {
        await prisma.transaction.deleteMany({ where: { portfolioId: { in: portfolioIds } } });
        await prisma.portfolio.deleteMany({ where: { id: { in: portfolioIds } } });
      }
    }

    // Validate all rows before processing
    for (let i = 0; i < rows.length; i++) {
      const error = validateRow(rows[i]);
      if (error) {
        return res.status(400).json({ message: `Row ${i + 2}: ${error}` }); // +2 for header and 0-index
      }
    }

    // Group by portfolio name
    const portfoliosMap = {};
    for (const row of rows) {
      if (!portfoliosMap[row.portfolio]) portfoliosMap[row.portfolio] = [];
      portfoliosMap[row.portfolio].push(row);
    }

    const summary = { portfoliosCreated: 0, portfoliosUpdated: 0, transactionsCreated: 0, transactionsUpdated: 0, details: [] };
    for (const [portfolioName, txRows] of Object.entries(portfoliosMap)) {
      if (portfolioName.trim().length < 8) {
        return res.status(400).json({ message: `Portfolio name '${portfolioName}' must be at least 8 characters` });
      }
      let portfolio = await prisma.portfolio.findFirst({ where: { name: portfolioName, userId } });
      let added = 0, updated = 0;
      if (!portfolio) {
        // Use the description from the first row for this portfolio
        const description = txRows[0].description || null;
        portfolio = await prisma.portfolio.create({ data: { name: portfolioName, userId, description } });
        summary.portfoliosCreated++;
      } else {
        summary.portfoliosUpdated++;
        if (mode === 'full') {
          await prisma.transaction.deleteMany({ where: { portfolioId: portfolio.id } });
        }
      }
      for (const tx of txRows) {
        const companyName = await fetchCompanyName(tx.ticker);
        let existingTx = await prisma.transaction.findFirst({
          where: {
            portfolioId: portfolio.id,
            stockSymbol: tx.ticker,
            type: tx.type,
            price: tx.price,
            quantity: tx.quantity,
            date: tx.date
          }
        });
        if (!existingTx) {
          await prisma.transaction.create({
            data: {
              type: tx.type,
              stockSymbol: tx.ticker,
              companyName,
              quantity: tx.quantity,
              price: tx.price,
              date: tx.date,
              portfolioId: portfolio.id
            }
          });
          summary.transactionsCreated++;
          added++;
        } else {
          summary.transactionsUpdated++;
          updated++;
        }
      }
      summary.details.push({
        name: portfolioName,
        description: portfolio.description || '',
        added,
        updated
      });
      const allTx = await prisma.transaction.findMany({ where: { portfolioId: portfolio.id } });
      const values = calculatePortfolioValues(allTx);
      techDebug(`Portfolio ${portfolioName} values:`, values);
    }
    res.json({ message: 'Upload processed', portfoliosCreated: summary.portfoliosCreated, transactionsCreated: summary.transactionsCreated, details: summary.details, mode });
  } catch (err) {
    techDebug('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// --- Portfolio CRUD (scaffold) ---
/**
 * @swagger
 * /api/portfolios:
 *   get:
 *     summary: Get all portfolios for the current user (with live prices)
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of portfolios with transactions and live prices
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, requireRole('user'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      include: { transactions: true }
    });
    // Gather all unique tickers
    const tickerSet = new Set();
    portfolios.forEach(p => p.transactions.forEach(tx => tickerSet.add(tx.stockSymbol)));
    // Fetch live price and company name for each ticker
    const tickerInfo = {};
    await Promise.all(Array.from(tickerSet).map(async (ticker) => {
      try {
        const quote = await yahooFinance.quote(ticker);
        tickerInfo[ticker] = {
          companyName: quote.longName || quote.shortName || ticker,
          price: quote.regularMarketPrice,
          currency: quote.currency
        };
      } catch (err) {
        techDebug(`Failed to fetch quote for ${ticker}:`, err.message);
        tickerInfo[ticker] = { companyName: ticker, price: null, currency: null };
      }
    }));
    // Calculate current value for each portfolio
    const result = portfolios.map(p => {
      let currentValue = 0;
      p.transactions.forEach(tx => {
        const info = tickerInfo[tx.stockSymbol];
        if (info && info.price != null) {
          const sign = tx.type === 'buy' ? 1 : -1;
          currentValue += sign * tx.quantity * info.price;
        }
      });
      return {
        id: p.id,
        name: p.name,
        description: p.description || '',
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        transactions: p.transactions,
        currentValue,
        tickers: Object.fromEntries(
          Array.from(new Set(p.transactions.map(tx => tx.stockSymbol))).map(ticker => [ticker, tickerInfo[ticker]])
        )
      };
    });
    res.json(result);
  } catch (err) {
    techDebug('Portfolio fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch portfolios', error: err.message });
  }
});
// Removed duplicate TODO endpoints - functionality already implemented above
/**
 * @swagger
 * /api/portfolios/{portfolioId}/transactions:
 *   post:
 *     summary: Add a new transaction to a portfolio
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stockSymbol
 *               - type
 *               - quantity
 *               - price
 *               - date
 *             properties:
 *               stockSymbol:
 *                 type: string
 *                 description: Stock ticker symbol
 *               type:
 *                 type: string
 *                 enum: [buy, sell]
 *                 description: Transaction type
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Number of shares
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Price per share
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Transaction date
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: Internal server error
 */
router.post('/:portfolioId/transactions', authMiddleware, requireRole('user'), async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const { stockSymbol, type, quantity, price, date } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!stockSymbol || !type || !quantity || !price || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['buy', 'sell'].includes(type)) {
      return res.status(400).json({ message: 'Transaction type must be "buy" or "sell"' });
    }

    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Quantity and price must be positive numbers' });
    }

    // Validate date
    const transactionDate = new Date(date);
    if (isNaN(transactionDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Check if portfolio exists and belongs to user
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: parseInt(portfolioId), userId }
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Fetch company name using yahoo-finance2
    const companyName = await fetchCompanyName(stockSymbol);

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        type,
        stockSymbol: stockSymbol.toUpperCase(),
        companyName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        date: transactionDate,
        portfolioId: parseInt(portfolioId)
      }
    });

    res.status(201).json({
      message: 'Transaction added successfully',
      transaction
    });

  } catch (err) {
    techDebug('Add transaction error:', err);
    res.status(500).json({ message: 'Failed to add transaction', error: err.message });
  }
});
/**
 * @swagger
 * /api/portfolios/{portfolioId}/transactions/{transactionId}:
 *   put:
 *     summary: Update an existing transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stockSymbol:
 *                 type: string
 *                 description: Stock ticker symbol
 *               type:
 *                 type: string
 *                 enum: [buy, sell]
 *                 description: Transaction type
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Number of shares
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Price per share
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Transaction date
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Portfolio or transaction not found
 */
router.put('/:portfolioId/transactions/:transactionId', authMiddleware, async (req, res) => {
  try {
    const { portfolioId, transactionId } = req.params;
    const { stockSymbol, type, quantity, price, date } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!stockSymbol || !type || !quantity || !price || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['buy', 'sell'].includes(type)) {
      return res.status(400).json({ message: 'Transaction type must be "buy" or "sell"' });
    }

    if (quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Quantity and price must be positive numbers' });
    }

    // Validate date
    const transactionDate = new Date(date);
    if (isNaN(transactionDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Check if portfolio exists and belongs to user
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: parseInt(portfolioId), userId }
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if transaction exists and belongs to the portfolio
    const existingTransaction = await prisma.transaction.findFirst({
      where: { 
        id: parseInt(transactionId), 
        portfolioId: parseInt(portfolioId) 
      }
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Fetch company name using yahoo-finance2
    const companyName = await fetchCompanyName(stockSymbol);

    // Update transaction
    const transaction = await prisma.transaction.update({
      where: { id: parseInt(transactionId) },
      data: {
        type,
        stockSymbol: stockSymbol.toUpperCase(),
        companyName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        date: transactionDate
      }
    });

    res.json({
      message: 'Transaction updated successfully',
      transaction
    });

  } catch (err) {
    techDebug('Update transaction error:', err);
    res.status(500).json({ message: 'Failed to update transaction', error: err.message });
  }
});

/**
 * @swagger
 * /api/portfolios/{portfolioId}/transactions/{transactionId}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Portfolio or transaction not found
 */
router.delete('/:portfolioId/transactions/:transactionId', authMiddleware, async (req, res) => {
  try {
    const { portfolioId, transactionId } = req.params;
    const userId = req.user.userId;

    // Check if portfolio exists and belongs to user
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: parseInt(portfolioId), userId }
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if transaction exists and belongs to the portfolio
    const transaction = await prisma.transaction.findFirst({
      where: { 
        id: parseInt(transactionId), 
        portfolioId: parseInt(portfolioId) 
      }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Delete transaction
    await prisma.transaction.delete({
      where: { id: parseInt(transactionId) }
    });

    res.json({ message: 'Transaction deleted successfully' });

  } catch (err) {
    techDebug('Delete transaction error:', err);
    res.status(500).json({ message: 'Failed to delete transaction', error: err.message });
  }
});

module.exports = router; 