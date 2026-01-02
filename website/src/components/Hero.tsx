'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CodeBracketIcon, UsersIcon, RocketLaunchIcon, SparklesIcon, FireIcon, BoltIcon, StarIcon } from '@heroicons/react/24/outline'
import { Flame, Zap, Star, Rocket, Users, Code, Lock, GraduationCap, Globe, Lightbulb, Heart, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced multi-layer background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 to-secondary-900/30" />
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
              i % 3 === 1 ? 'w-2 h-2 bg-gradient-to-r from-secondary-400 to-accent-400' :
              'w-3 h-3 bg-gradient-to-r from-accent-400 to-purple-400'
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
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-gray-600/50 mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Flame className="w-5 h-5 text-accent-500 mr-3" />
              </motion.div>
              <span className="text-sm font-semibold text-gray-300">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Now Live - Launched January 1st, 2026!
              </span>
              <motion.div 
                className="ml-3 w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to{' '}
              <span className="relative inline-block">
                <motion.span 
                  className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent animate-shimmer"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  OpenLaunch
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 opacity-20 blur-2xl"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Floating sparkles around the title */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 80}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </span>
            </motion.h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              A collaborative innovation lab where developers, designers, and creators
            </p>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              are building the future of{' '}
              <span className="font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 hover:from-primary-600 hover:via-accent-600 hover:to-secondary-600 text-white shadow-2xl hover:shadow-3xl btn-glow btn-magnetic relative overflow-hidden group px-8 py-4">
                <Link href="/docs/onboarding" className="relative flex items-center">
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg" className="border-2 border-gray-600 hover:border-primary-400 hover:bg-gray-800 shadow-xl hover:shadow-2xl btn-magnetic glass-card relative overflow-hidden group px-8 py-4 text-gray-300 hover:text-white">
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center"
                >
                  <span className="relative z-10 flex items-center">
                    <motion.svg 
                      className="w-5 h-5 mr-2" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </motion.svg>
                    View on GitHub
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="ml-2 h-4 w-4" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </motion.div>
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
                icon: Lock,
                title: "Open by Default",
                description: "Transparent development from day one. Every decision made in the open with community input.",
                gradient: "from-primary-500 to-secondary-500",
                iconSymbol: Lock
              },
              {
                icon: GraduationCap,
                title: "Beginner Friendly",
                description: "New to open source? Perfect! We provide mentorship and clear paths for first-time contributors.",
                gradient: "from-purple-500 to-accent-500",
                iconSymbol: GraduationCap
              },
              {
                icon: Rocket,
                title: "Real Projects",
                description: "Build production software that matters, not just tutorials or toy projects.",
                gradient: "from-primary-500 to-accent-500",
                iconSymbol: Rocket
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                className="group relative p-8 glass-card rounded-3xl shadow-2xl hover:shadow-3xl card-3d card-glow cursor-pointer bg-gray-800/50 border border-gray-700/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/90 to-gray-800/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 6,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-8 w-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <motion.div 
                      className="text-2xl text-primary-400"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      <feature.iconSymbol className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`} />
                
                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary-400 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [-5, 5, -5],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-700/50"
          >
            <p className="text-sm text-gray-400 mb-4">Building the future of collaborative development - Now Live!</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-primary-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <Lock className="w-4 h-4 text-primary-500 mr-1" />
                <span className="text-sm font-medium text-gray-300">Open Source</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-secondary-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <Users className="w-4 h-4 text-secondary-500 mr-1" />
                <span className="text-sm font-medium text-gray-300">Community Driven</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-accent-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
                <Zap className="w-4 h-4 text-accent-500 mr-1" />
                <span className="text-sm font-medium text-gray-300">Production Ready</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}