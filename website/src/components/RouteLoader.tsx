'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { discordColors } from '@/lib/discord-theme'

export function RouteLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    // Simulate route change detection
    handleStart()
    const timer = setTimeout(handleComplete, 200)

    return () => {
      clearTimeout(timer)
      handleComplete()
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-1"
      style={{
        backgroundColor: discordColors.background.secondary,
      }}
    >
      {/* Progress bar */}
      <div 
        className="h-full transition-all duration-200 ease-out"
        style={{
          backgroundColor: discordColors.brand.primary,
          width: isLoading ? '100%' : '0%',
          boxShadow: `0 0 10px ${discordColors.brand.primary}80`,
        }}
      />
    </div>
  )
}