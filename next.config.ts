import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The PDF route and the Open Graph image read fonts and logos from disk at runtime.
  outputFileTracingIncludes: {
    // The preview image route gets a hashed name at build time, so match every route (the files are small).
    '/**': ['./assets/fonts/**', './public/logos/*.png'],
  },
  poweredByHeader: false,
};

export default nextConfig;
