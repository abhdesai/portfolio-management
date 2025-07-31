const jwt = require('jsonwebtoken');
const { AppError, AuthError, AuthorizationError } = require('../utils/errorHandler');
const { appDebug, techError } = require('../utils/debug');
const config = require('../config');

/**
 * JWT Authentication Middleware
 * Verifies JWT token and adds user info to request
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  appDebug('🔍 Auth Middleware Debug:');
  appDebug('📡 Request path:', req.path);
  appDebug('🔑 Auth header exists:', !!authHeader);
  appDebug('🔑 Auth header starts with Bearer:', authHeader?.startsWith('Bearer '));
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    appDebug('❌ No valid auth header');
    return next(new AuthError('No authorization token provided'));
  }
  
  const token = authHeader.split(' ')[1];
  appDebug('🔑 Token length:', token?.length);
  
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    appDebug('✅ Token verified successfully');
    appDebug('👤 User ID:', decoded.userId);
    appDebug('👤 User role:', decoded.role);
    
    req.user = decoded;
    appDebug('✅ Authentication successful');
    next();
  } catch (error) {
    techError('❌ Token verification failed:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return next(new AuthError('Token has expired'));
    }
    
    if (error.name === 'JsonWebTokenError') {
      return next(new AuthError('Invalid token'));
    }
    
    return next(new AuthError('Authentication failed'));
  }
};

/**
 * Role-based Authorization Middleware
 * Ensures user has the required role
 */
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthError('Authentication required'));
    }
    
    if (req.user.role !== role) {
      appDebug('❌ User role is not "' + role + '":', req.user.role);
      return next(new AuthorizationError(`Access denied. ${role} role required.`));
    }
    
    appDebug('✅ Role authorization successful');
    next();
  };
};

/**
 * User Access Middleware
 * Ensures user can only access their own resources
 */
const requireOwnership = (resourceType, idParam = 'id') => {
  return async (req, res, next) => {
    if (!req.user) {
      return next(new AuthError('Authentication required'));
    }
    
    const resourceId = req.params[idParam];
    if (!resourceId) {
      return next(new AppError('Resource ID required', 400));
    }
    
    try {
      const prisma = require('../utils/database');
      
      // Check if user owns the resource
      const resource = await prisma[resourceType].findFirst({
        where: {
          id: parseInt(resourceId),
          userId: req.user.userId
        }
      });
      
      if (!resource) {
        return next(new AuthorizationError('Access denied. You do not own this resource.'));
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      techError('Ownership check failed:', error);
      return next(new AppError('Failed to verify resource ownership', 500));
    }
  };
};

/**
 * Optional Authentication Middleware
 * Adds user info if token is provided, but doesn't require it
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // Continue without user info
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    appDebug('✅ Optional authentication successful');
  } catch (error) {
    appDebug('⚠️ Optional authentication failed, continuing without user info');
    // Don't throw error, just continue without user info
  }
  
  next();
};

module.exports = {
  authMiddleware,
  requireRole,
  requireOwnership,
  optionalAuth
}; 