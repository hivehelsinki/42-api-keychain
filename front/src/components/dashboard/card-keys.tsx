import Link from 'next/link';
import { FC } from 'react';

import moment from 'moment';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Icons } from '@/components/icons';
import { Ping } from '@/components/ping';
import { Button } from '@/components/ui/button';

import CardKeyProps from '@/types/card-key';
import { cn, dateVariant } from '@/lib/utils';

interface renderElemProps {
  datum: CardKeyProps;
}

const RenderElem: FC<renderElemProps> = ({ datum, ...props }) => (
  <Card
    className="group rounded-md transition-transform delay-150 ease-in-out  hover:border-primary hover:text-accent-foreground"
    {...props}
  >
    <CardHeader className="relative">
      <Ping
        className="absolute right-3 top-3"
        variant={dateVariant(datum.secret_valid_until)}
      />

      <CardTitle className="text-md">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 uppercase focus-visible:outline-none">
            {datum.name}
            <span className="hidden cursor-pointer border-gray-800 group-hover:inline-flex">
              <Icons.down className="h-5 w-5" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 translate-x-20 transform">
            <DropdownMenuItem>Update secret</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 hover:text-red-600">
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardTitle>
      <CardDescription className="mt-1.5">
        Rotation {moment(datum.secret_valid_until, 'YYYY-MM-DD').fromNow()}
      </CardDescription>
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
