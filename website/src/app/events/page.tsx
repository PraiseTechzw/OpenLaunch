import Link from 'next/link'
import { 
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  VideoCameraIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline'

const upcomingEvents = [
  {
    title: 'Coding Party 2026 Kickoff',
    date: '2026-01-15',
    time: '18:00 UTC',
    type: 'Virtual',
    description: 'Join us for the official launch of Coding Party 2026! Meet the community, learn about our goals, and start planning your contributions.',
    attendees: 150,
    status: 'upcoming',
    registrationLink: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
  },
  {
    title: 'Frontend Architecture Workshop',
    date: '2026-01-22',
    time: '16:00 UTC',
    type: 'Virtual',
    description: 'Deep dive into our frontend architecture decisions, component design patterns, and development workflow.',
    attendees: 75,
    status: 'upcoming',
    registrationLink: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
  },
  {
    title: 'Open Source Contribution 101',
    date: '2026-01-29',
    time: '19:00 UTC',
    type: 'Virtual',
    description: 'Perfect for beginners! Learn how to make your first contribution to OpenLaunch and open source in general.',
    attendees: 200,
    status: 'upcoming',
    registrationLink: 'https://github.com/PraiseTechzw/OpenLaunch/discussions',
  },
]

const pastEvents = [
  {
    title: 'Community Planning Session',
    date: '2025-12-15',
    type: 'Virtual',
    description: 'Initial planning session where we defined our vision and roadmap for 2026.',
    attendees: 45,
    status: 'completed',
    recordingLink: '#',
  },
]

const eventTypes = [
  {
    name: 'Coding Parties',
    description: 'Collaborative coding sessions where we build features together',
    icon: CodeBracketIcon,
    frequency: 'Weekly',
    color: 'bg-blue-500',
  },
  {
    name: 'Community Calls',
    description: 'Regular check-ins to discuss progress, challenges, and decisions',
    icon: VideoCameraIcon,
    frequency: 'Bi-weekly',
    color: 'bg-green-500',
  },
  {
    name: 'Workshops',
    description: 'Technical deep-dives and learning sessions on specific topics',
    icon: UserGroupIcon,
    frequency: 'Monthly',
    color: 'bg-purple-500',
  },
  {
    name: 'Hackathons',
    description: 'Intensive building sessions to create new features or applications',
    icon: CalendarDaysIcon,
    frequency: 'Quarterly',
    color: 'bg-orange-500',
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our regular events to connect with the community, learn new skills, 
            and contribute to exciting projects together.
          </p>
        </div>

        {/* Event Types */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {eventTypes.map((type) => (
            <div
              key={type.name}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                  <type.icon className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.frequency}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {type.description}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">
                        {event.title}
                      </h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {event.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {event.type}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {event.attendees} registered
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="lg:ml-6">
                    <Link
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Past Events
          </h2>
          <div className="space-y-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">
                        {event.title}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                        {event.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {event.type}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {event.attendees} attended
                      </div>
                    </div>
                    
                    <p className="text-gray-700">
                      {event.description}
                    </p>
                  </div>
                  
                  {event.recordingLink && (
                    <div className="lg:ml-6 mt-4 lg:mt-0">
                      <Link
                        href={event.recordingLink}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <VideoCameraIcon className="w-4 h-4 mr-2" />
                        View Recording
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Don't Miss Out!
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Stay updated on all our community events. Join our discussions to get notified 
            about upcoming events and participate in planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/PraiseTechzw/OpenLaunch/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Join Discussions
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}