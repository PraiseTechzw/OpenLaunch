'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Metadata } from 'next'
import { 
  DocumentTextIcon, 
  ExclamationTriangleIcon, 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { discord } from '@/lib/discord-utils'

const tableOfContents = [
  { id: 'pledge', title: 'Our Pledge', level: 1 },
  { id: 'standards', title: 'Our Standards', level: 1 },
  { id: 'positive-behavior', title: 'Positive Behavior', level: 2 },
  { id: 'unacceptable-behavior', title: 'Unacceptable Behavior', level: 2 },
  { id: 'community-guidelines', title: 'Community Guidelines', level: 1 },
  { id: 'scope', title: 'Scope and Application', level: 1 },
  { id: 'enforcement', title: 'Enforcement', level: 1 },
  { id: 'reporting', title: 'Reporting Violations', level: 2 },
  { id: 'enforcement-guidelines', title: 'Enforcement Guidelines', level: 2 },
  { id: 'support', title: 'Support and Resources', level: 1 },
]

const reportingMethods = [
  {
    title: 'Email Report',
    description: 'Send a detailed report to our conduct team',
    contact: 'conduct@openlaunch.org',
    icon: EnvelopeIcon,
    type: 'primary'
  },
  {
    title: 'Anonymous Report',
    description: 'Submit an anonymous report through our secure form',
    contact: 'Anonymous Form',
    href: 'https://forms.openlaunch.org/conduct-report',
    icon: ShieldCheckIcon,
    type: 'secondary'
  },
  {
    title: 'Emergency Contact',
    description: 'For urgent safety concerns requiring immediate attention',
    contact: 'emergency@openlaunch.org',
    icon: ExclamationTriangleIcon,
    type: 'danger'
  },
  {
    title: 'Community Discussion',
    description: 'Discuss general conduct questions with the community',
    contact: 'GitHub Discussions',
    href: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
    icon: ChatBubbleLeftRightIcon,
    type: 'ghost'
  }
]

export default function CodeOfConductPage() {
  const [activeSection, setActiveSection] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    // Load the markdown content
    async function loadContent() {
      try {
        const response = await fetch('/api/code-of-conduct')
        if (response.ok) {
          const text = await response.text()
          setContent(text)
        } else {
          // Fallback content
          setContent(`# Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances of any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email address, without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

## Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at conduct@openlaunch.org.

All complaints will be reviewed and investigated promptly and fairly.`)
        }
      } catch (error) {
        console.error('Failed to load code of conduct:', error)
      }
    }

    loadContent()
  }, [])

  useEffect(() => {
    // Handle scroll spy for table of contents
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const formatContent = (text: string) => {
    return text
      .replace(/^# (.+)$/gm, '<h1 id="$1" class="text-4xl font-bold text-discord-text-primary mb-8 scroll-mt-20">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 id="$1" class="text-2xl font-bold text-discord-text-primary mt-12 mb-6 scroll-mt-20">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 id="$1" class="text-xl font-semibold text-discord-text-primary mt-8 mb-4 scroll-mt-20">$1</h3>')
      .replace(/^\*\*(.+?)\*\*/gm, '<h4 class="text-lg font-semibold text-discord-text-primary mt-6 mb-3">$1</h4>')
      .replace(/^- (.+)$/gm, '<li class="text-discord-text-secondary mb-2 ml-4">• $1</li>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-discord-text-primary">$1</strong>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <ShieldCheckIcon className="w-12 h-12 text-discord-brand-primary mr-4" />
            <h1 className={discord.getTypographyClasses('display', 'text-discord-text-primary')}>
              Code of Conduct
            </h1>
          </div>
          <p className={discord.getTypographyClasses('body', 'text-discord-text-secondary max-w-3xl mx-auto text-lg')}>
            Our community guidelines and values that ensure a safe, welcoming, and inclusive environment for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className={discord.getCardClasses('default', 'sticky top-8')}>
              <div className="flex items-center mb-4">
                <BookOpenIcon className="w-5 h-5 text-discord-brand-primary mr-2" />
                <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary')}>
                  Table of Contents
                </h3>
              </div>
              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-discord text-sm transition-colors duration-200 ${
                      item.level === 2 ? 'ml-4' : ''
                    } ${
                      activeSection === item.id
                        ? 'bg-discord-brand-primary text-white'
                        : 'text-discord-text-secondary hover:bg-discord-background-modifier-hover hover:text-discord-text-primary'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.level === 2 && <ChevronRightIcon className="w-3 h-3 mr-1" />}
                      {item.title}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={discord.getCardClasses('default', 'mb-8')}>
              <div 
                className="prose prose-lg max-w-none text-discord-text-secondary"
                dangerouslySetInnerHTML={{ __html: formatContent(content) }}
              />
            </div>

            {/* Reporting Mechanisms */}
            <div className={discord.getCardClasses('elevated', 'bg-gradient-to-br from-discord-background-secondary to-discord-background-elevated')}>
              <div className="text-center mb-8">
                <ExclamationTriangleIcon className="w-12 h-12 text-discord-brand-accent mx-auto mb-4" />
                <h2 className={discord.getTypographyClasses('heading1', 'text-discord-text-primary mb-4')}>
                  Report a Violation
                </h2>
                <p className={discord.getTypographyClasses('body', 'text-discord-text-secondary max-w-2xl mx-auto')}>
                  If you experience or witness behavior that violates our Code of Conduct, 
                  please report it using one of the methods below. All reports are taken seriously.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportingMethods.map((method) => (
                  <div
                    key={method.title}
                    className={discord.getCardClasses('interactive', 'group')}
                  >
                    {method.href ? (
                      <Link
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div className="flex items-start">
                          <div className={`w-10 h-10 rounded-discord flex items-center justify-center mr-4 ${
                            method.type === 'primary' ? 'bg-discord-brand-primary' :
                            method.type === 'secondary' ? 'bg-discord-status-success' :
                            method.type === 'danger' ? 'bg-discord-status-error' :
                            'bg-discord-interactive-normal'
                          }`}>
                            <method.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary mb-2 group-hover:text-discord-brand-primary transition-colors')}>
                              {method.title}
                            </h3>
                            <p className={discord.getTypographyClasses('small', 'text-discord-text-secondary mb-2')}>
                              {method.description}
                            </p>
                            <p className={discord.getTypographyClasses('caption', 'text-discord-text-link font-medium')}>
                              {method.contact}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-start">
                        <div className={`w-10 h-10 rounded-discord flex items-center justify-center mr-4 ${
                          method.type === 'primary' ? 'bg-discord-brand-primary' :
                          method.type === 'secondary' ? 'bg-discord-status-success' :
                          method.type === 'danger' ? 'bg-discord-status-error' :
                          'bg-discord-interactive-normal'
                        }`}>
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary mb-2')}>
                            {method.title}
                          </h3>
                          <p className={discord.getTypographyClasses('small', 'text-discord-text-secondary mb-2')}>
                            {method.description}
                          </p>
                          <p className={discord.getTypographyClasses('caption', 'text-discord-text-link font-medium')}>
                            {method.contact}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className={discord.getCardClasses('default', 'bg-discord-background-modifier-accent/20 border-discord-brand-primary/30')}>
                  <div className="flex items-center justify-center mb-4">
                    <UserGroupIcon className="w-6 h-6 text-discord-brand-primary mr-2" />
                    <h3 className={discord.getTypographyClasses('heading3', 'text-discord-text-primary')}>
                      Community Support
                    </h3>
                  </div>
                  <p className={discord.getTypographyClasses('small', 'text-discord-text-secondary mb-4')}>
                    Our community is here to support you. Don't hesitate to reach out if you need help 
                    or have questions about our Code of Conduct.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/community"
                      className={discord.getButtonClasses('primary', 'sm')}
                    >
                      Join Community
                    </Link>
                    <Link
                      href="/docs/onboarding"
                      className={discord.getButtonClasses('secondary', 'sm')}
                    >
                      Getting Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}