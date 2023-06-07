import { Button } from '@/components/ui/button';
import { HiveLogo } from '@/components/ui/hivelogo';

import { GithubIcon } from 'lucide-react';

function Navbar() {
  return (
    <nav className="flex h-16 w-full border-b text-gray-950">
      <div className="container flex justify-between">
        <div className="flex items-center gap-4 text-gray-950">
          <HiveLogo className="h-4 w-auto dark:fill-gray-100" />
          <span className="text-lg font-semibold tracking-tight">
            API Keychain
          </span>
        </div>
        <div id="menu" className="flex items-center gap-10">
          <ul className="flex h-full items-center gap-4">
            <li>About</li>
            <li>
              <GithubIcon className="aspect-square h-5" />
            </li>
          </ul>
          <Button>Sign in</Button>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
