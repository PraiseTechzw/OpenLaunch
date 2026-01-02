import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DocContent, DocMetadata } from './markdown'

// Content validation and formatting utilities
export interface ContentValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface NavigationItem {
  title: string
  href: string
  order: number
  category?: string
  children?: NavigationItem[]
  external?: boolean
}

// Validate content structure and metadata
export function validateContent(content: string, metadata: DocMetadata): ContentValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Required fields validation
  if (!metadata.title || metadata.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!metadata.description || metadata.description.trim().length === 0) {
    warnings.push('Description is recommended for SEO')
  }

  // Content validation
  if (!content || content.trim().length === 0) {
    errors.push('Content cannot be empty')
  }

  // Title length validation
  if (metadata.title && metadata.title.length > 60) {
    warnings.push('Title should be under 60 characters for better SEO')
  }

  // Description length validation
  if (metadata.description && metadata.description.length > 160) {
    warnings.push('Description should be under 160 characters for better SEO')
  }

  // Content structure validation
  const headingMatches = content.match(/^#{1,6}\s+/gm)
  if (!headingMatches || headingMatches.length === 0) {
    warnings.push('Content should include headings for better structure')
  }

  // Check for proper heading hierarchy
  if (headingMatches) {
    const headingLevels = headingMatches.map(match => match.match(/^(#{1,6})/)?.[1].length || 0)
    let previousLevel = 0
    
    for (const level of headingLevels) {
      if (level > previousLevel + 1) {
        warnings.push('Heading hierarchy should not skip levels (e.g., h1 to h3)')
        break
      }
      previousLevel = level
    }
  }

  // Check for alt text in images
  const imageMatches = content.match(/!\[([^\]]*)\]\([^)]+\)/g)
  if (imageMatches) {
    imageMatches.forEach((match, index) => {
      const altText = match.match(/!\[([^\]]*)\]/)?.[1]
      if (!altText || altText.trim().length === 0) {
        warnings.push(`Image ${index + 1} is missing alt text for accessibility`)
      }
    })
  }

  // Check for external links without proper attributes
  const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g)
  if (linkMatches) {
    linkMatches.forEach(match => {
      const url = match.match(/\]\(([^)]+)\)/)?.[1]
      if (url && url.startsWith('http') && !content.includes('target="_blank"')) {
        warnings.push('External links should open in new tabs for better UX')
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Format content for consistency
export function formatContent(content: string): string {
  let formatted = content

  // Normalize line endings
  formatted = formatted.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // Ensure proper spacing around headings
  formatted = formatted.replace(/^(#{1,6}\s+.+)$/gm, '\n$1\n')

  // Ensure proper spacing around code blocks
  formatted = formatted.replace(/^```/gm, '\n```')
  formatted = formatted.replace(/^```$/gm, '```\n')

  // Remove excessive blank lines (more than 2 consecutive)
  formatted = formatted.replace(/\n{3,}/g, '\n\n')

  // Trim whitespace from lines
  formatted = formatted.split('\n').map(line => line.trimEnd()).join('\n')

  // Ensure file ends with single newline
  formatted = formatted.trim() + '\n'

  return formatted
}

// Generate navigation structure from content
export function generateNavigation(docs: DocContent[]): NavigationItem[] {
  const navigationMap = new Map<string, NavigationItem[]>()

  // Group by category
  docs.forEach(doc => {
    if (!doc.metadata.showInNav) return

    const category = doc.metadata.category || 'General'
    if (!navigationMap.has(category)) {
      navigationMap.set(category, [])
    }

    navigationMap.get(category)!.push({
      title: doc.metadata.title,
      href: `/docs/${doc.slug}`,
      order: doc.metadata.order || 0,
      category
    })
  })

  // Convert to hierarchical structure
  const navigation: NavigationItem[] = []

  navigationMap.forEach((items, category) => {
    // Sort items by order
    const sortedItems = items.sort((a, b) => a.order - b.order)

    if (category === 'General') {
      // Add general items directly to root
      navigation.push(...sortedItems)
    } else {
      // Create category group
      navigation.push({
        title: category,
        href: `#${category.toLowerCase().replace(/\s+/g, '-')}`,
        order: sortedItems[0]?.order || 0,
        children: sortedItems
      })
    }
  })

  return navigation.sort((a, b) => a.order - b.order)
}

// Create new content file with template
export function createContentFile(
  slug: string,
  metadata: Partial<DocMetadata>,
  content: string = '',
  directory: string = 'content'
): { success: boolean; error?: string; filePath?: string } {
  try {
    const contentDir = path.join(process.cwd(), directory)
    
    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }

    const filePath = path.join(contentDir, `${slug}.md`)
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return { success: false, error: 'File already exists' }
    }

    // Create frontmatter with defaults
    const frontmatter = {
      title: metadata.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: metadata.description || '',
      date: metadata.date || new Date().toISOString().split('T')[0],
      author: metadata.author || '',
      tags: metadata.tags || [],
      category: metadata.category || 'General',
      order: metadata.order || 0,
      showInNav: metadata.showInNav !== false,
      ...metadata
    }

    // Generate file content
    const fileContent = matter.stringify(content, frontmatter)
    
    // Write file
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return { success: true, filePath }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Update existing content file
export function updateContentFile(
  slug: string,
  updates: { metadata?: Partial<DocMetadata>; content?: string },
  directory?: string
): { success: boolean; error?: string } {
  try {
    // Find the file in available directories
    const directories = directory ? [directory] : ['content', '../docs', '../design', '../community']
    let filePath: string | null = null

    for (const dir of directories) {
      const fullDir = path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir)
      const testPath = path.join(fullDir, `${slug}.md`)
      if (fs.existsSync(testPath)) {
        filePath = testPath
        break
      }
    }

    if (!filePath) {
      return { success: false, error: 'File not found' }
    }

    // Read existing file
    const existingContent = fs.readFileSync(filePath, 'utf8')
    const { data: existingMetadata, content: existingBody } = matter(existingContent)

    // Merge updates
    const newMetadata = { ...existingMetadata, ...updates.metadata }
    const newContent = updates.content !== undefined ? updates.content : existingBody

    // Add lastUpdated timestamp
    newMetadata.lastUpdated = new Date().toISOString().split('T')[0]

    // Generate updated file content
    const updatedFileContent = matter.stringify(newContent, newMetadata)
    
    // Write file
    fs.writeFileSync(filePath, updatedFileContent, 'utf8')

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Generate sitemap data from content
export function generateSitemap(docs: DocContent[], baseUrl: string = 'https://openlaunch.org'): string {
  const urls = docs.map(doc => {
    const lastmod = doc.metadata.lastUpdated || doc.metadata.date
    const priority = doc.metadata.category === 'Getting Started' ? '1.0' : '0.8'
    
    return `  <url>
    <loc>${baseUrl}/docs/${doc.slug}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

// Content templates for different types
export const contentTemplates = {
  documentation: {
    metadata: {
      category: 'Documentation',
      tags: ['docs'],
      showInNav: true
    },
    content: `# {title}

## Overview

Brief description of what this document covers.

## Getting Started

Step-by-step instructions or introduction.

## Examples

Practical examples and use cases.

## Next Steps

Links to related documentation or next actions.
`
  },

  tutorial: {
    metadata: {
      category: 'Tutorials',
      tags: ['tutorial', 'guide'],
      difficulty: 'beginner' as const,
      estimatedReadTime: 10
    },
    content: `# {title}

## What You'll Learn

- Key learning objective 1
- Key learning objective 2
- Key learning objective 3

## Prerequisites

What you need to know or have installed before starting.

## Step 1: Setup

Instructions for initial setup.

## Step 2: Implementation

Core implementation steps.

## Step 3: Testing

How to verify everything works.

## Conclusion

Summary and next steps.
`
  },

  reference: {
    metadata: {
      category: 'Reference',
      tags: ['reference', 'api'],
      showInNav: true
    },
    content: `# {title}

## Description

Brief description of the API or feature.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1    | string | Yes | Description |

## Examples

\`\`\`javascript
// Example usage
\`\`\`

## Return Value

Description of what is returned.
`
  }
}

// Bulk operations
export function bulkUpdateMetadata(
  slugs: string[],
  updates: Partial<DocMetadata>
): { success: string[]; failed: { slug: string; error: string }[] } {
  const success: string[] = []
  const failed: { slug: string; error: string }[] = []

  slugs.forEach(slug => {
    const result = updateContentFile(slug, { metadata: updates })
    if (result.success) {
      success.push(slug)
    } else {
      failed.push({ slug, error: result.error || 'Unknown error' })
    }
  })

  return { success, failed }
}