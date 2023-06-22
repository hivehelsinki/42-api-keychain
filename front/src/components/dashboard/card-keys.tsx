import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';

const RenderElem = ({ className, datum, ...props }) => (
  <div className={cn('flex items-center', className)} {...props}>
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{datum.name}</p>
      <p className="hidden text-sm text-muted-foreground md:block">
        {datum.uid}
      </p>
    </div>
    <div className="ml-auto font-medium">
      <p className="hidden md:block">{datum.end_at}</p>
      <p className="text-sm text-muted-foreground">30 days</p>
    </div>
  </div>
);

const CardKeys = ({ data }) => {
  console.log(data);
  return (
    <Card className="col-span-3">
      <CardHeader className="bg-neutral-50">
        <CardTitle className="flex justify-between">
          <div>Managed applications</div>
          <Icons.refresh className="h-5 w-5" />
        </CardTitle>
        <CardDescription>You have {data.length} applications.</CardDescription>
      </CardHeader>
      <CardContent className="border-t">
        <div className="mt-5 space-y-8">
          {data.map((datum) => (
            <RenderElem datum={datum} key={datum.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { CardKeys };
