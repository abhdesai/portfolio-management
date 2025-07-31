import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ExpandableTextProps {
  text: string;
  maxChars: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxChars }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!text) return null;
  if (text.length <= maxChars) return <Typography variant="body2">{text}</Typography>;
  
  return (
    <>
      <Typography variant="body2" sx={{ display: 'inline' }}>
        {expanded ? text : text.slice(0, maxChars) + '...'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button size="small" sx={{ mt: 0.5 }} onClick={() => setExpanded(e => !e)}>
          {expanded ? 'Show Less' : 'More'}
        </Button>
      </Box>
    </>
  );
};

export default ExpandableText; 