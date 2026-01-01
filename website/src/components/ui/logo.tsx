'use client'

import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'text'
}

const sizeClasses = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 }, 
  lg: { width: 64, height: 64 },
  xl: { width: 80, height: 80 }
}

export function Logo({ className = '', size = 'md', variant = 'full' }: LogoProps) {
  const { width, height } = sizeClasses[size]
  
  const LogoIcon = () => (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.png"
        alt="OpenLaunch"
        width={width}
        height={height}
        className="object-contain"
        priority
        onError={(e) => {
          console.error('Logo image failed to load:', e);
        }}
      />
    </div>
  )

  const LogoText = ({ textSize = 'text-xl' }: { textSize?: string }) => (
    <span className={`${textSize} font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent`}>
      OpenLaunch
    </span>
  )

  if (variant === 'icon') {
    return <LogoIcon />
  }

  if (variant === 'text') {
    return <LogoText textSize={size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'} />
  }

  // Since the logo SVG already contains the text, just return the icon
  return <LogoIcon />
}