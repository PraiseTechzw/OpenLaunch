import { DocContent, getAllDocs, getDocBySlug, searchDocs } from './markdown'
import { generateNavigation, NavigationItem } from './content-management'

// Cache for content to improve performance
const contentCache = new Map<string, DocContent>()
const navigationCache = new Map<string, NavigationItem[]>()
let allDocsCache: DocContent[] | null = null
let cacheTimestamp = 0

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000

// Check if cache is still valid
function isCacheValid(): boolean {
  return Date.now() - cacheTimestamp < CACHE_DURATION
}

// Clear all caches
export function clearContentCache(): void {
  contentCache.clear()
  navigationCache.clear()
  allDocsCache = null
  cacheTimestamp = 0
}

// Get all documents with caching
export function getCachedAllDocs(): DocContent[] {
  if (!allDocsCache || !isCacheValid()) {
    allDocsCache = getAllDocs()
    cacheTimestamp = Date.now()
  }
  return allDocsCache
}

// Get document by slug with caching
export function getCachedDocBySlug(slug: string): DocContent | null {
  const cacheKey = `doc:${slug}`
  
  if (contentCache.has(cacheKey) && isCacheValid()) {
    return contentCache.get(cacheKey) || null
  }
  
  const doc = getDocBySlug(slug)
  if (doc) {
    contentCache.set(cacheKey, doc)
  }
  
  return doc
}

// Get navigation with caching
export function getCachedNavigation(category?: string): NavigationItem[] {
  const cacheKey = `nav:${category || 'all'}`
  
  if (navigationCache.has(cacheKey) && isCacheValid()) {
    return navigationCache.get(cacheKey) || []
  }
  
  const allDocs = getCachedAllDocs()
  const filteredDocs = category 
    ? allDocs.filter(doc => doc.metadata.category === category)
    : allDocs
  
  const navigation = generateNavigation(filteredDocs)
  navigationCache.set(cacheKey, navigation)
  
  return navigation
}

// Search with caching and enhanced features
export function searchContent(
  query: string,
  options: {
    category?: string
    tags?: string[]
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    limit?: number
  } = {}
): DocContent[] {
  const { category, tags, difficulty, limit = 10 } = options
  
  // Get base search results
  let results = searchDocs(query)
  
  // Apply filters
  if (category) {
    results = results.filter(doc => doc.metadata.category === category)
  }
  
  if (tags && tags.length > 0) {
    results = results.filter(doc => 
      tags.some(tag => doc.metadata.tags?.includes(tag))
    )
  }
  
  if (difficulty) {
    results = results.filter(doc => doc.metadata.difficulty === difficulty)
  }
  
  // Sort by relevance (title matches first, then content matches)
  const queryLower = query.toLowerCase()
  results.sort((a, b) => {
    const aTitle = a.metadata.title.toLowerCase()
    const bTitle = b.metadata.title.toLowerCase()
    
    const aTitleMatch = aTitle.includes(queryLower)
    const bTitleMatch = bTitle.includes(queryLower)
    
    if (aTitleMatch && !bTitleMatch) return -1
    if (!aTitleMatch && bTitleMatch) return 1
    
    // If both or neither match title, sort by title alphabetically
    return aTitle.localeCompare(bTitle)
  })
  
  return results.slice(0, limit)
}

// Get content by category with enhanced metadata
export function getContentByCategory(category: string): {
  category: string
  description: string
  docs: DocContent[]
  totalCount: number
  avgReadingTime: number
} {
  const allDocs = getCachedAllDocs()
  const categoryDocs = allDocs.filter(doc => doc.metadata.category === category)
  
  const totalReadingTime = categoryDocs.reduce(
    (sum, doc) => sum + (doc.readingTime || 0), 
    0
  )
  
  return {
    category,
    description: `Documentation and resources for ${category}`,
    docs: categoryDocs,
    totalCount: categoryDocs.length,
    avgReadingTime: Math.round(totalReadingTime / Math.max(categoryDocs.length, 1))
  }
}

// Get featured content (based on metadata flags or popularity)
export function getFeaturedContent(limit: number = 5): DocContent[] {
  const allDocs = getCachedAllDocs()
  
  // Priority order: featured flag, getting started category, high order, recent
  return allDocs
    .filter(doc => doc.metadata.showInNav !== false)
    .sort((a, b) => {
      // Featured content first
      const aFeatured = a.metadata.tags?.includes('featured') || false
      const bFeatured = b.metadata.tags?.includes('featured') || false
      if (aFeatured !== bFeatured) return bFeatured ? 1 : -1
      
      // Getting started category next
      const aGettingStarted = a.metadata.category === 'Getting Started'
      const bGettingStarted = b.metadata.category === 'Getting Started'
      if (aGettingStarted !== bGettingStarted) return bGettingStarted ? 1 : -1
      
      // Higher order next
      const aOrder = a.metadata.order || 0
      const bOrder = b.metadata.order || 0
      if (aOrder !== bOrder) return aOrder - bOrder
      
      // Most recent last
      const aDate = new Date(a.metadata.date || 0).getTime()
      const bDate = new Date(b.metadata.date || 0).getTime()
      return bDate - aDate
    })
    .slice(0, limit)
}

// Get recent content
export function getRecentContent(limit: number = 5): DocContent[] {
  const allDocs = getCachedAllDocs()
  
  return allDocs
    .filter(doc => doc.metadata.date)
    .sort((a, b) => {
      const aDate = new Date(a.metadata.date || 0).getTime()
      const bDate = new Date(b.metadata.date || 0).getTime()
      return bDate - aDate
    })
    .slice(0, limit)
}

// Get content statistics
export function getContentStats(): {
  totalDocs: number
  categories: { name: string; count: number }[]
  totalReadingTime: number
  avgReadingTime: number
  difficulties: { level: string; count: number }[]
  tags: { name: string; count: number }[]
} {
  const allDocs = getCachedAllDocs()
  
  // Category stats
  const categoryMap = new Map<string, number>()
  allDocs.forEach(doc => {
    const category = doc.metadata.category || 'General'
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
  })
  
  // Difficulty stats
  const difficultyMap = new Map<string, number>()
  allDocs.forEach(doc => {
    if (doc.metadata.difficulty) {
      const difficulty = doc.metadata.difficulty
      difficultyMap.set(difficulty, (difficultyMap.get(difficulty) || 0) + 1)
    }
  })
  
  // Tag stats
  const tagMap = new Map<string, number>()
  allDocs.forEach(doc => {
    doc.metadata.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  const totalReadingTime = allDocs.reduce(
    (sum, doc) => sum + (doc.readingTime || 0), 
    0
  )
  
  return {
    totalDocs: allDocs.length,
    categories: Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    totalReadingTime,
    avgReadingTime: Math.round(totalReadingTime / Math.max(allDocs.length, 1)),
    difficulties: Array.from(difficultyMap.entries())
      .map(([level, count]) => ({ level, count }))
      .sort((a, b) => b.count - a.count),
    tags: Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20) // Top 20 tags
  }
}

// Content recommendation engine
export function getRecommendedContent(
  currentSlug: string,
  limit: number = 3
): DocContent[] {
  const currentDoc = getCachedDocBySlug(currentSlug)
  if (!currentDoc) return []
  
  const allDocs = getCachedAllDocs().filter(doc => doc.slug !== currentSlug)
  
  // Score documents based on similarity
  const scoredDocs = allDocs.map(doc => {
    let score = 0
    
    // Same category gets high score
    if (doc.metadata.category === currentDoc.metadata.category) {
      score += 10
    }
    
    // Shared tags get points
    const sharedTags = doc.metadata.tags?.filter(tag => 
      currentDoc.metadata.tags?.includes(tag)
    ) || []
    score += sharedTags.length * 5
    
    // Similar difficulty level
    if (doc.metadata.difficulty === currentDoc.metadata.difficulty) {
      score += 3
    }
    
    // Explicitly related pages get highest score
    if (currentDoc.metadata.relatedPages?.includes(doc.slug)) {
      score += 20
    }
    
    // Boost recent content slightly
    const docAge = Date.now() - new Date(doc.metadata.date || 0).getTime()
    const daysSinceCreation = docAge / (1000 * 60 * 60 * 24)
    if (daysSinceCreation < 30) {
      score += 2
    }
    
    return { doc, score }
  })
  
  return scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.doc)
}

// Breadcrumb generation
export function generateBreadcrumbs(slug: string): Array<{ title: string; href: string }> {
  const doc = getCachedDocBySlug(slug)
  if (!doc) return []
  
  const breadcrumbs = [
    { title: 'Home', href: '/' },
    { title: 'Documentation', href: '/docs' }
  ]
  
  // Add category if it exists and is not 'General'
  if (doc.metadata.category && doc.metadata.category !== 'General') {
    breadcrumbs.push({
      title: doc.metadata.category,
      href: `/docs/category/${doc.metadata.category.toLowerCase().replace(/\s+/g, '-')}`
    })
  }
  
  // Add current page
  breadcrumbs.push({
    title: doc.metadata.title,
    href: `/docs/${slug}`
  })
  
  return breadcrumbs
}

// Content validation for dynamic loading
export function validateContentStructure(): {
  valid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []
  
  try {
    const allDocs = getCachedAllDocs()
    
    // Check for duplicate slugs
    const slugs = new Set<string>()
    allDocs.forEach(doc => {
      if (slugs.has(doc.slug)) {
        errors.push(`Duplicate slug found: ${doc.slug}`)
      }
      slugs.add(doc.slug)
    })
    
    // Check for missing required metadata
    allDocs.forEach(doc => {
      if (!doc.metadata.title) {
        errors.push(`Missing title for ${doc.slug}`)
      }
      if (!doc.metadata.description) {
        warnings.push(`Missing description for ${doc.slug}`)
      }
      if (!doc.metadata.category) {
        warnings.push(`Missing category for ${doc.slug}`)
      }
    })
    
    // Check for broken internal links
    allDocs.forEach(doc => {
      const internalLinks = doc.content.match(/\[([^\]]+)\]\(\.\/([^)]+)\)/g) || []
      internalLinks.forEach(link => {
        const linkSlug = link.match(/\]\(\.\/([^)]+)\)/)?.[1]
        if (linkSlug && !slugs.has(linkSlug)) {
          warnings.push(`Broken internal link in ${doc.slug}: ${linkSlug}`)
        }
      })
    })
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  } catch (error) {
    return {
      valid: false,
      errors: [`Content validation failed: ${error}`],
      warnings: []
    }
  }
}