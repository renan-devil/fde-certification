// Names, labels, signatories and feature switches. Change wording here, not in pages.
export const SITE = {
  name: 'FDE School',
  programLabel: 'FDE School, by Devoteam and OSS Ventures',
  footerLine: 'FDE School, by Devoteam and OSS Ventures. OSS Ventures maintains the certification standard.',
  aiBadge: 'Question bank drafted with AI and validated by the FDE School (AI 50%)',
  showAiBadge: true,
  // Printed on the certificate, left to right. Open decision 9: add the Devoteam signatory here.
  signatories: [
    { name: 'Renan Devillières', title: 'OSS Ventures' },
  ],
  // Privacy page placeholders until open decision 7 is settled.
  privacy: {
    controller: 'To be confirmed: the data controller will be named here once Devoteam legal confirms it.',
    legalBasis: 'To be confirmed with legal.',
    contact: 'your trainer, who will pass the request to the FDE School team',
  },
};
