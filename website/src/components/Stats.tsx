'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    name: 'Contributors',
    value: '1+',
    description: 'Growing community of developers and creators',
  },
  {
    name: 'GitHub Stars',
    value: '0+',
    description: 'Star us on GitHub to show your support!',
  },
  {
    name: 'Days Active',
    value: '0+',
    description: 'Just launched - be part of our founding community',
  },
  {
    name: 'Lines of Code',
    value: '1K+',
    description: 'Foundation built, ready for contributions',
  },
]

export function Stats() {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Just Getting Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OpenLaunch is launching in 2026! Be part of our founding community and help 
              shape the future of collaborative software development from day one.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {stat.name}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Coding Party 2026 Timeline
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">Q1</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Foundation</h4>
                <p className="text-gray-600 text-sm">
                  Community building, infrastructure setup, and first project launches
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary-600">Q2</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Growth</h4>
                <p className="text-gray-600 text-sm">
                  Scaling participation, mentorship programs, and external partnerships
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">Q3</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Maturity</h4>
                <p className="text-gray-600 text-sm">
                  Flagship product launches, industry recognition, and sustainability
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}