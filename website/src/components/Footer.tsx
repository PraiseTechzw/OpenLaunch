import Link from 'next/link'
import { 
  CodeBracketIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  CalendarDaysIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Logo } from '@/components/ui/logo'

const navigation = {
  main: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
    { name: 'Events', href: '/events' },
    { name: 'Contributing', href: '/contributing' },
  ],
  docs: [
    { name: 'Onboarding', href: '/docs/onboarding' },
    { name: 'Vision', href: '/docs/vision' },
    { name: 'Roadmap', href: '/docs/roadmap' },
    { name: 'Architecture', href: '/docs/architecture' },
  ],
  community: [
    { name: 'Contributors', href: '/community/contributors' },
    { name: 'Code of Conduct', href: '/community/code-of-conduct' },
    { name: 'GitHub Discussions', href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions' },
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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Launch announcement banner */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border border-primary-500/30 backdrop-blur-sm">
            <SparklesIcon className="w-5 h-5 text-primary-400 mr-2" />
            <span className="text-primary-300 font-medium">Launching January 1st, 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              A collaborative innovation lab launching in 2026. Join our founding community and help shape 
              the future of open-source collaboration from day one.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 hover:scale-110"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
              Documentation
            </h3>
            <ul className="space-y-4">
              {navigation.docs.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
              Community
            </h3>
            <ul className="space-y-4">
              {navigation.community.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 pt-12 border-t border-gray-700/50">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get notified when OpenLaunch goes live</p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <span>Built with</span>
              <HeartIcon className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by the OpenLaunch founding team</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex space-x-6">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                © 2026 OpenLaunch. Open source, community driven.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}