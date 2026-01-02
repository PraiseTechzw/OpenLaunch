import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coding Party 2026 - OpenLaunch',
  description: 'Join our flagship annual event - Coding Party 2026. A celebration of open source collaboration.',
}

export default function CodingParty2026Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}