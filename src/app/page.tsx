import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function Home() {
  return (
    <main className="container mt-10">
      <section className="flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Manage smoothly your 42 API applications.
        </h1>
        <div className="max-w-[780px] text-lg text-muted-foreground sm:text-xl">
          Experience seamless management of your 42 API Keys with Hive Keychain
          - the ultimate solution designed for hassle-free control.
        </div>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          <Button>Get started</Button>
          <Button variant="outline">
            <Link
              href="https://github.com/hivehelsinki/42-api-keychain"
              target="_blank"
              className="inline-flex items-center"
            >
              <Icons.gitHub className="h-4 pr-2" /> Github
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
