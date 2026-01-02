"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse rounded-discord bg-discord-background-modifier-hover",
  {
    variants: {
      variant: {
        default: "bg-discord-background-modifier-hover",
        elevated: "bg-discord-background-elevated",
        muted: "bg-discord-interactive-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

// Predefined skeleton components for common use cases

const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    lines?: number
    variant?: VariantProps<typeof skeletonVariants>["variant"]
  }
>(({ className, lines = 3, variant, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full" // Last line is shorter
          )}
        />
      ))}
    </div>
  )
})
SkeletonText.displayName = "SkeletonText"

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "default" | "lg" | "xl"
    variant?: VariantProps<typeof skeletonVariants>["variant"]
  }
>(({ className, size = "default", variant, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <Skeleton
      ref={ref}
      variant={variant}
      className={cn("rounded-full", sizeClasses[size], className)}
      {...props}
    />
  )
})
SkeletonAvatar.displayName = "SkeletonAvatar"

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: VariantProps<typeof skeletonVariants>["variant"]
    showAvatar?: boolean
    showImage?: boolean
  }
>(({ className, variant, showAvatar = false, showImage = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 bg-discord-background-secondary rounded-discord-lg border border-discord-background-modifier-hover",
        className
      )}
      {...props}
    >
      {showImage && (
        <Skeleton variant={variant} className="h-48 w-full mb-4 rounded-discord" />
      )}
      
      <div className="space-y-4">
        {showAvatar && (
          <div className="flex items-center space-x-3">
            <SkeletonAvatar variant={variant} />
            <div className="space-y-2 flex-1">
              <Skeleton variant={variant} className="h-4 w-1/3" />
              <Skeleton variant={variant} className="h-3 w-1/4" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Skeleton variant={variant} className="h-6 w-3/4" />
          <SkeletonText lines={2} variant={variant} />
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Skeleton variant={variant} className="h-8 w-20 rounded-discord" />
          <Skeleton variant={variant} className="h-8 w-16 rounded-discord" />
        </div>
      </div>
    </div>
  )
})
SkeletonCard.displayName = "SkeletonCard"

const SkeletonButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "default" | "lg"
    variant?: VariantProps<typeof skeletonVariants>["variant"]
  }
>(({ className, size = "default", variant, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-20",
    default: "h-10 w-24",
    lg: "h-12 w-28",
  }

  return (
    <Skeleton
      ref={ref}
      variant={variant}
      className={cn("rounded-discord", sizeClasses[size], className)}
      {...props}
    />
  )
})
SkeletonButton.displayName = "SkeletonButton"

const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    rows?: number
    columns?: number
    variant?: VariantProps<typeof skeletonVariants>["variant"]
  }
>(({ className, rows = 5, columns = 4, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full bg-discord-background-secondary rounded-discord-lg border border-discord-background-modifier-hover overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex border-b border-discord-background-modifier-hover p-4 space-x-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={`header-${i}`}
            variant={variant}
            className="h-4 flex-1"
          />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex p-4 space-x-4 border-b border-discord-background-modifier-hover last:border-b-0"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              variant={variant}
              className={cn(
                "h-4 flex-1",
                colIndex === 0 && "w-1/4", // First column smaller
                colIndex === columns - 1 && "w-1/6" // Last column smaller
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
})
SkeletonTable.displayName = "SkeletonTable"

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonButton,
  SkeletonTable,
}