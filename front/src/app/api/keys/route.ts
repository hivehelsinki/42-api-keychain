import { getCurrentUser } from '@/lib/session';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const res = await fetch('http://localhost:5001/keys');
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await req.json();

  const res = await fetch('http://localhost:5001/keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      owned_by: user.login,
    }),
  });

  // TODO: check if key was created

  return new Response('ok', { status: 201 });
}
