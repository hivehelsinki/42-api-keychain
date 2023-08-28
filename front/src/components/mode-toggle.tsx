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
    return <div className="h-9 w-9 px-0 py-2 text-sm font-medium transition-colors" />;
  }

  const handleClick = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <button aria-label="switch theme" onClick={handleClick}>
      {theme === 'dark' ? (
        <div className="flex h-9 w-9 items-center justify-center rounded-md px-0 py-2 text-sm font-medium transition-colors hover:bg-accent">
          <Icons.moon className="h-5 text-neutral-300 hover:text-neutral-200" strokeWidth={1.4} />
        </div>
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-md px-0 py-2 text-sm font-medium transition-colors hover:bg-accent">
          <Icons.sun className="h-5 text-neutral-600 hover:text-neutral-700" strokeWidth={1.4} />
        </div>
      )}
    </button>
  );
}
