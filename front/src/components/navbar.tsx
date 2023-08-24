import Link from 'next/link';
import { FC } from 'react';

import { LoginToggle } from '@/components/auth/login-toggle';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/moddle-toggle';

import User from '@/types/user';

type navbarProps = {
  user: User | null;
};

const Navbar: FC<navbarProps> = ({ user }) => {
  return (
    <nav className="supports-backdrop-blur:bg-background/60 sticky top-0 z-10  flex h-16 w-full border-b bg-background/95 text-gray-950 backdrop-blur dark:border-b-gray-600 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-950">
          <Icons.logo className="h-4 w-auto dark:fill-gray-100" />
          <span className="hidden text-lg font-bold tracking-tight dark:text-gray-200 md:inline-block">Keychain</span>
        </Link>
        <div id="menu" className="flex items-center gap-3 md:gap-5">
          <LoginToggle user={user} />
          <div className="flex space-x-2">
            <div className="w-[1px] bg-gray-300/90 dark:bg-gray-600" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
