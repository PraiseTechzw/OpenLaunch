'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users, Clock, Filter, Search, Star, Trophy } from 'lucide-react'
import { EventCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Event {
  id: number
  title: string
  description: string
  date: Date
  location: string
  type: 'workshop' | 'meetup' | 'coding-party' | 'conference'
  attendees: number
  maxAttendees?: number
  featured: boolean
  registrationUrl?: string
}

export default function EventsPage() {
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Coding Party 2026 Kickoff',
      description: 'Join us for the official launch of Coding Party 2026! Meet the community, learn about projects, and start contributing.',
      date: new Date('2026-03-15T10:00:00'),
      location: 'Virtual Event',
      attendees: 500,
      maxAttendees: 1000,
      type: 'coding-party',
      featured: true,
      registrationUrl: '/events/coding-party-2026'
    },
    {
      id: 2,
      title: 'Open Source Workshop Series',
      description: 'Weekly workshops covering Git, GitHub, and open source best practices for beginners.',
      date: new Date('2026-02-08T14:00:00'),
      location: 'Virtual Event',
      attendees: 50,
      maxAttendees: 100,
      type: 'workshop',
      featured: false,
      registrationUrl: '/events/workshops'
    },
    {
      id: 3,
      title: 'Community Meetup - San Francisco',
      description: 'Local meetup for Bay Area contributors. Networking, project demos, and collaborative coding.',
      date: new Date('2026-04-20T18:00:00'),
      location: 'San Francisco, CA',
      attendees: 75,
      maxAttendees: 100,
      type: 'meetup',
      featured: false,
      registrationUrl: '/events/meetups'
    },
    {
      id: 4,
      title: 'Hackathon: Build for Good',
      description: '48-hour hackathon focused on creating solutions for social impact. Prizes and mentorship included.',
      date: new Date('2026-05-10T00:00:00'),
      location: 'Virtual Event',
      attendees: 200,
      maxAttendees: 500,
      type: 'conference',
      featured: true
    }
  ]

  const pastEvents = [
    {
      title: 'OpenLaunch Community Launch',
      date: 'January 1, 2026',
      attendees: 150,
      description: 'The official launch of the OpenLaunch community'
    },
    {
      title: 'First Contributors Meetup',
      date: 'February 1, 2026',
      attendees: 75,
      description: 'Welcoming our first wave of contributors'
    }
  ]

  return (
    <div className="min-h-screen bg-discord-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-discord bg-discord-brand-primary/10 border border-discord-brand-primary/20 mb-6">
            <Calendar className="w-4 h-4 mr-2 text-discord-brand-primary" />
            <span className="text-sm font-medium text-discord-brand-primary">Community Events</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-discord-text-primary mb-6">
            Upcoming{' '}
            <span className="bg-gradient-to-r from-discord-brand-primary to-discord-brand-secondary bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-discord-text-secondary max-w-3xl mx-auto leading-relaxed">
            Join our community events to learn, network, and contribute to amazing projects. 
            From workshops to hackathons, there's something for everyone.
          </p>
        </div>

        {/* Event Filters */}
        <div className="mb-12">
          <div className="bg-discord-background-secondary rounded-discord-lg p-6 border border-discord-background-elevated">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" className="text-discord-text-secondary hover:text-discord-text-primary">
                  <Filter className="w-4 h-4 mr-2" />
                  All Events
                </Button>
                <Button variant="ghost" size="sm" className="text-discord-text-secondary hover:text-discord-text-primary">
                  Workshops
                </Button>
                <Button variant="ghost" size="sm" className="text-discord-text-secondary hover:text-discord-text-primary">
                  Meetups
                </Button>
                <Button variant="ghost" size="sm" className="text-discord-text-secondary hover:text-discord-text-primary">
                  Conferences
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-discord-text-muted" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 bg-discord-background-primary border border-discord-interactive-normal rounded-discord text-discord-text-primary placeholder-discord-text-muted focus:border-discord-brand-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-5 h-5 text-discord-brand-accent" />
            <h2 className="text-2xl font-bold text-discord-text-primary">Featured Events</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.filter(event => event.featured).map((event) => (
              <div key={event.id} className="relative">
                <EventCard
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  location={event.location}
                  type={event.type}
                  attendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                  className="h-full"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-discord-brand-accent text-discord-text-primary px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                </div>
                {event.registrationUrl && (
                  <div className="mt-4">
                    <Link href={event.registrationUrl}>
                      <Button className="w-full">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-discord-text-primary mb-8">All Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="relative">
                <EventCard
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  location={event.location}
                  type={event.type}
                  attendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                />
                {event.registrationUrl && (
                  <div className="mt-4">
                    <Link href={event.registrationUrl}>
                      <Button variant="secondary" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-discord-background-secondary rounded-discord-lg p-8 border border-discord-background-elevated mb-16">
          <h2 className="text-2xl font-bold text-discord-text-primary mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="p-4 bg-discord-background-primary rounded-discord border border-discord-interactive-normal">
                <h3 className="font-semibold text-discord-text-primary mb-2">{event.title}</h3>
                <p className="text-discord-text-secondary text-sm mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm text-discord-text-muted">
                  <span>{event.date}</span>
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-discord-background-secondary rounded-discord-lg p-8 border border-discord-background-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-discord-brand-primary/5 to-discord-brand-secondary/5" />
            
            <div className="relative z-10">
              <Trophy className="w-12 h-12 text-discord-brand-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-discord-text-primary mb-6">
                Want to Host an Event?
              </h2>
              <p className="text-discord-text-secondary mb-8 max-w-2xl mx-auto">
                We're always looking for community members to host workshops, meetups, 
                and other events. Get in touch if you'd like to organize something!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/community/contributors">
                  <Button variant="secondary">
                    Join Community
                  </Button>
                </Link>
                <Link href="mailto:events@openlaunch.org">
                  <Button>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}