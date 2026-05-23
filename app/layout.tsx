import './globals.css';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'TableTwo',
  description: 'Private couple meal planning, grocery lists, and recipe discovery.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'TableTwo', statusBarStyle: 'default' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {/* Offset for desktop sidebar and mobile top/bottom bars */}
        <div className="lg:pl-60 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
