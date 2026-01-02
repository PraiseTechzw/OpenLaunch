'use client'

import { useState, useEffect } from 'react'
import { 
  breakpoints, 
  deviceTypes, 
  type Breakpoint, 
  type DeviceType,
  getCurrentBreakpoint,
  getCurrentDeviceType,
  matchesBreakpoint,
  matchesDeviceType,
  isTouchDevice,
  isLandscape,
  isPortrait,
  getSafeAreaInsets,
  resolveResponsiveValue
} from '@/lib/responsive-utils'

/**
 * Hook for responsive breakpoint detection
 */
export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('lg')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentBreakpoint(getCurrentBreakpoint())

    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Helper functions that work on both client and server
  const matches = (breakpoint: Breakpoint) => {
    if (!isClient) return false
    return matchesBreakpoint(breakpoint)
  }

  return {
    current: currentBreakpoint,
    isClient,
    matches,
    // Convenience properties
    isXs: matches('xs'),
    isSm: matches('sm'),
    isMd: matches('md'),
    isLg: matches('lg'),
    isXl: matches('xl'),
    is2Xl: matches('2xl'),
    is3Xl: matches('3xl'),
  }
}

/**
 * Hook for device type detection
 */
export function useDeviceType() {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentDevice(getCurrentDeviceType())

    const handleResize = () => {
      setCurrentDevice(getCurrentDeviceType())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const matches = (deviceType: DeviceType) => {
    if (!isClient) return false
    return matchesDeviceType(deviceType)
  }

  return {
    current: currentDevice,
    isClient,
    matches,
    // Convenience properties
    isMobile: matches('mobile'),
    isTablet: matches('tablet'),
    isDesktop: matches('desktop'),
    isTouch: matches('touch'),
    isNoTouch: matches('noTouch'),
  }
}

/**
 * Hook for touch device detection
 */
export function useTouch() {
  const [isTouch, setIsTouch] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsTouch(isTouchDevice())
  }, [])

  return {
    isTouch: isClient ? isTouch : false,
    isClient,
  }
}

/**
 * Hook for orientation detection
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setOrientation(isLandscape() ? 'landscape' : 'portrait')

    const handleResize = () => {
      setOrientation(isLandscape() ? 'landscape' : 'portrait')
    }

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(() => {
        setOrientation(isLandscape() ? 'landscape' : 'portrait')
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return {
    orientation: isClient ? orientation : 'landscape',
    isLandscape: isClient ? orientation === 'landscape' : true,
    isPortrait: isClient ? orientation === 'portrait' : false,
    isClient,
  }
}

/**
 * Hook for safe area insets (for devices with notches)
 */
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({ top: 0, bottom: 0, left: 0, right: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setSafeArea(getSafeAreaInsets())

    const handleResize = () => {
      setSafeArea(getSafeAreaInsets())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    safeArea: isClient ? safeArea : { top: 0, bottom: 0, left: 0, right: 0 },
    isClient,
  }
}

/**
 * Hook for responsive values
 */
export function useResponsiveValue<T>(
  values: Partial<Record<Breakpoint | 'default', T>>,
  fallback?: T
) {
  const { current, isClient } = useBreakpoint()
  const [resolvedValue, setResolvedValue] = useState<T | undefined>(
    values.default || fallback
  )

  useEffect(() => {
    if (isClient) {
      setResolvedValue(resolveResponsiveValue(values, fallback))
    }
  }, [current, isClient, values, fallback])

  return resolvedValue
}

/**
 * Hook for window dimensions
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return {
    ...windowSize,
    isClient,
  }
}

/**
 * Combined responsive hook with all utilities
 */
export function useResponsive() {
  const breakpoint = useBreakpoint()
  const deviceType = useDeviceType()
  const touch = useTouch()
  const orientation = useOrientation()
  const safeArea = useSafeArea()
  const windowSize = useWindowSize()

  return {
    breakpoint,
    deviceType,
    touch,
    orientation,
    safeArea,
    windowSize,
    // Convenience properties
    isMobile: deviceType.isMobile,
    isTablet: deviceType.isTablet,
    isDesktop: deviceType.isDesktop,
    isTouch: touch.isTouch,
    isLandscape: orientation.isLandscape,
    isPortrait: orientation.isPortrait,
    // Utility function
    getValue: <T>(values: Partial<Record<Breakpoint | 'default', T>>, fallback?: T) =>
      resolveResponsiveValue(values, fallback),
  }
}