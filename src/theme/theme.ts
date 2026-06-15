import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050810',
      paper: 'rgba(255,255,255,0.04)',
    },
    primary: {
      main: '#00d4ff',
      light: '#40e4ff',
      dark: '#0099bb',
      contrastText: '#050810',
    },
    secondary: {
      main: '#8338ec',
      light: '#a060ff',
      dark: '#5520bb',
    },
    text: {
      primary: 'rgba(255,255,255,0.92)',
      secondary: 'rgba(255,255,255,0.58)',
      disabled: 'rgba(255,255,255,0.32)',
    },
    divider: 'rgba(255,255,255,0.08)',
    error:   { main: '#ff4d4d' },
    warning: { main: '#ffba42' },
    info:    { main: '#00d4ff' },
    success: { main: '#34d399' },
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
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(1000px 700px at 8% -5%, rgba(0,212,255,0.08), transparent 60%),' +
            'radial-gradient(1000px 700px at 92% 5%, rgba(131,56,236,0.10), transparent 60%),' +
            '#050810',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255,255,255,0.08)',
        },
      },
    },
  },
});
