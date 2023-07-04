import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  // const isHome = req.nextUrl.pathname.match(/^\/$/);

  // if (isHome) {
  //   if (isAuth) {
  //     return NextResponse.redirect(new URL('/dashboard', req.url));
  //   }
  // }

  if (!isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/new'],
};
