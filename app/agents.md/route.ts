import { readFileSync } from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-static';

/** The Agents page as plain Markdown, for AI assistants (public). */
export function GET() {
  return new Response(readFileSync(path.join(process.cwd(), 'content', 'agents.md'), 'utf8'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
