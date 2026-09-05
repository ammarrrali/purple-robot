/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tree-shake the icon barrel so only the icons actually used are bundled.
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
