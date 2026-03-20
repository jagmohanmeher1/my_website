import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1D8FE8' },
    secondary: { main: '#8B5CF6' },
    background: {
      default: '#F6F1E8',
      paper: 'rgba(255, 255, 255, 0.72)'
    }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['Roboto', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: { fontSize: '3.5rem', fontWeight: 900 },
    h2: { fontSize: '2.5rem', fontWeight: 800 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.72)',
          border: '1px solid rgba(15, 23, 42, 0.08)'
        }
      }
    }
  }
});

