'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Icons } from '@/components/icons';

export function ModeToggle() {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <button onClick={handleClick}>
      {theme === 'dark' ? <Icons.sun /> : <Icons.moon />}
    </button>
  );
}
