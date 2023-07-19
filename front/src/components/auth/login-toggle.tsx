'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';

import { Icons } from '@/components/icons';
import { LoginButton } from './login-button';

import User from '@/types/user';

type loginButtonProps = {
  user: User | null;
};

const LoginToggle: FC<loginButtonProps> = ({ user }) => {
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <a
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-md px-0 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Icons.key className="h-5" strokeWidth={1.4} />
        </a>
        <a
          onClick={() => signOut()}
          className="flex h-9 w-9 items-center justify-center rounded-md px-0 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Icons.logout className="h-5" strokeWidth={1.4} />
        </a>
      </div>
    );
  }
  return <LoginButton>Sign in</LoginButton>;
};

export { LoginToggle };
