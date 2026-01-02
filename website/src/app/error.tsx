'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Error Icon with Discord styling */}
        <div 
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 animate-discord-pulse"
          style={{ backgroundColor: `${discordColors.status.error}20` }}
        >
          <ExclamationTriangleIcon 
            className="w-10 h-10"
            style={{ color: discordColors.status.error }}
          />
        </div>
        
        <h1 
          className="text-2xl font-bold mb-4"
          style={{ color: discordColors.text.primary }}
        >
          Something went wrong!
        </h1>
        
        <p 
          className="mb-6"
          style={{ color: discordColors.text.secondary }}
        >
          We encountered an unexpected error. This has been logged and we'll look into it.
        </p>
        
        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div 
            className="rounded-discord-lg p-4 mb-6 text-left border"
            style={{ 
              backgroundColor: `${discordColors.status.error}10`,
              borderColor: `${discordColors.status.error}40`
            }}
          >
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: discordColors.status.error }}
            >
              Error Details:
            </h3>
            <p 
              className="text-xs font-mono break-all"
              style={{ color: discordColors.text.muted }}
            >
              {error.message}
            </p>
          </div>
        )}
        
        {/* Action Buttons with Discord styling */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 font-medium rounded-discord transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-discord-brand-primary"
            style={{
              backgroundColor: discordColors.brand.primary,
              color: discordColors.text.primary,
            }}

          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border font-medium rounded-discord transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              borderColor: discordColors.interactive.normal,
              color: discordColors.text.primary,
              backgroundColor: 'transparent',
            }}

          >
            Go Home
          </Link>
        </div>
        
        {/* Support Link with Discord styling */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: discordColors.interactive.normal }}>
          <p 
            className="text-sm mb-2"
            style={{ color: discordColors.text.muted }}
          >
            Need help? Contact our support team:
          </p>
          <Link
            href="https://github.com/PraiseTechzw/OpenLaunch/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors duration-200 hover:underline"
            style={{ color: discordColors.text.link }}

          >
            Report this issue on GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}