import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const secret = process.env.SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: secret });
  const isAuth = !!token;

  if (!isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/new', '/settings'],
};
