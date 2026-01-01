'use client'

import { motion } from 'framer-motion'
import { 
  CodeBracketIcon, 
  UsersIcon, 
  AcademicCapIcon, 
  GlobeAltIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Open Source Excellence',
    description: 'All our projects are open source with comprehensive documentation, clear contribution guidelines, and transparent development processes.',
    icon: CodeBracketIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Inclusive Community',
    description: 'We welcome contributors of all skill levels, backgrounds, and experiences. Everyone has something valuable to contribute.',
    icon: UsersIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Learning-Focused',
    description: 'Every interaction is an opportunity to learn and grow. We provide mentorship, workshops, and educational resources.',
    icon: AcademicCapIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Global Collaboration',
    description: 'Connect with developers, designers, and creators from around the world. Build relationships that last beyond projects.',
    icon: GlobeAltIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    name: 'Innovation Lab',
    description: 'Experiment with new technologies, explore creative solutions, and push the boundaries of what\'s possible.',
    icon: LightBulbIcon,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    name: 'Community Impact',
    description: 'Build software that makes a real difference in people\'s lives and contributes to the greater good.',
    icon: HeartIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
]

export function Features() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Join the Party?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OpenLaunch is more than just another open source project. We're building a movement 
              that transforms how software is created through collaboration, learning, and community.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who are already building the future of collaborative software development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs/getting-started"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Start Contributing
              </a>
              <a
                href="/community"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Join Community
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}