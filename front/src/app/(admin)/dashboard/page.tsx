'use client';

import React, { FC, useState } from 'react';
import useSWR from 'swr';

import { CardKeys } from '@/components/card-keys';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { Label } from '@/components/ui/label';
import Header from '@/components/header';

import CardKeyProps from '@/types/card-key';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return (await res.json()) as CardKeyProps[];
};

const Page: FC = () => {
  const [search, setSearch] = useState<string>('');
  const { data, error } = useSWR<CardKeyProps[]>('/api/keys', fetcher);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (error) {
    return (
      <div className="pb-6 md:pb-0">
        <Header
          heading="Dashboard"
          text="Welcome to your dashboard where you can manage your keys and overwatch their validity"
        />

        <section className="mt-5 flex flex-col gap-3 md:mt-10">
          <Label className="font-bold">Search</Label>
          <Input placeholder="Search by name or client id" autoFocus onChange={handleSearch} />

          <p className="mt-5">Failed to connect with the server</p>
        </section>
      </div>
    );
  }

  if (!data)
    return (
      <div className="pb-6 md:pb-0">
        <Header
          heading="Dashboard"
          text="Welcome to your dashboard where you can manage your keys and overwatch their validity"
        />

        <section className="mt-5 flex flex-col gap-3 md:mt-10">
          <Label className="font-bold">Search</Label>
          <Input placeholder="Search by name or client id" autoFocus onChange={handleSearch} />

          <div className="mt-5 inline-flex items-center justify-center gap-2">
            <Icons.spinner className="h-4 w-4 animate-spin " />
            Loading
          </div>
        </section>
      </div>
    );

  return (
    <div className="pb-6 md:pb-0">
      <Header
        heading="Dashboard"
        text="Welcome to your dashboard where you can manage your keys and overwatch their validity"
      />

      <section className="mt-5 flex flex-col gap-3 md:mt-10">
        <Label className="font-bold">Search</Label>
        <Input placeholder="Search by name or client id" autoFocus onChange={handleSearch} />

        <CardKeys
          className="mt-5"
          data={
            search
              ? data.filter(
                  (app: CardKeyProps) =>
                    app.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                    app.clientId.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
                )
              : data
          }
        />
      </section>
    </div>
  );
};

export default Page;
