'use client';

import { signIn, signOut } from 'next-auth/react';
import { getCurrentUser } from '@/lib/session';
import { Button } from '@/components/ui/button';

const LoginButton = async () => {
  const user = await getCurrentUser();
  if (user) {
    return <>Hello {user.login}</>;
  }
  return (
    <Button onClick={() => signIn('42-school', { callbackUrl: '/' })}>
      Sign in
    </Button>
  );
};

export { LoginButton };
