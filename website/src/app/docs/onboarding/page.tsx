'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { RocketLaunchIcon, UserGroupIcon, CodeBracketIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
import { discordColors } from '@/lib/discord-theme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

interface ChecklistItem {
  id: string
  title: string
  description: string
  href?: string
  external?: boolean
}

interface Step {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  items: ChecklistItem[]
}

const onboardingSteps: Step[] = [
  {
    id: 'setup',
    title: 'Initial Setup',
    description: 'Get your accounts and tools ready',
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    items: [
      {
        id: 'github',
        title: 'Create GitHub Account',
        description: 'Sign up for GitHub if you don\'t have an account',
        href: 'https://github.com/signup',
        external: true
      },
      {
        id: 'fork',
        title: 'Fork the Repository',
        description: 'Fork OpenLaunch to your GitHub account',
        href: 'https://github.com/PraiseTechzw/OpenLaunch/fork',
        external: true
      },
      {
        id: 'profile',
        title: 'Complete Your Profile',
        description: 'Add a profile picture, bio, and location to your GitHub profile'
      },
      {
        id: 'watch',
        title: 'Watch the Repository',
        description: 'Star and watch the repository for updates',
        href: 'https://github.com/PraiseTechzw/OpenLaunch',
        external: true
      }
    ]
  },
  {
    id: 'community',
    title: 'Join the Community',
    description: 'Connect with other contributors',
    icon: <UserGroupIcon className="w-6 h-6" />,
    items: [
      {
        id: 'discussions',
        title: 'Join GitHub Discussions',
        description: 'Introduce yourself in our welcome thread',
        href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
        external: true
      },
      {
        id: 'code-of-conduct',
        title: 'Read Code of Conduct',
        description: 'Understand our community guidelines',
        href: '/community/code-of-conduct'
      },
      {
        id: 'vision',
        title: 'Learn Our Vision',
        description: 'Understand what we\'re building and why',
        href: '/docs/vision'
      },
      {
        id: 'contributors',
        title: 'Meet the Team',
        description: 'See who\'s already contributing',
        href: '/community/contributors'
      }
    ]
  },
  {
    id: 'development',
    title: 'Development Setup',
    description: 'Set up your local development environment',
    icon: <CodeBracketIcon className="w-6 h-6" />,
    items: [
      {
        id: 'clone',
        title: 'Clone Your Fork',
        description: 'Clone the repository to your local machine'
      },
      {
        id: 'install',
        title: 'Install Dependencies',
        description: 'Run npm install or pnpm install'
      },
      {
        id: 'env',
        title: 'Set Up Environment',
        description: 'Copy .env.example to .env.local and configure'
      },
      {
        id: 'run',
        title: 'Start Development Server',
        description: 'Run the project locally and verify it works'
      }
    ]
  },
  {
    id: 'contribute',
    title: 'Make Your First Contribution',
    description: 'Find something to work on and contribute',
    icon: <PaintBrushIcon className="w-6 h-6" />,
    items: [
      {
        id: 'issues',
        title: 'Browse Good First Issues',
        description: 'Find beginner-friendly tasks to work on',
        href: 'https://github.com/PraiseTechzw/OpenLaunch/labels/good%20first%20issue',
        external: true
      },
      {
        id: 'branch',
        title: 'Create a Feature Branch',
        description: 'Create a new branch for your changes'
      },
      {
        id: 'commit',
        title: 'Make Your Changes',
        description: 'Write code, tests, and documentation'
      },
      {
        id: 'pr',
        title: 'Submit a Pull Request',
        description: 'Open a PR and request review from maintainers'
      }
    ]
  }
]

const contributionTypes = [
  {
    title: 'Code Development',
    description: 'Write features, fix bugs, improve performance',
    skills: ['JavaScript/TypeScript', 'React', 'Node.js', 'Python'],
    color: discordColors.brand.primary
  },
  {
    title: 'Design & UX',
    description: 'Create interfaces, improve user experience, design assets',
    skills: ['Figma', 'UI/UX Design', 'Accessibility', 'User Research'],
    color: discordColors.status.info
  },
  {
    title: 'Documentation',
    description: 'Write guides, tutorials, API docs, and help content',
    skills: ['Technical Writing', 'Markdown', 'Communication'],
    color: discordColors.brand.secondary
  },
  {
    title: 'Community',
    description: 'Help newcomers, organize events, moderate discussions',
    skills: ['Communication', 'Event Planning', 'Mentorship'],
    color: discordColors.brand.accent
  }
]

export default function OnboardingPage() {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [activeStep, setActiveStep] = useState<string>('setup')

  const toggleItem = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getStepProgress = (step: Step) => {
    const completed = step.items.filter(item => completedItems.includes(item.id)).length
    return Math.round((completed / step.items.length) * 100)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: discordColors.text.primary }}
        >
          Welcome to OpenLaunch! 🎉
        </h1>
        <p 
          className="text-xl mb-6"
          style={{ color: discordColors.text.secondary }}
        >
          We're thrilled you're here! This guide will help you get started and make your first contribution to our collaborative innovation community.
        </p>
        
        {/* Progress Overview */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-lg font-semibold"
              style={{ color: discordColors.text.primary }}
            >
              Your Progress
            </h2>
            <span 
              className="text-sm"
              style={{ color: discordColors.text.secondary }}
            >
              {completedItems.length} / {onboardingSteps.reduce((acc, step) => acc + step.items.length, 0)} completed
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {onboardingSteps.map((step) => {
              const progress = getStepProgress(step)
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={clsx(
                    "p-3 rounded-lg text-left transition-all duration-200",
                    activeStep === step.id ? "ring-2" : ""
                  )}
                  style={{
                    backgroundColor: activeStep === step.id 
                      ? discordColors.background.modifier.selected
                      : discordColors.background.secondary,
                    ringColor: discordColors.brand.primary,
                  }}
                >
                  <div className="flex items-center mb-2">
                    <span style={{ color: discordColors.brand.primary }}>
                      {step.icon}
                    </span>
                    <span 
                      className="ml-2 font-medium text-sm"
                      style={{ color: discordColors.text.primary }}
                    >
                      {step.title}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${progress}%`,
                        backgroundColor: discordColors.brand.primary 
                      }}
                    />
                  </div>
                  <span 
                    className="text-xs mt-1 block"
                    style={{ color: discordColors.text.muted }}
                  >
                    {progress}% complete
                  </span>
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {onboardingSteps.map((step) => (
          <Card 
            key={step.id} 
            variant={activeStep === step.id ? "elevated" : "default"}
            className={clsx(
              "transition-all duration-300",
              activeStep === step.id ? "ring-2" : ""
            )}
            style={{
              ringColor: activeStep === step.id ? discordColors.brand.primary : 'transparent'
            }}
          >
            <CardHeader>
              <div className="flex items-center">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ 
                    backgroundColor: `${discordColors.brand.primary}20`,
                    color: discordColors.brand.primary 
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <CardTitle style={{ color: discordColors.text.primary }}>
                    {step.title}
                  </CardTitle>
                  <CardDescription style={{ color: discordColors.text.secondary }}>
                    {step.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {step.items.map((item) => {
                  const isCompleted = completedItems.includes(item.id)
                  return (
                    <div 
                      key={item.id}
                      className="flex items-start p-3 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: isCompleted 
                          ? `${discordColors.brand.secondary}20`
                          : discordColors.background.secondary
                      }}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="mr-3 mt-0.5 transition-colors"
                      >
                        <CheckCircleIcon 
                          className="w-5 h-5"
                          style={{ 
                            color: isCompleted 
                              ? discordColors.brand.secondary 
                              : discordColors.text.muted 
                          }}
                        />
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 
                            className={clsx(
                              "font-medium",
                              isCompleted && "line-through"
                            )}
                            style={{ 
                              color: isCompleted 
                                ? discordColors.text.muted 
                                : discordColors.text.primary 
                            }}
                          >
                            {item.title}
                          </h4>
                          {item.href && (
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                            >
                              <Link 
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                style={{ color: discordColors.brand.primary }}
                              >
                                {item.external ? "Open ↗" : "View"}
                              </Link>
                            </Button>
                          )}
                        </div>
                        <p 
                          className="text-sm mt-1"
                          style={{ color: discordColors.text.secondary }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Code Examples */}
      <Card variant="elevated" className="mt-12 p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle style={{ color: discordColors.text.primary }}>
            Quick Setup Commands
          </CardTitle>
          <CardDescription style={{ color: discordColors.text.secondary }}>
            Copy and paste these commands to get started quickly
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 
                  className="font-medium"
                  style={{ color: discordColors.text.primary }}
                >
                  Clone and Setup
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`git clone https://github.com/YOUR_USERNAME/OpenLaunch.git
cd OpenLaunch
npm install
cp .env.example .env.local
npm run dev`)}
                >
                  <ClipboardDocumentIcon className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              <pre 
                className="p-4 rounded-lg text-sm overflow-x-auto"
                style={{ 
                  backgroundColor: discordColors.background.floating,
                  color: discordColors.text.secondary 
                }}
              >
{`git clone https://github.com/YOUR_USERNAME/OpenLaunch.git
cd OpenLaunch
npm install
cp .env.example .env.local
npm run dev`}
              </pre>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 
                  className="font-medium"
                  style={{ color: discordColors.text.primary }}
                >
                  Create Feature Branch
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`git checkout -b feature/your-feature-name
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name`)}
                >
                  <ClipboardDocumentIcon className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              <pre 
                className="p-4 rounded-lg text-sm overflow-x-auto"
                style={{ 
                  backgroundColor: discordColors.background.floating,
                  color: discordColors.text.secondary 
                }}
              >
{`git checkout -b feature/your-feature-name
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contribution Types */}
      <div className="mt-12">
        <h2 
          className="text-2xl font-bold mb-6"
          style={{ color: discordColors.text.primary }}
        >
          Ways to Contribute
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {contributionTypes.map((type) => (
            <Card key={type.title} variant="interactive" className="p-6">
              <div className="flex items-start">
                <div 
                  className="w-3 h-3 rounded-full mr-4 mt-2"
                  style={{ backgroundColor: type.color }}
                />
                <div>
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: discordColors.text.primary }}
                  >
                    {type.title}
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: discordColors.text.secondary }}
                  >
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {type.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: discordColors.background.modifier.hover,
                          color: discordColors.text.secondary
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card 
        variant="elevated" 
        className="mt-12 p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`,
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: discordColors.text.primary }}
        >
          Ready to Get Started?
        </h2>
        <p 
          className="mb-6 max-w-2xl mx-auto"
          style={{ color: `${discordColors.text.primary}cc` }}
        >
          You're all set! Pick your first issue, join our community discussions, and start building amazing things with us.
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
            <Link href="https://github.com/PraiseTechzw/OpenLaunch/labels/good%20first%20issue" target="_blank">
              Find First Issue
            </Link>
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
            <Link href="/community">
              Join Community
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}