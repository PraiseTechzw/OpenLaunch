'use client'

import { motion } from 'framer-motion'
import { 
  CodeBracketIcon, 
  UsersIcon, 
  AcademicCapIcon, 
  GlobeAltIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  {
    name: 'Open Source First',
    description: 'Everything we build is open source from day one. Transparent development, clear documentation, and community-driven decisions.',
    icon: CodeBracketIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    borderGradient: 'from-blue-200 to-cyan-200',
  },
  {
    name: 'Beginner Friendly',
    description: 'New to open source? Perfect! We provide mentorship, clear onboarding, and "good first issue" labels to help you start.',
    icon: AcademicCapIcon,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    borderGradient: 'from-green-200 to-emerald-200',
  },
  {
    name: 'Global Community',
    description: 'Connect with developers worldwide. Build lasting relationships while creating software that matters.',
    icon: GlobeAltIcon,
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50',
    borderGradient: 'from-purple-200 to-violet-200',
  },
  {
    name: 'Real Impact',
    description: 'We build production-ready software that solves real problems, not just toy projects or tutorials.',
    icon: LightBulbIcon,
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    borderGradient: 'from-yellow-200 to-orange-200',
  },
  {
    name: 'Inclusive Culture',
    description: 'All backgrounds, skill levels, and perspectives are welcome. Diversity makes us stronger.',
    icon: UsersIcon,
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50',
    borderGradient: 'from-indigo-200 to-purple-200',
  },
  {
    name: 'Community First',
    description: 'Decisions are made collectively, benefits are shared by all, and everyone has a voice in our direction.',
    icon: HeartIcon,
    gradient: 'from-red-500 to-pink-500',
    bgGradient: 'from-red-50 to-pink-50',
    borderGradient: 'from-red-200 to-pink-200',
  },
]

export function Features() {
  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
              <span className="text-sm font-medium text-primary-700">Why Choose OpenLaunch?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Built for{' '}
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                Collaboration
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building more than software—we're creating a new model for collaborative innovation 
              that puts community, learning, and real impact at the center.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm overflow-hidden relative">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                <div className="absolute inset-[1px] bg-white rounded-xl" />
                
                {/* Content */}
                <div className="relative">
                  <CardHeader className="pb-4">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </div>

                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-xl`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 text-white shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <CardHeader className="text-center pb-6 relative">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Build the Future?
              </CardTitle>
              <CardDescription className="text-primary-100 text-lg max-w-2xl mx-auto leading-relaxed">
                OpenLaunch launches January 1st, 2026. Be part of our founding community and help 
                shape collaborative software development from the very beginning.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center relative">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <Link href="/docs/onboarding">
                    Get Started Today
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <Link href="https://github.com/PraiseTechzw/OpenLaunch" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-primary-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Open Source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="text-sm">Community Driven</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <span className="text-sm">Production Ready</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}