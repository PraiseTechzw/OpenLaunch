'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getContributors, fallbackContributors } from '@/lib/github'
import type { GitHubContributor } from '@/lib/github'

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<GitHubContributor[]>(fallbackContributors)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContributors() {
      try {
        const data = await getContributors()
        setContributors(data)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Amazing{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Contributors
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the incredible people who make OpenLaunch possible. Every contribution, 
            no matter how small, helps build something amazing.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl shadow-lg border border-white/50 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contributors.map((contributor, index) => (
              <motion.div
                key={contributor.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="glass-card p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:scale-105 relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                    
                    <div className="relative z-10 text-center">
                      <div className="relative mb-4">
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full mx-auto ring-4 ring-white shadow-lg group-hover:ring-primary-200 transition-all duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-700 transition-colors duration-300">
                        {contributor.login}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {contributor.contributions} contributions
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-medium">
                        Contributor
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 rounded-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Want to Join Our Contributors?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We welcome contributors of all skill levels! Whether you're fixing bugs, 
                adding features, improving documentation, or helping with design, 
                there's a place for you in our community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs/onboarding"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 border border-primary-200/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Getting Started Guide
                </Link>
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}