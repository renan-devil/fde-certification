// Creates or updates the database tables. Runs before every build (npm run build) and by hand
// with npm run db:migrate. Skips quietly when no database is configured.
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.POSTGRES_URL_NON_POOLING ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

async function main() {
  if (!url) {
    console.warn('migrate: no DATABASE_URL, skipping database migrations.');
    return;
  }
  const pool = new Pool({ connectionString: url, max: 1 });
  try {
    await migrate(drizzle(pool), { migrationsFolder: 'drizzle' });
    console.log('migrate: database is up to date.');
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error('migrate failed:', e);
  process.exit(1);
});
