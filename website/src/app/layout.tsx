import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { RouteLoader } from '@/components/RouteLoader'
import { PageTransition } from '@/components/PageTransition'
import { KeyboardShortcutsButton } from '@/components/KeyboardShortcuts'
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo'
import { StructuredData } from '@/components/StructuredData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { GlobalErrorHandler } from '@/components/GlobalErrorHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://openlaunch.praisetech.tech'),
  title: 'OpenLaunch - Collaborative Innovation Lab',
  description: 'A collaborative innovation lab where developers, designers, and creators build real-world software in public through our annual Coding Party initiatives.',
  keywords: ['open source', 'collaboration', 'coding party', 'developers', 'innovation', 'software development', 'community', 'programming', 'technology', 'hackathon'],
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
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  alternates: {
    canonical: '/',
  },
}

// Enhanced mobile viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // For devices with notches
  themeColor: '#5865f2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Enhanced mobile meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#5865f2" />
        
        {/* Prevent zoom on form inputs on iOS */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebsiteSchema()} />
      </head>
      <body className={`${inter.className} antialiased bg-gray-900 text-white`}>
        {/* Global Error Handler */}
        <GlobalErrorHandler />
        
        {/* Skip links for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#main-navigation" className="skip-link">
          Skip to navigation
        </a>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 safe-area">
          <RouteLoader />
          <ErrorBoundary>
            <Navigation />
          </ErrorBoundary>
          <main id="main-content" className="relative" role="main" aria-label="Main content">
            <ErrorBoundary>
              <PageTransition>
                {children}
              </PageTransition>
            </ErrorBoundary>
          </main>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
          <KeyboardShortcutsButton />
        </div>
      </body>
    </html>
  )
}