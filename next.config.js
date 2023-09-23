/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/inf02',
        destination: '/inf02/jedno-pytanie',
        permanent: true,
      },
      {
        source: '/inf03',
        destination: '/inf03/jedno-pytanie',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mwutwmvvmskygvtjowaa.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
