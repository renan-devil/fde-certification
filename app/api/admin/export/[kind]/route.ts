import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isAdmin } from '@/lib/auth/access';
import { listAttempts, listCertificates, questionStats } from '@/lib/admin/queries';
import { questionFlag, toCsv, FLAG_TEXT } from '@/lib/admin/stats';
import { allQuestions } from '@/lib/bank/load';
import { trackName } from '@/lib/config/tracks';
import { certificateStatus } from '@/lib/certs/status';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ kind: string }> }) {
  if (!isAdmin((await cookies()).get(ADMIN_COOKIE)?.value)) return new Response('Admin access required', { status: 401 });
  const { kind } = await params;
  let rows: (string | number | boolean | null | Date)[][];
  if (kind === 'attempts') {
    const list = await listAttempts();
    rows = [['started_at', 'first_name', 'last_name', 'email', 'organization', 'organization_type', 'track', 'status', 'score_pct', 'passed', 'correct', 'total', 'minutes', 'tab_leaves', 'void_reason', 'attempt_id'],
      ...list.map((a) => [a.startedAt, a.firstName, a.lastName, a.email, a.organization, a.organizationType, trackName(a.trackId), a.status,
        a.scorePct, a.passed, a.correctCount, a.totalCount, a.finishedAt ? Math.round((a.finishedAt.getTime() - a.startedAt.getTime()) / 60000) : null,
        a.focusLostCount, a.voidReason, a.id])];
  } else if (kind === 'certificates') {
    const list = await listCertificates();
    rows = [['certificate_number', 'full_name', 'email', 'organization', 'track', 'issued_at', 'expires_at', 'status', 'revoked_reason', 'score_pct'],
      ...list.map((c) => [c.id, c.fullName, c.email, c.organization, trackName(c.trackId), c.issuedAt, c.expiresAt, certificateStatus(c).text, c.revokedReason, c.scorePct])];
  } else if (kind === 'questions') {
    const stats = new Map((await questionStats()).map((s) => [s.questionId, s]));
    rows = [['question_id', 'status', 'served', 'correct', 'pct_correct', 'last_served', 'flag', 'stem'],
      ...allQuestions().map((q) => {
        const s = stats.get(q.id);
        const served = s?.served ?? 0, correct = s?.correct ?? 0;
        const f = questionFlag({ served, correct });
        return [q.id, q.status, served, correct, served ? Math.round((correct / served) * 100) : null, s?.lastServed ?? null, f ? FLAG_TEXT[f] : null, q.stem];
      })];
  } else {
    return new Response('Unknown export', { status: 404 });
  }
  return new Response(toCsv(rows), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="fde-${kind}-${new Date().toISOString().slice(0, 10)}.csv"` },
  });
}
