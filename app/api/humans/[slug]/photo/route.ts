import { getHumanBySlug } from '@/lib/humans';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const h = await getHumanBySlug((await params).slug);
  if (!h || h.hidden || !h.photo) return new Response('No picture', { status: 404 });
  return new Response(new Uint8Array(h.photo), {
    headers: { 'Content-Type': h.photoType ?? 'image/jpeg', 'Cache-Control': 'private, max-age=86400' },
  });
}
