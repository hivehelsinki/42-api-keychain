'use client';
import { FC } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const errorMessages: { [key: string]: string } = {
  AccessDenied: 'You do not have permission to sign in.',
  Configuration: 'There is a problem with the configuration of your application. Please notify the administrator.',
};

const page: FC = () => {
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get('error') : null;

  return (
    <div className=" grid h-screen place-content-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6">
          {error && error in errorMessages && <h1 className="text-2xl">{error}</h1>}

          {
            <p className="text text-lg">
              {error && errorMessages[error] ? errorMessages[error] : 'An error has occurred. Please try again later.'}
            </p>
          }
        </div>
        <Link href={'/'} className="mt-10">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
