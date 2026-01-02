'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { Logo } from '@/components/ui/logo'
import { Github } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Docs', href: '/docs' },
  { name: 'Community', href: '/community' },
  { name: 'Events', href: '/events' },
  { name: 'Contributing', href: '/contributing' },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Disclosure as="nav" className={clsx(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-lg" 
        : "bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/30"
    )}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24">
              <div className="flex items-center">
                <Link href="/" className="flex items-center hover:opacity-80 transition-all duration-300 hover:scale-105">
                  <Logo size="lg" variant="navigation" />
                </Link>
              </div>

              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'text-sm font-medium transition-colors duration-200',
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? 'text-primary-400'
                        : 'text-gray-300 hover:text-primary-400'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-all duration-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6 transition-transform duration-300 rotate-90" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6 transition-transform duration-300" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="lg:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-xl">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200',
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? 'text-primary-400 bg-gray-800'
                      : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200 mt-4"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}