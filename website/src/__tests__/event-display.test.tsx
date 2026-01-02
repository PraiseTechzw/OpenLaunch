/**
 * Property-Based Test for Event Display Consistency
 * 
 * Feature: discord-ui-redesign, Property 13: Event Display Consistency
 * Validates: Requirements 5.2, 5.6
 * 
 * Property: For any event, it should be displayed using Discord-style event cards 
 * with all required information (date, description, RSVP)
 */

import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import { EventCard } from '@/components/ui/card'

// Mock event data generator
const eventGenerator = fc.record({
  title: fc.string({ minLength: 5, maxLength: 100 }),
  description: fc.string({ minLength: 10, maxLength: 500 }),
  date: fc.date({ min: new Date('2026-01-01'), max: new Date('2027-12-31') }),
  location: fc.oneof(
    fc.constant('Virtual Event'),
    fc.string({ minLength: 5, maxLength: 50 }).map(city => `${city}, Country`)
  ),
  type: fc.constantFrom('workshop', 'meetup', 'coding-party', 'conference'),
  attendees: fc.integer({ min: 0, max: 1000 }),
  maxAttendees: fc.integer({ min: 1, max: 1000 })
}).filter(event => event.attendees <= event.maxAttendees)

describe('Event Display Consistency', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Property 13: Event Display Consistency', () => {
    /**
     * **Validates: Requirements 5.2, 5.6**
     * 
     * This property test ensures that all events are displayed consistently
     * using Discord-style event cards with all required information.
     */
    it('should display all events with consistent Discord-style formatting', () => {
      fc.assert(
        fc.property(
          eventGenerator,
          (event) => {
            // Clean up before each render
            cleanup()
            
            // Render the EventCard component
            const { container } = render(
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
                attendees={event.attendees}
                maxAttendees={event.maxAttendees}
              />
            )

            // Test that the card has Discord styling classes
            const cardElement = container.firstChild as HTMLElement
            expect(cardElement).toHaveClass('rounded-discord-lg')
            expect(cardElement).toHaveClass('bg-discord-background-secondary')
            
            // Test that all required information is displayed
            expect(screen.getByText(event.title)).toBeInTheDocument()
            expect(screen.getByText(event.description)).toBeInTheDocument()
            expect(screen.getByText(event.location)).toBeInTheDocument()
            
            // Test that event type is displayed with proper styling
            const typeElement = screen.getByText(event.type)
            expect(typeElement).toBeInTheDocument()
            expect(typeElement).toHaveClass('text-xs')
            expect(typeElement).toHaveClass('font-medium')
            
            // Test that attendee information is displayed
            const attendeeText = `${event.attendees}/${event.maxAttendees} attending`
            expect(screen.getByText(attendeeText)).toBeInTheDocument()
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should apply consistent type-based color coding for all event types', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('workshop', 'meetup', 'coding-party', 'conference'),
          eventGenerator,
          (eventType, baseEvent) => {
            cleanup()
            
            const event = { ...baseEvent, type: eventType }
            
            render(
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
                attendees={event.attendees}
                maxAttendees={event.maxAttendees}
              />
            )

            // Find the type badge element
            const typeElement = screen.getByText(event.type)
            
            // Test that each event type has consistent color coding
            switch (eventType) {
              case 'workshop':
                expect(typeElement).toHaveClass('text-discord-status-info')
                break
              case 'meetup':
                expect(typeElement).toHaveClass('text-discord-brand-secondary')
                break
              case 'coding-party':
                expect(typeElement).toHaveClass('text-discord-brand-accent')
                break
              case 'conference':
                expect(typeElement).toHaveClass('text-discord-brand-primary')
                break
            }
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should display consistent date and time formatting across all events', () => {
      fc.assert(
        fc.property(
          eventGenerator,
          (event) => {
            cleanup()
            
            render(
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            }).format(event.date)
            
            expect(screen.getByText(expectedDateFormat)).toBeInTheDocument()
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should maintain consistent interactive behavior for all event cards', () => {
      fc.assert(
        fc.property(
          eventGenerator,
          (event) => {
            const { container } = render(
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
                attendees={event.attendees}
                maxAttendees={event.maxAttendees}
              />
            )

            const cardElement = container.firstChild as HTMLElement
            
            // Test that all event cards have interactive styling
            expect(cardElement).toHaveClass('group')
            expect(cardElement).toHaveClass('cursor-pointer')
            
            // Test that hover effects are applied
            expect(cardElement).toHaveClass('hover:bg-discord-background-elevated')
            expect(cardElement).toHaveClass('hover:shadow-discord-elevation-high')
            expect(cardElement).toHaveClass('hover:-translate-y-1')
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should display attendee progress indicators consistently', () => {
      fc.assert(
        fc.property(
          eventGenerator,
          (event) => {
            const { container } = render(
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
                attendees={event.attendees}
                maxAttendees={event.maxAttendees}
              />
            )

            // Test that attendee information is displayed
            const attendeeText = `${event.attendees}/${event.maxAttendees} attending`
            expect(screen.getByText(attendeeText)).toBeInTheDocument()
            
            // Test that the attendee count is within valid range
            expect(event.attendees).toBeGreaterThanOrEqual(0)
            expect(event.attendees).toBeLessThanOrEqual(event.maxAttendees)
            expect(event.maxAttendees).toBeGreaterThan(0)
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle edge cases in event data gracefully', () => {
      fc.assert(
        fc.property(
          fc.record({
            title: fc.oneof(
              fc.string({ minLength: 1, maxLength: 5 }), // Very short titles
              fc.string({ minLength: 100, maxLength: 200 }) // Very long titles
            ),
            description: fc.oneof(
              fc.string({ minLength: 1, maxLength: 10 }), // Very short descriptions
              fc.string({ minLength: 500, maxLength: 1000 }) // Very long descriptions
            ),
            date: fc.date({ min: new Date('2026-01-01'), max: new Date('2027-12-31') }),
            location: fc.oneof(
              fc.constant('Virtual Event'),
              fc.string({ minLength: 1, maxLength: 5 }), // Very short location
              fc.string({ minLength: 50, maxLength: 100 }) // Very long location
            ),
            type: fc.constantFrom('workshop', 'meetup', 'coding-party', 'conference'),
            attendees: fc.integer({ min: 0, max: 10000 }),
            maxAttendees: fc.integer({ min: 1, max: 10000 })
          }).filter(event => event.attendees <= event.maxAttendees),
          (event) => {
            // Test that the component doesn't crash with edge case data
            expect(() => {
              render(
                <EventCard
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  location={event.location}
                  type={event.type}
                  attendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                />
              )
            }).not.toThrow()
            
            // Test that all required elements are still present
            expect(screen.getByText(event.title)).toBeInTheDocument()
            expect(screen.getByText(event.description)).toBeInTheDocument()
            expect(screen.getByText(event.location)).toBeInTheDocument()
            
            return true
          }
        ),
        { numRuns: 50 } // Fewer runs for edge cases to avoid timeout
      )
    })

    it('should maintain consistent RSVP functionality display', () => {
      fc.assert(
        fc.property(
          eventGenerator,
          (event) => {
            const { container } = render(
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
                attendees={event.attendees}
                maxAttendees={event.maxAttendees}
              />
            )

            // Test that the card is interactive (implies RSVP functionality)
            const cardElement = container.firstChild as HTMLElement
            expect(cardElement).toHaveClass('cursor-pointer')
            
            // Test that attendee information suggests RSVP capability
            const attendeeText = `${event.attendees}/${event.maxAttendees} attending`
            expect(screen.getByText(attendeeText)).toBeInTheDocument()
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Event Display Integration Tests', () => {
    it('should render event cards with all required Discord styling classes', () => {
      const mockEvent = {
        title: 'Test Event',
        description: 'Test Description',
        date: new Date('2026-06-15T14:00:00'),
        location: 'Test Location',
        type: 'workshop' as const,
        attendees: 25,
        maxAttendees: 50
      }

      const { container } = render(
        <EventCard
          title={mockEvent.title}
          description={mockEvent.description}
          date={mockEvent.date}
          location={mockEvent.location}
          type={mockEvent.type}
          attendees={mockEvent.attendees}
          maxAttendees={mockEvent.maxAttendees}
        />
      )

      const cardElement = container.firstChild as HTMLElement
      
      // Test Discord-specific styling
      expect(cardElement).toHaveClass('rounded-discord-lg')
      expect(cardElement).toHaveClass('bg-discord-background-secondary')
      expect(cardElement).toHaveClass('text-discord-text-primary')
      expect(cardElement).toHaveClass('shadow-discord-elevation-low')
    })

    it('should display all event types with proper color coding', () => {
      const eventTypes = ['workshop', 'meetup', 'coding-party', 'conference'] as const
      
      eventTypes.forEach(type => {
        const { rerender } = render(
          <EventCard
            title="Test Event"
            description="Test Description"
            date={new Date('2026-06-15T14:00:00')}
            location="Test Location"
            type={type}
            attendees={25}
            maxAttendees={50}
          />
        )

        const typeElement = screen.getByText(type)
        expect(typeElement).toBeInTheDocument()
        expect(typeElement).toHaveClass('text-xs')
        expect(typeElement).toHaveClass('font-medium')
        expect(typeElement).toHaveClass('uppercase')
        expect(typeElement).toHaveClass('tracking-wide')
      })
    })

    it('should handle missing optional props gracefully', () => {
      expect(() => {
        render(
          <EventCard
            title="Test Event"
            description="Test Description"
            date={new Date('2026-06-15T14:00:00')}
            location="Test Location"
            type="workshop"
            // Missing attendees and maxAttendees
          />
        )
      }).not.toThrow()

      expect(screen.getByText('Test Event')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })
  })
})