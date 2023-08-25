import React, { FC } from 'react';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Icons } from '@/components/icons';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import CardKeyProps from '@/types/card-key';

const formSchema = z.object({
  id: z.number(),
  client_id: z.string(),
  client_secret: z.string().min(64, { message: 'Secret must be at least 64 characters long' }),
  secret_valid_until: z.string().optional(),
});

const errorMessageByStatus: { [key: number]: string } = {
  409: 'Key already exist in database',
  404: 'Application not found with this secret',
};

interface modalUpdateSecretProps {
  open: boolean;
  onOpenChange: any;
  data: CardKeyProps;
}

const UpdateSecretModal: FC<modalUpdateSecretProps> = ({ open, onOpenChange, data }) => {
  const [isValid, setIsValid] = React.useState<undefined | boolean>(undefined);
  const [keyName, setKeyName] = React.useState<string>('');
  const [httpCode, setHttpCode] = React.useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      client_id: data.clientId,
      client_secret: '',
      secret_valid_until: '',
    },
  });

  React.useEffect(() => {
    form.watch(async (_, { type }) => {
      if (type === 'change') {
        const { client_id, client_secret } = form.getValues();

        if (client_id.length >= 64 && client_secret.length >= 64) {
          const res = await fetch('/api/keys/check', {
            method: 'POST',
            body: JSON.stringify({ client_id, client_secret }),
          });

          if (!res?.ok) {
            setHttpCode(res.status);
            setIsValid(false);
            return;
          }

          try {
            const keyInfo = await res.json();
            setIsValid(true);
            setKeyName(keyInfo.appName);
            form.setValue('id', Number(keyInfo.appId), {
              shouldValidate: true,
            });

            form.setValue('secret_valid_until', new Date(keyInfo.secret_valid_until * 1000).toISOString(), {
              shouldValidate: true,
            });
          } catch (e) {
            console.error(e);
            setIsValid(false);
          }
        }
        if (isValid && (client_id.length < 64 || client_secret.length < 64)) {
          setIsValid(false);
        }
      }
    });
  }, [form, form.watch, isValid]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/keys/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });

    if (!res?.ok) {
      console.log('Something went wrong');
    } else {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-5/6 lg:w-[700px]">
        <div className="flex flex-col">
          <Label htmlFor="name" className="text-base font-bold uppercase">
            new secret for {data.name}
          </Label>
          <p className="my-2 text-sm leading-7 text-muted-foreground">
            Make changes to your app secret here. Click save when you&apos;re done.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-3">
              <FormField
                control={form.control}
                name="client_secret"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isValid && (
                <div className="mt-3 flex items-center gap-2 bg-green-100 py-4 pl-4 text-sm dark:bg-green-700">
                  <Icons.check className="h-4 w-4 text-green-600 dark:text-gray-200" />
                  <p className="dark:text-gray-200">
                    Application found under the name <b>{keyName}</b>.
                  </p>
                </div>
              )}

              {isValid === false && (
                <div className="mt-3 flex items-center gap-2 bg-red-100 py-4 pl-4 text-sm dark:bg-red-500">
                  <Icons.close className="h-4 w-4 text-red-600/80 dark:text-gray-200" />
                  <p className="dark:text-gray-200">{errorMessageByStatus[httpCode] || 'Something went wrong'}</p>
                </div>
              )}

              <div className="mt-5">
                <Button type="submit" className="w-full" disabled={!isValid}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSecretModal;
