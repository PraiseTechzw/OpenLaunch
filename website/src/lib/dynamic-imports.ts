import React, { lazy } from 'react'

// Utility for creating lazy-loaded components with better error handling
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T } | { [key: string]: T }>,
  exportName?: string,
  componentName?: string
) {
  return lazy(async () => {
    const name = componentName || exportName || 'UnknownComponent'
    
    try {
      const module = await importFn()
      
      if (exportName && exportName in module) {
        return { default: (module as any)[exportName] }
      }
      
      if ('default' in module) {
        return module as { default: T }
      }
      
      // If no default export, try to find the component by name
      const componentKey = exportName || Object.keys(module)[0]
      if (componentKey && componentKey in module) {
        return { default: (module as any)[componentKey] }
      }
      
      throw new Error(`Component ${name} not found in module`)
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error)
      // Return a fallback component
      const FallbackComponent: React.ComponentType<any> = () => {
        return React.createElement('div', {
          className: 'p-4 text-center text-gray-500 bg-gray-100 rounded-lg'
        }, [
          React.createElement('div', {
            key: 'title',
            className: 'text-sm font-medium mb-2'
          }, 'Component Loading Error'),
          React.createElement('div', {
            key: 'message',
            className: 'text-xs text-gray-400'
          }, `Failed to load ${name}`)
        ])
      }
      
      return { default: FallbackComponent as T }
    }
  })
}

// Pre-configured lazy components for common use cases
export const LazyFeatures = createLazyComponent(
  () => import('@/components/Features'),
  'Features',
  'Features'
)

export const LazyStats = createLazyComponent(
  () => import('@/components/Stats'),
  'Stats',
  'Stats'
)

export const LazyCommunityShowcase = createLazyComponent(
  () => import('@/components/CommunityShowcase'),
  'CommunityShowcase',
  'CommunityShowcase'
)

export const LazyCallToAction = createLazyComponent(
  () => import('@/components/CallToAction'),
  'CallToAction',
  'CallToAction'
)

// Page-specific lazy components
export const LazyMarkdownRenderer = createLazyComponent(
  () => import('@/components/MarkdownRenderer'),
  'MarkdownRenderer',
  'MarkdownRenderer'
)