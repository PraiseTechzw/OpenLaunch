import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), '../docs')
const designDirectory = path.join(process.cwd(), '../design')
const communityDirectory = path.join(process.cwd(), '../community')
const contentDirectory = path.join(process.cwd(), 'content')

export interface DocMetadata {
  title: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  category?: string
  order?: number
  showInNav?: boolean
  lastUpdated?: string
  contributors?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedReadTime?: number
  relatedPages?: string[]
  seo?: {
    keywords?: string[]
    ogImage?: string
    canonical?: string
  }
}

export interface DocContent {
  slug: string
  metadata: DocMetadata
  content: string
  excerpt?: string
  readingTime?: number
  wordCount?: number
}

export interface ContentCategory {
  name: string
  slug: string
  description: string
  pages: DocContent[]
  order: number
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Extract excerpt from content (first paragraph or 160 characters)
function extractExcerpt(content: string): string {
  // Remove markdown headers and formatting
  const cleanContent = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .trim()

  // Get first paragraph or first 160 characters
  const firstParagraph = cleanContent.split('\n\n')[0]
  if (firstParagraph && firstParagraph.length <= 160) {
    return firstParagraph
  }
  
  return cleanContent.substring(0, 160).trim() + (cleanContent.length > 160 ? '...' : '')
}

// Get all possible content directories
function getContentDirectories(): string[] {
  const directories = [docsDirectory, designDirectory, communityDirectory]
  
  // Add content directory if it exists
  if (fs.existsSync(contentDirectory)) {
    directories.push(contentDirectory)
  }
  
  return directories.filter(dir => fs.existsSync(dir))
}

export function getDocBySlug(slug: string): DocContent | null {
  try {
    const directories = getContentDirectories()
    
    for (const directory of directories) {
      const fullPath = path.join(directory, `${slug}.md`)
      
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const wordCount = content.trim().split(/\s+/).length
        const readingTime = calculateReadingTime(content)
        const excerpt = data.excerpt || extractExcerpt(content)

        return {
          slug,
          metadata: {
            title: data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: data.description,
            date: data.date,
            author: data.author,
            tags: data.tags || [],
            category: data.category,
            order: data.order || 0,
            showInNav: data.showInNav !== false, // Default to true
            lastUpdated: data.lastUpdated || data.date,
            contributors: data.contributors || [],
            difficulty: data.difficulty,
            estimatedReadTime: data.estimatedReadTime || readingTime,
            relatedPages: data.relatedPages || [],
            seo: {
              keywords: data.seo?.keywords || data.tags || [],
              ogImage: data.seo?.ogImage,
              canonical: data.seo?.canonical,
            }
          },
          content,
          excerpt,
          readingTime,
          wordCount,
        }
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error reading doc ${slug}:`, error)
    return null
  }
}

export function getAllDocs(): DocContent[] {
  const docs: DocContent[] = []
  const directories = getContentDirectories()
  
  directories.forEach(directory => {
    if (fs.existsSync(directory)) {
      const files = fs.readdirSync(directory)
      files.forEach(fileName => {
        if (fileName.endsWith('.md')) {
          const slug = fileName.replace(/\.md$/, '')
          const doc = getDocBySlug(slug)
          if (doc) docs.push(doc)
        }
      })
    }
  })
  
  // Sort by order, then by title
  return docs.sort((a, b) => {
    if (a.metadata.order !== b.metadata.order) {
      return (a.metadata.order || 0) - (b.metadata.order || 0)
    }
    return a.metadata.title.localeCompare(b.metadata.title)
  })
}

export function getDocsByCategory(): ContentCategory[] {
  const allDocs = getAllDocs()
  const categoriesMap = new Map<string, DocContent[]>()
  
  // Group docs by category
  allDocs.forEach(doc => {
    const category = doc.metadata.category || 'General'
    if (!categoriesMap.has(category)) {
      categoriesMap.set(category, [])
    }
    categoriesMap.get(category)!.push(doc)
  })
  
  // Convert to ContentCategory array
  const categories: ContentCategory[] = []
  categoriesMap.forEach((pages, categoryName) => {
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-')
    categories.push({
      name: categoryName,
      slug: categorySlug,
      description: `${categoryName} documentation and resources`,
      pages: pages.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0)),
      order: pages[0]?.metadata.order || 0
    })
  })
  
  return categories.sort((a, b) => a.order - b.order)
}

export function getDocSlugs(): string[] {
  const slugs: string[] = []
  const directories = getContentDirectories()
  
  directories.forEach(directory => {
    if (fs.existsSync(directory)) {
      const files = fs.readdirSync(directory)
      files.forEach(fileName => {
        if (fileName.endsWith('.md')) {
          slugs.push(fileName.replace(/\.md$/, ''))
        }
      })
    }
  })
  
  return Array.from(new Set(slugs)) // Remove duplicates
}

// Search functionality
export function searchDocs(query: string): DocContent[] {
  const allDocs = getAllDocs()
  const searchTerm = query.toLowerCase()
  
  return allDocs.filter(doc => {
    const titleMatch = doc.metadata.title.toLowerCase().includes(searchTerm)
    const contentMatch = doc.content.toLowerCase().includes(searchTerm)
    const tagMatch = doc.metadata.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    const descriptionMatch = doc.metadata.description?.toLowerCase().includes(searchTerm)
    
    return titleMatch || contentMatch || tagMatch || descriptionMatch
  })
}

// Get related docs based on tags and category
export function getRelatedDocs(slug: string, limit: number = 3): DocContent[] {
  const currentDoc = getDocBySlug(slug)
  if (!currentDoc) return []
  
  const allDocs = getAllDocs().filter(doc => doc.slug !== slug)
  
  // Score docs based on similarity
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
    
    // Explicitly related pages get highest score
    if (currentDoc.metadata.relatedPages?.includes(doc.slug)) {
      score += 20
    }
    
    return { doc, score }
  })
  
  return scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.doc)
}