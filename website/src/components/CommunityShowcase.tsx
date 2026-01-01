'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getContributors, fallbackContributors } from '@/lib/github'
import type { GitHubContributor } from '@/lib/github'

export function CommunityShowcase() {
  const [contributors, setContributors] = useState<GitHubContributor[]>(fallbackContributors)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContributors() {
      try {
        const data = await getContributors()
        setContributors(data.slice(0, 8)) // Show top 8 contributors
      } catch (error) {
        console.warn('Failed to fetch contributors, using fallback data:', error)
        setContributors(fallbackContributors)
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [])

  return (
    <div className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-primary-50/30" />
      <div className="gradient-mesh absolute inset-0 opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-secondary-100 to-primary-100 border border-secondary-200/50 mb-6">
              <span className="text-sm font-medium text-secondary-700">Our Community</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Meet Our{' '}
              <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
                Contributors
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our growing community of developers, designers, and innovators who are 
              building the future of collaborative software development.
            </p>
          </motion.div>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
          {contributors.map((contributor, index) => (
            <motion.div
              key={contributor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="glass-card p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:scale-105 relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  
                  <div className="relative z-10 text-center">
                    <div className="relative mb-3">
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full mx-auto ring-2 ring-white shadow-lg group-hover:ring-primary-200 transition-all duration-300"
                      />
                      {loading && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-primary-700 transition-colors duration-300">
                      {contributor.login}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {contributor.contributions} commits
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden max-w-4xl mx-auto">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 rounded-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Join the Movement
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                OpenLaunch is more than just a project - it's a community-driven initiative 
                to democratize software development and foster innovation through collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/community/contributors"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 border border-primary-200/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All Contributors
                </Link>
                <Link
                  href="/contributing"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Contributing
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}