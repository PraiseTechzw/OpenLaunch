import Link from 'next/link'
import { 
  CodeBracketIcon,
  DocumentTextIcon,
  BugAntIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const contributionSteps = [
  {
    step: 1,
    title: 'Explore & Understand',
    description: 'Read our documentation, explore the codebase, and understand our vision and goals.',
    actions: [
      'Read the Vision document',
      'Check out the Roadmap',
      'Browse the Architecture overview',
      'Join GitHub Discussions'
    ]
  },
  {
    step: 2,
    title: 'Find Your Area',
    description: 'Choose an area that matches your skills and interests. We welcome all types of contributions.',
    actions: [
      'Browse open issues',
      'Check "good first issue" labels',
      'Ask questions in discussions',
      'Join community events'
    ]
  },
  {
    step: 3,
    title: 'Set Up Development',
    description: 'Fork the repository, set up your development environment, and create your feature branch.',
    actions: [
      'Fork the repository',
      'Clone your fork locally',
      'Run the setup script',
      'Create a feature branch'
    ]
  },
  {
    step: 4,
    title: 'Make Your Contribution',
    description: 'Write code, documentation, or design assets. Follow our guidelines and best practices.',
    actions: [
      'Follow coding standards',
      'Write clear commit messages',
      'Add tests if applicable',
      'Update documentation'
    ]
  },
  {
    step: 5,
    title: 'Submit & Collaborate',
    description: 'Create a pull request, engage with reviewers, and iterate based on feedback.',
    actions: [
      'Create a pull request',
      'Describe your changes clearly',
      'Respond to review feedback',
      'Celebrate your contribution!'
    ]
  }
]

const contributionTypes = [
  {
    title: 'Code Contributions',
    description: 'Fix bugs, add features, improve performance, or enhance existing functionality.',
    icon: CodeBracketIcon,
    examples: [
      'Frontend components and pages',
      'Backend APIs and services',
      'AI integrations and features',
      'DevOps and infrastructure'
    ],
    color: 'bg-blue-500'
  },
  {
    title: 'Documentation',
    description: 'Help others understand and use OpenLaunch through clear, comprehensive documentation.',
    icon: DocumentTextIcon,
    examples: [
      'API documentation',
      'Tutorial guides',
      'Code comments',
      'README improvements'
    ],
    color: 'bg-green-500'
  },
  {
    title: 'Bug Reports',
    description: 'Help us identify and fix issues by reporting bugs with detailed information.',
    icon: BugAntIcon,
    examples: [
      'Reproducible bug reports',
      'Performance issues',
      'Security vulnerabilities',
      'Accessibility problems'
    ],
    color: 'bg-red-500'
  },
  {
    title: 'Feature Ideas',
    description: 'Propose new features, improvements, or innovative solutions to existing problems.',
    icon: LightBulbIcon,
    examples: [
      'New application ideas',
      'UX improvements',
      'Integration suggestions',
      'Workflow enhancements'
    ],
    color: 'bg-yellow-500'
  },
  {
    title: 'Community Support',
    description: 'Help other contributors by answering questions and providing guidance.',
    icon: ChatBubbleLeftRightIcon,
    examples: [
      'Answer questions in discussions',
      'Help with onboarding',
      'Code review participation',
      'Mentoring newcomers'
    ],
    color: 'bg-purple-500'
  },
  {
    title: 'Design & UX',
    description: 'Improve user experience through thoughtful design and accessibility enhancements.',
    icon: HeartIcon,
    examples: [
      'UI/UX design',
      'Accessibility improvements',
      'Design system components',
      'User research insights'
    ],
    color: 'bg-pink-500'
  }
]

export default function ContributingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contributing to OpenLaunch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of contributors building the future of open-source collaboration. 
            Every contribution, big or small, makes a difference.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Contribute?
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Start by exploring our codebase and joining the conversation. 
              We're here to help you make your first contribution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CodeBracketIcon className="w-5 h-5 mr-2" />
                View Repository
              </Link>
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Join Discussions
              </Link>
            </div>
          </div>
        </div>

        {/* Contribution Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Ways to Contribute
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contributionTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                    <type.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <ul className="space-y-1">
                  {type.examples.map((example, index) => (
                    <li key={index} className="text-sm text-gray-500 flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Contribution Process
          </h2>
          <div className="space-y-8">
            {contributionSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <ul className="grid gap-2 md:grid-cols-2">
                      {step.actions.map((action, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contribution Guidelines
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Code Standards
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Follow existing code style and conventions
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Write clear, descriptive commit messages
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Include tests for new functionality
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Update documentation as needed
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Community Values
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Be respectful and inclusive
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Help others learn and grow
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Collaborate openly and transparently
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2" />
                  Focus on building real value
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Helpful Resources
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/onboarding"
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 font-medium rounded-lg hover:bg-primary-200 transition-colors"
            >
              Onboarding Guide
            </Link>
            <Link
              href="/docs/architecture"
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 font-medium rounded-lg hover:bg-primary-200 transition-colors"
            >
              Architecture Docs
            </Link>
            <Link
              href="/community/code-of-conduct"
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 font-medium rounded-lg hover:bg-primary-200 transition-colors"
            >
              Code of Conduct
            </Link>
            <Link
              href="https://github.com/PraiseTechzw/OpenLaunch/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 font-medium rounded-lg hover:bg-primary-200 transition-colors"
            >
              Good First Issues
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}