import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meetups - OpenLaunch Events',
  description: 'Connect with fellow developers in your city or join virtual events. Build relationships and grow together as a community.',
}

export default function MeetupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}