import { FC } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import moment from 'moment';
import { Icons } from '@/components/icons';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const cardInfoRotationVariants = tv({
  base: 'flex items-center gap-2',
  variants: {
    variant: {
      default: '',
      warning: 'text-orange-500 font-semibold',
      danger: 'text-red-600 font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const CardInfoRotation: FC<VariantProps<typeof cardInfoRotationVariants>> = ({ datum, className, variant }) => {
  return (
    <div className={cn(cardInfoRotationVariants({ variant, className }))}>
      <Icons.clock strokeWidth={1.5} className="h-4 w-4" />{' '}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-default">
            {moment(datum.secretValidUntil, 'YYYY-MM-DDThh:mm:ss.000Z').fromNow()}
          </TooltipTrigger>
          <TooltipContent side={'right'} sideOffset={10}>
            <p>{moment(datum.secret_valid_until).format('LLL')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CardInfoRotation;
