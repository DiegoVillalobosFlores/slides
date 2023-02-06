/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcMinify: true
  },
  webpack: (config) => {
    return {...config, experiments: {...config.experiments, topLevelAwait: true}}
  }
}

module.exports = nextConfig
