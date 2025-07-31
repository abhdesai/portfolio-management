import React, { useRef, useEffect, useState, useMemo } from 'react';
import { createChart, IChartApi, LineData, HistogramData, LineSeries, HistogramSeries } from 'lightweight-charts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface LineSeriesInput {
  data: LineData[];
  options?: object;
}
interface HistogramSeriesInput {
  data: HistogramData[];
  options?: object;
}

export interface ReusableChartWidgetProps {
  lineSeriesData?: LineSeriesInput[];
  histogramSeriesData?: HistogramSeriesInput[];
  transactionDetailsMap?: { [date: string]: any[] };
  height?: number;
  width?: number;
  onChartReady?: (chart: IChartApi) => void;
  defaultFilter?: string;
  enableScrolling?: boolean;
}

// Helper to sort and deduplicate data by time
function sortAndDedup<T extends { time: any }>(data: T[]): T[] {
  const sorted = [...data].sort((a, b) => {
    let ta: number;
    let tb: number;
    if (typeof a.time === 'string') {
      ta = new Date(a.time).getTime();
    } else if (typeof a.time === 'number') {
      ta = a.time;
    } else if (typeof a.time === 'object' && a.time.year && a.time.month) {
      ta = new Date(a.time.year, a.time.month - 1, a.time.day || 1).getTime();
    } else {
      ta = 0;
    }
    if (typeof b.time === 'string') {
      tb = new Date(b.time).getTime();
    } else if (typeof b.time === 'number') {
      tb = b.time;
    } else if (typeof b.time === 'object' && b.time.year && b.time.month) {
      tb = new Date(b.time.year, b.time.month - 1, b.time.day || 1).getTime();
    } else {
      tb = 0;
    }
    return ta - tb;
  });
  return sorted.filter((item, idx, arr) => {
    if (idx === 0) return true;
    const prev = arr[idx - 1];
    let ta: number;
    let tb: number;
    if (typeof item.time === 'string') {
      ta = new Date(item.time).getTime();
    } else if (typeof item.time === 'number') {
      ta = item.time;
    } else if (typeof item.time === 'object' && item.time.year && item.time.month) {
      ta = new Date(item.time.year, item.time.month - 1, item.time.day || 1).getTime();
    } else {
      ta = 0;
    }
    if (typeof prev.time === 'string') {
      tb = new Date(prev.time).getTime();
    } else if (typeof prev.time === 'number') {
      tb = prev.time;
    } else if (typeof prev.time === 'object' && prev.time.year && prev.time.month) {
      tb = new Date(prev.time.year, prev.time.month - 1, prev.time.day || 1).getTime();
    } else {
      tb = 0;
    }
    return ta !== tb;
  });
}

// Helper to convert time (string | number | BusinessDay) to Date
function toDate(time: any): Date {
  if (typeof time === 'string' || typeof time === 'number') return new Date(time);
  if (typeof time === 'object' && time.year && time.month) {
    return new Date(time.year, time.month - 1, time.day || 1);
  }
  return new Date(0);
}

const ReusableChartWidget: React.FC<ReusableChartWidgetProps> = ({
  lineSeriesData = [],
  histogramSeriesData = [],
  transactionDetailsMap,
  height = 320,
  width = 700, // used only for initial chart area width, but not for outer box
  onChartReady,
  defaultFilter = '1Y',
  enableScrolling = true,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const outerBoxRef = useRef<HTMLDivElement>(null);

  // Histogram dialog state
  const [histogramInfo, setHistogramInfo] = useState<{
    time: string;
    value: number;
    x: number;
    y: number;
    transactions: Array<{
      stockSymbol: string;
      type: string;
      quantity: number;
      price: number;
      value: number;
      portfolioName: string;
    }>;
    visible: boolean;
  } | null>(null);

  // Axis label widths and margins
  const labelWidth = 20;
  const labelMargin = 4; // smaller margin
  const [chartAreaWidth, setChartAreaWidth] = useState<number>(width - labelWidth * 2 - labelMargin * 2);

  // Dynamically update chart area width based on parent width
  useEffect(() => {
    if (!outerBoxRef.current) return;
    const handleResize = () => {
      const parentWidth = outerBoxRef.current ? outerBoxRef.current.offsetWidth : width;
      // Account for Y-axis labels and margins, plus some space for X-axis label
      setChartAreaWidth(parentWidth - labelWidth * 2 - labelMargin * 2);
    };
    handleResize();
    const resizeObserver = new (window as any).ResizeObserver(handleResize);
    resizeObserver.observe(outerBoxRef.current);
    return () => resizeObserver.disconnect();
  }, [width]);

  // --- FILTER LOGIC ---
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const lineData = lineSeriesData[0]?.data || [];

  // Compute available filters based on data range
  const availableFilters = useMemo(() => {
    if (!lineData.length) return [];
    const firstDate = toDate(lineData[0].time);
    const lastDate = toDate(lineData[lineData.length - 1].time);
    const yearDiff = lastDate.getFullYear() - firstDate.getFullYear();
    const filters: string[] = [];
    if (yearDiff >= 5) filters.push('5Y');
    if (yearDiff >= 3) filters.push('3Y');
    if (yearDiff >= 2) filters.push('2Y');
    if (yearDiff >= 1) filters.push('1Y');
    return filters;
  }, [lineData]);

  // Set default filter when data changes
  useEffect(() => {
    if (availableFilters.includes(defaultFilter)) {
      setSelectedFilter(defaultFilter);
    } else if (availableFilters.includes('1Y')) {
      setSelectedFilter('1Y');
    } else if (availableFilters.length > 0) {
      setSelectedFilter(availableFilters[availableFilters.length - 1]);
    }
  }, [availableFilters, defaultFilter]);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      width: chartAreaWidth,
      height,
      layout: { background: { color: '#fff' }, textColor: '#222' },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } },
      rightPriceScale: { 
        visible: true,
        autoScale: true,
        scaleMargins: { top: 0.1, bottom: 0.05 }, // Reduced bottom margin since we have external X-axis label
      },
      leftPriceScale: { 
        visible: true,
        autoScale: true,
        scaleMargins: { top: 0.1, bottom: 0.05 }, // Reduced bottom margin since we have external X-axis label
      },
      timeScale: {
        visible: true,
        borderColor: '#ccc',
        // Increase visible points and improve performance
        barSpacing: 2, // Smaller spacing allows more points
        minBarSpacing: 0.25, // Minimum spacing between bars
        rightOffset: 12, // Space on the right
        lockVisibleTimeRangeOnResize: false, // Allow dynamic resizing
        rightBarStaysOnScroll: true, // Keep right edge stable
        fixLeftEdge: false, // Allow left edge to move
        fixRightEdge: false, // Allow right edge to move
        tickMarkFormatter: (time: any) => {
          let dateObj: Date;
          if (typeof time === 'string') {
            dateObj = new Date(time);
          } else if (typeof time === 'number') {
            dateObj = new Date(time * 1000);
          } else if (typeof time === 'object' && time.year && time.month) {
            dateObj = new Date(time.year, time.month - 1, time.day || 1);
          } else {
            return '';
          }
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth();
          const quarter = Math.floor(month / 3) + 1;
          return `Q${quarter}-${year}`;
        },
      },
      crosshair: { mode: 0 },
      // Performance optimizations for larger datasets
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });
    chartRef.current = chart;
    if (onChartReady) onChartReady(chart);

    // Add line series (always on right axis)
    lineSeriesData.forEach(series => {
      const cleanData = sortAndDedup(series.data);
      const line = chart.addSeries(LineSeries, { priceScaleId: 'right', ...series.options });
      line.setData(cleanData);
    });

    // Add histogram series (always on left axis)
    histogramSeriesData.forEach(series => {
      const cleanData = sortAndDedup(series.data);
      const hist = chart.addSeries(HistogramSeries, {
        priceScaleId: 'left',
        priceLineVisible: false,
        lastValueVisible: false,
        ...(series.options || {})
      });
      hist.setData(cleanData);
    });

    // Add histogram hover handler if transactionDetailsMap is provided
    if (transactionDetailsMap && histogramSeriesData.length > 0) {
      setTimeout(() => {
        chart.subscribeCrosshairMove((param) => {
          if (param.time && param.seriesData) {
            let histogramDataFound = false;
            let histogramValue = 0;
            let timeStr = '';
            
            param.seriesData.forEach((data, series) => {
              if (data && series.seriesType() === 'Histogram' && (data as any).value !== undefined) {
                const value = (data as any).value;
                if (value > 0 && !isNaN(value)) {
                  histogramDataFound = true;
                  histogramValue = value;
                  timeStr = typeof param.time === 'string' ? param.time : 
                           (typeof param.time === 'number' ? new Date(param.time * 1000).toISOString().split('T')[0] : '');
                }
              }
            });
            
            if (histogramDataFound && timeStr) {
              const transactions = transactionDetailsMap[timeStr] || [];
              setHistogramInfo({
                time: timeStr,
                value: histogramValue,
                x: param.point?.x || 0,
                y: param.point?.y || 0,
                transactions,
                visible: true,
              });
            } else {
              setHistogramInfo(null);
            }
          } else {
            setHistogramInfo(null);
          }
        });
      }, 100);
    }

    // Apply filter immediately after chart creation
    if (lineData.length > 0 && selectedFilter) {
      const lastDate = toDate(lineData[lineData.length - 1].time);
      let fromDate = new Date(lastDate);
      if (selectedFilter === '5Y') fromDate.setFullYear(lastDate.getFullYear() - 5);
      if (selectedFilter === '3Y') fromDate.setFullYear(lastDate.getFullYear() - 3);
      if (selectedFilter === '2Y') fromDate.setFullYear(lastDate.getFullYear() - 2);
      if (selectedFilter === '1Y') fromDate.setFullYear(lastDate.getFullYear() - 1);
      // Find the closest data point >= fromDate
      const fromIdx = lineData.findIndex(d => toDate(d.time) >= fromDate);
      if (fromIdx !== -1) {
        chart.timeScale().setVisibleRange({
          from: lineData[fromIdx].time,
          to: lineData[lineData.length - 1].time,
        });
      }
    }

    // Prevent detaching from right edge
    let unsubscribe: (() => void) | undefined;
    const data = lineSeriesData[0]?.data || [];
    if (data.length > 0) {
      const handler = (range: any) => {
        if (!range) return;
        const lastBar = data.length - 1;
        if (range.to > lastBar + 0.1) {
          chart.timeScale().scrollToPosition(0, false);
        }
      };
      chart.timeScale().subscribeVisibleLogicalRangeChange(handler);
      unsubscribe = () => chart.timeScale().unsubscribeVisibleLogicalRangeChange(handler);
    }

    return () => {
      chart.remove();
      chartRef.current = null;
      if (unsubscribe) unsubscribe();
    };
  }, [lineSeriesData, histogramSeriesData, height, chartAreaWidth, onChartReady, transactionDetailsMap, selectedFilter, lineData]);

  // Compute dynamic title based on line series dates
  let chartTitle = 'Stock Price';
  if (lineSeriesData.length > 0 && lineSeriesData[0].data && lineSeriesData[0].data.length > 0) {
    const sorted = [...lineSeriesData[0].data].sort((a, b) => {
      let ta: number;
      let tb: number;
      if (typeof a.time === 'string') {
        ta = new Date(a.time).getTime();
      } else if (typeof a.time === 'number') {
        ta = a.time;
      } else if (typeof a.time === 'object' && a.time.year && a.time.month) {
        ta = new Date(a.time.year, a.time.month - 1, a.time.day || 1).getTime();
      } else {
        ta = 0;
      }
      if (typeof b.time === 'string') {
        tb = new Date(b.time).getTime();
      } else if (typeof b.time === 'number') {
        tb = b.time;
      } else if (typeof b.time === 'object' && b.time.year && b.time.month) {
        tb = new Date(b.time.year, b.time.month - 1, b.time.day || 1).getTime();
      } else {
        tb = 0;
      }
      return ta - tb;
    });
    const startDate = sorted[0].time;
    const endDate = sorted[sorted.length - 1].time;
    chartTitle = `Stock Price (${startDate} to ${endDate})`;
  }

  // --- FILTER BUTTONS RENDER ---
  // Style for filter buttons
  const filterButtonStyle = (active: boolean) => ({
    px: 1.5,
    py: 0.5,
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 2,
    border: active ? '2px solid #1976d2' : '1px solid #ccc',
    background: active ? '#e3f0ff' : '#fff',
    color: '#1976d2',
    cursor: 'pointer',
    outline: 'none',
    minWidth: 32,
    ml: 1,
  });

  return (
    <Box ref={outerBoxRef} sx={{ border: '2px solid #1976d2', borderRadius: 2, background: '#fff', width: '100%', mx: 'auto' }}>
      {/* Title and Filters Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'left', width: '100%' }}>
          {chartTitle}
        </Typography>
        {availableFilters.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {availableFilters.map(f => (
              <button
                key={f}
                style={filterButtonStyle(selectedFilter === f)}
                onClick={() => setSelectedFilter(f)}
              >
                {f}
              </button>
            ))}
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', position: 'relative', width: '100%' }}>
        {/* Left Y-axis label */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: labelWidth,
          maxWidth: labelWidth,
          flex: `0 0 ${labelWidth}px`,
          mr: `${labelMargin}px`,
        }}>
          <Typography
            variant="body2"
            sx={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontWeight: 600,
              color: 'text.secondary',
              letterSpacing: 1,
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            Transaction Value ($)
          </Typography>
        </Box>
        {/* Chart */}
        <Box sx={{ flex: '1 1 0', minWidth: 0, position: 'relative', width: chartAreaWidth }}>
          <div ref={chartContainerRef} style={{ width: chartAreaWidth, height }} />
          {histogramInfo && histogramInfo.visible && (
            <Box
                      sx={{
          position: 'absolute',
          right: '0px',
          top: '0px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1000,
                maxWidth: '300px',
                fontSize: '0.75rem',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Transaction - ${histogramInfo.value.toLocaleString()}
              </Typography>
              {(() => {
                // Group transactions by portfolio name
                const groupedTransactions: { [portfolioName: string]: any[] } = {};
                histogramInfo.transactions.forEach(transaction => {
                  const portfolioName = transaction.portfolioName || 'Unknown Portfolio';
                  if (!groupedTransactions[portfolioName]) {
                    groupedTransactions[portfolioName] = [];
                  }
                  groupedTransactions[portfolioName].push(transaction);
                });

                return Object.entries(groupedTransactions).map(([portfolioName, transactions], portfolioIndex) => (
                  <Box key={portfolioIndex} sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.7rem', mb: 0.5 }}>
                      {portfolioName}
                    </Typography>
                    {transactions.map((transaction, index) => (
                      <Box key={index} sx={{ ml: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>
                          {transaction.stockSymbol} - {transaction.type.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                          {transaction.quantity} shares @ ${transaction.price} = ${transaction.value.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ));
              })()}
            </Box>
          )}
        </Box>
        {/* Right Y-axis label */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: labelWidth,
          maxWidth: labelWidth,
          flex: `0 0 ${labelWidth}px`,
          ml: `${labelMargin}px`,
        }}>
          <Typography
            variant="body2"
            sx={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontWeight: 600,
              color: 'text.secondary',
              letterSpacing: 1,
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            Stock Price ($)
          </Typography>
        </Box>
      </Box>
      
      {/* X-Axis Label */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 1, // Small margin top
        height: 20, // Fixed height for X-axis label
      }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            letterSpacing: 1,
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          Time Scale
        </Typography>
      </Box>
    </Box>
  );
};

export default ReusableChartWidget; 
