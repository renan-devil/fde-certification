/* eslint-disable @next/next/no-img-element */
// Both official logos on the ink band, never recolored (Appendix A).
export function Logos({ small = false }: { small?: boolean }) {
  const oss = small ? 22 : 28;
  const dvt = small ? 19 : 24;
  return (
    <span className="flex items-center gap-3">
      <img src="/logos/oss-ventures-on-dark.svg" alt="OSS Ventures" height={oss} width={Math.round(oss * 4.2)} style={{ height: oss, width: 'auto' }} />
      <span aria-hidden className="block w-px self-stretch bg-divider" style={{ margin: '4px 0' }} />
      <img src="/logos/devoteam-on-dark.svg" alt="Devoteam" height={dvt} width={Math.round(dvt * 3.39)} style={{ height: dvt, width: 'auto' }} />
    </span>
  );
}
