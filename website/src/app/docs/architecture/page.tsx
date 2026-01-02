'use client'

import { useState } from 'react'
import { CpuChipIcon, ServerIcon, CloudIcon, CodeBracketIcon, CubeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { discordColors } from '@/lib/discord-theme'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

interface ArchitectureSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  content: {
    overview: string
    components: Array<{
      name: string
      description: string
      technologies: string[]
      responsibilities: string[]
    }>
    diagram?: string
    codeExample?: string
  }
}

const architectureSections: ArchitectureSection[] = [
  {
    id: 'overview',
    title: 'System Overview',
    description: 'High-level architecture and design principles',
    icon: <CubeIcon className="w-6 h-6" />,
    content: {
      overview: 'OpenLaunch is designed as a modular, scalable platform that supports multiple concurrent projects while maintaining consistency, quality, and community collaboration. Our architecture emphasizes flexibility, maintainability, and contributor accessibility.',
      components: [
        {
          name: 'Modular Architecture',
          description: 'Separation of concerns with loose coupling and high cohesion',
          technologies: ['Microservices', 'API Gateway', 'Event-driven'],
          responsibilities: ['Component isolation', 'Interface definitions', 'Plugin architecture']
        },
        {
          name: 'Community-Centric Design',
          description: 'Architecture that supports collaborative development',
          technologies: ['Git workflows', 'CI/CD', 'Documentation'],
          responsibilities: ['Contributor accessibility', 'Collaborative development', 'Testing-friendly design']
        },
        {
          name: 'Production-Ready Standards',
          description: 'Built for scale, security, and reliability',
          technologies: ['Kubernetes', 'Monitoring', 'Security'],
          responsibilities: ['Scalability', 'Security', 'Performance', 'Reliability']
        }
      ],
      diagram: `
graph TB
    subgraph "Frontend Layer"
        WEB[Web Applications]
        MOBILE[Mobile Apps]
        CLI[CLI Tools]
    end
    
    subgraph "API Gateway"
        GATEWAY[API Gateway]
        AUTH[Authentication]
        RATE[Rate Limiting]
    end
    
    subgraph "Backend Services"
        USER[User Service]
        PROJECT[Project Service]
        COLLAB[Collaboration Service]
        AI[AI/ML Service]
        NOTIFY[Notification Service]
    end
    
    subgraph "Data Layer"
        POSTGRES[(PostgreSQL)]
        REDIS[(Redis Cache)]
        S3[(Object Storage)]
        SEARCH[(Search Engine)]
    end
    
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    CLI --> GATEWAY
    
    GATEWAY --> USER
    GATEWAY --> PROJECT
    GATEWAY --> COLLAB
    GATEWAY --> AI
    GATEWAY --> NOTIFY
    
    USER --> POSTGRES
    PROJECT --> POSTGRES
    COLLAB --> REDIS
    AI --> S3
    NOTIFY --> REDIS
      `
    }
  },
  {
    id: 'frontend',
    title: 'Frontend Architecture',
    description: 'Client-side applications and user interfaces',
    icon: <CodeBracketIcon className="w-6 h-6" />,
    content: {
      overview: 'Our frontend architecture is built with React and Next.js, featuring a Discord-inspired design system, responsive layouts, and progressive enhancement for optimal user experience across all devices.',
      components: [
        {
          name: 'Web Applications',
          description: 'React-based single-page applications with server-side rendering',
          technologies: ['React 18+', 'Next.js', 'TypeScript', 'Tailwind CSS'],
          responsibilities: ['User interfaces', 'Client-side routing', 'State management', 'Performance optimization']
        },
        {
          name: 'Design System',
          description: 'Discord-inspired component library and design tokens',
          technologies: ['Styled Components', 'Design Tokens', 'Storybook'],
          responsibilities: ['UI consistency', 'Component reusability', 'Theme management', 'Accessibility']
        },
        {
          name: 'State Management',
          description: 'Predictable state management with modern patterns',
          technologies: ['Zustand', 'React Query', 'Context API'],
          responsibilities: ['Global state', 'Server state', 'Local state', 'Cache management']
        }
      ],
      codeExample: `
// Discord Theme Configuration
export const discordTheme = {
  colors: {
    background: {
      primary: '#36393f',
      secondary: '#2f3136',
      tertiary: '#202225'
    },
    brand: {
      primary: '#5865f2',
      secondary: '#3ba55c'
    }
  }
}

// Component Example
export function DiscordCard({ children, variant = 'default' }) {
  return (
    <div 
      className={cn(
        'rounded-lg p-6 transition-all duration-200',
        variant === 'interactive' && 'hover:scale-105'
      )}
      style={{
        backgroundColor: discordTheme.colors.background.secondary
      }}
    >
      {children}
    </div>
  )
}
      `
    }
  },
  {
    id: 'backend',
    title: 'Backend Services',
    description: 'Server-side architecture and microservices',
    icon: <ServerIcon className="w-6 h-6" />,
    content: {
      overview: 'Our backend follows a microservices architecture with Node.js and Python services, providing scalable APIs, real-time collaboration features, and AI-powered functionality.',
      components: [
        {
          name: 'API Gateway',
          description: 'Central entry point for all client requests',
          technologies: ['Fastify', 'JWT', 'Rate Limiting', 'Load Balancing'],
          responsibilities: ['Request routing', 'Authentication', 'Rate limiting', 'API versioning']
        },
        {
          name: 'User Service',
          description: 'User management, profiles, and permissions',
          technologies: ['Node.js', 'Prisma', 'PostgreSQL', 'OAuth2'],
          responsibilities: ['User authentication', 'Profile management', 'Permissions', 'Social features']
        },
        {
          name: 'Project Service',
          description: 'Project lifecycle and repository management',
          technologies: ['Node.js', 'Git', 'GitHub API', 'Webhooks'],
          responsibilities: ['Project creation', 'Repository management', 'Issue tracking', 'Collaboration']
        },
        {
          name: 'AI/ML Service',
          description: 'AI-powered features and recommendations',
          technologies: ['Python', 'FastAPI', 'TensorFlow', 'scikit-learn'],
          responsibilities: ['Code analysis', 'Recommendations', 'Automation', 'Insights']
        }
      ],
      codeExample: `
// API Gateway Configuration
const gateway = fastify({
  logger: true,
  trustProxy: true
})

// Authentication middleware
gateway.register(async function (fastify) {
  fastify.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})

// Service routing
gateway.register(async function (fastify) {
  fastify.register(userRoutes, { prefix: '/api/users' })
  fastify.register(projectRoutes, { prefix: '/api/projects' })
  fastify.register(collaborationRoutes, { prefix: '/api/collab' })
})
      `
    }
  },
  {
    id: 'data',
    title: 'Data Architecture',
    description: 'Database design and data management',
    icon: <CpuChipIcon className="w-6 h-6" />,
    content: {
      overview: 'Our data architecture uses PostgreSQL for structured data, Redis for caching and real-time features, and object storage for files. The design emphasizes data consistency, performance, and scalability.',
      components: [
        {
          name: 'PostgreSQL Database',
          description: 'Primary database for structured application data',
          technologies: ['PostgreSQL 15+', 'Prisma ORM', 'Migrations', 'Indexing'],
          responsibilities: ['User data', 'Project metadata', 'Relationships', 'Transactions']
        },
        {
          name: 'Redis Cache',
          description: 'In-memory data store for caching and real-time features',
          technologies: ['Redis 7+', 'Pub/Sub', 'Streams', 'Clustering'],
          responsibilities: ['Session storage', 'API caching', 'Real-time data', 'Queue management']
        },
        {
          name: 'Object Storage',
          description: 'Scalable storage for files and assets',
          technologies: ['AWS S3', 'MinIO', 'CDN', 'Encryption'],
          responsibilities: ['File storage', 'Asset delivery', 'Backups', 'Media processing']
        },
        {
          name: 'Search Engine',
          description: 'Full-text search and analytics',
          technologies: ['Elasticsearch', 'Kibana', 'Logstash', 'Analytics'],
          responsibilities: ['Content search', 'User discovery', 'Analytics', 'Logging']
        }
      ],
      codeExample: `
// Database Schema (Prisma)
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  username    String   @unique
  displayName String
  avatar      String?
  bio         String?
  skills      String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  projects    ProjectMember[]
  contributions Contribution[]
  
  @@map("users")
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String
  category    ProjectCategory
  status      ProjectStatus
  visibility  Visibility @default(PUBLIC)
  
  members     ProjectMember[]
  repositories Repository[]
  
  @@map("projects")
}

// Caching Strategy
class CacheService {
  async get(key: string) {
    return await redis.get(key)
  }
  
  async set(key: string, value: any, ttl = 3600) {
    return await redis.setex(key, ttl, JSON.stringify(value))
  }
  
  async invalidate(pattern: string) {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }
}
      `
    }
  },
  {
    id: 'security',
    title: 'Security Architecture',
    description: 'Security measures and best practices',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    content: {
      overview: 'Security is built into every layer of our architecture, from authentication and authorization to data protection and infrastructure security. We follow industry best practices and maintain compliance with security standards.',
      components: [
        {
          name: 'Authentication & Authorization',
          description: 'JWT-based authentication with role-based access control',
          technologies: ['JWT', 'OAuth2', 'RBAC', 'Multi-factor'],
          responsibilities: ['User authentication', 'Access control', 'Session management', 'Token validation']
        },
        {
          name: 'Data Protection',
          description: 'Encryption and data privacy measures',
          technologies: ['TLS 1.3', 'AES-256', 'GDPR', 'Audit logs'],
          responsibilities: ['Encryption at rest', 'Encryption in transit', 'Data privacy', 'Compliance']
        },
        {
          name: 'Infrastructure Security',
          description: 'Network and infrastructure protection',
          technologies: ['WAF', 'DDoS protection', 'VPC', 'Security groups'],
          responsibilities: ['Network security', 'DDoS protection', 'Intrusion detection', 'Monitoring']
        },
        {
          name: 'Application Security',
          description: 'Code-level security and vulnerability management',
          technologies: ['SAST', 'DAST', 'Dependency scanning', 'Security headers'],
          responsibilities: ['Code security', 'Vulnerability scanning', 'Security testing', 'Secure coding']
        }
      ],
      codeExample: `
// JWT Authentication
class AuthService {
  generateToken(user: User) {
    return jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        roles: user.roles 
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '15m',
        issuer: 'openlaunch',
        audience: 'openlaunch-api'
      }
    )
  }
  
  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

// RBAC Middleware
function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user.roles.includes(role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}

// Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}))
      `
    }
  },
  {
    id: 'deployment',
    title: 'Deployment & Infrastructure',
    description: 'DevOps, CI/CD, and infrastructure management',
    icon: <CloudIcon className="w-6 h-6" />,
    content: {
      overview: 'Our deployment architecture uses containerization, orchestration, and infrastructure as code to ensure reliable, scalable, and maintainable deployments across multiple environments.',
      components: [
        {
          name: 'Containerization',
          description: 'Docker-based containerization for consistent deployments',
          technologies: ['Docker', 'Docker Compose', 'Multi-stage builds', 'Distroless'],
          responsibilities: ['Application packaging', 'Environment consistency', 'Dependency management', 'Security isolation']
        },
        {
          name: 'Orchestration',
          description: 'Kubernetes for container orchestration and scaling',
          technologies: ['Kubernetes', 'Helm', 'Ingress', 'Service Mesh'],
          responsibilities: ['Container orchestration', 'Auto-scaling', 'Load balancing', 'Service discovery']
        },
        {
          name: 'CI/CD Pipeline',
          description: 'Automated testing, building, and deployment',
          technologies: ['GitHub Actions', 'ArgoCD', 'SonarQube', 'Snyk'],
          responsibilities: ['Automated testing', 'Code quality', 'Security scanning', 'Deployment automation']
        },
        {
          name: 'Infrastructure as Code',
          description: 'Terraform for infrastructure provisioning and management',
          technologies: ['Terraform', 'AWS', 'Monitoring', 'Logging'],
          responsibilities: ['Infrastructure provisioning', 'Configuration management', 'Monitoring setup', 'Disaster recovery']
        }
      ],
      codeExample: `
# Dockerfile (Multi-stage build)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]

# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openlaunch-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openlaunch-web
  template:
    metadata:
      labels:
        app: openlaunch-web
    spec:
      containers:
      - name: web
        image: openlaunch/web:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
      `
    }
  }
]

const techStack = {
  frontend: [
    { name: 'React 18+', category: 'Framework', description: 'Modern React with concurrent features' },
    { name: 'Next.js', category: 'Framework', description: 'Full-stack React framework with SSR' },
    { name: 'TypeScript', category: 'Language', description: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework' },
    { name: 'Zustand', category: 'State', description: 'Lightweight state management' }
  ],
  backend: [
    { name: 'Node.js 18+', category: 'Runtime', description: 'JavaScript runtime for server-side development' },
    { name: 'Fastify', category: 'Framework', description: 'Fast and low overhead web framework' },
    { name: 'Python 3.11+', category: 'Language', description: 'For AI/ML services and data processing' },
    { name: 'Prisma', category: 'ORM', description: 'Type-safe database client and ORM' },
    { name: 'PostgreSQL 15+', category: 'Database', description: 'Primary relational database' }
  ],
  infrastructure: [
    { name: 'Docker', category: 'Containerization', description: 'Application containerization platform' },
    { name: 'Kubernetes', category: 'Orchestration', description: 'Container orchestration and scaling' },
    { name: 'Terraform', category: 'IaC', description: 'Infrastructure as code provisioning' },
    { name: 'GitHub Actions', category: 'CI/CD', description: 'Automated testing and deployment' },
    { name: 'Prometheus', category: 'Monitoring', description: 'Metrics collection and alerting' }
  ]
}

export default function ArchitecturePage() {
  const [expandedSection, setExpandedSection] = useState<string>('overview')
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('frontend')

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <CubeIcon 
            className="w-12 h-12 mr-4" 
            style={{ color: discordColors.brand.primary }}
          />
          <h1 
            className="text-4xl font-bold"
            style={{ color: discordColors.text.primary }}
          >
            Architecture Documentation
          </h1>
        </div>
        <p 
          className="text-xl max-w-4xl mx-auto mb-8"
          style={{ color: discordColors.text.secondary }}
        >
          Comprehensive technical documentation covering system design, component architecture, 
          and implementation details for the OpenLaunch platform.
        </p>
      </div>

      {/* Architecture Sections */}
      <div className="space-y-6 mb-16">
        {architectureSections.map((section) => {
          const isExpanded = expandedSection === section.id
          
          return (
            <Card key={section.id} variant="elevated" className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer p-6"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ 
                        backgroundColor: `${discordColors.brand.primary}20`,
                        color: discordColors.brand.primary 
                      }}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle style={{ color: discordColors.text.primary }}>
                        {section.title}
                      </CardTitle>
                      <CardDescription style={{ color: discordColors.text.secondary }}>
                        {section.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div style={{ color: discordColors.text.muted }}>
                    {isExpanded ? (
                      <ChevronDownIcon className="w-5 h-5" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {/* Overview */}
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-3"
                        style={{ color: discordColors.text.primary }}
                      >
                        Overview
                      </h3>
                      <p 
                        className="leading-relaxed"
                        style={{ color: discordColors.text.secondary }}
                      >
                        {section.content.overview}
                      </p>
                    </div>

                    {/* Components */}
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-4"
                        style={{ color: discordColors.text.primary }}
                      >
                        Key Components
                      </h3>
                      <div className="grid gap-4">
                        {section.content.components.map((component, index) => (
                          <Card key={index} variant="default" className="p-4">
                            <div className="flex flex-col lg:flex-row lg:gap-6">
                              <div className="lg:w-1/3 mb-3 lg:mb-0">
                                <h4 
                                  className="font-semibold mb-2"
                                  style={{ color: discordColors.text.primary }}
                                >
                                  {component.name}
                                </h4>
                                <p 
                                  className="text-sm"
                                  style={{ color: discordColors.text.secondary }}
                                >
                                  {component.description}
                                </p>
                              </div>
                              <div className="lg:w-1/3 mb-3 lg:mb-0">
                                <h5 
                                  className="font-medium mb-2 text-sm"
                                  style={{ color: discordColors.text.primary }}
                                >
                                  Technologies:
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                  {component.technologies.map((tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className="px-2 py-1 text-xs rounded"
                                      style={{
                                        backgroundColor: `${discordColors.brand.primary}20`,
                                        color: discordColors.brand.primary
                                      }}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="lg:w-1/3">
                                <h5 
                                  className="font-medium mb-2 text-sm"
                                  style={{ color: discordColors.text.primary }}
                                >
                                  Responsibilities:
                                </h5>
                                <ul className="text-xs space-y-1">
                                  {component.responsibilities.map((responsibility, respIndex) => (
                                    <li 
                                      key={respIndex}
                                      className="flex items-center"
                                      style={{ color: discordColors.text.secondary }}
                                    >
                                      <div 
                                        className="w-1 h-1 rounded-full mr-2"
                                        style={{ backgroundColor: discordColors.brand.secondary }}
                                      />
                                      {responsibility}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Code Example */}
                    {section.content.codeExample && (
                      <div>
                        <h3 
                          className="text-lg font-semibold mb-3"
                          style={{ color: discordColors.text.primary }}
                        >
                          Code Example
                        </h3>
                        <pre 
                          className="p-4 rounded-lg text-sm overflow-x-auto"
                          style={{ 
                            backgroundColor: discordColors.background.floating,
                            color: discordColors.text.secondary 
                          }}
                        >
                          <code>{section.content.codeExample.trim()}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Technology Stack */}
      <div className="mb-16">
        <h2 
          className="text-3xl font-bold text-center mb-8"
          style={{ color: discordColors.text.primary }}
        >
          Technology Stack
        </h2>
        
        <Card variant="elevated" className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex rounded-lg overflow-hidden" style={{ backgroundColor: discordColors.background.secondary }}>
              {Object.keys(techStack).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedTechCategory(category)}
                  className={clsx(
                    "px-6 py-3 font-medium transition-all duration-200",
                    selectedTechCategory === category ? "text-white" : ""
                  )}
                  style={{
                    backgroundColor: selectedTechCategory === category 
                      ? discordColors.brand.primary 
                      : 'transparent',
                    color: selectedTechCategory === category 
                      ? discordColors.text.primary 
                      : discordColors.text.secondary
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack[selectedTechCategory as keyof typeof techStack].map((tech, index) => (
              <Card key={index} variant="interactive" className="p-4">
                <div className="flex items-start">
                  <div 
                    className="w-3 h-3 rounded-full mr-3 mt-2"
                    style={{ backgroundColor: discordColors.brand.primary }}
                  />
                  <div>
                    <h4 
                      className="font-semibold mb-1"
                      style={{ color: discordColors.text.primary }}
                    >
                      {tech.name}
                    </h4>
                    <span 
                      className="text-xs px-2 py-1 rounded mb-2 inline-block"
                      style={{ 
                        backgroundColor: `${discordColors.brand.secondary}20`,
                        color: discordColors.brand.secondary 
                      }}
                    >
                      {tech.category}
                    </span>
                    <p 
                      className="text-sm"
                      style={{ color: discordColors.text.secondary }}
                    >
                      {tech.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card 
        variant="elevated" 
        className="p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${discordColors.brand.primary}, ${discordColors.brand.secondary})`,
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: discordColors.text.primary }}
        >
          Contribute to Our Architecture
        </h2>
        <p 
          className="mb-6 max-w-2xl mx-auto"
          style={{ color: `${discordColors.text.primary}cc` }}
        >
          Our architecture evolves with community input and contributions. Help us improve our technical foundation and share your expertise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="secondary"
            className="font-semibold"
            style={{
              backgroundColor: discordColors.text.primary,
              color: discordColors.brand.primary,
            }}
          >
            <a href="https://github.com/PraiseTechzw/OpenLaunch/discussions/categories/architecture" target="_blank" rel="noopener noreferrer">
              Architecture Discussions
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="font-semibold border-2"
            style={{
              borderColor: discordColors.text.primary,
              color: discordColors.text.primary,
            }}
          >
            <a href="https://github.com/PraiseTechzw/OpenLaunch" target="_blank" rel="noopener noreferrer">
              View Source Code
            </a>
          </Button>
        </div>
      </Card>
    </div>
  )
}