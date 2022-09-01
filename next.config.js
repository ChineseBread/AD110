/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'must-revalidate,maxage=3600',
          },
        ],
      },
      {
        source: '/section',
        has: [
          {
            type: 'query',
            key: 'articleid',
            value: '^[0-9]*$',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: 'must-revalidate,maxage=21600'
          }
        ]
      },
      {
        source: '/news/check',
        has: [
          {
            type: 'query',
            key: 'newsid',
            value: '^[0-9]*$',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: 'must-revalidate,maxage=21600'
          }
        ]
      }
    ]
  },
  swcMinify:true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // type your image server domain here
    domains: ['ad110.com'],
  },
}

module.exports = nextConfig
