'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <button onClick={handleClick}>
      {theme === 'dark' ? <Icons.sun /> : <Icons.moon />}
    </button>
  );
}
