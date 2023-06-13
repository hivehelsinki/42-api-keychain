import './globals.css';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';

export const metadata = {
  title: 'API Keychain',
  description: 'Manage smoothly your 42 API applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
