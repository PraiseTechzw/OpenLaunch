'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  HeartIcon,
  CodeBracketIcon,
  StarIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { discord } from '@/lib/discord-utils'
import { getRepoStats, fallbackStats } from '@/lib/github'
import type { GitHubStats } from '@/lib/github'

const communityLinks = [
  {
    name: 'GitHub Discussions',
    description: 'Join conversations, ask questions, and share ideas with the community',
    href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
    icon: ChatBubbleLeftRightIcon,
    external: true,
  },
  {
    name: 'Contributors',
    description: 'Meet the amazing people building OpenLaunch',
    href: '/community/contributors',
    icon: UserGroupIcon,
  },
  {
    name: 'Events',
    description: 'Upcoming community events, coding parties, and meetups',
    href: '/events',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Code of Conduct',
    description: 'Our community guidelines and values',
    href: '/community/code-of-conduct',
    icon: HeartIcon,
  },
]

const contributionAreas = [
  {
    title: 'Frontend Development',
    description: 'Build user interfaces with React, Next.js, and modern web technologies',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    color: 'bg-discord-brand-primary',
  },
  {
    title: 'Backend Development',
    description: 'Create APIs, services, and data management solutions',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    color: 'bg-discord-status-success',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Integrate AI capabilities and build intelligent features',
    skills: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain'],
    color: 'bg-discord-brand-accent',
  },
  {
    title: 'Design & UX',
    description: 'Create beautiful, accessible, and user-friendly experiences',
    skills: ['Figma', 'Design Systems', 'Accessibility', 'User Research'],
    color: 'bg-discord-status-warning',
  },
  {
    title: 'Documentation',
    description: 'Help others learn and contribute through clear documentation',
    skills: ['Technical Writing', 'Markdown', 'Tutorials', 'API Docs'],
    color: 'bg-discord-text-link',
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Build and maintain development and deployment infrastructure',
    skills: ['Docker', 'CI/CD', 'AWS', 'Monitoring'],
    color: 'bg-discord-interactive-normal',
  },
]

export default function CommunityPage() {
  const [stats, setStats] = useState<GitHubStats>(fallbackStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getRepoStats()
        setStats(data)
      } catch (error) {
        console.warn('Failed to fetch GitHub stats, using fallback data:', error)
        setStats(fallbackStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={discord.getTypographyClasses('display', 'mb-6')}>
            Join Our Community
          </h1>
          <p className={discord.getTypographyClasses('body', 'text-discord-text-secondary max-w-3xl mx-auto text-lg')}>
            Connect with developers, designers, and creators from around the world. 
            Together, we're building the future of open-source collaboration.
          </p>
        </div>

        {/* Community Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className={discord.getCardClasses('default', 'text-center')}>
            <div className="flex items-center justify-center mb-2">
              <StarIcon className="w-6 h-6 text-discord-brand-accent mr-2" />
              <span className={discord.getTypographyClasses('heading2', 'text-discord-text-primary')}>
                {loading ? '...' : stats.stars}
              </span>
            </div>
            <p className={discord.getTypographyClasses('small', 'text-discord-text-muted')}>
              GitHub Stars
            </p>
          </div>
          
          <div className={discord.getCardClasses('default', 'text-center')}>
            <div className="flex items-center justify-center mb-2">
              <UserGroupIcon className="w-6 h-6 text-discord-status-success mr-2" />
              <span className={discord.getTypographyClasses('heading2', 'text-discord-text-primary')}>
                {loading ? '...' : stats.contributors}
              </span>
            </div>
            <p className={discord.getTypographyClasses('small', 'text-discord-text-muted')}>
              Contributors
            </p>
          </div>
          
          <div className={discord.getCardClasses('default', 'text-center')}>
            <div className="flex items-center justify-center mb-2">
              <ArrowPathIcon className="w-6 h-6 text-discord-brand-primary mr-2" />
              <span className={discord.getTypographyClasses('heading2', 'text-discord-text-primary')}>
                {loading ? '...' : stats.forks}
              </span>
            </div>
            <p className={discord.getTypographyClasses('small', 'text-discord-text-muted')}>
              Forks
            </p>
          </div>
          
          <div className={discord.getCardClasses('default', 'text-center')}>
            <div className="flex items-center justify-center mb-2">
              <EyeIcon className="w-6 h-6 text-discord-text-link mr-2" />
              <span className={discord.getTypographyClasses('heading2', 'text-discord-text-primary')}>
                {loading ? '...' : stats.commits}
              </span>
            </div>
            <p className={discord.getTypographyClasses('small', 'text-discord-text-muted')}>
              Total Commits
            </p>
          </div>
        </div>

        {/* Community Links */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {communityLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={discord.getCardClasses('interactive', 'group')}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-discord-background-modifier-accent rounded-discord flex items-center justify-center group-hover:bg-discord-brand-primary transition-colors duration-200">
                  <link.icon className="w-5 h-5 text-discord-text-primary" />
                </div>
                <h3 className={discord.getTypographyClasses('heading3', 'ml-3 text-discord-text-primary group-hover:text-discord-brand-primary transition-colors duration-200')}>
                  {link.name}
                </h3>
              </div>
              <p className={discord.getTypographyClasses('small', 'text-discord-text-secondary')}>
                {link.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Contribution Areas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className={discord.getTypographyClasses('heading1', 'text-discord-text-primary mb-4')}>
              Ways to Contribute
            </h2>
            <p className={discord.getTypographyClasses('body', 'text-discord-text-secondary max-w-2xl mx-auto')}>
              Whether you're a beginner or an expert, there's a place for you in our community. 
              Find your area of interest and start contributing today.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contributionAreas.map((area) => (
              <div
                key={area.title}
                className={discord.getCardClasses('default', 'group hover:bg-discord-background-elevated transition-colors duration-200')}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 ${area.color} rounded-full mr-3`} />
                  <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary')}>
                    {area.title}
                  </h3>
                </div>
                <p className={discord.getTypographyClasses('small', 'text-discord-text-secondary mb-4')}>
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-discord-background-modifier-hover text-discord-text-muted text-xs rounded-discord"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div className={discord.getCardClasses('elevated', 'bg-gradient-to-r from-discord-brand-primary to-discord-brand-secondary')}>
          <div className="text-center">
            <h2 className={discord.getTypographyClasses('heading1', 'text-white mb-4')}>
              Ready to Get Started?
            </h2>
            <p className={discord.getTypographyClasses('body', 'text-discord-text-primary opacity-90 mb-6 max-w-2xl mx-auto')}>
              Join thousands of contributors building amazing open-source projects. 
              Start with our onboarding guide and make your first contribution today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/onboarding"
                className={discord.getButtonClasses('secondary', 'md', 'bg-white text-discord-brand-primary hover:bg-gray-100')}
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Read Onboarding Guide
              </Link>
              <Link
                href="https://github.com/PraiseTechzw/OpenLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className={discord.getButtonClasses('ghost', 'md', 'border-2 border-white text-white hover:bg-white hover:text-discord-brand-primary')}
              >
                <CodeBracketIcon className="w-5 h-5 mr-2" />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}