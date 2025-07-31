import React from 'react';
import { Box, Typography } from '@mui/material';
import PortfolioImportSection from './PortfolioImportSection';

const AdministrationUser = () => {
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
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#2962FF' }}>
          Portfolio File Upload
        </Typography>
        <PortfolioImportSection />
      </Box>
    </Box>
  );
};

export default AdministrationUser; 