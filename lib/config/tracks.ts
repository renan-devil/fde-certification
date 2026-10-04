// Domains are defined in docs/SPEC.md, Part 2. Blueprint arrays are [tier1, tier2, tier3] question counts.
export const DOMAINS = ['GAI', 'LLM', 'ONT', 'DAT', 'VAL', 'DEP', 'CHG', 'OPS', 'RSK'] as const;
export type Domain = (typeof DOMAINS)[number];

export const DOMAIN_NAMES: Record<Domain, string> = {
  GAI: 'Generative AI: what it is and what it changes',
  LLM: 'How it works: from tokens to agents',
  ONT: 'Ontology and knowledge graphs',
  DAT: 'Data and enterprise systems',
  VAL: 'Value: ROI, validated gains and capture',
  DEP: 'Deployment and the FDE way',
  CHG: 'Change and adoption',
  OPS: 'Operations science',
  RSK: 'Risk, security and governance',
};

export type Track = {
  id: string;
  name: string;
  certPrefix: string;
  audience: string;
  scope: string;
  durationMinutes: number;
  questionCount: number;
  passMark: number;
  cooldownHours: number;
  validityMonths: number;
  blueprint: Record<Domain, readonly [number, number, number]>;
};

export const TRACKS = {
  exco: {
    id: 'exco', name: 'Exco Fundamentals', certPrefix: 'EXCO',
    audience: 'Executive committee members who decide where AI goes in the P&L',
    scope: 'what generative AI is and is not, how it works at a high level, why the ontology is the asset, and how AI value reaches the P&L',
    durationMinutes: 30, questionCount: 60, passMark: 0.70, cooldownHours: 24, validityMonths: 24,
    blueprint: { GAI: [14,0,0], LLM: [8,0,0], ONT: [12,0,0], DAT: [6,0,0], VAL: [10,0,0],
                 DEP: [4,0,0], CHG: [0,0,0], OPS: [0,0,0], RSK: [6,0,0] },
  },
  manager: {
    id: 'manager', name: 'Manager Kit', certPrefix: 'MGR',
    audience: 'Managers who sponsor or run AI deployments and the change around them',
    scope: 'the AI stack from tokens to agents, ontology and data, validated gains and their capture, and leading the change deployments require',
    durationMinutes: 60, questionCount: 120, passMark: 0.70, cooldownHours: 24, validityMonths: 24,
    blueprint: { GAI: [4,8,0], LLM: [4,14,0], ONT: [4,12,0], DAT: [3,9,0], VAL: [4,14,0],
                 DEP: [3,11,0], CHG: [0,18,0], OPS: [0,4,0], RSK: [2,6,0] },
  },
  fde: {
    id: 'fde', name: 'FDE Certification', certPrefix: 'FDE',
    audience: 'Engineers who build, deploy and run AI in industrial operations',
    scope: 'the full AI stack, ontology and data engineering in plants, validated gains, operations science, deployment craft and change on the shop floor',
    durationMinutes: 120, questionCount: 240, passMark: 0.75, cooldownHours: 24, validityMonths: 24,
    blueprint: { GAI: [2,4,6], LLM: [2,10,28], ONT: [2,8,20], DAT: [2,8,24], VAL: [2,8,22],
                 DEP: [2,8,20], CHG: [0,8,16], OPS: [0,4,20], RSK: [2,4,8] },
  },
} as const satisfies Record<string, Track>;

// Rehearsal only, registered when ENABLE_TEST_TRACK === 'true'; never listed on the home page.
export const TEST_TRACK = {
  id: 'test', name: 'Rehearsal', certPrefix: 'TEST', audience: 'Trainers', scope: 'a rehearsal of the exam flow',
  durationMinutes: 2, questionCount: 5, passMark: 0.6, cooldownHours: 0, validityMonths: 1,
  blueprint: { GAI: [2,0,0], LLM: [0,0,0], ONT: [2,0,0], DAT: [0,0,0], VAL: [1,0,0],
               DEP: [0,0,0], CHG: [0,0,0], OPS: [0,0,0], RSK: [0,0,0] },
} as const satisfies Track;

export type PublicTrackId = keyof typeof TRACKS;
export const PUBLIC_TRACKS: Track[] = Object.values(TRACKS);

export function testTrackEnabled(): boolean {
  return process.env.ENABLE_TEST_TRACK === 'true';
}

/** All tracks that can be taken right now (the rehearsal track only when enabled). */
export function allTracks(): Track[] {
  return testTrackEnabled() ? [...PUBLIC_TRACKS, TEST_TRACK] : PUBLIC_TRACKS;
}

export function getTrack(id: string): Track | undefined {
  return allTracks().find((t) => t.id === id);
}

/** Every track, enabled or not: for displaying old attempts and certificates. */
export function trackName(id: string): string {
  return [...PUBLIC_TRACKS, TEST_TRACK].find((t) => t.id === id)?.name ?? id;
}

export function blueprintSum(t: Track): number {
  return DOMAINS.reduce((s, d) => s + t.blueprint[d][0] + t.blueprint[d][1] + t.blueprint[d][2], 0);
}

// Assert at startup that each blueprint sums to its question count.
for (const t of [...PUBLIC_TRACKS, TEST_TRACK]) {
  if (blueprintSum(t) !== t.questionCount) {
    throw new Error(`Track ${t.id}: blueprint sums to ${blueprintSum(t)}, expected ${t.questionCount}`);
  }
}

/** Integer pass threshold: correct >= ceil(passMark × total), computed without float surprises. */
export function passThreshold(passMark: number, total: number): number {
  // passMark has at most 2 decimals; work in whole hundredths.
  const pct = Math.round(passMark * 100);
  return Math.floor((pct * total + 99) / 100);
}
