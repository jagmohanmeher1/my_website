/** @type {import('next').NextConfig} */
// GitHub Project Pages serves the site at https://<user>.github.io/<repo>/
// NEXT_PUBLIC_BASE_PATH must match the repository name (e.g. /my_website).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  },
  // Avoid CI failures when ESLint is not fully configured locally
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;

