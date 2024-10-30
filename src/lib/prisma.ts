import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	(() => {
		const pool = new Pool({ connectionString: process.env.DATABASE_URL });
		const adapter = new PrismaNeon(pool);
		return new PrismaClient({ adapter });
	})();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
