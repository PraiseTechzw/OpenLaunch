import { Metadata } from 'next'
import { Book, Code, Database, Key, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'API Reference - OpenLaunch',
  description: 'Complete API documentation for OpenLaunch platform',
}

export default function APIReferencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
            <Book className="w-4 h-4 text-secondary-400 mr-2" />
            <span className="text-sm font-medium text-secondary-300">API Documentation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            API Reference
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Complete documentation for OpenLaunch APIs. Build integrations, 
            automate workflows, and extend the platform.
          </p>
        </div>

        {/* API Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Key,
              title: "Authentication",
              description: "OAuth 2.0, API keys, and secure authentication flows",
              endpoints: ["POST /auth/login", "POST /auth/refresh", "DELETE /auth/logout"],
              color: "from-primary-500 to-primary-600"
            },
            {
              icon: Database,
              title: "Projects",
              description: "Manage projects, repositories, and collaboration",
              endpoints: ["GET /projects", "POST /projects", "PUT /projects/:id"],
              color: "from-secondary-500 to-secondary-600"
            },
            {
              icon: Code,
              title: "Contributors",
              description: "User management, profiles, and contributions",
              endpoints: ["GET /users", "GET /users/:id", "PUT /users/:id"],
              color: "from-accent-500 to-accent-600"
            },
            {
              icon: Zap,
              title: "Webhooks",
              description: "Real-time notifications and event streaming",
              endpoints: ["POST /webhooks", "GET /webhooks", "DELETE /webhooks/:id"],
              color: "from-purple-500 to-purple-600"
            }
          ].map((section, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center mb-4`}>
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-slate-300 mb-6">{section.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide">Key Endpoints</h4>
                {section.endpoints.map((endpoint, i) => (
                  <div key={i} className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                    <span className="text-green-400">{endpoint.split(' ')[0]}</span>
                    <span className="text-slate-300 ml-2">{endpoint.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Getting Started */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">1. Get Your API Key</h3>
              <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-slate-400"># Generate API key</div>
                <div className="text-green-400">curl -X POST https://api.openlaunch.dev/auth/keys</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">2. Make Your First Request</h3>
              <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-slate-400"># List projects</div>
                <div className="text-green-400">curl -H "Authorization: Bearer YOUR_KEY"</div>
                <div className="text-slate-300 ml-4">https://api.openlaunch.dev/projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 border border-primary-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Full Documentation Coming Soon</h2>
          <p className="text-slate-300 mb-6">
            We're building comprehensive API documentation with interactive examples, 
            SDKs, and detailed guides.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-slate-800/50 rounded-lg px-4 py-2">
              <span className="text-slate-400">OpenAPI 3.0 Spec</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-2">
              <span className="text-slate-400">Interactive Playground</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-2">
              <span className="text-slate-400">SDK Libraries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}