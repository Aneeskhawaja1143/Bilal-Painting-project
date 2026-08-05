import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 *
 * Next.js dev mode hot-reloads modules on every file change, which would
 * normally create a brand new PrismaClient (and a new DB connection pool)
 * on every save. Stashing the instance on `globalThis` in development
 * avoids exhausting the connection limit on the Postgres/Supabase side.
 *
 * In production, a single instance is created once per server process.
 */

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
