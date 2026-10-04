import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Markdown } from '@/components/Markdown';

export const metadata: Metadata = { title: 'Agents', description: 'How AI assistants such as Claude Code should use the FDE School certification site.' };

export default function AgentsPage() {
  const source = readFileSync(path.join(process.cwd(), 'content', 'agents.md'), 'utf8');
  return <Markdown source={source} />;
}
