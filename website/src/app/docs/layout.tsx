import { ReactNode } from 'react'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="docs-layout">
      {children}
    </div>
  )
}