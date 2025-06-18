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
        url: (() => {
          const baseUrl = process.env.DATABASE_URL;
          if (!baseUrl) return undefined;
          
          const finalUrl = baseUrl +
            (baseUrl.includes("prepareThreshold")
              ? ""
              : baseUrl.includes("?")
              ? "&prepareThreshold=0"
              : "?prepareThreshold=0");
              
          // 调试日志 - 生产环境也打印，方便排查
          console.log("🔍 Database URL processing:");
          console.log("Original:", baseUrl?.replace(/:[^:@]*@/, ":***@"));
          console.log("Final:", finalUrl?.replace(/:[^:@]*@/, ":***@"));
          
          return finalUrl;
        })(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
