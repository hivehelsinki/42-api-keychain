import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateVariant(date: string) {
  const formatDate = moment(date, 'YYYY-MM-DD');
  const formatNow = moment();

  const diff = formatDate.diff(formatNow, 'days');
  if (diff < 7) return 'danger';
  if (diff < 30) return 'warning';
  else return 'default';
}
