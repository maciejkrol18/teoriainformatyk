require('dotenv').config({
  path: '.env.local',
})

const { withPlausibleProxy } = require('next-plausible')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', ''),
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  output: 'standalone',
}

module.exports = withBundleAnalyzer(
  withPlausibleProxy({ customDomain: process.env.PLAUSIBLE_URL })({ ...nextConfig }),
)
