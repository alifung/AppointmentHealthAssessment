import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import StartPage from './components/StartPage';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import AppointmentPreferences from './components/AppointmentPreferences';
import InsuranceUpdate from './components/InsuranceUpdate';
import './fonts.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Sharp Sans", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 500,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(51, 51, 51, 0.88)',
      light: 'rgba(51, 51, 51, 0.68)',
      dark: 'rgba(51, 51, 51, 1)',
    },
    brand: {
      main: '#FEED5A',
      hover: '#FEE049',
    },
    secondary: {
      main: '#625B71',
    },
    stroke: {
      default: 'rgba(58, 47, 31, 0.1)', // #3A2F1F at 10% opacity
    },
    charcoal: {
      main: '#333333',
    },
    greige: {
      main: '#F9F8F7',
    },
    background: {
      default: '#F9F8F7',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#333333',
          textDecorationColor: '#333333',
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: '#FEED5A',
            color: '#333333',
            textTransform: 'none',
            borderRadius: '4px',
            padding: '6px 20px',
            width: 'fit-content',
            '&:hover': {
              backgroundColor: '#FEE049',
              boxShadow: 'none',
            },
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: 'rgba(58, 47, 31, 0.1)',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: 'rgba(51, 51, 51, 0.88)',
        },
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(51, 51, 51, 0.08)',
          },
        },
        track: {
          color: 'rgba(51, 51, 51, 0.88)',
        },
        rail: {
          color: 'rgba(51, 51, 51, 0.24)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: 'rgba(51, 51, 51, 0.88)',
            '&:hover': {
              backgroundColor: 'rgba(51, 51, 51, 0.08)',
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'rgba(51, 51, 51, 0.68)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: 'rgba(51, 51, 51, 0.88)',
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: 'rgba(51, 51, 51, 0.88)',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: 'rgba(51, 51, 51, 0.88)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(51, 51, 51, 0.12)',
        },
        bar: {
          backgroundColor: 'rgba(51, 51, 51, 0.88)',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(51, 51, 51, 0.08)',
            color: 'rgba(51, 51, 51, 0.88)',
            '&:hover': {
              backgroundColor: 'rgba(51, 51, 51, 0.12)',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/appointment-preferences" element={<AppointmentPreferences />} />
          <Route path="/insurance-update" element={<InsuranceUpdate />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


