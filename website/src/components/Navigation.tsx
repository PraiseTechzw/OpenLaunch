'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { 
  DocumentTextIcon, 
  UsersIcon, 
  CalendarDaysIcon, 
  CodeBracketIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { Logo } from '@/components/ui/logo'
import { Fragment } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Documentation',
    href: '/docs',
    icon: DocumentTextIcon,
    children: [
      { name: 'Getting Started', href: '/docs/onboarding', description: 'Quick start guide for new contributors' },
      { name: 'Vision & Mission', href: '/docs/vision', description: 'Our goals and values' },
      { name: 'Roadmap', href: '/docs/roadmap', description: 'Project timeline and milestones' },
      { name: 'Architecture', href: '/docs/architecture', description: 'Technical documentation' },
      { name: 'API Reference', href: '/docs/api', description: 'Complete API documentation' },
    ]
  },
  {
    name: 'Community',
    href: '/community',
    icon: UsersIcon,
    children: [
      { name: 'Contributors', href: '/community/contributors', description: 'Meet our amazing contributors' },
      { name: 'Code of Conduct', href: '/community/code-of-conduct', description: 'Community guidelines' },
      { name: 'Discussions', href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions', description: 'Join the conversation', external: true },
      { name: 'Discord', href: '/community/discord', description: 'Real-time chat and support' },
    ]
  },
  {
    name: 'Events',
    href: '/events',
    icon: CalendarDaysIcon,
    children: [
      { name: 'Upcoming Events', href: '/events', description: 'Join our upcoming events' },
      { name: 'Coding Party 2026', href: '/events/coding-party-2026', description: 'Our flagship annual event' },
      { name: 'Workshops', href: '/events/workshops', description: 'Learn new skills' },
      { name: 'Meetups', href: '/events/meetups', description: 'Local community gatherings' },
    ]
  },
  { name: 'Contributing', href: '/contributing', icon: HeartIcon },
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
        ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg" 
        : "bg-white/80 backdrop-blur-lg border-b border-gray-200/30"
    )}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center hover:opacity-80 transition-all duration-300 hover:scale-105">
                  <Logo size="lg" />
                </Link>
              </div>

              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative">
                    {item.children ? (
                      <Menu as="div" className="relative">
                        <Menu.Button className={clsx(
                          'flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden group',
                          pathname.startsWith(item.href)
                            ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-md border border-primary-200/50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50'
                        )}>
                          <span className="relative z-10 flex items-center">
                            {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                            {item.name}
                            <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                          </span>
                          {!pathname.startsWith(item.href) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </Menu.Button>
                        
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Menu.Items className="absolute left-0 mt-2 w-80 origin-top-left bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 border border-gray-200/50 p-2">
                            {item.children.map((child) => (
                              <Menu.Item key={child.name}>
                                {({ active }) => (
                                  child.external ? (
                                    <a
                                      href={child.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={clsx(
                                        'flex flex-col px-4 py-3 rounded-xl transition-all duration-200',
                                        active ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700' : 'text-gray-700 hover:text-primary-600'
                                      )}
                                    >
                                      <span className="font-medium">{child.name}</span>
                                      <span className="text-sm text-gray-500 mt-1">{child.description}</span>
                                    </a>
                                  ) : (
                                    <Link
                                      href={child.href}
                                      className={clsx(
                                        'flex flex-col px-4 py-3 rounded-xl transition-all duration-200',
                                        active ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700' : 'text-gray-700 hover:text-primary-600'
                                      )}
                                    >
                                      <span className="font-medium">{child.name}</span>
                                      <span className="text-sm text-gray-500 mt-1">{child.description}</span>
                                    </Link>
                                  )
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link
                        href={item.href}
                        className={clsx(
                          'flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden group',
                          pathname === item.href
                            ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-md border border-primary-200/50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50'
                        )}
                      >
                        <span className="relative z-10 flex items-center">
                          {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                          {item.name}
                        </span>
                        {pathname !== item.href && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="ml-6 pl-6 border-l border-gray-200">
                  <Link
                    href="https://github.com/PraiseTechzw/OpenLaunch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 hover:from-primary-700 hover:via-purple-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl btn-hover-lift relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CodeBracketIcon className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">GitHub</span>
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gradient-to-r hover:from-gray-100 hover:to-primary-50 transition-all duration-300">
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
          <Disclosure.Panel className="lg:hidden border-t border-gray-200/30 bg-white/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-96 overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <Disclosure as="div">
                      {({ open: subOpen }) => (
                        <>
                          <Disclosure.Button className={clsx(
                            'flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-xl transition-all duration-300',
                            pathname.startsWith(item.href)
                              ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-md'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50'
                          )}>
                            <span className="flex items-center">
                              {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                              {item.name}
                            </span>
                            <ChevronDownIcon className={clsx(
                              'w-5 h-5 transition-transform duration-200',
                              subOpen ? 'rotate-180' : ''
                            )} />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 ml-4 space-y-1">
                            {item.children.map((child) => (
                              child.external ? (
                                <a
                                  key={child.name}
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                >
                                  {child.name}
                                </a>
                              ) : (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                >
                                  {child.name}
                                </Link>
                              )
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Link
                      href={item.href}
                      className={clsx(
                        'flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105',
                        pathname === item.href
                          ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-md'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50'
                      )}
                    >
                      {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
              >
                <CodeBracketIcon className="w-5 h-5 mr-3" />
                View on GitHub
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}