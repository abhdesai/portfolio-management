import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Skeleton
} from '@mui/material';
import ReusableChartWidget from '../ReusableChartWidget';
import apiCall from '../../utils/api';

interface PortfolioPerformanceChartProps {
  portfolioData: any[];
  loading: boolean;
}

const PortfolioPerformanceChart: React.FC<PortfolioPerformanceChartProps> = ({
  portfolioData,
  loading
}) => {
  const [historicalPrices, setHistoricalPrices] = useState<{ [ticker: string]: { [date: string]: number } }>({});
  const [historicalLoading, setHistoricalLoading] = useState(false);

  // Find the earliest transaction date across all portfolios
  const earliestTransactionDate = useMemo(() => {
    if (!portfolioData.length) return new Date();
    
    // Collect all transactions from all portfolios
    const allTransactions: any[] = [];
    portfolioData.forEach(portfolio => {
      if (portfolio.transactions && portfolio.transactions.length > 0) {
        portfolio.transactions.forEach((tx: any) => {
          allTransactions.push({
            ...tx,
            date: new Date(tx.date)
          });
        });
      }
    });
    
    // Sort all transactions by date (earliest first)
    allTransactions.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Get the earliest transaction date
    const earliestDate = allTransactions.length > 0 ? allTransactions[0].date : new Date();
    
    // Debug: Log the earliest transaction details
    console.log('🔍 Portfolio Performance Chart Debug:');
    console.log('📊 Total portfolios:', portfolioData.length);
    console.log('📈 Total transactions:', allTransactions.length);
    console.log('📅 Earliest transaction date:', earliestDate.toLocaleDateString());
    console.log('📅 Earliest transaction details:', {
      ...allTransactions[0],
      date: allTransactions[0]?.date?.toLocaleDateString()
    });
    
    // Print the value of the first transaction
    if (allTransactions.length > 0) {
      const firstTx = allTransactions[0];
      const txValue = firstTx.quantity * firstTx.price;
      console.log('💰 First Transaction Value:');
      console.log('   Ticker:', firstTx.stockSymbol);
      console.log('   Type:', firstTx.type);
      console.log('   Quantity:', firstTx.quantity);
      console.log('   Price:', firstTx.price?.toLocaleString());
      console.log('   Total Value:', txValue?.toLocaleString());
    }
    
    // Debug: Show first 10 transaction dates to verify chronological order
    console.log('📅 First 10 Transaction Dates:');
    allTransactions.slice(0, 10).forEach((tx, index) => {
      console.log(`   ${index + 1}. ${tx.stockSymbol} - ${new Date(tx.date).toLocaleDateString()} - ${tx.type} ${tx.quantity} @ $${tx.price}`);
    });
    
    // Start 6 months before the earliest transaction
    const startDate = new Date(earliestDate);
    startDate.setMonth(startDate.getMonth() - 6);
    
    console.log('📅 Chart start date (6 months before):', startDate.toLocaleDateString());
    
    return startDate;
  }, [portfolioData]);

  // Calculate Net Cost line (total cost at each point in time)
  const calculateNetCostData = useMemo(() => {
    if (loading || !portfolioData.length) return [];
    
    const endDate = new Date();
    const startDate = earliestTransactionDate;
    
    // Calculate the actual start date based on time range
    const selectedDays = 3650; // 10 years for ALL
    const dynamicStartDate = new Date(endDate);
    dynamicStartDate.setDate(endDate.getDate() - selectedDays);
    
    // Always use the earliest transaction date as the starting point
    const actualStartDate = startDate;
    const daysDiff = Math.ceil((endDate.getTime() - actualStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    console.log('📊 Net Cost Calculation Debug:');
    console.log('📅 Time Range:', 'ALL');
    console.log('📅 Selected Days:', selectedDays);
    console.log('📅 Dynamic Start Date:', dynamicStartDate.toLocaleDateString());
    console.log('📅 Earliest Transaction Date:', startDate.toLocaleDateString());
    console.log('📅 Actual Start Date:', actualStartDate.toLocaleDateString());
    console.log('📅 End Date:', endDate.toLocaleDateString());
    console.log('📈 Days to calculate:', daysDiff);
    console.log('🔍 Which start date is being used?', 'Earliest Transaction (Fixed)');
    
    const data = [];
    
    // No data sampling - show all data points
    console.log('📊 No data sampling - showing all data points');
    console.log('📈 Total days:', daysDiff);
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(actualStartDate);
      date.setDate(actualStartDate.getDate() + i);
      
      // Calculate total net cost at this specific date
      let totalNetCostAtDate = 0;
      
      portfolioData.forEach(portfolio => {
        portfolio.transactions.forEach((tx: any) => {
          const txDate = new Date(tx.date);
          if (txDate <= date) {
            const sign = tx.type === 'buy' ? 1 : -1;
            totalNetCostAtDate += sign * tx.quantity * tx.price;
          }
        });
      });
      
      data.push({
        time: date.toISOString().split('T')[0],
        value: Math.round(totalNetCostAtDate)
      });
    }
    
    // Debug: Log the final net cost data
    if (data.length > 0) {
      console.log('📊 Net Cost Data Debug:');
      console.log('📈 Data points:', data.length);
      console.log('📅 First date:', new Date(data[0]?.time).toLocaleDateString());
      console.log('💰 First value:', data[0]?.value?.toLocaleString());
      console.log('📅 Last date:', new Date(data[data.length - 1]?.time).toLocaleDateString());
      console.log('💰 Last value:', data[data.length - 1]?.value?.toLocaleString());
    }
    
    return data;
  }, [portfolioData, loading, earliestTransactionDate]);

  // Calculate Live Value line (portfolio value at each point in time)
  const calculateLiveValueData = useMemo(() => {
    if (loading || !portfolioData.length || historicalLoading) return [];
    
    const endDate = new Date();
    const startDate = earliestTransactionDate;
    
    // Calculate the actual start date based on time range
    const selectedDays = 3650; // 10 years for ALL
    const dynamicStartDate = new Date(endDate);
    dynamicStartDate.setDate(endDate.getDate() - selectedDays);
    
    // Always use the earliest transaction date as the starting point
    const actualStartDate = startDate;
    const daysDiff = Math.ceil((endDate.getTime() - actualStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    console.log('📊 Live Value Calculation Debug:');
    console.log('📅 Time Range:', 'ALL');
    console.log('📅 Selected Days:', selectedDays);
    console.log('📅 Dynamic Start Date:', dynamicStartDate.toLocaleDateString());
    console.log('📅 Earliest Transaction Date:', startDate.toLocaleDateString());
    console.log('📅 Actual Start Date:', actualStartDate.toLocaleDateString());
    console.log('📅 End Date:', endDate.toLocaleDateString());
    console.log('📈 Days to calculate:', daysDiff);
    console.log('🔍 Which start date is being used?', 'Earliest Transaction (Fixed)');
    console.log('📊 Historical prices available for tickers:', Object.keys(historicalPrices));
    
    const data = [];
    
    // No data sampling - show all data points
    console.log('📊 No data sampling - showing all data points');
    console.log('📈 Total days:', daysDiff);
    
    // Get all unique tickers from all portfolios
    const allTickers = new Set<string>();
    portfolioData.forEach(portfolio => {
      portfolio.transactions.forEach((tx: any) => {
        allTickers.add(tx.stockSymbol);
      });
    });
    
    console.log('📊 All unique tickers:', Array.from(allTickers));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(actualStartDate);
      date.setDate(actualStartDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // Calculate holdings at this specific date
      const holdingsAtDate: { [key: string]: number } = {};
      
      portfolioData.forEach(portfolio => {
        portfolio.transactions.forEach((tx: any) => {
          const txDate = new Date(tx.date);
          if (txDate <= date) {
            const ticker = tx.stockSymbol;
            if (!holdingsAtDate[ticker]) {
              holdingsAtDate[ticker] = 0;
            }
            const sign = tx.type === 'buy' ? 1 : -1;
            holdingsAtDate[ticker] += sign * tx.quantity;
          }
        });
      });
      
      // Calculate live value at this date using historical prices
      let liveValueAtDate = 0;
      Object.keys(holdingsAtDate).forEach(ticker => {
        const quantity = holdingsAtDate[ticker];
        if (quantity > 0) {
          // Use historical price for this specific date
          let priceForDate = historicalPrices[ticker]?.[dateString];
          
          // If no price for this exact date, find the nearest available price
          if (!priceForDate || priceForDate <= 0) {
            const tickerPrices = historicalPrices[ticker];
            if (tickerPrices) {
              // Find the closest available price (before or after this date)
              const availableDates = Object.keys(tickerPrices).sort();
              const currentDateIndex = availableDates.findIndex(d => d >= dateString);
              
              if (currentDateIndex >= 0) {
                // Use the next available price
                priceForDate = tickerPrices[availableDates[currentDateIndex]];
              } else if (availableDates.length > 0) {
                // Use the last available price
                priceForDate = tickerPrices[availableDates[availableDates.length - 1]];
              }
            }
          }
          
          // If still no historical price, fallback to current price
          if (!priceForDate || priceForDate <= 0) {
            portfolioData.forEach(portfolio => {
              if (portfolio.tickers && portfolio.tickers[ticker] && portfolio.tickers[ticker].price) {
                priceForDate = portfolio.tickers[ticker].price;
              }
            });
          }
          
          if (priceForDate && priceForDate > 0) {
            liveValueAtDate += quantity * priceForDate;
          } else {
            console.log(`⚠️ No price found for ${ticker} on ${dateString}`);
          }
        }
      });
      
      data.push({
        time: dateString,
        value: Math.round(liveValueAtDate)
      });
      
      // Debug: Show sample calculations for first few dates and last few dates
      if (i < 5 || i > daysDiff - 5) {
        console.log(`📅 ${dateString}: Live Value = $${liveValueAtDate.toLocaleString()}`);
        Object.keys(holdingsAtDate).forEach(ticker => {
          const quantity = holdingsAtDate[ticker];
          if (quantity > 0) {
            const price = historicalPrices[ticker]?.[dateString] || 'No price';
            console.log(`  📊 ${ticker}: ${quantity} shares @ $${price}`);
          }
        });
      }
    }
    
    // Debug: Log the final live value data
    if (data.length > 0) {
      console.log('📊 Live Value Data Debug:');
      console.log('📈 Data points:', data.length);
      console.log('📅 First date:', new Date(data[0]?.time).toLocaleDateString());
      console.log('💰 First value:', data[0]?.value?.toLocaleString());
      console.log('📅 Last date:', new Date(data[data.length - 1]?.time).toLocaleDateString());
      console.log('💰 Last value:', data[data.length - 1]?.value?.toLocaleString());
    }
    
    return data;
  }, [portfolioData, loading, earliestTransactionDate, historicalPrices, historicalLoading]);

  // Calculate transaction histogram data
  const calculateTransactionHistogram = useMemo(() => {
    if (loading || !portfolioData.length) {
      return {
        histogramData: [],
        transactionDetailsMap: {}
      };
    }
    
    const transactionMap: { [date: string]: { value: number; transactions: any[] } } = {};
    
    // Collect all transactions and group by date
    portfolioData.forEach(portfolio => {
      portfolio.transactions.forEach((tx: any) => {
        const txDate = new Date(tx.date).toISOString().split('T')[0];
        const txValue = Math.abs(tx.quantity * tx.price); // Use absolute value for histogram
        
        if (!transactionMap[txDate]) {
          transactionMap[txDate] = { value: 0, transactions: [] };
        }
        transactionMap[txDate].value += txValue;
        transactionMap[txDate].transactions.push({
          stockSymbol: tx.stockSymbol,
          type: tx.type,
          quantity: tx.quantity,
          price: tx.price,
          value: txValue,
          portfolioName: portfolio.name
        });
      });
    });
    
    // Convert to histogram data format (compatible with chart library)
    const histogramData = Object.entries(transactionMap).map(([date, data]) => ({
      time: date,
      value: Math.round(data.value)
    }));
    
    // Store transaction details separately for hover display
    const transactionDetailsMap = Object.entries(transactionMap).reduce((acc, [date, data]) => {
      acc[date] = data.transactions;
      return acc;
    }, {} as { [date: string]: any[] });
    
    console.log('📊 Transaction Histogram Debug:');
    console.log('📈 Total transaction dates:', histogramData.length);
    console.log('💰 Total transaction value:', histogramData.reduce((sum, item) => sum + item.value, 0).toLocaleString());
    console.log('📊 Transaction details map keys:', Object.keys(transactionDetailsMap));
    
    return { histogramData, transactionDetailsMap };
  }, [portfolioData, loading]);

  // Fetch historical prices for all tickers
  useEffect(() => {
    if (!portfolioData.length || loading) return;
    
    const fetchHistoricalPrices = async () => {
      setHistoricalLoading(true);
      
      // Get all unique tickers and their transaction date ranges
      const tickerRanges: { [ticker: string]: { firstTx: Date, lastTx: Date } } = {};
      
      portfolioData.forEach(portfolio => {
        portfolio.transactions.forEach((tx: any) => {
          const ticker = tx.stockSymbol;
          const txDate = new Date(tx.date);
          
          if (!tickerRanges[ticker]) {
            tickerRanges[ticker] = { firstTx: txDate, lastTx: txDate };
          } else {
            if (txDate < tickerRanges[ticker].firstTx) {
              tickerRanges[ticker].firstTx = txDate;
            }
            if (txDate > tickerRanges[ticker].lastTx) {
              tickerRanges[ticker].lastTx = txDate;
            }
          }
        });
      });
      
      // Prepare ticker objects with individual date ranges
      const tickerRequests = Object.keys(tickerRanges).map(ticker => {
        const range = tickerRanges[ticker];
        const startDate = new Date(range.firstTx);
        startDate.setMonth(startDate.getMonth() - 6); // 6 months before first transaction
        
        const endDate = new Date(); // Today
        
        return {
          symbol: ticker,
          period1: Math.floor(startDate.getTime() / 1000),
          period2: Math.floor(endDate.getTime() / 1000),
          interval: '1d'
        };
      });
      
      console.log('📊 Fetching historical prices for tickers with individual ranges:', tickerRequests);
      
      try {
        // Use the new flexible batch endpoint
        const response = await apiCall('/api/ticker/batch/chart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            tickers: tickerRequests
          }
        });
        
        if (response.data && !response.error) {
          const newHistoricalPrices: { [ticker: string]: { [date: string]: number } } = {};
          
          Object.keys(response.data).forEach(ticker => {
            const tickerData = response.data[ticker];
            if (tickerData.quotes && !tickerData.error) {
              const priceMap: { [date: string]: number } = {};
              tickerData.quotes.forEach((quote: any) => {
                const date = new Date(quote.date).toISOString().split('T')[0];
                priceMap[date] = quote.close;
              });
              newHistoricalPrices[ticker] = priceMap;
              console.log(`✅ Fetched ${Object.keys(priceMap).length} historical prices for ${ticker}`);
            } else {
              console.log(`❌ Failed to fetch historical data for ${ticker}:`, tickerData.error);
            }
          });
          
          setHistoricalPrices(newHistoricalPrices);
          
          // Debug: Show sample of historical data
          Object.keys(newHistoricalPrices).forEach(ticker => {
            const prices = newHistoricalPrices[ticker];
            const dates = Object.keys(prices).sort();
            console.log(`📊 ${ticker}: ${dates.length} prices from ${dates[0]} to ${dates[dates.length - 1]}`);
            console.log(`💰 ${ticker} price range: $${Math.min(...Object.values(prices)).toFixed(2)} to $${Math.max(...Object.values(prices)).toFixed(2)}`);
          });
        } else {
          console.log('❌ Batch request failed:', response.error);
        }
      } catch (error) {
        console.log('❌ Error in batch request:', error);
      }
      
      setHistoricalLoading(false);
      console.log('📊 Historical prices fetched for tickers:', Object.keys(historicalPrices));
    };
    
    fetchHistoricalPrices();
  }, [portfolioData, loading, earliestTransactionDate]);

  // Prepare chart data - Only Net Cost and Live Value
  const chartData = useMemo(() => {
    const series = [
      {
        data: calculateNetCostData,
        options: { 
          color: '#FF6B6B', // Red for Net Cost
          lineWidth: 2,
          lastValueVisible: true,
          priceLineVisible: false
        }
      },
      {
        data: calculateLiveValueData,
        options: { 
          color: '#2962FF', // Blue for Live Value
          lineWidth: 2,
          lastValueVisible: true,
          priceLineVisible: false
        }
      }
    ];
    
    // Debug: Log the chart data being passed to ReusableChartWidget
    console.log('📊 Chart Data for ReusableChartWidget:');
    console.log('📈 Net Cost data points:', calculateNetCostData.length);
    console.log('📈 Live Value data points:', calculateLiveValueData.length);
    console.log('📈 Transaction histogram data points:', calculateTransactionHistogram.histogramData?.length || 0);
    console.log('📅 Net Cost date range:', calculateNetCostData.length > 0 ? 
      `${new Date(calculateNetCostData[0]?.time).toLocaleDateString()} to ${new Date(calculateNetCostData[calculateNetCostData.length - 1]?.time).toLocaleDateString()}` : 'No data');
    console.log('📅 Live Value date range:', calculateLiveValueData.length > 0 ? 
      `${new Date(calculateLiveValueData[0]?.time).toLocaleDateString()} to ${new Date(calculateLiveValueData[calculateLiveValueData.length - 1]?.time).toLocaleDateString()}` : 'No data');
    
    return series;
  }, [calculateNetCostData, calculateLiveValueData, calculateTransactionHistogram]);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="rectangular" width="100%" height={350} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Portfolio Cost vs Live Value
          </Typography>
        </Box>
        
        {/* Chart Legend */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 2, backgroundColor: '#FF6B6B' }} />
            <Typography variant="body2">Net Cost</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 2, backgroundColor: '#2962FF' }} />
            <Typography variant="body2">Live Value</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 8, backgroundColor: '#4CAF50', borderRadius: '2px' }} />
            <Typography variant="body2">Transactions</Typography>
          </Box>
        </Box>
        
        <ReusableChartWidget
          lineSeriesData={chartData}
          histogramSeriesData={[{
            data: calculateTransactionHistogram.histogramData || [],
            options: {
              color: '#4CAF50', // Green for transactions
              priceScaleId: 'left', // Use left axis for histogram
              priceLineVisible: false,
              lastValueVisible: false
            }
          }]}
          transactionDetailsMap={calculateTransactionHistogram.transactionDetailsMap}
          width={1200}
          height={350}
          defaultFilter="1Y"
          enableScrolling={true}
        />
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformanceChart;