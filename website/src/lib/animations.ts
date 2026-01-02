/**
 * Discord-Inspired Animation System
 * 
 * This file contains animation utilities, keyframes, and micro-interactions
 * for the Discord-inspired UI redesign.
 */

import { discordColors, discordAnimations } from './discord-theme'

/**
 * CSS-in-JS animation keyframes for dynamic animations
 */
export const animationKeyframes = {
  // Discord-style fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  
  fadeInUp: {
    from: { 
      opacity: 0, 
      transform: 'translateY(20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    },
  },
  
  fadeInDown: {
    from: { 
      opacity: 0, 
      transform: 'translateY(-20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0)' 
    },
  },
  
  fadeInLeft: {
    from: { 
      opacity: 0, 
      transform: 'translateX(-20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    },
  },
  
  fadeInRight: {
    from: { 
      opacity: 0, 
      transform: 'translateX(20px)' 
    },
    to: { 
      opacity: 1, 
      transform: 'translateX(0)' 
    },
  },
  
  // Discord-style scale animations
  scaleIn: {
    from: { 
      opacity: 0, 
      transform: 'scale(0.9)' 
    },
    to: { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
  },
  
  scaleOut: {
    from: { 
      opacity: 1, 
      transform: 'scale(1)' 
    },
    to: { 
      opacity: 0, 
      transform: 'scale(0.9)' 
    },
  },
  
  // Discord-style bounce animation
  discordBounce: {
    '0%, 20%, 53%, 80%, 100%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '40%, 43%': {
      transform: 'translate3d(0, -8px, 0)',
    },
    '70%': {
      transform: 'translate3d(0, -4px, 0)',
    },
    '90%': {
      transform: 'translate3d(0, -2px, 0)',
    },
  },
  
  // Discord-style pulse animation
  discordPulse: {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.05)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  
  // Discord-style glow animation
  discordGlow: {
    '0%, 100%': {
      boxShadow: `0 0 5px ${discordColors.brand.primary}40`,
    },
    '50%': {
      boxShadow: `0 0 20px ${discordColors.brand.primary}80, 0 0 30px ${discordColors.brand.primary}40`,
    },
  },
  
  // Discord-style shimmer animation for loading states
  shimmer: {
    '0%': {
      backgroundPosition: '-200px 0',
    },
    '100%': {
      backgroundPosition: 'calc(200px + 100%) 0',
    },
  },
  
  // Discord-style slide animations
  slideInUp: {
    from: {
      transform: 'translate3d(0, 100%, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  
  slideInDown: {
    from: {
      transform: 'translate3d(0, -100%, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  
  slideInLeft: {
    from: {
      transform: 'translate3d(-100%, 0, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  
  slideInRight: {
    from: {
      transform: 'translate3d(100%, 0, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
}

/**
 * Animation utility functions
 */
export const animations = {
  // Create a CSS animation string
  create: (
    keyframes: string,
    duration: string = discordAnimations.duration.normal,
    easing: string = discordAnimations.easing.default,
    fillMode: string = 'both'
  ) => `${keyframes} ${duration} ${easing} ${fillMode}`,
  
  // Predefined animation combinations
  fadeIn: (duration?: string) => 
    animations.create('fadeIn', duration),
  
  fadeInUp: (duration?: string) => 
    animations.create('fadeInUp', duration),
  
  fadeInDown: (duration?: string) => 
    animations.create('fadeInDown', duration),
  
  scaleIn: (duration?: string) => 
    animations.create('scaleIn', duration),
  
  slideInUp: (duration?: string) => 
    animations.create('slideInUp', duration),
  
  bounce: (duration?: string) => 
    animations.create('discordBounce', duration || '1s'),
  
  pulse: (duration?: string) => 
    animations.create('discordPulse', duration || '2s', 'ease-in-out', 'infinite'),
  
  glow: (duration?: string) => 
    animations.create('discordGlow', duration || '2s', 'ease-in-out', 'infinite'),
  
  shimmer: (duration?: string) => 
    animations.create('shimmer', duration || '1.5s', 'linear', 'infinite'),
}

/**
 * Micro-interaction utilities
 */
export const microInteractions = {
  // Hover lift effect
  hoverLift: {
    transition: `transform ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  
  // Hover scale effect
  hoverScale: {
    transition: `transform ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  
  // Hover glow effect
  hoverGlow: {
    transition: `box-shadow ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    '&:hover': {
      boxShadow: `0 8px 25px ${discordColors.brand.primary}40`,
    },
  },
  
  // Active press effect
  activePress: {
    transition: `transform ${discordAnimations.duration.fast} ${discordAnimations.easing.default}`,
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
  
  // Focus ring effect
  focusRing: {
    '&:focus-visible': {
      outline: `2px solid ${discordColors.brand.primary}`,
      outlineOffset: '2px',
      borderRadius: '8px',
    },
  },
  
  // Ripple effect for buttons
  ripple: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      width: '0',
      height: '0',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translate(-50%, -50%)',
      transition: `width ${discordAnimations.duration.normal}, height ${discordAnimations.duration.normal}`,
    },
    '&:active::before': {
      width: '300px',
      height: '300px',
    },
  },
}

/**
 * Stagger animation utilities for lists and grids
 */
export const staggerAnimations = {
  // Create staggered fade-in animation for children
  staggerFadeIn: (delay: number = 100) => ({
    '& > *': {
      opacity: 0,
      animation: animations.fadeInUp(),
    },
    '& > *:nth-child(1)': { animationDelay: `${delay * 0}ms` },
    '& > *:nth-child(2)': { animationDelay: `${delay * 1}ms` },
    '& > *:nth-child(3)': { animationDelay: `${delay * 2}ms` },
    '& > *:nth-child(4)': { animationDelay: `${delay * 3}ms` },
    '& > *:nth-child(5)': { animationDelay: `${delay * 4}ms` },
    '& > *:nth-child(6)': { animationDelay: `${delay * 5}ms` },
    '& > *:nth-child(7)': { animationDelay: `${delay * 6}ms` },
    '& > *:nth-child(8)': { animationDelay: `${delay * 7}ms` },
    '& > *:nth-child(9)': { animationDelay: `${delay * 8}ms` },
    '& > *:nth-child(n+10)': { animationDelay: `${delay * 9}ms` },
  }),
  
  // Create staggered scale-in animation for grid items
  staggerScaleIn: (delay: number = 150) => ({
    '& > *': {
      opacity: 0,
      transform: 'scale(0.9)',
      animation: animations.scaleIn(),
    },
    '& > *:nth-child(1)': { animationDelay: `${delay * 0}ms` },
    '& > *:nth-child(2)': { animationDelay: `${delay * 1}ms` },
    '& > *:nth-child(3)': { animationDelay: `${delay * 2}ms` },
    '& > *:nth-child(4)': { animationDelay: `${delay * 3}ms` },
    '& > *:nth-child(5)': { animationDelay: `${delay * 4}ms` },
    '& > *:nth-child(6)': { animationDelay: `${delay * 5}ms` },
  }),
}

/**
 * Loading animation utilities
 */
export const loadingAnimations = {
  // Discord-style skeleton loader
  skeleton: {
    background: `linear-gradient(90deg, ${discordColors.background.modifier.hover} 25%, ${discordColors.background.modifier.active} 50%, ${discordColors.background.modifier.hover} 75%)`,
    backgroundSize: '200px 100%',
    animation: animations.shimmer(),
  },
  
  // Discord-style spinner
  spinner: {
    width: '20px',
    height: '20px',
    border: `2px solid ${discordColors.interactive.normal}`,
    borderTop: `2px solid ${discordColors.brand.primary}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
  // Discord-style dots loader
  dots: {
    display: 'inline-flex',
    gap: '4px',
    '& > div': {
      width: '6px',
      height: '6px',
      backgroundColor: discordColors.brand.primary,
      borderRadius: '50%',
      animation: animations.pulse('1.4s'),
    },
    '& > div:nth-child(1)': { animationDelay: '0s' },
    '& > div:nth-child(2)': { animationDelay: '0.2s' },
    '& > div:nth-child(3)': { animationDelay: '0.4s' },
  },
}

/**
 * Page transition utilities
 */
export const pageTransitions = {
  // Fade transition
  fade: {
    enter: {
      opacity: 0,
    },
    enterActive: {
      opacity: 1,
      transition: `opacity ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    },
    exit: {
      opacity: 1,
    },
    exitActive: {
      opacity: 0,
      transition: `opacity ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    },
  },
  
  // Slide transition
  slide: {
    enter: {
      transform: 'translateX(100%)',
    },
    enterActive: {
      transform: 'translateX(0)',
      transition: `transform ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    },
    exit: {
      transform: 'translateX(0)',
    },
    exitActive: {
      transform: 'translateX(-100%)',
      transition: `transform ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    },
  },
  
  // Scale transition
  scale: {
    enter: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    enterActive: {
      opacity: 1,
      transform: 'scale(1)',
      transition: `all ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    },
    exit: {
      opacity: 1,
      transform: 'scale(1)',
    },
    exitActive: {
      opacity: 0,
      transform: 'scale(1.1)',
      transition: `all ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
    },
  },
}

/**
 * Utility function to create CSS keyframes dynamically
 */
export function createKeyframes(name: string, keyframes: Record<string, any>): string {
  const keyframeString = Object.entries(keyframes)
    .map(([key, value]) => {
      const properties = Object.entries(value)
        .map(([prop, val]) => `${prop}: ${val};`)
        .join(' ')
      return `${key} { ${properties} }`
    })
    .join(' ')
  
  return `@keyframes ${name} { ${keyframeString} }`
}

/**
 * Utility function to apply animations with reduced motion support
 */
export function withReducedMotion(animation: string, fallback: string = 'none'): string {
  return `
    @media (prefers-reduced-motion: no-preference) {
      animation: ${animation};
    }
    @media (prefers-reduced-motion: reduce) {
      animation: ${fallback};
    }
  `
}

/**
 * Export all animation utilities
 */
export default {
  keyframes: animationKeyframes,
  animations,
  microInteractions,
  staggerAnimations,
  loadingAnimations,
  pageTransitions,
  createKeyframes,
  withReducedMotion,
}