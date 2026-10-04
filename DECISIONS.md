# Decisions

Every default taken or changed, one line each. The spec is docs/SPEC.md.

## Build (4 October 2026)

- Open decisions 1 to 11 of the spec: all on their defaults (pass marks 70/70/75%, 24-month validity, no score on the certificate, English only, AI badge shown, closed book with tab leaves recorded).
- Signatory (open decision 9): only Renan Devillières, OSS Ventures, until the Devoteam signatory is named in `lib/config/site.ts`. PDFs render on demand, so adding a name updates every certificate.
- Privacy page (open decision 7): controller, legal basis and contact are placeholders in `lib/config/site.ts`.
- Database driver: `pg` (node-postgres) instead of Neon's serverless driver. Same code runs against a local Postgres in tests, and it supports real transactions (used to lock an attempt while it is finalized). Neon accepts standard connections; `@vercel/functions` closes idle connections.
- Migrations run automatically before every build (`npm run build` runs `scripts/migrate.ts`), so nobody has to run `db:migrate` by hand. Without a database URL the step is skipped.
- Email through Resend's HTTP API with `fetch`, not the `resend` package: one request, one dependency fewer. Email stays off until `RESEND_API_KEY` and `EMAIL_FROM` exist.
- Fonts: Archivo through `next/font/google` for the site; static TTFs for the PDF (Regular, SemiBold, Bold, Condensed Bold at width 70, IBM Plex Mono Medium) fetched from Google Fonts into `assets/fonts/`.
- Framework preset and function region are set in `vercel.json` (`nextjs`, `fra1`), because the Vercel project had no framework preset.
- Vercel environment: SITE_PASSWORD, ADMIN_PASSWORD (generated), SESSION_SECRET (generated) and APP_URL set for Production and Preview; ENABLE_TEST_TRACK=true and BANK_SERVE=all on Preview only, so rehearsals work on previews before any question is validated.
- `bank:check` coverage: an error when the written (non-retired) bank cannot fill a cell, a warning when the served (validated) bank cannot. Otherwise every deploy would fail until the review is done.
- Banned-term check: "DiscoverY" is matched case-sensitively, so the ordinary word "discovery" passes.
- Test-wise pass (spec section 17, step 4): a deterministic cue solver (`lib/bank/testwise.ts`: longest option, words repeated from the stem, absolute words) instead of a second model, because a model cannot set aside domain knowledge. It answered 6 of 481 items from cues; those 6 were rewritten, now 0.
- Blind re-solve: 6 agents re-answered all 481 items without the key; 481 of 481 matched the key and none was rated ambiguous (2 or more). Agreement between models from the same family is weaker evidence than a human review, so the generators' own doubts are kept as reviewer notes (`content/review/notes.json`, 73 items) and shown as flags in `content/review/bank-review.md`.
- Bank: 481 items written (launch target), all `draft`. Exams on Production open once Renan validates items (`status: "validated"`); until then they show "This exam opens soon".
- A voided attempt keeps any certificate it produced; revoke the certificate separately if needed.
- The "Further reading" Medium link still points to the OSS Ventures publication page; swap in the exact essay URL when available (Medium blocks automated link checks).
- The pass-mark line on the result bars uses the fail red, to stand out from the ink bars.

## First deployment (4 October 2026)

- Renan's decision: Production serves the draft bank (`BANK_SERVE=all` on Production) so the three exams open now; he reviews and corrects questions afterwards. To serve only validated questions again, delete `BANK_SERVE` for Production in Vercel and redeploy.
