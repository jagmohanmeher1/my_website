import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import TopNav from '../components/layout/TopNav';
import Providers from '../components/Providers';

import './globals.css';

// Note: Do not use next/font/google here — it downloads fonts during `next build`
// and often fails on GitHub Actions runners (no reliable access to fonts.googleapis.com).

export const metadata: Metadata = {
  title: 'Robotics Engineer Portfolio',
  description: 'A professional robotics portfolio with interactive UI.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

