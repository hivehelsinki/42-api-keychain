import { FC } from 'react';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import CardKeyProps from '@/types/card-key';

const formSchema = z.object({
  id: z.number(),
  client_secret: z.string().min(64, { message: 'Secret must be at least 64 characters long' }),
});

interface modalUpdateSecretProps {
  open: boolean;
  onOpenChange: any;
  data: CardKeyProps;
}

const UpdateSecretModal: FC<modalUpdateSecretProps> = ({ open, onOpenChange, data }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data.id,
      client_secret: '',
    },
  });

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
      <DialogContent className="sm:max-w-[425px]">
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
              <div className="mt-5">
                <Button type="submit" className="w-full">
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
