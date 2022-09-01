/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
   async headers(){
    return [
      {
        source:'/_next/image',
        headers:[
          {
            key:'Cache-Control',
            value:'s-maxage=2592000'
          }
        ]
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // cache
    minimumCacheTTL: 31536000,
    // type your image server domain here
    domains: ['ad110.com'],
  },
}

module.exports = nextConfig
