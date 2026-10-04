import 'server-only';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { attachDatabasePool } from '@vercel/functions';
import * as schema from './schema';

export function databaseUrl(): string | undefined {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
}

function create() {
  const url = databaseUrl();
  if (!url) throw new Error('DATABASE_URL is not set: connect the Neon database in Vercel (README.md).');
  const pool = new Pool({ connectionString: url, max: 5, idleTimeoutMillis: 10_000 });
  pool.on('error', (e) => console.error('Postgres pool error', e));
  attachDatabasePool(pool);
  return drizzle(pool, { schema });
}

type Db = ReturnType<typeof create>;
const g = globalThis as unknown as { __fdeDb?: Db };

export function db(): Db {
  if (!g.__fdeDb) g.__fdeDb = create();
  return g.__fdeDb;
}

export type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];
export { schema };
