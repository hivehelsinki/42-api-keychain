import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const pingVariants = tv({
  base: 'rounded-full h-4 w-4',
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

const Ping = ({ className, variant }: PingProps) => {
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
