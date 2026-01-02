'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    })

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI with Discord styling
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md mx-auto text-center">
            {/* Error Icon */}
            <div 
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 animate-discord-pulse"
              style={{ backgroundColor: `${discordColors.status.error}20` }}
            >
              <ExclamationTriangleIcon 
                className="w-8 h-8"
                style={{ color: discordColors.status.error }}
              />
            </div>
            
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: discordColors.text.primary }}
            >
              Oops! Something went wrong
            </h2>
            
            <p 
              className="mb-6 text-sm"
              style={{ color: discordColors.text.secondary }}
            >
              We encountered an unexpected error in this component. 
              Don't worry, the rest of the application should still work fine.
            </p>
            
            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div 
                className="rounded-discord p-3 mb-6 text-left text-xs border"
                style={{ 
                  backgroundColor: `${discordColors.status.error}10`,
                  borderColor: `${discordColors.status.error}40`
                }}
              >
                <details>
                  <summary 
                    className="cursor-pointer font-medium mb-2"
                    style={{ color: discordColors.status.error }}
                  >
                    Error Details (Development)
                  </summary>
                  <div 
                    className="font-mono whitespace-pre-wrap break-all"
                    style={{ color: discordColors.text.muted }}
                  >
                    {this.state.error.message}
                    {this.state.errorInfo?.componentStack && (
                      <>
                        <br /><br />
                        <strong>Component Stack:</strong>
                        {this.state.errorInfo.componentStack}
                      </>
                    )}
                  </div>
                </details>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-discord transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: discordColors.brand.primary,
                  color: discordColors.text.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${discordColors.brand.primary}e6`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = discordColors.brand.primary
                }}
              >
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                Try Again
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm border font-medium rounded-discord transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: discordColors.interactive.normal,
                  color: discordColors.text.primary,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based error boundary for functional components
 */
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    // In a real application, you would send this to an error reporting service
    // like Sentry, LogRocket, or Bugsnag
    if (typeof window !== 'undefined') {
      // Client-side error reporting
      window.dispatchEvent(new CustomEvent('unhandledError', {
        detail: { error, errorInfo }
      }))
    }
  }
}

/**
 * Higher-order component for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

/**
 * Specialized error boundary for async components
 */
interface AsyncErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error) => void
}

export function AsyncErrorBoundary({ children, fallback, onError }: AsyncErrorBoundaryProps) {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = new Error(event.reason?.message || 'Unhandled promise rejection')
      setError(error)
      onError?.(error)
      event.preventDefault()
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [onError])

  if (error) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-[200px] flex items-center justify-center p-4">
        <div className="text-center">
          <div 
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
            style={{ backgroundColor: `${discordColors.status.error}20` }}
          >
            <ExclamationTriangleIcon 
              className="w-6 h-6"
              style={{ color: discordColors.status.error }}
            />
          </div>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: discordColors.text.primary }}
          >
            Loading Error
          </h3>
          <p 
            className="text-sm mb-4"
            style={{ color: discordColors.text.secondary }}
          >
            Failed to load this content. Please try refreshing the page.
          </p>
          <button
            onClick={() => setError(null)}
            className="px-4 py-2 text-sm font-medium rounded-discord transition-colors"
            style={{
              backgroundColor: discordColors.brand.primary,
              color: discordColors.text.primary,
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary