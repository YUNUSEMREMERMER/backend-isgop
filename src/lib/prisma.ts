import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: env.databaseUrl,
      },
    },
  });

export const prisma = global.prisma ?? createPrismaClient();

if (env.nodeEnv !== "production") {
  global.prisma = prisma;
}
