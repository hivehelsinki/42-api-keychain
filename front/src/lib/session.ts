import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

import User from '@/types/user';

export async function getCurrentUser() {
  const session: User | null = await getServerSession(authOptions);

  return session;
}
