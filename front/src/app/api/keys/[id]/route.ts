import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const keyPatchSchema = z.object({
  id: z.number(),
  secret_valid_until: z.string(),
  client_secret: z.string().min(64, { message: 'Secret must be at least 64 characters long' }),
});

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  try {
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = keyPatchSchema.parse(json);

    const data = await prisma.Key.findMany({
      where: {
        id: Number(params.id),
      },
    });

    await prisma.Key.update({
      where: {
        id: Number(params.id),
      },
      data: {
        ...data[0],
        secretValidUntil: body.secret_valid_until,
        clientSecret: body.client_secret,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error);
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    console.log(error);
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  try {
    const { params } = routeContextSchema.parse(context);

    await prisma.Key.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error);
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
