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

    // const res = await fetch(`http://localhost:5001/keys/${params.id}`, {
    //   method: 'DELETE',
    // });

    await prisma.keys.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
