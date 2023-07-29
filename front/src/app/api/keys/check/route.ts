import { fetchToken, fetchAppInfo } from '@/lib/fortytwo';
import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { client_id, client_secret } = await req.json();
  const user = await getCurrentUser();

  if (!user) {
    return new Response(null, { status: 403 });
  }

  const key = await prisma.Key.findMany({
    where: {
      clientId: client_id,
    },
  });

  if (key.length > 0) {
    console.log(client_id);
    console.log('==============================key already exists');
    console.log(key);
    return new Response(null, {
      status: 409,
    });
  }

  const res = await fetchToken(client_id, client_secret);

  if (!res.access_token) {
    return new Response(null, {
      status: 404,
    });
  }
  const infos = await fetchAppInfo(res);

  return new Response(JSON.stringify(infos), {
    status: 200,
  });
}
