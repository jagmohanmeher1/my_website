'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from '../theme/theme';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

