# Frontend: OpenLaunch

## Overview

The frontend ecosystem of OpenLaunch encompasses all user-facing applications and interfaces for our annual Coding Party initiatives. We build modern, accessible, and performant web applications that serve our diverse community of developers, designers, and creators.

## Architecture

### Technology Stack

#### Core Technologies
- **React 18+**: Modern React with concurrent features
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing

#### State Management
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching
- **React Hook Form**: Form state and validation

#### Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing
- **Storybook**: Component development and documentation

#### Development Tools
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality assurance
- **pnpm**: Fast, efficient package manager

### Project Structure

```
frontend/
├── apps/                    # Individual applications
│   ├── main-app/           # Main community platform
│   ├── project-dashboard/  # Project management interface
│   └── contributor-portal/ # Contributor onboarding and tools
├── packages/               # Shared packages
│   ├── ui/                # Shared UI components
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── config/            # Shared configuration
├── tools/                 # Development tools and scripts
└── docs/                  # Frontend-specific documentation
```

## Applications

### Main App (`apps/main-app`)

The primary community platform where users discover projects, connect with contributors, and participate in discussions.

**Key Features:**
- Project discovery and browsing
- User profiles and portfolios
- Community discussions and forums
- Real-time notifications
- Responsive design for all devices

**Tech Stack:**
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Zustand for state management
- React Query for API integration

### Project Dashboard (`apps/project-dashboard`)

A comprehensive project management interface for maintainers and contributors to track progress, manage tasks, and coordinate development.

**Key Features:**
- Project overview and metrics
- Task management and assignment
- Code review workflows
- Progress tracking and reporting
- Team collaboration tools

**Tech Stack:**
- React 18 with TypeScript
- Chart.js for data visualization
- React Hook Form for form management
- WebSocket integration for real-time updates

### Contributor Portal (`apps/contributor-portal`)

A dedicated interface for new and existing contributors to onboard, find opportunities, and track their contributions.

**Key Features:**
- Interactive onboarding flow
- Skill assessment and matching
- Contribution tracking
- Learning resources and tutorials
- Mentorship connections

**Tech Stack:**
- React 18 with TypeScript
- Framer Motion for animations
- Progressive Web App (PWA) capabilities
- Offline-first architecture

## Shared Packages

### UI Package (`packages/ui`)

A comprehensive component library implementing our design system.

**Components Include:**
- Basic components (Button, Input, Card, etc.)
- Complex components (DataTable, Modal, Dropdown, etc.)
- Layout components (Container, Grid, Stack, etc.)
- Form components (FormField, Validation, etc.)

**Features:**
- Full TypeScript support
- Accessibility built-in (WCAG 2.1 AA)
- Dark mode support
- Responsive design
- Storybook documentation

### Utils Package (`packages/utils`)

Shared utility functions and helpers used across applications.

**Utilities Include:**
- Date and time formatting
- String manipulation
- API helpers
- Validation functions
- Browser detection
- Local storage management

### Types Package (`packages/types`)

Centralized TypeScript type definitions for consistency across applications.

**Type Categories:**
- API response types
- User and authentication types
- Project and repository types
- UI component prop types
- Utility type helpers

### Config Package (`packages/config`)

Shared configuration files and constants.

**Configuration Includes:**
- Environment variables
- API endpoints
- Feature flags
- Theme configuration
- Build settings

## Development Workflow

### Getting Started

#### Prerequisites
- Node.js 18 or higher
- pnpm package manager
- Git

#### Setup
```bash
# Clone the repository
git clone https://github.com/PraiseTechzw/OpenLaunch.git
cd OpenLaunch/frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

### Development Commands

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm dev:main              # Start main app only
pnpm dev:dashboard         # Start project dashboard only
pnpm dev:portal            # Start contributor portal only

# Testing
pnpm test                  # Run all tests
pnpm test:unit             # Run unit tests only
pnpm test:e2e              # Run end-to-end tests
pnpm test:coverage         # Run tests with coverage report

# Building
pnpm build                 # Build all apps for production
pnpm build:main            # Build main app only
pnpm build:dashboard       # Build dashboard only
pnpm build:portal          # Build portal only

# Linting and Formatting
pnpm lint                  # Run ESLint
pnpm lint:fix              # Fix ESLint errors
pnpm format                # Format code with Prettier
pnpm type-check            # Run TypeScript type checking

# Storybook
pnpm storybook             # Start Storybook development server
pnpm build-storybook       # Build Storybook for production
```

### Code Standards

#### TypeScript
- Use strict TypeScript configuration
- Define explicit types for all props and function parameters
- Use type guards for runtime type checking
- Prefer interfaces over types for object shapes

#### React
- Use functional components with hooks
- Follow React best practices and patterns
- Use React.memo for performance optimization when needed
- Implement proper error boundaries

#### Styling
- Use Tailwind CSS utility classes
- Follow our design system tokens
- Implement responsive design mobile-first
- Ensure accessibility standards (WCAG 2.1 AA)

#### Testing
- Write unit tests for all utility functions
- Test React components with React Testing Library
- Focus on testing behavior, not implementation
- Maintain minimum 80% code coverage

### File Organization

#### Component Structure
```
ComponentName/
├── index.ts                 # Export file
├── ComponentName.tsx        # Main component
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.stories.tsx # Storybook stories
└── types.ts                 # Component-specific types
```

#### Hook Structure
```
hooks/
├── useHookName/
│   ├── index.ts            # Export file
│   ├── useHookName.ts      # Hook implementation
│   └── useHookName.test.ts # Hook tests
└── index.ts                # All hooks export
```

## Design System Integration

### Component Library

Our UI components are built following our design system principles:

```tsx
import { Button, Card, Input } from '@coding-party/ui'

function ExampleComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Example Form</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </Card.Content>
      <Card.Footer>
        <Button variant="primary" size="lg">
          Submit
        </Button>
      </Card.Footer>
    </Card>
  )
}
```

### Design Tokens

Design tokens are available as CSS custom properties and JavaScript constants:

```tsx
// CSS Custom Properties
.custom-component {
  color: var(--cp-text-primary);
  background: var(--cp-bg-secondary);
  padding: var(--cp-space-4);
  border-radius: var(--cp-radius-md);
}

// JavaScript Constants
import { tokens } from '@coding-party/ui'

const styles = {
  color: tokens.colors.text.primary,
  background: tokens.colors.bg.secondary,
  padding: tokens.spacing[4],
  borderRadius: tokens.radius.md,
}
```

## Performance Optimization

### Bundle Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Remove unused code from bundles
- **Dynamic Imports**: Load components and utilities on demand
- **Bundle Analysis**: Regular bundle size monitoring

### Runtime Performance

- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Optimize expensive computations
- **Virtual Scrolling**: Handle large lists efficiently
- **Image Optimization**: Lazy loading and responsive images

### Loading Performance

- **Preloading**: Critical resources loaded early
- **Service Workers**: Cache static assets and API responses
- **Progressive Loading**: Show content as it becomes available
- **Skeleton Screens**: Improve perceived performance

## Accessibility

### Standards Compliance

We follow WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Management**: Clear focus indicators and logical tab order

### Testing Tools

- **axe-core**: Automated accessibility testing
- **Screen Readers**: Manual testing with NVDA, JAWS, VoiceOver
- **Keyboard Testing**: Ensure full keyboard accessibility
- **Color Contrast**: Automated and manual contrast checking

## Internationalization

### i18n Setup

- **React i18next**: Internationalization framework
- **Namespace Organization**: Logical grouping of translations
- **Pluralization**: Proper plural form handling
- **Date/Number Formatting**: Locale-aware formatting

### Supported Languages

Currently supported languages:
- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Chinese Simplified (zh-CN)

## Testing Strategy

### Unit Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectForm } from './ProjectForm'

describe('ProjectForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    
    render(<ProjectForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText('Project Name'), 'My Project')
    await user.type(screen.getByLabelText('Description'), 'Project description')
    await user.click(screen.getByRole('button', { name: 'Create Project' }))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'My Project',
        description: 'Project description'
      })
    })
  })
})
```

### E2E Testing

```typescript
// cypress/e2e/project-creation.cy.ts
describe('Project Creation', () => {
  it('allows user to create a new project', () => {
    cy.visit('/projects/new')
    
    cy.get('[data-testid="project-name"]').type('Test Project')
    cy.get('[data-testid="project-description"]').type('This is a test project')
    cy.get('[data-testid="project-category"]').select('Web Development')
    
    cy.get('[data-testid="create-project-btn"]').click()
    
    cy.url().should('include', '/projects/')
    cy.contains('Test Project').should('be.visible')
  })
})
```

## Deployment

### Build Process

```bash
# Production build
pnpm build

# Build with environment
NODE_ENV=production pnpm build

# Build specific app
pnpm build:main
```

### Environment Configuration

```typescript
// config/env.ts
export const config = {
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3000',
  environment: process.env.NODE_ENV || 'development',
  features: {
    analytics: process.env.VITE_ENABLE_ANALYTICS === 'true',
    darkMode: process.env.VITE_ENABLE_DARK_MODE !== 'false',
  }
}
```

### Deployment Targets

- **Vercel**: Primary deployment platform
- **Netlify**: Alternative deployment option
- **AWS S3 + CloudFront**: Enterprise deployment
- **Docker**: Containerized deployment

## Contributing

### Getting Started

1. **Fork the Repository**: Create your own fork of the project
2. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
3. **Follow Standards**: Use our coding standards and conventions
4. **Write Tests**: Include tests for new functionality
5. **Update Documentation**: Keep documentation current
6. **Submit PR**: Create a pull request with clear description

### Code Review Process

1. **Automated Checks**: CI pipeline runs tests and linting
2. **Peer Review**: At least one maintainer reviews code
3. **Design Review**: UI changes reviewed by design team
4. **Accessibility Review**: Ensure accessibility standards met
5. **Performance Review**: Check for performance implications

### Areas for Contribution

#### For Frontend Developers
- Implement new features and components
- Optimize performance and bundle size
- Improve accessibility and user experience
- Write and maintain tests

#### For Designers
- Create and refine UI components
- Improve user experience flows
- Ensure design system consistency
- Conduct user research and testing

#### For Everyone
- Report bugs and usability issues
- Suggest feature improvements
- Help with documentation
- Test applications across different devices

## Resources

### Documentation
- [Component Library (Storybook)](https://storybook.coding-party-2026.org)
- [Design System](../design/ui-system.md)
- [API Documentation](../backend/README.md)
- [Deployment Guide](../docs/deployment.md)

### Tools and Links
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Testing Library](https://testing-library.com)
- [Cypress](https://cypress.io)

### Community
- [Frontend Discussions](https://github.com/PraiseTechzw/OpenLaunch/discussions/categories/frontend)
- [Design System Discussions](https://github.com/PraiseTechzw/OpenLaunch/discussions/categories/design-system)
- [Bug Reports](https://github.com/PraiseTechzw/OpenLaunch/issues)

---

*This frontend documentation is continuously updated as our applications evolve. For the latest information and to contribute to frontend development, visit our [frontend discussions](https://github.com/PraiseTechzw/OpenLaunch/discussions/categories/frontend) or check out our [component library](https://storybook.openlaunch.org).*