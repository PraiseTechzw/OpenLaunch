import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roadmap - OpenLaunch Documentation',
  description: 'Project timeline and milestones for OpenLaunch',
}

export default function RoadmapPage() {
  return (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">OpenLaunch Roadmap 2026</h1>
        
        <div className="space-y-12">
          {/* Q1 2026 */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                Q1
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Foundation Phase</h2>
            </div>
            <div className="ml-16 space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <h3 className="font-semibold text-primary-800">Community Building</h3>
                <ul className="mt-2 text-primary-700 space-y-1">
                  <li>• Launch community Discord server</li>
                  <li>• Establish contribution guidelines</li>
                  <li>• Onboard first 100 contributors</li>
                </ul>
              </div>
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <h3 className="font-semibold text-primary-800">Infrastructure</h3>
                <ul className="mt-2 text-primary-700 space-y-1">
                  <li>• Set up CI/CD pipelines</li>
                  <li>• Establish development workflows</li>
                  <li>• Create project documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q2 2026 */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                Q2
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Growth Phase</h2>
            </div>
            <div className="ml-16 space-y-4">
              <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                <h3 className="font-semibold text-secondary-800">Scale Community</h3>
                <ul className="mt-2 text-secondary-700 space-y-1">
                  <li>• Reach 500+ active contributors</li>
                  <li>• Launch mentorship program</li>
                  <li>• Host first virtual meetup</li>
                </ul>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                <h3 className="font-semibold text-secondary-800">Partnerships</h3>
                <ul className="mt-2 text-secondary-700 space-y-1">
                  <li>• Partner with educational institutions</li>
                  <li>• Collaborate with other open source projects</li>
                  <li>• Establish industry connections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q3 2026 */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                Q3
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Launch Phase</h2>
            </div>
            <div className="ml-16 space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800">Product Releases</h3>
                <ul className="mt-2 text-green-700 space-y-1">
                  <li>• Launch flagship applications</li>
                  <li>• Release developer tools</li>
                  <li>• Publish case studies</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800">Recognition</h3>
                <ul className="mt-2 text-green-700 space-y-1">
                  <li>• Achieve industry recognition</li>
                  <li>• Present at major conferences</li>
                  <li>• Establish sustainable funding</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q4 2026 */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                Q4
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Sustainability Phase</h2>
            </div>
            <div className="ml-16 space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800">Long-term Vision</h3>
                <ul className="mt-2 text-purple-700 space-y-1">
                  <li>• Plan 2027 roadmap</li>
                  <li>• Establish governance model</li>
                  <li>• Create succession planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Get Involved</h3>
          <p className="text-gray-700 mb-4">
            This roadmap is a living document that evolves with our community. Your input and contributions 
            help shape our direction and priorities.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/contributing" 
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Contributing
            </a>
            <a 
              href="https://github.com/PraiseTechzw/OpenLaunch/discussions" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
            >
              Join Discussions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}