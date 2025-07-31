import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: { 
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    },
    background: { 
      default: '#f4f6f8',
      paper: '#ffffff'
    },
    text: {
      primary: '#1a2027',
      secondary: '#637381'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  shape: { 
    borderRadius: 8 
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#1a2027'
    },
    h5: {
      fontWeight: 600,
      color: '#1a2027'
    },
    h6: {
      fontWeight: 600,
      color: '#1a2027'
    },
    subtitle1: {
      color: '#637381'
    },
    body1: {
      color: '#1a2027'
    },
    body2: {
      color: '#637381'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
