import { sql } from 'drizzle-orm';
import { boolean, customType, index, integer, jsonb, numeric, pgTable, primaryKey, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Buffer }>({ dataType: () => 'bytea' });

export type DomainScores = Record<string, { correct: number; total: number }>;

export const attempts = pgTable('attempts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  trackId: text('track_id').notNull(),
  email: text('email').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  organization: text('organization').notNull(),
  organizationType: text('organization_type').notNull(),
  status: text('status').notNull().default('in_progress'), // in_progress, submitted, expired, voided
  startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  deadlineAt: timestamp('deadline_at', { withTimezone: true }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true }),
  correctCount: integer('correct_count'),
  totalCount: integer('total_count').notNull(),
  scorePct: numeric('score_pct', { precision: 5, scale: 2 }),
  passed: boolean('passed'),
  domainScores: jsonb('domain_scores').$type<DomainScores>(),
  focusLostCount: integer('focus_lost_count').notNull().default(0),
  bankVersion: text('bank_version').notNull(),
  voidReason: text('void_reason'),
}, (t) => [index('attempts_email_track_idx').on(t.email, t.trackId)]);

export const attemptItems = pgTable('attempt_items', {
  attemptId: uuid('attempt_id').notNull().references(() => attempts.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  questionId: text('question_id').notNull(),
  optionOrder: text('option_order').array().notNull(),
  selectedOptionId: text('selected_option_id'),
  flagged: boolean('flagged').notNull().default(false),
  isCorrect: boolean('is_correct'),
  answeredAt: timestamp('answered_at', { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.attemptId, t.position] }),
  unique('attempt_items_attempt_question_uq').on(t.attemptId, t.questionId),
  index('attempt_items_question_idx').on(t.questionId),
]);

export const certificates = pgTable('certificates', {
  id: text('id').primaryKey(),
  attemptId: uuid('attempt_id').notNull().unique().references(() => attempts.id),
  trackId: text('track_id').notNull(),
  email: text('email').notNull(),
  fullName: text('full_name').notNull(),
  organization: text('organization').notNull(),
  scorePct: numeric('score_pct', { precision: 5, scale: 2 }).notNull(),
  issuedAt: timestamp('issued_at', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  revokedReason: text('revoked_reason'),
  emailSentAt: timestamp('email_sent_at', { withTimezone: true }),
}, (t) => [index('certificates_email_idx').on(t.email)]);

/** Rate limit for the "find my certificates" page (3 requests per email per hour). */
export const certificateLookups = pgTable('certificate_lookups', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull(),
  requestedAt: timestamp('requested_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('certificate_lookups_email_idx').on(t.email, t.requestedAt)]);

/** Missing bank cells reported when a start was refused, shown to admins. */
export const bankGaps = pgTable('bank_gaps', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  trackId: text('track_id').notNull(),
  detail: text('detail').notNull(),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
});

/** Community directory: one page per person, added by themselves (docs: README "Humans"). */
export const humans = pgTable('humans', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  organization: text('organization').notNull(),
  communityRole: text('community_role').notNull(),
  bio: text('bio').notNull().default(''),
  linkedinUrl: text('linkedin_url'),
  email: text('email').notNull(), // private: links certificates, never shown
  photo: bytea('photo'),
  photoType: text('photo_type'),
  editTokenHash: text('edit_token_hash').notNull(),
  hidden: boolean('hidden').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index('humans_email_idx').on(t.email)]);
