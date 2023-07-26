import type { Key } from '@prisma/client';
import * as z from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

const keySchema = z.object({
  id: z.number(),
  name: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
  secret_valid_until: z.string(),
});

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const keys: Key[] | null = await prisma.Key.findMany({
      select: {
        id: true,
        name: true,
        clientId: true,
        ownedBy: true,
        secretValidUntil: true,
      },
      orderBy: { secretValidUntil: 'asc' },
    });

    return new Response(JSON.stringify(keys));
  } catch (error) {
    console.error(error);
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
    const body = keySchema.parse(data);

    const key: Key | null = await prisma.Key.create({
      data: {
        id: body.id,
        name: body.name,
        clientId: body.client_id,
        clientSecret: body.client_secret,
        secretValidUntil: body.secret_valid_until,
        ownedBy: user.login,
      },
      select: {
        id: true,
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
