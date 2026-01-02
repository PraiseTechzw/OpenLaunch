import React from 'react'
import { Metadata } from 'next'

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

const defaultConfig = {
  siteName: 'OpenLaunch',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://openlaunch.praisetech.tech',
  defaultTitle: 'OpenLaunch - Collaborative Innovation Lab',
  defaultDescription: 'A collaborative innovation lab where developers, designers, and creators build real-world software in public through our annual Coding Party initiatives.',
  defaultImage: '/og-image.png',
  twitterHandle: '@openlaunch',
  defaultKeywords: [
    'open source',
    'collaboration',
    'coding party',
    'developers',
    'innovation',
    'software development',
    'community',
    'programming',
    'technology',
    'hackathon'
  ]
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description = defaultConfig.defaultDescription,
    keywords = defaultConfig.defaultKeywords,
    image = defaultConfig.defaultImage,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags
  } = config

  const fullTitle = title 
    ? `${title} - ${defaultConfig.siteName}`
    : defaultConfig.defaultTitle

  const fullUrl = url 
    ? `${defaultConfig.siteUrl}${url}`
    : defaultConfig.siteUrl

  const fullImage = image.startsWith('http') 
    ? image 
    : `${defaultConfig.siteUrl}${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: authors?.map(name => ({ name })) || [{ name: 'OpenLaunch Community' }],
    creator: 'OpenLaunch Community',
    publisher: 'PraiseTech',
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: defaultConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: type as any,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors: authors.map(name => ({ name })) }),
      ...(section && { section }),
      ...(tags && { tags }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: defaultConfig.twitterHandle,
      site: defaultConfig.twitterHandle,
    },

    // Additional meta tags
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

    // Verification (you would add your actual verification codes)
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE,
      yandex: process.env.YANDEX_VERIFICATION_CODE,
    },

    // Canonical URL
    alternates: {
      canonical: fullUrl,
    },
  }

  return metadata
}

// Structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OpenLaunch',
    description: defaultConfig.defaultDescription,
    url: defaultConfig.siteUrl,
    logo: `${defaultConfig.siteUrl}/logo.png`,
    sameAs: [
      'https://github.com/PraiseTechzw/OpenLaunch',
      'https://twitter.com/openlaunch',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@openlaunch.org',
    },
    foundingDate: '2026',
    founders: [
      {
        '@type': 'Person',
        name: 'OpenLaunch Community',
      },
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultConfig.siteName,
    description: defaultConfig.defaultDescription,
    url: defaultConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateArticleSchema(config: {
  title: string
  description: string
  url: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  image?: string
  section?: string
}) {
  const {
    title,
    description,
    url,
    publishedTime,
    modifiedTime,
    authors = ['OpenLaunch Community'],
    image = defaultConfig.defaultImage,
    section = 'Documentation'
  } = config

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${defaultConfig.siteUrl}${url}`,
    datePublished: publishedTime || new Date().toISOString(),
    dateModified: modifiedTime || new Date().toISOString(),
    author: authors.map(name => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'Organization',
      name: defaultConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultConfig.siteUrl}/logo.png`,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: image.startsWith('http') ? image : `${defaultConfig.siteUrl}${image}`,
    },
    articleSection: section,
    inLanguage: 'en-US',
  }
}

export function generateEventSchema(config: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location?: string
  url?: string
  image?: string
  organizer?: string
}) {
  const {
    name,
    description,
    startDate,
    endDate,
    location = 'Virtual Event',
    url,
    image = defaultConfig.defaultImage,
    organizer = 'OpenLaunch'
  } = config

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    ...(endDate && { endDate }),
    location: {
      '@type': 'VirtualLocation',
      name: location,
      ...(url && { url: `${defaultConfig.siteUrl}${url}` }),
    },
    image: {
      '@type': 'ImageObject',
      url: image.startsWith('http') ? image : `${defaultConfig.siteUrl}${image}`,
    },
    organizer: {
      '@type': 'Organization',
      name: organizer,
      url: defaultConfig.siteUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultConfig.siteUrl}${item.url}`,
    })),
  }
}