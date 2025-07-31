const { techError, appError } = require('./debug');

/**
 * Custom Application Error Class
 */
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation Error Class
 */
class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 400);
    this.field = field;
    this.type = 'VALIDATION_ERROR';
  }
}

/**
 * Authentication Error Class
 */
class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.type = 'AUTH_ERROR';
  }
}

/**
 * Authorization Error Class
 */
class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403);
    this.type = 'AUTHORIZATION_ERROR';
  }
}

/**
 * Not Found Error Class
 */
class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.type = 'NOT_FOUND_ERROR';
  }
}

/**
 * Database Error Class
 */
class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
    this.type = 'DATABASE_ERROR';
  }
}

/**
 * External API Error Class
 */
class ExternalAPIError extends AppError {
  constructor(message = 'External API request failed') {
    super(message, 502);
    this.type = 'EXTERNAL_API_ERROR';
  }
}

/**
 * Centralized Error Handler Middleware
 */
const handleError = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log the error
  techError('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new NotFoundError();
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ValidationError(message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new ValidationError(message);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AuthError('Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new AuthError('Token expired');
  }

  // Prisma errors
  if (err.code === 'P2002') {
    error = new ValidationError('Duplicate entry');
  }

  if (err.code === 'P2025') {
    error = new NotFoundError();
  }

  // Default error
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = 'Internal server error';
  }

  // Send error response
  res.status(error.statusCode).json({
    success: false,
    error: {
      message: error.message,
      type: error.type || 'INTERNAL_ERROR',
      statusCode: error.statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

/**
 * Async Error Handler Wrapper
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Not Found Handler
 */
const notFound = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

module.exports = {
  AppError,
  ValidationError,
  AuthError,
  AuthorizationError,
  NotFoundError,
  DatabaseError,
  ExternalAPIError,
  handleError,
  asyncHandler,
  notFound
}; 