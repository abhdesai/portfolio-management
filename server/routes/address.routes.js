const express = require('express');
const router = express.Router();
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const { addressSearchRequests, addressSearchDuration } = require('../utils/metrics');

/**
 * @swagger
 * /api/address/search:
 *   get:
 *     summary: Search for addresses using OpenStreetMap Nominatim
 *     description: Proxy endpoint to search addresses and avoid CORS issues
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Address search query
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 7
 *         description: Maximum number of results to return
 *     responses:
 *       200:
 *         description: Address search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request - missing query parameter
 *       500:
 *         description: Internal server error
 */
router.get('/search', async (req, res) => {
  const start = Date.now();
  try {
    // Detailed logging for traceability
    const clientMode = req.headers['x-client-mode'] || 'N/A';
    const forwardedProto = req.headers['x-forwarded-proto'] || 'N/A';
    const host = req.headers['host'] || 'N/A';
    const protocol = req.protocol;
    const port = req.socket.localPort;
    techDebug(`[BACKEND] REQUEST: ${req.method} ${req.originalUrl} | Protocol: ${protocol} | Port: ${port} | X-Client-Mode: ${clientMode} | X-Forwarded-Proto: ${forwardedProto} | Host: ${host}`);
    const { q, limit = 7 } = req.query;
    if (!q) {
      addressSearchRequests.labels('error').inc();
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    const url = `https://nominatim.openstreetmap.org/search?` +
      `format=json&` +
      `q=${encodeURIComponent(q)}&` +
      `addressdetails=1&` +
      `limit=${limit}`;
    techDebug('Proxying address search:', q);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PortfolioManagement/1.0 (contact@example.com)'
      }
    });
    if (!response.ok) {
      addressSearchRequests.labels('error').inc();
      throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    addressSearchRequests.labels('success').inc();
    res.json(data);
  } catch (error) {
    addressSearchRequests.labels('error').inc();
    techDebug('Address search proxy error:', error);
    res.status(500).json({ error: 'Address search failed', message: error.message });
  } finally {
    const duration = Date.now() - start;
    addressSearchDuration.observe(duration / 1000);
  }
});

module.exports = router; 