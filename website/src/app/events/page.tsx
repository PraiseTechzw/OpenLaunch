import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDaysIcon, MapPinIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Events - OpenLaunch',
  description: 'Join our upcoming events and community gatherings',
}

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Coding Party 2026 Kickoff',
      description: 'Join us for the official launch of Coding Party 2026! Meet the community, learn about projects, and start contributing.',
      date: 'March 15, 2026',
      time: '10:00 AM - 6:00 PM PST',
      location: 'Virtual Event',
      attendees: 500,
      type: 'Conference',
      featured: true
    },
    {
      id: 2,
      title: 'Open Source Workshop Series',
      description: 'Weekly workshops covering Git, GitHub, and open source best practices for beginners.',
      date: 'Every Saturday',
      time: '2:00 PM - 4:00 PM PST',
      location: 'Virtual Event',
      attendees: 50,
      type: 'Workshop',
      featured: false
    },
    {
      id: 3,
      title: 'Community Meetup - San Francisco',
      description: 'Local meetup for Bay Area contributors. Networking, project demos, and collaborative coding.',
      date: 'April 20, 2026',
      time: '6:00 PM - 9:00 PM PST',
      location: 'San Francisco, CA',
      attendees: 75,
      type: 'Meetup',
      featured: false
    },
    {
      id: 4,
      title: 'Hackathon: Build for Good',
      description: '48-hour hackathon focused on creating solutions for social impact. Prizes and mentorship included.',
      date: 'May 10-12, 2026',
      time: 'All Weekend',
      location: 'Virtual Event',
      attendees: 200,
      type: 'Hackathon',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
            <CalendarDaysIcon className="w-4 h-4 mr-2 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Community Events</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Upcoming{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our community events to learn, network, and contribute to amazing projects. 
            From workshops to hackathons, there's something for everyone.
          </p>
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.filter(event => event.featured).map((event) => (
              <div key={event.id} className="glass-card p-8 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-medium">
                      {event.type}
                    </span>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-3 text-primary-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-3 text-primary-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <UsersIcon className="w-4 h-4 mr-3 text-primary-500" />
                      {event.attendees} expected attendees
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="glass-card p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    event.type === 'Conference' ? 'bg-primary-100 text-primary-700' :
                    event.type === 'Workshop' ? 'bg-secondary-100 text-secondary-700' :
                    event.type === 'Meetup' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {event.type}
                  </span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    {event.attendees}
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{event.date}</span>
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 rounded-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Want to Host an Event?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're always looking for community members to host workshops, meetups, 
                and other events. Get in touch if you'd like to organize something!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/community/contributors"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 border border-primary-200/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Join Community
                </Link>
                <Link
                  href="mailto:events@openlaunch.org"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}