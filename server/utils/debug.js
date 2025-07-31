const winston = require('winston');
require('dotenv').config();

const APP_DEBUG = (process.env.APP_DEBUG || 'none').toLowerCase();
const TECH_DEBUG = (process.env.TECH_DEBUG || 'none').toLowerCase();

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'portfolio-management' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Helper functions to check if debug is enabled
const isAppDebugEnabled = () => APP_DEBUG === 'verbose';
const isTechDebugEnabled = () => TECH_DEBUG === 'verbose';

// Debug functions with Winston
function appDebug(...args) {
  if (isAppDebugEnabled()) {
    logger.debug(`[APP] ${args[0]}`, ...args.slice(1));
  }
}

function techDebug(...args) {
  if (isTechDebugEnabled()) {
    logger.debug(`[TECH] ${args[0]}`, ...args.slice(1));
  }
}

// Error logging - always logged but with debug context
function appError(...args) {
  logger.error(`[APP ERROR] ${args[0]}`, ...args.slice(1));
  if (isAppDebugEnabled()) {
    logger.debug(`[APP DEBUG] Stack trace:`, new Error().stack);
  }
}

function techError(...args) {
  logger.error(`[TECH ERROR] ${args[0]}`, ...args.slice(1));
  if (isTechDebugEnabled()) {
    logger.debug(`[TECH DEBUG] Stack trace:`, new Error().stack);
  }
}

// Warning logging
function appWarn(...args) {
  if (isAppDebugEnabled()) {
    logger.warn(`[APP WARN] ${args[0]}`, ...args.slice(1));
  }
}

function techWarn(...args) {
  if (isTechDebugEnabled()) {
    logger.warn(`[TECH WARN] ${args[0]}`, ...args.slice(1));
  }
}

// Info logging
function appInfo(...args) {
  if (isAppDebugEnabled()) {
    logger.info(`[APP INFO] ${args[0]}`, ...args.slice(1));
  }
}

function techInfo(...args) {
  if (isTechDebugEnabled()) {
    logger.info(`[TECH INFO] ${args[0]}`, ...args.slice(1));
  }
}

// Always log errors regardless of debug flags
function appErrorAlways(...args) {
  logger.error(`[APP ERROR] ${args[0]}`, ...args.slice(1));
}

function techErrorAlways(...args) {
  logger.error(`[TECH ERROR] ${args[0]}`, ...args.slice(1));
}

// Always log info regardless of debug flags
function appInfoAlways(...args) {
  logger.info(`[APP INFO] ${args[0]}`, ...args.slice(1));
}

function techInfoAlways(...args) {
  logger.info(`[TECH INFO] ${args[0]}`, ...args.slice(1));
}

module.exports = { 
  appDebug, 
  techDebug, 
  appError, 
  techError, 
  appWarn, 
  techWarn, 
  appInfo, 
  techInfo,
  appErrorAlways,
  techErrorAlways,
  appInfoAlways,
  techInfoAlways,
  isAppDebugEnabled,
  isTechDebugEnabled,
  logger
}; 