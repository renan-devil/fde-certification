CREATE TABLE "attempt_items" (
	"attempt_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"question_id" text NOT NULL,
	"option_order" text[] NOT NULL,
	"selected_option_id" text,
	"flagged" boolean DEFAULT false NOT NULL,
	"is_correct" boolean,
	"answered_at" timestamp with time zone,
	CONSTRAINT "attempt_items_attempt_id_position_pk" PRIMARY KEY("attempt_id","position"),
	CONSTRAINT "attempt_items_attempt_question_uq" UNIQUE("attempt_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"track_id" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"organization" text NOT NULL,
	"organization_type" text NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deadline_at" timestamp with time zone NOT NULL,
	"finished_at" timestamp with time zone,
	"correct_count" integer,
	"total_count" integer NOT NULL,
	"score_pct" numeric(5, 2),
	"passed" boolean,
	"domain_scores" jsonb,
	"focus_lost_count" integer DEFAULT 0 NOT NULL,
	"bank_version" text NOT NULL,
	"void_reason" text
);
--> statement-breakpoint
CREATE TABLE "bank_gaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"track_id" text NOT NULL,
	"detail" text NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certificate_lookups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"requested_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certificates" (
	"id" text PRIMARY KEY NOT NULL,
	"attempt_id" uuid NOT NULL,
	"track_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"organization" text NOT NULL,
	"score_pct" numeric(5, 2) NOT NULL,
	"issued_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"revoked_reason" text,
	"email_sent_at" timestamp with time zone,
	CONSTRAINT "certificates_attempt_id_unique" UNIQUE("attempt_id")
);
--> statement-breakpoint
ALTER TABLE "attempt_items" ADD CONSTRAINT "attempt_items_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "attempt_items_question_idx" ON "attempt_items" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "attempts_email_track_idx" ON "attempts" USING btree ("email","track_id");--> statement-breakpoint
CREATE INDEX "certificate_lookups_email_idx" ON "certificate_lookups" USING btree ("email","requested_at");--> statement-breakpoint
CREATE INDEX "certificates_email_idx" ON "certificates" USING btree ("email");