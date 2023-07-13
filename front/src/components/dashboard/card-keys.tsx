import Link from 'next/link';
import { FC } from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Icons } from '@/components/icons';
import { Ping } from '@/components/ping';
import { Button } from '@/components/ui/button';

import CardKeyProps from '@/types/card-key';
import { cn } from '@/lib/utils';

interface renderElemProps {
  datum: CardKeyProps;
}

const RenderElem: FC<renderElemProps> = ({ datum, ...props }) => (
  <Card
    className="group rounded-md transition-colors duration-200 ease-in-out hover:border-primary hover:bg-primary/10 hover:text-accent-foreground"
    {...props}
  >
    <CardHeader className="relative">
      <Ping className="absolute -right-2 -top-2" />
      <CardTitle>{datum.name}</CardTitle>
      <CardDescription>Expires in 30 days (20/06/2022)</CardDescription>
    </CardHeader>
  </Card>
);

interface cardKeysProps {
  data: CardKeyProps[];
  className: string;
}

const CardKeys: FC<cardKeysProps> = ({ data, className }) => {
  return (
    <div
      className={cn(
        'grid min-h-max grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {data.map((datum: CardKeyProps) => (
        <RenderElem datum={datum} key={datum.id} />
      ))}
      <Link href="/new">
        <Button className="h-full w-full border-dashed" variant="outline">
          <span className="inline-flex min-h-[75px] items-center gap-2 transition-colors duration-200 ease-in-out">
            <Icons.plus className="h-4 w-4" />
            Add a new key
          </span>
        </Button>
      </Link>
    </div>
  );
};

export { CardKeys };
