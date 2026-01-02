/**
 * Global Error Handling Utilities
 * 
 * This file contains utilities for handling errors throughout the application,
 * including error reporting, logging, and recovery mechanisms.
 */

export interface ErrorContext {
  userId?: string
  sessionId?: string
  userAgent?: string
  url?: string
  timestamp?: Date
  component?: string
  action?: string
  metadata?: Record<string, any>
}

export interface ErrorReport {
  error: Error
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'ui' | 'api' | 'network' | 'validation' | 'auth' | 'unknown'
}

/**
 * Global error handler class
 */
class GlobalErrorHandler {
  private errorQueue: ErrorReport[] = []
  private isOnline = true
  private maxQueueSize = 100

  constructor() {
    this.setupGlobalHandlers()
    this.setupNetworkMonitoring()
  }

  /**
   * Set up global error handlers
   */
  private setupGlobalHandlers() {
    if (typeof window === 'undefined') return

    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError(event.error || new Error(event.message), {
        url: event.filename,
        component: 'global',
        action: 'unhandled_error',
        metadata: {
          lineno: event.lineno,
          colno: event.colno,
        }
      }, 'high', 'unknown')
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason))
      
      this.handleError(error, {
        component: 'global',
        action: 'unhandled_rejection',
      }, 'high', 'unknown')
    })

    // Handle custom error events
    window.addEventListener('unhandledError', ((event: CustomEvent) => {
      const { error, errorInfo } = event.detail
      this.handleError(error, {
        component: errorInfo?.componentStack ? 'react' : 'unknown',
        action: 'component_error',
        metadata: errorInfo,
      }, 'medium', 'ui')
    }) as EventListener)
  }

  /**
   * Set up network monitoring
   */
  private setupNetworkMonitoring() {
    if (typeof window === 'undefined') return

    window.addEventListener('online', () => {
      this.isOnline = true
      this.flushErrorQueue()
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  /**
   * Handle an error with context
   */
  handleError(
    error: Error,
    context: ErrorContext = {},
    severity: ErrorReport['severity'] = 'medium',
    category: ErrorReport['category'] = 'unknown'
  ) {
    const errorReport: ErrorReport = {
      error,
      context: {
        ...context,
        timestamp: new Date(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      },
      severity,
      category,
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error [${severity}] - ${category}`)
      console.error('Error:', error)
      console.log('Context:', errorReport.context)
      console.groupEnd()
    }

    // Add to queue for reporting
    this.queueError(errorReport)

    // Attempt to report immediately if online
    if (this.isOnline) {
      this.flushErrorQueue()
    }
  }

  /**
   * Queue an error for later reporting
   */
  private queueError(errorReport: ErrorReport) {
    this.errorQueue.push(errorReport)
    
    // Prevent queue from growing too large
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift() // Remove oldest error
    }
  }

  /**
   * Flush the error queue by reporting all queued errors
   */
  private async flushErrorQueue() {
    if (this.errorQueue.length === 0) return

    const errorsToReport = [...this.errorQueue]
    this.errorQueue = []

    try {
      await this.reportErrors(errorsToReport)
    } catch (reportingError) {
      // If reporting fails, put errors back in queue
      this.errorQueue.unshift(...errorsToReport)
      console.warn('Failed to report errors:', reportingError)
    }
  }

  /**
   * Report errors to external service
   */
  private async reportErrors(errors: ErrorReport[]) {
    // In a real application, you would send these to an error reporting service
    // like Sentry, LogRocket, Bugsnag, or your own API
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Would report errors:', errors)
      return
    }

    // Example implementation for a custom API
    try {
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errors: errors.map(report => ({
            message: report.error.message,
            stack: report.error.stack,
            context: report.context,
            severity: report.severity,
            category: report.category,
          }))
        }),
      })

      if (!response.ok) {
        throw new Error(`Error reporting failed: ${response.status}`)
      }
    } catch (error) {
      // Silently fail - don't create infinite error loops
      console.warn('Error reporting failed:', error)
    }
  }

  /**
   * Create a wrapped function that catches and reports errors
   */
  wrapFunction<T extends (...args: any[]) => any>(
    fn: T,
    context: Partial<ErrorContext> = {}
  ): T {
    return ((...args: Parameters<T>) => {
      try {
        const result = fn(...args)
        
        // Handle async functions
        if (result instanceof Promise) {
          return result.catch((error) => {
            this.handleError(error, {
              ...context,
              action: 'async_function_error',
            }, 'medium', 'unknown')
            throw error // Re-throw to maintain promise chain
          })
        }
        
        return result
      } catch (error) {
        this.handleError(error as Error, {
          ...context,
          action: 'function_error',
        }, 'medium', 'unknown')
        throw error // Re-throw to maintain normal error flow
      }
    }) as T
  }

  /**
   * Create an error boundary wrapper for React components
   */
  createErrorBoundary(componentName: string) {
    return (error: Error, errorInfo: any) => {
      this.handleError(error, {
        component: componentName,
        action: 'component_error',
        metadata: errorInfo,
      }, 'medium', 'ui')
    }
  }
}

// Create global instance
export const globalErrorHandler = new GlobalErrorHandler()

/**
 * Utility functions for common error scenarios
 */
export const errorUtils = {
  /**
   * Handle API errors with proper categorization
   */
  handleApiError: (error: Error, endpoint: string, method: string = 'GET') => {
    globalErrorHandler.handleError(error, {
      component: 'api',
      action: `${method.toLowerCase()}_${endpoint}`,
      metadata: { endpoint, method },
    }, 'high', 'api')
  },

  /**
   * Handle network errors
   */
  handleNetworkError: (error: Error, url: string) => {
    globalErrorHandler.handleError(error, {
      component: 'network',
      action: 'request_failed',
      metadata: { url },
    }, 'high', 'network')
  },

  /**
   * Handle validation errors
   */
  handleValidationError: (error: Error, field: string, value: any) => {
    globalErrorHandler.handleError(error, {
      component: 'validation',
      action: 'validation_failed',
      metadata: { field, value: typeof value === 'string' ? value : JSON.stringify(value) },
    }, 'low', 'validation')
  },

  /**
   * Handle authentication errors
   */
  handleAuthError: (error: Error, action: string) => {
    globalErrorHandler.handleError(error, {
      component: 'auth',
      action,
    }, 'high', 'auth')
  },

  /**
   * Wrap async operations with error handling
   */
  wrapAsync: <T>(
    operation: () => Promise<T>,
    context: Partial<ErrorContext> = {}
  ): Promise<T> => {
    return globalErrorHandler.wrapFunction(operation, context)()
  },

  /**
   * Create a safe version of a function that won't throw
   */
  safe: <T extends (...args: any[]) => any>(
    fn: T,
    fallback?: ReturnType<T>,
    context: Partial<ErrorContext> = {}
  ) => {
    return (...args: Parameters<T>): ReturnType<T> | typeof fallback => {
      try {
        return fn(...args)
      } catch (error) {
        globalErrorHandler.handleError(error as Error, {
          ...context,
          action: 'safe_function_error',
        }, 'low', 'unknown')
        return fallback
      }
    }
  },
}

/**
 * Error recovery utilities
 */
export const errorRecovery = {
  /**
   * Retry an operation with exponential backoff
   */
  retry: async <T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    baseDelay: number = 1000,
    context: Partial<ErrorContext> = {}
  ): Promise<T> => {
    let lastError: Error

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error as Error
        
        if (attempt === maxAttempts) {
          globalErrorHandler.handleError(lastError, {
            ...context,
            action: 'retry_exhausted',
            metadata: { attempts: maxAttempts },
          }, 'high', 'unknown')
          throw lastError
        }

        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt - 1)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError!
  },

  /**
   * Circuit breaker pattern for failing operations
   */
  createCircuitBreaker: (
    operation: () => Promise<any>,
    threshold: number = 5,
    timeout: number = 60000
  ) => {
    let failures = 0
    let lastFailureTime = 0
    let state: 'closed' | 'open' | 'half-open' = 'closed'

    return async () => {
      const now = Date.now()

      // Reset if timeout has passed
      if (state === 'open' && now - lastFailureTime > timeout) {
        state = 'half-open'
        failures = 0
      }

      // Reject if circuit is open
      if (state === 'open') {
        throw new Error('Circuit breaker is open')
      }

      try {
        const result = await operation()
        
        // Reset on success
        if (state === 'half-open') {
          state = 'closed'
        }
        failures = 0
        
        return result
      } catch (error) {
        failures++
        lastFailureTime = now

        if (failures >= threshold) {
          state = 'open'
          globalErrorHandler.handleError(error as Error, {
            component: 'circuit_breaker',
            action: 'circuit_opened',
            metadata: { failures, threshold },
          }, 'high', 'unknown')
        }

        throw error
      }
    }
  },
}

export default globalErrorHandler