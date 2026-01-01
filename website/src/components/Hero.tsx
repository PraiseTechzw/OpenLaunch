'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CodeBracketIcon, UsersIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced multi-layer background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-50/30 to-secondary-50/30" />
        <div className="gradient-mesh absolute inset-0" />
      </div>
      
      {/* Animated morphing background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-orb animate-morphing animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-orb animate-morphing animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-orb animate-morphing animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced floating particles with different sizes */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-20 ${
              i % 3 === 0 ? 'w-1 h-1 bg-primary-400' :
              i % 3 === 1 ? 'w-2 h-2 bg-gradient-to-r from-secondary-400 to-purple-400' :
              'w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced launch badge with glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-100/80 to-secondary-100/80 border border-primary-200/50 mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <SparklesIcon className="w-5 h-5 text-primary-600 mr-3 group-hover:animate-pulse" />
              <span className="text-sm font-semibold text-primary-700">Launching January 1st, 2026</span>
              <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent animate-shimmer">
                  OpenLaunch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 opacity-20 blur-2xl animate-pulse" />
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
              A collaborative innovation lab where developers, designers, and creators
            </p>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              build the future of{' '}
              <span className="font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                open-source collaboration
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 hover:from-primary-700 hover:via-purple-700 hover:to-secondary-700 text-white shadow-2xl hover:shadow-3xl btn-glow btn-magnetic relative overflow-hidden group px-8 py-4">
              <Link href="/docs/onboarding" className="relative flex items-center">
                <span className="relative z-10 flex items-center">
                  Join the Launch
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 hover:border-primary-300 hover:bg-primary-50 shadow-xl hover:shadow-2xl btn-magnetic glass-card relative overflow-hidden group px-8 py-4">
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>

          {/* Enhanced feature highlights with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: CodeBracketIcon,
                title: "Open by Default",
                description: "Transparent development from day one. Every decision made in the open with community input.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: UsersIcon,
                title: "Beginner Friendly",
                description: "New to open source? Perfect! We provide mentorship and clear paths for first-time contributors.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: RocketLaunchIcon,
                title: "Real Projects",
                description: "Build production software that matters, not just tutorials or toy projects.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="group relative p-8 glass-card rounded-3xl shadow-2xl hover:shadow-3xl card-3d card-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
                    <feature.icon className="h-8 w-8 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-200/50"
          >
            <p className="text-sm text-gray-500 mb-4">Building the future of collaborative development</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-600">Open Source</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-sm font-medium text-gray-600">Community Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-sm font-medium text-gray-600">Production Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}