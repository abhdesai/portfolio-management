# Portfolio Management Server Monitoring Dashboards

This directory contains comprehensive Grafana dashboards for monitoring your Portfolio Management server.

## 📊 Available Dashboards

### 1. **Server Overview Dashboard** (`server-overview.json`)
**Purpose**: High-level server health and performance overview
**Key Metrics**:
- Request rate and response times
- CPU, Memory, and Disk usage
- API call statistics by status code and method
- System load and resource utilization

### 2. **API Performance Dashboard** (`api-performance.json`)
**Purpose**: Detailed API performance analysis
**Key Metrics**:
- Response time percentiles (50th, 95th, 99th)
- Error rates (4xx, 5xx)
- Endpoint-specific performance
- Feature usage by category
- 5xx error breakdown

### 3. **System Resources Dashboard** (`system-resources.json`)
**Purpose**: Detailed system resource monitoring
**Key Metrics**:
- CPU usage percentage
- Memory usage (used vs available)
- Disk usage and space
- Network I/O
- System load averages
- Open file descriptors

### 4. **User Activity Dashboard** (`user-activity.json`)
**Purpose**: User behavior and authentication monitoring
**Key Metrics**:
- Login/logout/registration rates
- Authentication endpoint status codes
- User feature usage patterns
- API response times for user operations
- Security events (auth failures, rate limiting)
- External API usage

## 🚀 How to Import Dashboards

### Prerequisites
1. Ensure Grafana is running: `./monitoring.sh status`
2. Access Grafana at: http://localhost:9091
3. Login with: `admin` / `admin`

### Import Steps

1. **Add Prometheus Data Source** (if not already done):
   - Go to Configuration → Data Sources
   - Click "Add data source"
   - Select "Prometheus"
   - URL: `http://localhost:9090`
   - Click "Save & Test"

2. **Import Dashboards**:
   - Go to Dashboards → Import
   - Click "Upload JSON file"
   - Select one of the dashboard JSON files
   - Click "Import"

3. **Import All Dashboards**:
   ```bash
   # Navigate to dashboards directory
   cd server-monitoring/dashboards
   
   # Import each dashboard
   curl -X POST http://admin:admin@localhost:9091/api/dashboards/db \
     -H "Content-Type: application/json" \
     -d @server-overview.json
   
   curl -X POST http://admin:admin@localhost:9091/api/dashboards/db \
     -H "Content-Type: application/json" \
     -d @api-performance.json
   
   curl -X POST http://admin:admin@localhost:9091/api/dashboards/db \
     -H "Content-Type: application/json" \
     -d @system-resources.json
   
   curl -X POST http://admin:admin@localhost:9091/api/dashboards/db \
     -H "Content-Type: application/json" \
     -d @user-activity.json
   ```

## 📈 Dashboard Features

### **Real-time Monitoring**
- 5-second refresh intervals
- Live metrics from your Node.js backend
- System resource tracking

### **Alert Thresholds**
- CPU usage > 80% (warning)
- Memory usage > 80% (warning)
- Error rates > 5% (warning)
- Response times > 1000ms (warning)

### **Key Metrics Tracked**

#### **Server Health**
- Request rate (requests/second)
- Average response time
- Error rates by status code
- System resource utilization

#### **API Performance**
- Response time percentiles
- Endpoint-specific metrics
- Error breakdown
- Feature usage patterns

#### **User Activity**
- Authentication events
- User feature usage
- Security events
- External API calls

#### **System Resources**
- CPU, Memory, Disk usage
- Network I/O
- System load
- File descriptors

## 🔧 Customization

### **Adding Custom Metrics**
1. Add new metrics to your Node.js server in `server/utils/metrics.js`
2. Update the dashboard JSON files with new queries
3. Import the updated dashboard

### **Modifying Thresholds**
1. Open dashboard in Grafana
2. Edit panel settings
3. Modify thresholds in the "Thresholds" section
4. Save dashboard

### **Adding New Panels**
1. Open dashboard in Grafana
2. Click "Add panel"
3. Write PromQL queries
4. Configure visualization
5. Save dashboard

## 📋 PromQL Query Examples

### **Request Rate**
```promql
rate(http_requests_total{job="portfolio-backend"}[5m])
```

### **Response Time**
```promql
rate(http_request_duration_seconds_sum{job="portfolio-backend"}[5m]) / 
rate(http_request_duration_seconds_count{job="portfolio-backend"}[5m]) * 1000
```

### **Error Rate**
```promql
sum(rate(http_requests_total{job="portfolio-backend",status_code=~"5.."}[5m])) / 
sum(rate(http_requests_total{job="portfolio-backend"}[5m])) * 100
```

### **CPU Usage**
```promql
100 - (avg by (instance) (irate(node_cpu_seconds_total{job="node",mode="idle"}[5m])) * 100)
```

## 🚨 Troubleshooting

### **No Data Showing**
1. Check if Prometheus is scraping your server: http://localhost:9090/targets
2. Verify server metrics endpoint: http://localhost:6061/metrics
3. Check Prometheus configuration in `prometheus.yml`

### **Dashboard Import Errors**
1. Ensure Prometheus data source is configured
2. Check JSON file syntax
3. Verify Grafana version compatibility

### **Missing Metrics**
1. Check if Node.js server is running
2. Verify metrics are being exposed at `/metrics` endpoint
3. Check Prometheus logs for scraping errors

## 📞 Support

For issues with:
- **Dashboard functionality**: Check Grafana logs
- **Metrics collection**: Check Prometheus logs
- **Server metrics**: Check Node.js server logs

All logs are available in the `server-monitoring/` directory:
- `prometheus.log` - Prometheus server logs
- `grafana.log` - Grafana server logs 