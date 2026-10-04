import { Fragment } from 'react';

// A small renderer for the simple Markdown we write ourselves (headings, paragraphs, lists, tables, bold, code).
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`')) return <code key={i} className="bg-gauge/60 px-1 font-mono text-15">{part.slice(1, -1)}</code>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <div className="prose-width space-y-4">
      {blocks.map((b, i) => {
        const lines = b.split('\n');
        if (b.startsWith('# ')) return <h1 key={i} className="display text-44">{b.slice(2)}</h1>;
        if (b.startsWith('## ')) return <h2 key={i} className="display pt-6 text-27">{b.slice(3)}</h2>;
        if (lines.every((l) => l.startsWith('- '))) return <ul key={i} className="list-disc space-y-2 pl-6">{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        if (lines.every((l) => /^\d+\. /.test(l))) return <ol key={i} className="list-decimal space-y-2 pl-6">{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\. /, ''))}</li>)}</ol>;
        if (lines.every((l) => l.startsWith('|'))) {
          const rows = lines.filter((l) => !/^\|[\s|:-]+\|$/.test(l)).map((l) => l.slice(1, -1).split('|').map((c) => c.trim()));
          return (
            <div key={i} className="overflow-x-auto">
              <table className="data text-15">
                <thead><tr>{rows[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
                <tbody>{rows.slice(1).map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{inline(c)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          );
        }
        return <p key={i}>{inline(lines.join(' '))}</p>;
      })}
    </div>
  );
}
