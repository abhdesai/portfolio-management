module.exports = {
  // Server Configuration
  port: process.env.PORT || 6050,
  isHttp: process.env.HTTP === 'true',
  isHttps: process.env.HTTPS === 'true',
  
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  
  // Database
  databaseUrl: process.env.DATABASE_URL,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-here',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  
  // Email
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
  
  // CORS
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'https://yourdomain.com',
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 900
  },
  
  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || './logs/production.log',
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12
}; 