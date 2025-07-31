const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('../utils/debug');
const { httpRequestDurationMicroseconds, httpRequestsTotal } = require('../utils/metrics');
const config = require('../config');

// CORS middleware
const corsMiddleware = cors({
  origin: config.frontendOrigin,
  credentials: true,
});

// Rate limiting middleware
const rateLimitMiddleware = rateLimit(config.rateLimit);

// Request tracking middleware for Prometheus metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDurationMicroseconds
      .labels(req.method, route, res.statusCode)
      .observe(duration / 1000);
      
    httpRequestsTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  next();
};

// Debug middleware to log X-Forwarded-For headers
const debugMiddleware = (req, res, next) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const realIP = req.ip;
  const connectionIP = req.connection.remoteAddress;
  
  if (xForwardedFor) {
    techDebug('🔍 X-Forwarded-For detected:', {
      path: req.path,
      method: req.method,
      xForwardedFor: xForwardedFor,
      realIP: realIP,
      connectionIP: connectionIP,
      userAgent: req.headers['user-agent']?.substring(0, 50) + '...'
    });
  }
  
  next();
};

// Unexpected hit logging middleware
const unexpectedHitMiddleware = (req, res, next) => {
  techDebug(`🛑 [BACKEND] UNEXPECTED HIT: ${req.method} ${req.originalUrl}`);
  next();
};

// Static file serving middleware
const staticFileMiddleware = express.static(__dirname + '/../uploads');

// Setup all middleware
const setupMiddleware = (app) => {
  // Trust proxy
  app.set('trust proxy', 1);
  
  // Apply middleware in order
  app.use(corsMiddleware);
  app.use(unexpectedHitMiddleware);
  app.use(rateLimitMiddleware);
  app.use(metricsMiddleware);
  app.use(debugMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', staticFileMiddleware);
};

module.exports = {
  setupMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
  metricsMiddleware,
  debugMiddleware,
  unexpectedHitMiddleware,
  staticFileMiddleware
}; 