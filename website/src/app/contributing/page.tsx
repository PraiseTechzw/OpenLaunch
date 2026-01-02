import { Metadata } from 'next'
import Link from 'next/link'
import { 
  CodeBracketIcon, 
  HeartIcon, 
  LightBulbIcon, 
  DocumentTextIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contributing - OpenLaunch',
  description: 'Learn how to contribute to the OpenLaunch project and join our community of developers building the future of collaborative software development.',
}

export default function ContributingPage() {
  const contributionTypes = [
    {
      title: 'Code Contributions',
      description: 'Help build features, fix bugs, and improve performance across our platform',
      icon: CodeBracketIcon,
      items: [
        'Frontend development (React/Next.js)',
        'Backend development (Node.js/Python)',
        'Bug fixes and optimizations',
        'Testing and quality assurance',
        'Performance improvements',
        'Security enhancements'
      ],
      beginnerFriendly: true
    },
    {
      title: 'Documentation',
      description: 'Improve guides, tutorials, and API documentation to help others contribute',
      icon: DocumentTextIcon,
      items: [
        'Writing and updating guides',
        'API documentation',
        'Tutorial creation',
        'Translation and localization',
        'Code examples and snippets',
        'Video tutorials'
      ],
      beginnerFriendly: true
    },
    {
      title: 'Design & UX',
      description: 'Create beautiful and intuitive user experiences that delight our users',
      icon: LightBulbIcon,
      items: [
        'UI/UX design',
        'Accessibility improvements',
        'Design system development',
        'User research and testing',
        'Prototyping and wireframing',
        'Brand and visual identity'
      ],
      beginnerFriendly: false
    },
    {
      title: 'Community',
      description: 'Help grow and support our amazing community of developers and creators',
      icon: HeartIcon,
      items: [
        'Community moderation',
        'Event organization',
        'Mentoring new contributors',
        'Social media and outreach',
        'Content creation',
        'Partnership development'
      ],
      beginnerFriendly: true
    }
  ]

  const gettingStartedSteps = [
    {
      step: '1',
      title: 'Read the Docs',
      description: 'Familiarize yourself with our project structure, coding standards, and contribution guidelines',
      icon: BookOpenIcon,
      link: '/docs/onboarding',
      external: false
    },
    {
      step: '2',
      title: 'Join Discord',
      description: 'Connect with our community, ask questions, and get help from experienced contributors',
      icon: ChatBubbleLeftRightIcon,
      link: '/community/discord',
      external: false
    },
    {
      step: '3',
      title: 'Find an Issue',
      description: 'Browse good first issues on GitHub that match your skills and interests',
      icon: MagnifyingGlassIcon,
      link: 'https://github.com/PraiseTechzw/OpenLaunch/labels/good%20first%20issue',
      external: true
    },
    {
      step: '4',
      title: 'Submit PR',
      description: 'Make your changes, follow our PR template, and submit for review',
      icon: PaperAirplaneIcon,
      link: 'https://github.com/PraiseTechzw/OpenLaunch/pulls',
      external: true
    }
  ]

  const resources = [
    {
      title: 'Development Setup',
      description: 'Complete guide to setting up your local development environment',
      icon: WrenchScrewdriverIcon,
      link: '/docs/onboarding#development-setup',
      category: 'Setup'
    },
    {
      title: 'Coding Standards',
      description: 'Our coding conventions, style guides, and best practices',
      icon: CodeBracketIcon,
      link: '/docs/architecture#coding-standards',
      category: 'Guidelines'
    },
    {
      title: 'Learning Resources',
      description: 'Curated list of tutorials, courses, and documentation',
      icon: AcademicCapIcon,
      link: '#learning-resources',
      category: 'Learning'
    },
    {
      title: 'Community Guidelines',
      description: 'How to interact respectfully and effectively in our community',
      icon: UserGroupIcon,
      link: '/community/code-of-conduct',
      category: 'Community'
    },
    {
      title: 'Project Roadmap',
      description: 'See what we\'re working on and plan your contributions',
      icon: GlobeAltIcon,
      link: '/docs/roadmap',
      category: 'Planning'
    },
    {
      title: 'API Documentation',
      description: 'Complete API reference and integration guides',
      icon: DocumentTextIcon,
      link: '/docs/api',
      category: 'Technical'
    }
  ]

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-discord bg-discord-background-modifier-accent border border-discord-brand-primary/20 mb-6">
            <HeartIcon className="w-4 h-4 mr-2 text-discord-brand-primary" />
            <span className="text-sm font-medium text-discord-brand-primary">Join Our Mission</span>
          </div>
          <h1 className="discord-text-display text-discord-text-primary mb-6">
            Start{' '}
            <span className="bg-gradient-to-r from-discord-brand-primary to-discord-brand-secondary bg-clip-text text-transparent">
              Contributing
            </span>
          </h1>
          <p className="discord-text-heading-3 text-discord-text-secondary max-w-3xl mx-auto leading-relaxed">
            OpenLaunch thrives because of contributors like you. Whether you're a seasoned developer 
            or just starting out, there are many ways to make a meaningful impact.
          </p>
        </div>

        {/* Contribution Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contributionTypes.map((type, index) => (
            <Card key={type.title} variant="interactive" className="group">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-discord-brand-primary/10 rounded-discord flex items-center justify-center text-discord-brand-primary group-hover:bg-discord-brand-primary group-hover:text-discord-text-primary transition-all duration-200">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="group-hover:text-discord-brand-primary transition-colors">
                        {type.title}
                      </CardTitle>
                      {type.beginnerFriendly && (
                        <span className="px-2 py-1 bg-discord-status-success/20 text-discord-status-success text-xs font-medium rounded-discord">
                          Beginner Friendly
                        </span>
                      )}
                    </div>
                    <CardDescription>
                      {type.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {type.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-discord-text-secondary group-hover:text-discord-text-primary transition-colors">
                      <div className="w-1.5 h-1.5 bg-discord-brand-primary rounded-full mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Getting Started Steps */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="discord-text-heading-2 text-center">
              How to Get Started
            </CardTitle>
            <CardDescription className="text-center">
              Follow these steps to make your first contribution to OpenLaunch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gettingStartedSteps.map((step, index) => (
                <div key={step.step} className="text-center group">
                  <div className="w-16 h-16 bg-discord-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-discord-text-primary font-bold text-xl shadow-discord-elevation-medium group-hover:scale-110 transition-transform duration-200">
                    {step.step}
                  </div>
                  <div className="w-8 h-8 bg-discord-background-elevated rounded-discord flex items-center justify-center mx-auto mb-3 text-discord-brand-primary">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="discord-text-heading-3 text-discord-text-primary mb-2 group-hover:text-discord-brand-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-discord-text-secondary mb-4 text-sm">
                    {step.description}
                  </p>
                  <Link
                    href={step.link}
                    target={step.external ? '_blank' : undefined}
                    rel={step.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-discord-text-link hover:text-discord-brand-primary font-medium transition-colors text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources and Tools */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="discord-text-heading-2">
              Resources & Tools
            </CardTitle>
            <CardDescription>
              Everything you need to contribute effectively to OpenLaunch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {resources.map((resource, index) => (
                <Link
                  key={resource.title}
                  href={resource.link}
                  className="group block"
                >
                  <div className="p-4 rounded-discord bg-discord-background-elevated hover:bg-discord-background-modifier-hover transition-colors border border-discord-interactive-normal/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-discord-brand-primary/10 rounded-discord flex items-center justify-center text-discord-brand-primary group-hover:bg-discord-brand-primary group-hover:text-discord-text-primary transition-colors">
                        <resource.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-discord-text-primary group-hover:text-discord-brand-primary transition-colors">
                            {resource.title}
                          </h4>
                          <span className="px-2 py-0.5 bg-discord-interactive-normal/30 text-discord-text-muted text-xs rounded">
                            {resource.category}
                          </span>
                        </div>
                        <p className="text-sm text-discord-text-secondary">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Learning Resources Section */}
            <div id="learning-resources" className="border-t border-discord-interactive-normal/20 pt-8">
              <h3 className="discord-text-heading-3 text-discord-text-primary mb-6">
                📚 Learning Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-discord-text-primary mb-3">Frontend Development</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        React Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Official React docs and tutorials</span>
                    </li>
                    <li>
                      <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Next.js Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Complete Next.js framework guide</span>
                    </li>
                    <li>
                      <Link href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Tailwind CSS
                      </Link>
                      <span className="text-discord-text-muted"> - Utility-first CSS framework</span>
                    </li>
                    <li>
                      <Link href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        TypeScript Handbook
                      </Link>
                      <span className="text-discord-text-muted"> - Learn TypeScript fundamentals</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-discord-text-primary mb-3">Backend Development</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="https://nodejs.org/en/docs/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Node.js Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Server-side JavaScript runtime</span>
                    </li>
                    <li>
                      <Link href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Python Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Official Python language reference</span>
                    </li>
                    <li>
                      <Link href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        PostgreSQL Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Advanced open source database</span>
                    </li>
                    <li>
                      <Link href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Docker Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Containerization platform</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-discord-text-primary mb-3">Development Tools</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Git Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Version control system</span>
                    </li>
                    <li>
                      <Link href="https://docs.github.com/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        GitHub Docs
                      </Link>
                      <span className="text-discord-text-muted"> - Collaboration and code hosting</span>
                    </li>
                    <li>
                      <Link href="https://code.visualstudio.com/docs" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        VS Code Documentation
                      </Link>
                      <span className="text-discord-text-muted"> - Popular code editor</span>
                    </li>
                    <li>
                      <Link href="https://jestjs.io/docs/getting-started" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Jest Testing Framework
                      </Link>
                      <span className="text-discord-text-muted"> - JavaScript testing framework</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-discord-text-primary mb-3">Design & UX</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="https://www.figma.com/resources/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Figma Resources
                      </Link>
                      <span className="text-discord-text-muted"> - Design and prototyping tool</span>
                    </li>
                    <li>
                      <Link href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        WCAG Guidelines
                      </Link>
                      <span className="text-discord-text-muted"> - Web accessibility standards</span>
                    </li>
                    <li>
                      <Link href="https://material.io/design" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Material Design
                      </Link>
                      <span className="text-discord-text-muted"> - Google's design system</span>
                    </li>
                    <li>
                      <Link href="https://www.nngroup.com/articles/" target="_blank" rel="noopener noreferrer" className="text-discord-text-link hover:text-discord-brand-primary transition-colors">
                        Nielsen Norman Group
                      </Link>
                      <span className="text-discord-text-muted"> - UX research and guidelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Project-Specific Setup Guides */}
            <div className="border-t border-discord-interactive-normal/20 pt-8 mt-8">
              <h3 className="discord-text-heading-3 text-discord-text-primary mb-6">
                🛠️ Project-Specific Setup Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-discord-text-primary mb-3 flex items-center gap-2">
                      <WrenchScrewdriverIcon className="w-5 h-5 text-discord-brand-primary" />
                      Local Development Setup
                    </h4>
                    <ol className="space-y-2 text-sm text-discord-text-secondary">
                      <li>1. Fork the repository on GitHub</li>
                      <li>2. Clone your fork locally</li>
                      <li>3. Install Node.js (v18+) and npm</li>
                      <li>4. Run <code className="bg-discord-background-modifier-hover px-1 rounded text-discord-text-primary">npm install</code></li>
                      <li>5. Copy <code className="bg-discord-background-modifier-hover px-1 rounded text-discord-text-primary">.env.example</code> to <code className="bg-discord-background-modifier-hover px-1 rounded text-discord-text-primary">.env.local</code></li>
                      <li>6. Start development server with <code className="bg-discord-background-modifier-hover px-1 rounded text-discord-text-primary">npm run dev</code></li>
                    </ol>
                    <Button asChild variant="ghost" size="sm" className="mt-4">
                      <Link href="/docs/onboarding#development-setup">
                        View Full Guide →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-discord-text-primary mb-3 flex items-center gap-2">
                      <CodeBracketIcon className="w-5 h-5 text-discord-brand-primary" />
                      Making Your First PR
                    </h4>
                    <ol className="space-y-2 text-sm text-discord-text-secondary">
                      <li>1. Create a new branch for your feature</li>
                      <li>2. Make your changes following our style guide</li>
                      <li>3. Write tests for new functionality</li>
                      <li>4. Run <code className="bg-discord-background-modifier-hover px-1 rounded text-discord-text-primary">npm test</code> to ensure tests pass</li>
                      <li>5. Commit with a descriptive message</li>
                      <li>6. Push to your fork and create a pull request</li>
                    </ol>
                    <Button asChild variant="ghost" size="sm" className="mt-4">
                      <Link href="https://github.com/PraiseTechzw/OpenLaunch/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                        View PR Template →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8">
            <h2 className="discord-text-heading-2 text-discord-text-primary mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-discord-text-secondary mb-8 max-w-2xl mx-auto">
              Join hundreds of contributors who are building the future of collaborative 
              software development. Your contribution, no matter how small, makes a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="primary">
                <Link
                  href="https://github.com/PraiseTechzw/OpenLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeBracketIcon className="w-5 h-5 mr-2" />
                  View on GitHub
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/docs/onboarding">
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  Getting Started
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}