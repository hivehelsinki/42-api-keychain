import Link from 'next/link';
import { LoginButton } from '@/components/auth/login-button';
import { HiveLogo } from '@/components/ui/hivelogo';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/moddle-toggle';

function Navbar() {
  return (
    <nav className="flex h-16 w-full border-b text-gray-950 dark:border-b-gray-600 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between">
        <div className="flex items-center gap-10 text-gray-950">
          <HiveLogo className="h-6 w-auto dark:fill-gray-100" />
          <span className="hidden text-lg font-bold tracking-tight dark:text-gray-200 md:inline-block">
            API Keychain
          </span>
        </div>
        <div id="menu" className="flex items-center gap-3 md:gap-5">
          <LoginButton />
          <div className="flex gap-3 md:gap-5">
            <div className="w-[1px] bg-gray-300/90 dark:bg-gray-600"></div>
            <ModeToggle />
            <Link
              href="https://github.com/hivehelsinki/42-api-keychain"
              target="_blank"
            >
              <Icons.gitHub className="aspect-square h-5 text-neutral-400 hover:text-neutral-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };