'use client';

import { FC } from 'react';
import { signIn, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

import User from '@/types/user';
import { LoginButton } from './login-button';

type loginButtonProps = {
  user: User | null;
};

const LoginToggle: FC<loginButtonProps> = ({ user }) => {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <a href="/dashboard">
          <Icons.key className="h-5 md:h-6" />
        </a>
        <a onClick={() => signOut()}>
          <Icons.logout className="h-5 md:h-6" />
        </a>
      </div>
    );
  }
  return <LoginButton>Sign in</LoginButton>;
};

export { LoginToggle };
