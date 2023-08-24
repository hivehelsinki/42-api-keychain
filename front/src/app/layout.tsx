import './globals.css';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { getCurrentUser } from '@/lib/session';

import User from '@/types/user';

export const metadata = {
  title: 'Hive Keychain',
  description: 'Manage smoothly your 42 API applications.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user: User | null = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased dark:bg-gray-900', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar user={user} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
