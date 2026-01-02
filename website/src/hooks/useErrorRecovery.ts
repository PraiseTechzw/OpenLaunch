'use client'

import { useState, useCallback, useRef } from 'react'
import { errorUtils, errorRecovery } from '@/lib/error-handler'

interface UseErrorRecoveryOptions {
  maxRetries?: number
  retryDelay?: number
  onError?: (error: Error) => void
  onRetry?: (attempt: number) => void
  onSuccess?: () => void
}

interface ErrorRecoveryState {
  error: Error | null
  isRetrying: boolean
  retryCount: number
  hasError: boolean
}

/**
 * Hook for handling errors with automatic retry capabilities
 */
export function useErrorRecovery(options: UseErrorRecoveryOptions = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onRetry,
    onSuccess,
  } = options

  const [state, setState] = useState<ErrorRecoveryState>({
    error: null,
    isRetrying: false,
    retryCount: 0,
    hasError: false,
  })

  const retryTimeoutRef = useRef<NodeJS.Timeout>()

  const clearError = useCallback(() => {
    setState({
      error: null,
      isRetrying: false,
      retryCount: 0,
      hasError: false,
    })
    
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }
  }, [])

  const handleError = useCallback((error: Error) => {
    setState(prev => ({
      ...prev,
      error,
      hasError: true,
      isRetrying: false,
    }))
    
    onError?.(error)
  }, [onError])

  const retry = useCallback(async (operation: () => Promise<any> | any) => {
    if (state.retryCount >= maxRetries) {
      return
    }

    setState(prev => ({
      ...prev,
      isRetrying: true,
      retryCount: prev.retryCount + 1,
    }))

    onRetry?.(state.retryCount + 1)

    try {
      // Add delay before retry (exponential backoff)
      const delay = retryDelay * Math.pow(2, state.retryCount)
      await new Promise(resolve => {
        retryTimeoutRef.current = setTimeout(resolve, delay)
      })

      const result = await operation()
      
      // Success - clear error state
      clearError()
      onSuccess?.()
      
      return result
    } catch (error) {
      handleError(error as Error)
      throw error
    }
  }, [state.retryCount, maxRetries, retryDelay, onRetry, onSuccess, clearError, handleError])

  const executeWithRecovery = useCallback(async <T>(
    operation: () => Promise<T> | T,
    context?: { component?: string; action?: string }
  ): Promise<T> => {
    try {
      const result = await operation()
      
      // If we had an error before, clear it on success
      if (state.hasError) {
        clearError()
        onSuccess?.()
      }
      
      return result
    } catch (error) {
      const err = error as Error
      
      // Report error with context
      errorUtils.handleApiError(err, context?.component || 'unknown', context?.action || 'execute')
      
      handleError(err)
      throw err
    }
  }, [state.hasError, clearError, onSuccess, handleError])

  const safeExecute = useCallback(<T>(
    operation: () => T,
    fallback?: T,
    context?: { component?: string; action?: string }
  ): T | typeof fallback => {
    try {
      const result = operation()
      
      // Clear error on success
      if (state.hasError) {
        clearError()
        onSuccess?.()
      }
      
      return result
    } catch (error) {
      const err = error as Error
      
      // Report error with context
      errorUtils.handleValidationError(err, context?.component || 'unknown', context?.action || 'safe_execute')
      
      handleError(err)
      return fallback
    }
  }, [state.hasError, clearError, onSuccess, handleError])

  return {
    // State
    error: state.error,
    hasError: state.hasError,
    isRetrying: state.isRetrying,
    retryCount: state.retryCount,
    canRetry: state.retryCount < maxRetries,
    
    // Actions
    clearError,
    retry,
    executeWithRecovery,
    safeExecute,
    
    // Utilities
    handleError,
  }
}

/**
 * Hook for handling async operations with built-in error recovery
 */
export function useAsyncOperation<T>(
  operation: () => Promise<T>,
  options: UseErrorRecoveryOptions & {
    autoRetry?: boolean
    immediate?: boolean
  } = {}
) {
  const { autoRetry = false, immediate = false, ...recoveryOptions } = options
  
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)
  
  const recovery = useErrorRecovery({
    ...recoveryOptions,
    onSuccess: () => {
      setIsLoading(false)
      recoveryOptions.onSuccess?.()
    },
    onError: (error) => {
      setIsLoading(false)
      recoveryOptions.onError?.(error)
    },
  })

  const execute = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const result = await recovery.executeWithRecovery(operation, {
        component: 'async_operation',
        action: 'execute',
      })
      
      setData(result)
      return result
    } catch (error) {
      if (autoRetry && recovery.canRetry) {
        return recovery.retry(operation)
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [operation, recovery, autoRetry])

  const retryOperation = useCallback(() => {
    return recovery.retry(execute)
  }, [recovery, execute])

  // Execute immediately if requested
  useState(() => {
    if (immediate) {
      execute()
    }
  })

  return {
    // Data
    data,
    isLoading,
    
    // Error recovery state
    ...recovery,
    
    // Actions
    execute,
    retry: retryOperation,
  }
}

/**
 * Hook for creating a circuit breaker for failing operations
 */
export function useCircuitBreaker<T>(
  operation: () => Promise<T>,
  options: {
    threshold?: number
    timeout?: number
    onCircuitOpen?: () => void
    onCircuitClose?: () => void
  } = {}
) {
  const { threshold = 5, timeout = 60000, onCircuitOpen, onCircuitClose } = options
  
  const [circuitState, setCircuitState] = useState<'closed' | 'open' | 'half-open'>('closed')
  const [failures, setFailures] = useState(0)
  const [lastFailureTime, setLastFailureTime] = useState(0)
  
  const circuitBreaker = useRef(
    errorRecovery.createCircuitBreaker(operation, threshold, timeout)
  )

  const execute = useCallback(async () => {
    const now = Date.now()
    
    // Check if we should reset the circuit
    if (circuitState === 'open' && now - lastFailureTime > timeout) {
      setCircuitState('half-open')
      setFailures(0)
    }
    
    // Reject if circuit is open
    if (circuitState === 'open') {
      throw new Error('Circuit breaker is open - too many failures')
    }
    
    try {
      const result = await circuitBreaker.current()
      
      // Success - reset circuit if it was half-open
      if (circuitState === 'half-open') {
        setCircuitState('closed')
        onCircuitClose?.()
      }
      setFailures(0)
      
      return result
    } catch (error) {
      const newFailures = failures + 1
      setFailures(newFailures)
      setLastFailureTime(now)
      
      if (newFailures >= threshold) {
        setCircuitState('open')
        onCircuitOpen?.()
      }
      
      throw error
    }
  }, [circuitState, failures, lastFailureTime, threshold, timeout, onCircuitOpen, onCircuitClose])

  const reset = useCallback(() => {
    setCircuitState('closed')
    setFailures(0)
    setLastFailureTime(0)
  }, [])

  return {
    execute,
    reset,
    circuitState,
    failures,
    isOpen: circuitState === 'open',
    canExecute: circuitState !== 'open',
  }
}

export default useErrorRecovery