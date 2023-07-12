'use client';

import { FC } from 'react';
import { signIn, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

import User from '@/types/user';

type loginButtonProps = {
  user: User | null;
};

const LoginButton: FC<loginButtonProps> = ({ user }) => {
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
  return (
    <Button onClick={() => signIn('42-school', { callbackUrl: '/dashboard' })}>
      Sign in
    </Button>
  );
};

export { LoginButton };
