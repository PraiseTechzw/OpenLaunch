/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      // Discord-inspired responsive breakpoints
      'xs': '475px',    // Extra small devices (large phones)
      'sm': '640px',    // Small devices (tablets)
      'md': '768px',    // Medium devices (small laptops)
      'lg': '1024px',   // Large devices (desktops)
      'xl': '1280px',   // Extra large devices (large desktops)
      '2xl': '1536px',  // 2X large devices (larger desktops)
      '3xl': '1920px',  // 3X large devices (ultra-wide)
      
      // Custom breakpoints for specific use cases
      'mobile': { 'max': '767px' },     // Mobile-only styles
      'tablet': { 'min': '768px', 'max': '1023px' }, // Tablet-only styles
      'desktop': { 'min': '1024px' },   // Desktop and up
      'touch': { 'max': '1023px' },     // Touch devices (mobile + tablet)
      'no-touch': { 'min': '1024px' },  // Non-touch devices (desktop)
    },
    extend: {
      colors: {
        // Discord-inspired color system
        discord: {
          // Background colors
          background: {
            primary: '#36393f',    // Main background
            secondary: '#2f3136',  // Secondary background
            tertiary: '#202225',   // Sidebar/nav background
            elevated: '#40444b',   // Elevated surfaces
            modifier: {
              hover: '#4f545c52',
              active: '#4f545c99',
              selected: '#4f545c99',
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
        },
        
        // Legacy colors for backward compatibility
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8b93f8',
          500: '#5865f2',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#f0fdf9',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#3ba55c',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#faa61a',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        // CSS custom property colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      
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
        // Discord-inspired typography scale
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-1': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],
      },
      
      spacing: {
        // Discord-inspired spacing scale
        '18': '4.5rem',
        '88': '22rem',
        
        // Enhanced responsive spacing
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Enhanced container configuration
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xs: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '4rem',
        },
        screens: {
          xs: '475px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px', // Slightly smaller than default for better content width
        },
      },
      
      // Grid system enhancements
      gridTemplateColumns: {
        // Discord-style grid layouts
        'discord-sidebar': '240px 1fr',
        'discord-sidebar-collapsed': '72px 1fr',
        'discord-main': '1fr 300px',
        'discord-full': 'minmax(0, 1fr)',
        
        // Responsive grid patterns
        'auto-fit-xs': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-sm': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(350px, 1fr))',
        
        // Card grid layouts
        'cards-1': 'repeat(1, minmax(0, 1fr))',
        'cards-2': 'repeat(2, minmax(0, 1fr))',
        'cards-3': 'repeat(3, minmax(0, 1fr))',
        'cards-4': 'repeat(4, minmax(0, 1fr))',
        'cards-auto': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
      
      gridTemplateRows: {
        // Layout rows
        'layout': 'auto 1fr auto',
        'header-main-footer': 'auto 1fr auto',
        'nav-content': 'auto 1fr',
      },
      
      // Responsive max widths
      maxWidth: {
        'discord-content': '1200px',
        'discord-wide': '1400px',
        'discord-full': '1600px',
        'prose-sm': '60ch',
        'prose-md': '70ch',
        'prose-lg': '80ch',
      },
      
      borderRadius: {
        // Discord-style border radius
        'discord': '8px',
        'discord-lg': '12px',
        'discord-xl': '16px',
      },
      
      boxShadow: {
        // Discord-style shadows
        'discord': '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
        'discord-lg': '0 8px 16px rgba(0, 0, 0, 0.24)',
        'discord-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'discord-elevation-low': '0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05)',
        'discord-elevation-medium': '0 4px 4px rgba(0, 0, 0, 0.16)',
        'discord-elevation-high': '0 8px 16px rgba(0, 0, 0, 0.16)',
      },
      
      animation: {
        // Discord-style animations
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in-up': 'slideInUp 0.2s ease-out',
        'slide-in-down': 'slideInDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'discord-bounce': 'discordBounce 0.6s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        discordBounce: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            a: {
              color: '#00b0f4',
              textDecoration: 'none',
              '&:hover': {
                color: '#0099d4',
                textDecoration: 'underline',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#2f3136',
              color: '#dcddde',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}