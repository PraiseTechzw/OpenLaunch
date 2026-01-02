"use client"

import * as React from "react"
import { Button } from "./button"
import { Spinner, LoadingDots, LoadingOverlay } from "./loading"
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard, 
  SkeletonButton,
  SkeletonTable 
} from "./skeleton"

export function LoadingDemo() {
  const [isOverlayLoading, setIsOverlayLoading] = React.useState(false)
  const [showSkeletons, setShowSkeletons] = React.useState(true)

  const handleOverlayDemo = () => {
    setIsOverlayLoading(true)
    setTimeout(() => setIsOverlayLoading(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-heading-3 text-discord-text-primary mb-4">Loading Spinners</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center space-y-2">
            <Spinner size="xs" />
            <p className="text-xs text-discord-text-muted">Extra Small</p>
          </div>
          
          <div className="text-center space-y-2">
            <Spinner size="sm" />
            <p className="text-xs text-discord-text-muted">Small</p>
          </div>
          
          <div className="text-center space-y-2">
            <Spinner />
            <p className="text-xs text-discord-text-muted">Default</p>
          </div>
          
          <div className="text-center space-y-2">
            <Spinner size="lg" />
            <p className="text-xs text-discord-text-muted">Large</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <Spinner variant="secondary" />
            <p className="text-xs text-discord-text-muted">Secondary</p>
          </div>
          
          <div className="text-center space-y-2">
            <Spinner variant="success" />
            <p className="text-xs text-discord-text-muted">Success</p>
          </div>
          
          <div className="text-center space-y-2">
            <Spinner variant="danger" />
            <p className="text-xs text-discord-text-muted">Danger</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-heading-3 text-discord-text-primary mb-4">Loading Dots</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <LoadingDots size="sm" />
            <p className="text-xs text-discord-text-muted">Small</p>
          </div>
          
          <div className="text-center space-y-2">
            <LoadingDots />
            <p className="text-xs text-discord-text-muted">Default</p>
          </div>
          
          <div className="text-center space-y-2">
            <LoadingDots size="lg" />
            <p className="text-xs text-discord-text-muted">Large</p>
          </div>
          
          <div className="text-center space-y-2">
            <LoadingDots variant="success" />
            <p className="text-xs text-discord-text-muted">Success</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-heading-3 text-discord-text-primary mb-4">Loading Overlay</h3>
        
        <div className="space-y-4">
          <Button onClick={handleOverlayDemo}>
            Demo Loading Overlay (3s)
          </Button>
          
          <LoadingOverlay 
            isLoading={isOverlayLoading}
            text="Loading content..."
            className="h-48 bg-discord-background-secondary rounded-discord-lg border border-discord-background-modifier-hover"
          >
            <div className="p-6">
              <h4 className="text-discord-text-primary font-medium mb-2">Sample Content</h4>
              <p className="text-discord-text-secondary">
                This content will be overlaid with a loading spinner when the demo is active.
                The overlay includes a backdrop blur effect and loading text.
              </p>
            </div>
          </LoadingOverlay>
        </div>
      </div>

      <div>
        <h3 className="text-heading-3 text-discord-text-primary mb-4">Skeleton Components</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              variant={showSkeletons ? "success" : "secondary"}
              onClick={() => setShowSkeletons(!showSkeletons)}
            >
              {showSkeletons ? "Hide" : "Show"} Skeletons
            </Button>
          </div>

          {showSkeletons && (
            <div className="grid gap-6">
              <div>
                <h4 className="text-discord-text-primary font-medium mb-3">Basic Skeletons</h4>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              <div>
                <h4 className="text-discord-text-primary font-medium mb-3">Text Skeleton</h4>
                <SkeletonText lines={4} />
              </div>

              <div>
                <h4 className="text-discord-text-primary font-medium mb-3">Avatar Skeletons</h4>
                <div className="flex items-center space-x-4">
                  <SkeletonAvatar size="sm" />
                  <SkeletonAvatar />
                  <SkeletonAvatar size="lg" />
                  <SkeletonAvatar size="xl" />
                </div>
              </div>

              <div>
                <h4 className="text-discord-text-primary font-medium mb-3">Button Skeletons</h4>
                <div className="flex space-x-3">
                  <SkeletonButton size="sm" />
                  <SkeletonButton />
                  <SkeletonButton size="lg" />
                </div>
              </div>

              <div>
                <h4 className="text-discord-text-primary font-medium mb-3">Card Skeletons</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <SkeletonCard />
                  <SkeletonCard showAvatar showImage />
                </div>
              </div>

              <div>
                <h4 className="text-discord-text-primary font-medium mb-3">Table Skeleton</h4>
                <SkeletonTable rows={4} columns={3} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}