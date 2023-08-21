'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FC } from 'react';
import { Button } from './ui/button';
import { Icons } from './icons';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';

const menu: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex h-9 w-9 items-center justify-center rounded-md bg-background/95 px-0 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-accent dark:bg-gray-800">
          <Icons.menu className="h-5" strokeWidth={1.4} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem className="md:hidden">
            <Icons.dashboard className="mr-2 h-4 w-4" strokeWidth={1.4} />
            <a href="/dashboard">Dashboard</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.settings className="mr-2 h-4 w-4" strokeWidth={1.4} />
            <a href="/settings">Settings</a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Icons.logout className="mr-2 h-4 w-4" strokeWidth={1.4} />
            <button onClick={() => signOut()}>Sign out</button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default menu;
