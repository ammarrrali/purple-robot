/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tree-shake the icon barrel so only the icons actually used are bundled.
    optimizePackageImports: ['lucide-react'],
  },

  // Hostinger's CDN does not purge on deploy, and Next's default header for a
  // statically prerendered page is `s-maxage=31536000` — a one-year edge cache.
  // The result observed on 2026-09-06: edge nodes served a mix of the old and
  // new build for hours after a push, so a deploy could not be relied on to
  // reach visitors or Googlebot.
  //
  // Five minutes at the edge with a day of stale-while-revalidate keeps the
  // CDN doing useful work while letting a deploy propagate on its own. Content
  // -hashed assets under /_next/static keep their immutable one-year cache —
  // Next sets that itself and it cannot be overridden here.
  async headers() {
    return [
      {
        source: '/:path((?!api/|_next/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // One canonical host. www and apex both served 200 with identical HTML,
      // leaving the canonical tag as the only thing preventing duplicate-host
      // indexing. Note: on a CDN that terminates before Next (the current
      // host does), this also needs configuring there — see README.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.codeeee.com' }],
        destination: 'https://codeeee.com/:path*',
        permanent: true,
      },

      // /portfolio listed the same four projects as /case-studies and split
      // link equity between two thin pages. Case studies is the canonical
      // index; the portfolio route is gone.
      { source: '/portfolio', destination: '/case-studies', permanent: true },

      // Case studies were re-slugged from internal codenames to the language
      // buyers actually search. Old URLs are in the live sitemap, so they get
      // permanent redirects rather than 404s.
      {
        source: '/case-studies/nexus-logistics-crm',
        destination: '/case-studies/freight-forwarding-erp',
        permanent: true,
      },

      // These three described work Codeeee has not done and were removed on
      // 2026-09-06. They are indexed, so they redirect to the index rather
      // than 404 — see the note at the top of src/content/case-studies.ts.
      {
        source: '/case-studies/aether-interface-webgl-experience',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/quantum-stack-saas-platform',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/fluid-os-progressive-web-app',
        destination: '/case-studies',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
