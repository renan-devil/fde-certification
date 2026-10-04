import Link from 'next/link';

/** A table header link that sorts by `col` and keeps the other query parameters. */
export function SortHeader({ col, label, params, base }: { col: string; label: string; params: Record<string, string | undefined>; base: string }) {
  const active = params.sort === col;
  const dir = active && params.dir === 'asc' ? 'desc' : 'asc';
  const q = new URLSearchParams(Object.entries({ ...params, sort: col, dir }).filter(([, v]) => v) as [string, string][]);
  return (
    <th scope="col" aria-sort={active ? (params.dir === 'asc' ? 'ascending' : 'descending') : undefined}>
      <Link href={`${base}?${q}`} className="hover:underline">{label}{active ? (params.dir === 'asc' ? ' (A–Z)' : ' (Z–A)') : ''}</Link>
    </th>
  );
}
