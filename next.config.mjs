/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tree-shake the icon barrel so only the icons actually used are bundled.
    optimizePackageImports: ['lucide-react'],
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
