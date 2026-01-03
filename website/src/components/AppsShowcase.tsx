'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { 
  Sparkles,
  ExternalLink,
  Github,
  Users,
  Star,
  Zap,
  Image as ImageIcon,
  BookOpen,
  CheckCircle,
  Rocket
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const apps = [
  {
    name: 'Versify',
    tagline: 'AI-Powered Poetry from Images',
    description: 'Transform your images into beautiful, unique poems using Google\'s Gemini AI. Built with Next.js and featuring a Discord-inspired interface.',
    longDescription: 'Versify represents our first major success - a production-ready application that demonstrates what our community can accomplish when we work together. Upload any image and watch as AI transforms it into personalized poetry.',
    status: 'Live',
    statusColor: 'bg-green-500',
    liveUrl: 'https://versify.praisetech.tech',
    githubUrl: 'https://github.com/PraiseTechzw/versify',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Google Gemini AI'],
    features: [
      'AI-powered poetry generation',
      'Discord-inspired modern UI',
      'Responsive design',
      'Fast, reliable performance',
      'Open source & community-maintained'
    ],
    stats: {
      contributors: '5+',
      stars: '25+',
      users: '100+'
    },
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
    borderGradient: 'from-purple-200 via-pink-200 to-rose-200',
    icon: Sparkles,
    image: '/images/apps/versify/versify-screenshot.png',
    achievements: [
      'First OpenLaunch production app',
      'Community-built from start to finish',
      'Real users and positive feedback',
      'Demonstrates our collaborative model'
    ]
  }
]

const upcomingApps = [
  {
    name: 'Coming Soon',
    tagline: 'Next Community Project',
    description: 'Our community is already discussing the next exciting project. Join the conversation and help shape what we build next!',
    status: 'Planning',
    statusColor: 'bg-blue-500',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    icon: Rocket
  }
]

export function AppsShowcase() {
  return (
    <div id="apps" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm15 0c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 mb-6">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-purple-700">Our First Success!</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Apps Built by{' '}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Our Community
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real applications, built collaboratively, making a real impact. 
              This is what happens when developers come together with a shared vision.
            </p>
          </motion.div>
        </div>

        {/* Featured App - Versify */}
        {apps.map((app, index) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 relative">
              {/* Gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${app.borderGradient} opacity-20 rounded-xl`} />
              <div className="absolute inset-[1px] bg-white rounded-xl" />
              
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* Left side - Content */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`w-16 h-16 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 6 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <app.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900">{app.name}</h3>
                          <p className="text-lg text-gray-600">{app.tagline}</p>
                        </div>
                      </div>
                      <Badge className={`${app.statusColor} text-white px-3 py-1`}>
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        {app.status}
                      </Badge>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                      {app.longDescription}
                    </p>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {app.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.techStack.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{app.stats.contributors}</div>
                        <div className="text-sm text-gray-500">Contributors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">{app.stats.stars}</div>
                        <div className="text-sm text-gray-500">GitHub Stars</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-rose-600">{app.stats.users}</div>
                        <div className="text-sm text-gray-500">Active Users</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className={`bg-gradient-to-r ${app.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
                        <Link href={app.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-5 w-5" />
                          Try Versify Live
                        </Link>
                      </Button>
                      <Button asChild variant="secondary" size="lg" className="border-2 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        <Link href={app.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-5 w-5" />
                          View Source Code
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right side - Visual/Preview */}
                  <div className="relative">
                    <div className={`h-full min-h-[400px] bg-gradient-to-br ${app.bgGradient} rounded-2xl p-4 flex items-center justify-center relative overflow-hidden`}>
                      {/* App Screenshot */}
                      <div className="relative w-full h-full max-w-md">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white/20">
                          <img 
                            src={app.image} 
                            alt="Versify App Screenshot - AI Poetry Generation Interface"
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Floating UI elements to show it's interactive */}
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Live App
                        </div>
                        
                        {/* Feature callouts */}
                        <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                          <Sparkles className="w-4 h-4 inline mr-1" />
                          AI-Powered
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute inset-0">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/30 rounded-full"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${20 + (i % 2) * 60}%`,
                            }}
                            animate={{
                              y: [-10, 10, -10],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 2 + i * 0.2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Achievement badges */}
                    <div className="absolute -top-4 -right-4 space-y-2">
                      <Badge className="bg-green-500 text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        First Success
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Achievements section */}
                <div className="border-t border-gray-200 p-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Community Achievements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {app.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-green-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-5 rounded-xl`} />
            </Card>
          </motion.div>
        ))}

        {/* Upcoming Apps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What's Next?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Versify is just the beginning. Our community is already planning the next exciting project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingApps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-dashed border-gray-300 bg-white/50">
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4`}
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity
                      }}
                    >
                      <app.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900">{app.name}</CardTitle>
                    <CardDescription className="text-gray-600">{app.tagline}</CardDescription>
                    <Badge className={`${app.statusColor} text-white px-3 py-1 mx-auto w-fit`}>
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      {app.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">{app.description}</p>
                    <Button asChild variant="secondary" className="w-full">
                      <Link href="https://github.com/PraiseTechzw/OpenLaunch/discussions" target="_blank" rel="noopener noreferrer">
                        <Users className="mr-2 h-4 w-4" />
                        Join the Discussion
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Call to action for new app ideas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-secondary-50">
                <CardHeader className="text-center pb-4">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 6 }}
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-gray-900">Have an Idea?</CardTitle>
                  <CardDescription className="text-gray-600">Propose the Next App</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    Got an idea for the next community project? Share it with us and help shape what we build together!
                  </p>
                  <Button asChild className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90">
                    <Link href="https://github.com/PraiseTechzw/OpenLaunch/discussions/new?category=ideas" target="_blank" rel="noopener noreferrer">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Propose an App
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Community impact section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-2xl">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <CardHeader className="text-center pb-6 relative">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-white mb-4">
                🎉 This is Just the Beginning!
              </CardTitle>
              <CardDescription className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
                Versify proves that our community-driven approach works. Together, we can build amazing software that makes a real difference.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center relative">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <Link href="/docs/onboarding">
                    <Rocket className="mr-2 h-5 w-5" />
                    Join Our Community
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <Link href="https://github.com/PraiseTechzw/versify" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    Contribute to Versify
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}