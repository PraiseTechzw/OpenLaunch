'use client'

import Link from 'next/link'
import { MapPin, Calendar, Users, Clock, Globe, Filter, Search, Plus, ExternalLink, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

interface Meetup {
  id: number
  title: string
  description: string
  organizer: string
  organizerAvatar?: string
  date: Date
  location: {
    city: string
    country: string
    venue: string
    address: string
    isVirtual: boolean
  }
  attendees: number
  maxAttendees: number
  topics: string[]
  meetupUrl?: string
  isRecurring: boolean
  frequency?: string
}

interface MeetupGroup {
  id: number
  name: string
  city: string
  country: string
  members: number
  description: string
  organizer: string
  meetupUrl: string
  nextMeetup?: Date
  isActive: boolean
}

export default function MeetupsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const upcomingMeetups: Meetup[] = [
    {
      id: 1,
      title: 'OpenLaunch SF: Building Developer Communities',
      description: 'Join us for an evening of networking and discussions about building thriving developer communities. We\'ll share experiences, challenges, and best practices.',
      organizer: 'Sarah Chen',
      date: new Date('2026-02-20T18:30:00'),
      location: {
        city: 'San Francisco',
        country: 'USA',
        venue: 'GitHub HQ',
        address: '88 Colin P Kelly Jr St, San Francisco, CA 94107',
        isVirtual: false
      },
      attendees: 45,
      maxAttendees: 80,
      topics: ['Community Building', 'Open Source', 'Networking'],
      meetupUrl: 'https://meetup.com/openlaunch-sf',
      isRecurring: true,
      frequency: 'Monthly'
    },
    {
      id: 2,
      title: 'Virtual Coffee Chat: Contributing to Open Source',
      description: 'A casual virtual meetup for developers interested in making their first open source contributions. Bring your questions and let\'s learn together!',
      organizer: 'Alex Thompson',
      date: new Date('2026-02-25T15:00:00'),
      location: {
        city: 'Virtual',
        country: 'Global',
        venue: 'Zoom',
        address: 'Online Event',
        isVirtual: true
      },
      attendees: 120,
      maxAttendees: 200,
      topics: ['Open Source', 'Beginner Friendly', 'Q&A'],
      meetupUrl: 'https://meetup.com/openlaunch-virtual',
      isRecurring: true,
      frequency: 'Bi-weekly'
    },
    {
      id: 3,
      title: 'OpenLaunch London: Tech for Good Hacknight',
      description: 'Monthly hacknight focused on building technology solutions for social impact. All skill levels welcome - we\'ll have mentors available to help!',
      organizer: 'Emma Wilson',
      date: new Date('2026-03-05T18:00:00'),
      location: {
        city: 'London',
        country: 'UK',
        venue: 'TechHub London',
        address: '20 Ropemaker St, London EC2Y 9AR, UK',
        isVirtual: false
      },
      attendees: 32,
      maxAttendees: 60,
      topics: ['Social Impact', 'Hackathon', 'Collaboration'],
      meetupUrl: 'https://meetup.com/openlaunch-london',
      isRecurring: true,
      frequency: 'Monthly'
    },
    {
      id: 4,
      title: 'OpenLaunch NYC: Women in Open Source',
      description: 'A supportive meetup for women and non-binary individuals in tech to discuss open source contributions, career growth, and community building.',
      organizer: 'Dr. Aisha Patel',
      date: new Date('2026-03-12T19:00:00'),
      location: {
        city: 'New York',
        country: 'USA',
        venue: 'WeWork Union Square',
        address: '115 E 23rd St, New York, NY 10010',
        isVirtual: false
      },
      attendees: 28,
      maxAttendees: 50,
      topics: ['Diversity & Inclusion', 'Career Growth', 'Mentorship'],
      meetupUrl: 'https://meetup.com/openlaunch-nyc',
      isRecurring: true,
      frequency: 'Monthly'
    }
  ]

  const meetupGroups: MeetupGroup[] = [
    {
      id: 1,
      name: 'OpenLaunch San Francisco',
      city: 'San Francisco',
      country: 'USA',
      members: 245,
      description: 'Bay Area developers passionate about open source and community building.',
      organizer: 'Sarah Chen',
      meetupUrl: 'https://meetup.com/openlaunch-sf',
      nextMeetup: new Date('2026-02-20T18:30:00'),
      isActive: true
    },
    {
      id: 2,
      name: 'OpenLaunch Virtual Global',
      city: 'Virtual',
      country: 'Global',
      members: 892,
      description: 'Global community of developers meeting virtually to share knowledge and collaborate.',
      organizer: 'Alex Thompson',
      meetupUrl: 'https://meetup.com/openlaunch-virtual',
      nextMeetup: new Date('2026-02-25T15:00:00'),
      isActive: true
    },
    {
      id: 3,
      name: 'OpenLaunch London',
      city: 'London',
      country: 'UK',
      members: 156,
      description: 'London-based developers focused on tech for good and social impact projects.',
      organizer: 'Emma Wilson',
      meetupUrl: 'https://meetup.com/openlaunch-london',
      nextMeetup: new Date('2026-03-05T18:00:00'),
      isActive: true
    },
    {
      id: 4,
      name: 'OpenLaunch New York',
      city: 'New York',
      country: 'USA',
      members: 189,
      description: 'NYC developers building inclusive communities and supporting underrepresented groups in tech.',
      organizer: 'Dr. Aisha Patel',
      meetupUrl: 'https://meetup.com/openlaunch-nyc',
      nextMeetup: new Date('2026-03-12T19:00:00'),
      isActive: true
    },
    {
      id: 5,
      name: 'OpenLaunch Berlin',
      city: 'Berlin',
      country: 'Germany',
      members: 78,
      description: 'Berlin tech community exploring open source projects and European tech initiatives.',
      organizer: 'Klaus Mueller',
      meetupUrl: 'https://meetup.com/openlaunch-berlin',
      isActive: true
    },
    {
      id: 6,
      name: 'OpenLaunch Toronto',
      city: 'Toronto',
      country: 'Canada',
      members: 134,
      description: 'Canadian developers passionate about open source and building inclusive tech communities.',
      organizer: 'Marie Dubois',
      meetupUrl: 'https://meetup.com/openlaunch-toronto',
      isActive: true
    }
  ]

  const locations = ['all', 'virtual', 'usa', 'uk', 'germany', 'canada']

  const filteredMeetups = upcomingMeetups.filter(meetup => {
    const matchesLocation = selectedLocation === 'all' || 
                           (selectedLocation === 'virtual' && meetup.location.isVirtual) ||
                           meetup.location.country.toLowerCase().includes(selectedLocation) ||
                           meetup.location.city.toLowerCase().includes(selectedLocation)
    const matchesSearch = meetup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meetup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meetup.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLocation && matchesSearch
  })

  const filteredGroups = meetupGroups.filter(group => {
    const matchesLocation = selectedLocation === 'all' || 
                           (selectedLocation === 'virtual' && group.city === 'Virtual') ||
                           group.country.toLowerCase().includes(selectedLocation) ||
                           group.city.toLowerCase().includes(selectedLocation)
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.city.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLocation && matchesSearch
  })

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-discord bg-discord-brand-primary/10 border border-discord-brand-primary/20 mb-6">
            <Coffee className="w-4 h-4 mr-2 text-discord-brand-primary" />
            <span className="text-sm font-medium text-discord-brand-primary">Local Communities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-discord-text-primary mb-6">
            Local{' '}
            <span className="bg-gradient-to-r from-discord-brand-primary to-discord-brand-secondary bg-clip-text text-transparent">
              Meetups
            </span>
          </h1>
          <p className="text-xl text-discord-text-secondary max-w-3xl mx-auto leading-relaxed">
            Connect with fellow developers in your city or join our virtual events. 
            Build relationships, share knowledge, and grow together as a community.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedLocation === 'all' ? 'primary' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedLocation('all')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    All Locations
                  </Button>
                  <Button 
                    variant={selectedLocation === 'virtual' ? 'primary' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedLocation('virtual')}
                  >
                    Virtual
                  </Button>
                  <Button 
                    variant={selectedLocation === 'usa' ? 'ghost' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedLocation('usa')}
                  >
                    USA
                  </Button>
                  <Button 
                    variant={selectedLocation === 'uk' ? 'ghost' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedLocation('uk')}
                  >
                    UK
                  </Button>
                  <Button 
                    variant={selectedLocation === 'germany' ? 'ghost' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedLocation('germany')}
                  >
                    Germany
                  </Button>
                  <Button 
                    variant={selectedLocation === 'canada' ? 'ghost' : 'ghost'} 
                    size="sm"
                    onClick={() => setSelectedLocation('canada')}
                  >
                    Canada
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-discord-text-muted" />
                  <input
                    type="text"
                    placeholder="Search meetups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-discord-background-primary border border-discord-interactive-normal rounded-discord text-discord-text-primary placeholder-discord-text-muted focus:border-discord-brand-primary focus:outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetups */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="w-5 h-5 text-discord-brand-primary" />
            <h2 className="text-2xl font-bold text-discord-text-primary">Upcoming Meetups</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMeetups.map((meetup) => (
              <Card key={meetup.id} variant="interactive" className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{meetup.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        {meetup.location.isVirtual ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-discord-brand-primary/10 text-discord-brand-primary border border-discord-brand-primary/20">
                            Virtual
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-discord-brand-secondary/10 text-discord-brand-secondary border border-discord-brand-secondary/20">
                            In-Person
                          </span>
                        )}
                        {meetup.isRecurring && (
                          <span className="text-xs text-discord-text-muted">
                            {meetup.frequency}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription>{meetup.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Organizer */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-discord-brand-primary rounded-full flex items-center justify-center text-discord-text-primary font-semibold text-sm">
                        {meetup.organizerAvatar ? (
                          <img src={meetup.organizerAvatar} alt={meetup.organizer} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          meetup.organizer.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-discord-text-primary text-sm">{meetup.organizer}</p>
                        <p className="text-xs text-discord-text-muted">Organizer</p>
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="flex items-center gap-4 text-sm text-discord-text-secondary">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{meetup.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{meetup.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-2 text-sm text-discord-text-secondary">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{meetup.location.venue}</p>
                        <p className="text-xs text-discord-text-muted">
                          {meetup.location.city}, {meetup.location.country}
                        </p>
                        {!meetup.location.isVirtual && (
                          <p className="text-xs text-discord-text-muted">{meetup.location.address}</p>
                        )}
                      </div>
                    </div>

                    {/* Attendees */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-discord-text-secondary">
                        <Users className="w-4 h-4" />
                        <span>{meetup.attendees}/{meetup.maxAttendees} attending</span>
                      </div>
                      <div className="w-24 bg-discord-background-primary rounded-full h-2">
                        <div 
                          className="bg-discord-brand-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(meetup.attendees / meetup.maxAttendees) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Topics */}
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {meetup.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-discord-background-modifier-hover text-xs rounded text-discord-text-secondary"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RSVP Button */}
                    <div className="pt-4">
                      {meetup.meetupUrl ? (
                        <Link href={meetup.meetupUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            RSVP on Meetup.com
                          </Button>
                        </Link>
                      ) : (
                        <Button className="w-full">
                          RSVP
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meetup Groups */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Users className="w-5 h-5 text-discord-brand-secondary" />
            <h2 className="text-2xl font-bold text-discord-text-primary">Meetup Groups</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} variant="interactive">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-discord-text-muted" />
                        <span className="text-sm text-discord-text-muted">
                          {group.city}, {group.country}
                        </span>
                      </div>
                    </div>
                    {group.isActive && (
                      <div className="w-2 h-2 bg-discord-status-success rounded-full"></div>
                    )}
                  </div>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-discord-text-secondary">Members:</span>
                      <span className="text-discord-text-primary font-medium">{group.members}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-discord-text-secondary">Organizer:</span>
                      <span className="text-discord-text-primary font-medium">{group.organizer}</span>
                    </div>
                    {group.nextMeetup && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-discord-text-secondary">Next meetup:</span>
                        <span className="text-discord-text-primary font-medium">
                          {group.nextMeetup.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <Link href={group.meetupUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="sm" className="w-full mt-4">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Join Group
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-discord-brand-primary/5 to-discord-brand-secondary/5" />
            
            <CardContent className="relative z-10 p-12">
              <Plus className="w-16 h-16 text-discord-brand-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-discord-text-primary mb-4">Start a Local Meetup</h2>
              <p className="text-discord-text-secondary mb-8 max-w-2xl mx-auto">
                Don't see a meetup in your area? We'd love to help you start one! 
                We provide resources, support, and connections to help you build a thriving local community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Start a Meetup
                </Button>
                <Link href="/community/contributors">
                  <Button variant="secondary" size="lg">
                    <Coffee className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 text-sm text-discord-text-muted">
                <p>We currently have active meetup groups in 6+ cities worldwide</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}