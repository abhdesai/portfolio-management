import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Add,
  Delete,
  ExpandMore as MuiExpandMore
} from '@mui/icons-material';
import TransactionTable from './TransactionTable';

interface PortfolioAccordionProps {
  portfolios: any[];
  expandedPortfolios: Set<string>;
  loadedPortfolios: Set<string>;
  portfolioSortFields: {[portfolioId: string]: string};
  portfolioSortOrders: {[portfolioId: string]: 'asc' | 'desc'};
  onExpand: (portfolioId: string, isExpanded: boolean) => void;
  onAddTransaction: (portfolio: any) => void;
  onDeletePortfolio: (portfolio: any) => void;
  onEditTransaction: (transaction: any, portfolio: any) => void;
  onDeleteTransaction: (transaction: any) => void;
  onTickerClick: (ticker: string, transaction: any) => void;
  onSort: (portfolioId: string, field: string) => void;
  getPortfolioMetrics: (portfolio: any) => any;
  getSortedTransactions: (portfolio: any) => any[];
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  visibleRange: { start: number; end: number };
  sortedPortfoliosLength: number;
}

const PortfolioAccordion: React.FC<PortfolioAccordionProps> = ({
  portfolios,
  expandedPortfolios,
  loadedPortfolios,
  portfolioSortFields,
  portfolioSortOrders,
  onExpand,
  onAddTransaction,
  onDeletePortfolio,
  onEditTransaction,
  onDeleteTransaction,
  onTickerClick,
  onSort,
  getPortfolioMetrics,
  getSortedTransactions,
  loadMoreRef,
  visibleRange,
  sortedPortfoliosLength
}) => {
  return (
    <Box>
      {portfolios.map((portfolio) => {
        const portfolioId = String(portfolio.id);
        const isExpanded = expandedPortfolios.has(portfolioId);
        const isLoaded = loadedPortfolios.has(portfolioId);
        const metrics = getPortfolioMetrics(portfolio);
        
        return (
          <Accordion 
            key={portfolio.id} 
            sx={{ 
              mb: 2,
              '&.Mui-expanded': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderLeft: '4px solid #1976d2'
              }
            }}
            expanded={isExpanded}
            onChange={(event, isExpanded) => {
              onExpand(portfolioId, isExpanded);
            }}
          >
            <AccordionSummary 
              sx={{ 
                minHeight: '48px !important',
                px: 2,
                py: 0.5,
                '& .MuiAccordionSummary-content': {
                  margin: '4px 0 !important',
                  alignItems: 'center',
                  minHeight: '32px',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.2 }}>
                      {portfolio.name}
                    </Typography>
                    <Tooltip title={portfolio.description || ''} arrow>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: 'text.secondary', 
                          fontStyle: 'italic', 
                          fontSize: 13, 
                          maxWidth: 180, 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis' 
                        }}
                      >
                        {(portfolio.description || '').length > 25 ? 
                          (portfolio.description || '').slice(0, 25) + '...' : 
                          (portfolio.description || '')}
                      </Typography>
                    </Tooltip>
                  </Box>
                  {/* Portfolio Metrics */}
                  <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="success.main" sx={{ minWidth: 120 }}>
                      Buy Cost: {metrics.invested.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                    <Typography variant="caption" color="info.main" sx={{ minWidth: 120 }}>
                      Sell Cost: {metrics.realized.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                    <Typography variant="caption" color={metrics.netValue >= 0 ? 'success.main' : 'error.main'} sx={{ minWidth: 120 }}>
                      Net Cost: {metrics.netValue.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Tooltip title="Delete Portfolio">
                    <IconButton
                      color="error"
                      size="small"
                      component="span"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePortfolio(portfolio);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Transaction">
                    <IconButton
                      color="primary"
                      size="small"
                      component="span"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddTransaction(portfolio);
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="small"
                    component="span"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExpand(portfolioId, !isExpanded);
                    }}
                    sx={{ 
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <MuiExpandMore />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0.5 }}>
              {!isExpanded ? null : !isLoaded ? (
                <Box sx={{ width: '100%', pl: 1, mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 0 }}>
                    Loading transactions...
                  </Typography>
                </Box>
              ) : (
                <TransactionTable
                  transactions={getSortedTransactions(portfolio)}
                  portfolioId={portfolioId}
                  sortField={portfolioSortFields[portfolioId] || 'date'}
                  sortOrder={portfolioSortOrders[portfolioId] || 'desc'}
                  onSort={onSort}
                  onEdit={onEditTransaction}
                  onDelete={onDeleteTransaction}
                  onTickerClick={onTickerClick}
                  portfolio={portfolio}
                />
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
      
      {/* Load more trigger */}
      {visibleRange.end < sortedPortfoliosLength && (
        <Box ref={loadMoreRef} sx={{ height: 20, my: 2, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  );
};

export default PortfolioAccordion; 