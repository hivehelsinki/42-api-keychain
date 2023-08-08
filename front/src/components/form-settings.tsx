'use client';

import * as z from 'zod';
import useSWR from 'swr';

import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

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

type ApiResponse = z.infer<typeof formSchema>;

interface formSettingsProps {}
const FormSettings: FC<formSettingsProps> = ({}) => {
  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    if (!res.ok) {
      // throw new Error('Network res was not ok');
    }

    return (await res.json()) as ApiResponse;
  };

  const { data, error, isLoading } = useSWR<ApiResponse>(
    '/api/settings',
    fetcher
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      for (const [name, value] of Object.entries(data)) {
        form.setValue(
          name as 'slack_enabled' | 'slack_webhook_url',
          value as any
        );
      }
    }
  }, [form, data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      // TODO: toaster success
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex max-w-[700px] flex-col gap-2">
        <div className="flex flex-col">
          <Label className="font-bold uppercase">Slack notification</Label>
          <p className="my-2 leading-7 text-muted-foreground">
            Receive notification on Slack when an app is about to be expired
          </p>
          <Skeleton className="h-6 w-10 bg-gray-200" />
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

        {form.watch('slack_enabled') && (
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
        )}
        <Button className="mt-4" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default FormSettings;
