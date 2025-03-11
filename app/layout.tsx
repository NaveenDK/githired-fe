import { Providers } from './Providers'; // Import Providers from Providers.js
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHired - Find Your Next Developer Job',
  description: 'Connect with top tech companies and find your next developer job.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* Using Providers here */}
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
