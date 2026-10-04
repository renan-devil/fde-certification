'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Band } from '@/components/Band';
import type { OptionId } from '@/lib/bank/schema';
import type { AnswerMap, RunnerQuestion } from '@/lib/exam/attempts';
import { focusLossAction, saveAnswerAction, submitAction } from './actions';

type Props = {
  attemptId: string;
  trackName: string;
  questions: RunnerQuestion[];
  initialAnswers: AnswerMap;
  serverNow: number;
  deadline: number;
};

const LETTERS = ['A', 'B', 'C', 'D'];
const blank = { o: null, f: false };

function formatClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(h ? 2 : 1, '0');
  return `${h ? `${h}:` : ''}${mm}:${String(sec).padStart(2, '0')}`;
}

export function Runner({ attemptId, trackName, questions, initialAnswers, serverNow, deadline }: Props) {
  const storageKey = `fde_attempt_${attemptId}`;
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers);
  const answersRef = useRef(answers);
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(deadline - serverNow);
  const [unsaved, setUnsaved] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const confirmRef = useRef<HTMLDialogElement>(null);
  const submittedRef = useRef(false);
  const retryTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const q = questions[index];
  const total = questions.length;
  const answeredCount = questions.filter((x) => answers[x.id]?.o).length;
  const flaggedCount = questions.filter((x) => answers[x.id]?.f).length;

  const remember = useCallback((next: AnswerMap) => {
    answersRef.current = next;
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* storage full or disabled */ }
  }, [storageKey]);

  // Saves one answer; failed saves retry with backoff until they succeed or the attempt closes.
  const persist = useCallback((questionId: string, attempt = 0) => {
    clearTimeout(retryTimers.current[questionId]);
    const a = answersRef.current[questionId] ?? blank;
    setUnsaved((s) => new Set(s).add(questionId));
    saveAnswerAction(attemptId, questionId, a.o, a.f)
      .then((res) => {
        if (res.ok || res.reason !== 'closed') {
          setUnsaved((s) => { const n = new Set(s); n.delete(questionId); return n; });
          return;
        }
        // Closed: the deadline passed. Submitting finalizes and moves on.
        setUnsaved((s) => { const n = new Set(s); n.delete(questionId); return n; });
      })
      .catch(() => {
        const delay = Math.min(15000, 1000 * 2 ** attempt);
        retryTimers.current[questionId] = setTimeout(() => persist(questionId, attempt + 1), delay);
      });
  }, [attemptId]);

  const update = useCallback((questionId: string, change: Partial<{ o: OptionId | null; f: boolean }>) => {
    const next = { ...answersRef.current, [questionId]: { ...(answersRef.current[questionId] ?? blank), ...change } };
    remember(next);
    setAnswers(next);
    persist(questionId);
  }, [persist, remember]);

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    for (let i = 0; i < 6; i++) {
      try {
        await submitAction(attemptId, answersRef.current);
        try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
        window.location.assign(`/attempt/${attemptId}/result`);
        return;
      } catch {
        await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
      }
    }
    submittedRef.current = false;
    setSubmitting(false);
    setAnnouncement('Your answers could not be sent. Check your connection and press Submit answers again.');
  }, [attemptId, storageKey]);

  // On load: the server's answers are the truth; answers kept in this browser fill any gap.
  useEffect(() => {
    let local: AnswerMap = {};
    try { local = JSON.parse(localStorage.getItem(storageKey) ?? '{}'); } catch { /* ignore */ }
    const merged: AnswerMap = { ...initialAnswers };
    const gaps: string[] = [];
    for (const x of questions) {
      const server = initialAnswers[x.id] ?? blank;
      const mine = local[x.id];
      if (mine && !server.o && !server.f && (mine.o || mine.f)) {
        merged[x.id] = { o: mine.o ?? null, f: Boolean(mine.f) };
        gaps.push(x.id);
      }
    }
    remember(merged);
    if (gaps.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time merge with this browser's copy
      setAnswers(merged);
      gaps.forEach((id) => persist(id));
    }
    const firstOpen = questions.findIndex((x) => !merged[x.id]?.o);
    if (firstOpen > 0) setIndex(firstOpen);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // The server is the only clock: count down from its deadline, corrected for this device's clock offset.
  useEffect(() => {
    const offset = serverNow - Date.now();
    let warned5 = deadline - serverNow <= 5 * 60_000;
    let warned1 = deadline - serverNow <= 60_000;
    const tick = () => {
      const left = deadline - (Date.now() + offset);
      setRemaining(left);
      if (!warned5 && left <= 5 * 60_000) { warned5 = true; setAnnouncement('5 minutes left'); }
      if (!warned1 && left <= 60_000) { warned1 = true; setAnnouncement('1 minute left'); }
      if (left <= 0) submit();
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [deadline, serverNow, submit]);

  // Record leaving the exam tab (shown to admins, never blocking).
  useEffect(() => {
    const onVis = () => { if (document.visibilityState === 'hidden') focusLossAction(attemptId).catch(() => {}); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [attemptId]);

  // Keyboard: 1–4 or A–D select, arrows move, F flags.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || submitting) return;
      if (paletteOpen || confirmRef.current?.open) return;
      const t = e.target as HTMLElement;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      const k = e.key.toLowerCase();
      const pick = ['1', '2', '3', '4'].indexOf(k) >= 0 ? Number(k) - 1 : ['a', 'b', 'c', 'd'].indexOf(k);
      if (pick >= 0 && q.options[pick]) { e.preventDefault(); update(q.id, { o: q.options[pick].id }); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); setIndex((i) => Math.min(total - 1, i + 1)); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setIndex((i) => Math.max(0, i - 1)); }
      else if (k === 'f') { e.preventDefault(); update(q.id, { f: !(answersRef.current[q.id]?.f) }); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, total, update, paletteOpen, submitting]);

  const current = answers[q.id] ?? blank;
  const warning = remaining <= 5 * 60_000;
  const unanswered = total - answeredCount;

  return (
    <div className="min-h-screen">
      <Band small />
      <div className="sticky top-0 z-10 border-b border-gauge bg-paper">
        <div className="mx-auto flex max-w-[720px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3">
          <div>
            <p className="font-semibold">{trackName}</p>
            <p className="tnum text-15 text-steel">Question {index + 1} of {total}. {answeredCount} answered.</p>
          </div>
          <p className={`display tnum text-34 ${warning ? 'text-fail' : ''}`} aria-label={`Time left ${formatClock(remaining)}`}>
            {formatClock(remaining)}
          </p>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>

      <main className="mx-auto max-w-[720px] px-4 py-8">
        <h1 className="sr-only">Question {index + 1}</h1>
        <p className="text-21" id="stem">{q.stem}</p>
        {current.f && <p className="mt-2 text-15 text-steel">Flagged for review.</p>}
        <div role="radiogroup" aria-labelledby="stem" className="mt-6 space-y-3">
          {q.options.map((o, i) => {
            const selected = current.o === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => update(q.id, { o: o.id })}
                className={`option-fill flex w-full items-start gap-4 border p-4 text-left ${selected ? 'border-ink bg-marker' : 'border-gauge hover:border-ink'}`}
              >
                <span className={`tnum flex h-7 w-7 shrink-0 items-center justify-center border text-15 font-semibold ${selected ? 'border-ink' : 'border-gauge'}`} aria-hidden>
                  {LETTERS[i]}
                </span>
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>
        {unsaved.size > 0 && <p className="mt-3 text-15 text-steel" role="status">Not saved yet, retrying</p>}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gauge pt-4">
          <div className="flex gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>Previous</button>
            <button type="button" className="btn btn-secondary" aria-pressed={current.f} onClick={() => update(q.id, { f: !current.f })}>
              {current.f ? 'Remove flag' : 'Flag for review'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setIndex((i) => Math.min(total - 1, i + 1))} disabled={index === total - 1}>Next</button>
          </div>
          <div className="flex gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => setPaletteOpen(true)} aria-haspopup="dialog">Questions</button>
            <button type="button" className="btn" onClick={() => confirmRef.current?.showModal()} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit answers'}
            </button>
          </div>
        </div>
        <p className="mt-6 text-13 text-steel">Keys: 1 to 4 or A to D choose, left and right arrows move, F flags.</p>
      </main>

      {paletteOpen && (
        <Palette
          questions={questions}
          answers={answers}
          index={index}
          onPick={(i) => { setIndex(i); setPaletteOpen(false); }}
          onClose={() => setPaletteOpen(false)}
        />
      )}

      <dialog ref={confirmRef} aria-labelledby="confirm-h" className="m-auto max-w-md border border-ink p-6 backdrop:bg-ink/40">
        <h2 id="confirm-h" className="text-21 font-semibold">Submit your answers?</h2>
        <p className="mt-2">
          You have {unanswered} unanswered and {flaggedCount} flagged question{flaggedCount === 1 ? '' : 's'}. Submit now?
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn btn-secondary" autoFocus onClick={() => confirmRef.current?.close()}>Keep working</button>
          <button type="button" className="btn" onClick={() => { confirmRef.current?.close(); submit(); }}>Submit answers</button>
        </div>
      </dialog>
    </div>
  );
}

function Palette({ questions, answers, index, onPick, onClose }: {
  questions: RunnerQuestion[]; answers: AnswerMap; index: number; onPick: (i: number) => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="palette-h"
      className="ml-auto mr-0 h-full max-h-none w-full max-w-sm border-l border-ink p-6 shadow-2xl backdrop:bg-ink/30">
      <div className="flex items-center justify-between">
        <h2 id="palette-h" className="text-21 font-semibold">Questions</h2>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-13 text-steel">
        <li><span className="mr-1 inline-block h-3 w-3 border border-gauge align-middle" />Unanswered</li>
        <li><span className="mr-1 inline-block h-3 w-3 bg-ink align-middle" />Answered</li>
        <li><span className="mr-1 inline-block h-3 w-3 bg-marker align-middle" />Flagged</li>
        <li><span className="mr-1 inline-block h-3 w-3 border-2 border-ink align-middle" />Current</li>
      </ul>
      <ol className="mt-4 grid grid-cols-6 gap-2">
        {questions.map((x, i) => {
          const a = answers[x.id] ?? blank;
          const state = [a.o ? 'answered' : 'unanswered', a.f ? 'flagged' : '', i === index ? 'current' : ''].filter(Boolean).join(', ');
          const cls = a.f ? 'bg-marker text-ink border-ink' : a.o ? 'bg-ink text-white border-ink' : 'bg-paper border-gauge';
          return (
            <li key={x.id}>
              <button type="button" onClick={() => onPick(i)} aria-label={`Question ${i + 1}, ${state}`}
                aria-current={i === index ? 'true' : undefined}
                className={`tnum h-10 w-full border text-15 ${cls} ${i === index ? 'outline-2 outline-offset-2 outline-ink' : ''}`}>
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>
    </dialog>
  );
}
