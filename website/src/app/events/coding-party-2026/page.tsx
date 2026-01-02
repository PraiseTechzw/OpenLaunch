'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users, Trophy, Zap, Heart, Clock, Star, Award, Code, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Speaker {
  name: string
  title: string
  company: string
  bio: string
  avatar?: string
  topic: string
}

interface ScheduleItem {
  time: string
  title: string
  description: string
  type: 'keynote' | 'workshop' | 'break' | 'networking' | 'hackathon'
  speaker?: string
}

export default function CodingParty2026Page() {
  const speakers: Speaker[] = [
    {
      name: 'Sarah Chen',
      title: 'Senior Engineering Manager',
      company: 'GitHub',
      bio: 'Leading open source initiatives and developer experience at GitHub. Passionate about building inclusive communities.',
      topic: 'The Future of Open Source Collaboration'
    },
    {
      name: 'Marcus Rodriguez',
      title: 'CTO',
      company: 'DevTools Inc',
      bio: 'Building developer tools that empower teams worldwide. Former maintainer of popular open source projects.',
      topic: 'Scaling Open Source Projects'
    },
    {
      name: 'Dr. Aisha Patel',
      title: 'Research Scientist',
      company: 'AI Ethics Institute',
      bio: 'Researching ethical AI and its applications in open source software. Advocate for responsible technology.',
      topic: 'AI in Open Source: Opportunities and Challenges'
    }
  ]

  const schedule: ScheduleItem[] = [
    {
      time: '9:00 AM',
      title: 'Opening Ceremony',
      description: 'Welcome to Coding Party 2026! Meet the organizers and get excited for the weekend ahead.',
      type: 'keynote'
    },
    {
      time: '10:00 AM',
      title: 'Keynote: The Future of Open Source',
      description: 'Sarah Chen shares insights on where open source is heading and how we can shape its future.',
      type: 'keynote',
      speaker: 'Sarah Chen'
    },
    {
      time: '11:30 AM',
      title: 'Coffee Break & Networking',
      description: 'Connect with fellow developers and grab some refreshments.',
      type: 'break'
    },
    {
      time: '12:00 PM',
      title: 'Workshop: Git Advanced Techniques',
      description: 'Master advanced Git workflows and collaboration strategies.',
      type: 'workshop'
    },
    {
      time: '2:00 PM',
      title: 'Hackathon Kickoff',
      description: 'Form teams and start building amazing projects for social good.',
      type: 'hackathon'
    },
    {
      time: '6:00 PM',
      title: 'Day 1 Wrap-up & Social Hour',
      description: 'Relax, share progress, and enjoy some virtual socializing.',
      type: 'networking'
    }
  ]
  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-discord bg-discord-brand-accent/10 border border-discord-brand-accent/20 mb-6">
            <Trophy className="w-4 h-4 text-discord-brand-accent mr-2" />
            <span className="text-sm font-medium text-discord-brand-accent">Flagship Event</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-discord-text-primary mb-6">
            <span className="bg-gradient-to-r from-discord-brand-primary via-discord-brand-accent to-discord-brand-secondary bg-clip-text text-transparent">
              Coding Party 2026
            </span>
          </h1>
          <p className="text-xl text-discord-text-secondary max-w-3xl mx-auto mb-8">
            Our flagship annual event celebrating open source collaboration, innovation, 
            and community. Join developers worldwide for an unforgettable experience.
          </p>
          
          {/* Event Status */}
          <div className="inline-flex items-center px-6 py-3 bg-discord-status-success/10 border border-discord-status-success/30 rounded-discord mb-8">
            <div className="w-2 h-2 bg-discord-status-success rounded-full animate-pulse mr-3"></div>
            <span className="text-discord-status-success font-medium">Registration Opening Soon</span>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-discord-brand-primary hover:bg-discord-brand-primary/90">
              <Star className="w-4 h-4 mr-2" />
              Get Notified
            </Button>
            <Button variant="secondary" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card variant="elevated" className="text-center">
            <CardHeader>
              <Calendar className="w-12 h-12 text-discord-brand-primary mx-auto mb-4" />
              <CardTitle>When</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-discord-text-secondary">December 12-14, 2026</p>
              <p className="text-sm text-discord-text-muted">3 Days of Innovation</p>
            </CardContent>
          </Card>
          
          <Card variant="elevated" className="text-center">
            <CardHeader>
              <MapPin className="w-12 h-12 text-discord-brand-secondary mx-auto mb-4" />
              <CardTitle>Where</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-discord-text-secondary">Global Virtual Event</p>
              <p className="text-sm text-discord-text-muted">+ Regional meetups worldwide</p>
            </CardContent>
          </Card>
          
          <Card variant="elevated" className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-discord-brand-accent mx-auto mb-4" />
              <CardTitle>Who</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-discord-text-secondary">Open to Everyone</p>
              <p className="text-sm text-discord-text-muted">All skill levels welcome</p>
            </CardContent>
          </Card>
        </div>

        {/* Event Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-discord-text-primary mb-8 text-center">Event Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "48-Hour Hackathon",
                description: "Build amazing projects with teams from around the world. Prizes for innovation, impact, and collaboration.",
                color: "text-discord-brand-accent"
              },
              {
                icon: Users,
                title: "Keynote Speakers",
                description: "Learn from industry leaders, open source maintainers, and successful entrepreneurs.",
                color: "text-discord-brand-primary"
              },
              {
                icon: Heart,
                title: "Community Workshops",
                description: "Hands-on sessions covering everything from Git basics to advanced deployment strategies.",
                color: "text-discord-status-error"
              },
              {
                icon: Trophy,
                title: "Awards & Recognition",
                description: "Celebrate outstanding contributors, innovative projects, and community champions.",
                color: "text-discord-brand-secondary"
              }
            ].map((highlight, index) => (
              <Card key={index} variant="interactive">
                <CardHeader>
                  <div className={`w-12 h-12 bg-discord-background-elevated rounded-discord flex items-center justify-center mb-4 ${highlight.color}`}>
                    <highlight.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{highlight.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Speakers Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-discord-text-primary mb-8 text-center">Featured Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <Card key={index} variant="interactive">
                <CardHeader>
                  <div className="w-16 h-16 bg-discord-brand-primary rounded-full flex items-center justify-center text-discord-text-primary font-bold text-xl mx-auto mb-4">
                    {speaker.avatar ? (
                      <img src={speaker.avatar} alt={speaker.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      speaker.name.charAt(0)
                    )}
                  </div>
                  <CardTitle className="text-center">{speaker.name}</CardTitle>
                  <CardDescription className="text-center">
                    {speaker.title} at {speaker.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-discord-text-secondary text-sm mb-3">{speaker.bio}</p>
                  <div className="bg-discord-background-primary rounded-discord p-3">
                    <p className="text-xs text-discord-text-muted mb-1">Speaking on:</p>
                    <p className="text-sm font-medium text-discord-text-primary">{speaker.topic}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Schedule Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-discord-text-primary mb-8 text-center">Day 1 Schedule</h2>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-discord-brand-primary" />
                Friday, December 12th
              </CardTitle>
              <CardDescription>Opening day with keynotes and workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-discord-background-primary rounded-discord border border-discord-interactive-normal">
                    <div className="flex-shrink-0 w-20 text-sm font-medium text-discord-text-secondary">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-discord-text-primary">{item.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.type === 'keynote' ? 'bg-discord-brand-primary/10 text-discord-brand-primary' :
                          item.type === 'workshop' ? 'bg-discord-brand-secondary/10 text-discord-brand-secondary' :
                          item.type === 'hackathon' ? 'bg-discord-brand-accent/10 text-discord-brand-accent' :
                          item.type === 'break' ? 'bg-discord-status-info/10 text-discord-status-info' :
                          'bg-discord-interactive-normal text-discord-text-secondary'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-discord-text-secondary">{item.description}</p>
                      {item.speaker && (
                        <p className="text-xs text-discord-text-muted mt-1">Speaker: {item.speaker}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration CTA */}
        <div className="text-center">
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-discord-brand-primary/5 to-discord-brand-secondary/5" />
            
            <CardContent className="relative z-10 p-12">
              <Award className="w-16 h-16 text-discord-brand-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-discord-text-primary mb-4">Ready to Join Us?</h2>
              <p className="text-discord-text-secondary mb-8 max-w-2xl mx-auto">
                Be the first to know when registration opens and get exclusive updates 
                about Coding Party 2026. Limited spots available!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg">
                  <Star className="w-4 h-4 mr-2" />
                  Notify Me When Registration Opens
                </Button>
                <Link href="/community/discord">
                  <Button variant="secondary" size="lg">
                    <Coffee className="w-4 h-4 mr-2" />
                    Join Discord for Updates
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-8 text-sm text-discord-text-muted">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>1000+ Expected Attendees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>$50K+ in Prizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>48 Hours of Coding</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}