const { clientTechDebug } = require('./utils/debug.ts');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');

// Logging utility with minimal output
const logRequest = (req, type, extra = {}) => {
  const timestamp = new Date().toISOString();
  const log = {
    timestamp,
    type,
    method: req.method,
    url: req.originalUrl || req.url,
    ...extra,
  };
  clientTechDebug('setupProxy Log',JSON.stringify(log));
};

module.exports = function(app) {
  clientTechDebug('setupProxy Log','SetupProxy loaded');
  const allowedRoutes = ['/auth', '/api', '/users', '/metrics', '/api-docs', '/test', '/uploads'];
  const clientRoutes = ['/', '/login', '/portfolios', '/test', '/profile', '/dashboard', '/admin'];
  const staticRoutes = ['/static', '/manifest.json', '/favicon.ico', '/.well-known', '/logo192.png', '/logo512.png'];
  const backendTarget = process.env.HTTPS === 'true'
    ? 'https://localhost:6051'
    : 'http://localhost:6050';
  const allowedOrigins = ['https://localhost:6061', 'http://localhost:6060'];

  // Handle CORS preflight requests
  app.use((req, res, next) => {
    logRequest(req, 'CORS_PREFLIGHT');
    if (req.method === 'OPTIONS') {
      const origin = req.headers.origin && allowedOrigins.includes(req.headers.origin)
        ? req.headers.origin
        : allowedOrigins[0];
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.status(200).end();
      return;
    }
    next();
  });

  // Route requests
  app.use((req, res, next) => {
    logRequest(req, 'INCOMING_REQUEST');
    const isStaticRoute = staticRoutes.some(route => 
      req.originalUrl === route || req.originalUrl.startsWith(`${route}/`)
    );
    if (isStaticRoute) {
      next();
      return;
    }
    const isClientRoute = clientRoutes.some(route => 
      req.originalUrl === route || req.originalUrl.startsWith(`${route}/`)
    );
    if (isClientRoute) {
      next();
      return;
    }
    const isHMR = req.originalUrl.endsWith('.hot-update.json') || req.originalUrl.endsWith('.hot-update.js');
    if (isHMR) {
      next();
      return;
    }

    const isAllowed = allowedRoutes.some(route => req.originalUrl.startsWith(route));
    if (!isAllowed) {
      res.status(403).send('Access to this route is forbidden');
      return;
    }
    next();
  });

  // Single proxy for all API routes
  clientTechDebug('setupProxy Log',`Initializing proxy to ${backendTarget}`);
  app.use(
    allowedRoutes,
    (req, res, next) => {
      logRequest(req, 'PROXY_START', { target: backendTarget });
      next();
    },
    createProxyMiddleware({
      target: backendTarget,
      changeOrigin: true,
      secure: false,
      pathRewrite: (path, req) => {
        const rewrittenPath = req.originalUrl;
        logRequest(req, 'REWRITE', { originalPath: path, rewrittenPath });
        return rewrittenPath;
      },
      timeout: 60000,
      proxyTimeout: 60000,
      agent: backendTarget.startsWith('https') ? new https.Agent({ rejectUnauthorized: false }) : null,
      on: {
            proxyReq: (proxyReq, req, res) => {
            clientTechDebug(`on PROXY_REQUEST Entering on ProxyReq for ${req.originalUrl}`);
            logRequest(req, 'on PROXY_REQUEST', { proxyTarget: backendTarget, path: proxyReq.path });
             /* handle proxyReq */
         },
            proxyRes: (proxyRes, req, res) => {
            clientTechDebug(`on PROXY_RESPONSE Entering on ProxyReq for ${req.originalUrl}`);
            logRequest(req, 'on PROXY_RESPONSE', { status: proxyRes.statusCode });
            const origin = req.headers.origin && allowedOrigins.includes(req.headers.origin)
              ? req.headers.origin
              : allowedOrigins[0];
            proxyRes.headers['Access-Control-Allow-Origin'] = origin;
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization';
             /* handle proxyRes */
         },
         error: (err, req, res) => {
            clientTechDebug(`on PROXY_ERROR Entering on Error for ${req.originalUrl}: ${err.message}`);
            logRequest(req, 'on PROXY_ERROR', {
               error: err.message,
               code: err.code,
             });            /* handle error */
         },
      },
      onProxyReq: (proxyReq, req) => {
        clientTechDebug(`onPROXY_REQUEST Entering onProxyReq for ${req.originalUrl}`);
        logRequest(req, 'onPROXY_REQUEST', { proxyTarget: backendTarget, path: proxyReq.path });
      },
      onProxyRes: (proxyRes, req, res) => {
        clientTechDebug(`onPROXY_RESPONSE Entering onProxyRes for ${req.originalUrl}`);
        logRequest(req, 'onPROXY_RESPONSE', { status: proxyRes.statusCode });
        const origin = req.headers.origin && allowedOrigins.includes(req.headers.origin)
          ? req.headers.origin
          : allowedOrigins[0];
        proxyRes.headers['Access-Control-Allow-Origin'] = origin;
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization';
      },
      onError: (err, req, res) => {
        clientTechDebug(`onPROXY_ERROR Entering onError for ${req.originalUrl}: ${err.message}`);
        logRequest(req, 'onPROXY_ERROR', {
          error: err.message,
          code: err.code,
        });
        res.status(500).send(`Error occurred when trying to proxy: ${err.message}`);
      },
    })
  );
  clientTechDebug('setupProxy Log','Proxy setup complete');
};