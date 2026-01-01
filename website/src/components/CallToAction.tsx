'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, CodeBracketIcon, HeartIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export function CallToAction() {
  return (
    <div className="py-16 sm:py-24 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-purple-900 to-secondary-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <RocketLaunchIcon className="w-4 h-4 mr-2 text-white" />
            <span className="text-sm font-medium text-white">Ready to Launch?</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8">
            Be Part of the{' '}
            <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            OpenLaunch 2026 is launching soon! Join our community of innovators, 
            contribute to groundbreaking projects, and help shape the future of 
            collaborative software development.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-primary-900 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <CodeBracketIcon className="w-6 h-6 mr-3 relative z-10" />
                <span className="relative z-10">Star on GitHub</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contributing"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-600/80 to-secondary-600/80 hover:from-primary-600 hover:to-secondary-600 border border-white/20 backdrop-blur-sm transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <HeartIcon className="w-6 h-6 mr-3 relative z-10" />
                <span className="relative z-10">Start Contributing</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </Link>
            </motion.div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Open Source',
                description: 'Built by the community, for the community',
                icon: CodeBracketIcon,
              },
              {
                title: 'Collaborative',
                description: 'Work together on amazing projects',
                icon: HeartIcon,
              },
              {
                title: 'Innovative',
                description: 'Push the boundaries of what\'s possible',
                icon: RocketLaunchIcon,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-card p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  <div className="relative z-10 text-center">
                    <feature.icon className="w-8 h-8 text-primary-300 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-200 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}