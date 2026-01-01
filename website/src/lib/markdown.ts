import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), '../docs')
const designDirectory = path.join(process.cwd(), '../design')

export interface DocMetadata {
  title: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
}

export interface DocContent {
  slug: string
  metadata: DocMetadata
  content: string
}

export function getDocBySlug(slug: string): DocContent | null {
  try {
    // Try docs directory first
    let fullPath = path.join(docsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      // Try design directory
      fullPath = path.join(designDirectory, `${slug}.md`)
    }
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      metadata: {
        title: data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: data.description,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
      },
      content,
    }
  } catch (error) {
    console.error(`Error reading doc ${slug}:`, error)
    return null
  }
}

export function getAllDocs(): DocContent[] {
  const docs: DocContent[] = []
  
  // Get docs from docs directory
  if (fs.existsSync(docsDirectory)) {
    const docFiles = fs.readdirSync(docsDirectory)
    docFiles.forEach(fileName => {
      if (fileName.endsWith('.md')) {
        const slug = fileName.replace(/\.md$/, '')
        const doc = getDocBySlug(slug)
        if (doc) docs.push(doc)
      }
    })
  }
  
  // Get docs from design directory
  if (fs.existsSync(designDirectory)) {
    const designFiles = fs.readdirSync(designDirectory)
    designFiles.forEach(fileName => {
      if (fileName.endsWith('.md')) {
        const slug = fileName.replace(/\.md$/, '')
        const doc = getDocBySlug(slug)
        if (doc) docs.push(doc)
      }
    })
  }
  
  return docs
}

export function getDocSlugs(): string[] {
  const slugs: string[] = []
  
  if (fs.existsSync(docsDirectory)) {
    const docFiles = fs.readdirSync(docsDirectory)
    docFiles.forEach(fileName => {
      if (fileName.endsWith('.md')) {
        slugs.push(fileName.replace(/\.md$/, ''))
      }
    })
  }
  
  if (fs.existsSync(designDirectory)) {
    const designFiles = fs.readdirSync(designDirectory)
    designFiles.forEach(fileName => {
      if (fileName.endsWith('.md')) {
        slugs.push(fileName.replace(/\.md$/, ''))
      }
    })
  }
  
  return slugs
}