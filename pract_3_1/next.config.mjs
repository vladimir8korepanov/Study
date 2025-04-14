import { createPandaPlugin } from '@pandacss/dev/next-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@pandacss/dev'],
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(createPandaPlugin());
    return config;
  }
};

export default nextConfig;