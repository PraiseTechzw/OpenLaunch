'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { discord } from '@/lib/discord-utils'
import { getContributors, fallbackContributors } from '@/lib/github'
import type { GitHubContributor } from '@/lib/github'

const contributionTypes = [
  { id: 'all', label: 'All Contributors', color: 'bg-discord-interactive-normal' },
  { id: 'maintainer', label: 'Maintainers', color: 'bg-discord-brand-primary' },
  { id: 'frequent', label: 'Frequent Contributors', color: 'bg-discord-status-success' },
  { id: 'recent', label: 'Recent Contributors', color: 'bg-discord-brand-accent' },
]

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<GitHubContributor[]>(fallbackContributors)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [filteredContributors, setFilteredContributors] = useState<GitHubContributor[]>([])

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

  useEffect(() => {
    let filtered = contributors

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contributor =>
        contributor.login.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply contribution type filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'maintainer':
          // Assume first contributor is maintainer for demo
          filtered = filtered.slice(0, 1)
          break
        case 'frequent':
          // Contributors with more than 10 contributions
          filtered = filtered.filter(contributor => contributor.contributions > 10)
          break
        case 'recent':
          // Most recent contributors (last 5)
          filtered = filtered.slice(-5)
          break
      }
    }

    setFilteredContributors(filtered)
  }, [contributors, searchTerm, selectedFilter])

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={discord.getTypographyClasses('display', 'mb-6')}>
            Our Amazing{' '}
            <span className="bg-gradient-to-r from-discord-brand-primary to-discord-brand-secondary bg-clip-text text-transparent">
              Contributors
            </span>
          </h1>
          <p className={discord.getTypographyClasses('body', 'text-discord-text-secondary max-w-3xl mx-auto text-lg leading-relaxed')}>
            Meet the incredible people who make OpenLaunch possible. Every contribution, 
            no matter how small, helps build something amazing.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-discord-text-muted" />
              <input
                type="text"
                placeholder="Search contributors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={discord.getInputClasses('default', 'pl-10 bg-discord-background-secondary border-discord-interactive-normal text-discord-text-primary placeholder-discord-text-muted')}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={discord.getInputClasses('default', 'bg-discord-background-secondary border-discord-interactive-normal text-discord-text-primary pr-10')}
              >
                {contributionTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-discord-text-muted pointer-events-none" />
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {contributionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedFilter(type.id)}
                className={`px-3 py-1 rounded-discord text-sm font-medium transition-all duration-200 ${
                  selectedFilter === type.id
                    ? `${type.color} text-white`
                    : 'bg-discord-background-secondary text-discord-text-secondary hover:bg-discord-background-elevated'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contributors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={discord.getCardClasses('default', 'animate-pulse')}>
                <div className="w-20 h-20 bg-discord-background-modifier-hover rounded-full mx-auto mb-4" />
                <div className="h-4 bg-discord-background-modifier-hover rounded mb-2" />
                <div className="h-3 bg-discord-background-modifier-hover rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className={discord.getTypographyClasses('small', 'text-discord-text-muted')}>
                Showing {filteredContributors.length} of {contributors.length} contributors
              </p>
            </div>

            {/* Contributors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredContributors.map((contributor, index) => (
                <div
                  key={contributor.id}
                  className={discord.getCardClasses('interactive', 'group relative overflow-hidden')}
                >
                  <Link
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-discord-brand-primary/10 to-discord-brand-secondary/10 opacity-0 group-hover:opacity-100 rounded-discord-lg transition-opacity duration-300" />
                    
                    <div className="relative z-10 text-center">
                      <div className="relative mb-4">
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-full mx-auto ring-4 ring-discord-background-elevated shadow-discord group-hover:ring-discord-brand-primary/50 transition-all duration-300"
                        />
                        {/* Contribution badge */}
                        {contributor.contributions > 50 && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-discord-brand-accent rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">★</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary mb-2 group-hover:text-discord-brand-primary transition-colors duration-300')}>
                        {contributor.login}
                      </h3>
                      
                      <p className={discord.getTypographyClasses('small', 'text-discord-text-muted mb-3')}>
                        {contributor.contributions} contributions
                      </p>
                      
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-discord-brand-primary/20 to-discord-brand-secondary/20 text-discord-brand-primary text-xs font-medium">
                        {contributor.contributions > 50 ? 'Top Contributor' : 
                         contributor.contributions > 10 ? 'Active Contributor' : 'Contributor'}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredContributors.length === 0 && (
              <div className={discord.getCardClasses('default', 'text-center py-12')}>
                <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary mb-2')}>
                  No contributors found
                </h3>
                <p className={discord.getTypographyClasses('small', 'text-discord-text-muted mb-4')}>
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedFilter('all')
                  }}
                  className={discord.getButtonClasses('secondary')}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className={discord.getCardClasses('elevated', 'relative overflow-hidden max-w-4xl mx-auto bg-gradient-to-br from-discord-background-secondary to-discord-background-elevated')}>
            <div className="absolute inset-0 bg-gradient-to-br from-discord-brand-primary/5 to-discord-brand-secondary/5 rounded-discord-lg" />
            
            <div className="relative z-10">
              <h2 className={discord.getTypographyClasses('heading1', 'text-discord-text-primary mb-6')}>
                Want to Join Our Contributors?
              </h2>
              <p className={discord.getTypographyClasses('body', 'text-discord-text-secondary mb-8 max-w-2xl mx-auto')}>
                We welcome contributors of all skill levels! Whether you're fixing bugs, 
                adding features, improving documentation, or helping with design, 
                there's a place for you in our community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/docs/onboarding"
                  className={discord.getButtonClasses('primary')}
                >
                  Getting Started Guide
                </Link>
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={discord.getButtonClasses('secondary')}
                >
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}