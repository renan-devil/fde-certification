import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The PDF route and the Open Graph image read fonts and logos from disk at runtime.
  outputFileTracingIncludes: {
    '/api/certificates/[certId]/pdf': ['./assets/fonts/**', './public/logos/*.png'],
    '/verify/[certId]/opengraph-image': ['./assets/fonts/**', './public/logos/*.png'],
  },
  poweredByHeader: false,
};

export default nextConfig;
