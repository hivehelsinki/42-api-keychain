'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import User from '@/types/user';

const LoginButton = ({ user }: { user: User | null }) => {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.image_url} />
          <AvatarFallback>HV</AvatarFallback>
        </Avatar>
        <a onClick={() => signOut()}>
          <Icons.logout className="h-6" />
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
