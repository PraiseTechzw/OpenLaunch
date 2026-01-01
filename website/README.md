# OpenLaunch Website

This is the official documentation website for OpenLaunch, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first design that works on all devices
- **Documentation**: Markdown-based documentation with syntax highlighting
- **Community Pages**: Dedicated pages for community, events, and contributors
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Accessibility**: WCAG compliant with proper semantic HTML

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the website directory:
   ```bash
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── docs/           # Documentation pages
│   │   ├── community/      # Community pages
│   │   ├── events/         # Events page
│   │   ├── contributing/   # Contributing page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   └── lib/               # Utility functions and helpers
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Key Components

- **Navigation**: Responsive navigation with mobile menu
- **Hero**: Landing page hero section with call-to-action
- **Features**: Feature showcase with icons and descriptions
- **Stats**: Community statistics and metrics
- **CommunityShowcase**: Highlight community contributions
- **CallToAction**: Conversion-focused sections
- **Footer**: Site footer with links and information
- **MarkdownRenderer**: Custom markdown renderer with syntax highlighting

## Documentation

The website automatically renders documentation from the parent `docs/` and `design/` directories. Markdown files are processed with:

- **Gray Matter**: For frontmatter parsing
- **React Markdown**: For markdown rendering
- **Remark GFM**: For GitHub Flavored Markdown support
- **Rehype Highlight**: For syntax highlighting

## Styling

The website uses Tailwind CSS with a custom design system:

- **Primary Colors**: Blue color palette for main branding
- **Secondary Colors**: Cyan color palette for accents
- **Typography**: Inter font family with custom prose styles
- **Components**: Reusable utility classes and components

## Deployment

The website is designed to be deployed on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- **Any static hosting service**

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

## Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for all new components
3. Ensure responsive design works on all screen sizes
4. Add proper accessibility attributes
5. Test on multiple browsers and devices

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.