import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';

import TopNav from '../components/layout/TopNav';
import Providers from '../components/Providers';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Robotics Engineer Portfolio',
  description: 'A professional robotics portfolio with interactive UI.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <TopNav />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

