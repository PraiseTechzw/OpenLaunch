'use client'

import { useEffect } from 'react'
import { globalErrorHandler } from '@/lib/error-handler'

/**
 * Global Error Handler Component
 * 
 * This component initializes the global error handling system
 * and should be included once in the root layout.
 */
export function GlobalErrorHandler() {
  useEffect(() => {
    // The global error handler is already initialized when imported,
    // but we can add any additional setup here if needed
    
    // Example: Set up user context for error reporting
    const updateUserContext = () => {
      // In a real app, you would get this from your auth system
      const userId = localStorage.getItem('userId')
      const sessionId = sessionStorage.getItem('sessionId')
      
      if (userId || sessionId) {
        // You could extend the global error handler to accept user context
        console.log('User context available for error reporting:', { userId, sessionId })
      }
    }

    updateUserContext()

    // Listen for auth state changes to update user context
    window.addEventListener('storage', updateUserContext)
    
    return () => {
      window.removeEventListener('storage', updateUserContext)
    }
  }, [])

  // This component doesn't render anything
  return null
}

export default GlobalErrorHandler