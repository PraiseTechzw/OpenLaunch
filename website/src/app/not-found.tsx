import Link from 'next/link'
import { 
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto flex items-center justify-center mb-6">
            <ExclamationTriangleIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Link
            href="/"
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all duration-200"
          >
            <HomeIcon className="w-8 h-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-1">Home</h3>
            <p className="text-sm text-gray-600">Return to homepage</p>
          </Link>

          <Link
            href="/docs"
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all duration-200"
          >
            <DocumentTextIcon className="w-8 h-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-1">Documentation</h3>
            <p className="text-sm text-gray-600">Browse our docs</p>
          </Link>

          <Link
            href="/community"
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all duration-200"
          >
            <UserGroupIcon className="w-8 h-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
            <p className="text-sm text-gray-600">Join our community</p>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">
            Looking for something specific?
          </h3>
          <p className="text-gray-600 mb-4">
            Try searching our documentation or browse our popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/docs/vision"
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-md hover:bg-primary-200 transition-colors"
            >
              Vision
            </Link>
            <Link
              href="/docs/onboarding"
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-md hover:bg-primary-200 transition-colors"
            >
              Getting Started
            </Link>
            <Link
              href="/contributing"
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-md hover:bg-primary-200 transition-colors"
            >
              Contributing
            </Link>
            <Link
              href="/events"
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-md hover:bg-primary-200 transition-colors"
            >
              Events
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">
            Still can't find what you're looking for?
          </h3>
          <p className="text-primary-100 mb-4">
            Join our community discussions and ask for help. We're here to support you!
          </p>
          <Link
            href="https://github.com/PraiseTechzw/OpenLaunch/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get Help
          </Link>
        </div>
      </div>
    </div>
  )
}