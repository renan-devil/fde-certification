import { z } from 'zod';

const schema = z.object({
  SITE_PASSWORD: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters (use: openssl rand -hex 32)'),
  APP_URL: z.string().url().transform((s) => s.replace(/\/+$/, '')),
  DATABASE_URL: z.string().min(1),
  BANK_SERVE: z.enum(['validated', 'all']).default('validated'),
  ENABLE_TEST_TRACK: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_REPLY_TO: z.string().optional(),
});

export type Env = z.infer<typeof schema>;
let cached: Env | null = null;

/** Validated environment. Throws a readable message naming each missing variable. */
export function env(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse({
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL ?? process.env.POSTGRES_URL,
    BANK_SERVE: process.env.BANK_SERVE || undefined,
  });
  if (!parsed.success) {
    const names = parsed.error.issues.map((i) => `${i.path.join('.')} (${i.message})`).join(', ');
    throw new Error(`Missing or invalid environment variables: ${names}. See .env.example and README.md.`);
  }
  cached = parsed.data;
  return cached;
}

export function emailEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export function appUrl(): string {
  return (process.env.APP_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
}
