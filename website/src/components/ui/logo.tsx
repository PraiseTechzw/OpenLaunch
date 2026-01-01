import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'icon' | 'text'
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

export function Logo({ className = '', size = 'md', variant = 'full' }: LogoProps) {
  const iconSize = sizeClasses[size]
  
  const LogoIcon = () => (
    <div className={`${iconSize} bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-3/5 h-3/5 text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rocket/Launch icon representing OpenLaunch */}
        <path
          d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
          fill="currentColor"
        />
        <path
          d="M5 16L6.5 19L9 17.5L7.5 15L5 16Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M15 17.5L17.5 19L19 16L16.5 15L15 17.5Z"
          fill="currentColor"
          opacity="0.7"
        />
        <circle cx="12" cy="9" r="1.5" fill="white" opacity="0.9" />
      </svg>
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

  return (
    <div className="flex items-center space-x-3">
      <LogoIcon />
      <LogoText textSize={size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'} />
    </div>
  )
}