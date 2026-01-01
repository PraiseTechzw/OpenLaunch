'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
          <ExclamationTriangleIcon className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. This has been logged and we'll look into it.
        </p>
        
        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
            <p className="text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
        
        {/* Support Link */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Need help? Contact our support team:
          </p>
          <Link
            href="https://github.com/PraiseTechzw/OpenLaunch/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Report this issue on GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}