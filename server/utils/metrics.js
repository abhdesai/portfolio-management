const { register, Counter, Histogram, Gauge, collectDefaultMetrics } = require('prom-client');

// Enable default metrics (CPU, memory, etc.)
collectDefaultMetrics();

// Create a registry
const client = register;

// Define metrics
const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const databaseQueryDuration = new Histogram({
  name: 'database_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['query_type'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

const yahooApiRequests = new Counter({
  name: 'yahoo_api_requests_total',
  help: 'Total number of Yahoo Finance API requests',
  labelNames: ['endpoint', 'status']
});

const yahooApiRequestDuration = new Histogram({
  name: 'yahoo_api_request_duration_seconds',
  help: 'Duration of Yahoo Finance API requests in seconds',
  labelNames: ['endpoint'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Address search metrics
const addressSearchRequests = new Counter({
  name: 'address_search_requests_total',
  help: 'Total number of address search requests',
  labelNames: ['status']
});

const addressSearchDuration = new Histogram({
  name: 'address_search_duration_seconds',
  help: 'Duration of address search requests in seconds',
  buckets: [0.1, 0.5, 1, 2, 5]
});

// Add metrics to registry
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);
register.registerMetric(databaseQueryDuration);
register.registerMetric(yahooApiRequests);
register.registerMetric(yahooApiRequestDuration);
register.registerMetric(addressSearchRequests);
register.registerMetric(addressSearchDuration);

module.exports = {
  client,
  register,
  httpRequestDurationMicroseconds,
  httpRequestsTotal,
  activeConnections,
  databaseQueryDuration,
  yahooApiRequests,
  yahooApiRequestDuration,
  addressSearchRequests,
  addressSearchDuration
}; 