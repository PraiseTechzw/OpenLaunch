import { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, Users, Zap, Shield, Heart, Gamepad2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Discord Community - OpenLaunch',
  description: 'Join our Discord server for real-time collaboration and community support',
}

export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Gamepad2 className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-indigo-300">Discord Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join Our Discord
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Connect with fellow developers, get real-time help, and be part of our 
            growing community on Discord.
          </p>
          
          {/* Discord Join Button */}
          <Link 
            href="https://discord.gg/openlaunch" 
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Gamepad2 className="w-5 h-5 mr-3" />
            Join Discord Server
          </Link>
        </div>

        {/* Discord Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: MessageCircle,
              title: "Real-time Chat",
              description: "Get instant help, share ideas, and collaborate with the community",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: Users,
              title: "Developer Channels",
              description: "Dedicated channels for different programming languages and topics",
              color: "from-green-500 to-green-600"
            },
            {
              icon: Zap,
              title: "Live Events",
              description: "Join coding sessions, workshops, and community events",
              color: "from-yellow-500 to-yellow-600"
            },
            {
              icon: Shield,
              title: "Moderated Community",
              description: "Safe, welcoming environment with clear community guidelines",
              color: "from-red-500 to-red-600"
            },
            {
              icon: Heart,
              title: "Mentorship",
              description: "Connect with experienced developers willing to help newcomers",
              color: "from-pink-500 to-pink-600"
            },
            {
              icon: Gamepad2,
              title: "Fun & Games",
              description: "Coding challenges, trivia, and community games to build connections",
              color: "from-purple-500 to-purple-600"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Channel Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Server Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 text-primary-400 mr-2" />
                General Channels
              </h3>
              <div className="space-y-2">
                {[
                  "# welcome - New member introductions",
                  "# announcements - Important updates",
                  "# general - Open discussions",
                  "# showcase - Share your projects",
                  "# feedback - Suggestions and ideas"
                ].map((channel, i) => (
                  <div key={i} className="bg-slate-700/30 rounded-lg p-3 text-slate-300 font-mono text-sm">
                    {channel}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 text-secondary-400 mr-2" />
                Development Channels
              </h3>
              <div className="space-y-2">
                {[
                  "# frontend - React, Next.js, UI/UX",
                  "# backend - APIs, databases, servers",
                  "# mobile - React Native, Flutter",
                  "# devops - Deployment, CI/CD",
                  "# help - Get coding assistance"
                ].map((channel, i) => (
                  <div key={i} className="bg-slate-700/30 rounded-lg p-3 text-slate-300 font-mono text-sm">
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community Guidelines Preview */}
        <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 border border-primary-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Community Guidelines</h2>
          <p className="text-slate-300 mb-6">
            Our Discord follows the same community guidelines as our main platform. 
            Be respectful, helpful, and inclusive.
          </p>
          <Link 
            href="/community/code-of-conduct"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
          >
            Read Full Guidelines
            <MessageCircle className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}