'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import React from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  id: z.number(),
  client_id: z
    .string()
    .trim()
    .min(64, { message: 'UID must be at least 64 characters long' }),
  client_secret: z
    .string()
    .trim()
    .min(64, { message: 'Secret must be at least 64 characters long' }),
  secret_valid_until: z.string().optional(),
  name: z.string().optional(),
});

const FormAddKey = () => {
  const [isValid, setIsValid] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      client_id: '',
      client_secret: '',
      secret_valid_until: '',
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // fetch('/api/keys', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // });
  }

  React.useEffect(() => {
    const subscription = form.watch(async (_, { type }) => {
      if (type === 'change') {
        const { client_id, client_secret } = form.getValues();
        if (client_id.length >= 64 && client_secret.length >= 64) {
          const res = await fetch('/api/keys/check', {
            method: 'POST',
            body: JSON.stringify({ client_id, client_secret }),
          });
          try {
            const keyInfo = await res.json();
            console.log(keyInfo);
            setIsValid(true);
            // TODO: Add label success with info
            form.setValue('id', Number(keyInfo.appId), {
              shouldValidate: true,
            });
            form.setValue('name', keyInfo.appName, { shouldValidate: true });
            form.setValue(
              'secret_valid_until',
              new Date(keyInfo.secret_valid_until * 1000)
                .toISOString()
                .split('T')[0],
              {
                shouldValidate: true,
              }
            );
          } catch (e) {
            // TODO: Add error label
            setIsValid(false);
          }
        }
        if (isValid && (client_id.length < 64 || client_secret.length < 64)) {
          setIsValid(false);
        }
      }
    });

    // return () => subscription.unsubscribe();
  }, [form, form.watch, isValid]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client_secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Secret</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secret_valid_until"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-6" type="submit" disabled={!isValid}>
          Add key
        </Button>
      </form>
    </Form>
  );
};

export { FormAddKey };
