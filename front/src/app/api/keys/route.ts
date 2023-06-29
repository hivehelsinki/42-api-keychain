import { getCurrentUser } from '@/lib/session';

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await req.json();

  const res = await fetch('http://localhost:5001/keys', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      owned_by: user.login,
    }),
  });

  console.log(res);
}

export async function GET() {}
