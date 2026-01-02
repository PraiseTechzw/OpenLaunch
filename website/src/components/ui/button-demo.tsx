import React from 'react'
import { Button } from './button'

export function ButtonDemo() {
  const [loading, setLoading] = React.useState(false)

  const handleLoadingTest = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="p-8 bg-discord-background-primary min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-heading-1 text-discord-text-primary mb-8">
          Discord Button Components
        </h1>
        
        {/* Button Variants */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🎮</Button>
          </div>
        </section>

        {/* Button States */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onClick={handleLoadingTest}>
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-4">
          <h2 className="text-heading-2 text-discord-text-primary">Interactive Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => alert('Primary clicked!')}>
              Click Me
            </Button>
            <Button variant="success" onClick={() => console.log('Success!')}>
              Console Log
            </Button>
            <Button variant="danger" onClick={() => confirm('Are you sure?')}>
              Confirm Action
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}