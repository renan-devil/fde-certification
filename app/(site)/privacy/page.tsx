import type { Metadata } from 'next';
import { SITE } from '@/lib/config/site';

export const metadata: Metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  const p = SITE.privacy;
  return (
    <div className="prose-width space-y-6">
      <h1 className="display text-44">Privacy notice</h1>
      <p>This site runs the FDE School certification exams. Here is what we keep, why, and for how long.</p>
      <Section title="Who is responsible">{p.controller}</Section>
      <Section title="What we collect">
        Your first name, last name, email, organization and its type, your consent, your exam attempts (the questions drawn,
        your answers, times, score and how often you left the exam tab) and any certificate you earn. We collect nothing else:
        no IP addresses, no analytics, no third-party scripts, no tracking cookies. The only cookies are functional: one
        remembers that you entered the site password, one ties an exam to your browser, and one keeps admins signed in.
      </Section>
      <Section title="Humans directory">
        If you add yourself to the Humans directory, your name, organization, role, picture, description and LinkedIn link
        are shown to everyone with access to this site, with any valid certificate issued to your email. Your email itself is
        never shown. You can edit or delete your page at any time.
      </Section>
      <Section title="Why">To run the exams, and to issue and verify certificates.</Section>
      <Section title="Legal basis">{p.legalBasis}</Section>
      <Section title="What is public">
        If you earn a certificate, its verification page shows your name, organization, track, issue and expiry dates and
        status to anyone with the link or the certificate number. Your email and score are never public.
      </Section>
      <Section title="How long we keep it">
        Certificates: their validity plus 12 months. Attempts without a certificate: 12 months.
      </Section>
      <Section title="Who processes it">
        Vercel hosts the site. Neon stores the database in Frankfurt, in the EU. Resend sends certificate emails, when email
        is switched on.
      </Section>
      <Section title="Your rights">
        To see, correct or delete your data, contact {p.contact}. We delete everything linked to your email on request.
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-21 font-semibold">{title}</h2>
      <p className="mt-1">{children}</p>
    </section>
  );
}
