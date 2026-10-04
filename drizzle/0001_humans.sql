CREATE TABLE "humans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"organization" text NOT NULL,
	"community_role" text NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"linkedin_url" text,
	"email" text NOT NULL,
	"photo" "bytea",
	"photo_type" text,
	"edit_token_hash" text NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "humans_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "humans_email_idx" ON "humans" USING btree ("email");