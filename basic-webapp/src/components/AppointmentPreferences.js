import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  FormControl,
  FormControlLabel,
  Checkbox,
  Slider,
  Select,
  MenuItem,
  FormGroup,
  Link,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function AppointmentPreferences() {
  const navigate = useNavigate();
  const location = useLocation();
  const { impactMetric, impactPercentage } = location.state || {};
  const [showToast, setShowToast] = React.useState(false);

  const [settings, setSettings] = React.useState({
    bufferTime: 15,
    maxDailyAppointments: 8,
    allowWeekends: false,
    preferredTimeSlots: ['morning'],
  });

  // Reset scroll position on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (field) => (event) => {
    setSettings(prev => ({
      ...prev,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    }));
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setSettings(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const handleSave = () => {
    navigate('/results', { 
      state: { 
        ...location.state,
        from: 'appointment-save'
      }
    });
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
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              color: 'rgba(51, 51, 51, 0.88)',
              borderColor: 'rgba(51, 51, 51, 0.12)',
              textTransform: 'none',
              alignSelf: 'flex-start',
              mb: 4,
              '&:hover': {
                borderColor: 'rgba(51, 51, 51, 0.24)',
                backgroundColor: 'rgba(51, 51, 51, 0.04)'
              }
            }}
          >
            Back
          </Button>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Update your appointment preferences
              </Typography>
              <Typography variant="body1" paragraph>
                We've found some appointment types that you offer, but aren't listed on your profiles.
              </Typography>
              {impactMetric && impactPercentage && (
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
                    Increase your {impactMetric} by {impactPercentage}%
                  </Typography>
                </Box>
              )}
            </Box>

            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Buffer Time Between Appointments
                </Typography>
                <Slider
                  value={settings.bufferTime}
                  onChange={handleSliderChange('bufferTime')}
                  marks={[
                    { value: 0, label: '0 min' },
                    { value: 15, label: '15 min' },
                    { value: 30, label: '30 min' },
                  ]}
                  step={5}
                  min={0}
                  max={30}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value} min`}
                />
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Maximum Daily Appointments
                </Typography>
                <Slider
                  value={settings.maxDailyAppointments}
                  onChange={handleSliderChange('maxDailyAppointments')}
                  marks={[
                    { value: 4, label: '4' },
                    { value: 8, label: '8' },
                    { value: 12, label: '12' },
                  ]}
                  step={1}
                  min={4}
                  max={12}
                  valueLabelDisplay="auto"
                />
              </Box>

              <FormControl>
                <Typography variant="h6" gutterBottom>
                  Preferred Time Slots
                </Typography>
                <Select
                  multiple
                  value={settings.preferredTimeSlots}
                  onChange={handleChange('preferredTimeSlots')}
                >
                  <MenuItem value="morning">Morning (8am - 12pm)</MenuItem>
                  <MenuItem value="afternoon">Afternoon (12pm - 4pm)</MenuItem>
                  <MenuItem value="evening">Evening (4pm - 8pm)</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.allowWeekends}
                    onChange={handleChange('allowWeekends')}
                  />
                }
                label="Allow weekend appointments"
              />
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  bgcolor: '#FEED5A',
                  color: 'rgba(51, 51, 51, 0.88)',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#FEE049'
                  }
                }}
              >
                Save changes
              </Button>
            </Box>
          </Box>
        </Paper>

        <Snackbar
          open={showToast}
          autoHideDuration={3000}
          onClose={() => setShowToast(false)}
          message="Changes saved"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default AppointmentPreferences; 