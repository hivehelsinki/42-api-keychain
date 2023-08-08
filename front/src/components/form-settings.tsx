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
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z
  .object({
    slack_enabled: z.boolean(),
    slack_webhook_url: z.string().optional(),
  })
  .refine((sch) => sch.slack_enabled === false || sch.slack_webhook_url !== '', {
    path: ['slack_webhook_url'],
    message: 'Slack webhook url is required when slack notification is enabled',
  });

type ApiResp = z.infer<typeof formSchema>;

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return (await res.json()) as ApiResp;
};

interface formSettingsProps {}
const FormSettings: FC<formSettingsProps> = ({}) => {
  const { toast } = useToast();
  const { data, error, isLoading } = useSWR<ApiResp>('/api/settings', fetcher);

  const form = useForm<ApiResp>({
    resolver: zodResolver(formSchema),
  });

  // set default values from API.
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [form, data]);

  // handler for form submit
  const onSubmit = async (values: ApiResp) => {
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      toast({
        title: 'Settings updated',
        description: 'Your settings have been updated successfully.',
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    return <div className="flex max-w-[700px] flex-col gap-2">Failed to fetch settings from database.</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-[700px] flex-col gap-2">
        <FormField
          control={form.control}
          name="slack_enabled"
          render={({ field }) => (
            <div className="flex flex-col">
              <FormLabel className="font-bold uppercase">Slack notification</FormLabel>
              <p className="my-2 leading-7 text-muted-foreground">
                Receive notification on Slack when an app is about to be expired
              </p>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              <FormMessage />
            </div>
          )}
        />

        {form.watch('slack_enabled') && (
          <FormField
            control={form.control}
            name="slack_webhook_url"
            render={({ field }) => (
              <div className="mt-10 flex flex-col">
                <FormLabel className="font-bold uppercase">Slack Webhook</FormLabel>
                <p className="my-2 leading-7 text-muted-foreground">Your webhook url to send notification to Slack</p>
                <Input {...field} placeholder="https://hooks.slack.com/services/..." />
                <FormMessage />
              </div>
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
