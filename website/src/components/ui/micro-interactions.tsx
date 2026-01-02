'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { discordColors } from '@/lib/discord-theme'

/**
 * Enhanced Button with Ripple Effect
 */
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  rippleColor?: string
}

export function RippleButton({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  rippleColor,
  onClick,
  ...props 
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
      }
      
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 600)
    }
    
    onClick?.(e)
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-discord-brand-primary text-white hover:bg-discord-brand-primary/90'
      case 'secondary':
        return 'bg-discord-interactive-normal text-discord-text-primary hover:bg-discord-interactive-hover'
      case 'ghost':
        return 'bg-transparent text-discord-text-secondary hover:bg-discord-background-modifier-hover hover:text-discord-text-primary'
      default:
        return 'bg-discord-brand-primary text-white hover:bg-discord-brand-primary/90'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm'
      case 'md':
        return 'px-4 py-2 text-base'
      case 'lg':
        return 'px-6 py-3 text-lg'
      default:
        return 'px-4 py-2 text-base'
    }
  }

  const defaultRippleColor = variant === 'primary' 
    ? 'rgba(255, 255, 255, 0.3)' 
    : `${discordColors.brand.primary}40`

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-discord font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-discord-brand-primary focus:ring-offset-2',
        'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: rippleColor || defaultRippleColor,
            animation: 'ripple 0.6s linear',
          }}
        />
      ))}
    </button>
  )
}

/**
 * Floating Action Button with Pulse Effect
 */
interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  pulse?: boolean
}

export function FloatingActionButton({
  icon,
  label,
  position = 'bottom-right',
  pulse = false,
  className,
  ...props
}: FloatingActionButtonProps) {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-right':
        return 'fixed bottom-6 right-6'
      case 'bottom-left':
        return 'fixed bottom-6 left-6'
      case 'top-right':
        return 'fixed top-6 right-6'
      case 'top-left':
        return 'fixed top-6 left-6'
      default:
        return 'fixed bottom-6 right-6'
    }
  }

  return (
    <button
      className={cn(
        'z-50 w-14 h-14 rounded-full shadow-discord-elevation-high',
        'bg-discord-brand-primary text-white',
        'hover:bg-discord-brand-primary/90 hover:scale-110',
        'active:scale-95 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-discord-brand-primary focus:ring-offset-2',
        pulse && 'animate-discord-pulse',
        getPositionStyles(),
        className
      )}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  )
}

/**
 * Tooltip with Smooth Animation
 */
interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  delay = 500 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    }
  }

  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-discord-background-floating'
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-discord-background-floating'
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-discord-background-floating'
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-discord-background-floating'
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-discord-background-floating'
    }
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-xs text-white rounded whitespace-nowrap',
            'bg-discord-background-floating shadow-discord-elevation-high',
            'animate-fade-in-up pointer-events-none',
            getPositionStyles()
          )}
          role="tooltip"
        >
          {content}
          
          {/* Tooltip arrow */}
          <div
            className={cn(
              'absolute w-0 h-0 border-4 border-transparent',
              getArrowStyles()
            )}
          />
        </div>
      )}
    </div>
  )
}

/**
 * Progress Bar with Smooth Animation
 */
interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: string
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  color = discordColors.brand.primary,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-discord-text-secondary mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div 
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: discordColors.background.modifier.hover }}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            animated && 'animate-pulse'
          )}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

/**
 * Notification Toast with Slide Animation
 */
interface NotificationProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
}

export function Notification({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300) // Wait for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-discord-status-success border-discord-status-success'
      case 'error':
        return 'bg-discord-status-error border-discord-status-error'
      case 'warning':
        return 'bg-discord-status-warning border-discord-status-warning'
      case 'info':
        return 'bg-discord-brand-primary border-discord-brand-primary'
      default:
        return 'bg-discord-brand-primary border-discord-brand-primary'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'ℹ'
      default:
        return 'ℹ'
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm p-4 rounded-discord-lg shadow-discord-elevation-high',
        'text-white border-l-4 animate-slide-in-right',
        !isVisible && 'animate-slide-out-right',
        getTypeStyles()
      )}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg" aria-hidden="true">
          {getIcon()}
        </span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onClose?.(), 300)
          }}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

/**
 * Loading Skeleton with Shimmer Effect
 */
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded'
      case 'rectangular':
        return 'rounded-discord'
      case 'circular':
        return 'rounded-full'
      default:
        return 'h-4 rounded'
    }
  }

  const skeletonStyle = {
    width: width || (variant === 'text' ? '100%' : '40px'),
    height: height || (variant === 'text' ? '1rem' : '40px'),
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'animate-shimmer bg-gradient-to-r from-discord-background-modifier-hover via-discord-background-modifier-active to-discord-background-modifier-hover bg-[length:200px_100%]',
              getVariantStyles(),
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={skeletonStyle}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r from-discord-background-modifier-hover via-discord-background-modifier-active to-discord-background-modifier-hover bg-[length:200px_100%]',
        getVariantStyles(),
        className
      )}
      style={skeletonStyle}
    />
  )
}

// Add ripple keyframe to CSS
const rippleKeyframe = `
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
`

// Inject the keyframe into the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = rippleKeyframe
  document.head.appendChild(style)
}