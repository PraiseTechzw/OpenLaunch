import { useEffect, useCallback, useRef } from 'react'

export interface KeyboardNavigationOptions {
  /**
   * Enable arrow key navigation
   */
  enableArrowKeys?: boolean
  
  /**
   * Enable home/end key navigation
   */
  enableHomeEnd?: boolean
  
  /**
   * Enable page up/down navigation
   */
  enablePageKeys?: boolean
  
  /**
   * Enable escape key handling
   */
  enableEscape?: boolean
  
  /**
   * Enable enter/space key activation
   */
  enableActivation?: boolean
  
  /**
   * Wrap navigation at boundaries
   */
  wrap?: boolean
  
  /**
   * Orientation for arrow key navigation
   */
  orientation?: 'horizontal' | 'vertical' | 'both'
  
  /**
   * Callback when escape is pressed
   */
  onEscape?: () => void
  
  /**
   * Callback when enter/space is pressed
   */
  onActivate?: (element: HTMLElement) => void
  
  /**
   * Custom key handlers
   */
  onKeyDown?: (event: KeyboardEvent, element: HTMLElement) => boolean | void
}

/**
 * Hook for managing keyboard navigation within a container
 */
export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const {
    enableArrowKeys = true,
    enableHomeEnd = true,
    enablePageKeys = false,
    enableEscape = true,
    enableActivation = true,
    wrap = true,
    orientation = 'both',
    onEscape,
    onActivate,
    onKeyDown,
  } = options

  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * Get all focusable elements within the container
   */
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return []

    const focusableSelectors = [
      'button:not([disabled]):not([aria-hidden="true"])',
      'input:not([disabled]):not([aria-hidden="true"])',
      'select:not([disabled]):not([aria-hidden="true"])',
      'textarea:not([disabled]):not([aria-hidden="true"])',
      'a[href]:not([aria-hidden="true"])',
      '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
      '[contenteditable="true"]:not([aria-hidden="true"])',
      '[role="button"]:not([aria-disabled="true"]):not([aria-hidden="true"])',
      '[role="menuitem"]:not([aria-disabled="true"]):not([aria-hidden="true"])',
      '[role="tab"]:not([aria-disabled="true"]):not([aria-hidden="true"])',
    ].join(', ')

    return Array.from(containerRef.current.querySelectorAll(focusableSelectors))
      .filter((element): element is HTMLElement => {
        // Additional visibility checks
        const htmlElement = element as HTMLElement
        const style = window.getComputedStyle(htmlElement)
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          htmlElement.offsetParent !== null
        )
      })
  }, [])

  /**
   * Get the currently focused element index
   */
  const getCurrentIndex = useCallback((elements: HTMLElement[]): number => {
    const activeElement = document.activeElement as HTMLElement
    return elements.findIndex(element => element === activeElement)
  }, [])

  /**
   * Focus an element by index
   */
  const focusElementByIndex = useCallback((elements: HTMLElement[], index: number) => {
    if (elements.length === 0) return

    let targetIndex = index

    if (wrap) {
      // Wrap around at boundaries
      if (targetIndex < 0) {
        targetIndex = elements.length - 1
      } else if (targetIndex >= elements.length) {
        targetIndex = 0
      }
    } else {
      // Clamp to boundaries
      targetIndex = Math.max(0, Math.min(elements.length - 1, targetIndex))
    }

    const targetElement = elements[targetIndex]
    if (targetElement) {
      targetElement.focus()
    }
  }, [wrap])

  /**
   * Handle arrow key navigation
   */
  const handleArrowKeys = useCallback((event: KeyboardEvent, elements: HTMLElement[]) => {
    const currentIndex = getCurrentIndex(elements)
    if (currentIndex === -1) return false

    let handled = false

    switch (event.key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault()
          focusElementByIndex(elements, currentIndex - 1)
          handled = true
        }
        break

      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault()
          focusElementByIndex(elements, currentIndex + 1)
          handled = true
        }
        break

      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault()
          focusElementByIndex(elements, currentIndex - 1)
          handled = true
        }
        break

      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault()
          focusElementByIndex(elements, currentIndex + 1)
          handled = true
        }
        break
    }

    return handled
  }, [orientation, getCurrentIndex, focusElementByIndex])

  /**
   * Handle home/end key navigation
   */
  const handleHomeEnd = useCallback((event: KeyboardEvent, elements: HTMLElement[]) => {
    let handled = false

    switch (event.key) {
      case 'Home':
        event.preventDefault()
        focusElementByIndex(elements, 0)
        handled = true
        break

      case 'End':
        event.preventDefault()
        focusElementByIndex(elements, elements.length - 1)
        handled = true
        break
    }

    return handled
  }, [focusElementByIndex])

  /**
   * Handle page up/down navigation
   */
  const handlePageKeys = useCallback((event: KeyboardEvent, elements: HTMLElement[]) => {
    const currentIndex = getCurrentIndex(elements)
    if (currentIndex === -1) return false

    let handled = false
    const pageSize = Math.max(1, Math.floor(elements.length / 10)) // 10% of items

    switch (event.key) {
      case 'PageUp':
        event.preventDefault()
        focusElementByIndex(elements, currentIndex - pageSize)
        handled = true
        break

      case 'PageDown':
        event.preventDefault()
        focusElementByIndex(elements, currentIndex + pageSize)
        handled = true
        break
    }

    return handled
  }, [getCurrentIndex, focusElementByIndex])

  /**
   * Handle escape key
   */
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onEscape?.()
      return true
    }
    return false
  }, [onEscape])

  /**
   * Handle activation keys (Enter/Space)
   */
  const handleActivation = useCallback((event: KeyboardEvent) => {
    const activeElement = document.activeElement as HTMLElement
    if (!activeElement) return false

    if (event.key === 'Enter' || event.key === ' ') {
      // Don't handle if it's a native interactive element that handles these keys
      const tagName = activeElement.tagName.toLowerCase()
      if (tagName === 'button' || tagName === 'a' || tagName === 'input') {
        return false
      }

      // Handle custom interactive elements
      const role = activeElement.getAttribute('role')
      if (role === 'button' || role === 'menuitem' || role === 'tab') {
        event.preventDefault()
        onActivate?.(activeElement)
        return true
      }
    }

    return false
  }, [onActivate])

  /**
   * Main keyboard event handler
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    
    // Only handle events within our container
    if (!containerRef.current?.contains(target)) return

    const elements = getFocusableElements()
    if (elements.length === 0) return

    // Allow custom handler to override
    const customResult = onKeyDown?.(event, target)
    if (customResult === true) return // Custom handler handled the event

    let handled = false

    // Handle different key types
    if (enableArrowKeys && !handled) {
      handled = handleArrowKeys(event, elements)
    }

    if (enableHomeEnd && !handled) {
      handled = handleHomeEnd(event, elements)
    }

    if (enablePageKeys && !handled) {
      handled = handlePageKeys(event, elements)
    }

    if (enableEscape && !handled) {
      handled = handleEscape(event)
    }

    if (enableActivation && !handled) {
      handled = handleActivation(event)
    }
  }, [
    getFocusableElements,
    onKeyDown,
    enableArrowKeys,
    enableHomeEnd,
    enablePageKeys,
    enableEscape,
    enableActivation,
    handleArrowKeys,
    handleHomeEnd,
    handlePageKeys,
    handleEscape,
    handleActivation,
  ])

  /**
   * Set up keyboard event listeners
   */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  /**
   * Focus the first focusable element
   */
  const focusFirst = useCallback(() => {
    const elements = getFocusableElements()
    focusElementByIndex(elements, 0)
  }, [getFocusableElements, focusElementByIndex])

  /**
   * Focus the last focusable element
   */
  const focusLast = useCallback(() => {
    const elements = getFocusableElements()
    focusElementByIndex(elements, elements.length - 1)
  }, [getFocusableElements, focusElementByIndex])

  /**
   * Focus the next focusable element
   */
  const focusNext = useCallback(() => {
    const elements = getFocusableElements()
    const currentIndex = getCurrentIndex(elements)
    focusElementByIndex(elements, currentIndex + 1)
  }, [getFocusableElements, getCurrentIndex, focusElementByIndex])

  /**
   * Focus the previous focusable element
   */
  const focusPrevious = useCallback(() => {
    const elements = getFocusableElements()
    const currentIndex = getCurrentIndex(elements)
    focusElementByIndex(elements, currentIndex - 1)
  }, [getFocusableElements, getCurrentIndex, focusElementByIndex])

  return {
    containerRef,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    getFocusableElements,
  }
}

/**
 * Hook for managing roving tabindex pattern
 */
export function useRovingTabindex(options: {
  /**
   * Default focused element index
   */
  defaultIndex?: number
  
  /**
   * Callback when focus changes
   */
  onFocusChange?: (index: number, element: HTMLElement) => void
} = {}) {
  const { defaultIndex = 0, onFocusChange } = options
  const containerRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(defaultIndex)

  /**
   * Update tabindex values for roving tabindex pattern
   */
  const updateTabindexes = useCallback((focusedIndex: number) => {
    if (!containerRef.current) return

    const elements = Array.from(
      containerRef.current.querySelectorAll('[role="menuitem"], [role="tab"], [role="option"]')
    ) as HTMLElement[]

    elements.forEach((element, index) => {
      element.tabIndex = index === focusedIndex ? 0 : -1
    })

    currentIndexRef.current = focusedIndex
    
    if (elements[focusedIndex]) {
      onFocusChange?.(focusedIndex, elements[focusedIndex])
    }
  }, [onFocusChange])

  /**
   * Handle focus events to update roving tabindex
   */
  const handleFocus = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLElement
    if (!containerRef.current?.contains(target)) return

    const elements = Array.from(
      containerRef.current.querySelectorAll('[role="menuitem"], [role="tab"], [role="option"]')
    ) as HTMLElement[]

    const index = elements.indexOf(target)
    if (index !== -1) {
      updateTabindexes(index)
    }
  }, [updateTabindexes])

  /**
   * Set up focus event listeners and initial state
   */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Set initial tabindex values
    updateTabindexes(defaultIndex)

    // Add focus listener
    container.addEventListener('focus', handleFocus, true)

    return () => {
      container.removeEventListener('focus', handleFocus, true)
    }
  }, [defaultIndex, updateTabindexes, handleFocus])

  return {
    containerRef,
    currentIndex: currentIndexRef.current,
    updateTabindexes,
  }
}