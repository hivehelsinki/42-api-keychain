'use client';

import React, { FC, useState } from 'react';
import useSWR from 'swr';

import { CardKeys } from '@/components/card-keys';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { Label } from '@/components/ui/label';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

import CardKeyProps from '@/types/card-key';

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return (await res.json()) as CardKeyProps[];
};

const Page: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data, error } = useSWR<CardKeyProps[]>('/api/keys', fetcher);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData = data
    ? search
      ? data.filter(
          (app: CardKeyProps) =>
            app.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            app.clientId.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : data
    : [];

  if (error) {
    return (
      <div className="pb-6 md:pb-0">
        <Header
          heading="Dashboard"
          text="Welcome to your dashboard where you can manage your keys and overwatch their validity"
        />

        <section className="mt-5 flex flex-col gap-3 md:mt-10">
          <div className="flex items-center justify-between">
            <Label className="font-bold">Search</Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-accent' : ''}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-accent' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Input placeholder="Search by name or client id" onChange={handleSearch} />

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
          <div className="flex items-center justify-between">
            <Label className="font-bold">Search</Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-accent' : ''}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-accent' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Input placeholder="Search by name or client id" onChange={handleSearch} />

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
        <div className="flex items-center justify-between">
          <Label className="font-bold">Search</Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-accent' : ''}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-accent' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Input placeholder="Search by name or client id" onChange={handleSearch} />

        <CardKeys className="mt-5" data={filteredData} viewMode={viewMode} />
      </section>
    </div>
  );
};

export default Page;
