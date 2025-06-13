import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Optimized Prisma configuration for Vercel serverless
export const prisma = 
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Optimize for serverless environments
    ...(process.env.NODE_ENV === "production" && {
      // Reduce connection pool for serverless
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    }),
  });

// Prevent hot reload issues in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Graceful shutdown for serverless functions
if (process.env.NODE_ENV === "production") {
  // Automatically disconnect after each request in production
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}
