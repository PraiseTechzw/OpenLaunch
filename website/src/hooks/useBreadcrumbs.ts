'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage?: boolean
}

export function useBreadcrumbs(customItems?: BreadcrumbItem[]) {
  const pathname = usePathname()
  
  const breadcrumbs = useMemo(() => {
    if (customItems) {
      return customItems.map((item, index) => ({
        ...item,
        isCurrentPage: index === customItems.length - 1,
      }))
    }
    
    return generateBreadcrumbsFromPath(pathname)
  }, [pathname, customItems])
  
  return breadcrumbs
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Route label mappings for better UX
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
    'api': 'API Reference',
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

// Utility function for creating custom breadcrumb structures
export function createBreadcrumbPath(
  basePath: string,
  segments: Array<{ segment: string; label?: string }>
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = []
  let currentPath = basePath
  
  segments.forEach((item, index) => {
    currentPath += `/${item.segment}`
    const isLast = index === segments.length - 1
    
    breadcrumbs.push({
      label: item.label || item.segment.charAt(0).toUpperCase() + item.segment.slice(1),
      href: currentPath,
      isCurrentPage: isLast,
    })
  })
  
  return breadcrumbs
}