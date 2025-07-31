#!/bin/bash

# Prometheus Graphs Auto-Opener
# This script opens multiple Prometheus graphs in browser tabs

echo "🚀 Opening Prometheus graphs in browser tabs..."

# Base URL for Prometheus
PROMETHEUS_BASE="http://localhost:9090/graph"

# Array of queries to open
queries=(
    "portfolio:http_requests_total:rate5m"
    "portfolio:http_request_duration_avg_ms"
    "portfolio:memory_usage_mb"
    "portfolio:http_success_rate_percent"
    "portfolio:http_errors_5xx_percent"
    "portfolio:cpu_usage_rate"
    "portfolio:eventloop_lag_ms"
    "portfolio:http_requests_by_route:rate5m"
    "portfolio:http_requests_by_method:rate5m"
    "portfolio:http_request_duration_p95_ms"
)

# Time range for graphs (15 minutes)
TIME_RANGE="15m"

echo "📊 Opening ${#queries[@]} Prometheus graphs..."

# Open each query in a new tab
for query in "${queries[@]}"; do
    # URL encode the query
    encoded_query=$(echo "$query" | sed 's/:/%3A/g' | sed 's/:/%3A/g')
    
    # Construct the full URL
    url="${PROMETHEUS_BASE}?g0.expr=${encoded_query}&g0.tab=1&g0.stacked=0&g0.show_exemplars=0&g0.range_input=${TIME_RANGE}"
    
    echo "🔗 Opening: $query"
    
    # Open in browser (macOS)
    open "$url"
    
    # Small delay to prevent overwhelming the browser
    sleep 0.5
done

echo "✅ All Prometheus graphs opened!"
echo ""
echo "📋 Quick Reference:"
echo "• Main Prometheus: http://localhost:9090"
echo "• Graph Interface: http://localhost:9090/graph"
echo "• Rules: http://localhost:9090/rules"
echo "• Targets: http://localhost:9090/targets"
echo ""
echo "🎯 Most Important Queries:"
echo "• portfolio:http_requests_total:rate5m"
echo "• portfolio:http_request_duration_avg_ms"
echo "• portfolio:memory_usage_mb"
echo "• portfolio:http_success_rate_percent" 