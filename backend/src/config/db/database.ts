import { Pool } from "pg";
import * as schema from "../../drizzle/schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // max pool size
  idleTimeoutMillis: 20000, // 20s
  connectionTimeoutMillis: 10000, // 10s
});

export const db = drizzle(pool, { schema });

export type Database = typeof db;

// Graceful shutdown
const closePool = async () => {
  console.log("\n📦 Closing database connections...");
  await pool.end();
  process.exit(0);
};

process.on("SIGINT", closePool);
process.on("SIGTERM", closePool);
