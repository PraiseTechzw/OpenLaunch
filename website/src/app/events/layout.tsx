import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events - OpenLaunch',
  description: 'Join our upcoming events and community gatherings',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}