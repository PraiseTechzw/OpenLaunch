import { Metadata } from 'next'
import { Building, Code, Database, Globe, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Architecture - OpenLaunch',
  description: 'Technical architecture and system design of OpenLaunch platform',
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <Building className="w-4 h-4 text-primary-400 mr-2" />
            <span className="text-sm font-medium text-primary-300">System Architecture</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Technical Architecture
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            OpenLaunch is built with modern, scalable architecture designed for collaboration, 
            performance, and developer experience.
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Code className="w-6 h-6 text-primary-400 mr-3" />
              Frontend Stack
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Framework</span>
                <span className="text-white font-medium">Next.js 14</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Language</span>
                <span className="text-white font-medium">TypeScript</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Styling</span>
                <span className="text-white font-medium">Tailwind CSS</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">UI Components</span>
                <span className="text-white font-medium">Radix UI</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Animations</span>
                <span className="text-white font-medium">Framer Motion</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Database className="w-6 h-6 text-secondary-400 mr-3" />
              Backend & Infrastructure
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Runtime</span>
                <span className="text-white font-medium">Node.js</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">API</span>
                <span className="text-white font-medium">REST + GraphQL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Database</span>
                <span className="text-white font-medium">PostgreSQL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Hosting</span>
                <span className="text-white font-medium">Vercel</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Version Control</span>
                <span className="text-white font-medium">Git + GitHub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Performance First",
                description: "Optimized for speed with SSR, caching, and efficient bundling"
              },
              {
                icon: Shield,
                title: "Security by Design",
                description: "Built-in security measures, authentication, and data protection"
              },
              {
                icon: Globe,
                title: "Scalable Architecture",
                description: "Microservices approach ready to scale with community growth"
              }
            ].map((principle, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
                <p className="text-slate-300">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Diagram */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">System Overview</h2>
          <div className="text-center text-slate-300">
            <p className="mb-4">Detailed system diagrams and API documentation coming soon!</p>
            <p>Follow our progress on GitHub to see the latest architectural decisions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}