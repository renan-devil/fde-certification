import type { Metadata } from 'next';
import { COMMUNITY_ROLES } from '@/lib/humans';
import { HumanForm } from '../HumanForm';
import { addHuman } from '../actions';

export const metadata: Metadata = { title: 'Add yourself' };

export default function NewHuman() {
  return (
    <div>
      <h1 className="display text-44">Add yourself</h1>
      <p className="prose-width mt-3">Create your page in the FDE community directory. You can change or delete it later from this browser, or with the private link we give you.</p>
      <HumanForm action={addHuman} roles={COMMUNITY_ROLES.map((r) => ({ ...r }))} submitLabel="Create my page" />
    </div>
  );
}
