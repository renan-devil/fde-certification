'use client';
import { useState } from 'react';

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="btn btn-secondary" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2500); } catch { window.prompt('Copy this link', text); }
    }}>
      <span aria-live="polite">{done ? 'Link copied' : label}</span>
    </button>
  );
}
