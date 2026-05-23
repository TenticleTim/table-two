import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TableTwo',
  description: 'Private couple meal planning, grocery lists, and recipe discovery.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'TableTwo', statusBarStyle: 'default' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
