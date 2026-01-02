/**
 * Discord UI Utilities
 * 
 * Utility functions and class generators for Discord-inspired components
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Discord Button Class Generator
 */
export const discordButton = {
  base: "inline-flex items-center justify-center rounded-discord px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  
  variants: {
    primary: "bg-discord-brand-primary text-white hover:bg-opacity-90 focus:ring-discord-brand-primary",
    secondary: "bg-discord-interactive-normal text-discord-text-primary hover:bg-discord-interactive-hover focus:ring-discord-interactive-normal",
    success: "bg-discord-status-success text-white hover:bg-opacity-90 focus:ring-discord-status-success",
    danger: "bg-discord-status-error text-white hover:bg-opacity-90 focus:ring-discord-status-error",
    ghost: "bg-transparent text-discord-text-secondary hover:bg-discord-background-modifier-hover hover:text-discord-text-primary focus:ring-discord-interactive-normal",
  },
  
  sizes: {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }
};

/**
 * Discord Card Class Generator
 */
export const discordCard = {
  base: "rounded-discord-lg bg-card border border-border",
  
  variants: {
    default: "p-6 shadow-discord",
    elevated: "p-6 shadow-discord-lg",
    interactive: "p-6 shadow-discord transition-all duration-200 hover:shadow-discord-lg hover:-translate-y-1 cursor-pointer",
    compact: "p-4 shadow-discord",
  }
};

/**
 * Discord Input Class Generator
 */
export const discordInput = {
  base: "w-full rounded-discord border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  
  variants: {
    default: "",
    error: "border-discord-status-error focus-visible:ring-discord-status-error",
    success: "border-discord-status-success focus-visible:ring-discord-status-success",
  }
};

/**
 * Discord Navigation Class Generator
 */
export const discordNav = {
  item: {
    base: "flex items-center px-3 py-2 rounded-discord text-sm font-medium transition-colors duration-200",
    active: "bg-discord-background-modifier-selected text-discord-text-primary",
    inactive: "text-discord-text-secondary hover:bg-discord-background-modifier-hover hover:text-discord-text-primary",
  }
};

/**
 * Discord Typography Class Generator
 */
export const discordTypography = {
  display: "text-display font-bold text-foreground",
  heading1: "text-heading-1 font-semibold text-foreground",
  heading2: "text-heading-2 font-semibold text-foreground",
  heading3: "text-heading-3 font-semibold text-foreground",
  body: "text-body text-foreground",
  small: "text-small text-muted-foreground",
  caption: "text-caption font-medium text-muted-foreground",
  link: "text-discord-text-link hover:text-discord-brand-primary transition-colors duration-200 cursor-pointer",
};

/**
 * Discord Animation Class Generator
 */
export const discordAnimation = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-in-up",
  slideDown: "animate-slide-in-down",
  scale: "animate-scale-in",
  bounce: "animate-discord-bounce",
  
  hover: {
    lift: "transition-transform duration-200 hover:-translate-y-1",
    glow: "transition-shadow duration-200 hover:shadow-discord-lg",
    scale: "transition-transform duration-200 hover:scale-105",
  }
};

/**
 * Discord Loading State Class Generator
 */
export const discordLoading = {
  skeleton: "animate-pulse bg-discord-background-modifier-hover rounded-discord h-4 w-full",
  spinner: "animate-spin rounded-full border-2 border-discord-interactive-normal border-t-discord-brand-primary",
  
  sizes: {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }
};

/**
 * Discord Modal Class Generator
 */
export const discordModal = {
  overlay: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
  content: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-discord-high duration-200 rounded-discord-lg",
};

/**
 * Utility function to generate Discord button classes
 */
export function getDiscordButtonClasses(
  variant: keyof typeof discordButton.variants = 'primary',
  size: keyof typeof discordButton.sizes = 'md',
  className?: string
) {
  return cn(
    discordButton.base,
    discordButton.variants[variant],
    discordButton.sizes[size],
    className
  );
}

/**
 * Utility function to generate Discord card classes
 */
export function getDiscordCardClasses(
  variant: keyof typeof discordCard.variants = 'default',
  className?: string
) {
  return cn(
    discordCard.base,
    discordCard.variants[variant],
    className
  );
}

/**
 * Utility function to generate Discord input classes
 */
export function getDiscordInputClasses(
  variant: keyof typeof discordInput.variants = 'default',
  className?: string
) {
  return cn(
    discordInput.base,
    discordInput.variants[variant],
    className
  );
}

/**
 * Utility function to generate Discord navigation classes
 */
export function getDiscordNavClasses(
  isActive: boolean = false,
  className?: string
) {
  return cn(
    discordNav.item.base,
    isActive ? discordNav.item.active : discordNav.item.inactive,
    className
  );
}

/**
 * Utility function to generate Discord typography classes
 */
export function getDiscordTypographyClasses(
  variant: keyof typeof discordTypography,
  className?: string
) {
  return cn(
    discordTypography[variant],
    className
  );
}

/**
 * Utility function to generate Discord loading classes
 */
export function getDiscordLoadingClasses(
  type: 'skeleton' | 'spinner',
  size: keyof typeof discordLoading.sizes = 'md',
  className?: string
) {
  if (type === 'skeleton') {
    return cn(discordLoading.skeleton, className);
  }
  
  return cn(
    discordLoading.spinner,
    discordLoading.sizes[size],
    className
  );
}

/**
 * Color utility functions
 */
export const discordColorUtils = {
  /**
   * Get CSS variable for Discord color
   */
  getCSSVar: (path: string) => `var(--discord-${path})`,
  
  /**
   * Get RGB values for Discord color (for use with opacity)
   */
  getRGB: (color: string) => {
    // This would need to be implemented based on the actual color values
    // For now, return the color as-is
    return color;
  },
  
  /**
   * Apply opacity to Discord color
   */
  withOpacity: (color: string, opacity: number) => {
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  }
};

/**
 * Responsive utility functions
 */
export const discordResponsive = {
  /**
   * Generate responsive classes for Discord components
   */
  responsive: (classes: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  }) => {
    return cn(
      classes.base,
      classes.sm && `sm:${classes.sm}`,
      classes.md && `md:${classes.md}`,
      classes.lg && `lg:${classes.lg}`,
      classes.xl && `xl:${classes.xl}`
    );
  }
};

/**
 * Focus management utilities for accessibility
 */
export const discordA11y = {
  focusRing: "focus:outline-none focus:ring-2 focus:ring-discord-brand-primary focus:ring-offset-2 focus:ring-offset-background",
  srOnly: "sr-only",
  skipLink: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-discord-brand-primary text-white px-4 py-2 rounded-discord z-50",
};

/**
 * Export all utilities as a single object for convenience
 */
export const discord = {
  button: discordButton,
  card: discordCard,
  input: discordInput,
  nav: discordNav,
  typography: discordTypography,
  animation: discordAnimation,
  loading: discordLoading,
  modal: discordModal,
  colors: discordColorUtils,
  responsive: discordResponsive,
  a11y: discordA11y,
  
  // Helper functions
  getButtonClasses: getDiscordButtonClasses,
  getCardClasses: getDiscordCardClasses,
  getInputClasses: getDiscordInputClasses,
  getNavClasses: getDiscordNavClasses,
  getTypographyClasses: getDiscordTypographyClasses,
  getLoadingClasses: getDiscordLoadingClasses,
};