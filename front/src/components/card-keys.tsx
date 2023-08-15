import React, { FC } from 'react';
import Link from 'next/link';
import { useSWRConfig } from 'swr';

import CardKeyProps from '@/types/card-key';

import { cn, dateVariant } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Ping } from '@/components/ping';
import { Button } from '@/components/ui/button';
import CardInfoRotation from '@/components/card-info-rotation';
import UpdateSecretModal from '@/components/update-secret-modal';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  const { mutate } = useSWRConfig();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [showUpdateDialog, setShowUpdateDialog] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <Card
      className="group rounded-md transition-transform delay-150 ease-in-out hover:border-primary hover:text-accent-foreground"
      {...props}
    >
      <CardHeader className="relative px-6 py-4">
        <Ping className="absolute right-3 top-3" variant={dateVariant(datum.secretValidUntil)} />

        <CardTitle className="text-md">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative uppercase focus-visible:outline-none">
              {datum.name}
              <span className="absolute -right-6 top-0.5 hidden cursor-pointer border-gray-800 group-hover:block">
                <Icons.down className="h-5 w-5" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 translate-x-20 transform">
              <DropdownMenuItem onSelect={() => setShowUpdateDialog(true)}>Update secret</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={() => setShowDeleteAlert(true)}
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription className="mt-1.5 flex gap-5">
          <div className="flex items-center gap-2">
            <Icons.user strokeWidth={1.5} className="h-4 w-4" /> {datum.ownedBy}
          </div>
          <CardInfoRotation datum={datum} variant={dateVariant(datum.secretValidUntil)} />
        </CardDescription>
      </CardHeader>

      <UpdateSecretModal open={showUpdateDialog} onOpenChange={setShowUpdateDialog} data={datum} />

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this app?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
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
                  mutate('/api/keys');
                }
              }}
              className="bg-destructive/80 focus:ring-destructive"
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
    <div className={cn('grid min-h-max grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {data.map((datum: CardKeyProps) => (
        <Key datum={datum} key={datum.id} />
      ))}
      <Link href="/new">
        <Button className="h-full w-full border-dashed  dark:border-gray-600" variant="outline">
          <span className="inline-flex min-h-[65px] items-center gap-2 transition-colors duration-200 ease-in-out">
            <Icons.plus className="h-4 w-4" />
            Add a new key
          </span>
        </Button>
      </Link>
    </div>
  );
};

export { CardKeys };
