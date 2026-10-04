import { readFileSync } from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-static';

/** The FDE basics skill for AI assistants (public, downloadable). */
export function GET() {
  return new Response(readFileSync(path.join(process.cwd(), 'content', 'FDEbasics.md'), 'utf8'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Content-Disposition': 'inline; filename="FDEbasics.md"' },
  });
}
