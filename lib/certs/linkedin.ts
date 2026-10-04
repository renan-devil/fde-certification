import { appUrl } from '@/lib/env';

export function linkedInAddUrl(c: { id: string; trackName: string; issuedAt: Date; expiresAt: Date }): string {
  const p = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: c.trackName,
    organizationName: 'FDE School',
    issueYear: String(c.issuedAt.getUTCFullYear()),
    issueMonth: String(c.issuedAt.getUTCMonth() + 1),
    expirationYear: String(c.expiresAt.getUTCFullYear()),
    expirationMonth: String(c.expiresAt.getUTCMonth() + 1),
    certUrl: `${appUrl()}/verify/${c.id}`,
    certId: c.id,
  });
  return `https://www.linkedin.com/profile/add?${p.toString().replace(/\+/g, '%20')}`;
}

export const verifyUrl = (id: string) => `${appUrl()}/verify/${id}`;
export const pdfUrl = (id: string) => `${appUrl()}/api/certificates/${id}/pdf`;
