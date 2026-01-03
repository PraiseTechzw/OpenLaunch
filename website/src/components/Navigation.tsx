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
import { useResponsive } from '@/hooks/useResponsive'
import { useMobileInteractions } from '@/hooks/useMobileInteractions'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { mobileClasses } from '@/lib/mobile-utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Apps', href: '/#apps' },
  { name: 'Docs', href: '/docs' },
  { name: 'Community', href: '/community' },
  { name: 'Contributing', href: '/contributing' },
]

export function Navigation() {
  const pathname = usePathname()
  const { prefetch } = useClientNavigation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { isMobile, isTouch } = useResponsive()

  // Mobile interactions
  const { ref: mobileMenuRef, haptic } = useMobileInteractions({
    enableRipple: isTouch,
    enableHaptic: isTouch,
    optimizeTouchTarget: isTouch,
  })

  // Keyboard navigation for desktop menu
  const { containerRef: desktopNavRef } = useKeyboardNavigation({
    orientation: 'horizontal',
    enableArrowKeys: true,
    enableHomeEnd: true,
    wrap: true,
  })

  // Keyboard navigation for mobile menu
  const { containerRef: mobileNavRef } = useKeyboardNavigation({
    orientation: 'vertical',
    enableArrowKeys: true,
    enableHomeEnd: true,
    wrap: true,
  })

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

  const handleMobileMenuClick = () => {
    haptic?.('light')
  }

  const handleNavItemClick = () => {
    haptic?.('light')
  }

  return (
    <Disclosure as="nav" 
      id="main-navigation"
      role="navigation"
      aria-label="Main navigation"
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        // Enhanced mobile support with safe area
        mobileClasses.safeTop,
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
                  className={clsx(
                    "flex items-center transition-all duration-200",
                    // Enhanced mobile touch target
                    isTouch ? mobileClasses.touchTarget : "hover:scale-105"
                  )}
                  style={{
                    color: discordColors.text.primary
                  }}
                  onClick={handleNavItemClick}
                  aria-label="OpenLaunch home"
                >
                  <Logo size="xl" variant="navigation" />
                </Link>
              </div>

              {/* Desktop navigation */}
              <div 
                ref={desktopNavRef}
                className="hidden lg:flex items-center space-x-2" 
                role="menubar"
                aria-label="Main navigation"
              >
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      className={clsx(
                        'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                        'hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2'
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
                      onClick={handleNavItemClick}
                    >
                      {isActive && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                          style={{
                            backgroundColor: discordColors.brand.primary,
                          }}
                          aria-hidden="true"
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
                    aria-label="View OpenLaunch on GitHub (opens in new tab)"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2"
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
                    onClick={handleNavItemClick}
                  >
                    <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                    GitHub
                  </Link>
                </div>
              </div>

              {/* Enhanced mobile menu button */}
              <div className="lg:hidden flex items-center">
                <Disclosure.Button 
                  ref={mobileMenuRef}
                  aria-label={open ? "Close main menu" : "Open main menu"}
                  aria-expanded={open}
                  className={clsx(
                    "inline-flex items-center justify-center rounded-lg transition-all duration-200",
                    // Enhanced mobile interactions
                    mobileClasses.touchTarget,
                    isTouch ? mobileClasses.touchFeedback : "hover:scale-105 active:scale-95",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2"
                  )}
                  style={{
                    color: discordColors.text.secondary,
                  }}
                  onMouseEnter={(e) => {
                    if (!isTouch) {
                      e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                      e.currentTarget.style.color = discordColors.text.primary
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isTouch) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = discordColors.text.secondary
                    }
                  }}
                  onClick={handleMobileMenuClick}
                >
                  <span className="sr-only">{open ? "Close main menu" : "Open main menu"}</span>
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

          {/* Enhanced mobile menu */}
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel 
              className={clsx(
                "lg:hidden border-t",
                // Enhanced mobile scrolling
                mobileClasses.scrollable,
                mobileClasses.safeBottom
              )}
              style={{
                borderTopColor: `${discordColors.interactive.normal}80`,
                backgroundColor: `${discordColors.background.secondary}f8`, // 97% opacity
              }}
            >
              <nav 
                ref={mobileNavRef}
                className="px-4 pt-4 pb-6 space-y-2" 
                role="menu" 
                aria-label="Mobile navigation menu"
              >
                {navigation.map((item) => {
                  const isActive = isActiveRoute(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      className={clsx(
                        'relative flex items-center text-base font-medium rounded-lg transition-all duration-200',
                        // Enhanced mobile touch interactions
                        mobileClasses.touchTarget,
                        isTouch ? mobileClasses.touchFeedback : 'active:scale-95',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2'
                      )}
                      style={{
                        color: isActive 
                          ? discordColors.text.primary 
                          : discordColors.text.secondary,
                        backgroundColor: isActive 
                          ? discordColors.background.modifier.selected
                          : 'transparent',
                        // Enhanced padding for mobile
                        padding: isMobile ? '12px 16px' : '8px 16px',
                      }}
                      onTouchStart={(e) => {
                        if (!isActive && isTouch) {
                          e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                          e.currentTarget.style.color = discordColors.text.primary
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (!isActive && isTouch) {
                          setTimeout(() => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = discordColors.text.secondary
                          }, 150)
                        }
                      }}
                      onClick={handleNavItemClick}
                    >
                      {isActive && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                          style={{
                            backgroundColor: discordColors.brand.primary,
                          }}
                          aria-hidden="true"
                        />
                      )}
                      {item.name}
                    </Link>
                  )
                })}
                
                <div 
                  className="pt-4 mt-4 border-t" 
                  style={{ borderColor: discordColors.interactive.normal }}
                >
                  <Link
                    href="https://github.com/PraiseTechzw/OpenLaunch"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View OpenLaunch on GitHub (opens in new tab)"
                    className={clsx(
                      "flex items-center text-base font-medium rounded-lg transition-all duration-200",
                      // Enhanced mobile touch interactions
                      mobileClasses.touchTarget,
                      isTouch ? mobileClasses.touchFeedback : 'active:scale-95',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2'
                    )}
                    style={{
                      color: discordColors.text.primary,
                      backgroundColor: discordColors.brand.primary,
                      // Enhanced padding for mobile
                      padding: isMobile ? '12px 16px' : '8px 16px',
                    }}
                    onTouchStart={(e) => {
                      if (isTouch) {
                        e.currentTarget.style.backgroundColor = `${discordColors.brand.primary}e6`
                      }
                    }}
                    onTouchEnd={(e) => {
                      if (isTouch) {
                        setTimeout(() => {
                          e.currentTarget.style.backgroundColor = discordColors.brand.primary
                        }, 150)
                      }
                    }}
                    onClick={handleNavItemClick}
                  >
                    <Github className="w-5 h-5 mr-3" aria-hidden="true" />
                    GitHub
                  </Link>
                </div>
              </nav>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}