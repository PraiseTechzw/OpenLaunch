'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Community', href: '/community' },
  { name: 'Events', href: '/events' },
  { name: 'Contributing', href: '/contributing' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <Disclosure as="nav" className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">OL</span>
                  </div>
                  <span className="text-xl font-bold gradient-text">OpenLaunch</span>
                </Link>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  View on GitHub
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-700"
              >
                View on GitHub
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}