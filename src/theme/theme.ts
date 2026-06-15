import { createTheme } from '@mui/material/styles';

// Warm professional palette: white base, beige sections, bronze/taupe accents
export const appTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    primary: {
      main: '#A67C52',   // warm bronze
      light: '#C0986B',
      dark: '#876140',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7C6F5F',   // warm taupe
      light: '#9A8C7A',
      dark: '#5E5345',
    },
    text: {
      primary: '#2B2620',
      secondary: '#6B6259',
      disabled: '#A8A096',
    },
    divider: 'rgba(43,38,32,0.10)',
    error:   { main: '#C0563E' },
    warning: { main: '#C99A4B' },
    info:    { main: '#A67C52' },
    success: { main: '#7A8B5C' },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 950, letterSpacing: '-0.025em' },
    h2: { fontWeight: 900, letterSpacing: '-0.02em' },
    h3: { fontWeight: 800, letterSpacing: '-0.015em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' as const },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 600,
          borderRadius: 12,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid rgba(43,38,32,0.09)',
          boxShadow: '0 1px 3px rgba(43,38,32,0.05), 0 10px 28px rgba(43,38,32,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          boxShadow: '0 1px 3px rgba(43,38,32,0.06), 0 12px 32px rgba(43,38,32,0.06)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(43,38,32,0.10)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 9 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#ffffff',
          boxShadow: '0 24px 64px rgba(43,38,32,0.18)',
        },
      },
    },
  },
});
