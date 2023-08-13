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
}

module.exports = nextConfig
