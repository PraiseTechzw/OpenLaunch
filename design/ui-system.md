# UI System: OpenLaunch

## Overview

The OpenLaunch UI System is a comprehensive design system that ensures consistency, accessibility, and efficiency across all our applications and annual Coding Party initiatives. It provides reusable components, design tokens, and guidelines that enable our community to build cohesive user experiences.

## Design Tokens

### Color System

#### Brand Colors
```css
/* Primary Brand Colors */
--cp-primary-50: #f0f9ff;
--cp-primary-100: #e0f2fe;
--cp-primary-200: #bae6fd;
--cp-primary-300: #7dd3fc;
--cp-primary-400: #38bdf8;
--cp-primary-500: #0ea5e9;  /* Primary brand color */
--cp-primary-600: #0284c7;
--cp-primary-700: #0369a1;
--cp-primary-800: #075985;
--cp-primary-900: #0c4a6e;

/* Secondary Brand Colors */
--cp-secondary-50: #fdf4ff;
--cp-secondary-100: #fae8ff;
--cp-secondary-200: #f5d0fe;
--cp-secondary-300: #f0abfc;
--cp-secondary-400: #e879f9;
--cp-secondary-500: #d946ef;  /* Secondary brand color */
--cp-secondary-600: #c026d3;
--cp-secondary-700: #a21caf;
--cp-secondary-800: #86198f;
--cp-secondary-900: #701a75;
```

#### Semantic Colors
```css
/* Success Colors */
--cp-success-50: #f0fdf4;
--cp-success-100: #dcfce7;
--cp-success-200: #bbf7d0;
--cp-success-300: #86efac;
--cp-success-400: #4ade80;
--cp-success-500: #22c55e;  /* Success primary */
--cp-success-600: #16a34a;
--cp-success-700: #15803d;
--cp-success-800: #166534;
--cp-success-900: #14532d;

/* Warning Colors */
--cp-warning-50: #fffbeb;
--cp-warning-100: #fef3c7;
--cp-warning-200: #fde68a;
--cp-warning-300: #fcd34d;
--cp-warning-400: #fbbf24;
--cp-warning-500: #f59e0b;  /* Warning primary */
--cp-warning-600: #d97706;
--cp-warning-700: #b45309;
--cp-warning-800: #92400e;
--cp-warning-900: #78350f;

/* Error Colors */
--cp-error-50: #fef2f2;
--cp-error-100: #fee2e2;
--cp-error-200: #fecaca;
--cp-error-300: #fca5a5;
--cp-error-400: #f87171;
--cp-error-500: #ef4444;  /* Error primary */
--cp-error-600: #dc2626;
--cp-error-700: #b91c1c;
--cp-error-800: #991b1b;
--cp-error-900: #7f1d1d;

/* Info Colors */
--cp-info-50: #eff6ff;
--cp-info-100: #dbeafe;
--cp-info-200: #bfdbfe;
--cp-info-300: #93c5fd;
--cp-info-400: #60a5fa;
--cp-info-500: #3b82f6;  /* Info primary */
--cp-info-600: #2563eb;
--cp-info-700: #1d4ed8;
--cp-info-800: #1e40af;
--cp-info-900: #1e3a8a;
```

#### Neutral Colors
```css
/* Gray Scale */
--cp-gray-50: #f9fafb;
--cp-gray-100: #f3f4f6;
--cp-gray-200: #e5e7eb;
--cp-gray-300: #d1d5db;
--cp-gray-400: #9ca3af;
--cp-gray-500: #6b7280;
--cp-gray-600: #4b5563;
--cp-gray-700: #374151;
--cp-gray-800: #1f2937;
--cp-gray-900: #111827;

/* True Neutral */
--cp-neutral-50: #fafafa;
--cp-neutral-100: #f5f5f5;
--cp-neutral-200: #e5e5e5;
--cp-neutral-300: #d4d4d4;
--cp-neutral-400: #a3a3a3;
--cp-neutral-500: #737373;
--cp-neutral-600: #525252;
--cp-neutral-700: #404040;
--cp-neutral-800: #262626;
--cp-neutral-900: #171717;
```

### Typography

#### Font Families
```css
/* Primary Font Stack */
--cp-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

/* Monospace Font Stack */
--cp-font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', monospace;

/* Display Font Stack */
--cp-font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Font Sizes
```css
/* Font Size Scale */
--cp-text-xs: 0.75rem;    /* 12px */
--cp-text-sm: 0.875rem;   /* 14px */
--cp-text-base: 1rem;     /* 16px */
--cp-text-lg: 1.125rem;   /* 18px */
--cp-text-xl: 1.25rem;    /* 20px */
--cp-text-2xl: 1.5rem;    /* 24px */
--cp-text-3xl: 1.875rem;  /* 30px */
--cp-text-4xl: 2.25rem;   /* 36px */
--cp-text-5xl: 3rem;      /* 48px */
--cp-text-6xl: 3.75rem;   /* 60px */
--cp-text-7xl: 4.5rem;    /* 72px */
--cp-text-8xl: 6rem;      /* 96px */
--cp-text-9xl: 8rem;      /* 128px */
```

#### Font Weights
```css
/* Font Weight Scale */
--cp-font-thin: 100;
--cp-font-extralight: 200;
--cp-font-light: 300;
--cp-font-normal: 400;
--cp-font-medium: 500;
--cp-font-semibold: 600;
--cp-font-bold: 700;
--cp-font-extrabold: 800;
--cp-font-black: 900;
```

#### Line Heights
```css
/* Line Height Scale */
--cp-leading-none: 1;
--cp-leading-tight: 1.25;
--cp-leading-snug: 1.375;
--cp-leading-normal: 1.5;
--cp-leading-relaxed: 1.625;
--cp-leading-loose: 2;
```

### Spacing

#### Spacing Scale
```css
/* Spacing Scale (based on 4px unit) */
--cp-space-0: 0;
--cp-space-px: 1px;
--cp-space-0-5: 0.125rem;  /* 2px */
--cp-space-1: 0.25rem;     /* 4px */
--cp-space-1-5: 0.375rem;  /* 6px */
--cp-space-2: 0.5rem;      /* 8px */
--cp-space-2-5: 0.625rem;  /* 10px */
--cp-space-3: 0.75rem;     /* 12px */
--cp-space-3-5: 0.875rem;  /* 14px */
--cp-space-4: 1rem;        /* 16px */
--cp-space-5: 1.25rem;     /* 20px */
--cp-space-6: 1.5rem;      /* 24px */
--cp-space-7: 1.75rem;     /* 28px */
--cp-space-8: 2rem;        /* 32px */
--cp-space-9: 2.25rem;     /* 36px */
--cp-space-10: 2.5rem;     /* 40px */
--cp-space-11: 2.75rem;    /* 44px */
--cp-space-12: 3rem;       /* 48px */
--cp-space-14: 3.5rem;     /* 56px */
--cp-space-16: 4rem;       /* 64px */
--cp-space-20: 5rem;       /* 80px */
--cp-space-24: 6rem;       /* 96px */
--cp-space-28: 7rem;       /* 112px */
--cp-space-32: 8rem;       /* 128px */
--cp-space-36: 9rem;       /* 144px */
--cp-space-40: 10rem;      /* 160px */
--cp-space-44: 11rem;      /* 176px */
--cp-space-48: 12rem;      /* 192px */
--cp-space-52: 13rem;      /* 208px */
--cp-space-56: 14rem;      /* 224px */
--cp-space-60: 15rem;      /* 240px */
--cp-space-64: 16rem;      /* 256px */
--cp-space-72: 18rem;      /* 288px */
--cp-space-80: 20rem;      /* 320px */
--cp-space-96: 24rem;      /* 384px */
```

### Border Radius

```css
/* Border Radius Scale */
--cp-radius-none: 0;
--cp-radius-sm: 0.125rem;   /* 2px */
--cp-radius-base: 0.25rem;  /* 4px */
--cp-radius-md: 0.375rem;   /* 6px */
--cp-radius-lg: 0.5rem;     /* 8px */
--cp-radius-xl: 0.75rem;    /* 12px */
--cp-radius-2xl: 1rem;      /* 16px */
--cp-radius-3xl: 1.5rem;    /* 24px */
--cp-radius-full: 9999px;
```

### Shadows

```css
/* Shadow Scale */
--cp-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--cp-shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--cp-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--cp-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--cp-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--cp-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--cp-shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
--cp-shadow-none: 0 0 #0000;
```

---

## Component Library

### Button Component

#### Button Variants
```html
<!-- Primary Button -->
<button class="cp-btn cp-btn--primary">
  Primary Action
</button>

<!-- Secondary Button -->
<button class="cp-btn cp-btn--secondary">
  Secondary Action
</button>

<!-- Tertiary Button -->
<button class="cp-btn cp-btn--tertiary">
  Tertiary Action
</button>

<!-- Destructive Button -->
<button class="cp-btn cp-btn--destructive">
  Delete Item
</button>
```

#### Button Sizes
```html
<!-- Small Button -->
<button class="cp-btn cp-btn--primary cp-btn--sm">
  Small Button
</button>

<!-- Default Button -->
<button class="cp-btn cp-btn--primary">
  Default Button
</button>

<!-- Large Button -->
<button class="cp-btn cp-btn--primary cp-btn--lg">
  Large Button
</button>
```

#### Button States
```html
<!-- Loading Button -->
<button class="cp-btn cp-btn--primary cp-btn--loading" disabled>
  <span class="cp-spinner cp-spinner--sm"></span>
  Loading...
</button>

<!-- Disabled Button -->
<button class="cp-btn cp-btn--primary" disabled>
  Disabled Button
</button>
```

#### Button CSS
```css
.cp-btn {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cp-space-2);
  padding: var(--cp-space-2) var(--cp-space-4);
  border: 1px solid transparent;
  border-radius: var(--cp-radius-md);
  font-family: var(--cp-font-sans);
  font-size: var(--cp-text-sm);
  font-weight: var(--cp-font-medium);
  line-height: var(--cp-leading-tight);
  text-decoration: none;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  min-height: 44px; /* Accessibility: minimum touch target */
  
  /* Focus styles */
  &:focus {
    outline: 2px solid var(--cp-primary-500);
    outline-offset: 2px;
  }
  
  /* Disabled styles */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Primary Button */
.cp-btn--primary {
  background-color: var(--cp-primary-500);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: var(--cp-primary-600);
  }
  
  &:active:not(:disabled) {
    background-color: var(--cp-primary-700);
  }
}

/* Secondary Button */
.cp-btn--secondary {
  background-color: transparent;
  color: var(--cp-primary-500);
  border-color: var(--cp-primary-500);
  
  &:hover:not(:disabled) {
    background-color: var(--cp-primary-50);
  }
  
  &:active:not(:disabled) {
    background-color: var(--cp-primary-100);
  }
}

/* Tertiary Button */
.cp-btn--tertiary {
  background-color: transparent;
  color: var(--cp-gray-700);
  
  &:hover:not(:disabled) {
    background-color: var(--cp-gray-100);
  }
  
  &:active:not(:disabled) {
    background-color: var(--cp-gray-200);
  }
}

/* Destructive Button */
.cp-btn--destructive {
  background-color: var(--cp-error-500);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: var(--cp-error-600);
  }
  
  &:active:not(:disabled) {
    background-color: var(--cp-error-700);
  }
}

/* Button Sizes */
.cp-btn--sm {
  padding: var(--cp-space-1-5) var(--cp-space-3);
  font-size: var(--cp-text-xs);
  min-height: 36px;
}

.cp-btn--lg {
  padding: var(--cp-space-3) var(--cp-space-6);
  font-size: var(--cp-text-base);
  min-height: 52px;
}
```

### Input Component

#### Input Variants
```html
<!-- Text Input -->
<div class="cp-input-group">
  <label for="email" class="cp-label">Email Address</label>
  <input 
    type="email" 
    id="email" 
    class="cp-input" 
    placeholder="Enter your email"
    required
  >
</div>

<!-- Input with Error -->
<div class="cp-input-group">
  <label for="password" class="cp-label">Password</label>
  <input 
    type="password" 
    id="password" 
    class="cp-input cp-input--error" 
    placeholder="Enter your password"
    aria-describedby="password-error"
  >
  <div id="password-error" class="cp-input-error">
    Password must be at least 8 characters long
  </div>
</div>

<!-- Input with Help Text -->
<div class="cp-input-group">
  <label for="username" class="cp-label">Username</label>
  <input 
    type="text" 
    id="username" 
    class="cp-input" 
    placeholder="Choose a username"
    aria-describedby="username-help"
  >
  <div id="username-help" class="cp-input-help">
    Username must be 3-20 characters and contain only letters, numbers, and underscores
  </div>
</div>
```

#### Input CSS
```css
.cp-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--cp-space-1);
}

.cp-label {
  font-family: var(--cp-font-sans);
  font-size: var(--cp-text-sm);
  font-weight: var(--cp-font-medium);
  color: var(--cp-gray-700);
}

.cp-input {
  padding: var(--cp-space-2-5) var(--cp-space-3);
  border: 1px solid var(--cp-gray-300);
  border-radius: var(--cp-radius-md);
  font-family: var(--cp-font-sans);
  font-size: var(--cp-text-sm);
  line-height: var(--cp-leading-tight);
  background-color: white;
  transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
  min-height: 44px; /* Accessibility: minimum touch target */
  
  &::placeholder {
    color: var(--cp-gray-400);
  }
  
  &:focus {
    outline: none;
    border-color: var(--cp-primary-500);
    box-shadow: 0 0 0 3px var(--cp-primary-100);
  }
  
  &:disabled {
    background-color: var(--cp-gray-50);
    color: var(--cp-gray-500);
    cursor: not-allowed;
  }
}

.cp-input--error {
  border-color: var(--cp-error-500);
  
  &:focus {
    border-color: var(--cp-error-500);
    box-shadow: 0 0 0 3px var(--cp-error-100);
  }
}

.cp-input-error {
  font-size: var(--cp-text-xs);
  color: var(--cp-error-600);
  display: flex;
  align-items: center;
  gap: var(--cp-space-1);
}

.cp-input-help {
  font-size: var(--cp-text-xs);
  color: var(--cp-gray-600);
}
```

### Card Component

#### Card Variants
```html
<!-- Basic Card -->
<div class="cp-card">
  <div class="cp-card__header">
    <h3 class="cp-card__title">Card Title</h3>
    <p class="cp-card__subtitle">Card subtitle or description</p>
  </div>
  <div class="cp-card__content">
    <p>Card content goes here. This can include any type of content.</p>
  </div>
  <div class="cp-card__footer">
    <button class="cp-btn cp-btn--primary">Action</button>
    <button class="cp-btn cp-btn--tertiary">Cancel</button>
  </div>
</div>

<!-- Interactive Card -->
<div class="cp-card cp-card--interactive">
  <div class="cp-card__content">
    <h4>Interactive Card</h4>
    <p>This card is clickable and has hover effects.</p>
  </div>
</div>
```

#### Card CSS
```css
.cp-card {
  background-color: white;
  border: 1px solid var(--cp-gray-200);
  border-radius: var(--cp-radius-lg);
  box-shadow: var(--cp-shadow-sm);
  overflow: hidden;
}

.cp-card--interactive {
  cursor: pointer;
  transition: all 150ms ease-in-out;
  
  &:hover {
    box-shadow: var(--cp-shadow-md);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.cp-card__header {
  padding: var(--cp-space-6);
  border-bottom: 1px solid var(--cp-gray-200);
}

.cp-card__title {
  margin: 0;
  font-size: var(--cp-text-lg);
  font-weight: var(--cp-font-semibold);
  color: var(--cp-gray-900);
}

.cp-card__subtitle {
  margin: var(--cp-space-1) 0 0 0;
  font-size: var(--cp-text-sm);
  color: var(--cp-gray-600);
}

.cp-card__content {
  padding: var(--cp-space-6);
}

.cp-card__footer {
  padding: var(--cp-space-6);
  border-top: 1px solid var(--cp-gray-200);
  background-color: var(--cp-gray-50);
  display: flex;
  gap: var(--cp-space-3);
  justify-content: flex-end;
}
```

### Alert Component

#### Alert Variants
```html
<!-- Success Alert -->
<div class="cp-alert cp-alert--success" role="alert">
  <div class="cp-alert__icon">
    <svg class="cp-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </div>
  <div class="cp-alert__content">
    <div class="cp-alert__title">Success!</div>
    <div class="cp-alert__message">Your changes have been saved successfully.</div>
  </div>
  <button class="cp-alert__close" aria-label="Close alert">
    <svg class="cp-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>
</div>

<!-- Error Alert -->
<div class="cp-alert cp-alert--error" role="alert">
  <div class="cp-alert__icon">
    <svg class="cp-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  </div>
  <div class="cp-alert__content">
    <div class="cp-alert__title">Error</div>
    <div class="cp-alert__message">There was a problem processing your request. Please try again.</div>
  </div>
</div>
```

#### Alert CSS
```css
.cp-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--cp-space-3);
  padding: var(--cp-space-4);
  border-radius: var(--cp-radius-md);
  border: 1px solid;
}

.cp-alert--success {
  background-color: var(--cp-success-50);
  border-color: var(--cp-success-200);
  color: var(--cp-success-800);
}

.cp-alert--warning {
  background-color: var(--cp-warning-50);
  border-color: var(--cp-warning-200);
  color: var(--cp-warning-800);
}

.cp-alert--error {
  background-color: var(--cp-error-50);
  border-color: var(--cp-error-200);
  color: var(--cp-error-800);
}

.cp-alert--info {
  background-color: var(--cp-info-50);
  border-color: var(--cp-info-200);
  color: var(--cp-info-800);
}

.cp-alert__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.cp-alert__content {
  flex: 1;
  min-width: 0;
}

.cp-alert__title {
  font-weight: var(--cp-font-medium);
  font-size: var(--cp-text-sm);
  margin-bottom: var(--cp-space-1);
}

.cp-alert__message {
  font-size: var(--cp-text-sm);
  line-height: var(--cp-leading-relaxed);
}

.cp-alert__close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 150ms ease-in-out;
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    opacity: 1;
  }
}
```

---

## Layout System

### Grid System

#### CSS Grid Layout
```css
.cp-grid {
  display: grid;
  gap: var(--cp-space-6);
}

/* Responsive Grid Columns */
.cp-grid--1 { grid-template-columns: 1fr; }
.cp-grid--2 { grid-template-columns: repeat(2, 1fr); }
.cp-grid--3 { grid-template-columns: repeat(3, 1fr); }
.cp-grid--4 { grid-template-columns: repeat(4, 1fr); }
.cp-grid--6 { grid-template-columns: repeat(6, 1fr); }
.cp-grid--12 { grid-template-columns: repeat(12, 1fr); }

/* Responsive Breakpoints */
@media (max-width: 768px) {
  .cp-grid--2,
  .cp-grid--3,
  .cp-grid--4,
  .cp-grid--6,
  .cp-grid--12 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .cp-grid--3,
  .cp-grid--4,
  .cp-grid--6,
  .cp-grid--12 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Container System

```css
.cp-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--cp-space-4);
}

.cp-container--sm { max-width: 640px; }
.cp-container--md { max-width: 768px; }
.cp-container--lg { max-width: 1024px; }
.cp-container--xl { max-width: 1280px; }
.cp-container--2xl { max-width: 1536px; }

/* Responsive Padding */
@media (min-width: 640px) {
  .cp-container {
    padding: 0 var(--cp-space-6);
  }
}

@media (min-width: 1024px) {
  .cp-container {
    padding: 0 var(--cp-space-8);
  }
}
```

---

## Responsive Design

### Breakpoints

```css
/* Breakpoint Variables */
:root {
  --cp-breakpoint-sm: 640px;
  --cp-breakpoint-md: 768px;
  --cp-breakpoint-lg: 1024px;
  --cp-breakpoint-xl: 1280px;
  --cp-breakpoint-2xl: 1536px;
}

/* Media Query Mixins (for preprocessors) */
@mixin cp-screen-sm {
  @media (min-width: var(--cp-breakpoint-sm)) {
    @content;
  }
}

@mixin cp-screen-md {
  @media (min-width: var(--cp-breakpoint-md)) {
    @content;
  }
}

@mixin cp-screen-lg {
  @media (min-width: var(--cp-breakpoint-lg)) {
    @content;
  }
}

@mixin cp-screen-xl {
  @media (min-width: var(--cp-breakpoint-xl)) {
    @content;
  }
}

@mixin cp-screen-2xl {
  @media (min-width: var(--cp-breakpoint-2xl)) {
    @content;
  }
}
```

---

## Accessibility Features

### Focus Management

```css
/* Focus Ring Utility */
.cp-focus-ring {
  &:focus {
    outline: 2px solid var(--cp-primary-500);
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
}

/* Skip Link */
.cp-skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--cp-primary-500);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: var(--cp-radius-md);
  z-index: 1000;
  
  &:focus {
    top: 6px;
  }
}
```

### Screen Reader Utilities

```css
/* Screen Reader Only */
.cp-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Not Screen Reader Only */
.cp-not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## Dark Mode Support

### Dark Mode Variables

```css
/* Light Mode (Default) */
:root {
  --cp-bg-primary: var(--cp-gray-50);
  --cp-bg-secondary: white;
  --cp-text-primary: var(--cp-gray-900);
  --cp-text-secondary: var(--cp-gray-600);
  --cp-border-primary: var(--cp-gray-200);
  --cp-border-secondary: var(--cp-gray-300);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --cp-bg-primary: var(--cp-gray-900);
    --cp-bg-secondary: var(--cp-gray-800);
    --cp-text-primary: var(--cp-gray-100);
    --cp-text-secondary: var(--cp-gray-400);
    --cp-border-primary: var(--cp-gray-700);
    --cp-border-secondary: var(--cp-gray-600);
  }
}

/* Manual Dark Mode Toggle */
[data-theme="dark"] {
  --cp-bg-primary: var(--cp-gray-900);
  --cp-bg-secondary: var(--cp-gray-800);
  --cp-text-primary: var(--cp-gray-100);
  --cp-text-secondary: var(--cp-gray-400);
  --cp-border-primary: var(--cp-gray-700);
  --cp-border-secondary: var(--cp-gray-600);
}
```

---

## Animation System

### Transition Utilities

```css
/* Transition Utilities */
.cp-transition-none { transition: none; }
.cp-transition-all { transition: all 150ms ease-in-out; }
.cp-transition-colors { transition: color, background-color, border-color 150ms ease-in-out; }
.cp-transition-opacity { transition: opacity 150ms ease-in-out; }
.cp-transition-shadow { transition: box-shadow 150ms ease-in-out; }
.cp-transition-transform { transition: transform 150ms ease-in-out; }

/* Duration Utilities */
.cp-duration-75 { transition-duration: 75ms; }
.cp-duration-100 { transition-duration: 100ms; }
.cp-duration-150 { transition-duration: 150ms; }
.cp-duration-200 { transition-duration: 200ms; }
.cp-duration-300 { transition-duration: 300ms; }
.cp-duration-500 { transition-duration: 500ms; }

/* Easing Utilities */
.cp-ease-linear { transition-timing-function: linear; }
.cp-ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.cp-ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.cp-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
```

### Reduced Motion Support

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Usage Guidelines

### Implementation

#### CSS Custom Properties
Use CSS custom properties (variables) for all design tokens to ensure consistency and enable theming.

#### Component Classes
Follow BEM methodology for component classes:
- Block: `.cp-component`
- Element: `.cp-component__element`
- Modifier: `.cp-component--modifier`

#### Responsive Design
Use mobile-first approach with min-width media queries.

### Best Practices

#### Performance
- Use system fonts when possible
- Optimize images and icons
- Minimize CSS bundle size
- Use efficient selectors

#### Accessibility
- Ensure sufficient color contrast (4.5:1 minimum)
- Provide focus indicators for all interactive elements
- Use semantic HTML elements
- Test with screen readers

#### Maintainability
- Document component usage and variations
- Use consistent naming conventions
- Keep components modular and reusable
- Version design system changes

---

## Contributing to the UI System

### Design Contributions
- Propose new components or improvements
- Ensure designs meet accessibility standards
- Provide usage guidelines and examples
- Test designs across different devices and browsers

### Development Contributions
- Implement components following our standards
- Write comprehensive tests for components
- Update documentation for changes
- Ensure backward compatibility when possible

### Documentation
- Keep component documentation up to date
- Provide clear usage examples
- Document accessibility features
- Include design rationale and decisions

---

*This UI System documentation is continuously updated as our design system evolves. For the latest components and guidelines, check our [Storybook](https://storybook.openlaunch.org) or contribute to our [design system discussions](https://github.com/PraiseTechzw/OpenLaunch/discussions/categories/design-system).*