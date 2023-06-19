import { fetchToken, fetchAppInfo } from '@/lib/fortytwo';

export async function POST(req: Request) {
  const { client_id, client_secret } = await req.json();
  console.log(client_id, client_secret);
  const token = await fetchToken(client_id, client_secret);
  if (!token) {
    return new Response('Invalid credentials', {
      status: 401,
    });
  }
  const infos = await fetchAppInfo(token);

  return new Response(JSON.stringify(infos), {
    status: 200,
  });
}