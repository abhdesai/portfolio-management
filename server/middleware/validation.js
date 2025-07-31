const { ValidationError } = require('../utils/errorHandler');
const { appDebug } = require('../utils/debug');

/**
 * Email validation
 */
const validateEmail = (email) => {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailRegex.test(email);
};

/**
 * Username validation (8-30 chars, alphanumeric + underscore)
 */
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{8,30}$/;
  return usernameRegex.test(username);
};

/**
 * Phone validation
 */
const validatePhone = (phone) => {
  const phoneRegex = /^\+?[0-9\-\s]{7,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Password validation
 */
const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Stock symbol validation
 */
const validateStockSymbol = (symbol) => {
  const symbolRegex = /^[A-Z]{1,5}$/;
  return symbolRegex.test(symbol);
};

/**
 * Date validation
 */
const validateDate = (date) => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) && dateObj <= new Date();
};

/**
 * Positive number validation
 */
const validatePositiveNumber = (value, fieldName) => {
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) {
    throw new ValidationError(`${fieldName} must be a positive number`);
  }
  return num;
};

/**
 * Integer validation
 */
const validateInteger = (value, fieldName) => {
  const num = parseInt(value, 10);
  if (isNaN(num) || num <= 0) {
    throw new ValidationError(`${fieldName} must be a positive integer`);
  }
  return num;
};

/**
 * Input sanitization
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validation middleware factory
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(new ValidationError(error.details[0].message));
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Registration validation middleware
 */
const validateRegistration = (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);
    
    // Validate required fields
    if (!sanitizedUsername || !sanitizedEmail || !password || !sanitizedFirstName || !sanitizedLastName) {
      return next(new ValidationError('All required fields must be provided'));
    }
    
    // Validate username
    if (!validateUsername(sanitizedUsername)) {
      return next(new ValidationError('Username must be 8-30 characters, alphanumeric and underscore only'));
    }
    
    // Validate email
    if (!validateEmail(sanitizedEmail)) {
      return next(new ValidationError('Please provide a valid email address'));
    }
    
    // Validate password
    if (!validatePassword(password)) {
      return next(new ValidationError('Password must be at least 8 characters with uppercase, lowercase, and number'));
    }
    
    // Validate names
    if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
      return next(new ValidationError('First and last names must be at least 2 characters'));
    }
    
    // Add sanitized values to request
    req.body.username = sanitizedUsername;
    req.body.email = sanitizeInput(email);
    req.body.firstName = sanitizedFirstName;
    req.body.lastName = sanitizedLastName;
    
    appDebug('✅ Registration validation passed');
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Portfolio validation middleware
 */
const validatePortfolio = (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    if (!name || !name.trim()) {
      return next(new ValidationError('Portfolio name is required'));
    }
    
    if (name.trim().length < 8) {
      return next(new ValidationError('Portfolio name must be at least 8 characters'));
    }
    
    if (name.trim().length > 100) {
      return next(new ValidationError('Portfolio name must be less than 100 characters'));
    }
    
    // Sanitize inputs
    req.body.name = name.trim();
    req.body.description = description ? description.trim() : null;
    
    appDebug('✅ Portfolio validation passed');
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Transaction validation middleware
 */
const validateTransaction = (req, res, next) => {
  try {
    const { stockSymbol, type, quantity, price, date } = req.body;
    
    // Validate required fields
    if (!stockSymbol || !type || !quantity || !price || !date) {
      return next(new ValidationError('All fields are required'));
    }
    
    // Validate stock symbol
    if (!validateStockSymbol(stockSymbol.toUpperCase())) {
      return next(new ValidationError('Invalid stock symbol format'));
    }
    
    // Validate transaction type
    if (!['buy', 'sell'].includes(type.toLowerCase())) {
      return next(new ValidationError('Transaction type must be "buy" or "sell"'));
    }
    
    // Validate quantity
    const validQuantity = validateInteger(quantity, 'Quantity');
    
    // Validate price
    const validPrice = validatePositiveNumber(price, 'Price');
    
    // Validate date
    if (!validateDate(date)) {
      return next(new ValidationError('Invalid date format or future date not allowed'));
    }
    
    // Sanitize and normalize inputs
    req.body.stockSymbol = stockSymbol.toUpperCase().trim();
    req.body.type = type.toLowerCase();
    req.body.quantity = validQuantity;
    req.body.price = validPrice;
    req.body.date = new Date(date);
    
    appDebug('✅ Transaction validation passed');
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * User profile validation middleware
 */
const validateUserProfile = (req, res, next) => {
  try {
    const { email, phone, firstName, lastName } = req.body;
    
    // Validate email if provided
    if (email && !validateEmail(sanitizeInput(email))) {
      return next(new ValidationError('Please provide a valid email address'));
    }
    
    // Validate phone if provided
    if (phone && !validatePhone(sanitizeInput(phone))) {
      return next(new ValidationError('Please provide a valid phone number'));
    }
    
    // Validate names if provided
    if (firstName && sanitizeInput(firstName).length < 2) {
      return next(new ValidationError('First name must be at least 2 characters'));
    }
    
    if (lastName && sanitizeInput(lastName).length < 2) {
      return next(new ValidationError('Last name must be at least 2 characters'));
    }
    
    // Sanitize inputs
    if (email) req.body.email = sanitizeInput(email);
    if (phone) req.body.phone = sanitizeInput(phone);
    if (firstName) req.body.firstName = sanitizeInput(firstName);
    if (lastName) req.body.lastName = sanitizeInput(lastName);
    
    appDebug('✅ User profile validation passed');
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateEmail,
  validateUsername,
  validatePhone,
  validatePassword,
  validateStockSymbol,
  validateDate,
  validatePositiveNumber,
  validateInteger,
  sanitizeInput,
  validateRequest,
  validateRegistration,
  validatePortfolio,
  validateTransaction,
  validateUserProfile
}; 