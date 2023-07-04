'use client';

import { FC } from 'react';

import useSWR from 'swr';

import { CardKeys } from '@/components/dashboard/card-keys';
import { Input } from '@/components/ui/input';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
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
      </div>

      <section className="mt-10 flex flex-col gap-8">
        <Input placeholder="Search by name or uid" autoFocus />
        <CardKeys data={data} />
      </section>
    </>
  );
};

export default page;
