import { FC } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const pingVariants = tv({
  base: 'rounded-full h-2 w-2',
  variants: {
    variant: {
      default: 'bg-green-400',
      warning: 'bg-orange-400',
      danger: 'bg-red-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Ping: FC<VariantProps<typeof pingVariants>> = ({ className, variant }) => {
  return (
    <div>
      <span className={cn(`animate-ping ${pingVariants({ variant, className })}`)} />
      <span className={pingVariants({ variant, className })} />
    </div>
  );
};

export { Ping };
