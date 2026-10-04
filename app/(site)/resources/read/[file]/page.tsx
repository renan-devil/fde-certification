import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Deck, Markdown } from '@/components/Markdown';
import { KIND_LABEL, itemByReadFile } from '@/lib/content/resources';

export async function generateMetadata({ params }: { params: Promise<{ file: string }> }): Promise<Metadata> {
  const found = itemByReadFile((await params).file);
  return { title: found ? found.item.title : 'Course material' };
}

export default async function ReadResource({ params }: { params: Promise<{ file: string }> }) {
  const found = itemByReadFile((await params).file);
  if (!found) notFound();
  const { session, item } = found;
  const source = readFileSync(path.join(process.cwd(), 'public', 'resources', item.read!), 'utf8');
  const isDeck = item.kind === 'slides';
  return (
    <div>
      <p className="text-15"><Link href={`/resources#${session.id}`} className="link">Course material</Link> <span className="text-steel">/ {session.title}</span></p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
        <div>
          <p className="text-15 text-steel">{KIND_LABEL[item.kind]}</p>
          <h1 className="display text-44">{item.title}</h1>
        </div>
        {item.href && <a href={item.href} download className="btn btn-secondary">Download the Markdown file</a>}
      </div>
      <div className="mt-8">{isDeck ? <Deck source={source} /> : <Markdown source={source} />}</div>
    </div>
  );
}
