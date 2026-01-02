import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Events',
  description: 'Join our upcoming events, workshops, meetups, and hackathons. Connect with the OpenLaunch community and contribute to amazing projects.',
  keywords: [
    'events',
    'workshops',
    'meetups',
    'hackathons',
    'coding party',
    'community',
    'programming events',
    'developer meetups',
    'open source events',
    'tech conferences'
  ],
  url: '/events',
  type: 'website'
})

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}