import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { RouteLoader } from '@/components/RouteLoader'
import { PageTransition } from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://openlaunch.praisetech.tech'),
  title: 'OpenLaunch - Collaborative Innovation Lab',
  description: 'A collaborative innovation lab where developers, designers, and creators build real-world software in public through our annual Coding Party initiatives.',
  keywords: ['open source', 'collaboration', 'coding party', 'developers', 'innovation'],
  authors: [{ name: 'OpenLaunch Community' }],
  creator: 'OpenLaunch Community',
  publisher: 'PraiseTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'OpenLaunch - Collaborative Innovation Lab',
    description: 'Join our annual Coding Party initiatives and build real-world software with a global community.',
    url: '/',
    siteName: 'OpenLaunch',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenLaunch - Collaborative Innovation Lab',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenLaunch - Collaborative Innovation Lab',
    description: 'Join our annual Coding Party initiatives and build real-world software with a global community.',
    images: ['/og-image.png'],
    creator: '@openlaunch',
    site: '@openlaunch',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} antialiased bg-gray-900 text-white`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <RouteLoader />
          <Navigation />
          <main className="relative">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}