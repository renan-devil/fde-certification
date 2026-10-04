/** "14 October 2028", in UTC so every reader sees the same date. */
export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** The server clock, read once per request for the exam timer. */
export function serverTime(): number {
  return Date.now();
}
