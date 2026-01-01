import Link from 'next/link'
import { 
  CodeBracketIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  CalendarDaysIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const navigation = {
  main: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Events', href: '/events' },
    { name: 'Contributing', href: '/contributing' },
  ],
  docs: [
    { name: 'Getting Started', href: '/docs/getting-started' },
    { name: 'Vision', href: '/docs/vision' },
    { name: 'Roadmap', href: '/docs/roadmap' },
    { name: 'Architecture', href: '/docs/architecture' },
  ],
  community: [
    { name: 'Contributors', href: '/community/contributors' },
    { name: 'Code of Conduct', href: '/community/code-of-conduct' },
    { name: 'Events', href: '/community/events' },
    { name: 'GitHub Discussions', href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'License', href: '/license' },
  ],
}

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/PraiseTechzw/OpenLaunch',
    icon: CodeBracketIcon,
  },
  {
    name: 'Discussions',
    href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Documentation',
    href: '/docs',
    icon: DocumentTextIcon,
  },
  {
    name: 'Events',
    href: '/events',
    icon: CalendarDaysIcon,
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OL</span>
              </div>
              <span className="text-xl font-bold">OpenLaunch</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A collaborative innovation lab where developers, designers, and creators 
              build real-world software in public through our annual Coding Party initiatives.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Documentation
            </h3>
            <ul className="space-y-3">
              {navigation.docs.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {navigation.community.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>by the OpenLaunch community</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex space-x-6">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                © 2026 OpenLaunch. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}