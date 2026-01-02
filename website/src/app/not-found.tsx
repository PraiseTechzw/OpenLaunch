import Link from 'next/link'
import { 
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Icon with Discord styling */}
        <div className="mb-8">
          <div 
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 animate-discord-glow"
            style={{ 
              background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`
            }}
          >
            <ExclamationTriangleIcon className="w-12 h-12 text-white" />
          </div>
          <h1 
            className="text-6xl font-bold mb-4 animate-fade-in-up"
            style={{ color: discordColors.text.primary }}
          >
            404
          </h1>
          <h2 
            className="text-2xl font-semibold mb-2"
            style={{ color: discordColors.text.primary }}
          >
            Page Not Found
          </h2>
          <p 
            className="mb-8"
            style={{ color: discordColors.text.secondary }}
          >
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Quick Links with Discord styling */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8 stagger-scale-in">
          <Link
            href="/"
            className="group rounded-discord-xl shadow-discord-elevation-low p-6 transition-all duration-200 discord-hover-lift discord-hover-glow border"
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
          >
            <HomeIcon 
              className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform"
              style={{ color: discordColors.brand.primary }}
            />
            <h3 
              className="font-semibold mb-1"
              style={{ color: discordColors.text.primary }}
            >
              Home
            </h3>
            <p 
              className="text-sm"
              style={{ color: discordColors.text.secondary }}
            >
              Return to homepage
            </p>
          </Link>

          <Link
            href="/docs"
            className="group rounded-discord-xl shadow-discord-elevation-low p-6 transition-all duration-200 discord-hover-lift discord-hover-glow border"
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
          >
            <DocumentTextIcon 
              className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform"
              style={{ color: discordColors.brand.primary }}
            />
            <h3 
              className="font-semibold mb-1"
              style={{ color: discordColors.text.primary }}
            >
              Documentation
            </h3>
            <p 
              className="text-sm"
              style={{ color: discordColors.text.secondary }}
            >
              Browse our docs
            </p>
          </Link>

          <Link
            href="/community"
            className="group rounded-discord-xl shadow-discord-elevation-low p-6 transition-all duration-200 discord-hover-lift discord-hover-glow border"
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
          >
            <UserGroupIcon 
              className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform"
              style={{ color: discordColors.brand.primary }}
            />
            <h3 
              className="font-semibold mb-1"
              style={{ color: discordColors.text.primary }}
            >
              Community
            </h3>
            <p 
              className="text-sm"
              style={{ color: discordColors.text.secondary }}
            >
              Join our community
            </p>
          </Link>
        </div>

        {/* Search Suggestion with Discord styling */}
        <div 
          className="rounded-discord-xl shadow-discord-elevation-low p-6 mb-8 border animate-fade-in-up"
          style={{
            backgroundColor: discordColors.background.secondary,
            borderColor: discordColors.interactive.normal,
          }}
        >
          <h3 
            className="font-semibold mb-3"
            style={{ color: discordColors.text.primary }}
          >
            Looking for something specific?
          </h3>
          <p 
            className="mb-4"
            style={{ color: discordColors.text.secondary }}
          >
            Try searching our documentation or browse our popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: '/docs/vision', label: 'Vision' },
              { href: '/docs/onboarding', label: 'Getting Started' },
              { href: '/contributing', label: 'Contributing' },
              { href: '/events', label: 'Events' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1 text-sm rounded-discord transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: `${discordColors.brand.primary}20`,
                  color: discordColors.brand.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${discordColors.brand.primary}30`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${discordColors.brand.primary}20`
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action with Discord styling */}
        <div 
          className="rounded-discord-xl p-6 text-white animate-fade-in-up"
          style={{
            background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`
          }}
        >
          <h3 className="text-lg font-semibold mb-2">
            Still can't find what you're looking for?
          </h3>
          <p className="mb-4 opacity-90">
            Join our community discussions and ask for help. We're here to support you!
          </p>
          <Link
            href="https://github.com/PraiseTechzw/OpenLaunch/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white font-semibold rounded-discord transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-discord-brand-primary"
            style={{ 
              color: discordColors.brand.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }}
          >
            Get Help
          </Link>
        </div>
      </div>
    </div>
  )
}