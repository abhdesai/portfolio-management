import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Skeleton, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface TimePeriodData {
  label: string;
  value: string | number | { dollarAmount: string; percentage: string };
}

interface FlippableStatsCardProps {
  title: string;
  timePeriods: TimePeriodData[];
  color: string;
  loading: boolean;
  autoFlipInterval?: number; // in milliseconds, default 5000ms
  showNavigation?: boolean; // show left/right arrows
}

const FlippableStatsCard: React.FC<FlippableStatsCardProps> = ({ 
  title, 
  timePeriods, 
  color, 
  loading, 
  autoFlipInterval = 5000,
  showNavigation = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Auto-flip effect
  useEffect(() => {
    if (timePeriods.length <= 1) return;

    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % timePeriods.length);
        setIsFlipping(false);
      }, 150); // Half of the flip animation duration
    }, autoFlipInterval);

    return () => clearInterval(interval);
  }, [timePeriods.length, autoFlipInterval]);

  const handlePrevious = () => {
    if (timePeriods.length <= 1) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + timePeriods.length) % timePeriods.length);
      setIsFlipping(false);
    }, 150);
  };

  const handleNext = () => {
    if (timePeriods.length <= 1) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % timePeriods.length);
      setIsFlipping(false);
    }, 150);
  };

  const currentData = timePeriods[currentIndex];

  const renderValue = (value: string | number | { dollarAmount: string; percentage: string }) => {
    if (typeof value === 'object' && 'dollarAmount' in value) {
      return (
        <>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: color, 
              textAlign: 'center',
              fontSize: '1.25rem',
              lineHeight: 1.2,
              mb: 0.25,
              transition: 'opacity 0.3s ease-in-out',
              opacity: isFlipping ? 0 : 1
            }}
          >
            {value.dollarAmount}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: color, 
              textAlign: 'center',
              fontSize: '0.875rem',
              lineHeight: 1.2,
              transition: 'opacity 0.3s ease-in-out',
              opacity: isFlipping ? 0 : 1
            }}
          >
            {value.percentage}
          </Typography>
        </>
      );
    }

    return (
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          color: color, 
          textAlign: 'center',
          fontSize: '1.25rem',
          lineHeight: 1.2,
          transition: 'opacity 0.3s ease-in-out',
          opacity: isFlipping ? 0 : 1
        }}
      >
        {value}
      </Typography>
    );
  };

  return (
    <Card elevation={1} sx={{ position: 'relative', overflow: 'visible' }}>
      <CardContent sx={{ 
        p: 2, 
        height: 103, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {loading ? (
          <Skeleton variant="text" width="80%" height={32} />
        ) : (
          <>
            {/* Time period indicator - top right corner */}
            {timePeriods.length > 1 && (
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  transition: 'opacity 0.3s ease-in-out',
                  opacity: isFlipping ? 0 : 1,
                  zIndex: 2
                }}
              >
                {currentData.label}
              </Typography>
            )}

            {/* Top section: Value only */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              minHeight: '40px'
            }}>
              {renderValue(currentData.value)}
            </Box>

            {/* Middle section: Progress dots */}
            {timePeriods.length > 1 && (
              <Box sx={{ 
                display: 'flex', 
                gap: 0.5, 
                justifyContent: 'center',
                my: 0.5
              }}>
                {timePeriods.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: index === currentIndex ? color : 'grey.300',
                      transition: 'background-color 0.3s ease-in-out'
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Navigation arrows - positioned absolutely */}
            {showNavigation && timePeriods.length > 1 && (
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: 0, 
                right: 0, 
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 1,
                pointerEvents: 'none',
                zIndex: 1
              }}>
                <IconButton
                  size="small"
                  onClick={handlePrevious}
                  sx={{ 
                    pointerEvents: 'auto',
                    opacity: 0.7,
                    color: 'text.secondary',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { 
                      opacity: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  <ChevronLeft fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleNext}
                  sx={{ 
                    pointerEvents: 'auto',
                    opacity: 0.7,
                    color: 'text.secondary',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { 
                      opacity: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  <ChevronRight fontSize="small" />
                </IconButton>
              </Box>
            )}
          </>
        )}
        
        {/* Bottom section: Title */}
        <Typography sx={{ 
          fontSize: '1.1rem', 
          color: 'text.secondary', 
          textAlign: 'center', 
          fontWeight: 500,
          lineHeight: 1.2,
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0
        }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlippableStatsCard; 