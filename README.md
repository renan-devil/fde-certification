# FDE School certification site

Course material and timed certification exams for the FDE School, by Devoteam and OSS Ventures. The full specification is in `docs/SPEC.md`; every default taken is listed in `DECISIONS.md`.

Live site: https://fde-certification.vercel.app (Vercel project `fde-certification`, team Devillieres). Every push to `main` redeploys it in about a minute.

## How it works, in one paragraph

One Next.js application on Vercel (Frankfurt) and one Postgres database on Neon (Frankfurt). Course material and the question bank are JSON files in `content/`, versioned in git. A shared password protects the site; certificate verification pages and PDFs are public. The server draws each exam at random from the bank, runs the clock, scores it and issues the certificate; the browser never receives the answer key.

## Everyday tasks

You change anything by asking Claude Code; it edits the files, pushes to `main`, and Vercel republishes. What it changes, for each request:

- **Add a resource.** Put the PDF in `public/resources/` (under 20 MB; host videos elsewhere, unlisted), then in `content/resources.json` set the item's `href` (for example `/resources/day-1-slides.pdf`) and `status` to `available`.
- **Change a pass mark, duration or validity.** Edit the track in `lib/config/tracks.ts` (`passMark`, `durationMinutes`, `cooldownHours`, `validityMonths`).
- **Change the site password.** In Vercel: Settings → Environment Variables → `SITE_PASSWORD` → edit, then Deployments → Redeploy. Everyone has to enter the new password; old cookies stop working by themselves.
- **Rotate the secret.** Generate a new one with `openssl rand -hex 32` (prints 64 random characters), put it in `SESSION_SECRET`, redeploy. Everyone, including admins and people mid-exam, must sign in again, so do it between cohorts.
- **Revoke a certificate.** Admin → Certificates → Revoke (a reason is required). Its verification page then says it was revoked and its PDF stops downloading. "Restore" undoes it.
- **Read question statistics.** Admin → Questions: times served, percent correct, last served. After 10 servings, a question below 25% correct is flagged "check the answer key or the wording", above 95% "too easy for its tier". Export the CSV and ask Claude Code to review the flagged items.
- **Answer a deletion request.** Admin → Data → "Delete everything for an email" (type the email twice). For an access request, filter Admin → Attempts and Certificates by the email and export the CSVs.
- **Reset a participant whose laptop died.** Admin → Attempts → Void attempt (with a reason). They can start again at once; a voided attempt does not count for the 24-hour cooldown.
- **Clean up after a rehearsal.** Use `@example.com` emails during rehearsals, then Admin → Data → "Delete test data".

The admin area is at `/admin` (it asks for the site password first, then the admin password).

## Before the exams open: validate the question bank

All 481 questions are drafts. Production serves only questions marked `validated`, so each exam shows "This exam opens soon" until enough of its questions are validated. Admin → Overview shows, per track, which cells are ready.

1. Read `content/review/bank-review.md` (or the `.csv` next to it). Each question shows the key (✔), the explanation, the source and any flags. Flags include the question writers' own doubts.
2. The review protocol in the spec: every tier-1 question (the executives see them), every flagged question, and a random 10% of the rest.
3. Send your corrections to Claude Code. It applies them and sets `status: "validated"` and `reviewedBy: "renan"`.

Emergency switch: setting `BANK_SERVE=all` in Vercel serves the drafts too. Preview deployments already use it, together with a hidden 5-question, 2-minute rehearsal track at `/exam/test`.

## Environment variables (Vercel → Settings → Environment Variables)

| Name | What it is |
|---|---|
| `SITE_PASSWORD` | The password participants type (`fdecompany`). |
| `ADMIN_PASSWORD` | The admin password. |
| `SESSION_SECRET` | 64 random characters that sign every cookie. |
| `APP_URL` | The public address, used in PDFs, QR codes and links. Update it if you add a custom domain. |
| `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | Added by the Neon integration. |
| `BANK_SERVE` | `all` serves draft questions (Preview only by default). |
| `ENABLE_TEST_TRACK` | `true` adds the rehearsal track (Preview only). Never on Production. |
| `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO` | Optional email. Once set, certificates are emailed and the "Find my certificates" page appears. |

## Optional: email and a custom domain

- **Email:** create a Resend account, verify a sending domain (Resend shows the DNS records to add), create an API key, set the three email variables, redeploy.
- **Custom domain:** Vercel → Settings → Domains → add for example `certification.yourdomain.com`, create the DNS record Vercel shows, then update `APP_URL` and redeploy.

## For developers

```
npm install
cp .env.example .env.local   # fill in values; a local Postgres works for DATABASE_URL
npm run db:migrate           # create the tables
npm run dev                  # http://localhost:3000
npm test                     # unit tests (database tests run when DATABASE_URL is set)
npm run bank:check           # validate the question bank (also part of the tests)
npm run bank:export          # write content/review/bank-review.md and .csv
npm run bank:stats           # coverage table against the blueprint
```

Layout: `app/` pages and routes, `lib/` logic (exam engine in `lib/exam/`, bank in `lib/bank/`, certificates in `lib/certs/`), `content/` JSON content, `drizzle/` database migrations (`npm run db:generate` after changing `lib/db/schema.ts`), `tests/` Vitest tests.
