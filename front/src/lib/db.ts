import { PrismaClient } from '@prisma/client';

var globalForPrisma: any = { prisma: null };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
