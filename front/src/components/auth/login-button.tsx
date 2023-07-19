'use client';

import { FC } from 'react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

type loginButtonProps = {
  children: React.ReactNode;
};

const LoginButton: FC<loginButtonProps> = ({ children }) => {
  return (
    <Button onClick={() => signIn('42-school', { callbackUrl: '/dashboard' })}>
      {children}
    </Button>
  );
};

export { LoginButton };
