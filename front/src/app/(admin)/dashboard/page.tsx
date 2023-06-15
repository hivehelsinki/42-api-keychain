import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <>
      <Link href="/new">
        <Button>Add new one</Button>
      </Link>
    </>
  );
}
