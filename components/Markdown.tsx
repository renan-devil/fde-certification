import { Fragment, type ReactNode } from 'react';

// A small renderer for the Markdown we write ourselves and for the course files: headings, paragraphs with line
// breaks, lists, tables, quotes, code blocks, rules, bold, italics, code and links. HTML comments are skipped.

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{inline(part.slice(2, -2))}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="bg-gauge/60 px-1 font-mono text-15">{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} className="link" {...(/^https?:/.test(link[2]) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link[1]}</a>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const HEADING = ['', 'display text-44', 'display pt-4 text-27', 'pt-2 text-21 font-semibold', 'text-17 font-semibold'];

function renderBlocks(source: string): ReactNode[] {
  const lines = source.replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  const k = () => out.length;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { i++; continue; }
    if (t.startsWith('```')) {
      const body: string[] = [];
      for (i++; i < lines.length && !lines[i].trim().startsWith('```'); i++) body.push(lines[i]);
      i++;
      out.push(<pre key={k()} className="overflow-x-auto bg-ink p-4 font-mono text-13 text-white"><code>{body.join('\n')}</code></pre>);
      continue;
    }
    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const Tag = (`h${level}`) as 'h1' | 'h2' | 'h3' | 'h4';
      out.push(<Tag key={k()} className={HEADING[level]}>{inline(h[2])}</Tag>);
      i++;
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(t)) { out.push(<hr key={k()} className="border-gauge" />); i++; continue; }
    if (t.startsWith('|')) {
      const rows: string[][] = [];
      for (; i < lines.length && lines[i].trim().startsWith('|'); i++) {
        const r = lines[i].trim();
        if (/^\|[\s|:-]+\|$/.test(r)) continue;
        rows.push(r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      }
      const [head, ...body] = rows;
      const blankHead = head.every((c) => !c);
      out.push(
        <div key={k()} className="overflow-x-auto">
          <table className="data text-15">
            {!blankHead && <thead><tr>{head.map((c, j) => <th key={j}>{inline(c)}</th>)}</tr></thead>}
            <tbody>{body.map((r, j) => <tr key={j}>{r.map((c, m) => <td key={m}>{inline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^[-*] /.test(t)) {
      const items: string[] = [];
      for (; i < lines.length && /^\s*[-*] /.test(lines[i]); i++) items.push(lines[i].trim().slice(2));
      out.push(<ul key={k()} className="list-disc space-y-1.5 pl-6">{items.map((x, j) => <li key={j}>{inline(x)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(t)) {
      const items: string[] = [];
      const start = Number(t.match(/^(\d+)/)![1]);
      for (; i < lines.length && /^\s*\d+\. /.test(lines[i]); i++) items.push(lines[i].trim().replace(/^\d+\. /, ''));
      out.push(<ol key={k()} start={start} className="list-decimal space-y-1.5 pl-6">{items.map((x, j) => <li key={j}>{inline(x)}</li>)}</ol>);
      continue;
    }
    if (t.startsWith('>')) {
      const body: string[] = [];
      for (; i < lines.length && lines[i].trim().startsWith('>'); i++) body.push(lines[i].trim().replace(/^>\s?/, ''));
      out.push(<blockquote key={k()} className="border-l-4 border-gauge pl-4 text-steel">{renderBlocks(body.join('\n'))}</blockquote>);
      continue;
    }
    const para: string[] = [];
    for (; i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\||[-*] |\d+\. |>|```|-{3,}$)/.test(lines[i].trim()); i++) para.push(lines[i].trim());
    if (!para.length) { para.push(t); i++; }
    out.push(<p key={k()}>{para.map((l, j) => <Fragment key={j}>{j > 0 && <br />}{inline(l)}</Fragment>)}</p>);
  }
  return out;
}

export function Markdown({ source }: { source: string }) {
  return <div className="prose-width space-y-4">{renderBlocks(source)}</div>;
}

/** A slide deck written as Markdown, slides separated by a line of three dashes: one framed panel per slide. */
export function Deck({ source }: { source: string }) {
  const slides = source.split(/\n---\n/).map((s) => s.trim()).filter((s) => s.replace(/<!--[\s\S]*?-->/g, '').trim());
  return (
    <ol className="space-y-6">
      {slides.map((s, i) => (
        <li key={i} className="border border-gauge p-5 sm:p-8">
          <p className="tnum mb-3 text-13 text-steel">Slide {i + 1} of {slides.length}</p>
          <div className="space-y-4">{renderBlocks(s)}</div>
        </li>
      ))}
    </ol>
  );
}
