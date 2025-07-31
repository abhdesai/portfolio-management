import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { usePortfolioContext } from '../contexts/PortfolioContext';
import { useNotification } from '../contexts/NotificationContext';
import AddTransaction from '../components/AddTransaction';
import { clientError } from '../utils/debug';

// Custom hooks
import { usePortfolioData } from '../hooks/usePortfolioData';
import { usePortfolioStats } from '../hooks/usePortfolioStats';
import { useTickerDrawer } from '../hooks/useTickerDrawer';

// Components
import PortfolioPageStatsCards from '../components/portfolios/PortfolioPageStatsCards';
import PortfolioAccordion from '../components/portfolios/PortfolioAccordion';
import TickerInfoDrawer from '../components/ticker/TickerInfoDrawer';
import { 
  AddPortfolioDialog, 
  DeletePortfolioDialog, 
  DeleteTransactionDialog 
} from '../components/portfolios/PortfolioDialogs';

interface PriceData {
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
}

const Portfolios = () => {
  const { portfolios: allPortfolios, loading } = usePortfolioContext();
  const { showNotification } = useNotification();
  
  // Current prices state
  const [currentPrices, setCurrentPrices] = useState<{[key: string]: PriceData}>({});
  const [pricesLoading, setPricesLoading] = useState(false);

  // Custom hooks
  const portfolioData = usePortfolioData();
  const portfolioStats = usePortfolioStats(allPortfolios, currentPrices);
  const tickerDrawer = useTickerDrawer();

  // Fetch current prices effect
  useEffect(() => {
    if (allPortfolios.length > 0) {
      fetchCurrentPrices(allPortfolios);
    }
  }, [allPortfolios]);

  const fetchCurrentPrices = async (portfolioData: any[]) => {
    setPricesLoading(true);
    try {
      const symbols = new Set<string>();
      portfolioData.forEach(portfolio => {
        portfolio.transactions.forEach((tx: any) => {
          if (tx.type === 'buy') {
            symbols.add(tx.stockSymbol);
          }
        });
      });

      const symbolList = Array.from(symbols);
      if (symbolList.length === 0) {
        setCurrentPrices({} as {[key: string]: PriceData});
        setPricesLoading(false);
        return;
      }

      const response = await fetch(`/api/stock/prices?symbols=${symbolList.join(',')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch prices from backend');
      }
      const prices = await response.json();
      setCurrentPrices(prices);
    } catch (error) {
      clientError('Failed to fetch current prices:', error);
      setCurrentPrices({} as {[key: string]: PriceData});
    } finally {
      setPricesLoading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <Box sx={{ mt: 4, maxWidth: '80vw', width: '100%', mx: 'auto', px: 0 }}>
        {[...Array(4)].map((_, idx) => (
          <Box key={idx} sx={{ mb: 2, p: 2, borderRadius: 2, background: 'rgba(0,0,0,0.03)', minHeight: 80, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2, opacity: 0.4 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={28} sx={{ mb: 1, opacity: 0.5 }} />
              <Skeleton variant="text" width="60%" height={18} sx={{ mb: 1, opacity: 0.3 }} />
              <Skeleton variant="rectangular" width="100%" height={18} sx={{ borderRadius: 1, opacity: 0.2 }} />
            </Box>
            <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1, opacity: 0.2 }} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      padding: '0',
      margin: '0',
      boxSizing: 'border-box'
    }}>
      {/* White box container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: { xs: 1, sm: 2, md: 4 },
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#2962FF' }}>
              Portfolios
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View your portfolios and transactions
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => portfolioData.setAddPortfolioOpen(true)}
            sx={{ 
              backgroundColor: 'primary.main', 
              color: 'white',
              '&:hover': { backgroundColor: 'primary.dark' },
              mt: 2
            }}
          >
            Add Portfolio
          </Button>
        </Box>

        {/* Stats Cards */}
        <PortfolioPageStatsCards 
          stats={portfolioStats} 
          loading={loading || pricesLoading} 
        />
        
        {/* Portfolio Accordion List */}
        <PortfolioAccordion
          portfolios={portfolioData.portfolios}
          expandedPortfolios={portfolioData.expandedPortfolios}
          loadedPortfolios={portfolioData.loadedPortfolios}
          portfolioSortFields={portfolioData.portfolioSortFields}
          portfolioSortOrders={portfolioData.portfolioSortOrders}
          onExpand={portfolioData.handleAccordionExpand}
          onAddTransaction={portfolioData.handleAddTransaction}
          onDeletePortfolio={portfolioData.handleDeletePortfolio}
          onEditTransaction={portfolioData.handleEditTransaction}
          onDeleteTransaction={portfolioData.handleDeleteTransaction}
          onTickerClick={(ticker, transaction) => tickerDrawer.openDrawer(ticker, transaction)}
          onSort={portfolioData.handlePortfolioSortChange}
          getPortfolioMetrics={portfolioData.getPortfolioMetrics}
          getSortedTransactions={portfolioData.getSortedTransactions}
          loadMoreRef={portfolioData.loadMoreRef}
          visibleRange={portfolioData.visibleRange}
          sortedPortfoliosLength={portfolioData.sortedPortfoliosLength}
        />

        {/* Add Transaction Dialog */}
        {portfolioData.selectedPortfolio && (
          <AddTransaction
            open={portfolioData.addTransactionOpen}
            onClose={() => {
              portfolioData.setAddTransactionOpen(false);
              portfolioData.setSelectedPortfolio(null);
            }}
            portfolioId={portfolioData.selectedPortfolio.id}
            portfolioName={portfolioData.selectedPortfolio.name}
            onTransactionAdded={(newTransaction: any) => 
              portfolioData.handleTransactionAdded(portfolioData.selectedPortfolio.id, newTransaction)
            }
          />
        )}

        {/* Edit Transaction Dialog */}
        {portfolioData.transactionToEdit && (
          <AddTransaction
            open={portfolioData.editTransactionOpen}
            onClose={() => {
              portfolioData.setEditTransactionOpen(false);
              portfolioData.setTransactionToEdit(null);
            }}
            portfolioId={portfolioData.transactionToEdit.portfolioId}
            portfolioName={portfolioData.selectedPortfolio?.name || ''}
            onTransactionAdded={(updatedTransaction: any) => 
              portfolioData.handleTransactionEdited(portfolioData.transactionToEdit.portfolioId, updatedTransaction)
            }
            editMode={true}
            transactionToEdit={portfolioData.transactionToEdit}
          />
        )}

        {/* Add Portfolio Dialog */}
        <AddPortfolioDialog
          open={portfolioData.addPortfolioOpen}
          onClose={() => portfolioData.setAddPortfolioOpen(false)}
          portfolioName={portfolioData.newPortfolioName}
          portfolioDescription={portfolioData.newPortfolioDescription}
          error={portfolioData.addPortfolioError}
          onNameChange={portfolioData.setNewPortfolioName}
          onDescriptionChange={portfolioData.setNewPortfolioDescription}
          onAdd={portfolioData.handleAddPortfolio}
          onCancel={() => {
            portfolioData.setAddPortfolioOpen(false);
            portfolioData.setNewPortfolioName('');
            portfolioData.setNewPortfolioDescription('');
            portfolioData.setAddPortfolioError('');
          }}
        />

        {/* Delete Portfolio Dialog */}
        <DeletePortfolioDialog
          open={portfolioData.deletePortfolioOpen}
          onClose={() => portfolioData.setDeletePortfolioOpen(false)}
          portfolio={portfolioData.portfolioToDelete}
          onConfirm={portfolioData.confirmDeletePortfolio}
        />

        {/* Delete Transaction Dialog */}
        <DeleteTransactionDialog
          open={portfolioData.deleteDialogOpen}
          onClose={() => portfolioData.setDeleteDialogOpen(false)}
          transaction={portfolioData.transactionToDelete}
          onConfirm={portfolioData.confirmDeleteTransaction}
        />

        {/* Ticker Info Drawer */}
        <TickerInfoDrawer
          open={tickerDrawer.drawerOpen}
          onClose={tickerDrawer.closeDrawer}
          tickerInfo={tickerDrawer.tickerInfo}
          tickerNews={tickerDrawer.tickerNews}
          tickerEvents={tickerDrawer.tickerEvents}
          drawerTransaction={tickerDrawer.drawerTransaction}
          drawerChartData={tickerDrawer.drawerChartData}
          drawerWidth={tickerDrawer.drawerWidth}
          drawerLoading={tickerDrawer.drawerLoading}
          onResizeMouseDown={tickerDrawer.handleResizeMouseDown}
          minDrawerWidth={tickerDrawer.minDrawerWidth}
          maxDrawerWidth={tickerDrawer.maxDrawerWidth}
        />
      </Box>
    </Box>
  );
};

export default Portfolios; 