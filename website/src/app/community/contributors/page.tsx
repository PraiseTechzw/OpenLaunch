import Link from 'next/link'
import { 
  UserGroupIcon,
  StarIcon,
  CodeBracketIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const coreTeam = [
  {
    name: 'OpenLaunch Community',
    role: 'Core Maintainers',
    avatar: '/avatars/community.png',
    contributions: 'Project leadership, architecture, and community building',
    github: 'https://github.com/PraiseTechzw/OpenLaunch',
    specialties: ['Leadership', 'Architecture', 'Community']
  }
]

const topContributors = [
  {
    name: 'Join Us!',
    role: 'Future Contributor',
    avatar: '/avatars/placeholder.png',
    contributions: 'Be the first to contribute to OpenLaunch',
    github: '#',
    specialties: ['Your Skills Here']
  }
]

const contributionStats = [
  { label: 'Total Contributors', value: '1+', description: 'Founding team ready' },
  { label: 'Countries Represented', value: '1+', description: 'Starting global' },
  { label: 'Lines of Code', value: '1K+', description: 'Foundation built' },
  { label: 'Community Members', value: '0+', description: 'Join us today!' }
]

const recognitionCategories = [
  {
    title: 'Code Champions',
    description: 'Contributors who have made significant code contributions',
    icon: CodeBracketIcon,
    color: 'bg-blue-500',
    contributors: ['Be the first!']
  },
  {
    title: 'Documentation Heroes',
    description: 'Contributors who have improved our documentation',
    icon: StarIcon,
    color: 'bg-green-500',
    contributors: ['Be the first!']
  },
  {
    title: 'Community Builders',
    description: 'Contributors who have helped grow and support our community',
    icon: UserGroupIcon,
    color: 'bg-purple-500',
    contributors: ['Be the first!']
  },
  {
    title: 'Design Innovators',
    description: 'Contributors who have enhanced our user experience',
    icon: HeartIcon,
    color: 'bg-pink-500',
    contributors: ['Be the first!']
  }
]

export default function ContributorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Amazing Contributors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the incredible people who are building OpenLaunch together. 
            Every contribution, no matter the size, helps make our community stronger.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {contributionStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Core Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Core Team
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coreTeam.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">OL</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {member.contributions}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <Link
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <CodeBracketIcon className="w-4 h-4 mr-1" />
                  GitHub
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Top Contributors
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topContributors.map((contributor) => (
              <div
                key={contributor.name}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserGroupIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {contributor.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {contributor.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {contributor.contributions}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {contributor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Contributor Recognition
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {recognitionCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.contributors.map((contributor, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-xs">?</span>
                      </div>
                      <span className="text-gray-600 italic">{contributor}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want to See Your Name Here?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join our growing community of contributors! Whether you're fixing bugs, 
            writing documentation, or building new features, every contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contributing"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Contributing
            </Link>
            <Link
              href="https://github.com/PraiseTechzw/OpenLaunch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              View Repository
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}