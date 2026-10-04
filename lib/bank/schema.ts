import { z } from 'zod';
import { DOMAINS } from '@/lib/config/tracks';

export const OPTION_IDS = ['a', 'b', 'c', 'd'] as const;
export type OptionId = (typeof OPTION_IDS)[number];

export const questionSchema = z.strictObject({
  id: z.string().regex(/^[A-Z]{3}-[123]-\d{3}$/, 'id must look like VAL-2-014'),
  domain: z.enum(DOMAINS),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  stem: z.string().min(10),
  options: z.strictObject({ a: z.string().min(1), b: z.string().min(1), c: z.string().min(1), d: z.string().min(1) }),
  answer: z.enum(OPTION_IDS),
  explanation: z.string().min(10),
  source: z.string().min(3),
  keepOrder: z.boolean().default(false),
  status: z.enum(['draft', 'validated', 'retired']),
  author: z.string().min(1),
  reviewedBy: z.string().nullable(),
});

export type Question = z.infer<typeof questionSchema>;
export type Tier = 1 | 2 | 3;
