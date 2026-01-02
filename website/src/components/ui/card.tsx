import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-discord-lg border-0 text-discord-text-primary shadow-discord-elevation-low transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-discord-background-secondary",
        elevated: "bg-discord-background-elevated shadow-discord-elevation-medium",
        interactive: "bg-discord-background-secondary hover:bg-discord-background-elevated hover:shadow-discord-elevation-high hover:-translate-y-1 cursor-pointer",
        floating: "bg-discord-background-elevated shadow-discord-elevation-high",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, onClick, ...props }, ref) => {
    const isInteractive = variant === 'interactive' || onClick

    const handleClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e)
    }, [onClick])

    // Only add interactive props if the card is actually interactive
    const interactiveProps = isInteractive && onClick ? {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': false,
      onClick: handleClick,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e as any)
        }
      },
    } : {
      role: 'article'
    }

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, className }),
          // Add focus styles for interactive cards
          isInteractive && onClick && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-discord-brand-primary focus-visible:ring-offset-2'
        )}
        {...interactiveProps}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
>(({ className, as: Comp = 'h3', ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-discord-text-primary", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-discord-text-secondary", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Specialized Card Components

export interface EventCardProps extends CardProps {
  title: string
  description: string
  date: Date
  location?: string
  type?: 'workshop' | 'meetup' | 'coding-party' | 'conference'
  attendees?: number
  maxAttendees?: number
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ title, description, date, location, type, attendees, maxAttendees, className, ...props }, ref) => {
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(date)
    }

    const getTypeColor = (type?: string) => {
      switch (type) {
        case 'workshop': return 'text-discord-status-info'
        case 'meetup': return 'text-discord-brand-secondary'
        case 'coding-party': return 'text-discord-brand-accent'
        case 'conference': return 'text-discord-brand-primary'
        default: return 'text-discord-text-secondary'
      }
    }

    return (
      <Card ref={ref} variant="interactive" className={cn("group", className)} {...props}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="group-hover:text-discord-brand-primary transition-colors">
                {title}
              </CardTitle>
              {type && (
                <span className={cn("text-xs font-medium uppercase tracking-wide", getTypeColor(type))}>
                  {type}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-discord-text-primary">
                {formatDate(date)}
              </div>
              {location && (
                <div className="text-xs text-discord-text-muted">
                  {location}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            {description}
          </CardDescription>
          {(attendees !== undefined || maxAttendees !== undefined) && (
            <div className="flex items-center gap-2 text-xs text-discord-text-secondary">
              <span>👥</span>
              <span>
                {attendees !== undefined && maxAttendees !== undefined
                  ? `${attendees}/${maxAttendees} attending`
                  : attendees !== undefined
                  ? `${attendees} attending`
                  : `Max ${maxAttendees} attendees`
                }
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
EventCard.displayName = "EventCard"

export interface ProfileCardProps extends CardProps {
  name: string
  username: string
  avatar?: string
  bio?: string
  role?: 'maintainer' | 'contributor' | 'community'
  contributions?: {
    commits?: number
    pullRequests?: number
    issues?: number
  }
  skills?: string[]
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ name, username, avatar, bio, role, contributions, skills, className, ...props }, ref) => {
    const getRoleColor = (role?: string) => {
      switch (role) {
        case 'maintainer': return 'bg-discord-status-error text-discord-text-primary'
        case 'contributor': return 'bg-discord-brand-primary text-discord-text-primary'
        case 'community': return 'bg-discord-brand-secondary text-discord-text-primary'
        default: return 'bg-discord-interactive-normal text-discord-text-secondary'
      }
    }

    return (
      <Card ref={ref} variant="interactive" className={cn("group", className)} {...props}>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-discord-brand-primary flex items-center justify-center text-discord-text-primary font-semibold">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
              ) : (
                name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="group-hover:text-discord-brand-primary transition-colors">
                {name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-discord-text-muted">@{username}</span>
                {role && (
                  <span className={cn("px-2 py-1 rounded text-xs font-medium", getRoleColor(role))}>
                    {role}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {bio && (
            <CardDescription className="mb-4">
              {bio}
            </CardDescription>
          )}
          {contributions && (
            <div className="flex gap-4 mb-4 text-xs">
              {contributions.commits !== undefined && (
                <div className="text-center">
                  <div className="font-semibold text-discord-text-primary">{contributions.commits}</div>
                  <div className="text-discord-text-muted">Commits</div>
                </div>
              )}
              {contributions.pullRequests !== undefined && (
                <div className="text-center">
                  <div className="font-semibold text-discord-text-primary">{contributions.pullRequests}</div>
                  <div className="text-discord-text-muted">PRs</div>
                </div>
              )}
              {contributions.issues !== undefined && (
                <div className="text-center">
                  <div className="font-semibold text-discord-text-primary">{contributions.issues}</div>
                  <div className="text-discord-text-muted">Issues</div>
                </div>
              )}
            </div>
          )}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-discord-background-modifier-hover text-xs rounded text-discord-text-secondary"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 text-xs text-discord-text-muted">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
ProfileCard.displayName = "ProfileCard"

export interface FeatureCardProps extends CardProps {
  title: string
  description: string
  icon?: React.ReactNode
  status?: 'available' | 'coming-soon' | 'beta'
  href?: string
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, icon, status, href, className, ...props }, ref) => {
    const getStatusColor = (status?: string) => {
      switch (status) {
        case 'available': return 'bg-discord-status-success text-discord-text-primary'
        case 'coming-soon': return 'bg-discord-status-warning text-discord-text-primary'
        case 'beta': return 'bg-discord-brand-primary text-discord-text-primary'
        default: return 'bg-discord-interactive-normal text-discord-text-secondary'
      }
    }

    const CardComponent = href ? 'a' : 'div'

    return (
      <Card 
        ref={ref} 
        variant="interactive" 
        className={cn("group", className)} 
        {...(href ? { as: CardComponent, href } : {})}
        {...props}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {icon && (
                <div className="w-10 h-10 rounded-discord bg-discord-brand-primary/10 flex items-center justify-center text-discord-brand-primary group-hover:bg-discord-brand-primary group-hover:text-discord-text-primary transition-colors">
                  {icon}
                </div>
              )}
              <div>
                <CardTitle className="group-hover:text-discord-brand-primary transition-colors">
                  {title}
                </CardTitle>
                {status && (
                  <span className={cn("inline-block mt-1 px-2 py-1 rounded text-xs font-medium", getStatusColor(status))}>
                    {status === 'coming-soon' ? 'Coming Soon' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                )}
              </div>
            </div>
            {href && (
              <div className="text-discord-text-muted group-hover:text-discord-brand-primary transition-colors">
                →
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    )
  }
)
FeatureCard.displayName = "FeatureCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, EventCard, ProfileCard, FeatureCard }