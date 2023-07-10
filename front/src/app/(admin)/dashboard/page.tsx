'use client';

import React, { FC, useState } from 'react';

import useSWR from 'swr';

import { CardKeys } from '@/components/dashboard/card-keys';
import { Input } from '@/components/ui/input';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [search, setSearch] = useState<string>('');
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('http://localhost:5001/keys', fetcher);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
        <Input
          placeholder="Search by name or uid"
          autoFocus
          onChange={handleSearch}
        />
        <CardKeys
          data={
            search
              ? data.filter(
                  (app) =>
                    app.name.includes(search) || app.client_id.includes(search)
                )
              : data
          }
        />
      </section>
    </>
  );
};

export default Page;
