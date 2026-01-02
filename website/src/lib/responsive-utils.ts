/**
 * Responsive utility functions and hooks for Discord-inspired design system
 */

// Breakpoint definitions matching Tailwind config
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const

export type Breakpoint = keyof typeof breakpoints

// Device type detection
export const deviceTypes = {
  mobile: { max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024 },
  touch: { max: 1023 },
  noTouch: { min: 1024 },
} as const

export type DeviceType = keyof typeof deviceTypes

/**
 * Generate responsive class names based on breakpoint values
 */
export function generateResponsiveClasses<T extends string | number>(
  property: string,
  values: Partial<Record<Breakpoint | 'default', T>>,
  prefix?: string
): string[] {
  const classes: string[] = []
  
  // Add default value
  if (values.default !== undefined) {
    const className = prefix 
      ? `${prefix}-${property}-${values.default}`
      : `${property}-${values.default}`
    classes.push(className)
  }
  
  // Add responsive values
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint !== 'default' && value !== undefined) {
      const className = prefix
        ? `${breakpoint}:${prefix}-${property}-${value}`
        : `${breakpoint}:${property}-${value}`
      classes.push(className)
    }
  })
  
  return classes
}

/**
 * Generate responsive grid column classes
 */
export function generateGridCols(
  cols: Partial<Record<Breakpoint | 'default', number>>
): string[] {
  return generateResponsiveClasses('grid-cols', cols)
}

/**
 * Generate responsive gap classes
 */
export function generateGap(
  gap: Partial<Record<Breakpoint | 'default', number>>
): string[] {
  return generateResponsiveClasses('gap', gap)
}

/**
 * Generate responsive padding classes
 */
export function generatePadding(
  padding: Partial<Record<Breakpoint | 'default', number | string>>
): string[] {
  return generateResponsiveClasses('p', padding)
}

/**
 * Generate responsive margin classes
 */
export function generateMargin(
  margin: Partial<Record<Breakpoint | 'default', number | string>>
): string[] {
  return generateResponsiveClasses('m', margin)
}

/**
 * Generate responsive text size classes
 */
export function generateTextSize(
  sizes: Partial<Record<Breakpoint | 'default', string>>
): string[] {
  return generateResponsiveClasses('text', sizes)
}

/**
 * Check if current viewport matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints[breakpoint]
}

/**
 * Check if current viewport matches a device type
 */
export function matchesDeviceType(deviceType: DeviceType): boolean {
  if (typeof window === 'undefined') return false
  
  const width = window.innerWidth
  const device = deviceTypes[deviceType]
  
  if ('min' in device && 'max' in device) {
    return width >= device.min && width <= device.max
  } else if ('min' in device) {
    return width >= device.min
  } else if ('max' in device) {
    return width <= device.max
  }
  
  return false
}

/**
 * Get current breakpoint based on viewport width
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'lg'
  
  const width = window.innerWidth
  
  if (width >= breakpoints['3xl']) return '3xl'
  if (width >= breakpoints['2xl']) return '2xl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  if (width >= breakpoints.xs) return 'xs'
  
  return 'xs'
}

/**
 * Get current device type based on viewport width
 */
export function getCurrentDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  
  if (width <= deviceTypes.mobile.max) return 'mobile'
  if (width >= deviceTypes.tablet.min && width <= deviceTypes.tablet.max) return 'tablet'
  if (width >= deviceTypes.desktop.min) return 'desktop'
  
  return 'desktop'
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - legacy property
    navigator.msMaxTouchPoints > 0
  )
}

/**
 * Check if device is in landscape orientation
 */
export function isLandscape(): boolean {
  if (typeof window === 'undefined') return true
  
  return window.innerWidth > window.innerHeight
}

/**
 * Check if device is in portrait orientation
 */
export function isPortrait(): boolean {
  return !isLandscape()
}

/**
 * Get safe area insets for devices with notches/rounded corners
 */
export function getSafeAreaInsets() {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 }
  }
  
  const style = getComputedStyle(document.documentElement)
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
  }
}

/**
 * Responsive value resolver - returns appropriate value based on current breakpoint
 */
export function resolveResponsiveValue<T>(
  values: Partial<Record<Breakpoint | 'default', T>>,
  fallback?: T
): T | undefined {
  if (typeof window === 'undefined') {
    return values.default || fallback
  }
  
  const currentBreakpoint = getCurrentBreakpoint()
  const breakpointOrder: (Breakpoint | 'default')[] = [
    currentBreakpoint,
    '2xl', 'xl', 'lg', 'md', 'sm', 'xs', 'default'
  ]
  
  // Find the first available value in descending breakpoint order
  for (const bp of breakpointOrder) {
    if (values[bp] !== undefined) {
      return values[bp]
    }
  }
  
  return fallback
}

/**
 * Container size utilities
 */
export const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-discord-wide',
  full: 'max-w-none'
} as const

export type ContainerSize = keyof typeof containerSizes

/**
 * Common responsive patterns
 */
export const responsivePatterns = {
  // Grid patterns
  cardGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  featureGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  autoFitGrid: 'grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
  
  // Flex patterns
  stackMobile: 'flex flex-col sm:flex-row',
  centerContent: 'flex flex-col items-center justify-center',
  spaceBetween: 'flex flex-col sm:flex-row sm:items-center sm:justify-between',
  
  // Spacing patterns
  sectionPadding: 'py-16 sm:py-20 lg:py-24',
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  responsiveSpace: 'space-y-4 sm:space-y-6 lg:space-y-8',
  
  // Typography patterns
  heroTitle: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold',
  sectionTitle: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
  bodyText: 'text-base sm:text-lg',
  
  // Component patterns
  buttonSize: 'px-4 py-2 sm:px-6 sm:py-3',
  cardPadding: 'p-4 sm:p-6 lg:p-8',
  modalWidth: 'w-full max-w-sm sm:max-w-md lg:max-w-lg',
} as const

export type ResponsivePattern = keyof typeof responsivePatterns