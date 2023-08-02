import { FC } from 'react';

import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface modalUpdateSecretProps {
  open: boolean;
  onOpenChange: any;
  data: any;
}

const ModalUpdateSecret: FC<modalUpdateSecretProps> = ({
  open,
  onOpenChange,
  data,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col">
          <Label htmlFor="name" className="text-base font-bold uppercase">
            new secret for {data.name}
          </Label>
          <p className="my-2 text-sm leading-7 text-muted-foreground">
            Make changes to your app secret here. Click save when you&apos;re
            done.
          </p>
          <Input id="name" className="col-span-3" />
        </div>

        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateSecret;
