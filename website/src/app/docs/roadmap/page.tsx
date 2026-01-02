'use client'

import { useState } from 'react'
import { CalendarIcon, CheckCircleIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/solid'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

interface Milestone {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
  category: 'community' | 'development' | 'infrastructure' | 'partnerships'
  date: string
  progress?: number
  deliverables: string[]
}

interface Phase {
  id: string
  title: string
  period: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
  milestones: Milestone[]
}

const roadmapData: Phase[] = [
  {
    id: 'foundation',
    title: 'Foundation Phase',
    period: 'January - March 2026',
    description: 'Establish core community infrastructure and launch first collaborative project',
    status: 'in-progress',
    milestones: [
      {
        id: 'infrastructure',
        title: 'Community Infrastructure',
        description: 'Set up essential tools and processes for community collaboration',
        status: 'completed',
        category: 'infrastructure',
        date: 'January 2026',
        progress: 100,
        deliverables: [
          'GitHub repository with templates',
          'Community discussion forums',
          'Code of conduct and guidelines',
          'Automated CI/CD pipeline'
        ]
      },
      {
        id: 'governance',
        title: 'Governance Framework',
        description: 'Define decision-making processes and community roles',
        status: 'in-progress',
        category: 'community',
        date: 'February 2026',
        progress: 75,
        deliverables: [
          'Community governance model',
          'Maintainer responsibilities',
          'Conflict resolution process',
          'Voting mechanisms'
        ]
      },
      {
        id: 'first-project',
        title: 'First Project Launch',
        description: 'Launch and develop our inaugural collaborative project',
        status: 'in-progress',
        category: 'development',
        date: 'March 2026',
        progress: 60,
        deliverables: [
          'Project selection process',
          'MVP development',
          'Community showcase',
          'Feedback integration'
        ]
      }
    ]
  },
  {
    id: 'growth',
    title: 'Growth Phase',
    period: 'April - June 2026',
    description: 'Scale community participation and launch multiple concurrent projects',
    status: 'planned',
    milestones: [
      {
        id: 'community-scaling',
        title: 'Community Scaling',
        description: 'Expand and improve the contributor experience',
        status: 'planned',
        category: 'community',
        date: 'April 2026',
        deliverables: [
          'Automated onboarding',
          'Recognition system',
          'Regional chapters',
          'Multilingual support'
        ]
      },
      {
        id: 'project-portfolio',
        title: 'Project Portfolio Expansion',
        description: 'Launch multiple concurrent projects across different domains',
        status: 'planned',
        category: 'development',
        date: 'May 2026',
        deliverables: [
          'AI/ML project launch',
          'Developer tools project',
          'Cross-project coordination',
          'Quality assurance processes'
        ]
      },
      {
        id: 'mentorship',
        title: 'Mentorship Program',
        description: 'Establish formal mentorship and learning pathways',
        status: 'planned',
        category: 'community',
        date: 'May 2026',
        deliverables: [
          'Mentor-mentee matching',
          'Learning pathways',
          'Skill-building workshops',
          'Career development support'
        ]
      },
      {
        id: 'partnerships',
        title: 'External Partnerships',
        description: 'Build relationships with educational institutions and industry',
        status: 'planned',
        category: 'partnerships',
        date: 'June 2026',
        deliverables: [
          'Educational partnerships',
          'Open source collaborations',
          'Industry sponsorships',
          'Conference presence'
        ]
      }
    ]
  },
  {
    id: 'maturity',
    title: 'Maturity Phase',
    period: 'July - September 2026',
    description: 'Achieve sustainability and establish industry recognition',
    status: 'planned',
    milestones: [
      {
        id: 'sustainability',
        title: 'Financial Sustainability',
        description: 'Establish sustainable funding and operational model',
        status: 'planned',
        category: 'infrastructure',
        date: 'July 2026',
        deliverables: [
          'Funding strategy',
          'Revenue streams',
          'Full-time staff',
          'Long-term planning'
        ]
      },
      {
        id: 'flagship-products',
        title: 'Flagship Product Launches',
        description: 'Release production-ready applications with significant user bases',
        status: 'planned',
        category: 'development',
        date: 'August 2026',
        deliverables: [
          'Production applications',
          'User acquisition',
          'Customer support',
          'Iteration cycles'
        ]
      },
      {
        id: 'industry-recognition',
        title: 'Industry Recognition',
        description: 'Establish thought leadership and industry presence',
        status: 'planned',
        category: 'partnerships',
        date: 'September 2026',
        deliverables: [
          'Conference presentations',
          'Awards submissions',
          'Media coverage',
          'Case studies'
        ]
      }
    ]
  },
  {
    id: 'scale',
    title: 'Scale Phase',
    period: 'October - December 2026',
    description: 'Global expansion and ecosystem development',
    status: 'planned',
    milestones: [
      {
        id: 'global-expansion',
        title: 'Global Community Expansion',
        description: 'Expand to international markets and communities',
        status: 'planned',
        category: 'community',
        date: 'October 2026',
        deliverables: [
          'International chapters',
          'Multi-timezone collaboration',
          'Cultural adaptation',
          'Global partnerships'
        ]
      },
      {
        id: 'advanced-projects',
        title: 'Advanced Project Portfolio',
        description: 'Launch cutting-edge and research-oriented projects',
        status: 'planned',
        category: 'development',
        date: 'November 2026',
        deliverables: [
          'Enterprise applications',
          'AI/ML innovations',
          'Blockchain initiatives',
          'Research projects'
        ]
      },
      {
        id: 'ecosystem',
        title: 'Ecosystem Development',
        description: 'Build comprehensive developer ecosystem and marketplace',
        status: 'planned',
        category: 'infrastructure',
        date: 'December 2026',
        deliverables: [
          'Developer tools',
          'API platform',
          'Plugin architecture',
          'Community marketplace'
        ]
      }
    ]
  }
]

const categories = [
  { id: 'all', name: 'All Categories', color: discordColors.text.secondary },
  { id: 'community', name: 'Community', color: discordColors.brand.primary },
  { id: 'development', name: 'Development', color: discordColors.brand.secondary },
  { id: 'infrastructure', name: 'Infrastructure', color: discordColors.brand.accent },
  { id: 'partnerships', name: 'Partnerships', color: discordColors.status.info }
]

const statusConfig = {
  completed: {
    icon: <CheckCircleIcon className="w-5 h-5" />,
    color: discordColors.status.success,
    label: 'Completed'
  },
  'in-progress': {
    icon: <PlayIcon className="w-5 h-5" />,
    color: discordColors.brand.primary,
    label: 'In Progress'
  },
  planned: {
    icon: <ClockIcon className="w-5 h-5" />,
    color: discordColors.text.muted,
    label: 'Planned'
  }
}

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

  const filteredPhases = roadmapData.map(phase => ({
    ...phase,
    milestones: selectedCategory === 'all' 
      ? phase.milestones 
      : phase.milestones.filter(milestone => milestone.category === selectedCategory)
  })).filter(phase => phase.milestones.length > 0)

  const getPhaseProgress = (phase: Phase) => {
    const totalMilestones = phase.milestones.length
    const completedMilestones = phase.milestones.filter(m => m.status === 'completed').length
    const inProgressMilestones = phase.milestones.filter(m => m.status === 'in-progress').length
    
    return Math.round(((completedMilestones + (inProgressMilestones * 0.5)) / totalMilestones) * 100)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <CalendarIcon 
            className="w-12 h-12 mr-4" 
            style={{ color: discordColors.brand.primary }}
          />
          <h1 
            className="text-4xl font-bold"
            style={{ color: discordColors.text.primary }}
          >
            Project Roadmap
          </h1>
        </div>
        <p 
          className="text-xl max-w-4xl mx-auto mb-8"
          style={{ color: discordColors.text.secondary }}
        >
          Our journey from initial community building to becoming a thriving collaborative innovation lab. 
          This roadmap is iterative and community-driven, with regular checkpoints for feedback and course correction.
        </p>

        {/* Filters */}
        <Card variant="elevated" className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FunnelIcon 
                className="w-5 h-5 mr-2" 
                style={{ color: discordColors.text.secondary }}
              />
              <span 
                className="font-medium"
                style={{ color: discordColors.text.primary }}
              >
                Filter by Category
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  selectedCategory === category.id ? "ring-2" : ""
                )}
                style={{
                  backgroundColor: selectedCategory === category.id 
                    ? `${category.color}20`
                    : discordColors.background.secondary,
                  color: selectedCategory === category.id 
                    ? category.color 
                    : discordColors.text.secondary,
                  ringColor: category.color
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <div className="space-y-12">
        {filteredPhases.map((phase, phaseIndex) => {
          const progress = getPhaseProgress(phase)
          const isSelected = selectedPhase === phase.id
          
          return (
            <div key={phase.id} className="relative">
              {/* Phase Header */}
              <Card 
                variant={isSelected ? "elevated" : "default"}
                className={clsx(
                  "p-8 cursor-pointer transition-all duration-300",
                  isSelected ? "ring-2" : ""
                )}
                style={{
                  ringColor: isSelected ? discordColors.brand.primary : 'transparent'
                }}
                onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-8">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: statusConfig[phase.status].color }}
                      >
                        {phaseIndex + 1}
                      </div>
                      {phaseIndex < filteredPhases.length - 1 && (
                        <div 
                          className="w-0.5 h-16 mt-4"
                          style={{ backgroundColor: discordColors.interactive.normal }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium mr-4"
                          style={{ 
                            backgroundColor: `${statusConfig[phase.status].color}20`,
                            color: statusConfig[phase.status].color 
                          }}
                        >
                          {phase.period}
                        </span>
                        <div className="flex items-center">
                          <span style={{ color: statusConfig[phase.status].color }}>
                            {statusConfig[phase.status].icon}
                          </span>
                          <span 
                            className="ml-2 text-sm font-medium"
                            style={{ color: discordColors.text.muted }}
                          >
                            {statusConfig[phase.status].label}
                          </span>
                        </div>
                      </div>
                      <h2 
                        className="text-2xl font-bold mb-3"
                        style={{ color: discordColors.text.primary }}
                      >
                        {phase.title}
                      </h2>
                      <p 
                        className="mb-4 max-w-2xl"
                        style={{ color: discordColors.text.secondary }}
                      >
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className="text-2xl font-bold mb-2"
                      style={{ color: discordColors.brand.primary }}
                    >
                      {progress}%
                    </div>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: statusConfig[phase.status].color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Milestones */}
              {(isSelected || selectedPhase === null) && (
                <div className="ml-20 mt-6 space-y-6">
                  {phase.milestones.map((milestone) => {
                    const categoryConfig = categories.find(c => c.id === milestone.category)
                    
                    return (
                      <Card key={milestone.id} variant="interactive" className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <div 
                                className="w-3 h-3 rounded-full mr-3"
                                style={{ backgroundColor: categoryConfig?.color }}
                              />
                              <span 
                                className="px-2 py-1 rounded text-xs font-medium mr-3"
                                style={{ 
                                  backgroundColor: `${categoryConfig?.color}20`,
                                  color: categoryConfig?.color 
                                }}
                              >
                                {categoryConfig?.name}
                              </span>
                              <span 
                                className="text-sm"
                                style={{ color: discordColors.text.muted }}
                              >
                                {milestone.date}
                              </span>
                            </div>
                            <h3 
                              className="text-lg font-semibold mb-2"
                              style={{ color: discordColors.text.primary }}
                            >
                              {milestone.title}
                            </h3>
                            <p 
                              className="mb-4"
                              style={{ color: discordColors.text.secondary }}
                            >
                              {milestone.description}
                            </p>
                            <div>
                              <h4 
                                className="font-medium mb-2"
                                style={{ color: discordColors.text.primary }}
                              >
                                Key Deliverables:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {milestone.deliverables.map((deliverable, index) => (
                                  <div 
                                    key={index}
                                    className="flex items-center p-2 rounded"
                                    style={{ backgroundColor: discordColors.background.secondary }}
                                  >
                                    <CheckCircleIcon 
                                      className="w-4 h-4 mr-2"
                                      style={{ 
                                        color: milestone.status === 'completed' 
                                          ? discordColors.status.success 
                                          : discordColors.text.muted 
                                      }}
                                    />
                                    <span 
                                      className="text-sm"
                                      style={{ color: discordColors.text.secondary }}
                                    >
                                      {deliverable}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="ml-6 text-right">
                            <div className="flex items-center mb-2">
                              <span style={{ color: statusConfig[milestone.status].color }}>
                                {statusConfig[milestone.status].icon}
                              </span>
                              <span 
                                className="ml-2 text-sm font-medium"
                                style={{ color: statusConfig[milestone.status].color }}
                              >
                                {statusConfig[milestone.status].label}
                              </span>
                            </div>
                            {milestone.progress !== undefined && (
                              <div>
                                <div 
                                  className="text-lg font-bold mb-1"
                                  style={{ color: discordColors.text.primary }}
                                >
                                  {milestone.progress}%
                                </div>
                                <div className="w-16 bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                      width: `${milestone.progress}%`,
                                      backgroundColor: statusConfig[milestone.status].color 
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Call to Action */}
      <Card 
        variant="elevated" 
        className="mt-16 p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`,
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: discordColors.text.primary }}
        >
          Help Shape Our Future
        </h2>
        <p 
          className="mb-6 max-w-2xl mx-auto"
          style={{ color: `${discordColors.text.primary}cc` }}
        >
          This roadmap is a living document that evolves with our community. Your input and contributions help determine our priorities and direction.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="secondary"
            className="font-semibold"
            style={{
              backgroundColor: discordColors.text.primary,
              color: discordColors.brand.primary,
            }}
          >
            <a href="https://github.com/PraiseTechzw/OpenLaunch/discussions" target="_blank" rel="noopener noreferrer">
              Join Discussions
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="font-semibold border-2"
            style={{
              borderColor: discordColors.text.primary,
              color: discordColors.text.primary,
            }}
          >
            <a href="https://github.com/PraiseTechzw/OpenLaunch/issues" target="_blank" rel="noopener noreferrer">
              Suggest Features
            </a>
          </Button>
        </div>
      </Card>
    </div>
  )
}