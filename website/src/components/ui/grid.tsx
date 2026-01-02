import React from 'react'
import { cn } from '@/lib/utils'

// Container component with responsive padding and max-widths
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

export function Container({ 
  size = 'lg', 
  className, 
  children, 
  ...props 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl', 
    lg: 'max-w-7xl',
    xl: 'max-w-discord-wide',
    full: 'max-w-none'
  }

  return (
    <div 
      className={cn(
        'container mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Responsive grid component
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    default?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: {
    default?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  children: React.ReactNode
}

export function Grid({ 
  cols = { default: 1, sm: 2, lg: 3 },
  gap = { default: 4, md: 6, lg: 8 },
  className,
  children,
  ...props
}: GridProps) {
  // Generate responsive grid classes
  const gridClasses = []
  
  // Columns
  if (cols.default) gridClasses.push(`grid-cols-${cols.default}`)
  if (cols.xs) gridClasses.push(`xs:grid-cols-${cols.xs}`)
  if (cols.sm) gridClasses.push(`sm:grid-cols-${cols.sm}`)
  if (cols.md) gridClasses.push(`md:grid-cols-${cols.md}`)
  if (cols.lg) gridClasses.push(`lg:grid-cols-${cols.lg}`)
  if (cols.xl) gridClasses.push(`xl:grid-cols-${cols.xl}`)
  if (cols['2xl']) gridClasses.push(`2xl:grid-cols-${cols['2xl']}`)
  
  // Gap
  if (gap.default) gridClasses.push(`gap-${gap.default}`)
  if (gap.xs) gridClasses.push(`xs:gap-${gap.xs}`)
  if (gap.sm) gridClasses.push(`sm:gap-${gap.sm}`)
  if (gap.md) gridClasses.push(`md:gap-${gap.md}`)
  if (gap.lg) gridClasses.push(`lg:gap-${gap.lg}`)
  if (gap.xl) gridClasses.push(`xl:gap-${gap.xl}`)
  if (gap['2xl']) gridClasses.push(`2xl:gap-${gap['2xl']}`)

  return (
    <div 
      className={cn(
        'grid',
        ...gridClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Auto-fit grid for cards
interface AutoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  minWidth?: 'xs' | 'sm' | 'md' | 'lg'
  gap?: number
  children: React.ReactNode
}

export function AutoGrid({ 
  minWidth = 'md',
  gap = 6,
  className,
  children,
  ...props
}: AutoGridProps) {
  const minWidthClasses = {
    xs: 'grid-cols-auto-fit-xs',
    sm: 'grid-cols-auto-fit-sm', 
    md: 'grid-cols-auto-fit-md',
    lg: 'grid-cols-auto-fit-lg'
  }

  return (
    <div 
      className={cn(
        'grid',
        minWidthClasses[minWidth],
        `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Responsive flex component
interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: {
    default?: 'row' | 'col'
    sm?: 'row' | 'col'
    md?: 'row' | 'col'
    lg?: 'row' | 'col'
  }
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: number
  wrap?: boolean
  children: React.ReactNode
}

export function Flex({ 
  direction = { default: 'row' },
  align = 'start',
  justify = 'start',
  gap = 4,
  wrap = false,
  className,
  children,
  ...props
}: FlexProps) {
  const directionClasses = []
  if (direction.default) directionClasses.push(`flex-${direction.default}`)
  if (direction.sm) directionClasses.push(`sm:flex-${direction.sm}`)
  if (direction.md) directionClasses.push(`md:flex-${direction.md}`)
  if (direction.lg) directionClasses.push(`lg:flex-${direction.lg}`)

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }

  return (
    <div 
      className={cn(
        'flex',
        ...directionClasses,
        alignClasses[align],
        justifyClasses[justify],
        `gap-${gap}`,
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Responsive stack component (vertical spacing)
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  space?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
  }
  children: React.ReactNode
}

export function Stack({ 
  space = { default: 4, md: 6, lg: 8 },
  className,
  children,
  ...props
}: StackProps) {
  const spaceClasses = []
  if (space.default) spaceClasses.push(`space-y-${space.default}`)
  if (space.sm) spaceClasses.push(`sm:space-y-${space.sm}`)
  if (space.md) spaceClasses.push(`md:space-y-${space.md}`)
  if (space.lg) spaceClasses.push(`lg:space-y-${space.lg}`)

  return (
    <div 
      className={cn(
        ...spaceClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Responsive section component with proper spacing
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function Section({ 
  size = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  const sizeClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32'
  }

  return (
    <section 
      className={cn(
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

// Responsive aspect ratio component
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: 'square' | 'video' | 'wide' | 'portrait'
  children: React.ReactNode
}

export function AspectRatio({ 
  ratio = 'video',
  className,
  children,
  ...props
}: AspectRatioProps) {
  const ratioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]'
  }

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        ratioClasses[ratio],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}