'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: React.ReactNode
  threshold?: number
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  fallback, 
  threshold = 0.1,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      ) : (
        fallback || (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
        )
      )}
    </div>
  )
}