'use client'; 

import Link from 'next/link';
import useSWR from 'swr'

import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR("http://localhost:5001/keys", fetcher);

  if (error) {
    console.log(error)
    return <div>failed to load</div>
  }

  if (!data) return <div>loading...</div>

  return (
    <>
      <Link href="/new">
        <Button>Add new one</Button>
      </Link>
      {/* <ul className='bg-red-300 mt-5'>
        hey
        {data.map(({ id, uid }) => (
          <li key={uid} className='text-xl text-white'>{uid}</li>
        ))}
      </ul> */}

    </>
  );
}
