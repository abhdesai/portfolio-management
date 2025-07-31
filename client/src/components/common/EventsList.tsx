import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface EventsListProps {
  events: any;
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Ensure events has the expected structure
  const safeEvents = events && events.events && Array.isArray(events.events) ? events.events : [];
  
  if (safeEvents.length === 0) {
    return <Typography variant="body2" color="text.secondary">No events found.</Typography>;
  }
  
  const allEvents = safeEvents.map((event: any) => ({
    type: event.type,
    date: new Date(event.date),
    label: event.label
  }));
  
  const toShow = showAll ? allEvents : allEvents.slice(0, 5);
  
  return (
    <Box>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {toShow.map((e: { type: string, date: Date, label: string }, i: number) => (
          <li key={i}>
            <strong>{e.type}:</strong> {new Date(e.date).toLocaleDateString()} - {e.label}
          </li>
        ))}
      </ul>
      {allEvents.length > 5 && (
        <Button size="small" sx={{ ml: 1, mt: 0.5 }} onClick={() => setShowAll(v => !v)}>
          {showAll ? 'Show Less' : 'More'}
        </Button>
      )}
      {allEvents.length === 0 && (
        <Typography variant="body2" color="text.secondary">No upcoming events found.</Typography>
      )}
    </Box>
  );
};

export default EventsList; 