import { PrismaClient } from "@prisma/client";

// Singleton — in dev, Next.js hot-reload would otherwise spawn a new client on
// every reload and exhaust the database connection pool. Reuse a global instance.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
