import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Partial Prerendering (PPR). In Next.js 14-15 the course enabled this with
  // `experimental: { ppr: 'incremental' }` and `export const experimental_ppr = true`
  // in the dashboard layout. In Next.js 16 PPR is enabled with `cacheComponents`.
  cacheComponents: true,
  // Keep the default prefetch behaviour (newer Next.js 16 asks for this explicitly).
  partialPrefetching: false,
};

export default nextConfig;
