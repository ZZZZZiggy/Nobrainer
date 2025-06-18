import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        // 强制在本地连接字符串里禁用 prepared statements
        url: process.env.DATABASE_URL
          ? process.env.DATABASE_URL +
            (process.env.DATABASE_URL.includes("prepareThreshold")
              ? ""
              : process.env.DATABASE_URL.includes("?")
              ? "&prepareThreshold=0"
              : "?prepareThreshold=0")
          : undefined,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
