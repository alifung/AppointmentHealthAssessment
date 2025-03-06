import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Paper,
  Stack,
  Divider,
  Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const HEALTH_STATES = ['Poor', 'Good', 'Healthy'];

function getRandomPercentage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHealthState() {
  return HEALTH_STATES[Math.floor(Math.random() * HEALTH_STATES.length)];
}

const SUGGESTIONS_CONFIG = {
  Poor: {
    title: "Oh no... your appointments haven't been going too well",
    subtitle: "Don't worry, here's what you can do:",
    percentRange: { min: 10, max: 70 },
    suggestions: {
      'Refine your patient preferences': {
        metric: 'patient match',
      },
      'Change your appointment preferences': {
        metric: 'appointment quality',
      },
      'Update your insurances': {
        metric: 'insurance coverage',
      },
      'Send more appointment reminders': {
        metric: 'appointment attendance',
      },
    }
  },
  Good: {
    title: "You're doing well, but there's room for improvement",
    subtitle: "Here are some ways to boost your performance:",
    percentRange: { min: 10, max: 15 },
    suggestions: {
      'Fine-tune your availability': {
        metric: 'number of new patients',
      },
      'Optimize your availability': {
        metric: 'booking rate',
      },
      'Change your appointment preferences': {
        metric: 'appointment quality',
      },
      'Update your insurances': {
        metric: 'insurance coverage',
      },
      'Send more appointment reminders': {
        metric: 'appointment attendance',
      },
      'Update your practice information': {
        metric: 'profile views',
      },
    }
  },
  Healthy: {
    title: "Great job! Your practice is doing better than similar practices in your area",
    subtitle: "Here are some ways to grow even further:",
    percentRange: { min: 5, max: 10 },
    suggestions: {
      'Enroll in Sponsored Results': {
        metric: 'patients reached',
      },
      'Let patients book free appointments through your website': {
        metric: 'conversion rate',
      },
      'Change your appointment preferences': {
        metric: 'number of appointments',
      },
      'Collect more forms upfront': {
        metric: 'the patients you can see',
      },
      'Update your insurances': {
        metric: 'insurance coverage',
      },
    }
  }
};

function HealthIndicator({ healthState }) {
  const caretPosition = {
    Poor: '15%',
    Good: '50%',
    Healthy: '85%',
  }[healthState];

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 60, mb: 3 }}>
      {/* Indicator bar */}
      <Box sx={{ 
        display: 'flex', 
        height: '8px', 
        borderRadius: '4px',
        overflow: 'hidden',
        mt: 4
      }}>
        <Box sx={{ flex: 1, bgcolor: '#FF4D4F' }} />
        <Box sx={{ flex: 1, bgcolor: '#FFC53D' }} />
        <Box sx={{ flex: 1, bgcolor: '#52C41A' }} />
      </Box>
      
      {/* Caret */}
      <Box
        sx={{
          position: 'absolute',
          left: caretPosition,
          top: '28px',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '8px solid #333333',
        }}
      />
      
      {/* Labels */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        mt: 2,
        px: 1
      }}>
        <Typography variant="caption" color="charcoal.main">Poor</Typography>
        <Typography variant="caption" color="charcoal.main">Good</Typography>
        <Typography variant="caption" color="charcoal.main">Healthy</Typography>
      </Box>
    </Box>
  );
}

function ResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const { insuranceImpact, insurancePercentage, appointmentImpact, appointmentPercentage } = location.state || {};
  const healthState = React.useMemo(() => getRandomHealthState(), []);
  const currentConfig = SUGGESTIONS_CONFIG[healthState];

  // Determine which section is active based on the progress
  const [section, setSection] = useState('insurances'); // Default to first section

  // You can add logic to determine the active section based on completion status
  useEffect(() => {
    // Example logic - update this based on your actual progress tracking
    if (location.state?.completedInsurances && location.state?.completedAppointments) {
      setSection('complete');
    } else if (location.state?.completedInsurances) {
      setSection('appointments');
    } else {
      setSection('insurances');
    }
  }, [location.state]);

  // Show toast when navigating from save actions
  useEffect(() => {
    const from = location.state?.from;
    if (from === 'insurance-save' || from === 'appointment-save') {
      setShowToast(true);
    }
  }, [location]);

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const suggestions = React.useMemo(() => {
    const allSuggestions = Object.entries(currentConfig.suggestions);
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    return selected.map(([text, config]) => ({
      text,
      percentage: getRandomPercentage(currentConfig.percentRange.min, currentConfig.percentRange.max),
      ...config
    }));
  }, [currentConfig]);

  const handleSuggestionClick = (suggestion) => {
    switch (suggestion.text) {
      case 'Change your appointment preferences':
        navigate('/appointment-preferences', {
          state: { 
            impactMetric: suggestion.metric,
            impactPercentage: suggestion.percentage 
          }
        });
        break;
      case 'Update your insurances':
        navigate('/insurance-update', {
          state: { 
            impactMetric: suggestion.metric,
            impactPercentage: suggestion.percentage 
          }
        });
        break;
      default:
        // For now, other suggestions don't have dedicated pages
        break;
    }
  };

  const handleBackToStart = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          py: 5  // 40px top and bottom padding
        }}
      >
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {currentConfig.title}
          </Typography>

          <Box sx={{ position: 'relative', mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                height: 4
              }}
            >
              <Box sx={{ flex: 1, bgcolor: '#FF4D4F', opacity: healthState === 'Poor' ? 1 : 0.3 }} />
              <Box sx={{ flex: 1, bgcolor: '#FFC53D', opacity: healthState === 'Good' ? 1 : 0.3 }} />
              <Box sx={{ flex: 1, bgcolor: '#52C41A', opacity: healthState === 'Healthy' ? 1 : 0.3 }} />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            {currentConfig.subtitle}
          </Typography>

          <Stack spacing={2}>
            {suggestions.map((suggestion, index) => (
              <Paper
                key={index}
                elevation={0}
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  py: 3,
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  border: '1px solid',
                  borderColor: 'stroke.default',
                  '&:hover': {
                    backgroundColor: 'greige.main'
                  }
                }}
              >
                <Box sx={{ flex: 1, px: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    {suggestion.text}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'charcoal.main',
                      backgroundColor: 'rgba(82, 196, 26, 0.1)',
                      borderRadius: '4px',
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    <ArrowUpwardIcon sx={{ fontSize: 16, color: '#52C41A' }} />
                    <Typography variant="body2">
                      Increase your {suggestion.metric} by {suggestion.percentage}%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ pr: 3 }}>
                  <ChevronRightIcon sx={{ color: 'charcoal.main', mt: 1 }} />
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>

        <Button 
          variant="primary"
          startIcon={<RestartAltIcon />}
          onClick={handleBackToStart}
          sx={{ mt: 4 }}
        >
          Run assessment again
        </Button>

        <Snackbar
          open={showToast}
          autoHideDuration={3000}
          onClose={() => setShowToast(false)}
          message="Changes saved"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              bgcolor: 'rgba(51, 51, 51, 0.88)',
              color: 'white',
              borderRadius: '4px'
            }
          }}
        />
      </Box>
    </Container>
  );
}

export default ResultsScreen; 