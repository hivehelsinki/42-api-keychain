import { getCurrentUser } from '@/lib/session';
import { z } from 'zod';

const postSchema = z.object({
  url: z.string(),
  service: z.string(),
});

async function sendRequest(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return response.status;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const data = await req.json();
    const body = postSchema.parse(data);

    const payload = {
      [body.service === 'discord' ? 'content' : 'text']: 'Keychain: testing URI.',
    };

    const status = await sendRequest(body.url, payload);

    return new Response(null, { status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
