import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface NewsListProps {
  news: any[];
  initialCount: number;
}

const NewsList: React.FC<NewsListProps> = ({ news, initialCount }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Ensure news is an array and handle null/undefined
  const safeNews = Array.isArray(news) ? news : [];
  
  if (safeNews.length === 0) {
    return <Typography variant="body2" color="text.secondary">No news found.</Typography>;
  }
  
  const toShow = showAll ? safeNews : safeNews.slice(0, initialCount);
  
  return (
    <Box component="ul" sx={{ pl: 2, m: 0, listStyle: 'none' }}>
      {toShow.map((n, i) => (
        <Box key={i} sx={{ mb: 2, p: 0 }}>
          <a 
            href={typeof n.link === 'string' ? n.link : undefined} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.dark', mb: 0.5 }}>
              {typeof n.title === 'string' ? n.title : ''}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              {typeof n.publisher === 'string' ? n.publisher : ''} {n.pubDate ? `• ${new Date(n.pubDate).toLocaleString()}` : ''}
            </Typography>
          </a>
        </Box>
      ))}
      {safeNews.length > initialCount && (
        <Button size="small" sx={{ ml: 1, mt: 0.5 }} onClick={() => setShowAll(e => !e)}>
          {showAll ? 'Show Less' : 'More'}
        </Button>
      )}
    </Box>
  );
};

export default NewsList; 