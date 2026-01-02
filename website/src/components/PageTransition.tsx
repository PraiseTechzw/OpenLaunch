'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { discordColors } from '@/lib/discord-theme'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsLoading(true)
    
    // Start transition
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, 150) // Short delay for smooth transition

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-150"
          style={{
            backgroundColor: `${discordColors.background.primary}e6`, // 90% opacity
          }}
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Discord-style loading spinner */}
            <div className="relative">
              <div 
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: `${discordColors.brand.primary} transparent transparent transparent`,
                }}
              />
              <div 
                className="absolute inset-0 w-8 h-8 border-2 border-r-transparent rounded-full animate-spin"
                style={{
                  borderColor: `transparent ${discordColors.brand.primary} transparent transparent`,
                  animationDirection: 'reverse',
                  animationDuration: '1.5s',
                }}
              />
            </div>
            
            {/* Loading text */}
            <div 
              className="text-sm font-medium animate-pulse"
              style={{
                color: discordColors.text.secondary,
              }}
            >
              Loading...
            </div>
          </div>
        </div>
      )}
      
      {/* Page content with transition */}
      <div 
        className={`transition-all duration-300 ${
          isLoading 
            ? 'opacity-0 transform scale-95' 
            : 'opacity-100 transform scale-100'
        }`}
      >
        {displayChildren}
      </div>
    </div>
  )
}