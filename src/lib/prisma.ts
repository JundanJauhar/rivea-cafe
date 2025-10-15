import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` in development to persist between module reloads
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.__prisma = prisma;
