'use client';

import * as z from 'zod';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  slack_enabled: z.boolean(),
  slack_webhook_url: z.string().optional(),
});

interface formSettingsProps {}

const FormSettings: FC<formSettingsProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slack_enabled: false,
      slack_webhook_url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // POST logic here
    // handle errors
    // handle success
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
