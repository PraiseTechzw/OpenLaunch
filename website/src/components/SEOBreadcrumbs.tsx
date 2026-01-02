'use client'

import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { generateBreadcrumbSchema } from '@/lib/seo'
import { StructuredData } from '@/components/StructuredData'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function SEOBreadcrumbs({ items, className = '' }: SEOBreadcrumbsProps) {
  // Always include home as the first item
  const allItems = [
    { name: 'Home', url: '/' },
    ...items
  ]

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <StructuredData data={generateBreadcrumbSchema(allItems)} />
      
      {/* Visual Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {allItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="w-4 h-4 text-discord-text-muted mx-2" />
              )}
              
              {index === 0 ? (
                <Link
                  href={item.url}
                  className="flex items-center text-discord-text-muted hover:text-discord-brand-primary transition-colors"
                  aria-label="Go to homepage"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ) : index === allItems.length - 1 ? (
                <span 
                  className="text-discord-text-primary font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-discord-text-muted hover:text-discord-brand-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}