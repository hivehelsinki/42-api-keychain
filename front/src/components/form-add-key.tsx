'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
  client_id: z
    .string()
    .trim()
    .min(64, { message: 'UID must be at least 64 characters long' }),
  client_secret: z
    .string()
    .trim()
    .min(64, { message: 'Secret must be at least 64 characters long' }),
  secret_valid_until: z.date().optional(),
  name: z.string().optional(),
});

const FormAddKey = () => {
  const [isValid, setIsValid] = React.useState(false);
  const { watch, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client_id: '',
      client_secret: '',
      secret_valid_until: new Date(),
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    fetch('/api/keys', {
      method: 'POST',
      body: JSON.stringify(values),
    });
  }

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        const { client_id, client_secret } = form.getValues();
        if (client_id.length >= 64 && client_secret.length >= 64) {
          setIsValid(true);
        }
        if (isValid && (client_id.length < 64 || client_secret.length < 64)) {
          setIsValid(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
          name="secret_valid_until"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
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
