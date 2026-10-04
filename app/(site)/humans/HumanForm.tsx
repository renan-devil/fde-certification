'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useActionState, useState } from 'react';
import type { HumanFormState } from './actions';

type Values = { firstName: string; lastName: string; organization: string; communityRole: string; bio: string; linkedinUrl: string; email: string };
type Props = {
  action: (prev: HumanFormState, form: FormData) => Promise<HumanFormState>;
  roles: { id: string; label: string }[];
  initial?: Values & { slug: string; token?: string; photoUrl?: string | null };
  submitLabel: string;
};

/** Shrinks the chosen picture to a 400 px square JPEG in the browser, so uploads stay small. */
async function toSquareJpeg(file: File): Promise<string> {
  const img = await createImageBitmap(file);
  const side = Math.min(img.width, img.height);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 400;
  canvas.getContext('2d')!.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, 400, 400);
  return canvas.toDataURL('image/jpeg', 0.85);
}

export function HumanForm({ action, roles, initial, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<HumanFormState, FormData>(action, {});
  const [photo, setPhoto] = useState('');
  const [photoError, setPhotoError] = useState('');
  const v = initial;
  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-5">
      {v && <input type="hidden" name="slug" value={v.slug} />}
      {v?.token && <input type="hidden" name="token" value={v.token} />}
      <input type="hidden" name="photo" value={photo} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="firstName" className="label">First name</label><input id="firstName" name="firstName" required maxLength={80} defaultValue={v?.firstName} className="field" /></div>
        <div><label htmlFor="lastName" className="label">Last name</label><input id="lastName" name="lastName" maxLength={80} defaultValue={v?.lastName} className="field" /></div>
      </div>
      <div><label htmlFor="organization" className="label">Organization</label><input id="organization" name="organization" required maxLength={120} defaultValue={v?.organization} className="field" /></div>
      <div>
        <label htmlFor="communityRole" className="label">Your role in the FDE community</label>
        <select id="communityRole" name="communityRole" required defaultValue={v?.communityRole ?? ''} className="field">
          <option value="" disabled>Choose a role</option>
          {roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
        </select>
        <p className="mt-1 text-15 text-steel">Certifications appear by themselves when a certificate was issued to your email.</p>
      </div>
      <div>
        <label htmlFor="bio" className="label">About you (optional)</label>
        <textarea id="bio" name="bio" maxLength={400} rows={3} defaultValue={v?.bio} className="field" placeholder="What you work on, in one or two sentences." />
      </div>
      <div><label htmlFor="linkedinUrl" className="label">LinkedIn profile (optional)</label><input id="linkedinUrl" name="linkedinUrl" type="url" maxLength={300} defaultValue={v?.linkedinUrl} placeholder="https://www.linkedin.com/in/…" className="field" /></div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} defaultValue={v?.email} className="field" />
        <p className="mt-1 text-15 text-steel">Never shown. Use the email you took the exam with, so your certificates appear.</p>
      </div>
      <div>
        <label htmlFor="photoFile" className="label">Picture (optional)</label>
        <div className="flex items-center gap-4">
          {(photo || v?.photoUrl) && <img src={photo || v!.photoUrl!} alt="" width={64} height={64} className="h-16 w-16 border border-gauge object-cover" />}
          <input id="photoFile" type="file" accept="image/*" className="text-15" onChange={async (e) => {
            const f = e.target.files?.[0];
            setPhotoError('');
            if (!f) return;
            try { setPhoto(await toSquareJpeg(f)); } catch { setPhotoError('That file could not be read as a picture. Try a JPEG or PNG.'); }
          }} />
        </div>
        {photoError && <p className="mt-1 text-fail">{photoError}</p>}
        {v?.photoUrl && <label className="mt-2 flex items-center gap-2 text-15"><input type="checkbox" name="removePhoto" className="h-4 w-4 accent-ink" /> Remove my picture</label>}
      </div>
      <label className="flex items-start gap-3">
        <input type="checkbox" name="consent" required defaultChecked={Boolean(v)} className="mt-1 h-5 w-5 shrink-0 accent-ink" />
        <span>I agree that this profile is shown to everyone with access to this site, as described in the <Link href="/privacy" className="link">privacy notice</Link>.</span>
      </label>
      {state.error && <p role="alert" className="text-fail">{state.error}</p>}
      <button type="submit" className="btn" disabled={pending}>{pending ? 'Saving…' : submitLabel}</button>
    </form>
  );
}
