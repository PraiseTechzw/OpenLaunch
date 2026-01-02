/**
 * Mobile interaction utilities for Discord-inspired design system
 */

/**
 * Touch gesture detection utilities
 */
export interface TouchGesture {
  startX: number
  startY: number
  endX: number
  endY: number
  deltaX: number
  deltaY: number
  distance: number
  direction: 'left' | 'right' | 'up' | 'down' | 'none'
  duration: number
}

/**
 * Detect swipe gesture from touch events
 */
export function detectSwipe(
  startTouch: Touch,
  endTouch: Touch,
  startTime: number,
  endTime: number,
  minDistance: number = 50,
  maxTime: number = 300
): TouchGesture | null {
  const deltaX = endTouch.clientX - startTouch.clientX
  const deltaY = endTouch.clientY - startTouch.clientY
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const duration = endTime - startTime

  if (distance < minDistance || duration > maxTime) {
    return null
  }

  let direction: TouchGesture['direction'] = 'none'
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    direction = deltaX > 0 ? 'right' : 'left'
  } else {
    direction = deltaY > 0 ? 'down' : 'up'
  }

  return {
    startX: startTouch.clientX,
    startY: startTouch.clientY,
    endX: endTouch.clientX,
    endY: endTouch.clientY,
    deltaX,
    deltaY,
    distance,
    direction,
    duration,
  }
}

/**
 * Prevent default touch behaviors for custom interactions
 */
export function preventTouchDefaults(element: HTMLElement) {
  element.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false })
  element.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false })
  element.addEventListener('touchend', (e) => e.preventDefault(), { passive: false })
}

/**
 * Add touch ripple effect to elements
 */
export function addTouchRipple(element: HTMLElement, color: string = 'rgba(255, 255, 255, 0.3)') {
  element.style.position = 'relative'
  element.style.overflow = 'hidden'

  const handleTouch = (e: TouchEvent) => {
    const rect = element.getBoundingClientRect()
    const touch = e.touches[0] || e.changedTouches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    const ripple = document.createElement('div')
    ripple.style.position = 'absolute'
    ripple.style.borderRadius = '50%'
    ripple.style.backgroundColor = color
    ripple.style.transform = 'scale(0)'
    ripple.style.animation = 'ripple 0.6s linear'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = '0'
    ripple.style.height = '0'
    ripple.style.pointerEvents = 'none'

    element.appendChild(ripple)

    // Calculate ripple size
    const size = Math.max(rect.width, rect.height) * 2
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.marginLeft = `${-size / 2}px`
    ripple.style.marginTop = `${-size / 2}px`

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  element.addEventListener('touchstart', handleTouch)
  
  // Add CSS animation if not already present
  if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style')
    style.id = 'ripple-animation'
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(1);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }

  return () => {
    element.removeEventListener('touchstart', handleTouch)
  }
}

/**
 * Optimize touch targets for accessibility
 */
export function optimizeTouchTarget(element: HTMLElement) {
  const minSize = 44 // 44px minimum touch target size
  const rect = element.getBoundingClientRect()
  
  if (rect.width < minSize || rect.height < minSize) {
    element.style.minWidth = `${minSize}px`
    element.style.minHeight = `${minSize}px`
    element.style.display = 'flex'
    element.style.alignItems = 'center'
    element.style.justifyContent = 'center'
  }
}

/**
 * Handle device orientation changes
 */
export function handleOrientationChange(callback: (orientation: 'portrait' | 'landscape') => void) {
  const getOrientation = (): 'portrait' | 'landscape' => {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  }

  let currentOrientation = getOrientation()
  callback(currentOrientation)

  const handleChange = () => {
    // Small delay to ensure dimensions are updated
    setTimeout(() => {
      const newOrientation = getOrientation()
      if (newOrientation !== currentOrientation) {
        currentOrientation = newOrientation
        callback(newOrientation)
      }
    }, 100)
  }

  window.addEventListener('resize', handleChange)
  window.addEventListener('orientationchange', handleChange)

  return () => {
    window.removeEventListener('resize', handleChange)
    window.removeEventListener('orientationchange', handleChange)
  }
}

/**
 * Smooth scroll with momentum for mobile
 */
export function enableMomentumScroll(element: HTMLElement) {
  // @ts-ignore - webkit specific property
  element.style.webkitOverflowScrolling = 'touch'
  // @ts-ignore - non-standard property
  element.style.overflowScrolling = 'touch'
}

/**
 * Prevent zoom on double tap for specific elements
 */
export function preventDoubleTabZoom(element: HTMLElement) {
  let lastTouchEnd = 0
  
  element.addEventListener('touchend', (e) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      e.preventDefault()
    }
    lastTouchEnd = now
  }, false)
}

/**
 * Add pull-to-refresh functionality
 */
export function addPullToRefresh(
  element: HTMLElement,
  onRefresh: () => Promise<void>,
  threshold: number = 100
) {
  let startY = 0
  let currentY = 0
  let isRefreshing = false
  let isPulling = false

  const handleTouchStart = (e: TouchEvent) => {
    if (element.scrollTop === 0 && !isRefreshing) {
      startY = e.touches[0].clientY
      isPulling = true
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling || isRefreshing) return

    currentY = e.touches[0].clientY
    const pullDistance = currentY - startY

    if (pullDistance > 0) {
      e.preventDefault()
      
      // Add visual feedback
      const progress = Math.min(pullDistance / threshold, 1)
      element.style.transform = `translateY(${pullDistance * 0.5}px)`
      element.style.opacity = `${1 - progress * 0.2}`
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling || isRefreshing) return

    const pullDistance = currentY - startY
    isPulling = false

    if (pullDistance > threshold) {
      isRefreshing = true
      
      try {
        await onRefresh()
      } finally {
        isRefreshing = false
      }
    }

    // Reset visual state
    element.style.transform = ''
    element.style.opacity = ''
    startY = 0
    currentY = 0
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: false })
  element.addEventListener('touchmove', handleTouchMove, { passive: false })
  element.addEventListener('touchend', handleTouchEnd)

  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

/**
 * Haptic feedback for supported devices
 */
export function triggerHapticFeedback(type: 'light' | 'medium' | 'heavy' = 'light') {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
    }
    navigator.vibrate(patterns[type])
  }
}

/**
 * Detect if device is in standalone mode (PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-ignore - iOS specific
    window.navigator.standalone === true
  )
}

/**
 * Add safe area padding for devices with notches
 */
export function addSafeAreaPadding(element: HTMLElement) {
  // @ts-ignore - CSS environment variables
  element.style.paddingTop = 'env(safe-area-inset-top)'
  // @ts-ignore - CSS environment variables
  element.style.paddingBottom = 'env(safe-area-inset-bottom)'
  // @ts-ignore - CSS environment variables
  element.style.paddingLeft = 'env(safe-area-inset-left)'
  // @ts-ignore - CSS environment variables
  element.style.paddingRight = 'env(safe-area-inset-right)'
}

/**
 * Mobile-specific CSS classes
 */
export const mobileClasses = {
  // Touch targets
  touchTarget: 'min-h-[44px] min-w-[44px] flex items-center justify-center',
  touchPadding: 'p-3 sm:p-2',
  
  // Gestures
  swipeable: 'touch-pan-x select-none',
  scrollable: 'overflow-auto overscroll-contain',
  
  // Visual feedback
  touchFeedback: 'active:scale-95 active:opacity-75 transition-all duration-150',
  rippleEffect: 'relative overflow-hidden',
  
  // Safe areas
  safeTop: 'pt-safe-top',
  safeBottom: 'pb-safe-bottom',
  safeLeft: 'pl-safe-left',
  safeRight: 'pr-safe-right',
  safeArea: 'safe-area',
  
  // Orientation
  portraitOnly: 'portrait:block landscape:hidden',
  landscapeOnly: 'landscape:block portrait:hidden',
  
  // Device specific
  mobileOnly: 'block md:hidden',
  touchOnly: 'block lg:hidden',
} as const

/**
 * Mobile interaction presets
 */
export const mobilePresets = {
  button: `${mobileClasses.touchTarget} ${mobileClasses.touchFeedback}`,
  card: `${mobileClasses.touchFeedback} ${mobileClasses.rippleEffect}`,
  navigation: `${mobileClasses.touchTarget} ${mobileClasses.safeArea}`,
  modal: `${mobileClasses.safeArea} ${mobileClasses.scrollable}`,
  list: `${mobileClasses.scrollable} ${mobileClasses.swipeable}`,
} as const