'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Flame, Zap, Star, Rocket, Users, Lock, GraduationCap, CheckCircle } from 'lucide-react'
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
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-orb animate-discord-pulse animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-orb animate-discord-pulse animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-orb animate-discord-pulse animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced floating particles with different sizes */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 animate-discord-pulse ${
              i % 3 === 0 ? 'w-1 h-1 bg-primary-400' :
              i % 3 === 1 ? 'w-2 h-2 bg-gradient-to-r from-secondary-400 to-accent-400' :
              'w-3 h-3 bg-gradient-to-r from-accent-400 to-purple-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center stagger-fade-in">
          <div className="animate-fade-in-up">
            {/* Enhanced launch badge with glow effect */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-gray-600/50 mb-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group animate-scale-in">
              <div className="animate-spin">
                <Flame className="w-5 h-5 text-accent-500 mr-3" />
              </div>
              <span className="text-sm font-semibold text-gray-300">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Now Live - Launched January 1st, 2026!
              </span>
              <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-discord-pulse" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent animate-shimmer">
                  OpenLaunch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 opacity-20 blur-2xl animate-discord-glow" />
                {/* Floating sparkles around the title */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-accent-400 rounded-full animate-discord-pulse"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 80}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
              A collaborative innovation lab where developers, designers, and creators
            </p>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
              are building the future of{' '}
              <span className="font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                open-source collaboration
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up">
            <div className="discord-hover-scale">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 hover:from-primary-600 hover:via-accent-600 hover:to-secondary-600 text-white shadow-2xl hover:shadow-3xl relative overflow-hidden group px-8 py-4">
                <Link href="/docs/onboarding" className="relative flex items-center">
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started Now
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </div>
            
            <div className="discord-hover-scale">
              <Button asChild variant="secondary" size="lg" className="border-2 border-gray-600 hover:border-primary-400 hover:bg-gray-800 shadow-xl hover:shadow-2xl relative overflow-hidden group px-8 py-4 text-gray-300 hover:text-white">
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center"
                >
                  <span className="relative z-10 flex items-center">
                    <svg 
                      className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                    <Star className="ml-2 h-4 w-4 animate-discord-pulse" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Enhanced feature highlights with glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-scale-in">
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
              <div
                key={feature.title}
                className="group relative p-8 rounded-3xl shadow-2xl hover:shadow-3xl cursor-pointer bg-gray-800/50 border border-gray-700/50 discord-hover-lift discord-hover-glow transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/90 to-gray-800/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-2xl text-primary-400 animate-discord-pulse">
                      <feature.iconSymbol className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`} />
                
                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary-400 rounded-full animate-discord-pulse"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-700/50 animate-fade-in">
            <p className="text-sm text-gray-400 mb-4">Building the future of collaborative development - Now Live!</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2 discord-hover-scale">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-discord-pulse" />
                <Lock className="w-4 h-4 text-primary-500 mr-1" />
                <span className="text-sm font-medium text-gray-300">Open Source</span>
              </div>
              <div className="flex items-center space-x-2 discord-hover-scale">
                <div className="w-2 h-2 bg-secondary-500 rounded-full animate-discord-pulse" style={{ animationDelay: '0.5s' }} />
                <Users className="w-4 h-4 text-secondary-500 mr-1" />
                <span className="text-sm font-medium text-gray-300">Community Driven</span>
              </div>
              <div className="flex items-center space-x-2 discord-hover-scale">
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-discord-pulse" style={{ animationDelay: '1s' }} />
                <Zap className="w-4 h-4 text-accent-500 mr-1" />
                <span className="text-sm font-medium text-gray-300">Production Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}