import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box,
  CircularProgress
} from '@mui/material';

const LOADING_MESSAGES = [
  "Looking at trends in your appointments",
  "Analyzing the types of patients who have booked with you",
  "Looking at trends"
];

const MESSAGE_DURATION = 1800; // 1.5 seconds per message

function LoadingScreen() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Handle message changes
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => {
        if (prev < LOADING_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, MESSAGE_DURATION);

    // Handle navigation to results
    const navigationTimer = setTimeout(() => {
      navigate('/results');
    }, MESSAGE_DURATION * LOADING_MESSAGES.length);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4
        }}
      >
        <CircularProgress 
          size={60} 
          sx={{ 
            color: 'brand.main',
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            textAlign: 'center',
            transition: 'opacity 0.3s ease-in-out',
            opacity: 1
          }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </Typography>
      </Box>
    </Container>
  );
}

export default LoadingScreen; 