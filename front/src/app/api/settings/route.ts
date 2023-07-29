import type { Setting } from '@prisma/client';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const data = await prisma.Setting.findMany();
    const settings = data.reduce((acc: any, row: Setting) => {
      acc[row.settingKey] = row.settingValue;
      return acc;
    }, {});

    return new Response(JSON.stringify(settings));
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
