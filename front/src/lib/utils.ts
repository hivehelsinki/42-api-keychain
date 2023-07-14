import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateVariant(date: string) {
  const a = moment(date, 'YYYY-MM-DD');
  const b = moment();

  const diff = a.diff(b, 'days');
  if (diff < 7) return 'danger';
  if (diff < 30) return 'warning';
  else return 'default';
}
