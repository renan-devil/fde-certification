'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { canEdit, createHuman, decodePhoto, deleteHuman, getHumanBySlug, humanSchema, updateHuman } from '@/lib/humans';

export type HumanFormState = { error?: string };

function parse(form: FormData) {
  const parsed = humanSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message } as const;
  if (form.get('consent') !== 'on') return { error: 'Tick the box to agree that your profile is shown to the FDE School community.' } as const;
  return { data: parsed.data } as const;
}

export async function addHuman(_prev: HumanFormState, form: FormData): Promise<HumanFormState> {
  const p = parse(form);
  if ('error' in p) return { error: p.error };
  let photo;
  try { photo = decodePhoto(String(form.get('photo') ?? '')); } catch (e) { return { error: (e as Error).message }; }
  const { human, token } = await createHuman(p.data, photo);
  revalidatePath('/humans');
  redirect(`/humans/${human.slug}?created=${token}`);
}

export async function editHuman(_prev: HumanFormState, form: FormData): Promise<HumanFormState> {
  const h = await getHumanBySlug(String(form.get('slug')));
  if (!h || !(await canEdit(h, String(form.get('token') ?? '')))) return { error: 'You can no longer edit this profile from this browser. Use your private edit link.' };
  const p = parse(form);
  if ('error' in p) return { error: p.error };
  let photo;
  try {
    const raw = String(form.get('photo') ?? '');
    photo = form.get('removePhoto') === 'on' ? 'remove' as const : raw ? decodePhoto(raw) : 'keep' as const;
  } catch (e) { return { error: (e as Error).message }; }
  await updateHuman(h.id, p.data, photo);
  revalidatePath('/humans');
  redirect(`/humans/${h.slug}`);
}

export async function removeHuman(form: FormData) {
  const h = await getHumanBySlug(String(form.get('slug')));
  if (!h || !(await canEdit(h, String(form.get('token') ?? '')))) return;
  await deleteHuman(h.id);
  revalidatePath('/humans');
  redirect('/humans');
}
