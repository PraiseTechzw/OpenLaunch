import { DocContent, DocMetadata } from './markdown'

export interface ValidationRule {
  name: string
  type: 'error' | 'warning' | 'info'
  check: (content: string, metadata: DocMetadata) => boolean
  message: (content: string, metadata: DocMetadata) => string
}

export interface ValidationResult {
  isValid: boolean
  score: number // 0-100
  issues: Array<{
    type: 'error' | 'warning' | 'info'
    rule: string
    message: string
    line?: number
    column?: number
  }>
}

export interface ContentFormatter {
  name: string
  description: string
  format: (content: string) => string
}

// Built-in validation rules
export const defaultValidationRules: ValidationRule[] = [
  // Required metadata rules
  {
    name: 'title-required',
    type: 'error',
    check: (_, metadata) => !!metadata.title && metadata.title.trim().length > 0,
    message: () => 'Title is required'
  },
  {
    name: 'description-required',
    type: 'warning',
    check: (_, metadata) => !!metadata.description && metadata.description.trim().length > 0,
    message: () => 'Description is recommended for SEO and user experience'
  },
  {
    name: 'category-required',
    type: 'warning',
    check: (_, metadata) => !!metadata.category && metadata.category.trim().length > 0,
    message: () => 'Category helps organize content'
  },

  // SEO rules
  {
    name: 'title-length',
    type: 'warning',
    check: (_, metadata) => !metadata.title || metadata.title.length <= 60,
    message: (_, metadata) => `Title is ${metadata.title?.length} characters, should be ≤60 for SEO`
  },
  {
    name: 'description-length',
    type: 'warning',
    check: (_, metadata) => !metadata.description || metadata.description.length <= 160,
    message: (_, metadata) => `Description is ${metadata.description?.length} characters, should be ≤160 for SEO`
  },
  {
    name: 'keywords-present',
    type: 'info',
    check: (_, metadata) => !!(metadata.seo?.keywords && metadata.seo.keywords.length > 0),
    message: () => 'SEO keywords help with discoverability'
  },

  // Content structure rules
  {
    name: 'content-not-empty',
    type: 'error',
    check: (content) => content.trim().length > 0,
    message: () => 'Content cannot be empty'
  },
  {
    name: 'has-headings',
    type: 'warning',
    check: (content) => /^#{1,6}\s+/m.test(content),
    message: () => 'Content should include headings for better structure'
  },
  {
    name: 'heading-hierarchy',
    type: 'warning',
    check: (content) => {
      const headings = content.match(/^(#{1,6})\s+/gm)
      if (!headings) return true
      
      const levels = headings.map(h => h.match(/^(#{1,6})/)?.[1].length || 0)
      let previousLevel = 0
      
      for (const level of levels) {
        if (level > previousLevel + 1) return false
        previousLevel = level
      }
      return true
    },
    message: () => 'Heading hierarchy should not skip levels (e.g., h1 to h3)'
  },
  {
    name: 'minimum-content-length',
    type: 'warning',
    check: (content) => content.trim().length >= 100,
    message: (content) => `Content is ${content.trim().length} characters, consider adding more detail`
  },

  // Accessibility rules
  {
    name: 'images-have-alt-text',
    type: 'error',
    check: (content) => {
      const images = content.match(/!\[([^\]]*)\]\([^)]+\)/g)
      if (!images) return true
      return images.every(img => {
        const altText = img.match(/!\[([^\]]*)\]/)?.[1]
        return altText && altText.trim().length > 0
      })
    },
    message: () => 'All images must have alt text for accessibility'
  },
  {
    name: 'links-have-descriptive-text',
    type: 'warning',
    check: (content) => {
      const links = content.match(/\[([^\]]+)\]\([^)]+\)/g)
      if (!links) return true
      return links.every(link => {
        const linkText = link.match(/\[([^\]]+)\]/)?.[1]
        return linkText && linkText.trim().length > 2 && 
               !['here', 'click', 'link', 'read more'].includes(linkText.toLowerCase().trim())
      })
    },
    message: () => 'Links should have descriptive text instead of "click here" or "read more"'
  },

  // Code quality rules
  {
    name: 'code-blocks-have-language',
    type: 'info',
    check: (content) => {
      const codeBlocks = content.match(/```(\w*)\n/g)
      if (!codeBlocks) return true
      return codeBlocks.every(block => {
        const lang = block.match(/```(\w*)\n/)?.[1]
        return lang && lang.length > 0
      })
    },
    message: () => 'Code blocks should specify language for syntax highlighting'
  },

  // Content quality rules
  {
    name: 'no-excessive-exclamation',
    type: 'warning',
    check: (content) => (content.match(/!/g) || []).length <= content.length / 100,
    message: () => 'Avoid excessive use of exclamation marks'
  },
  {
    name: 'no-all-caps',
    type: 'warning',
    check: (content) => !/[A-Z]{10,}/.test(content),
    message: () => 'Avoid writing in ALL CAPS'
  },
  {
    name: 'reading-time-reasonable',
    type: 'info',
    check: (content, metadata) => {
      const wordCount = content.trim().split(/\s+/).length
      const estimatedTime = Math.ceil(wordCount / 200)
      const declaredTime = metadata.estimatedReadTime
      return !declaredTime || Math.abs(estimatedTime - declaredTime) <= 2
    },
    message: (content, metadata) => {
      const wordCount = content.trim().split(/\s+/).length
      const estimatedTime = Math.ceil(wordCount / 200)
      return `Estimated reading time (${estimatedTime}min) differs from declared time (${metadata.estimatedReadTime}min)`
    }
  },

  // Consistency rules
  {
    name: 'consistent-date-format',
    type: 'warning',
    check: (_, metadata) => {
      if (!metadata.date) return true
      return /^\d{4}-\d{2}-\d{2}$/.test(metadata.date)
    },
    message: () => 'Date should be in YYYY-MM-DD format'
  },
  {
    name: 'tags-lowercase',
    type: 'info',
    check: (_, metadata) => {
      if (!metadata.tags) return true
      return metadata.tags.every(tag => tag === tag.toLowerCase())
    },
    message: () => 'Tags should be lowercase for consistency'
  }
]

// Content formatters
export const defaultFormatters: ContentFormatter[] = [
  {
    name: 'normalize-line-endings',
    description: 'Convert all line endings to LF',
    format: (content) => content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  },
  {
    name: 'trim-whitespace',
    description: 'Remove trailing whitespace from lines',
    format: (content) => content.split('\n').map(line => line.trimEnd()).join('\n')
  },
  {
    name: 'normalize-heading-spacing',
    description: 'Ensure proper spacing around headings',
    format: (content) => {
      return content
        .replace(/^(#{1,6}\s+.+)$/gm, '\n$1\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    }
  },
  {
    name: 'normalize-code-blocks',
    description: 'Ensure proper spacing around code blocks',
    format: (content) => {
      return content
        .replace(/^```/gm, '\n```')
        .replace(/```$/gm, '```\n')
        .replace(/\n{3,}/g, '\n\n')
    }
  },
  {
    name: 'fix-list-spacing',
    description: 'Ensure proper spacing in lists',
    format: (content) => {
      return content
        .replace(/^(\s*[-*+]\s+.+)$/gm, '$1')
        .replace(/^(\s*\d+\.\s+.+)$/gm, '$1')
    }
  },
  {
    name: 'ensure-final-newline',
    description: 'Ensure file ends with single newline',
    format: (content) => content.trim() + '\n'
  }
]

// Main validation function
export function validateContent(
  content: string,
  metadata: DocMetadata,
  rules: ValidationRule[] = defaultValidationRules
): ValidationResult {
  const issues: ValidationResult['issues'] = []
  let errorCount = 0
  let warningCount = 0

  rules.forEach(rule => {
    try {
      if (!rule.check(content, metadata)) {
        issues.push({
          type: rule.type,
          rule: rule.name,
          message: rule.message(content, metadata)
        })

        if (rule.type === 'error') errorCount++
        else if (rule.type === 'warning') warningCount++
      }
    } catch (error) {
      issues.push({
        type: 'error',
        rule: rule.name,
        message: `Validation rule failed: ${error}`
      })
      errorCount++
    }
  })

  // Calculate score (100 = perfect, 0 = many issues)
  const totalRules = rules.length
  const passedRules = totalRules - errorCount - warningCount * 0.5
  const score = Math.max(0, Math.round((passedRules / totalRules) * 100))

  return {
    isValid: errorCount === 0,
    score,
    issues
  }
}

// Format content using specified formatters
export function formatContent(
  content: string,
  formatters: ContentFormatter[] = defaultFormatters
): string {
  return formatters.reduce((formattedContent, formatter) => {
    try {
      return formatter.format(formattedContent)
    } catch (error) {
      console.warn(`Formatter "${formatter.name}" failed:`, error)
      return formattedContent
    }
  }, content)
}

// Batch validation for multiple documents
export function validateMultipleDocuments(
  documents: DocContent[],
  rules: ValidationRule[] = defaultValidationRules
): {
  overall: {
    totalDocs: number
    validDocs: number
    averageScore: number
    totalIssues: number
  }
  results: Array<{
    slug: string
    validation: ValidationResult
  }>
} {
  const results = documents.map(doc => ({
    slug: doc.slug,
    validation: validateContent(doc.content, doc.metadata, rules)
  }))

  const validDocs = results.filter(r => r.validation.isValid).length
  const averageScore = results.reduce((sum, r) => sum + r.validation.score, 0) / results.length
  const totalIssues = results.reduce((sum, r) => sum + r.validation.issues.length, 0)

  return {
    overall: {
      totalDocs: documents.length,
      validDocs,
      averageScore: Math.round(averageScore),
      totalIssues
    },
    results
  }
}

// Generate validation report
export function generateValidationReport(
  results: ReturnType<typeof validateMultipleDocuments>
): string {
  const { overall, results: docResults } = results

  let report = `# Content Validation Report

## Summary
- **Total Documents**: ${overall.totalDocs}
- **Valid Documents**: ${overall.validDocs} (${Math.round((overall.validDocs / overall.totalDocs) * 100)}%)
- **Average Score**: ${overall.averageScore}/100
- **Total Issues**: ${overall.totalIssues}

## Issues by Type
`

  // Count issues by type
  const issuesByType = { error: 0, warning: 0, info: 0 }
  docResults.forEach(result => {
    result.validation.issues.forEach(issue => {
      issuesByType[issue.type]++
    })
  })

  report += `- **Errors**: ${issuesByType.error}\n`
  report += `- **Warnings**: ${issuesByType.warning}\n`
  report += `- **Info**: ${issuesByType.info}\n\n`

  // Documents with issues
  const docsWithIssues = docResults.filter(r => r.validation.issues.length > 0)
  if (docsWithIssues.length > 0) {
    report += `## Documents with Issues\n\n`
    
    docsWithIssues.forEach(({ slug, validation }) => {
      report += `### ${slug} (Score: ${validation.score}/100)\n\n`
      
      validation.issues.forEach(issue => {
        const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️'
        report += `${icon} **${issue.rule}**: ${issue.message}\n`
      })
      
      report += '\n'
    })
  }

  // Top performing documents
  const topDocs = docResults
    .filter(r => r.validation.score >= 90)
    .sort((a, b) => b.validation.score - a.validation.score)
    .slice(0, 5)

  if (topDocs.length > 0) {
    report += `## Top Performing Documents\n\n`
    topDocs.forEach(({ slug, validation }) => {
      report += `- **${slug}**: ${validation.score}/100\n`
    })
    report += '\n'
  }

  // Recommendations
  report += `## Recommendations\n\n`
  
  if (issuesByType.error > 0) {
    report += `- Fix ${issuesByType.error} critical errors before publishing\n`
  }
  
  if (issuesByType.warning > 10) {
    report += `- Address ${issuesByType.warning} warnings to improve content quality\n`
  }
  
  if (overall.averageScore < 80) {
    report += `- Overall content quality needs improvement (current average: ${overall.averageScore}/100)\n`
  }
  
  report += `- Consider adding more detailed descriptions and proper categorization\n`
  report += `- Ensure all images have descriptive alt text for accessibility\n`

  return report
}

// Custom rule builder
export function createValidationRule(
  name: string,
  type: 'error' | 'warning' | 'info',
  check: (content: string, metadata: DocMetadata) => boolean,
  message: string | ((content: string, metadata: DocMetadata) => string)
): ValidationRule {
  return {
    name,
    type,
    check,
    message: typeof message === 'string' ? () => message : message
  }
}

// Preset rule sets
export const rulePresets = {
  strict: [
    ...defaultValidationRules,
    createValidationRule(
      'author-required',
      'error',
      (_, metadata) => !!metadata.author,
      'Author is required for all content'
    ),
    createValidationRule(
      'tags-required',
      'error',
      (_, metadata) => !!(metadata.tags && metadata.tags.length > 0),
      'At least one tag is required'
    )
  ],
  
  seo: defaultValidationRules.filter(rule => 
    ['title-length', 'description-length', 'keywords-present', 'description-required'].includes(rule.name)
  ),
  
  accessibility: defaultValidationRules.filter(rule =>
    ['images-have-alt-text', 'links-have-descriptive-text', 'has-headings'].includes(rule.name)
  ),
  
  basic: defaultValidationRules.filter(rule => rule.type === 'error')
}