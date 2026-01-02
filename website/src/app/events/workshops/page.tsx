'use client'

import Link from 'next/link'
import { Calendar, Clock, Users, BookOpen, Star, Play, Download, Filter, Search, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

interface Workshop {
  id: number
  title: string
  description: string
  instructor: string
  instructorTitle: string
  date: Date
  duration: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  maxParticipants: number
  currentParticipants: number
  prerequisites: string[]
  topics: string[]
  registrationUrl?: string
  recordingUrl?: string
  isUpcoming: boolean
}

interface PastWorkshop {
  id: number
  title: string
  instructor: string
  date: string
  participants: number
  rating: number
  recordingUrl: string
  description: string
}

export default function WorkshopsPage() {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const upcomingWorkshops: Workshop[] = [
    {
      id: 1,
      title: 'Git & GitHub Fundamentals',
      description: 'Master the basics of version control with Git and collaborative development with GitHub. Perfect for beginners starting their open source journey.',
      instructor: 'Alex Thompson',
      instructorTitle: 'Senior Developer at GitHub',
      date: new Date('2026-02-15T14:00:00'),
      duration: '2 hours',
      skillLevel: 'beginner',
      maxParticipants: 50,
      currentParticipants: 32,
      prerequisites: ['Basic programming knowledge', 'Computer with Git installed'],
      topics: ['Git basics', 'GitHub workflow', 'Pull requests', 'Branching strategies'],
      registrationUrl: '#',
      isUpcoming: true
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      description: 'Dive deep into advanced React patterns including render props, higher-order components, and custom hooks for building scalable applications.',
      instructor: 'Sarah Kim',
      instructorTitle: 'React Core Team Member',
      date: new Date('2026-02-22T16:00:00'),
      duration: '3 hours',
      skillLevel: 'advanced',
      maxParticipants: 30,
      currentParticipants: 18,
      prerequisites: ['Solid React experience', 'Understanding of JavaScript ES6+', 'Node.js environment'],
      topics: ['Render props', 'HOCs', 'Custom hooks', 'Performance optimization'],
      registrationUrl: '#',
      isUpcoming: true
    },
    {
      id: 3,
      title: 'Docker for Developers',
      description: 'Learn containerization with Docker to streamline your development workflow and deployment process.',
      instructor: 'Marcus Rodriguez',
      instructorTitle: 'DevOps Engineer at CloudTech',
      date: new Date('2026-03-01T13:00:00'),
      duration: '2.5 hours',
      skillLevel: 'intermediate',
      maxParticipants: 40,
      currentParticipants: 25,
      prerequisites: ['Basic command line knowledge', 'Docker installed', 'Understanding of web applications'],
      topics: ['Docker basics', 'Containerizing apps', 'Docker Compose', 'Best practices'],
      registrationUrl: '#',
      isUpcoming: true
    },
    {
      id: 4,
      title: 'Open Source Contribution Workshop',
      description: 'Step-by-step guide to making your first open source contribution, from finding projects to submitting pull requests.',
      instructor: 'Dr. Aisha Patel',
      instructorTitle: 'Open Source Advocate',
      date: new Date('2026-03-08T15:00:00'),
      duration: '2 hours',
      skillLevel: 'beginner',
      maxParticipants: 60,
      currentParticipants: 45,
      prerequisites: ['GitHub account', 'Basic Git knowledge', 'Any programming language'],
      topics: ['Finding projects', 'Issue selection', 'Code contribution', 'Community etiquette'],
      registrationUrl: '#',
      isUpcoming: true
    }
  ]

  const pastWorkshops: PastWorkshop[] = [
    {
      id: 1,
      title: 'Introduction to TypeScript',
      instructor: 'Emma Wilson',
      date: 'January 20, 2026',
      participants: 85,
      rating: 4.8,
      recordingUrl: '#',
      description: 'Comprehensive introduction to TypeScript for JavaScript developers.'
    },
    {
      id: 2,
      title: 'API Design Best Practices',
      instructor: 'James Chen',
      date: 'January 13, 2026',
      participants: 62,
      rating: 4.9,
      recordingUrl: '#',
      description: 'Learn how to design robust and scalable APIs.'
    },
    {
      id: 3,
      title: 'Testing Strategies for Modern Apps',
      instructor: 'Lisa Garcia',
      date: 'January 6, 2026',
      participants: 78,
      rating: 4.7,
      recordingUrl: '#',
      description: 'Comprehensive testing strategies from unit to end-to-end tests.'
    }
  ]

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-discord-status-success/10 text-discord-status-success border-discord-status-success/20'
      case 'intermediate': return 'bg-discord-brand-accent/10 text-discord-brand-accent border-discord-brand-accent/20'
      case 'advanced': return 'bg-discord-status-error/10 text-discord-status-error border-discord-status-error/20'
      default: return 'bg-discord-interactive-normal text-discord-text-secondary'
    }
  }

  const filteredWorkshops = upcomingWorkshops.filter(workshop => {
    const matchesSkillLevel = selectedSkillLevel === 'all' || workshop.skillLevel === selectedSkillLevel
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSkillLevel && matchesSearch
  })

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-discord bg-discord-brand-secondary/10 border border-discord-brand-secondary/20 mb-6">
            <BookOpen className="w-4 h-4 mr-2 text-discord-brand-secondary" />
            <span className="text-sm font-medium text-discord-brand-secondary">Learning & Development</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-discord-text-primary mb-6">
            Developer{' '}
            <span className="bg-gradient-to-r from-discord-brand-secondary to-discord-brand-primary bg-clip-text text-transparent">
              Workshops
            </span>
          </h1>
          <p className="text-xl text-discord-text-secondary max-w-3xl mx-auto leading-relaxed">
            Level up your skills with hands-on workshops led by industry experts. 
            From beginner-friendly sessions to advanced deep dives.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedSkillLevel === 'all' ? 'primary' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedSkillLevel('all')}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    All Levels
                  </Button>
                  <Button 
                    variant={selectedSkillLevel === 'beginner' ? 'success' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedSkillLevel('beginner')}
                  >
                    Beginner
                  </Button>
                  <Button 
                    variant={selectedSkillLevel === 'intermediate' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedSkillLevel('intermediate')}
                  >
                    Intermediate
                  </Button>
                  <Button 
                    variant={selectedSkillLevel === 'advanced' ? 'danger' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedSkillLevel('advanced')}
                  >
                    Advanced
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-discord-text-muted" />
                  <input
                    type="text"
                    placeholder="Search workshops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-discord-background-primary border border-discord-interactive-normal rounded-discord text-discord-text-primary placeholder-discord-text-muted focus:border-discord-brand-primary focus:outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Workshops */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="w-5 h-5 text-discord-brand-primary" />
            <h2 className="text-2xl font-bold text-discord-text-primary">Upcoming Workshops</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredWorkshops.map((workshop) => (
              <Card key={workshop.id} variant="interactive" className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{workshop.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getSkillLevelColor(workshop.skillLevel)}`}>
                          {workshop.skillLevel}
                        </span>
                        <span className="text-sm text-discord-text-muted">
                          {workshop.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Instructor */}
                    <div>
                      <p className="font-medium text-discord-text-primary">{workshop.instructor}</p>
                      <p className="text-sm text-discord-text-muted">{workshop.instructorTitle}</p>
                    </div>

                    {/* Date and Time */}
                    <div className="flex items-center gap-4 text-sm text-discord-text-secondary">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{workshop.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{workshop.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-discord-text-secondary">
                        <Users className="w-4 h-4" />
                        <span>{workshop.currentParticipants}/{workshop.maxParticipants} registered</span>
                      </div>
                      <div className="w-24 bg-discord-background-primary rounded-full h-2">
                        <div 
                          className="bg-discord-brand-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(workshop.currentParticipants / workshop.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Topics */}
                    <div>
                      <p className="text-sm font-medium text-discord-text-primary mb-2">Topics covered:</p>
                      <div className="flex flex-wrap gap-1">
                        {workshop.topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-discord-background-modifier-hover text-xs rounded text-discord-text-secondary"
                          >
                            {topic}
                          </span>
                        ))}
                        {workshop.topics.length > 3 && (
                          <span className="px-2 py-1 text-xs text-discord-text-muted">
                            +{workshop.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <p className="text-sm font-medium text-discord-text-primary mb-2">Prerequisites:</p>
                      <ul className="text-xs text-discord-text-muted space-y-1">
                        {workshop.prerequisites.map((prereq, index) => (
                          <li key={index}>• {prereq}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Registration Button */}
                    <div className="pt-4">
                      {workshop.currentParticipants >= workshop.maxParticipants ? (
                        <Button disabled className="w-full">
                          Workshop Full
                        </Button>
                      ) : (
                        <Button className="w-full">
                          Register Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Workshops */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Play className="w-5 h-5 text-discord-brand-accent" />
            <h2 className="text-2xl font-bold text-discord-text-primary">Past Workshop Recordings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastWorkshops.map((workshop) => (
              <Card key={workshop.id} variant="interactive">
                <CardHeader>
                  <CardTitle className="text-lg">{workshop.title}</CardTitle>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-discord-text-secondary">Instructor:</span>
                      <span className="text-discord-text-primary font-medium">{workshop.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-discord-text-secondary">Date:</span>
                      <span className="text-discord-text-primary">{workshop.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-discord-text-secondary">Participants:</span>
                      <span className="text-discord-text-primary">{workshop.participants}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-discord-text-secondary">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-discord-brand-accent fill-current" />
                        <span className="text-discord-text-primary font-medium">{workshop.rating}</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="w-full mt-4">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Recording
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-discord-brand-secondary/5 to-discord-brand-primary/5" />
            
            <CardContent className="relative z-10 p-12">
              <Award className="w-16 h-16 text-discord-brand-secondary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-discord-text-primary mb-4">Want to Lead a Workshop?</h2>
              <p className="text-discord-text-secondary mb-8 max-w-2xl mx-auto">
                Share your expertise with the community! We're always looking for passionate developers 
                to lead workshops and help others grow their skills.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Propose a Workshop
                </Button>
                <Link href="/community/contributors">
                  <Button variant="secondary" size="lg">
                    Join as Instructor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}