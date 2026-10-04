import { Logos } from './Logos';

/** HTML replica of the certificate's first page, small. */
export function CertificatePreview({ trackName, fullName, organization, certId, issued, expires }: {
  trackName: string; fullName: string; organization: string; certId: string; issued: string; expires: string;
}) {
  return (
    <figure className="max-w-xl border border-ink" aria-label="Certificate preview">
      <div className="band flex items-center justify-between bg-ink px-4 py-4"><Logos small /></div>
      <div className="space-y-1 p-5">
        <p className="text-13 text-steel">Certificate</p>
        <p className="display text-34">{trackName}</p>
        <p className="text-13 text-steel">Awarded to</p>
        <p className="text-21 font-semibold">{fullName}</p>
        <p className="text-15 text-steel">{organization}</p>
        <dl className="mt-4 grid grid-cols-2 border-t border-l border-ink text-13 sm:grid-cols-3">
          <div className="border-r border-b border-ink p-2"><dt className="text-steel">Certificate number</dt><dd className="font-mono">{certId}</dd></div>
          <div className="border-r border-b border-ink p-2"><dt className="text-steel">Issued</dt><dd>{issued}</dd></div>
          <div className="border-r border-b border-ink p-2"><dt className="text-steel">Valid until</dt><dd>{expires}</dd></div>
        </dl>
      </div>
    </figure>
  );
}
