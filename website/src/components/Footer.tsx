import Link from 'next/link'
import { 
  CodeBracketIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { Logo } from '@/components/ui/logo'

const navigation = {
  main: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Events', href: '/events' },
    { name: 'Contributing', href: '/contributing' },
  ],
  legal: [
    { name: 'MIT License', href: 'https://github.com/PraiseTechzw/OpenLaunch/blob/main/LICENSE' },
    { name: 'Code of Conduct', href: '/community/code-of-conduct' },
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="lg" variant="icon" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Open-source collaboration platform launching 2026.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-5 w-5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Links
            </h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 OpenLaunch. Open source, community driven.
          </p>
        </div>
      </div>
    </footer>
  )
}