import data from '@/content/resources.json';

export type ResourceKind = 'slides' | 'video' | 'reading' | 'template' | 'dataset';
export type ResourceItem = { id: string; kind: ResourceKind; title: string; href: string | null; status: 'available' | 'coming_soon'; duration?: string; tracks?: string[] };
export type Session = { id: string; title: string; summary: string; tracks: string[]; domains: string[]; items: ResourceItem[] };
export type Reading = { id: string; title: string; by: string; href: string; domains: string[]; tracks: string[] };

export const SESSIONS = data.sessions as Session[];
export const FURTHER_READING = data.furtherReading as Reading[];

export const KIND_LABEL: Record<ResourceKind, string> = {
  slides: 'Slides', video: 'Video', reading: 'Reading', template: 'Template', dataset: 'Dataset',
};

/** Sessions that cover a domain, for "where to focus" on the result page. */
export function sessionsForDomain(domain: string, trackId: string): Session[] {
  return SESSIONS.filter((s) => s.domains.includes(domain) && (s.tracks.includes(trackId) || trackId === 'test'));
}
