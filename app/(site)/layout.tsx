import Link from 'next/link';
import { Logos } from '@/components/Logos';
import { SITE } from '@/lib/config/site';
import { emailEnabled } from '@/lib/env';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="band bg-ink text-white">
        <div className="mx-auto flex min-h-16 max-w-[960px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="FDE School certification, home"><Logos /></Link>
          <nav aria-label="Main" className="flex items-center gap-5 text-15">
            <span className="hidden font-semibold md:inline">{SITE.name}</span>
            <Link href="/resources" className="hover:underline">Resources</Link>
            <Link href="/#exams" className="hover:underline">Exams</Link>
            <Link href="/verify" className="hover:underline">Verify</Link>
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-[960px] flex-1 px-4 py-10 sm:px-6">{children}</main>
      <footer className="border-t border-gauge">
        <div className="mx-auto max-w-[960px] space-y-2 px-4 py-8 text-15 text-steel sm:px-6">
          <p>{SITE.footerLine}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="link">Privacy</Link>
            <Link href="/verify" className="link">Verify a certificate</Link>
            <Link href="/glossary" className="link">Glossary</Link>
            {emailEnabled() && <Link href="/certificates" className="link">Find my certificates</Link>}
          </p>
          {SITE.showAiBadge && <p className="text-13">{SITE.aiBadge}</p>}
        </div>
      </footer>
    </div>
  );
}
