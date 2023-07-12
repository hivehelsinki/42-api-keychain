import Link from 'next/link';
import { FC } from 'react';

import { LoginButton } from '@/components/auth/login-button';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/moddle-toggle';

import User from '@/types/user';

type navbarProps = {
  user: User | null;
};

const Navbar: FC<navbarProps> = ({ user }) => {
  return (
    <nav className="flex h-16 w-full border-b text-gray-950 dark:border-b-gray-600 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between">
        <div className="flex items-center gap-10 text-gray-950">
          <a href="/">
            <Icons.logo className="h-6 w-auto dark:fill-gray-100" />
          </a>
          <span className="hidden text-lg font-bold tracking-tight dark:text-gray-200 md:inline-block">
            API Keychain
          </span>
        </div>
        <div id="menu" className="flex items-center gap-3 md:gap-5">
          <LoginButton user={user} />
          <div className="flex gap-3 md:gap-5">
            <div className="w-[1px] bg-gray-300/90 dark:bg-gray-600"></div>
            <ModeToggle />
            <Link
              href="https://github.com/hivehelsinki/42-api-keychain"
              target="_blank"
              className="flex items-center"
            >
              <Icons.gitHub className="aspect-square h-5 text-neutral-500 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-200 md:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
