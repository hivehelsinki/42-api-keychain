'use client';

import * as z from 'zod';
import useSWR from 'swr';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z
  .object({
    slack_enabled: z.boolean(),
    slack_webhook_url: z.string().optional(),
  })
  .refine(
    (schema) =>
      schema.slack_enabled === false || schema.slack_webhook_url !== '',
    {
      message:
        'Slack webhook url is required when slack notification is enabled',
      path: ['slack_webhook_url'],
    }
  );

interface formSettingsProps {}

const FormSettings: FC<formSettingsProps> = ({}) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/settings', fetcher);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slack_enabled: data?.slack_enabled === 'true' ? true : false,
      slack_webhook_url: data?.slack_webhook_url ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // POST logic here
    // handle errors
    // handle success
  }

  if (isLoading) {
    return (
      <div className="flex max-w-[700px] flex-col gap-2">
        <div className="flex flex-col">
          <Skeleton className="h-4 w-40 bg-gray-200" />
          <Skeleton className="my-2 h-4 w-80 bg-gray-200" />
          <Skeleton className="h-6 w-10 bg-gray-200" />
        </div>
        <div className="mt-10 flex flex-col">
          <Skeleton className="h-4 w-40 bg-gray-200" />
          <Skeleton className="my-2 h-4 w-80 bg-gray-200" />
          <Skeleton className="h-6 w-80 bg-gray-200" />
        </div>
        <Skeleton className="mt-4 h-12 w-full bg-gray-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex max-w-[700px] flex-col gap-2">
        Failed to fetch settings from database.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-[700px] flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="slack_enabled"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold uppercase">
                Slack notification
              </FormLabel>
              <p className="my-2 leading-7 text-muted-foreground">
                Receive notification on Slack when an app is about to be expired
              </p>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slack_webhook_url"
          render={({ field }) => (
            <FormItem className="mt-10 flex flex-col">
              <FormLabel className="font-bold uppercase">
                Slack Webhook
              </FormLabel>
              <p className="my-2 leading-7 text-muted-foreground">
                Your webhook url to send notification to slack
              </p>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://hooks.slack.com/services/..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default FormSettings;
