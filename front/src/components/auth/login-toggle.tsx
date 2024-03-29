'use client';

import { FC } from 'react';

import { LoginButton } from './login-button';
import Menu from '@/components/menu';

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
          className="hidden items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent md:flex"
        >
          Dashboard
        </a>

        <Menu />
      </div>
    );
  }
  return <LoginButton>Sign in</LoginButton>;
};

export { LoginToggle };
