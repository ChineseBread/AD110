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
    // type your image server domain here
    // domain below is not available right now,just serve as an example
    domains: ['server.watish.xyz'],
  },
}

module.exports = nextConfig
