import NextAuth from 'next-auth';
import FortyTwoProvider from 'next-auth/providers/42-school';
import type { FortyTwoProfile } from 'next-auth/providers/42-school';

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    FortyTwoProvider({
      clientId: process.env.FT_UID as string,
      clientSecret: process.env.FT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days hours
  },
  callbacks: {
    async signIn({ profile, user }: { profile: FortyTwoProfile; user: any }) {
      if (!profile || !user) {
        return false;
      }

      // check user is staff
      if (!profile['staff?']) {
        return false;
      }

      // check user is from your campus
      const campusId = profile.campus_users.find((cu) => cu.is_primary)?.campus_id as number;
      if (campusId.toString() !== process.env.CAMPUS_ID) return false;

      return user;
    },
    async jwt({ token, profile }: { token: any; profile: FortyTwoProfile }) {
      if (profile) {
        token.user_id = profile.id;
        token.login = profile.login;
        token.image_url = profile.image.link;
        token.admin = profile['staff?'];
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      delete session.user;
      session.login = token.login;
      session.user_id = token.user_id;
      session.image_url = token.image_url;
      session.admin = token.admin;

      return session;
    },
    callbacks: {
      async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
  },
};

export default NextAuth(authOptions);
