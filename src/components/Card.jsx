import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Card2 = () => {
  const [totalTickets, setTotalTickets] = useState(2024);
  const [pendingTickets, setPendingTickets] = useState(500);
  const [solvedTickets, setSolvedTickets] = useState(1200);
  const [closedTickets, setClosedTickets] = useState(800);

  const cardData = [
    { title: 'TOTAL TICKETS', value: totalTickets, color: 'red', icon: '🎫' },
    { title: 'PENDING TICKETS', value: pendingTickets, color: 'yellow', icon: '⏳' },
    { title: 'SOLVED TICKETS', value: solvedTickets, color: 'green', icon: '✅' },
    { title: 'CLOSED TICKETS', value: closedTickets, color: 'blue', icon: '🔒' },
  ];

  return (
    <Box display="flex" justifyContent="space-around" p={3}>
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </Box>
  );
};

const Card = ({ title, value, color, icon }) => {
  return (
    <Box
      border={1}
      borderRadius={5}
      p={2}
      textAlign="center"
      width={180}
      boxShadow={1}
      position="relative"
    >
      <Typography variant="h5" style={{ color: color }}>
        {icon}
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        {title}
      </Typography>
      <Typography variant="body1">{value}</Typography>
      <Link to={`/tickets/${title.toLowerCase().replace(' ', '-')}`} style={{ position: 'absolute', bottom: 10, right: 10, color: 'blue' }}>
        (View All)
      </Link>
    </Box>
  );
};

export default Card2;
