'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'
import { clsx } from 'clsx'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage?: boolean
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

export function Breadcrumb({ items, showHome = true, className }: BreadcrumbProps) {
  const pathname = usePathname()
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname)
  
  // Don't show breadcrumbs on home page
  if (pathname === '/' && !items) {
    return null
  }

  return (
    <nav 
      className={clsx('flex items-center space-x-2 text-sm', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {showHome && (
          <li>
            <Link
              href="/"
              className="flex items-center transition-colors duration-200 hover:scale-105"
              style={{
                color: pathname === '/' 
                  ? discordColors.text.primary 
                  : discordColors.text.muted
              }}
              onMouseEnter={(e) => {
                if (pathname !== '/') {
                  e.currentTarget.style.color = discordColors.text.secondary
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== '/') {
                  e.currentTarget.style.color = discordColors.text.muted
                }
              }}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}
        
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            {(showHome || index > 0) && (
              <ChevronRightIcon 
                className="w-4 h-4 flex-shrink-0" 
                style={{ color: discordColors.text.muted }}
              />
            )}
            
            {item.isCurrentPage ? (
              <span 
                className="font-medium truncate"
                style={{ color: discordColors.text.primary }}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="font-medium truncate transition-colors duration-200 hover:scale-105"
                style={{ color: discordColors.text.secondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = discordColors.text.primary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = discordColors.text.secondary
                }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Route label mappings
  const routeLabels: Record<string, string> = {
    'docs': 'Documentation',
    'community': 'Community',
    'events': 'Events',
    'contributing': 'Contributing',
    'onboarding': 'Getting Started',
    'vision': 'Vision & Mission',
    'roadmap': 'Roadmap',
    'architecture': 'Architecture',
    'contributors': 'Contributors',
    'code-of-conduct': 'Code of Conduct',
    'coding-party-2026': 'Coding Party 2026',
    'workshops': 'Workshops',
    'meetups': 'Meetups',
  }
  
  let currentPath = ''
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    
    // Convert kebab-case to title case if no mapping exists
    const label = routeLabels[segment] || segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      label,
      href: currentPath,
      isCurrentPage: isLast,
    })
  })
  
  return breadcrumbs
}

// Utility function to create custom breadcrumbs
export function createBreadcrumbs(items: Omit<BreadcrumbItem, 'isCurrentPage'>[]): BreadcrumbItem[] {
  return items.map((item, index) => ({
    ...item,
    isCurrentPage: index === items.length - 1,
  }))
}