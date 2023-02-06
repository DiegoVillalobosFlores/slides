/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
    swcMinify: true
  },
  webpack: (config) => {
    return {...config, experiments: {...config.experiments, topLevelAwait: true}}
  }
}

module.exports = nextConfig
