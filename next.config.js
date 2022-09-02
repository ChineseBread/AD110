/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify:true,
  images: {
    domains: ['ad110.com'],
    // domains: ['103.164.63.206','server.watish.xyz','127.0.0.1','ad110.com','www.ad110.com','103.164.62.138'],
    // domains: ['103.164.63.206','server.watish.xyz','127.0.0.1','ad110.com','www.ad110.com','103.164.62.138'],
  },
}
module.exports = nextConfig
