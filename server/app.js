const express = require('express');
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('./utils/debug');
const { swaggerSpec, swaggerUi } = require('./routes/swagger');
const { setupMiddleware } = require('./middleware');
const { client } = require('./utils/metrics');
const { handleError, notFound } = require('./utils/errorHandler');
const config = require('./config');

// Import routes
const addressRoutes = require('./routes/address.routes');
const stockRoutes = require('./routes/stock.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const adminRoutes = require('./routes/admin.routes');
const tickerRoutes = require('./routes/ticker.routes');

// Create Express app
const app = express();

// Setup middleware
setupMiddleware(app);

// Prometheus metrics endpoint - must be placed before route definitions
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    techDebug('Metrics endpoint error:', err);
    res.status(500).end(err);
  }
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/api/address', addressRoutes);
app.use('/api/stock', stockRoutes);
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ticker', tickerRoutes);



/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple message to verify Swagger is working.
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/test', (req, res) => {
  res.json({ message: 'Swagger test endpoint is working!' });
});

// Health check route
app.get('/', (req, res) => {
  res.send('Portfolio Management API is running');
});

// Error handling middleware
app.use(handleError);

// 404 handler
app.use(notFound);

module.exports = app; 