'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const LoginButton = ({ user }) => {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.image_url} />
          <AvatarFallback>HV</AvatarFallback>
        </Avatar>
        <a onClick={() => signOut()}>
          <Icons.logout />
        </a>
      </div>
    );
  }
  return (
    <Button onClick={() => signIn('42-school', { callbackUrl: '/' })}>
      Sign in
    </Button>
  );
};

export { LoginButton };
