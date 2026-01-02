/**
 * Discord-Inspired Design System Configuration
 * 
 * This file contains all the design tokens, color palettes, and theme
 * configurations for the Discord-inspired UI redesign.
 */

export const discordColors = {
  // Background colors
  background: {
    primary: '#36393f',    // Main background
    secondary: '#2f3136',  // Secondary background
    tertiary: '#202225',   // Sidebar/nav background
    elevated: '#40444b',   // Elevated surfaces
    floating: '#18191c',   // Floating elements
    modifier: {
      hover: 'rgba(79, 84, 92, 0.16)',
      active: 'rgba(79, 84, 92, 0.24)',
      selected: 'rgba(79, 84, 92, 0.32)',
      accent: 'rgba(88, 101, 242, 0.1)',
    }
  },
  
  // Text colors
  text: {
    primary: '#ffffff',    // Primary text
    secondary: '#b9bbbe',  // Secondary text
    muted: '#72767d',      // Muted text
    link: '#00b0f4',       // Links
    positive: '#3ba55c',   // Success text
    warning: '#faa61a',    // Warning text
    danger: '#ed4245',     // Error text
  },
  
  // Brand colors
  brand: {
    primary: '#5865f2',    // Discord blurple
    secondary: '#3ba55c',  // Green
    accent: '#faa61a',     // Yellow/orange
  },
  
  // Status colors
  status: {
    success: '#3ba55c',
    warning: '#faa61a',
    error: '#ed4245',
    info: '#00b0f4',
  },
  
  // Interactive colors
  interactive: {
    normal: '#4f545c',
    hover: '#40444b',
    active: '#36393f',
    muted: '#2f3136',
  }
} as const;

export const discordTypography = {
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace'
    ],
  },
  
  fontSize: {
    display: {
      size: '2.5rem',
      lineHeight: '1.2',
      fontWeight: '700'
    },
    'heading-1': {
      size: '2rem',
      lineHeight: '1.25',
      fontWeight: '600'
    },
    'heading-2': {
      size: '1.5rem',
      lineHeight: '1.3',
      fontWeight: '600'
    },
    'heading-3': {
      size: '1.25rem',
      lineHeight: '1.4',
      fontWeight: '600'
    },
    body: {
      size: '1rem',
      lineHeight: '1.5',
      fontWeight: '400'
    },
    small: {
      size: '0.875rem',
      lineHeight: '1.4',
      fontWeight: '400'
    },
    caption: {
      size: '0.75rem',
      lineHeight: '1.3',
      fontWeight: '500'
    },
  }
} as const;

export const discordSpacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const discordBorderRadius = {
  default: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const discordShadows = {
  low: '0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05)',
  medium: '0 4px 4px rgba(0, 0, 0, 0.16)',
  high: '0 8px 16px rgba(0, 0, 0, 0.16)',
  elevation: {
    low: '0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05)',
    medium: '0 4px 4px rgba(0, 0, 0, 0.16)',
    high: '0 8px 16px rgba(0, 0, 0, 0.16)',
  }
} as const;

export const discordAnimations = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;

/**
 * Discord Theme Configuration Object
 * 
 * This is the main theme object that combines all design tokens
 * and can be used throughout the application.
 */
export const discordTheme = {
  colors: discordColors,
  typography: discordTypography,
  spacing: discordSpacing,
  borderRadius: discordBorderRadius,
  shadows: discordShadows,
  animations: discordAnimations,
} as const;

/**
 * CSS Custom Properties Generator
 * 
 * Generates CSS custom properties from the theme configuration
 * for use in CSS files and styled components.
 */
export function generateCSSCustomProperties() {
  const cssVars: Record<string, string> = {};
  
  // Generate color variables
  Object.entries(discordColors).forEach(([category, colors]) => {
    if (typeof colors === 'object' && colors !== null) {
      Object.entries(colors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          cssVars[`--discord-${category}-${key}`] = value;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            cssVars[`--discord-${category}-${key}-${subKey}`] = subValue as string;
          });
        }
      });
    }
  });
  
  // Generate spacing variables
  Object.entries(discordSpacing).forEach(([key, value]) => {
    cssVars[`--discord-spacing-${key}`] = value;
  });
  
  // Generate border radius variables
  Object.entries(discordBorderRadius).forEach(([key, value]) => {
    cssVars[`--discord-radius-${key}`] = value;
  });
  
  return cssVars;
}

/**
 * Utility function to get theme values with TypeScript support
 */
export function getThemeValue<T extends keyof typeof discordTheme>(
  category: T,
  path: string
): any {
  const keys = path.split('.');
  let value: any = discordTheme[category];
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value;
}

/**
 * Component variant configurations
 */
export const discordComponentVariants = {
  button: {
    primary: {
      backgroundColor: discordColors.brand.primary,
      color: discordColors.text.primary,
      '&:hover': {
        backgroundColor: `${discordColors.brand.primary}e6`, // 90% opacity
      }
    },
    secondary: {
      backgroundColor: discordColors.interactive.normal,
      color: discordColors.text.primary,
      '&:hover': {
        backgroundColor: discordColors.interactive.hover,
      }
    },
    success: {
      backgroundColor: discordColors.status.success,
      color: discordColors.text.primary,
      '&:hover': {
        backgroundColor: `${discordColors.status.success}e6`, // 90% opacity
      }
    },
    danger: {
      backgroundColor: discordColors.status.error,
      color: discordColors.text.primary,
      '&:hover': {
        backgroundColor: `${discordColors.status.error}e6`, // 90% opacity
      }
    },
    ghost: {
      backgroundColor: 'transparent',
      color: discordColors.text.secondary,
      '&:hover': {
        backgroundColor: discordColors.background.modifier.hover,
        color: discordColors.text.primary,
      }
    }
  },
  
  card: {
    default: {
      backgroundColor: discordColors.background.secondary,
      borderRadius: discordBorderRadius.lg,
      boxShadow: discordShadows.low,
    },
    elevated: {
      backgroundColor: discordColors.background.elevated,
      borderRadius: discordBorderRadius.lg,
      boxShadow: discordShadows.medium,
    },
    interactive: {
      backgroundColor: discordColors.background.secondary,
      borderRadius: discordBorderRadius.lg,
      boxShadow: discordShadows.low,
      transition: `all ${discordAnimations.duration.normal} ${discordAnimations.easing.default}`,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: discordShadows.high,
      }
    }
  }
} as const;

export type DiscordTheme = typeof discordTheme;
export type DiscordColors = typeof discordColors;
export type DiscordComponentVariants = typeof discordComponentVariants;