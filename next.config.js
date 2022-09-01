/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL:864000,
    // type your image server domain here
    domains: ['ad110.com'],
    formats: ["image/webp", "image/avif"]
  },
}

module.exports = nextConfig
