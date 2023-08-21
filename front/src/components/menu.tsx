'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

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
