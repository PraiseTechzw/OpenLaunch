import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workshops - OpenLaunch Events',
  description: 'Join our developer workshops to level up your skills with hands-on learning from industry experts.',
}

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}