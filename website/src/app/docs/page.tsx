'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon, RocketLaunchIcon, CogIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
import { discordColors } from '@/lib/discord-theme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

const documentationSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    links: [
      { name: 'Vision & Mission', href: '/docs/vision', description: 'Understand our philosophy and goals' },
      { name: 'Onboarding Guide', href: '/docs/onboarding', description: 'Step-by-step guide for new contributors' },
      { name: 'Architecture Overview', href: '/docs/architecture', description: 'Technical architecture and design decisions' },
    ]
  },
  {
    title: 'Development',
    description: 'Technical guides and best practices',
    icon: <CogIcon className="w-6 h-6" />,
    links: [
      { name: 'Roadmap', href: '/docs/roadmap', description: 'Current and future development plans' },
      { name: 'Contributing', href: '/contributing', description: 'How to contribute to the project' },
      { name: 'API Reference', href: '/docs/api', description: 'Complete API documentation and examples' },
    ]
  },
  {
    title: 'Design',
    description: 'Design system and UI guidelines',
    icon: <PaintBrushIcon className="w-6 h-6" />,
    links: [
      { name: 'Design Principles', href: '/design/design-principles', description: 'Core design philosophy and principles' },
      { name: 'UI System', href: '/design/ui-system', description: 'Component library and design tokens' },
      { name: 'Discord Theme', href: '/test-discord-design', description: 'Discord-inspired design system showcase' },
    ]
  }
]

const quickLinks = [
  { name: 'Quick Start', href: '/docs/onboarding', description: 'Get up and running in 5 minutes' },
  { name: 'API Docs', href: '/docs/api', description: 'Complete API reference' },
  { name: 'Examples', href: '/docs/examples', description: 'Code examples and tutorials' },
  { name: 'FAQ', href: '/docs/faq', description: 'Frequently asked questions' },
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Keyboard navigation for quick links
  const { containerRef: quickLinksRef } = useKeyboardNavigation({
    orientation: 'both',
    enableArrowKeys: true,
    enableHomeEnd: true,
    wrap: true,
  })

  const filteredSections = documentationSections.map(section => ({
    ...section,
    links: section.links.filter(link => 
      searchQuery === '' || 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.links.length > 0)

  return (
    <div 
      className="min-h-screen py-16"
      style={{ backgroundColor: discordColors.background.primary }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpenIcon 
              className="w-12 h-12 mr-4" 
              style={{ color: discordColors.brand.primary }}
              aria-hidden="true"
            />
            <h1 
              className="text-4xl font-bold"
              style={{ color: discordColors.text.primary }}
            >
              Documentation
            </h1>
          </div>
          <p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{ color: discordColors.text.secondary }}
          >
            Everything you need to know about OpenLaunch, from getting started to advanced development topics.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon 
                className="h-5 w-5" 
                style={{ color: discordColors.text.muted }}
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                backgroundColor: discordColors.background.secondary,
                color: discordColors.text.primary,
                boxShadow: `0 0 0 2px transparent`,
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 2px ${discordColors.brand.primary}40`
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = `0 0 0 2px transparent`
              }}
              aria-label="Search documentation"
            />
          </div>
        </header>

        {/* Quick Links */}
        {searchQuery === '' && (
          <section className="mb-12">
            <h2 
              className="text-lg font-semibold mb-4"
              style={{ color: discordColors.text.primary }}
            >
              Quick Links
            </h2>
            <div 
              ref={quickLinksRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              role="grid"
              aria-label="Quick navigation links"
            >
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group p-4 rounded-lg border transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: discordColors.background.secondary,
                    borderColor: discordColors.interactive.normal,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = discordColors.background.elevated
                    e.currentTarget.style.borderColor = discordColors.brand.primary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = discordColors.background.secondary
                    e.currentTarget.style.borderColor = discordColors.interactive.normal
                  }}
                  aria-describedby={`${link.name.toLowerCase().replace(/\s+/g, '-')}-desc`}
                >
                  <h3 
                    className="font-medium mb-1 group-hover:text-discord-brand-primary transition-colors"
                    style={{ color: discordColors.text.primary }}
                  >
                    {link.name}
                  </h3>
                  <p 
                    id={`${link.name.toLowerCase().replace(/\s+/g, '-')}-desc`}
                    className="text-xs"
                    style={{ color: discordColors.text.muted }}
                  >
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Documentation Sections */}
        <main className="grid gap-8 md:gap-12">
          {filteredSections.map((section) => (
            <Card key={section.title} variant="elevated" className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    style={{ 
                      backgroundColor: `${discordColors.brand.primary}20`,
                      color: discordColors.brand.primary 
                    }}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </div>
                  <CardTitle 
                    as="h2"
                    className="text-2xl"
                    style={{ color: discordColors.text.primary }}
                  >
                    {section.title}
                  </CardTitle>
                </div>
                <CardDescription style={{ color: discordColors.text.secondary }}>
                  {section.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <nav className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label={`${section.title} navigation`}>
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group p-4 rounded-lg border transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2"
                      style={{
                        backgroundColor: discordColors.background.primary,
                        borderColor: discordColors.interactive.normal,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = discordColors.background.modifier.hover
                        e.currentTarget.style.borderColor = discordColors.brand.primary
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = discordColors.background.primary
                        e.currentTarget.style.borderColor = discordColors.interactive.normal
                      }}
                      aria-describedby={`${link.name.toLowerCase().replace(/\s+/g, '-')}-section-desc`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 
                          className="font-semibold group-hover:text-discord-brand-primary transition-colors"
                          style={{ color: discordColors.text.primary }}
                        >
                          {link.name}
                        </h3>
                        <ChevronRightIcon 
                          className="w-4 h-4 group-hover:text-discord-brand-primary transition-colors" 
                          style={{ color: discordColors.text.muted }}
                          aria-hidden="true"
                        />
                      </div>
                      <p 
                        id={`${link.name.toLowerCase().replace(/\s+/g, '-')}-section-desc`}
                        className="text-sm"
                        style={{ color: discordColors.text.secondary }}
                      >
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          ))}
        </main>

        {/* Call to Action */}
        <Card 
          variant="elevated" 
          className="mt-16 p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`,
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: discordColors.text.primary }}
          >
            Ready to Contribute?
          </h2>
          <p 
            className="mb-6 max-w-2xl mx-auto"
            style={{ color: `${discordColors.text.primary}cc` }}
          >
            Join our community of developers, designers, and creators building the future of open-source collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="secondary"
              className="font-semibold"
              style={{
                backgroundColor: discordColors.text.primary,
                color: discordColors.brand.primary,
              }}
            >
              <Link href="/community">
                Join Community
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="font-semibold border-2"
              style={{
                borderColor: discordColors.text.primary,
                color: discordColors.text.primary,
              }}
            >
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </Card>

        {/* Search Results Message */}
        {searchQuery !== '' && filteredSections.length === 0 && (
          <div className="text-center py-12">
            <p 
              className="text-lg mb-4"
              style={{ color: discordColors.text.secondary }}
            >
              No documentation found for "{searchQuery}"
            </p>
            <Button
              variant="ghost"
              onClick={() => setSearchQuery('')}
              style={{ color: discordColors.brand.primary }}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}