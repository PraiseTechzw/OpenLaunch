'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb } from './Breadcrumb'
import { discordColors } from '@/lib/discord-theme'
import { clsx } from 'clsx'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  showBreadcrumbs?: boolean
  breadcrumbItems?: Array<{ label: string; href: string }>
  className?: string
}

export function PageLayout({ 
  children, 
  title, 
  description, 
  showBreadcrumbs = true, 
  breadcrumbItems,
  className 
}: PageLayoutProps) {
  const pathname = usePathname()
  
  // Determine if breadcrumbs should be shown
  const shouldShowBreadcrumbs = showBreadcrumbs && pathname !== '/'
  
  return (
    <div className={clsx('min-h-screen', className)}>
      {/* Breadcrumb section */}
      {shouldShowBreadcrumbs && (
        <div 
          className="border-b"
          style={{
            backgroundColor: discordColors.background.secondary,
            borderBottomColor: `${discordColors.interactive.normal}40`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      )}
      
      {/* Page header */}
      {(title || description) && (
        <div 
          className="border-b"
          style={{
            backgroundColor: discordColors.background.primary,
            borderBottomColor: `${discordColors.interactive.normal}40`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {title && (
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ color: discordColors.text.primary }}
              >
                {title}
              </h1>
            )}
            {description && (
              <p 
                className="text-lg"
                style={{ color: discordColors.text.secondary }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}