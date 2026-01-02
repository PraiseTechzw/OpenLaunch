import { getCachedAllDocs } from './dynamic-content'
import { NavigationItem } from './content-management'

export interface NavigationConfig {
  maxDepth?: number
  includeExternal?: boolean
  sortBy?: 'order' | 'title' | 'date'
  groupBy?: 'category' | 'tags' | 'none'
}

export interface GeneratedNavigation {
  main: NavigationItem[]
  sidebar: NavigationItem[]
  breadcrumbs: (slug: string) => NavigationItem[]
  footer: NavigationItem[]
}

// Generate complete navigation structure
export function generateCompleteNavigation(config: NavigationConfig = {}): GeneratedNavigation {
  const {
    maxDepth = 3,
    includeExternal = false,
    sortBy = 'order',
    groupBy = 'category'
  } = config

  const allDocs = getCachedAllDocs()
  const visibleDocs = allDocs.filter(doc => doc.metadata.showInNav !== false)

  return {
    main: generateMainNavigation(visibleDocs, { sortBy, groupBy }),
    sidebar: generateSidebarNavigation(visibleDocs, { maxDepth, sortBy }),
    breadcrumbs: (slug: string) => generateBreadcrumbs(slug, visibleDocs),
    footer: generateFooterNavigation(visibleDocs, { includeExternal })
  }
}

// Generate main navigation (top-level categories)
function generateMainNavigation(
  docs: any[],
  options: { sortBy: string; groupBy: string }
): NavigationItem[] {
  const { sortBy, groupBy } = options

  if (groupBy === 'none') {
    return docs
      .sort(getSortFunction(sortBy))
      .slice(0, 8) // Limit main nav items
      .map(doc => ({
        title: doc.metadata.title,
        href: `/docs/${doc.slug}`,
        order: doc.metadata.order || 0
      }))
  }

  // Group by category
  const categoryMap = new Map<string, any[]>()
  docs.forEach(doc => {
    const category = doc.metadata.category || 'General'
    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }
    categoryMap.get(category)!.push(doc)
  })

  // Convert to navigation items
  const navigation: NavigationItem[] = []

  // Add special categories first
  const priorityCategories = ['Getting Started', 'Documentation', 'Tutorials']
  
  priorityCategories.forEach(category => {
    if (categoryMap.has(category)) {
      const docs = categoryMap.get(category)!.sort(getSortFunction(sortBy))
      navigation.push({
        title: category,
        href: `/docs/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        order: getMinOrder(docs),
        children: docs.slice(0, 5).map(doc => ({
          title: doc.metadata.title,
          href: `/docs/${doc.slug}`,
          order: doc.metadata.order || 0
        }))
      })
      categoryMap.delete(category)
    }
  })

  // Add remaining categories
  Array.from(categoryMap.entries())
    .sort(([, docsA], [, docsB]) => getMinOrder(docsA) - getMinOrder(docsB))
    .slice(0, 5) // Limit categories in main nav
    .forEach(([category, docs]) => {
      const sortedDocs = docs.sort(getSortFunction(sortBy))
      navigation.push({
        title: category,
        href: `/docs/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        order: getMinOrder(docs),
        children: sortedDocs.slice(0, 3).map(doc => ({
          title: doc.metadata.title,
          href: `/docs/${doc.slug}`,
          order: doc.metadata.order || 0
        }))
      })
    })

  return navigation.sort((a, b) => a.order - b.order)
}

// Generate sidebar navigation (detailed structure)
function generateSidebarNavigation(
  docs: any[],
  options: { maxDepth: number; sortBy: string }
): NavigationItem[] {
  const { maxDepth, sortBy } = options

  // Group by category
  const categoryMap = new Map<string, any[]>()
  docs.forEach(doc => {
    const category = doc.metadata.category || 'General'
    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }
    categoryMap.get(category)!.push(doc)
  })

  // Convert to hierarchical structure
  const navigation: NavigationItem[] = []

  Array.from(categoryMap.entries())
    .sort(([, docsA], [, docsB]) => getMinOrder(docsA) - getMinOrder(docsB))
    .forEach(([category, docs]) => {
      const sortedDocs = docs.sort(getSortFunction(sortBy))
      
      // Create category section
      const categoryItem: NavigationItem = {
        title: category,
        href: `/docs/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        order: getMinOrder(docs),
        children: []
      }

      // Add documents to category
      sortedDocs.forEach(doc => {
        categoryItem.children!.push({
          title: doc.metadata.title,
          href: `/docs/${doc.slug}`,
          order: doc.metadata.order || 0
        })
      })

      navigation.push(categoryItem)
    })

  return navigation
}

// Generate breadcrumbs for a specific page
function generateBreadcrumbs(slug: string, docs: any[]): NavigationItem[] {
  const doc = docs.find(d => d.slug === slug)
  if (!doc) return []

  const breadcrumbs: NavigationItem[] = [
    { title: 'Home', href: '/', order: 0 },
    { title: 'Documentation', href: '/docs', order: 1 }
  ]

  // Add category if it exists and is not 'General'
  if (doc.metadata.category && doc.metadata.category !== 'General') {
    breadcrumbs.push({
      title: doc.metadata.category,
      href: `/docs/category/${doc.metadata.category.toLowerCase().replace(/\s+/g, '-')}`,
      order: 2
    })
  }

  // Add current page
  breadcrumbs.push({
    title: doc.metadata.title,
    href: `/docs/${slug}`,
    order: breadcrumbs.length
  })

  return breadcrumbs
}

// Generate footer navigation
function generateFooterNavigation(
  docs: any[],
  options: { includeExternal: boolean }
): NavigationItem[] {
  const { includeExternal } = options

  const footerItems: NavigationItem[] = []

  // Add key documentation links
  const keyCategories = ['Getting Started', 'Community', 'Contributing']
  
  keyCategories.forEach(category => {
    const categoryDocs = docs.filter(doc => doc.metadata.category === category)
    if (categoryDocs.length > 0) {
      footerItems.push({
        title: category,
        href: `/docs/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        order: 0,
        children: categoryDocs
          .sort(getSortFunction('order'))
          .slice(0, 4)
          .map(doc => ({
            title: doc.metadata.title,
            href: `/docs/${doc.slug}`,
            order: doc.metadata.order || 0
          }))
      })
    }
  })

  // Add external links if enabled
  if (includeExternal) {
    footerItems.push({
      title: 'Community',
      href: '#',
      order: 100,
      children: [
        { title: 'GitHub', href: 'https://github.com/openlaunch', order: 0, external: true },
        { title: 'Discord', href: 'https://discord.gg/openlaunch', order: 1, external: true },
        { title: 'Twitter', href: 'https://twitter.com/openlaunch', order: 2, external: true },
        { title: 'LinkedIn', href: 'https://linkedin.com/company/openlaunch', order: 3, external: true }
      ]
    })
  }

  return footerItems
}

// Utility functions
function getSortFunction(sortBy: string) {
  switch (sortBy) {
    case 'title':
      return (a: any, b: any) => a.metadata.title.localeCompare(b.metadata.title)
    case 'date':
      return (a: any, b: any) => {
        const dateA = new Date(a.metadata.date || 0).getTime()
        const dateB = new Date(b.metadata.date || 0).getTime()
        return dateB - dateA // Newest first
      }
    case 'order':
    default:
      return (a: any, b: any) => (a.metadata.order || 0) - (b.metadata.order || 0)
  }
}

function getMinOrder(docs: any[]): number {
  return Math.min(...docs.map(doc => doc.metadata.order || 0))
}

// Generate sitemap from navigation
export function generateSitemap(navigation: NavigationItem[], baseUrl: string = 'https://openlaunch.org'): string {
  const urls: string[] = []

  function extractUrls(items: NavigationItem[], priority: number = 0.8) {
    items.forEach(item => {
      if (item.href && !item.external && !item.href.startsWith('#')) {
        const url = item.href.startsWith('/') ? `${baseUrl}${item.href}` : item.href
        urls.push(`  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`)
      }

      if (item.children) {
        extractUrls(item.children, Math.max(0.3, priority - 0.1))
      }
    })
  }

  extractUrls(navigation, 0.8)

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}

// Generate robots.txt
export function generateRobotsTxt(sitemapUrl: string = 'https://openlaunch.org/sitemap.xml'): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${sitemapUrl}

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow common assets
Allow: /images/
Allow: /css/
Allow: /js/
Allow: /fonts/
`
}

// Navigation validation
export function validateNavigation(navigation: NavigationItem[]): {
  valid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []
  const seenHrefs = new Set<string>()

  function validateItem(item: NavigationItem, depth: number = 0) {
    // Check required fields
    if (!item.title) {
      errors.push(`Navigation item missing title at depth ${depth}`)
    }

    if (!item.href) {
      errors.push(`Navigation item "${item.title}" missing href`)
    }

    // Check for duplicate hrefs
    if (item.href && seenHrefs.has(item.href)) {
      warnings.push(`Duplicate href found: ${item.href}`)
    }
    if (item.href) {
      seenHrefs.add(item.href)
    }

    // Check depth
    if (depth > 3) {
      warnings.push(`Navigation depth exceeds 3 levels for "${item.title}"`)
    }

    // Validate children
    if (item.children) {
      item.children.forEach(child => validateItem(child, depth + 1))
    }
  }

  navigation.forEach(item => validateItem(item))

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}