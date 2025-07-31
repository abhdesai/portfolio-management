const express = require('express');
const router = express.Router();

// Import Prisma if available
let prisma;
try {
  prisma = require('../prisma/client');
} catch (e) {
  prisma = null;
}

/**
 * @swagger
 * /api/admin/stats/users:
 *   get:
 *     summary: Get user management statistics
 *     description: Returns total users, admins, active users, and recent signups for the admin dashboard.
 *     tags:
 *       - Admin Dashboard
 *     responses:
 *       200:
 *         description: User statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 123
 *                 admins:
 *                   type: integer
 *                   example: 3
 *                 active:
 *                   type: integer
 *                   example: 98
 *                 recentSignups:
 *                   type: integer
 *                   example: 8
 */
router.get('/stats/users', async (req, res) => {
  if (prisma) {
    try {
      const total = await prisma.user.count();
      const admins = await prisma.user.count({ where: { role: 'admin' } });
      const active = await prisma.user.count({ where: { lastLogin: { gte: new Date(Date.now() - 24*60*60*1000) } } });
      const recentSignups = await prisma.user.count({ where: { createdAt: { gte: new Date(Date.now() - 7*24*60*60*1000) } } });
      return res.json({ total, admins, active, recentSignups });
    } catch (err) {
      // fallback to mock
    }
  }
  // Mock data fallback
  res.json({
    total: 123,
    admins: 3,
    active: 98,
    recentSignups: 8
  });
});

/**
 * @swagger
 * /api/admin/stats/system:
 *   get:
 *     summary: Get system health statistics
 *     description: Returns API status, server uptime, and recent errors for the admin dashboard.
 *     tags:
 *       - Admin Dashboard
 *     responses:
 *       200:
 *         description: System health statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiStatus:
 *                   type: string
 *                   example: Online
 *                 serverUptime:
 *                   type: string
 *                   example: 99.99%
 *                 recentErrors:
 *                   type: integer
 *                   example: 0
 */
router.get('/stats/system', (req, res) => {
  // Mock data for now
  res.json({
    apiStatus: 'Online',
    serverUptime: '99.99%',
    recentErrors: 0
  });
});

/**
 * @swagger
 * /api/admin/stats/usage:
 *   get:
 *     summary: Get usage analytics statistics
 *     description: Returns active users, new signups, and failed logins for the admin dashboard.
 *     tags:
 *       - Admin Dashboard
 *     responses:
 *       200:
 *         description: Usage analytics statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeUsers24h:
 *                   type: integer
 *                   example: 45
 *                 newSignups7d:
 *                   type: integer
 *                   example: 8
 *                 failedLogins24h:
 *                   type: integer
 *                   example: 2
 */
router.get('/stats/usage', (req, res) => {
  // Mock data for now
  res.json({
    activeUsers24h: 45,
    newSignups7d: 8,
    failedLogins24h: 2
  });
});

module.exports = router; 