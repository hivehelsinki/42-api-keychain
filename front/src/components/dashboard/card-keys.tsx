import React, { FC } from 'react';
import Link from 'next/link';

import moment from 'moment';
import { cn, dateVariant } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Ping } from '@/components/ping';
import { Button } from '@/components/ui/button';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import CardKeyProps from '@/types/card-key';
import { useRouter } from 'next/navigation';

interface keyProps {
  datum: CardKeyProps;
}

async function deleteApp(appId: number) {
  const response = await fetch(`/api/keys/${appId}`, {
    method: 'DELETE',
  });

  if (!response?.ok) {
    // toast({
    //   title: "Something went wrong.",
    //   description: "Your post was not deleted. Please try again.",
    //   variant: "destructive",
    // })
    console.log('Something went wrong');
  }

  return true;
}

const Key: FC<keyProps> = ({ datum, ...props }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
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
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={() => setShowDeleteAlert(true)}
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription className="mt-1.5">
          Rotation {moment(datum.secret_valid_until, 'YYYY-MM-DD').fromNow()}
        </CardDescription>
      </CardHeader>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this app?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deleteApp(datum.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

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
        <Key datum={datum} key={datum.id} />
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
