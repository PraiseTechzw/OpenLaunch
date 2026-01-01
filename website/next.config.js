/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com', 'github.com'],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/onboarding',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig