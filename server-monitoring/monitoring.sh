#!/bin/bash

# Server Monitoring Management Script
# Usage: ./start-monitoring.sh [start|stop]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONITORING_DIR="$SCRIPT_DIR"
PROMETHEUS_DIR="$MONITORING_DIR/prometheus-2.48.0.darwin-amd64"
GRAFANA_DIR="$MONITORING_DIR/grafana-v10.2.3"
DATA_DIR="$MONITORING_DIR/data"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check if a process is running
is_process_running() {
    local process_name=$1
    local port=$2
    
    # Check by process name
    if pgrep -f "$process_name" > /dev/null; then
        return 0
    fi
    
    # Check by port
    if lsof -i ":$port" > /dev/null 2>&1; then
        return 0
    fi
    
    return 1
}

# Function to check if Grafana is running (check both 9091 and 3000)
is_grafana_running() {
    if pgrep -f "grafana" > /dev/null; then
        return 0
    fi
    
    if lsof -i :9091 > /dev/null 2>&1; then
        return 0
    fi
    
    if lsof -i :3000 > /dev/null 2>&1; then
        return 0
    fi
    
    return 1
}

# Function to kill processes
kill_monitoring_processes() {
    print_status "Stopping monitoring processes..."
    
    # Kill Prometheus
    if is_process_running "prometheus" 9090; then
        print_status "Stopping Prometheus..."
        pkill -f "prometheus" || true
        sleep 2
        if is_process_running "prometheus" 9090; then
            print_warning "Prometheus still running, force killing..."
            pkill -9 -f "prometheus" || true
        fi
    fi
    
    # Kill Grafana
    if is_process_running "grafana" 9091; then
        print_status "Stopping Grafana..."
        pkill -f "grafana" || true
        sleep 2
        if is_process_running "grafana" 9091; then
            print_warning "Grafana still running, force killing..."
            pkill -9 -f "grafana" || true
        fi
    fi
    
    # Also check port 3000 for Grafana fallback
    if lsof -i :3000 > /dev/null 2>&1; then
        print_status "Stopping process on port 3000..."
        lsof -ti :3000 | xargs kill -9 2>/dev/null || true
    fi
    
    sleep 1
    
    # Verify all processes are stopped
    if ! is_process_running "prometheus" 9090 && ! is_process_running "grafana" 9091 && ! lsof -i :3000 > /dev/null 2>&1; then
        print_success "All monitoring processes stopped"
    else
        print_warning "Some processes may still be running"
    fi
}

# Function to start monitoring
start_monitoring() {
    print_status "Starting server monitoring..."
    
    # Check if processes are already running
    if is_process_running "prometheus" 9090; then
        print_warning "Prometheus is already running on port 9090"
    fi
    
    if is_grafana_running; then
        if lsof -i :9091 > /dev/null 2>&1; then
            print_warning "Grafana is already running on port 9091"
        elif lsof -i :3000 > /dev/null 2>&1; then
            print_warning "Grafana is already running on port 3000"
        fi
    fi
    
    # Create data directory if it doesn't exist
    if [ ! -d "$DATA_DIR" ]; then
        print_status "Creating data directory..."
        mkdir -p "$DATA_DIR"
    fi
    
    # Start Prometheus
    print_status "Starting Prometheus..."
    if [ ! -f "$PROMETHEUS_DIR/prometheus" ]; then
        print_error "Prometheus binary not found at $PROMETHEUS_DIR/prometheus"
        print_error "Please ensure Prometheus is extracted to $PROMETHEUS_DIR"
        exit 1
    fi
    
    cd "$MONITORING_DIR"
    nohup "$PROMETHEUS_DIR/prometheus" \
        --config.file=prometheus.yml \
        --storage.tsdb.path="$DATA_DIR" \
        --web.listen-address=:9090 \
        --web.enable-lifecycle \
        > prometheus.log 2>&1 &
    
    PROMETHEUS_PID=$!
    echo $PROMETHEUS_PID > prometheus.pid
    
    # Wait for Prometheus to start
    print_status "Waiting for Prometheus to start..."
    for i in {1..30}; do
        if curl -s http://localhost:9090/-/healthy > /dev/null 2>&1; then
            print_success "Prometheus started successfully on port 9090"
            break
        fi
        if [ $i -eq 30 ]; then
            print_error "Prometheus failed to start within 30 seconds"
            exit 1
        fi
        sleep 1
    done
    
    # Start Grafana
    print_status "Starting Grafana..."
    if [ ! -f "$GRAFANA_DIR/bin/grafana" ]; then
        print_error "Grafana binary not found at $GRAFANA_DIR/bin/grafana"
        print_error "Please ensure Grafana is extracted to $GRAFANA_DIR"
        exit 1
    fi
    
    cd "$MONITORING_DIR"
    nohup "$GRAFANA_DIR/bin/grafana" server \
        --config="$MONITORING_DIR/grafana-custom.ini" \
        --homepath="$GRAFANA_DIR" \
        > grafana.log 2>&1 &
    
    GRAFANA_PID=$!
    echo $GRAFANA_PID > grafana.pid
    
    # Wait for Grafana to start
    print_status "Waiting for Grafana to start..."
    for i in {1..30}; do
        if curl -s http://localhost:9091/api/health > /dev/null 2>&1; then
            print_success "Grafana started successfully on port 9091"
            break
        fi
        if [ $i -eq 30 ]; then
            print_warning "Grafana may have started on port 3000 (fallback)"
            if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
                print_success "Grafana started successfully on port 3000"
            else
                print_error "Grafana failed to start"
                exit 1
            fi
        fi
        sleep 1
    done
    
    print_success "Server monitoring started successfully!"
    echo ""
    print_status "Access URLs:"
    echo "  Prometheus: http://localhost:9090"
    if lsof -i :9091 > /dev/null 2>&1; then
        echo "  Grafana:    http://localhost:9091"
    elif lsof -i :3000 > /dev/null 2>&1; then
        echo "  Grafana:    http://localhost:3000"
    else
        echo "  Grafana:    http://localhost:9091 or http://localhost:3000"
    fi
    echo ""
    print_status "Log files:"
    echo "  Prometheus: $MONITORING_DIR/prometheus.log"
    echo "  Grafana:    $MONITORING_DIR/grafana.log"
    echo ""
    print_status "To stop monitoring, run: $0 stop"
}

# Function to show status
show_status() {
    print_status "Monitoring Status:"
    echo ""
    
    if is_process_running "prometheus" 9090; then
        print_success "Prometheus: Running on port 9090"
    else
        print_error "Prometheus: Not running"
    fi
    
    if is_grafana_running; then
        if lsof -i :9091 > /dev/null 2>&1; then
            print_success "Grafana: Running on port 9091"
            GRAFANA_PORT=9091
        elif lsof -i :3000 > /dev/null 2>&1; then
            print_success "Grafana: Running on port 3000"
            GRAFANA_PORT=3000
        else
            print_success "Grafana: Running (port detection failed)"
            GRAFANA_PORT="unknown"
        fi
    else
        print_error "Grafana: Not running"
        GRAFANA_PORT="none"
    fi
    
    echo ""
    print_status "Access URLs:"
    echo "  Prometheus: http://localhost:9090"
    if [ "$GRAFANA_PORT" = "9091" ]; then
        echo "  Grafana:    http://localhost:9091"
    elif [ "$GRAFANA_PORT" = "3000" ]; then
        echo "  Grafana:    http://localhost:3000"
    else
        echo "  Grafana:    http://localhost:9091 or http://localhost:3000"
    fi
}

# Main script logic
case "${1:-start}" in
    start)
        start_monitoring
        ;;
    stop)
        kill_monitoring_processes
        ;;
    status)
        show_status
        ;;
    restart)
        print_status "Restarting monitoring services..."
        kill_monitoring_processes
        sleep 2
        start_monitoring
        ;;
    *)
        echo "Usage: $0 {start|stop|status|restart}"
        echo ""
        echo "Commands:"
        echo "  start   - Start Prometheus and Grafana"
        echo "  stop    - Stop all monitoring processes"
        echo "  status  - Show current status"
        echo "  restart - Restart all monitoring services"
        echo ""
        echo "Examples:"
        echo "  $0 start    # Start monitoring"
        echo "  $0 stop     # Stop monitoring"
        echo "  $0 status   # Check status"
        echo "  $0 restart  # Restart monitoring"
        exit 1
        ;;
esac 