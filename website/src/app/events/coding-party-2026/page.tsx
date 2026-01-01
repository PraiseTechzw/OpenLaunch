import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, MapPin, Users, Trophy, Zap, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coding Party 2026 - OpenLaunch',
  description: 'Join our flagship annual event - Coding Party 2026. A celebration of open source collaboration.',
}

export default function CodingParty2026Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 mb-6">
            <Trophy className="w-4 h-4 text-primary-400 mr-2" />
            <span className="text-sm font-medium text-primary-300">Flagship Event</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 bg-clip-text text-transparent">
              Coding Party 2026
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Our flagship annual event celebrating open source collaboration, innovation, 
            and community. Join developers worldwide for an unforgettable experience.
          </p>
          
          {/* Event Status */}
          <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-green-300 font-medium">Event Planning in Progress</span>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center">
            <Calendar className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">When</h3>
            <p className="text-slate-300">December 2026</p>
            <p className="text-sm text-slate-400">Exact dates TBA</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center">
            <MapPin className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Where</h3>
            <p className="text-slate-300">Global Virtual Event</p>
            <p className="text-sm text-slate-400">+ Regional meetups</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center">
            <Users className="w-12 h-12 text-accent-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Who</h3>
            <p className="text-slate-300">Open to Everyone</p>
            <p className="text-sm text-slate-400">All skill levels welcome</p>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Event Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "48-Hour Hackathon",
                description: "Build amazing projects with teams from around the world. Prizes for innovation, impact, and collaboration.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Users,
                title: "Keynote Speakers",
                description: "Learn from industry leaders, open source maintainers, and successful entrepreneurs.",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Heart,
                title: "Community Workshops",
                description: "Hands-on sessions covering everything from Git basics to advanced deployment strategies.",
                color: "from-pink-500 to-red-500"
              },
              {
                icon: Trophy,
                title: "Awards & Recognition",
                description: "Celebrate outstanding contributors, innovative projects, and community champions.",
                color: "from-purple-500 to-indigo-500"
              }
            ].map((highlight, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <div className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-xl flex items-center justify-center mb-4`}>
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{highlight.title}</h3>
                <p className="text-slate-300">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Preview */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Tentative Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-500/10 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-primary-300">Day 1</h3>
                <p className="text-sm text-slate-400">Opening & Workshops</p>
              </div>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• Opening Ceremony</li>
                <li>• Keynote Presentations</li>
                <li>• Community Workshops</li>
                <li>• Networking Sessions</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-500/10 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-secondary-300">Day 2</h3>
                <p className="text-sm text-slate-400">Hackathon & Building</p>
              </div>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• Hackathon Kickoff</li>
                <li>• Team Formation</li>
                <li>• Coding Sessions</li>
                <li>• Mentor Office Hours</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-accent-500/10 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-accent-300">Day 3</h3>
                <p className="text-sm text-slate-400">Demos & Awards</p>
              </div>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• Project Presentations</li>
                <li>• Community Voting</li>
                <li>• Awards Ceremony</li>
                <li>• Closing Celebration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 border border-primary-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-6">
            Be the first to know when registration opens and get exclusive updates 
            about Coding Party 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/community/discord"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Join Discord for Updates
            </Link>
            <Link 
              href="https://github.com/PraiseTechzw/OpenLaunch"
              className="inline-flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Follow on GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}