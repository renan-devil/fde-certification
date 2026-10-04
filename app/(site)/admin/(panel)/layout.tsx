import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/guard';

const LINKS = [
  ['/admin', 'Overview'], ['/admin/attempts', 'Attempts'], ['/admin/certificates', 'Certificates'],
  ['/admin/questions', 'Questions'], ['/admin/data', 'Data'],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div>
      <nav aria-label="Admin" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-ink pb-3 text-15">
        {LINKS.map(([href, label]) => <Link key={href} href={href} className="link">{label}</Link>)}
      </nav>
      {children}
    </div>
  );
}
