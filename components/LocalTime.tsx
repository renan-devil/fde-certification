'use client';
import { useSyncExternalStore } from 'react';

/** "Tuesday 14 October, 15:20" in the reader's local time zone. */
export function formatLocal(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '');
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}

const noop = () => () => {};

export function LocalTime({ iso }: { iso: string }) {
  // Server render uses UTC; the browser re-renders in local time.
  const text = useSyncExternalStore(noop, () => formatLocal(iso), () => formatLocal(iso) + ' UTC');
  return <time dateTime={iso}>{text}</time>;
}
