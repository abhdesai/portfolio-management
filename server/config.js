require('dotenv').config();

// Load production config if in production
const productionConfig = process.env.NODE_ENV === 'production' ? require('./config/production.js') : null;

// Server configuration
const config = {
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  
  // Protocol configuration
  isHttp: process.env.HTTP === 'true',
  isHttps: process.env.HTTPS === 'true',
  port: process.env.PORT ? Number(process.env.PORT) : undefined,
  
  // Port assignment
  httpPort: null,
  httpsPort: null,
  
  // Frontend origins
  frontendOrigin: null,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'secret',
  
  // Swagger
  swaggerServerUrl: process.env.SWAGGER_SERVER_URL || null,
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 1000, // 15 seconds
    max: 900, // limit each IP to 900 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again in 15 seconds.' },
    standardHeaders: true,
    legacyHeaders: false,
  }
};

// Override with production config if available
if (productionConfig) {
  Object.assign(config, productionConfig);
}

// Set ports based on protocol
if (config.isHttp) {
  config.httpPort = config.port;
}
if (config.isHttps) {
  config.httpsPort = config.port;
}

// Set frontend origin based on protocol
const protocol = config.isHttp ? 'http' : 'https';
if (config.isHttp) {
  config.frontendOrigin = 'http://localhost:6060';  // Frontend HTTP port
} else if (config.isHttps) {
  config.frontendOrigin = 'https://localhost:6061'; // Frontend HTTPS port
}

// Set Swagger server URL if not provided
if (!config.swaggerServerUrl) {
  config.swaggerServerUrl = `${protocol}://localhost:${config.port}`;
}

// Validation
if (config.isHttp && config.isHttps) {
  throw new Error('Both HTTP and HTTPS cannot be enabled at the same time.');
}

if (!config.isHttp && !config.isHttps) {
  throw new Error('Either HTTP or HTTPS must be enabled.');
}

if ((config.isHttp || config.isHttps) && config.port === undefined) {
  throw new Error('PORT must be defined in environment when HTTP or HTTPS is enabled.');
}

module.exports = config; 