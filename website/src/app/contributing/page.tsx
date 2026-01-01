import { Metadata } from 'next'
import Link from 'next/link'
import { CodeBracketIcon, HeartIcon, LightBulbIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Contributing - OpenLaunch',
  description: 'Learn how to contribute to the OpenLaunch project',
}

export default function ContributingPage() {
  const contributionTypes = [
    {
      title: 'Code Contributions',
      description: 'Help build features, fix bugs, and improve performance',
      icon: CodeBracketIcon,
      color: 'primary',
      items: [
        'Frontend development (React/Next.js)',
        'Backend development (Node.js)',
        'Bug fixes and optimizations',
        'Testing and quality assurance'
      ]
    },
    {
      title: 'Documentation',
      description: 'Improve guides, tutorials, and API documentation',
      icon: DocumentTextIcon,
      color: 'secondary',
      items: [
        'Writing and updating guides',
        'API documentation',
        'Tutorial creation',
        'Translation and localization'
      ]
    },
    {
      title: 'Design & UX',
      description: 'Create beautiful and intuitive user experiences',
      icon: LightBulbIcon,
      color: 'green',
      items: [
        'UI/UX design',
        'Accessibility improvements',
        'Design system development',
        'User research and testing'
      ]
    },
    {
      title: 'Community',
      description: 'Help grow and support our amazing community',
      icon: HeartIcon,
      color: 'purple',
      items: [
        'Community moderation',
        'Event organization',
        'Mentoring new contributors',
        'Social media and outreach'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
            <HeartIcon className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Join Our Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Start{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Contributing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            OpenLaunch thrives because of contributors like you. Whether you're a seasoned developer 
            or just starting out, there are many ways to make a meaningful impact.
          </p>
        </div>

        {/* Contribution Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contributionTypes.map((type, index) => (
            <div key={type.title} className="glass-card p-8 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br from-${type.color}-50/30 to-${type.color}-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {type.title}
                </h3>
                
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {type.description}
                </p>
                
                <ul className="space-y-2">
                  {type.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      <div className={`w-2 h-2 bg-${type.color}-500 rounded-full mr-3 flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Getting Started Steps */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Get Started
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Read the Docs',
                description: 'Familiarize yourself with our project and guidelines',
                link: '/docs/onboarding'
              },
              {
                step: '2',
                title: 'Join Discord',
                description: 'Connect with our community and ask questions',
                link: '/community/discord'
              },
              {
                step: '3',
                title: 'Find an Issue',
                description: 'Browse good first issues on GitHub',
                link: 'https://github.com/PraiseTechzw/OpenLaunch/labels/good%20first%20issue'
              },
              {
                step: '4',
                title: 'Submit PR',
                description: 'Make your changes and submit a pull request',
                link: 'https://github.com/PraiseTechzw/OpenLaunch'
              }
            ].map((step, index) => (
              <div key={step.step} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {step.description}
                </p>
                <Link
                  href={step.link}
                  target={step.link.startsWith('http') ? '_blank' : undefined}
                  rel={step.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 rounded-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Make an Impact?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of contributors who are building the future of collaborative 
                software development. Your contribution, no matter how small, makes a difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <CodeBracketIcon className="w-6 h-6 mr-3" />
                  View on GitHub
                </Link>
                <Link
                  href="/docs/onboarding"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 border border-primary-200/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <DocumentTextIcon className="w-6 h-6 mr-3" />
                  Getting Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}