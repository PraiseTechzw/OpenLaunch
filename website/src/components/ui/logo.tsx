'use client'

import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'text' | 'navigation'
}

const sizeClasses = {
  sm: { width: 40, height: 40 },
  md: { width: 56, height: 56 }, 
  lg: { width: 72, height: 72 },
  xl: { width: 96, height: 96 }
}

export function Logo({ className = '', size = 'md', variant = 'icon' }: LogoProps) {
  const { width, height } = sizeClasses[size]
  
  const LogoIcon = () => (
    <div className={`relative ${className} group`}>
      <Image
        src="/logo.png"
        alt="OpenLaunch"
        width={width}
        height={height}
        className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        priority
        style={{
          filter: 'brightness(1.1) contrast(1.1)',
        }}
        onError={(e) => {
          console.error('Logo image failed to load:', e);
        }}
      />
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  )

  const LogoText = ({ textSize = 'text-xl' }: { textSize?: string }) => (
    <span className={`${textSize} font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hover:from-primary-600 hover:to-secondary-600 transition-all duration-300`}>
      OpenLaunch
    </span>
  )

  const NavigationLogo = () => (
    <div className="flex items-center group">
      {/* Just the logo icon with animation - no text */}
      <div className={`relative ${className}`}>
        <Image
          src="/logo.png"
          alt="OpenLaunch"
          width={width}
          height={height}
          className="object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          priority
          style={{
            filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 0 8px rgba(0,0,0,0.1))',
          }}
          onError={(e) => {
            console.error('Logo image failed to load:', e);
          }}
        />
        {/* Subtle animated glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </div>
  )

  if (variant === 'icon') {
    return <LogoIcon />
  }

  if (variant === 'text') {
    return <LogoText textSize={size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'} />
  }

  if (variant === 'navigation') {
    return <NavigationLogo />
  }

  if (variant === 'full') {
    return <NavigationLogo />
  }

  // Default: just return the icon
  return <LogoIcon />
}