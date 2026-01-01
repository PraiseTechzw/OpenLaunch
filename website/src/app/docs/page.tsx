import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const documentationSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    links: [
      { name: 'Vision & Mission', href: '/docs/vision', description: 'Understand our philosophy and goals' },
      { name: 'Onboarding Guide', href: '/docs/onboarding', description: 'Step-by-step guide for new contributors' },
      { name: 'Architecture Overview', href: '/docs/architecture', description: 'Technical architecture and design decisions' },
    ]
  },
  {
    title: 'Development',
    description: 'Technical guides and best practices',
    links: [
      { name: 'Roadmap', href: '/docs/roadmap', description: 'Current and future development plans' },
      { name: 'Contributing', href: '/docs/contributing', description: 'How to contribute to the project' },
      { name: 'Governance', href: '/docs/governance', description: 'Project governance and decision making' },
    ]
  },
  {
    title: 'Design',
    description: 'Design system and UI guidelines',
    links: [
      { name: 'Design Principles', href: '/docs/design-principles', description: 'Core design philosophy and principles' },
      { name: 'UI System', href: '/docs/ui-system', description: 'Component library and design tokens' },
    ]
  }
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about OpenLaunch, from getting started to advanced development topics.
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="grid gap-8 md:gap-12">
          {documentationSections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600">
                  {section.description}
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-700">
                        {link.name}
                      </h3>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-primary-600">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Contribute?
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join our community of developers, designers, and creators building the future of open-source collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/community"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Join Community
              </Link>
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}