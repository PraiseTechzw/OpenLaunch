/**
 * Discord Design System Test Component
 * 
 * This component demonstrates the Discord-inspired design system
 * and validates that all the design tokens are working correctly.
 */

'use client'

import React from 'react'
import { discord } from '@/lib/discord-utils'
import { discordTheme } from '@/lib/discord-theme'
import { ModalDemo } from '@/components/ui/modal-demo'
import { LoadingDemo } from '@/components/ui/loading-demo'

export function DiscordTestComponent() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Typography Test */}
        <section className="space-y-4">
          <h1 className={discord.getTypographyClasses('display')}>
            Discord Design System Test
          </h1>
          <h2 className={discord.getTypographyClasses('heading1')}>
            Typography Scale
          </h2>
          <h3 className={discord.getTypographyClasses('heading2')}>
            Heading 2 Example
          </h3>
          <h4 className={discord.getTypographyClasses('heading3')}>
            Heading 3 Example
          </h4>
          <p className={discord.getTypographyClasses('body')}>
            This is body text demonstrating the Discord-inspired typography system. 
            It should be readable and follow Discord's design principles.
          </p>
          <p className={discord.getTypographyClasses('small')}>
            This is small text for secondary information.
          </p>
          <p className={discord.getTypographyClasses('caption')}>
            This is caption text for labels and metadata.
          </p>
        </section>

        {/* Button Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className={discord.getButtonClasses('primary')}>
              Primary Button
            </button>
            <button className={discord.getButtonClasses('secondary')}>
              Secondary Button
            </button>
            <button className={discord.getButtonClasses('success')}>
              Success Button
            </button>
            <button className={discord.getButtonClasses('danger')}>
              Danger Button
            </button>
            <button className={discord.getButtonClasses('ghost')}>
              Ghost Button
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className={discord.getButtonClasses('primary', 'sm')}>
              Small
            </button>
            <button className={discord.getButtonClasses('primary', 'md')}>
              Medium
            </button>
            <button className={discord.getButtonClasses('primary', 'lg')}>
              Large
            </button>
          </div>
        </section>

        {/* Card Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Card Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={discord.getCardClasses('default')}>
              <h3 className={discord.getTypographyClasses('heading3')}>
                Default Card
              </h3>
              <p className={discord.getTypographyClasses('body')}>
                This is a default card with standard styling.
              </p>
            </div>
            
            <div className={discord.getCardClasses('elevated')}>
              <h3 className={discord.getTypographyClasses('heading3')}>
                Elevated Card
              </h3>
              <p className={discord.getTypographyClasses('body')}>
                This card has elevated styling with more shadow.
              </p>
            </div>
            
            <div className={discord.getCardClasses('interactive')}>
              <h3 className={discord.getTypographyClasses('heading3')}>
                Interactive Card
              </h3>
              <p className={discord.getTypographyClasses('body')}>
                This card has hover effects and is interactive.
              </p>
            </div>
          </div>
        </section>

        {/* Input Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Input Components
          </h2>
          <div className="space-y-4 max-w-md">
            <input 
              type="text" 
              placeholder="Default input"
              className={discord.getInputClasses('default')}
            />
            <input 
              type="text" 
              placeholder="Error state input"
              className={discord.getInputClasses('error')}
            />
            <input 
              type="text" 
              placeholder="Success state input"
              className={discord.getInputClasses('success')}
            />
          </div>
        </section>

        {/* Navigation Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Navigation Items
          </h2>
          <nav className="space-y-2 max-w-xs">
            <a href="#" className={discord.getNavClasses(true)}>
              Active Navigation Item
            </a>
            <a href="#" className={discord.getNavClasses(false)}>
              Inactive Navigation Item
            </a>
            <a href="#" className={discord.getNavClasses(false)}>
              Another Navigation Item
            </a>
          </nav>
        </section>

        {/* Loading States Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Loading States
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className={discord.getTypographyClasses('small')}>Skeleton Loading:</p>
              <div className={discord.getLoadingClasses('skeleton')}></div>
              <div className={discord.getLoadingClasses('skeleton')} style={{ width: '60%' }}></div>
              <div className={discord.getLoadingClasses('skeleton')} style={{ width: '80%' }}></div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className={discord.getTypographyClasses('small')}>Spinners:</p>
              <div className={discord.getLoadingClasses('spinner', 'sm')}></div>
              <div className={discord.getLoadingClasses('spinner', 'md')}></div>
              <div className={discord.getLoadingClasses('spinner', 'lg')}></div>
            </div>
          </div>
        </section>

        {/* Animation Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Animation Classes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`${discord.getCardClasses('default')} ${discord.animation.hover.lift}`}>
              <p className={discord.getTypographyClasses('small')}>Hover Lift</p>
            </div>
            <div className={`${discord.getCardClasses('default')} ${discord.animation.hover.glow}`}>
              <p className={discord.getTypographyClasses('small')}>Hover Glow</p>
            </div>
            <div className={`${discord.getCardClasses('default')} ${discord.animation.hover.scale}`}>
              <p className={discord.getTypographyClasses('small')}>Hover Scale</p>
            </div>
            <div className={`${discord.getCardClasses('default')} discord-animate-bounce`}>
              <p className={discord.getTypographyClasses('small')}>Bounce Animation</p>
            </div>
          </div>
        </section>

        {/* Color System Test */}
        <section className="space-y-4">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Color System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className={discord.getTypographyClasses('caption')}>Brand Colors</p>
              <div className="w-full h-12 bg-discord-brand-primary rounded-discord"></div>
              <div className="w-full h-12 bg-discord-brand-secondary rounded-discord"></div>
              <div className="w-full h-12 bg-discord-brand-accent rounded-discord"></div>
            </div>
            <div className="space-y-2">
              <p className={discord.getTypographyClasses('caption')}>Status Colors</p>
              <div className="w-full h-12 bg-discord-status-success rounded-discord"></div>
              <div className="w-full h-12 bg-discord-status-warning rounded-discord"></div>
              <div className="w-full h-12 bg-discord-status-error rounded-discord"></div>
            </div>
            <div className="space-y-2">
              <p className={discord.getTypographyClasses('caption')}>Background Colors</p>
              <div className="w-full h-12 bg-discord-background-primary rounded-discord border border-border"></div>
              <div className="w-full h-12 bg-discord-background-secondary rounded-discord border border-border"></div>
              <div className="w-full h-12 bg-discord-background-elevated rounded-discord border border-border"></div>
            </div>
            <div className="space-y-2">
              <p className={discord.getTypographyClasses('caption')}>Interactive Colors</p>
              <div className="w-full h-12 bg-discord-interactive-normal rounded-discord"></div>
              <div className="w-full h-12 bg-discord-interactive-hover rounded-discord"></div>
              <div className="w-full h-12 bg-discord-interactive-active rounded-discord"></div>
            </div>
          </div>
        </section>

        {/* Advanced Components Test */}
        <section className="space-y-8">
          <h2 className={discord.getTypographyClasses('heading2')}>
            Advanced Components
          </h2>
          
          {/* Modal Components */}
          <div className="space-y-4">
            <ModalDemo />
          </div>
          
          {/* Loading Components */}
          <div className="space-y-4">
            <LoadingDemo />
          </div>
        </section>
      </div>
    </div>
  )
}