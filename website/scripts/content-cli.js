#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// CLI for content management
class ContentCLI {
  constructor() {
    this.contentDir = path.join(__dirname, '../content')
    this.docsDir = path.join(__dirname, '../../docs')
    this.communityDir = path.join(__dirname, '../../community')
    this.designDir = path.join(__dirname, '../../design')
  }

  // Ensure content directory exists
  ensureContentDir() {
    if (!fs.existsSync(this.contentDir)) {
      fs.mkdirSync(this.contentDir, { recursive: true })
      console.log(`✅ Created content directory: ${this.contentDir}`)
    }
  }

  // Create new content file
  createContent(slug, options = {}) {
    this.ensureContentDir()
    
    const filePath = path.join(this.contentDir, `${slug}.md`)
    
    if (fs.existsSync(filePath)) {
      console.error(`❌ File already exists: ${slug}.md`)
      return false
    }

    const metadata = {
      title: options.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: options.description || '',
      date: new Date().toISOString().split('T')[0],
      author: options.author || 'OpenLaunch Team',
      tags: options.tags ? options.tags.split(',').map(t => t.trim()) : [],
      category: options.category || 'General',
      order: parseInt(options.order) || 0,
      showInNav: options.showInNav !== 'false'
    }

    // Add optional fields only if they have values
    if (options.difficulty) {
      metadata.difficulty = options.difficulty
    }
    
    if (options.estimatedReadTime) {
      metadata.estimatedReadTime = parseInt(options.estimatedReadTime)
    }
    
    if (options.keywords) {
      metadata.seo = {
        keywords: options.keywords.split(',').map(k => k.trim())
      }
    }

    const template = this.getTemplate(options.template || 'default')
    const content = template.replace(/\{title\}/g, metadata.title)
    
    const fileContent = matter.stringify(content, metadata)
    
    try {
      fs.writeFileSync(filePath, fileContent, 'utf8')
      console.log(`✅ Created: ${slug}.md`)
      console.log(`📍 Location: ${filePath}`)
      return true
    } catch (error) {
      console.error(`❌ Error creating file: ${error.message}`)
      return false
    }
  }

  // Get content template
  getTemplate(templateName) {
    const templates = {
      default: `# {title}

## Overview

Brief description of the content.

## Content

Main content goes here.

## Next Steps

What to do next or related resources.
`,
      
      tutorial: `# {title}

## What You'll Learn

- Learning objective 1
- Learning objective 2
- Learning objective 3

## Prerequisites

What you need before starting this tutorial.

## Step 1: Setup

Initial setup instructions.

## Step 2: Implementation

Core implementation steps.

## Step 3: Testing

How to test your implementation.

## Conclusion

Summary and next steps.
`,

      guide: `# {title}

## Introduction

Brief introduction to the topic.

## Getting Started

How to get started.

## Best Practices

Recommended approaches and patterns.

## Common Issues

Troubleshooting common problems.

## Resources

Additional resources and references.
`,

      reference: `# {title}

## Description

Brief description of the API or feature.

## Usage

How to use this feature.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1    | string | Yes | Parameter description |

## Examples

\`\`\`javascript
// Example code
\`\`\`

## Return Value

What this returns.
`
    }

    return templates[templateName] || templates.default
  }

  // List all content files
  listContent() {
    const directories = [
      { name: 'Content', path: this.contentDir },
      { name: 'Docs', path: this.docsDir },
      { name: 'Community', path: this.communityDir },
      { name: 'Design', path: this.designDir }
    ]

    console.log('\n📚 Content Overview\n')

    directories.forEach(({ name, path: dirPath }) => {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath)
          .filter(file => file.endsWith('.md'))
          .sort()

        if (files.length > 0) {
          console.log(`\n${name} (${files.length} files):`)
          files.forEach(file => {
            const filePath = path.join(dirPath, file)
            const content = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(content)
            
            const slug = file.replace('.md', '')
            const title = data.title || slug
            const category = data.category || 'General'
            const tags = data.tags ? data.tags.join(', ') : 'No tags'
            
            console.log(`  📄 ${slug}`)
            console.log(`     Title: ${title}`)
            console.log(`     Category: ${category}`)
            console.log(`     Tags: ${tags}`)
          })
        }
      }
    })
  }

  // Validate content structure
  validateContent() {
    console.log('\n🔍 Validating Content Structure\n')
    
    const directories = [
      { name: 'Content', path: this.contentDir },
      { name: 'Docs', path: this.docsDir },
      { name: 'Community', path: this.communityDir },
      { name: 'Design', path: this.designDir }
    ]

    let totalFiles = 0
    let totalErrors = 0
    let totalWarnings = 0
    const allSlugs = new Set()

    directories.forEach(({ name, path: dirPath }) => {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'))
        
        files.forEach(file => {
          totalFiles++
          const filePath = path.join(dirPath, file)
          const slug = file.replace('.md', '')
          
          // Check for duplicate slugs
          if (allSlugs.has(slug)) {
            console.log(`❌ Duplicate slug: ${slug}`)
            totalErrors++
          }
          allSlugs.add(slug)

          try {
            const content = fs.readFileSync(filePath, 'utf8')
            const { data, content: body } = matter(content)
            
            // Validate required fields
            if (!data.title) {
              console.log(`❌ Missing title: ${slug}`)
              totalErrors++
            }
            
            if (!data.description) {
              console.log(`⚠️  Missing description: ${slug}`)
              totalWarnings++
            }
            
            if (!data.category) {
              console.log(`⚠️  Missing category: ${slug}`)
              totalWarnings++
            }
            
            // Validate content structure
            if (!body || body.trim().length === 0) {
              console.log(`❌ Empty content: ${slug}`)
              totalErrors++
            }
            
            // Check for headings
            const headings = body.match(/^#{1,6}\s+/gm)
            if (!headings || headings.length === 0) {
              console.log(`⚠️  No headings found: ${slug}`)
              totalWarnings++
            }
            
            // Check title length for SEO
            if (data.title && data.title.length > 60) {
              console.log(`⚠️  Title too long (${data.title.length} chars): ${slug}`)
              totalWarnings++
            }
            
            // Check description length for SEO
            if (data.description && data.description.length > 160) {
              console.log(`⚠️  Description too long (${data.description.length} chars): ${slug}`)
              totalWarnings++
            }
            
          } catch (error) {
            console.log(`❌ Error reading ${slug}: ${error.message}`)
            totalErrors++
          }
        })
      }
    })

    console.log(`\n📊 Validation Summary:`)
    console.log(`   Files checked: ${totalFiles}`)
    console.log(`   Errors: ${totalErrors}`)
    console.log(`   Warnings: ${totalWarnings}`)
    
    if (totalErrors === 0 && totalWarnings === 0) {
      console.log(`✅ All content is valid!`)
    } else if (totalErrors === 0) {
      console.log(`✅ No errors found, but ${totalWarnings} warnings to address`)
    } else {
      console.log(`❌ Found ${totalErrors} errors that need to be fixed`)
    }
  }

  // Generate navigation structure
  generateNavigation() {
    console.log('\n🧭 Generating Navigation Structure\n')
    
    const directories = [
      { name: 'Content', path: this.contentDir },
      { name: 'Docs', path: this.docsDir },
      { name: 'Community', path: this.communityDir },
      { name: 'Design', path: this.designDir }
    ]

    const navigation = new Map()
    
    directories.forEach(({ path: dirPath }) => {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'))
        
        files.forEach(file => {
          const filePath = path.join(dirPath, file)
          const slug = file.replace('.md', '')
          
          try {
            const content = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(content)
            
            if (data.showInNav !== false) {
              const category = data.category || 'General'
              
              if (!navigation.has(category)) {
                navigation.set(category, [])
              }
              
              navigation.get(category).push({
                title: data.title || slug,
                href: `/docs/${slug}`,
                order: data.order || 0,
                slug
              })
            }
          } catch (error) {
            console.log(`⚠️  Error processing ${slug}: ${error.message}`)
          }
        })
      }
    })

    // Sort and display navigation
    const sortedCategories = Array.from(navigation.entries())
      .sort(([, itemsA], [, itemsB]) => {
        const minOrderA = Math.min(...itemsA.map(item => item.order))
        const minOrderB = Math.min(...itemsB.map(item => item.order))
        return minOrderA - minOrderB
      })

    sortedCategories.forEach(([category, items]) => {
      console.log(`📁 ${category}:`)
      
      items.sort((a, b) => a.order - b.order).forEach(item => {
        console.log(`   📄 ${item.title} (${item.slug}) - Order: ${item.order}`)
      })
      console.log()
    })

    // Generate navigation JSON
    const navStructure = sortedCategories.map(([category, items]) => ({
      category,
      items: items.sort((a, b) => a.order - b.order).map(({ title, href, order }) => ({
        title,
        href,
        order
      }))
    }))

    const navPath = path.join(__dirname, '../src/data/navigation.json')
    fs.writeFileSync(navPath, JSON.stringify(navStructure, null, 2))
    console.log(`✅ Navigation structure saved to: ${navPath}`)
  }

  // Update metadata for multiple files
  bulkUpdate(pattern, updates) {
    console.log(`\n🔄 Bulk updating files matching: ${pattern}\n`)
    
    const directories = [this.contentDir, this.docsDir, this.communityDir, this.designDir]
    let updatedCount = 0
    
    directories.forEach(dirPath => {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath)
          .filter(file => file.endsWith('.md') && file.includes(pattern))
        
        files.forEach(file => {
          const filePath = path.join(dirPath, file)
          const slug = file.replace('.md', '')
          
          try {
            const content = fs.readFileSync(filePath, 'utf8')
            const { data, content: body } = matter(content)
            
            // Apply updates
            const updatedData = { ...data }
            Object.keys(updates).forEach(key => {
              if (updates[key] !== undefined) {
                updatedData[key] = updates[key]
              }
            })
            
            // Add lastUpdated timestamp
            updatedData.lastUpdated = new Date().toISOString().split('T')[0]
            
            const updatedContent = matter.stringify(body, updatedData)
            fs.writeFileSync(filePath, updatedContent, 'utf8')
            
            console.log(`✅ Updated: ${slug}`)
            updatedCount++
            
          } catch (error) {
            console.log(`❌ Error updating ${slug}: ${error.message}`)
          }
        })
      }
    })
    
    console.log(`\n📊 Updated ${updatedCount} files`)
  }

  // Show help
  showHelp() {
    console.log(`
📚 OpenLaunch Content Management CLI

Usage: node content-cli.js <command> [options]

Commands:
  create <slug>           Create new content file
  list                    List all content files
  validate               Validate content structure
  nav                    Generate navigation structure
  bulk-update <pattern>  Update multiple files

Create Options:
  --title <title>        Content title
  --description <desc>   Content description
  --category <cat>       Content category
  --tags <tags>          Comma-separated tags
  --template <type>      Template type (default, tutorial, guide, reference)
  --author <author>      Content author
  --difficulty <level>   Difficulty level (beginner, intermediate, advanced)
  --order <number>       Display order

Bulk Update Options:
  --category <cat>       Update category
  --author <author>      Update author
  --tags <tags>          Update tags (comma-separated)

Examples:
  node content-cli.js create getting-started --title "Getting Started" --category "Tutorial"
  node content-cli.js list
  node content-cli.js validate
  node content-cli.js nav
  node content-cli.js bulk-update "tutorial" --category "Tutorials"
`)
  }

  // Parse command line arguments
  parseArgs(args) {
    const options = {}
    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith('--')) {
        const key = args[i].substring(2)
        const value = args[i + 1]
        if (value && !value.startsWith('--')) {
          options[key] = value
          i++ // Skip next argument as it's the value
        }
      }
    }
    return options
  }

  // Main CLI entry point
  run() {
    const args = process.argv.slice(2)
    
    if (args.length === 0) {
      this.showHelp()
      return
    }

    const command = args[0]
    const options = this.parseArgs(args.slice(1))

    switch (command) {
      case 'create':
        if (args[1]) {
          this.createContent(args[1], options)
        } else {
          console.error('❌ Please provide a slug for the new content')
        }
        break
        
      case 'list':
        this.listContent()
        break
        
      case 'validate':
        this.validateContent()
        break
        
      case 'nav':
        this.generateNavigation()
        break
        
      case 'bulk-update':
        if (args[1]) {
          this.bulkUpdate(args[1], options)
        } else {
          console.error('❌ Please provide a pattern for bulk update')
        }
        break
        
      case 'help':
      case '--help':
      case '-h':
        this.showHelp()
        break
        
      default:
        console.error(`❌ Unknown command: ${command}`)
        this.showHelp()
    }
  }
}

// Run CLI if called directly
if (require.main === module) {
  const cli = new ContentCLI()
  cli.run()
}

module.exports = ContentCLI