/**
 * Accessibility utilities for consistent ARIA labels and semantic HTML
 */

export interface AriaLabelProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export interface AriaStateProps {
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  'aria-disabled'?: boolean
  'aria-hidden'?: boolean
  'aria-required'?: boolean
  'aria-invalid'?: boolean
  'aria-busy'?: boolean
}

export interface AriaRelationshipProps {
  'aria-controls'?: string
  'aria-owns'?: string
  'aria-activedescendant'?: string
}

export type AriaProps = AriaLabelProps & AriaStateProps & AriaRelationshipProps

/**
 * Generate consistent ARIA labels for common UI patterns
 */
export const ariaLabels = {
  // Navigation
  navigation: {
    main: 'Main navigation',
    breadcrumb: 'Breadcrumb navigation',
    pagination: 'Pagination navigation',
    skipToContent: 'Skip to main content',
    skipToNavigation: 'Skip to navigation',
  },

  // Buttons and actions
  buttons: {
    close: 'Close',
    menu: 'Open menu',
    menuExpanded: 'Close menu',
    search: 'Search',
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    loading: 'Loading',
  },

  // Form elements
  forms: {
    required: 'Required field',
    optional: 'Optional field',
    error: 'Error message',
    help: 'Help text',
    search: 'Search input',
  },

  // Content sections
  content: {
    main: 'Main content',
    sidebar: 'Sidebar',
    footer: 'Footer',
    article: 'Article',
    section: 'Section',
  },

  // Interactive elements
  interactive: {
    expandable: 'Expandable content',
    collapsible: 'Collapsible content',
    tab: 'Tab',
    tabPanel: 'Tab panel',
    dialog: 'Dialog',
    tooltip: 'Tooltip',
  },
} as const

/**
 * Generate ARIA attributes for common patterns
 */
export const generateAriaProps = {
  /**
   * Generate ARIA props for expandable/collapsible content
   */
  expandable: (isExpanded: boolean, controlsId?: string): AriaProps => ({
    'aria-expanded': isExpanded,
    ...(controlsId && { 'aria-controls': controlsId }),
  }),

  /**
   * Generate ARIA props for current page/location
   */
  currentPage: (isCurrent: boolean): AriaProps => ({
    'aria-current': isCurrent ? 'page' : undefined,
  }),

  /**
   * Generate ARIA props for form fields
   */
  formField: (options: {
    required?: boolean
    invalid?: boolean
    describedBy?: string
    labelledBy?: string
  }): AriaProps => ({
    'aria-required': options.required,
    'aria-invalid': options.invalid,
    'aria-describedby': options.describedBy,
    'aria-labelledby': options.labelledBy,
  }),

  /**
   * Generate ARIA props for loading states
   */
  loading: (isLoading: boolean, label?: string): AriaProps => ({
    'aria-busy': isLoading,
    'aria-label': isLoading ? (label || ariaLabels.buttons.loading) : undefined,
  }),

  /**
   * Generate ARIA props for hidden content
   */
  hidden: (isHidden: boolean): AriaProps => ({
    'aria-hidden': isHidden,
  }),
}

/**
 * Semantic HTML element mapping for better accessibility
 */
export const semanticElements = {
  // Layout elements
  layout: {
    header: 'header',
    nav: 'nav',
    main: 'main',
    aside: 'aside',
    footer: 'footer',
    section: 'section',
    article: 'article',
  },

  // Content elements
  content: {
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    heading5: 'h5',
    heading6: 'h6',
    paragraph: 'p',
    list: 'ul',
    orderedList: 'ol',
    listItem: 'li',
    definition: 'dl',
    term: 'dt',
    description: 'dd',
  },

  // Interactive elements
  interactive: {
    button: 'button',
    link: 'a',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    label: 'label',
    fieldset: 'fieldset',
    legend: 'legend',
  },
} as const

/**
 * Generate proper heading hierarchy
 */
export const headingHierarchy = {
  /**
   * Get the appropriate heading level based on context
   */
  getLevel: (context: 'page' | 'section' | 'subsection' | 'component'): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' => {
    switch (context) {
      case 'page':
        return 'h1'
      case 'section':
        return 'h2'
      case 'subsection':
        return 'h3'
      case 'component':
        return 'h4'
      default:
        return 'h2'
    }
  },

  /**
   * Validate heading hierarchy (for development)
   */
  validateHierarchy: (headings: string[]): boolean => {
    const levels = headings.map(h => parseInt(h.charAt(1)))
    
    // Should start with h1
    if (levels[0] !== 1) return false
    
    // Should not skip levels
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] > levels[i - 1] + 1) return false
    }
    
    return true
  },
}

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Set focus to element with proper error handling
   */
  setFocus: (element: HTMLElement | null, options?: FocusOptions): void => {
    if (element && typeof element.focus === 'function') {
      try {
        element.focus(options)
      } catch (error) {
        console.warn('Failed to set focus:', error)
      }
    }
  },

  /**
   * Get focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ')

    return Array.from(container.querySelectorAll(focusableSelectors))
  },

  /**
   * Trap focus within a container (for modals, etc.)
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = focusManagement.getFocusableElements(container)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault()
          focusManagement.setFocus(lastElement)
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault()
          focusManagement.setFocus(firstElement)
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  },
}

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    announcer.textContent = message

    document.body.appendChild(announcer)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  },

  /**
   * Create visually hidden but screen reader accessible text
   */
  createSROnlyText: (text: string): HTMLSpanElement => {
    const span = document.createElement('span')
    span.className = 'sr-only'
    span.textContent = text
    return span
  },
}