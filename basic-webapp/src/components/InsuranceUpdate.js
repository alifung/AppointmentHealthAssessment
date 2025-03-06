import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
  ListItemButton,
  Pagination,
  DialogActions,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ALL_INSURANCE_NETWORKS = [
  {
    name: 'Aetna',
    types: ['PPO', 'HMO', 'EPO', 'POS'],
    link: '#view-aetna-plans'
  },
  {
    name: 'Blue Cross Blue Shield',
    types: ['PPO', 'HMO', 'POS'],
    link: '#view-bcbs-plans'
  },
  {
    name: 'Cigna',
    types: ['PPO', 'HMO', 'EPO'],
    link: '#view-cigna-plans'
  },
  {
    name: 'UnitedHealthcare',
    types: ['PPO', 'HMO', 'POS'],
    link: '#view-uhc-plans'
  },
  {
    name: 'Kaiser Permanente',
    types: ['HMO'],
    link: '#view-kaiser-plans'
  },
  {
    name: 'Humana',
    types: ['PPO', 'HMO'],
    link: '#view-humana-plans'
  },
  {
    name: 'Delta Dental',
    types: ['PPO', 'HMO'],
    link: '#view-delta-plans'
  },
  {
    name: 'VSP Vision Care',
    types: ['PPO'],
    link: '#view-vsp-plans'
  },
  {
    name: 'Medicare',
    types: ['Original Medicare', 'Medicare Advantage'],
    link: '#view-medicare-plans'
  },
  {
    name: 'Medicaid',
    types: ['State Medicaid'],
    link: '#view-medicaid-plans'
  },
];

function InsuranceUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { impactMetric, impactPercentage } = location.state || {};
  const [selectedInsurances, setSelectedInsurances] = React.useState(
    ALL_INSURANCE_NETWORKS.map(network => network.name)
  );
  const [applyToAll, setApplyToAll] = React.useState(true);
  const [showProviderDialog, setShowProviderDialog] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedProviders, setSelectedProviders] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showToast, setShowToast] = React.useState(false);
  const providersPerPage = 10;

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock providers data - replace with actual data
  const allProviders = [
    { id: 1, name: 'Dr. Smith', location: 'Downtown Medical Center', specialty: 'Family Medicine' },
    { id: 2, name: 'Dr. Johnson', location: 'Westside Clinic', specialty: 'Internal Medicine' },
    { id: 3, name: 'Dr. Williams', location: 'North Medical Group', specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. Brown', location: 'South Bay Medical', specialty: 'Cardiology' },
    { id: 5, name: 'Dr. Jones', location: 'East Side Health', specialty: 'Dermatology' },
    { id: 6, name: 'Dr. Garcia', location: 'Central Medical Plaza', specialty: 'Orthopedics' },
    { id: 7, name: 'Dr. Miller', location: 'Harbor Health Center', specialty: 'Neurology' },
    { id: 8, name: 'Dr. Davis', location: 'Valley Medical Group', specialty: 'Endocrinology' },
    { id: 9, name: 'Dr. Rodriguez', location: 'Lakeside Clinic', specialty: 'Psychiatry' },
    { id: 10, name: 'Dr. Martinez', location: 'Mountain View Medical', specialty: 'Rheumatology' },
    { id: 11, name: 'Dr. Anderson', location: 'Riverside Health', specialty: 'Gastroenterology' },
    { id: 12, name: 'Dr. Taylor', location: 'Ocean Medical Center', specialty: 'Pulmonology' },
  ];

  const handleToggleInsurance = (insurance) => {
    setSelectedInsurances(prev => 
      prev.includes(insurance)
        ? prev.filter(i => i !== insurance)
        : [...prev, insurance]
    );
  };

  const handleApplyToAllChange = (event) => {
    setApplyToAll(event.target.checked);
    if (!event.target.checked) {
      setShowProviderDialog(true);
    }
  };

  const filteredProviders = allProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProviders.length / providersPerPage);
  const currentProviders = filteredProviders.slice(
    (currentPage - 1) * providersPerPage,
    currentPage * providersPerPage
  );

  const handleSelectAll = () => {
    if (selectedProviders.length === allProviders.length) {
      setSelectedProviders([]);
    } else {
      setSelectedProviders(allProviders.map(provider => provider.id));
    }
  };

  const handleProviderSelect = (providerId) => {
    setSelectedProviders(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSave = () => {
    navigate('/results', { 
      state: { 
        ...location.state,
        from: 'insurance-save'
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
                Update your insurances
              </Typography>
              <Typography variant="body1" paragraph>
                We've found several insurances that you're contracted with, but aren't listed on your profiles.
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

            <FormGroup>
              {ALL_INSURANCE_NETWORKS.map((network) => (
                <Box key={network.name} sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedInsurances.includes(network.name)}
                        onChange={() => handleToggleInsurance(network.name)}
                        sx={{
                          '&.Mui-checked': {
                            color: 'rgba(51, 51, 51, 0.88)'
                          },
                          '&:hover': {
                            backgroundColor: 'transparent'
                          }
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography>{network.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                          >
                            {network.types.join(' • ')}
                          </Typography>
                          <Link 
                            href={network.link}
                            sx={{ 
                              fontSize: '0.875rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              color: 'rgba(51, 51, 51, 0.68)'
                            }}
                          >
                            View plans
                            <ChevronRightIcon sx={{ fontSize: 16 }} />
                          </Link>
                        </Box>
                      </Box>
                    }
                    sx={{
                      alignItems: 'flex-start',
                      margin: 0,
                      ml: '-9px',
                      '& .MuiCheckbox-root': {
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginRight: '4px',
                        marginTop: '-4px',
                        '&.Mui-checked': {
                          color: 'rgba(51, 51, 51, 0.88)'
                        },
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      },
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                </Box>
              ))}
            </FormGroup>

            <Box sx={{ 
              mt: 4,
              pt: 4, 
              borderTop: '1px solid rgba(51, 51, 51, 0.12)'
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={applyToAll}
                    onChange={handleApplyToAllChange}
                    sx={{
                      '&.Mui-checked': {
                        color: 'rgba(51, 51, 51, 0.88)'
                      },
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Apply to all contracted providers</Typography>
                    <Link
                      onClick={() => {
                        // Implement the logic to view providers
                      }}
                      sx={{
                        fontSize: '0.875rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: 'rgba(51, 51, 51, 0.68)'
                      }}
                    >
                      View providers
                      <ChevronRightIcon sx={{ fontSize: 16 }} />
                    </Link>
                  </Box>
                }
                sx={{
                  alignItems: 'flex-start',
                  ml: '-9px',
                  '& .MuiCheckbox-root': {
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginRight: '4px',
                    marginTop: '-4px',
                    '&.Mui-checked': {
                      color: 'rgba(51, 51, 51, 0.88)'
                    },
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
              />
            </Box>

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
      </Box>

      <Dialog 
        open={showProviderDialog} 
        onClose={() => setShowProviderDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            '& .MuiButton-text': {
              color: 'rgba(51, 51, 51, 0.68)'
            }
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Select Providers
            <Typography variant="body2" color="text.secondary">
              {selectedProviders.length} of {allProviders.length} selected
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search by name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ mb: 1 }}
            />
            <Link
              component="button"
              onClick={handleSelectAll}
              sx={{
                color: 'rgba(51, 51, 51, 0.68)',
                textDecoration: 'underline',
                fontSize: '0.875rem'
              }}
            >
              {selectedProviders.length === allProviders.length ? 'Deselect all' : 'Select all'}
            </Link>
          </Box>
          <List sx={{ mb: 2 }}>
            {currentProviders.map((provider) => (
              <ListItem
                key={provider.id}
                disablePadding
                sx={{ mb: 1 }}
              >
                <ListItemButton
                  onClick={() => handleProviderSelect(provider.id)}
                  sx={{ 
                    py: 0.5,
                    alignItems: 'flex-start',
                    pl: 0,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  <Checkbox
                    checked={selectedProviders.includes(provider.id)}
                    sx={{ 
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      paddingLeft: 0,
                      paddingRight: 0,
                      marginRight: '4px',
                      marginTop: '-4px',
                      '&.Mui-checked': {
                        color: 'rgba(51, 51, 51, 0.88)'
                      },
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                  <ListItemText 
                    primary={provider.name}
                    secondary={`${provider.location} • ${provider.specialty}`}
                    sx={{
                      margin: 0,
                      '& .MuiTypography-root': {
                        display: 'block'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'rgba(51, 51, 51, 0.68)',
                },
                '& .Mui-selected': {
                  backgroundColor: 'rgba(51, 51, 51, 0.08) !important',
                  color: 'rgba(51, 51, 51, 0.88)',
                },
                '& .MuiPaginationItem-page:hover': {
                  backgroundColor: 'rgba(51, 51, 51, 0.04)'
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={() => setShowProviderDialog(false)}
            sx={{ 
              color: 'rgba(51, 51, 51, 0.88)',
              borderColor: 'rgba(51, 51, 51, 0.12)',
              textTransform: 'none',
              '&:hover': {
                borderColor: 'rgba(51, 51, 51, 0.24)',
                backgroundColor: 'rgba(51, 51, 51, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setShowProviderDialog(false);
              // Handle the selected providers
              console.log('Selected providers:', selectedProviders);
            }} 
            variant="contained"
            sx={{ 
              bgcolor: '#FEED5A',
              color: 'rgba(51, 51, 51, 0.88)',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#FEE049'
              }
            }}
          >
            Apply changes
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
}

export default InsuranceUpdate; 