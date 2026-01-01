'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

const actions = [
  {
    title: 'Start Contributing',
    description: 'Jump into our projects and make your first contribution today',
    href: '/docs/getting-started',
    icon: ArrowRightIcon,
    primary: true,
  },
  {
    title: 'Join Discussions',
    description: 'Connect with the community and share your ideas',
    href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
    icon: ChatBubbleLeftRightIcon,
    external: true,
  },
  {
    title: 'Read the Docs',
    description: 'Explore our comprehensive documentation and guides',
    href: '/docs',
    icon: DocumentTextIcon,
  },
  {
    title: 'Attend Events',
    description: 'Join our regular community events and workshops',
    href: '/events',
    icon: CalendarDaysIcon,
  },
]

export function CallToAction() {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-br from-primary-600 to-secondary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Join the Party?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Become part of a global community that's building the future of collaborative software development. 
              Your journey starts here.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {action.external ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                    action.primary
                      ? 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    action.primary ? 'bg-primary-100' : 'bg-white/20'
                  }`}>
                    <action.icon className={`h-6 w-6 ${
                      action.primary ? 'text-primary-600' : 'text-white'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className={`text-sm ${
                    action.primary ? 'text-gray-600' : 'text-blue-100'
                  }`}>
                    {action.description}
                  </p>
                </a>
              ) : (
                <Link
                  href={action.href}
                  className={`block p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                    action.primary
                      ? 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    action.primary ? 'bg-primary-100' : 'bg-white/20'
                  }`}>
                    <action.icon className={`h-6 w-6 ${
                      action.primary ? 'text-primary-600' : 'text-white'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className={`text-sm ${
                    action.primary ? 'text-gray-600' : 'text-blue-100'
                  }`}>
                    {action.description}
                  </p>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-blue-100">
              Get the latest updates on Coding Party 2026 and community news delivered to your inbox.
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-blue-100 mb-4">
            Trusted by developers from leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Company logos would go here */}
            <div className="text-white font-semibold">Google</div>
            <div className="text-white font-semibold">Microsoft</div>
            <div className="text-white font-semibold">Meta</div>
            <div className="text-white font-semibold">Netflix</div>
            <div className="text-white font-semibold">Spotify</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}