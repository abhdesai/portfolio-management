# 📊 Prometheus Queries for Portfolio Management

## 🚀 Quick Access Dashboard
Open this HTML file in your browser for a simple dashboard: `prometheus-dashboard.html`

## 📈 Essential Metrics Queries

### Request Rate
```promql
# Total request rate
sum(rate(http_requests_total{job="portfolio-backend"}[5m]))

# Request rate by route
sum by (route) (rate(http_requests_total{job="portfolio-backend"}[5m]))

# Request rate by HTTP method
sum by (method) (rate(http_requests_total{job="portfolio-backend"}[5m]))

# Request rate by status code
sum by (status_code) (rate(http_requests_total{job="portfolio-backend"}[5m]))
```

### Response Time
```promql
# Average response time
rate(http_request_duration_seconds_sum{job="portfolio-backend"}[5m]) / rate(http_request_duration_seconds_count{job="portfolio-backend"}[5m]) * 1000

# 95th percentile response time
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{job="portfolio-backend"}[5m])) * 1000

# 99th percentile response time
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket{job="portfolio-backend"}[5m])) * 1000
```

### Error Rates
```promql
# 5xx error rate percentage
sum(rate(http_requests_total{job="portfolio-backend",status_code=~"5.."}[5m])) / sum(rate(http_requests_total{job="portfolio-backend"}[5m])) * 100

# 4xx error rate percentage
sum(rate(http_requests_total{job="portfolio-backend",status_code=~"4.."}[5m])) / sum(rate(http_requests_total{job="portfolio-backend"}[5m])) * 100

# Success rate percentage
sum(rate(http_requests_total{job="portfolio-backend",status_code=~"2.."}[5m])) / sum(rate(http_requests_total{job="portfolio-backend"}[5m])) * 100
```

### System Resources
```promql
# Memory usage
process_resident_memory_bytes{job="portfolio-backend"}

# CPU usage rate
rate(process_cpu_seconds_total{job="portfolio-backend"}[5m])

# Event loop lag
nodejs_eventloop_lag_seconds{job="portfolio-backend"}

# Process uptime
time() - process_start_time_seconds{job="portfolio-backend"}
```

### Node.js Specific Metrics
```promql
# Active handles
nodejs_active_handles{job="portfolio-backend"}

# Active requests
nodejs_active_requests_total{job="portfolio-backend"}

# Heap memory usage
nodejs_heap_size_used_bytes{job="portfolio-backend"}

# Garbage collection duration
rate(nodejs_gc_duration_seconds_sum{job="portfolio-backend"}[5m])
```

## 🔗 Quick Links

### Prometheus UI
- **Main UI**: http://localhost:9090
- **Graph**: http://localhost:9090/graph
- **Status**: http://localhost:9090/status
- **Targets**: http://localhost:9090/targets

### Grafana Dashboards
- **Main**: http://localhost:9091
- **Login**: admin / admin

### Application
- **Portfolio App**: http://localhost:6050
- **Raw Metrics**: http://localhost:6050/metrics

## 📋 How to Use These Queries

1. **Copy a query** from above
2. **Go to Prometheus UI**: http://localhost:9090/graph
3. **Paste the query** in the expression box
4. **Click "Execute"** to see the result
5. **Click "Graph"** to see the time series
6. **Bookmark** useful queries for quick access

## 🎯 Recommended Monitoring Setup

### High Priority Alerts (if you set up alerting)
- Response time > 1 second
- Error rate > 5%
- Memory usage > 200MB
- Event loop lag > 100ms

### Daily Monitoring
- Request rate trends
- Response time percentiles
- Error rate patterns
- Memory usage growth

### Weekly Review
- Performance trends
- Resource utilization
- Error patterns
- Capacity planning

## 🔧 Customization

You can modify these queries by:
- Changing the time window `[5m]` to `[1m]`, `[10m]`, etc.
- Adding more labels for filtering
- Combining queries for complex metrics
- Creating recording rules for frequently used queries

## 📚 Additional Resources

- [Prometheus Query Language](https://prometheus.io/docs/prometheus/latest/querying/)
- [PromQL Functions](https://prometheus.io/docs/prometheus/latest/querying/functions/)
- [Node.js Metrics](https://github.com/siimon/prom-client) 