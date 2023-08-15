import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface User {
    name: string;
  }
  export interface Session extends Omit<DefaultSession, 'user'> {
    login: string;
    user_id: number;
    image_url: string;
    admin: boolean;
  }

  export interface AdapterUser extends AdapterUser {
    staff?: boolean;
  }
}
