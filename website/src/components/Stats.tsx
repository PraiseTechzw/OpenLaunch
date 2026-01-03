'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { getRepoStats, fallbackStats } from '@/lib/github'

interface StatsData {
  stars: number
  forks: number
  contributors: number
  commits: number
  issues: number
}

export function Stats() {
  const [stats, setStats] = useState<StatsData>(fallbackStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const repoStats = await getRepoStats()
        setStats(repoStats)
      } catch (error) {
        console.warn('Failed to fetch GitHub stats, using fallback data:', error)
        setStats(fallbackStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statsDisplay = [
    {
      name: 'Apps Built',
      value: '1',
      description: 'Versify - our first community success story!',
      highlight: true,
    },
    {
      name: 'Contributors',
      value: loading ? '...' : `${stats.contributors}+`,
      description: 'Growing community of developers and creators',
    },
    {
      name: 'GitHub Stars',
      value: loading ? '...' : `${stats.stars}+`,
      description: 'Star us on GitHub to show your support!',
    },
    {
      name: 'Active Users',
      value: '100+',
      description: 'People using Versify and loving it!',
      highlight: true,
    },
  ]

  return (
    <div className="py-16 sm:py-24 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50" />
      <div className="gradient-mesh absolute inset-0 opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
              <span className="text-sm font-medium text-primary-700">Live GitHub Stats</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Growing{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              🎉 We're live and building! Versify, our first community app, is already serving users. 
              Join our growing community and help us build the next amazing project.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsDisplay.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={clsx(
                "glass-card p-8 rounded-3xl shadow-2xl hover:shadow-3xl card-3d border border-white/50 relative overflow-hidden",
                stat.highlight && "ring-2 ring-purple-300 ring-opacity-50"
              )}>
                {/* Gradient background on hover */}
                <div className={clsx(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl",
                  stat.highlight 
                    ? "bg-gradient-to-br from-purple-50/50 to-pink-50/50"
                    : "bg-gradient-to-br from-primary-50/50 to-secondary-50/50"
                )} />
                
                <div className="relative z-10 text-center">
                  <div className={clsx(
                    "text-4xl sm:text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300",
                    loading && "animate-pulse",
                    stat.highlight 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                      : "gradient-text"
                  )}>
                    {stat.value}
                  </div>
                  <div className={clsx(
                    "text-lg font-bold mb-3 transition-colors duration-300",
                    stat.highlight
                      ? "text-purple-900 group-hover:text-purple-700"
                      : "text-gray-900 group-hover:text-primary-700"
                  )}>
                    {stat.name}
                  </div>
                  <div className={clsx(
                    "text-sm leading-relaxed transition-colors duration-300",
                    stat.highlight
                      ? "text-purple-600 group-hover:text-purple-700"
                      : "text-gray-600 group-hover:text-gray-700"
                  )}>
                    {stat.description}
                  </div>
                </div>

                {/* Glow effect */}
                <div className={clsx(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-500",
                  stat.highlight
                    ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    : "bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card rounded-3xl p-10 shadow-2xl border border-white/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 rounded-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Coding Party 2026{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Timeline
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    quarter: 'Q1',
                    title: 'Foundation ✅',
                    description: 'Community built, Versify launched! Infrastructure setup complete.',
                    gradient: 'from-green-500 to-green-600',
                    bgGradient: 'from-green-100 to-green-200',
                    status: 'complete'
                  },
                  {
                    quarter: 'Q2',
                    title: 'Growth',
                    description: 'Scaling participation, mentorship programs, and external partnerships',
                    gradient: 'from-secondary-500 to-secondary-600',
                    bgGradient: 'from-secondary-100 to-secondary-200'
                  },
                  {
                    quarter: 'Q3',
                    title: 'Maturity',
                    description: 'Flagship product launches, industry recognition, and sustainability',
                    gradient: 'from-green-500 to-green-600',
                    bgGradient: 'from-green-100 to-green-200'
                  }
                ].map((phase, index) => (
                  <motion.div
                    key={phase.quarter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${phase.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
                      <span className={`text-2xl font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent`}>
                        {phase.quarter}
                      </span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                      {phase.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {phase.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}