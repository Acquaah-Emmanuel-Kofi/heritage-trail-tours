import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from 'dotenv';

config({ path: '.env.local' });

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local.");
  }

  if (!dbInstance) {
    const client = postgres(process.env.DATABASE_URL, { prepare: false });
    dbInstance = drizzle(client);
  }

  return dbInstance;
}
