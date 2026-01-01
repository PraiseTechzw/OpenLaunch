import Link from 'next/link'
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  HeartIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline'

const communityLinks = [
  {
    name: 'GitHub Discussions',
    description: 'Join conversations, ask questions, and share ideas with the community',
    href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
    icon: ChatBubbleLeftRightIcon,
    external: true,
  },
  {
    name: 'Contributors',
    description: 'Meet the amazing people building OpenLaunch',
    href: '/community/contributors',
    icon: UserGroupIcon,
  },
  {
    name: 'Events',
    description: 'Upcoming community events, coding parties, and meetups',
    href: '/community/events',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Code of Conduct',
    description: 'Our community guidelines and values',
    href: '/community/code-of-conduct',
    icon: HeartIcon,
  },
]

const contributionAreas = [
  {
    title: 'Frontend Development',
    description: 'Build user interfaces with React, Next.js, and modern web technologies',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    color: 'bg-blue-500',
  },
  {
    title: 'Backend Development',
    description: 'Create APIs, services, and data management solutions',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    color: 'bg-green-500',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Integrate AI capabilities and build intelligent features',
    skills: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain'],
    color: 'bg-purple-500',
  },
  {
    title: 'Design & UX',
    description: 'Create beautiful, accessible, and user-friendly experiences',
    skills: ['Figma', 'Design Systems', 'Accessibility', 'User Research'],
    color: 'bg-pink-500',
  },
  {
    title: 'Documentation',
    description: 'Help others learn and contribute through clear documentation',
    skills: ['Technical Writing', 'Markdown', 'Tutorials', 'API Docs'],
    color: 'bg-yellow-500',
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Build and maintain development and deployment infrastructure',
    skills: ['Docker', 'CI/CD', 'AWS', 'Monitoring'],
    color: 'bg-indigo-500',
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with developers, designers, and creators from around the world. 
            Together, we're building the future of open-source collaboration.
          </p>
        </div>

        {/* Community Links */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {communityLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <link.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="ml-3 font-semibold text-gray-900 group-hover:text-primary-700">
                  {link.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {link.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Contribution Areas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ways to Contribute
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a beginner or an expert, there's a place for you in our community. 
              Find your area of interest and start contributing today.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contributionAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 ${area.color} rounded-full mr-3`} />
                  <h3 className="font-semibold text-gray-900">
                    {area.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join thousands of contributors building amazing open-source projects. 
              Start with our onboarding guide and make your first contribution today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/onboarding"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Read Onboarding Guide
              </Link>
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                <CodeBracketIcon className="w-5 h-5 mr-2" />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}