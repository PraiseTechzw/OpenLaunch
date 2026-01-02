'use client'

import { useEffect, useRef, useCallback } from 'react'
import {
  detectSwipe,
  addTouchRipple,
  optimizeTouchTarget,
  handleOrientationChange,
  preventDoubleTabZoom,
  addPullToRefresh,
  triggerHapticFeedback,
  type TouchGesture,
} from '@/lib/mobile-utils'

/**
 * Hook for swipe gesture detection
 */
export function useSwipeGesture(
  onSwipe: (gesture: TouchGesture) => void,
  options: {
    minDistance?: number
    maxTime?: number
    direction?: 'horizontal' | 'vertical' | 'all'
  } = {}
) {
  const elementRef = useRef<HTMLElement>(null)
  const touchStartRef = useRef<{ touch: Touch; time: number } | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        touch: e.touches[0],
        time: Date.now(),
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const gesture = detectSwipe(
        touchStartRef.current.touch,
        e.changedTouches[0],
        touchStartRef.current.time,
        Date.now(),
        options.minDistance,
        options.maxTime
      )

      if (gesture) {
        // Filter by direction if specified
        if (options.direction === 'horizontal' && !['left', 'right'].includes(gesture.direction)) {
          return
        }
        if (options.direction === 'vertical' && !['up', 'down'].includes(gesture.direction)) {
          return
        }

        onSwipe(gesture)
      }

      touchStartRef.current = null
    }

    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipe, options])

  return elementRef
}

/**
 * Hook for touch ripple effect
 */
export function useTouchRipple(color?: string) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    return addTouchRipple(element, color)
  }, [color])

  return elementRef
}

/**
 * Hook for optimizing touch targets
 */
export function useTouchTarget() {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    optimizeTouchTarget(element)
  }, [])

  return elementRef
}

/**
 * Hook for orientation change handling
 */
export function useOrientationChange(
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void
) {
  useEffect(() => {
    return handleOrientationChange(onOrientationChange)
  }, [onOrientationChange])
}

/**
 * Hook for preventing double-tap zoom
 */
export function usePreventDoubleTabZoom() {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    preventDoubleTabZoom(element)
  }, [])

  return elementRef
}

/**
 * Hook for pull-to-refresh functionality
 */
export function usePullToRefresh(
  onRefresh: () => Promise<void>,
  threshold?: number
) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    return addPullToRefresh(element, onRefresh, threshold)
  }, [onRefresh, threshold])

  return elementRef
}

/**
 * Hook for haptic feedback
 */
export function useHapticFeedback() {
  return useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    triggerHapticFeedback(type)
  }, [])
}

/**
 * Hook for long press detection
 */
export function useLongPress(
  onLongPress: () => void,
  options: {
    threshold?: number
    onStart?: () => void
    onFinish?: () => void
    onCancel?: () => void
  } = {}
) {
  const { threshold = 500, onStart, onFinish, onCancel } = options
  const elementRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const isLongPressRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleStart = () => {
      isLongPressRef.current = false
      onStart?.()
      
      timeoutRef.current = setTimeout(() => {
        isLongPressRef.current = true
        onLongPress()
        triggerHapticFeedback('medium')
      }, threshold)
    }

    const handleEnd = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      if (isLongPressRef.current) {
        onFinish?.()
      } else {
        onCancel?.()
      }
      
      isLongPressRef.current = false
    }

    const handleCancel = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      onCancel?.()
      isLongPressRef.current = false
    }

    // Mouse events
    element.addEventListener('mousedown', handleStart)
    element.addEventListener('mouseup', handleEnd)
    element.addEventListener('mouseleave', handleCancel)

    // Touch events
    element.addEventListener('touchstart', handleStart)
    element.addEventListener('touchend', handleEnd)
    element.addEventListener('touchcancel', handleCancel)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      element.removeEventListener('mousedown', handleStart)
      element.removeEventListener('mouseup', handleEnd)
      element.removeEventListener('mouseleave', handleCancel)
      element.removeEventListener('touchstart', handleStart)
      element.removeEventListener('touchend', handleEnd)
      element.removeEventListener('touchcancel', handleCancel)
    }
  }, [onLongPress, threshold, onStart, onFinish, onCancel])

  return elementRef
}

/**
 * Combined mobile interactions hook
 */
export function useMobileInteractions(options: {
  enableRipple?: boolean
  rippleColor?: string
  enableHaptic?: boolean
  optimizeTouchTarget?: boolean
  preventDoubleTab?: boolean
  onSwipe?: (gesture: TouchGesture) => void
  onLongPress?: () => void
  longPressThreshold?: number
} = {}) {
  const {
    enableRipple = false,
    rippleColor,
    enableHaptic = false,
    optimizeTouchTarget = true,
    preventDoubleTab = false,
    onSwipe,
    onLongPress,
    longPressThreshold,
  } = options

  const rippleRef = useTouchRipple(enableRipple ? rippleColor : undefined)
  const touchTargetRef = useTouchTarget()
  const doubleTabRef = usePreventDoubleTabZoom()
  const swipeRef = useSwipeGesture(onSwipe || (() => {}))
  const longPressRef = useLongPress(onLongPress || (() => {}), {
    threshold: longPressThreshold,
  })
  const haptic = useHapticFeedback()

  // Combine all refs into one
  const combinedRef = useCallback((element: HTMLElement | null) => {
    if (enableRipple && rippleRef.current !== element) {
      // @ts-ignore
      rippleRef.current = element
    }
    if (optimizeTouchTarget && touchTargetRef.current !== element) {
      // @ts-ignore
      touchTargetRef.current = element
    }
    if (preventDoubleTab && doubleTabRef.current !== element) {
      // @ts-ignore
      doubleTabRef.current = element
    }
    if (onSwipe && swipeRef.current !== element) {
      // @ts-ignore
      swipeRef.current = element
    }
    if (onLongPress && longPressRef.current !== element) {
      // @ts-ignore
      longPressRef.current = element
    }
  }, [
    enableRipple,
    rippleRef,
    optimizeTouchTarget,
    touchTargetRef,
    preventDoubleTab,
    doubleTabRef,
    onSwipe,
    swipeRef,
    onLongPress,
    longPressRef,
  ])

  return {
    ref: combinedRef,
    haptic: enableHaptic ? haptic : undefined,
  }
}