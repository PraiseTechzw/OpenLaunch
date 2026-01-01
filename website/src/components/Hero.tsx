'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CodeBracketIcon, UsersIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="gradient-text">OpenLaunch</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-4">
              A collaborative innovation lab where developers, designers, and creators
            </p>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              build real-world software in public through our annual{' '}
              <span className="font-semibold text-primary-600">Coding Party</span> initiatives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/PraiseTechzw/OpenLaunch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              View on GitHub
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <CodeBracketIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Open by Default</h3>
              <p className="text-gray-600 text-center">
                Every decision, every line of code, every design choice is transparent and open to the community.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community-First</h3>
              <p className="text-gray-600 text-center">
                Welcoming developers of all skill levels with mentorship, learning opportunities, and collaboration.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <RocketLaunchIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Impact</h3>
              <p className="text-gray-600 text-center">
                Building production-ready software that solves actual problems and makes a difference.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}