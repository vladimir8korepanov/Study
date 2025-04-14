/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      optimizePackageImports: ['@pandacss/dev']
    }
  };
  
module.exports = nextConfig;