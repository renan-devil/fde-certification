import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-14">
      <section>
        <h1 className="display text-44 sm:text-56">FDE School</h1>
        <p className="prose-width mt-4 text-21">
          The FDE School trains the people who deploy AI in industrial operations: executives who decide where AI goes in the
          P&amp;L, managers who run deployments and the change around them, and Forward Deployed Engineers who build and run
          the systems in plants.
        </p>
        <p className="prose-width mt-3">
          It is a five-day program, by Devoteam and OSS Ventures: the role, the business, the technology, the obstacles, and
          the full motion on two simulated plants. OSS Ventures maintains the certification standard that anyone working as an
          FDE under the banner must meet.
        </p>
      </section>

      <section aria-labelledby="site-h">
        <h2 id="site-h" className="display text-34">On this site</h2>
        <dl className="mt-4 border-t border-ink">
          {[
            ['/resources', 'Course material', 'Slides, recordings, templates and case packs for each day, as they become available.'],
            ['/exams', 'Exams', 'One timed exam per track. Pass it and you get a certificate anyone can verify.'],
            ['/humans', 'Humans', 'The FDE community: trainers, participants and certified practitioners. Add yourself.'],
            ['/glossary', 'Glossary', 'The terms used in the course and the exams, in plain words.'],
            ['/verify', 'Verify a certificate', 'Check that a certificate is genuine and still valid.'],
            ['/agents', 'Agents', 'How to use the site with an AI assistant such as Claude Code, and the rules it must follow.'],
          ].map(([href, title, text]) => (
            <div key={href} className="grid gap-1 border-b border-gauge py-3 sm:grid-cols-[220px_1fr]">
              <dt><Link href={href} className="link font-semibold">{title}</Link></dt>
              <dd className="text-steel">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

    </div>
  );
}
