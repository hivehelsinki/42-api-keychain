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
      if (row.settingValue === 'true' || row.settingValue === 'false') {
        acc[row.settingKey] = row.settingValue === 'true';
        return acc;
      } else {
        acc[row.settingKey] = row.settingValue;
      }
      return acc;
    }, {});

    return new Response(JSON.stringify(settings));
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    const data = await request.json();

    for (const key in data) {
      const value =
        typeof data[key] === 'boolean' ? data[key].toString() : data[key];
      await prisma.Setting.update({
        where: {
          settingKey: key,
        },
        data: {
          settingValue: value,
        },
      });
    }

    return new Response();
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
