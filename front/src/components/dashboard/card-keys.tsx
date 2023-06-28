import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Icons } from '@/components/icons';
import { Ping } from '@/components/ping';
import { Button } from '@/components/ui/button';

const RenderElem = ({ datum, ...props }) => (
  <Card className="group" {...props}>
    <CardHeader className="relative">
      <Ping className="absolute -right-2 -top-2" />
      <CardTitle>{datum.name}</CardTitle>
      <CardDescription>Expires in 30 days (20/06/2022)</CardDescription>
    </CardHeader>
  </Card>
);

const CardKeys = ({ data }) => {
  return (
    <div className="grid min-h-max grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
      {data.map((datum) => (
        <RenderElem datum={datum} key={datum.id} />
      ))}
      <Link href="/new">
        <Button className="h-full w-full border-dashed" variant="outline">
          <span className="inline-flex items-center gap-2">
            <Icons.plus className="h-4 w-4" />
            Add a new key
          </span>
        </Button>
      </Link>
    </div>
  );
};

export { CardKeys };
