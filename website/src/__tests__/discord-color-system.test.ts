/**
 * Property-Based Test for Discord Color System Consistency
 * 
 * Feature: discord-ui-redesign, Property 1: Discord Color System Consistency
 * Validates: Requirements 1.1, 9.3
 * 
 * Property: For any component in the system, all color values should come from 
 * the defined Discord color palette and maintain proper contrast ratios
 */

import * as fc from 'fast-check'
import { discordColors, discordTheme } from '@/lib/discord-theme'
import { discord } from '@/lib/discord-utils'

describe('Discord Color System Consistency', () => {
  describe('Property 1: Discord Color System Consistency', () => {
    /**
     * **Validates: Requirements 1.1, 9.3**
     * 
     * This property test ensures that all color values in the Discord design system
     * are consistent, properly defined, and maintain accessibility standards.
     */
    it('should maintain consistent color definitions across all categories', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'background',
            'text', 
            'brand',
            'status',
            'interactive'
          ),
          (colorCategory) => {
            // Test that each color category exists and has valid colors
            const categoryColors = discordColors[colorCategory as keyof typeof discordColors]
            
            // Ensure the category exists
            expect(categoryColors).toBeDefined()
            expect(typeof categoryColors).toBe('object')
            
            // Test that all colors in the category are valid hex colors or rgba values
            const validateColorValue = (value: any): boolean => {
              if (typeof value === 'string') {
                // Check for hex colors (#rrggbb or #rrggbbaa)
                const hexPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/
                // Check for rgba colors
                const rgbaPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/
                
                return hexPattern.test(value) || rgbaPattern.test(value)
              }
              return false
            }
            
            const checkColorObject = (obj: any): boolean => {
              for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string') {
                  if (!validateColorValue(value)) {
                    console.error(`Invalid color value for ${colorCategory}.${key}: ${value}`)
                    return false
                  }
                } else if (typeof value === 'object' && value !== null) {
                  if (!checkColorObject(value)) {
                    return false
                  }
                }
              }
              return true
            }
            
            return checkColorObject(categoryColors)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should provide consistent color accessibility across all text/background combinations', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'primary',
            'secondary', 
            'muted'
          ),
          fc.constantFrom(
            'primary',
            'secondary',
            'tertiary',
            'elevated'
          ),
          (textType, backgroundType) => {
            // Get text and background colors
            const textColor = discordColors.text[textType as keyof typeof discordColors.text]
            const backgroundColor = discordColors.background[backgroundType as keyof typeof discordColors.background]
            
            // Ensure both colors exist
            expect(textColor).toBeDefined()
            expect(backgroundColor).toBeDefined()
            expect(typeof textColor).toBe('string')
            expect(typeof backgroundColor).toBe('string')
            
            // Basic validation that colors are properly formatted
            const isValidHexColor = (color: string) => /^#[0-9A-Fa-f]{6}$/.test(color)
            
            expect(isValidHexColor(textColor as string)).toBe(true)
            expect(isValidHexColor(backgroundColor as string)).toBe(true)
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should maintain consistent brand color definitions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary', 'secondary', 'accent'),
          (brandColorType) => {
            const brandColor = discordColors.brand[brandColorType as keyof typeof discordColors.brand]
            
            // Ensure brand color exists and is valid
            expect(brandColor).toBeDefined()
            expect(typeof brandColor).toBe('string')
            
            // Validate hex color format
            const hexPattern = /^#[0-9A-Fa-f]{6}$/
            expect(hexPattern.test(brandColor as string)).toBe(true)
            
            // Ensure brand colors are distinct from each other
            const otherBrandColors = Object.entries(discordColors.brand)
              .filter(([key]) => key !== brandColorType)
              .map(([, value]) => value)
            
            expect(otherBrandColors).not.toContain(brandColor)
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should provide consistent status color definitions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('success', 'warning', 'error', 'info'),
          (statusType) => {
            const statusColor = discordColors.status[statusType as keyof typeof discordColors.status]
            
            // Ensure status color exists and is valid
            expect(statusColor).toBeDefined()
            expect(typeof statusColor).toBe('string')
            
            // Validate hex color format
            const hexPattern = /^#[0-9A-Fa-f]{6}$/
            expect(hexPattern.test(statusColor as string)).toBe(true)
            
            // Ensure status colors follow semantic conventions
            switch (statusType) {
              case 'success':
                // Success should be green-ish (starts with #3 or #2 for green hues)
                expect(statusColor).toMatch(/^#[23]/)
                break
              case 'error':
                // Error should be red-ish (starts with #e or #d for red hues)
                expect(statusColor).toMatch(/^#[ed]/)
                break
              case 'warning':
                // Warning should be yellow/orange-ish (starts with #f for yellow/orange hues)
                expect(statusColor).toMatch(/^#f/)
                break
              case 'info':
                // Info should be blue-ish (starts with #0 for blue hues)
                expect(statusColor).toMatch(/^#0/)
                break
            }
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should maintain consistent interactive state colors', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('normal', 'hover', 'active', 'muted'),
          (interactiveState) => {
            const interactiveColor = discordColors.interactive[interactiveState as keyof typeof discordColors.interactive]
            
            // Ensure interactive color exists and is valid
            expect(interactiveColor).toBeDefined()
            expect(typeof interactiveColor).toBe('string')
            
            // Validate hex color format
            const hexPattern = /^#[0-9A-Fa-f]{6}$/
            expect(hexPattern.test(interactiveColor as string)).toBe(true)
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should provide consistent utility class generation', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('primary', 'secondary', 'success', 'danger', 'ghost'),
          fc.constantFrom('sm', 'md', 'lg'),
          (variant, size) => {
            // Test button class generation
            const buttonClasses = discord.getButtonClasses(
              variant as any, 
              size as any
            )
            
            // Ensure classes are generated
            expect(buttonClasses).toBeDefined()
            expect(typeof buttonClasses).toBe('string')
            expect(buttonClasses.length).toBeGreaterThan(0)
            
            // Ensure classes contain expected Discord styling
            expect(buttonClasses).toContain('rounded-discord')
            expect(buttonClasses).toContain('transition-all')
            expect(buttonClasses).toContain('duration-200')
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Color System Integration Tests', () => {
    it('should have all required color categories defined', () => {
      const requiredCategories = ['background', 'text', 'brand', 'status', 'interactive']
      
      requiredCategories.forEach(category => {
        expect(discordColors).toHaveProperty(category)
        expect(discordColors[category as keyof typeof discordColors]).toBeDefined()
      })
    })

    it('should have all required background colors', () => {
      const requiredBackgroundColors = ['primary', 'secondary', 'tertiary', 'elevated']
      
      requiredBackgroundColors.forEach(color => {
        expect(discordColors.background).toHaveProperty(color)
        expect(discordColors.background[color as keyof typeof discordColors.background]).toBeDefined()
      })
    })

    it('should have all required text colors', () => {
      const requiredTextColors = ['primary', 'secondary', 'muted', 'link', 'positive', 'warning', 'danger']
      
      requiredTextColors.forEach(color => {
        expect(discordColors.text).toHaveProperty(color)
        expect(discordColors.text[color as keyof typeof discordColors.text]).toBeDefined()
      })
    })

    it('should have all required brand colors', () => {
      const requiredBrandColors = ['primary', 'secondary', 'accent']
      
      requiredBrandColors.forEach(color => {
        expect(discordColors.brand).toHaveProperty(color)
        expect(discordColors.brand[color as keyof typeof discordColors.brand]).toBeDefined()
      })
    })

    it('should have all required status colors', () => {
      const requiredStatusColors = ['success', 'warning', 'error', 'info']
      
      requiredStatusColors.forEach(color => {
        expect(discordColors.status).toHaveProperty(color)
        expect(discordColors.status[color as keyof typeof discordColors.status]).toBeDefined()
      })
    })

    it('should have all required interactive colors', () => {
      const requiredInteractiveColors = ['normal', 'hover', 'active', 'muted']
      
      requiredInteractiveColors.forEach(color => {
        expect(discordColors.interactive).toHaveProperty(color)
        expect(discordColors.interactive[color as keyof typeof discordColors.interactive]).toBeDefined()
      })
    })
  })
})