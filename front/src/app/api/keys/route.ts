import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const keys = await prisma.keys.findMany({
      orderBy: { secret_valid_until: 'asc' },
    });

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

    const key = await prisma.keys.create({
      data: {
        ...data,
        owned_by: user.login,
      },
    });

    if (!key?.id) {
      return new Response(null, { status: 500 });
    }

    return new Response(JSON.stringify(key));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
