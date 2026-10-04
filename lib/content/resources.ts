import data from '@/content/resources.json';

export type ResourceKind = 'slides' | 'video' | 'reading' | 'template' | 'dataset' | 'exercise';
/** `read`: a Markdown file in public/resources/ shown on the site; `href`: the file to download or open. */
export type ResourceItem = { id: string; kind: ResourceKind; title: string; summary?: string; read?: string; href: string | null; status: 'available' | 'coming_soon'; duration?: string; tracks?: string[] };
export type Session = { id: string; title: string; summary: string; tracks: string[]; domains: string[]; items: ResourceItem[] };
export type Reading = { id: string; title: string; by: string; href: string; domains: string[]; tracks: string[] };

export const SESSIONS = data.sessions as Session[];
export const FURTHER_READING = data.furtherReading as Reading[];

export const KIND_LABEL: Record<ResourceKind, string> = {
  slides: 'Slides', video: 'Video', reading: 'Reading', template: 'Template', dataset: 'Lab kit', exercise: 'Exercises',
};

/** Sessions that cover a domain, for "where to focus" on the result page. */
export function sessionsForDomain(domain: string, trackId: string): Session[] {
  return SESSIONS.filter((s) => s.domains.includes(domain) && (s.tracks.includes(trackId) || trackId === 'test'));
}

/** Finds the item whose Markdown file is `file`, for the reading page. */
export function itemByReadFile(file: string): { session: Session; item: ResourceItem } | undefined {
  for (const session of SESSIONS) for (const item of session.items) if (item.read === file && item.status === 'available') return { session, item };
  return undefined;
}
