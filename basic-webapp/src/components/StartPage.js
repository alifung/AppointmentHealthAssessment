import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Paper
} from '@mui/material';

function StartPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/loading');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'left',
          gap: 4
        }}
      >
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            gap: 2,
            width: '100%'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Check your appointment quality with our health assessment
          </Typography>
          <Typography variant="body1" gutterBottom>
            We'll analyze your last few months of appointments and provide you with a health score. Based on your score, we'll recommend a customized list of actions to improve your health.
          </Typography>
          <Button 
            variant="primary"
            onClick={handleStart}
            sx={{ mt: 2 }}
          >
            Get started
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default StartPage; 