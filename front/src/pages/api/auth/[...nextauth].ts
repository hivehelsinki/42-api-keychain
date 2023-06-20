import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth';

// could add a check here to make sure all env vars are set
// if (!process.env.SECRET) throw new Error('SECRET is not set');

export default NextAuth(authOptions);
