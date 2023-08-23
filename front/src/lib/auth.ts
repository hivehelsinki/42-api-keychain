// @ts-nocheck
import type { NextAuthOptions } from 'next-auth';
import FortyTwoProvider from 'next-auth/providers/42-school';
import type { FortyTwoProfile } from 'next-auth/providers/42-school';

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    FortyTwoProvider<FortyTwoProfile>({
      clientId: process.env.FT_UID as string,
      clientSecret: process.env.FT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days hours
  },
  pages: {
    error: '/error',
  },
  callbacks: {
    signIn({ user, profile }) {
      if (!profile || !user) {
        return false;
      }

      // check user is staff
      if (!profile['staff?']) {
        return false;
      }

      // check user is from your campus
      const campusId = profile.campus_users.find((cu) => cu.is_primary)?.campus_id as number;
      return campusId.toString() === process.env.CAMPUS_ID;
    },
    jwt({ token, profile }) {
      if (profile) {
        token.user_id = profile.id;
        token.login = profile.login;
        token.image_url = profile.image?.link;
        token.admin = profile['staff?'];
      }

      return token;
    },
    session({ session, token }) {
      delete session.user;
      session.login = token.login as string;
      session.user_id = token.user_id as number;
      session.image_url = token.image_url as string;
      session.admin = token.admin as boolean;

      return session;
    },
    redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

// export default NextAuth(authOptions);
