'use client'

import Link from 'next/link'
import { StarIcon, LightBulbIcon, UsersIcon, GlobeAltIcon, HeartIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const visionPoints = [
  {
    icon: <LightBulbIcon className="w-8 h-8" />,
    title: 'Democratize Innovation',
    description: 'Make software innovation accessible to everyone, regardless of background or experience level.',
    color: discordColors.brand.accent
  },
  {
    icon: <UsersIcon className="w-8 h-8" />,
    title: 'Collaborative Excellence',
    description: 'Foster a community where diverse perspectives create better solutions than any individual could achieve alone.',
    color: discordColors.brand.primary
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8" />,
    title: 'Global Impact',
    description: 'Build software that solves real problems and creates positive change in communities worldwide.',
    color: discordColors.brand.secondary
  },
  {
    icon: <HeartIcon className="w-8 h-8" />,
    title: 'Inclusive Community',
    description: 'Create a welcoming space where everyone can learn, grow, and contribute meaningfully.',
    color: discordColors.status.error
  }
]

const principles = [
  {
    title: 'Open by Default',
    description: 'Every decision is made transparently. All code, discussions, and processes are public. Community input shapes the direction of every project.',
    examples: ['Public roadmaps', 'Open source code', 'Transparent governance', 'Community voting']
  },
  {
    title: 'Inclusive Excellence',
    description: 'We welcome developers of all skill levels while maintaining high standards. Quality and inclusivity go hand in hand.',
    examples: ['Mentorship programs', 'Code review culture', 'Diverse perspectives', 'Learning opportunities']
  },
  {
    title: 'Real-World Impact',
    description: 'We build production-ready software that solves actual problems for real users, not just demos or prototypes.',
    examples: ['User-focused design', 'Production deployments', 'Measurable outcomes', 'Sustainable solutions']
  },
  {
    title: 'Collaborative Learning',
    description: 'Every interaction is an opportunity to teach and learn. We grow together through shared knowledge and experience.',
    examples: ['Pair programming', 'Knowledge sharing', 'Skill development', 'Community workshops']
  }
]

const impactMetrics = [
  { label: 'Developers Empowered', value: '1,000+', description: 'Contributors whose careers were launched or advanced' },
  { label: 'Users Served', value: '100K+', description: 'People using software built by our community' },
  { label: 'Projects Launched', value: '50+', description: 'Production-ready applications and tools' },
  { label: 'Communities Reached', value: '25+', description: 'Countries with active contributors' }
]

const timeline = [
  {
    phase: 'Foundation',
    period: '2026 Q1-Q2',
    title: 'Building the Community',
    description: 'Establish core infrastructure, governance, and launch first collaborative projects.',
    milestones: ['1,000+ community members', 'First MVP launched', 'Mentorship program active']
  },
  {
    phase: 'Growth',
    period: '2026 Q3-Q4',
    title: 'Scaling Impact',
    description: 'Expand project portfolio, establish partnerships, and achieve financial sustainability.',
    milestones: ['Multiple production apps', 'Educational partnerships', 'Industry recognition']
  },
  {
    phase: 'Maturity',
    period: '2027+',
    title: 'Global Influence',
    description: 'Become a model for collaborative development and inspire similar initiatives worldwide.',
    milestones: ['Global community', 'Thought leadership', 'Ecosystem development']
  }
]

export default function VisionPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <StarIcon 
            className="w-12 h-12 mr-4" 
            style={{ color: discordColors.brand.primary }}
          />
          <h1 
            className="text-5xl font-bold"
            style={{ color: discordColors.text.primary }}
          >
            Our Vision
          </h1>
        </div>
        <p 
          className="text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
          style={{ color: discordColors.text.secondary }}
        >
          OpenLaunch exists to <span style={{ color: discordColors.brand.primary }}>democratize software innovation</span> by creating the world's most inclusive, transparent, and impactful collaborative development platform.
        </p>
        
        <Card 
          variant="elevated" 
          className="p-8 text-left max-w-4xl mx-auto"
          style={{
            background: `linear-gradient(135deg, ${discordColors.brand.primary}20, ${discordColors.brand.secondary}20)`,
            border: `1px solid ${discordColors.brand.primary}40`
          }}
        >
          <blockquote 
            className="text-xl italic leading-relaxed"
            style={{ color: discordColors.text.primary }}
          >
            "The future of software is built not by isolated teams, but by diverse communities working together in the open. Through our annual Coding Party initiatives, we believe that collaboration, transparency, and inclusion are the keys to creating technology that truly serves humanity."
          </blockquote>
          <footer 
            className="mt-4 text-right"
            style={{ color: discordColors.text.secondary }}
          >
            — OpenLaunch Community
          </footer>
        </Card>
      </div>

      {/* Vision Points */}
      <div className="mb-16">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: discordColors.text.primary }}
        >
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {visionPoints.map((point, index) => (
            <Card key={index} variant="interactive" className="p-6 group">
              <div className="flex items-start">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-200"
                  style={{ 
                    backgroundColor: `${point.color}20`,
                    color: point.color 
                  }}
                >
                  {point.icon}
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold mb-3 group-hover:text-discord-brand-primary transition-colors"
                    style={{ color: discordColors.text.primary }}
                  >
                    {point.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: discordColors.text.secondary }}
                  >
                    {point.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="mb-16">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: discordColors.text.primary }}
        >
          Our Core Principles
        </h2>
        <div className="space-y-8">
          {principles.map((principle, index) => (
            <Card key={index} variant="elevated" className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                <div className="lg:w-1/3 mb-4 lg:mb-0">
                  <h3 
                    className="text-2xl font-semibold mb-3"
                    style={{ color: discordColors.text.primary }}
                  >
                    {principle.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: discordColors.text.secondary }}
                  >
                    {principle.description}
                  </p>
                </div>
                <div className="lg:w-2/3">
                  <h4 
                    className="font-medium mb-3"
                    style={{ color: discordColors.text.primary }}
                  >
                    In Practice:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {principle.examples.map((example, exampleIndex) => (
                      <div 
                        key={exampleIndex}
                        className="flex items-center p-3 rounded-lg"
                        style={{ backgroundColor: discordColors.background.secondary }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: discordColors.brand.primary }}
                        />
                        <span 
                          className="text-sm"
                          style={{ color: discordColors.text.secondary }}
                        >
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact Vision */}
      <div className="mb-16">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: discordColors.text.primary }}
        >
          Our Impact Goals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} variant="elevated" className="p-6 text-center">
              <div 
                className="text-3xl font-bold mb-2"
                style={{ color: discordColors.brand.primary }}
              >
                {metric.value}
              </div>
              <div 
                className="font-semibold mb-2"
                style={{ color: discordColors.text.primary }}
              >
                {metric.label}
              </div>
              <div 
                className="text-sm"
                style={{ color: discordColors.text.secondary }}
              >
                {metric.description}
              </div>
            </Card>
          ))}
        </div>
        
        <Card 
          variant="elevated" 
          className="p-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${discordColors.brand.secondary}, ${discordColors.brand.primary})`,
          }}
        >
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ color: discordColors.text.primary }}
          >
            The Ripple Effect
          </h3>
          <p 
            className="text-lg mb-6 max-w-3xl mx-auto"
            style={{ color: `${discordColors.text.primary}e6` }}
          >
            Every person who participates in OpenLaunch creates ripples of positive change—gaining skills, building relationships, and contributing to solutions that benefit communities worldwide.
          </p>
        </Card>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: discordColors.text.primary }}
        >
          Our Journey
        </h2>
        <div className="space-y-8">
          {timeline.map((phase, index) => (
            <Card key={index} variant="interactive" className="p-8">
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-8">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: discordColors.brand.primary }}
                  >
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && (
                    <div 
                      className="w-0.5 h-16 mt-4"
                      style={{ backgroundColor: discordColors.interactive.normal }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium mr-4"
                      style={{ 
                        backgroundColor: `${discordColors.brand.primary}20`,
                        color: discordColors.brand.primary 
                      }}
                    >
                      {phase.period}
                    </span>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: discordColors.text.muted }}
                    >
                      {phase.phase}
                    </span>
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: discordColors.text.primary }}
                  >
                    {phase.title}
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ color: discordColors.text.secondary }}
                  >
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.milestones.map((milestone, milestoneIndex) => (
                      <span
                        key={milestoneIndex}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: discordColors.background.modifier.hover,
                          color: discordColors.text.secondary
                        }}
                      >
                        {milestone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card 
        variant="elevated" 
        className="p-12 text-center"
        style={{
          background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`,
        }}
      >
        <RocketLaunchIcon 
          className="w-16 h-16 mx-auto mb-6"
          style={{ color: discordColors.text.primary }}
        />
        <h2 
          className="text-3xl font-bold mb-6"
          style={{ color: discordColors.text.primary }}
        >
          Join Us in Building the Future
        </h2>
        <p 
          className="text-xl mb-8 max-w-3xl mx-auto"
          style={{ color: `${discordColors.text.primary}e6` }}
        >
          This vision is not just a dream—it's a blueprint for action. Every line of code written, every newcomer welcomed, every problem solved brings us closer to this future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="font-semibold"
            style={{
              backgroundColor: discordColors.text.primary,
              color: discordColors.brand.primary,
            }}
          >
            <Link href="/docs/onboarding">
              Get Started Today
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="font-semibold border-2"
            style={{
              borderColor: discordColors.text.primary,
              color: discordColors.text.primary,
            }}
          >
            <Link href="/docs/roadmap">
              View Our Roadmap
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}