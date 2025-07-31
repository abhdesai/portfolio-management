import React, { useEffect, useState } from 'react';
import ReusableChartWidget from './ReusableChartWidget';
import apiCall from '../utils/api';
import { Box, Typography } from '@mui/material';

const CHART_HEIGHT = 400;
const CHART_WIDTH = 700;

interface ChartData {
  time: string;
  value: number;
}

const SimpleLightweightChart: React.FC = () => {
  const [lineData, setLineData] = useState<ChartData[]>([]);
  const [histogramData, setHistogramData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    const period2 = Math.floor(now.getTime() / 1000);
    const period1 = Math.floor(new Date(now.getFullYear() - 25, now.getMonth(), now.getDate()).getTime() / 1000);
    setLoading(true);
    apiCall(`/api/ticker/chart?symbol=CSCO&period1=${period1}&period2=${period2}&interval=1d`).then(res => {
      if (res.data && Array.isArray(res.data.quotes)) {
        // Map and sort data by time, handle duplicates by keeping the last value
        const dataMap = new Map<string, number>();
        res.data.quotes
          .filter((q: any) => q.close != null && q.date)
          .forEach((q: any) => {
            const time = q.date.split('T')[0]; // Extract YYYY-MM-DD
            dataMap.set(time, parseFloat(q.close));
          });
        const chartData = Array.from(dataMap.entries()).map(([time, value]) => ({ time, value }));
        chartData.sort((a, b) => a.time.localeCompare(b.time));
        setLineData(chartData);

        // Generate 5 unique random dates within the last 10 years
        const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()).getTime();
        const today = now.getTime();
        const dateSet = new Set<string>();
        while (dateSet.size < 5) {
          const randomTimestamp = tenYearsAgo + Math.random() * (today - tenYearsAgo);
          const randomDate = new Date(randomTimestamp);
          const formattedDate = randomDate.toISOString().split('T')[0];
          dateSet.add(formattedDate);
        }
        const histogram = Array.from(dateSet).map(date => ({
          time: date,
          value: Math.round(1000 + Math.random() * (6000 - 1000)),
        })).sort((a, b) => a.time.localeCompare(b.time));
        setHistogramData(histogram);
      } else {
        setLineData([]);
        setHistogramData([]);
      }
      setLoading(false);
    }).catch(() => {
      setLineData([]);
      setHistogramData([]);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading chart data...</div>;

  return (
    <Box sx={{ width: '100%', padding: 0, margin: 0, boxSizing: 'border-box' }}>
      <Box
        sx={{
          width: '100%',
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '24px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'left', color: '#2962FF', fontWeight: 700 }}>
            Test Prototype
          </Typography>
          <ReusableChartWidget
            lineSeriesData={[{ data: lineData, options: { color: '#2962FF', lineWidth: 2 } }]}
            histogramSeriesData={[{ data: histogramData, options: { color: '#FF0000' } }]}
            transactionDetailsMap={{}}
            height={CHART_HEIGHT}
            width={CHART_WIDTH}
            defaultFilter="1Y"
            enableScrolling={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SimpleLightweightChart;