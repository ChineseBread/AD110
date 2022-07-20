/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // webpack: (config, options) => {
  //   const alias = config.resolve.alias
  //   config.resolve.alias = {
  //     ...alias,
  //     '@styles':'D:\\next-course\\next-website\\styles',
  //     "@components":'D:\\next-course\\next-website\\components'
  //   }
  //   return config
  // },
  images: {
    domains: ['server.watish.xyz'],
  },
}

module.exports = nextConfig
