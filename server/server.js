const https = require('https');
const fs = require('fs');
const { appDebug, techDebug, appError, techError, appInfo, techInfo } = require('./utils/debug');
const config = require('./config');
const app = require('./app');

// Log server configuration
techInfo('--- Server Configuration ---');
techInfo(`isHttp:      ${config.isHttp}`);
techInfo(`isHttps:     ${config.isHttps}`);
techInfo(`PORT:        ${config.port}`);
techInfo(`HTTP_PORT:   ${config.httpPort}`);
techInfo(`HTTPS_PORT:  ${config.httpsPort}`);
techInfo(`CORS origin allowed: ${config.frontendOrigin}`);
techInfo(`Active Protocol:  ${config.isHttp ? 'http' : 'https'}`);
techInfo(`Active Port:  ${config.port}`);
techInfo('-----------------------------');

// Server creation based on protocol
let server;

if (config.isHttp) {
  appDebug('About to start HTTP server on port', config.port);
  server = app.listen(config.port, () => {
    appDebug(`🚀 HTTP Server running on http://localhost:${config.port}`);
    appDebug(`📚 API docs available at: http://localhost:${config.port}/api-docs`);
  });
} else if (config.isHttps) {
  // SSL certificate configuration
  const httpsOptions = {
    key: fs.readFileSync('./localhost+2-key.pem'),
    cert: fs.readFileSync('./localhost+2.pem')
  };
  
  appDebug('About to start HTTPS server on port', config.port);
  server = https.createServer(httpsOptions, app).listen(config.port, () => {
    appDebug(`🚀 HTTPS Server running on https://localhost:${config.port}`);
    appDebug(`📚 API docs available at: https://localhost:${config.port}/api-docs`);
    appDebug(`🔒 SSL Certificate: Valid for localhost, 127.0.0.1, ::1`);
  });
}

// Server error handling
server.on('error', (error) => {
  techDebug('Server error:', error);
});

// Process error handling
process.on('uncaughtException', (error) => {
  techDebug('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  techDebug('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  appInfo('SIGTERM received, shutting down gracefully');
  server.close(() => {
    appInfo('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  appInfo('SIGINT received, shutting down gracefully');
  server.close(() => {
    appInfo('Process terminated');
    process.exit(0);
  });
});

module.exports = server; 