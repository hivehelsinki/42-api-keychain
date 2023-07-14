import { FC } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const pingVariants = tv({
  base: 'rounded-full h-3 w-3',
  variants: {
    variant: {
      default: 'bg-green-400',
      warning: 'bg-orange-400',
      danger: 'bg-red-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface PingProps extends VariantProps<typeof pingVariants> {}

const Ping: FC<PingProps> = ({ className, variant }) => {
  return (
    <div>
      <span
        className={cn(`animate-ping ${pingVariants({ variant, className })}`)}
      ></span>
      <span className={pingVariants({ variant, className })}></span>
    </div>
  );
};

export { Ping };
