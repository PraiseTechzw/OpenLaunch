/** @type {import('next').NextConfig} */
const nextConfig = {
  // Point to the website directory for the actual Next.js app
  distDir: 'website/.next',
  
  // Image configuration
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com', 'github.com'],
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/onboarding',
        permanent: true,
      },
    ]
  },
  
  // Experimental features
  experimental: {
    // Enable if needed for deployment
  },
}

module.exports = nextConfig