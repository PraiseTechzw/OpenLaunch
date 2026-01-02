"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-discord-brand-primary",
        secondary: "text-discord-text-secondary",
        muted: "text-discord-text-muted",
        success: "text-discord-status-success",
        warning: "text-discord-status-warning",
        danger: "text-discord-status-error",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const dotsVariants = cva(
  "flex items-center space-x-1",
  {
    variants: {
      size: {
        xs: "space-x-0.5",
        sm: "space-x-1",
        default: "space-x-1.5",
        lg: "space-x-2",
        xl: "space-x-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const dotVariants = cva(
  "rounded-full bg-current animate-pulse",
  {
    variants: {
      size: {
        xs: "h-1 w-1",
        sm: "h-1.5 w-1.5",
        default: "h-2 w-2",
        lg: "h-3 w-3",
        xl: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant, className }))}
        role="status"
        aria-label="Loading"
        {...props}
      />
    )
  }
)
Spinner.displayName = "Spinner"

export interface LoadingDotsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotsVariants> {
  variant?: VariantProps<typeof spinnerVariants>["variant"]
}

const LoadingDots = React.forwardRef<HTMLDivElement, LoadingDotsProps>(
  ({ className, size, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dotsVariants({ size }), className)}
        role="status"
        aria-label="Loading"
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              dotVariants({ size }),
              variant === "default" && "text-discord-brand-primary",
              variant === "secondary" && "text-discord-text-secondary",
              variant === "muted" && "text-discord-text-muted",
              variant === "success" && "text-discord-status-success",
              variant === "warning" && "text-discord-status-warning",
              variant === "danger" && "text-discord-status-error"
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>
    )
  }
)
LoadingDots.displayName = "LoadingDots"

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  children: React.ReactNode
  spinnerSize?: VariantProps<typeof spinnerVariants>["size"]
  spinnerVariant?: VariantProps<typeof spinnerVariants>["variant"]
  overlay?: boolean
  text?: string
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ 
    className, 
    isLoading, 
    children, 
    spinnerSize = "lg",
    spinnerVariant = "default",
    overlay = true,
    text,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
        
        {isLoading && (
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center z-10",
            overlay && "bg-discord-background-primary/80 backdrop-blur-sm"
          )}>
            <Spinner size={spinnerSize} variant={spinnerVariant} />
            {text && (
              <p className="mt-3 text-sm text-discord-text-secondary">
                {text}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)
LoadingOverlay.displayName = "LoadingOverlay"

export interface PulseProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
}

const Pulse = React.forwardRef<HTMLDivElement, PulseProps>(
  ({ className, isLoading = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-discord bg-discord-background-modifier-hover",
          isLoading && "animate-pulse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Pulse.displayName = "Pulse"

export { Spinner, LoadingDots, LoadingOverlay, Pulse }