const rateLimit = require('express-rate-limit');
const { appDebug } = require('../utils/debug');

/**
 * Get rate limit from environment or use default
 */
const getRateLimit = (envKey, defaultValue) => {
  return process.env[envKey] ? parseInt(process.env[envKey]) : defaultValue;
};

/**
 * Create a rate limiter with custom configuration
 */
const createLimiter = (windowMs, max, message, keyGenerator = null) => {
  return rateLimit({
    windowMs,
    max,
    message: { message },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: keyGenerator || ((req) => req.ip),
    handler: (req, res) => {
      appDebug(`Rate limit exceeded for ${req.ip} on ${req.originalUrl}`);
      res.status(429).json({ 
        message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

/**
 * General API rate limiter
 */
const apiLimiter = createLimiter(
  15 * 1000, // 15 seconds
  getRateLimit('API_RATE_LIMIT', 2000), // Configurable via API_RATE_LIMIT env var
  'Too many requests from this IP, please try again in 15 seconds.'
);

/**
 * Authentication rate limiter (more restrictive)
 */
const authLimiter = createLimiter(
  15 * 1000, // 15 seconds
  getRateLimit('AUTH_RATE_LIMIT', 100), // Configurable via AUTH_RATE_LIMIT env var
  'Too many authentication attempts, please try again in 15 seconds.'
);

/**
 * Registration rate limiter (very restrictive)
 */
const registrationLimiter = createLimiter(
  15 * 1000, // 15 seconds
  getRateLimit('REGISTRATION_RATE_LIMIT', 50), // Configurable via REGISTRATION_RATE_LIMIT env var
  'Too many registration attempts, please try again in 15 seconds.'
);

/**
 * Password reset rate limiter
 */
const passwordResetLimiter = createLimiter(
  15 * 1000, // 15 seconds
  getRateLimit('PASSWORD_RESET_RATE_LIMIT', 20), // Configurable via PASSWORD_RESET_RATE_LIMIT env var
  'Too many password reset attempts, please try again in 15 seconds.'
);

/**
 * File upload rate limiter
 */
const uploadLimiter = createLimiter(
  60 * 1000, // 1 minute
  getRateLimit('UPLOAD_RATE_LIMIT', 50), // Configurable via UPLOAD_RATE_LIMIT env var
  'Too many file uploads, please try again in 1 minute.'
);

/**
 * Stock data rate limiter (for external API calls)
 */
const stockDataLimiter = createLimiter(
  60 * 1000, // 1 minute
  getRateLimit('STOCK_DATA_RATE_LIMIT', 500), // Configurable via STOCK_DATA_RATE_LIMIT env var
  'Too many stock data requests, please try again in 1 minute.'
);

/**
 * Admin operations rate limiter
 */
const adminLimiter = createLimiter(
  60 * 1000, // 1 minute
  getRateLimit('ADMIN_RATE_LIMIT', 200), // Configurable via ADMIN_RATE_LIMIT env var
  'Too many admin operations, please try again in 1 minute.'
);

/**
 * User-specific rate limiter (for authenticated users)
 */
const userSpecificLimiter = (maxRequests = 100) => {
  return createLimiter(
    60 * 1000, // 1 minute
    getRateLimit('USER_RATE_LIMIT', maxRequests), // Configurable via USER_RATE_LIMIT env var
    'Too many requests for your account, please try again in 1 minute.',
    (req) => req.user ? req.user.userId : req.ip // Use user ID if authenticated, otherwise IP
  );
};

module.exports = {
  apiLimiter,
  authLimiter,
  registrationLimiter,
  passwordResetLimiter,
  uploadLimiter,
  stockDataLimiter,
  adminLimiter,
  userSpecificLimiter,
  createLimiter
}; 