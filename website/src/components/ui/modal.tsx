"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const modalContentVariants = cva(
  "relative w-full bg-discord-background-elevated rounded-discord-lg shadow-discord-elevation-high border border-discord-background-modifier-hover animate-scale-in",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full h-full rounded-none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface ModalContextType {
  isOpen: boolean
  onClose: () => void
}

const ModalContext = React.createContext<ModalContextType | null>(null)

function useModal() {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("Modal components must be used within a Modal")
  }
  return context
}

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    isOpen, 
    onClose, 
    children, 
    size, 
    closeOnOverlayClick = true, 
    closeOnEscape = true,
    className,
    ...props 
  }, ref) => {
    const [mounted, setMounted] = React.useState(false)
    
    // Handle mounting for SSR compatibility
    React.useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])

    // Handle escape key
    React.useEffect(() => {
      if (!isOpen || !closeOnEscape) return

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose()
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, closeOnEscape, onClose])

    // Handle body scroll lock
    React.useEffect(() => {
      if (!isOpen) return

      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = "hidden"

      return () => {
        document.body.style.overflow = originalStyle
      }
    }, [isOpen])

    // Focus management
    const modalRef = React.useRef<HTMLDivElement>(null)
    const previousActiveElement = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
      if (!isOpen) return

      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Focus the modal after a brief delay to ensure it's rendered
      const timer = setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)

      return () => {
        clearTimeout(timer)
        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }, [isOpen])

    // Focus trap
    React.useEffect(() => {
      if (!isOpen || !modalRef.current) return

      const modal = modalRef.current
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      modal.addEventListener('keydown', handleTabKey)
      return () => modal.removeEventListener('keydown', handleTabKey)
    }, [isOpen])

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose()
      }
    }

    if (!mounted || !isOpen) {
      return null
    }

    const modalContent = (
      <ModalContext.Provider value={{ isOpen, onClose }}>
        <div
          ref={ref}
          className={cn(modalVariants({ size }), className)}
          onClick={handleOverlayClick}
          {...props}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" aria-hidden="true" />
          
          {/* Modal content */}
          <div
            ref={modalRef}
            className={cn(modalContentVariants({ size }))}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </ModalContext.Provider>
    )

    return createPortal(modalContent, document.body)
  }
)
Modal.displayName = "Modal"

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    showCloseButton?: boolean
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => {
  const { onClose } = useModal()

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between p-6 pb-4 border-b border-discord-background-modifier-hover",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-discord text-discord-text-muted hover:text-discord-text-primary hover:bg-discord-background-modifier-hover transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
})
ModalHeader.displayName = "ModalHeader"

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    id="modal-title"
    className={cn(
      "text-heading-2 font-semibold text-discord-text-primary",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = "ModalTitle"

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    id="modal-description"
    className={cn(
      "text-small text-discord-text-secondary mt-2",
      className
    )}
    {...props}
  />
))
ModalDescription.displayName = "ModalDescription"

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 py-4", className)}
    {...props}
  />
))
ModalContent.displayName = "ModalContent"

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-3 p-6 pt-4 border-t border-discord-background-modifier-hover",
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = "ModalFooter"

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  useModal,
}