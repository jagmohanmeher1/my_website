import { createTheme } from '@mui/material/styles';

// Bold & colorful: white base, vivid orange primary, playful supporting pops
export const appTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    primary: {
      main: '#F97316',   // orange-500
      light: '#FB923C',
      dark: '#EA580C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EC4899',   // pink-500 pop
      light: '#F472B6',
      dark: '#DB2777',
    },
    text: {
      primary: '#18181B',
      secondary: '#52525B',
      disabled: '#A1A1AA',
    },
    divider: 'rgba(24,24,27,0.10)',
    error:   { main: '#EF4444' },
    warning: { main: '#F59E0B' },
    info:    { main: '#F97316' },
    success: { main: '#10B981' },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 950, letterSpacing: '-0.03em' },
    h2: { fontWeight: 950, letterSpacing: '-0.025em' },
    h3: { fontWeight: 900, letterSpacing: '-0.02em' },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' as const },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 700,
          borderRadius: 14,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          border: '1px solid rgba(24,24,27,0.08)',
          boxShadow: '0 1px 3px rgba(24,24,27,0.04), 0 12px 32px rgba(24,24,27,0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          boxShadow: '0 1px 3px rgba(24,24,27,0.06), 0 14px 36px rgba(24,24,27,0.07)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(24,24,27,0.10)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#ffffff',
          boxShadow: '0 24px 64px rgba(24,24,27,0.20)',
        },
      },
    },
  },
});
