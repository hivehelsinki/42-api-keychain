import { Button } from '@/components/ui/button';
import { HiveLogo } from '@/components/ui/hivelogo';

import { Icons } from '@/components/icons';

function Navbar() {
  return (
    <nav className="flex h-14 w-full border-b text-gray-950">
      <div className="container flex justify-between">
        <div className="flex items-center gap-2 text-gray-950">
          <HiveLogo className="h-6 w-auto dark:fill-gray-100" />
          <span className="hidden text-xl font-bold tracking-tight md:inline-block">
            API Keychain
          </span>
        </div>
        <div id="menu" className="flex items-center gap-3 md:gap-5">
          <Button>Sign in</Button>
          <div className="flex gap-3 md:gap-5">
            <div className="w-[1px] bg-gray-300/90"></div>
            <Icons.moon className="aspect-square h-5" />
            <Icons.gitHub className="aspect-square h-5 text-neutral-400 hover:text-neutral-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
