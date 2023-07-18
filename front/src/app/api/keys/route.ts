import { getCurrentUser } from '@/lib/session';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const res = await fetch('http://localhost:5001/keys');
    const keys = await res.json();

    return new Response(JSON.stringify(keys));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const data = await req.json();

    const key = await fetch('http://localhost:5001/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        owned_by: user.login,
      }),
    });

    return new Response(JSON.stringify(key));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
