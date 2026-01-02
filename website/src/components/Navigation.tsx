'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { Logo } from '@/components/ui/logo'
import { Github } from 'lucide-react'
import { discordColors } from '@/lib/discord-theme'
import { useClientNavigation } from '@/hooks/useClientNavigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Docs', href: '/docs' },
  { name: 'Community', href: '/community' },
  { name: 'Events', href: '/events' },
  { name: 'Contributing', href: '/contributing' },
]

export function Navigation() {
  const pathname = usePathname()
  const { prefetch } = useClientNavigation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prefetch navigation routes on component mount
  useEffect(() => {
    navigation.forEach(item => {
      prefetch(item.href)
    })
  }, [prefetch])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <Disclosure as="nav" 
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-xl border-b shadow-lg" 
          : "backdrop-blur-lg border-b"
      )}
      style={{
        backgroundColor: isScrolled 
          ? `${discordColors.background.tertiary}f5` // 96% opacity
          : `${discordColors.background.tertiary}cc`, // 80% opacity
        borderBottomColor: `${discordColors.interactive.normal}80`, // 50% opacity
      }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="flex items-center transition-all duration-200 hover:scale-105"
                  style={{
                    color: discordColors.text.primary
                  }}
                >
                  <Logo size="lg" variant="navigation" />
                </Link>
              </div>

              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        'hover:scale-105 active:scale-95'
                      )}
                      style={{
                        color: isActive 
                          ? discordColors.text.primary 
                          : discordColors.text.secondary,
                        backgroundColor: isActive 
                          ? discordColors.background.modifier.selected
                          : 'transparent',
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
                          style={{
                            backgroundColor: discordColors.brand.primary,
                          }}
                        />
                      )}
                      {item.name}
                    </Link>
                  )
                })}
                
                <div className="ml-4 pl-4 border-l" style={{ borderColor: discordColors.interactive.normal }}>
                  <Link
                    href="https://github.com/PraiseTechzw/OpenLaunch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      color: discordColors.text.primary,
                      backgroundColor: discordColors.brand.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${discordColors.brand.primary}e6`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = discordColors.brand.primary
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <Disclosure.Button 
                  className="inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    color: discordColors.text.secondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                    e.currentTarget.style.color = discordColors.text.primary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = discordColors.text.secondary
                  }}
                >
                  <span className="sr-only">Open main menu</span>
                  <Transition
                    show={!open}
                    enter="transition-all duration-200"
                    enterFrom="opacity-0 rotate-90"
                    enterTo="opacity-100 rotate-0"
                    leave="transition-all duration-200"
                    leaveFrom="opacity-100 rotate-0"
                    leaveTo="opacity-0 rotate-90"
                  >
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  </Transition>
                  <Transition
                    show={open}
                    enter="transition-all duration-200"
                    enterFrom="opacity-0 rotate-90"
                    enterTo="opacity-100 rotate-0"
                    leave="transition-all duration-200"
                    leaveFrom="opacity-100 rotate-0"
                    leaveTo="opacity-0 rotate-90"
                  >
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  </Transition>
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel 
              className="lg:hidden border-t"
              style={{
                borderTopColor: `${discordColors.interactive.normal}80`,
                backgroundColor: `${discordColors.background.secondary}f8`, // 97% opacity
              }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'relative flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                        'active:scale-95'
                      )}
                      style={{
                        color: isActive 
                          ? discordColors.text.primary 
                          : discordColors.text.secondary,
                        backgroundColor: isActive 
                          ? discordColors.background.modifier.selected
                          : 'transparent',
                      }}
                      onTouchStart={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                          e.currentTarget.style.color = discordColors.text.primary
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (!isActive) {
                          setTimeout(() => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = discordColors.text.secondary
                          }, 150)
                        }
                      }}
                    >
                      {isActive && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                          style={{
                            backgroundColor: discordColors.brand.primary,
                          }}
                        />
                      )}
                      {item.name}
                    </Link>
                  )
                })}
                
                <div className="pt-4 mt-4 border-t" style={{ borderColor: discordColors.interactive.normal }}>
                  <Link
                    href="https://github.com/PraiseTechzw/OpenLaunch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 active:scale-95"
                    style={{
                      color: discordColors.text.primary,
                      backgroundColor: discordColors.brand.primary,
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.backgroundColor = `${discordColors.brand.primary}e6`
                    }}
                    onTouchEnd={(e) => {
                      setTimeout(() => {
                        e.currentTarget.style.backgroundColor = discordColors.brand.primary
                      }, 150)
                    }}
                  >
                    <Github className="w-5 h-5 mr-3" />
                    GitHub
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}