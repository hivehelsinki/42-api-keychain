'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const LoginButton = () => {
  return (
    <Button onClick={() => signIn('42-school', { callbackUrl: '/' })}>
      Sign in
    </Button>
  );
};

export { LoginButton };
