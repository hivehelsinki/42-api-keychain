import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

const RenderElem = ({ className, datum, ...props }) => (
  <Card {...props}>
    <CardHeader className="relative">
      <div>
        <span className=" absolute -right-2 -top-2 h-4 w-4 animate-ping rounded-full bg-green-400"></span>
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-green-400"></span>
      </div>
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
