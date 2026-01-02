import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, EventCard, ProfileCard, FeatureCard } from './card'
import { Button } from './button'

export function CardDemo() {
  return (
    <div className="p-8 bg-discord-background-primary min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-heading-1 text-discord-text-primary mb-8">
          Discord Card Components
        </h1>
        
        {/* Basic Card Variants */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Basic Card Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Basic card with default styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-discord-text-secondary">This is the default card variant.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with elevated shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-discord-text-secondary">This card has more elevation.</p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-discord-text-secondary">This card responds to hover.</p>
              </CardContent>
            </Card>

            <Card variant="floating">
              <CardHeader>
                <CardTitle>Floating Card</CardTitle>
                <CardDescription>High elevation floating card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-discord-text-secondary">This card appears to float.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Event Cards */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Event Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EventCard
              title="OpenLaunch Coding Party 2026"
              description="Join us for our annual coding party! We'll be building amazing open source projects together."
              date={new Date('2026-06-15T10:00:00')}
              location="Online"
              type="coding-party"
              attendees={42}
              maxAttendees={100}
            />
            
            <EventCard
              title="React Workshop"
              description="Learn the fundamentals of React development with hands-on exercises and real-world examples."
              date={new Date('2026-03-20T14:00:00')}
              location="San Francisco, CA"
              type="workshop"
              attendees={15}
              maxAttendees={25}
            />
          </div>
        </section>

        {/* Profile Cards */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Profile Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProfileCard
              name="Alex Johnson"
              username="alexj"
              bio="Full-stack developer passionate about open source and community building."
              role="maintainer"
              contributions={{
                commits: 234,
                pullRequests: 45,
                issues: 12
              }}
              skills={['TypeScript', 'React', 'Node.js', 'Python', 'Docker']}
            />
            
            <ProfileCard
              name="Sarah Chen"
              username="sarahc"
              bio="UI/UX designer with a love for creating beautiful and accessible interfaces."
              role="contributor"
              contributions={{
                commits: 89,
                pullRequests: 23,
                issues: 8
              }}
              skills={['Figma', 'CSS', 'Design Systems']}
            />
            
            <ProfileCard
              name="Mike Rodriguez"
              username="miker"
              bio="Community manager helping developers connect and collaborate."
              role="community"
              contributions={{
                issues: 34
              }}
              skills={['Community Management', 'Documentation']}
            />
          </div>
        </section>

        {/* Feature Cards */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Feature Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              title="Project Templates"
              description="Get started quickly with our curated collection of project templates."
              icon="🚀"
              status="available"
              href="/templates"
            />
            
            <FeatureCard
              title="AI Code Assistant"
              description="Get intelligent code suggestions and automated refactoring help."
              icon="🤖"
              status="beta"
            />
            
            <FeatureCard
              title="Team Collaboration"
              description="Advanced tools for team coordination and project management."
              icon="👥"
              status="coming-soon"
            />
          </div>
        </section>

        {/* Complex Card Example */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Complex Card Example</h2>
          <Card variant="elevated" className="max-w-md">
            <CardHeader>
              <CardTitle>Project Dashboard</CardTitle>
              <CardDescription>Overview of your current project status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-discord-text-secondary">Progress</span>
                <span className="text-discord-text-primary font-semibold">75%</span>
              </div>
              <div className="w-full bg-discord-background-primary rounded-full h-2">
                <div className="bg-discord-brand-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-discord-text-primary">12</div>
                  <div className="text-xs text-discord-text-muted">Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-discord-text-primary">3</div>
                  <div className="text-xs text-discord-text-muted">Issues</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-discord-text-primary">8</div>
                  <div className="text-xs text-discord-text-muted">PRs</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="primary" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  )
}