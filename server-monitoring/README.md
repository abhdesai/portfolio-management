# Server Monitoring Stack

This directory contains the monitoring stack for the Portfolio Management backend server.

## What's Monitored

- **Node.js Backend Server** (port 6050/6061)
- **System Metrics**: CPU, memory, disk usage
- **Application Metrics**: HTTP requests, response times, error rates
- **Custom Metrics**: Address search performance, API call durations
- **Node.js Specific**: Event loop lag, garbage collection, heap usage

## Quick Start

### Start Monitoring
```bash
cd server-monitoring
./start-monitoring.sh
```

### Access URLs
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:9091

### Grafana Login
- **Username**: `admin`
- **Password**: `admin`

## Setup Grafana

1. **Add Prometheus Data Source**:
   - Go to Configuration → Data Sources
   - Add Prometheus
   - URL: `http://localhost:9090`
   - Access: Server (default)
   - Save & Test

2. **Import Node.js Dashboard**:
   - Go to Dashboards → Import
   - Use dashboard ID: `1860` (Node.js Application Dashboard)
   - Or search for "Node.js" in the Grafana dashboard library

## Directory Structure

```
server-monitoring/
├── data/                                    # Prometheus time-series database
├── prometheus-2.48.0.darwin-amd64/         # Prometheus binary and files
├── grafana-v10.2.3/                        # Grafana binary and files
├── prometheus.yml                          # Prometheus configuration
├── start-monitoring.sh                     # Startup script
└── README.md                               # This file
```

## Metrics Available

### System Metrics
- `process_cpu_seconds_total` - CPU usage
- `process_resident_memory_bytes` - Memory usage
- `nodejs_heap_size_used_bytes` - Heap usage

### HTTP Metrics
- `http_requests_total` - Request counts by method/route/status
- `http_request_duration_seconds` - Response times

### Custom Metrics
- `address_search_requests_total` - Address search request counts
- `address_search_duration_seconds` - Address search response times

## Stopping Monitoring

Press `Ctrl+C` in the terminal where you ran `start-monitoring.sh`, or manually kill the processes:

```bash
pkill -f prometheus
pkill -f grafana
```

## Troubleshooting

### Port Already in Use
If you get "address already in use" errors:
```bash
pkill -f prometheus
pkill -f grafana
```

### Check if Services are Running
```bash
curl http://localhost:9090/api/v1/targets  # Prometheus
curl http://localhost:9091/api/health      # Grafana
```

### View Logs
The startup script shows real-time logs. For more detailed logs, check the terminal output where you ran the script. 