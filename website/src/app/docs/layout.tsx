'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon, RocketLaunchIcon, CogIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
import { PageLayout } from '@/components/PageLayout'
import { discordColors } from '@/lib/discord-theme'
import { clsx } from 'clsx'

interface NavigationItem {
  name: string
  href: string
  icon?: React.ReactNode
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  {
    name: 'Getting Started',
    href: '/docs',
    icon: <RocketLaunchIcon className="w-5 h-5" />,
    children: [
      { name: 'Overview', href: '/docs' },
      { name: 'Vision & Mission', href: '/docs/vision' },
      { name: 'Onboarding Guide', href: '/docs/onboarding' },
      { name: 'Architecture', href: '/docs/architecture' },
    ]
  },
  {
    name: 'Development',
    href: '/docs/development',
    icon: <CogIcon className="w-5 h-5" />,
    children: [
      { name: 'Roadmap', href: '/docs/roadmap' },
      { name: 'Contributing', href: '/contributing' },
      { name: 'API Reference', href: '/docs/api' },
    ]
  },
  {
    name: 'Design',
    href: '/docs/design',
    icon: <PaintBrushIcon className="w-5 h-5" />,
    children: [
      { name: 'Design Principles', href: '/design/design-principles' },
      { name: 'UI System', href: '/design/ui-system' },
      { name: 'Discord Theme', href: '/test-discord-design' },
    ]
  }
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started'])

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  const isActiveRoute = (href: string) => {
    if (href === '/docs') {
      return pathname === '/docs'
    }
    return pathname.startsWith(href)
  }

  const isParentActive = (item: NavigationItem) => {
    if (isActiveRoute(item.href)) return true
    return item.children?.some(child => isActiveRoute(child.href)) || false
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-80 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: discordColors.background.tertiary }}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden" style={{ borderColor: discordColors.interactive.normal }}>
          <h2 className="text-lg font-semibold" style={{ color: discordColors.text.primary }}>
            Documentation
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: discordColors.text.secondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
              e.currentTarget.style.color = discordColors.text.primary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = discordColors.text.secondary
            }}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full">
          {navigation.map((item) => {
            const isExpanded = expandedSections.includes(item.name)
            const isParentActiveRoute = isParentActive(item)
            
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleSection(item.name)}
                  className={clsx(
                    "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200",
                    isParentActiveRoute && "font-medium"
                  )}
                  style={{
                    backgroundColor: isParentActiveRoute 
                      ? discordColors.background.modifier.selected
                      : 'transparent',
                    color: isParentActiveRoute 
                      ? discordColors.text.primary 
                      : discordColors.text.secondary,
                  }}
                  onMouseEnter={(e) => {
                    if (!isParentActiveRoute) {
                      e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                      e.currentTarget.style.color = discordColors.text.primary
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isParentActiveRoute) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = discordColors.text.secondary
                    }
                  }}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <span className="mr-3" style={{ color: isParentActiveRoute ? discordColors.brand.primary : 'inherit' }}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                </button>
                
                {isExpanded && item.children && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.children.map((child) => {
                      const isActive = isActiveRoute(child.href)
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={clsx(
                            "block p-2 rounded-lg text-sm transition-all duration-200",
                            isActive && "font-medium"
                          )}
                          style={{
                            backgroundColor: isActive 
                              ? discordColors.background.modifier.selected
                              : 'transparent',
                            color: isActive 
                              ? discordColors.text.primary 
                              : discordColors.text.secondary,
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                              e.currentTarget.style.color = discordColors.text.primary
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent'
                              e.currentTarget.style.color = discordColors.text.secondary
                            }
                          }}
                        >
                          {isActive && (
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                              style={{ backgroundColor: discordColors.brand.primary }}
                            />
                          )}
                          {child.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: discordColors.background.primary }}
    >
      <PageLayout showBreadcrumbs={true}>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile menu button */}
            <div className="lg:hidden p-4 border-b" style={{ borderColor: discordColors.interactive.normal }}>
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center p-2 rounded-lg transition-colors"
                style={{ color: discordColors.text.secondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                  e.currentTarget.style.color = discordColors.text.primary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = discordColors.text.secondary
                }}
              >
                <Bars3Icon className="w-5 h-5 mr-2" />
                <span>Menu</span>
              </button>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div 
                className="prose prose-lg max-w-none"
                style={{ color: discordColors.text.primary }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}