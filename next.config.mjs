/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@splinetool/react-spline', 'lucide-react'],
    workerThreads: false,
    cpus: 1
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
