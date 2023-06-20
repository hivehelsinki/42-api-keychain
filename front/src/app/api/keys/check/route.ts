import { fetchToken, fetchAppInfo } from '@/lib/fortytwo';

export async function POST(req: Request) {
  const { client_id, client_secret } = await req.json();

  const res = await fetchToken(client_id, client_secret);

  if (!res.access_token) {
    return new Response('Invalid credentials', {
      status: 401,
    });
  }
  const infos = await fetchAppInfo(res);

  return new Response(JSON.stringify(infos), {
    status: 200,
  });
}
