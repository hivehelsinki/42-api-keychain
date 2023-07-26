import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
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
