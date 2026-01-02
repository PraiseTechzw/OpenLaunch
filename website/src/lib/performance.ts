'use client'

// Performance monitoring utilities for code splitting effectiveness

export interface PerformanceMetrics {
  loadTime: number
  chunkCount: number
  totalSize: number
  cacheHitRate: number
}

class PerformanceMonitor {
  private metrics: Map<string, number> = new Map()
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers()
    }
  }

  private initializeObservers() {
    // Monitor resource loading
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('chunk') || entry.name.includes('.js')) {
            this.recordMetric(`chunk_load_${entry.name}`, entry.duration)
          }
        }
      })

      resourceObserver.observe({ entryTypes: ['resource'] })
      this.observers.push(resourceObserver)

      // Monitor navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const navEntry = entry as PerformanceNavigationTiming
          this.recordMetric('page_load_time', navEntry.loadEventEnd - navEntry.fetchStart)
          this.recordMetric('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.fetchStart)
        }
      })

      navigationObserver.observe({ entryTypes: ['navigation'] })
      this.observers.push(navigationObserver)
    }
  }

  recordMetric(name: string, value: number) {
    this.metrics.set(name, value)
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name)
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  // Measure component lazy loading performance
  measureLazyLoad<T>(
    componentName: string,
    loadFn: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now()
    
    return loadFn().then((result) => {
      const endTime = performance.now()
      this.recordMetric(`lazy_load_${componentName}`, endTime - startTime)
      return result
    }).catch((error) => {
      const endTime = performance.now()
      this.recordMetric(`lazy_load_error_${componentName}`, endTime - startTime)
      throw error
    })
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Promise<{
    lcp?: number // Largest Contentful Paint
    fid?: number // First Input Delay
    cls?: number // Cumulative Layout Shift
  }> {
    return new Promise((resolve) => {
      const vitals: any = {}
      
      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        vitals.lcp = lastEntry.startTime
        
        if (vitals.lcp && vitals.fid !== undefined && vitals.cls !== undefined) {
          resolve(vitals)
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          vitals.fid = entry.processingStart - entry.startTime
        })
        
        if (vitals.lcp && vitals.fid !== undefined && vitals.cls !== undefined) {
          resolve(vitals)
        }
      }).observe({ entryTypes: ['first-input'] })

      // CLS
      let clsValue = 0
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        vitals.cls = clsValue
        
        if (vitals.lcp && vitals.fid !== undefined && vitals.cls !== undefined) {
          resolve(vitals)
        }
      }).observe({ entryTypes: ['layout-shift'] })

      // Fallback timeout
      setTimeout(() => resolve(vitals), 5000)
    })
  }

  // Report performance data (for analytics)
  reportPerformance() {
    if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
      const data = {
        metrics: this.getAllMetrics(),
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        url: window.location.href
      }

      // In a real app, you'd send this to your analytics service
      console.log('Performance Report:', data)
    }
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Hook for React components
export function usePerformanceMonitor() {
  return {
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
    getMetric: performanceMonitor.getMetric.bind(performanceMonitor),
    measureLazyLoad: performanceMonitor.measureLazyLoad.bind(performanceMonitor),
    getCoreWebVitals: performanceMonitor.getCoreWebVitals.bind(performanceMonitor)
  }
}

// Utility to preload critical chunks
export function preloadChunk(chunkName: string) {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'script'
    link.href = `/_next/static/chunks/${chunkName}.js`
    document.head.appendChild(link)
  }
}

// Utility to prefetch routes
export function prefetchRoute(route: string) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = route
      document.head.appendChild(link)
    })
  }
}