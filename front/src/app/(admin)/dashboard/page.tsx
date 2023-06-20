'use client';

import Link from 'next/link';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('http://localhost:5001/keys', fetcher);

  if (error) {
    console.log(error);
    return <div>failed to load</div>;
  }

  if (!data) return <div>loading...</div>;

  return (
    <>
      <div id="header" className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Link href="/new">
          <Button size="sm">Add new one</Button>
        </Link>
      </div>

      <section className="mt-10">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Keychain</CardTitle>
            <CardDescription>You have 10 keys.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    HIVE - API-KEYCHAIN
                  </p>
                  <p className="hidden text-sm text-muted-foreground md:block">
                    u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec
                  </p>
                </div>
                <div className="ml-auto font-medium">13/06/2024</div>
              </div>

              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    HIVE - API-KEYCHAIN
                  </p>
                  <p className="hidden text-sm text-muted-foreground md:block">
                    u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec
                  </p>
                </div>
                <div className="ml-auto font-medium">13/06/2024</div>
              </div>

              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    HIVE - API-KEYCHAIN
                  </p>
                  <p className="hidden text-sm text-muted-foreground md:block">
                    u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec
                  </p>
                </div>
                <div className="ml-auto font-medium">13/06/2024</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* <ul className='bg-red-300 mt-5'>
        hey
        {data.map(({ id, uid }) => (
          <li key={uid} className='text-xl text-white'>{uid}</li>
        ))}
      </ul> */}
    </>
  );
}
