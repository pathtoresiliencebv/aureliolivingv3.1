import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@aurelio/ui', '@aurelio/lib'],
  images: {
    domains: ['localhost', 'aurelio.app'],
  },
};

export default nextConfig;

