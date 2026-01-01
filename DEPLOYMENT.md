# Deployment Guide

This repository contains a monorepo structure with the main Next.js website located in the `website/` directory.

## Project Structure

```
OpenLaunch/
├── website/          # Next.js application (main website)
├── frontend/         # Future frontend applications
├── backend/          # Backend services
├── ai/              # AI-related services
├── docs/            # Documentation
├── community/       # Community resources
└── package.json     # Root package.json with workspace configuration
```

## Deployment Platforms

### Vercel (Recommended)

**Option 1: Using vercel.json (Current Configuration)**

The repository includes a `vercel.json` configuration file:

```json
{
  "buildCommand": "cd website && npm run build",
  "outputDirectory": "website/.next",
  "installCommand": "npm install && cd website && npm install",
  "framework": "nextjs",
  "rootDirectory": "website"
}
```

**Option 2: Vercel Dashboard Configuration**

If you prefer to configure via the Vercel dashboard:

1. **Root Directory**: `website`
2. **Build Command**: `npm run build`
3. **Output Directory**: `.next`
4. **Install Command**: `npm install`
5. **Framework Preset**: Next.js

**Option 3: Move Next.js to Root (Alternative)**

If you continue having issues, you can move the Next.js app to the root:

```bash
# Backup current structure
cp -r website website-backup

# Move Next.js files to root
mv website/* .
mv website/.* . 2>/dev/null || true

# Update package.json scripts
# Remove the "cd website &&" parts from scripts
```

### Netlify

The repository includes a `netlify.toml` configuration file:

```toml
[build]
  base = "website"
  command = "npm run build"
  publish = "website/.next"
```

**Alternative Netlify Configuration:**

```toml
[build]
  base = "website"
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
```

### Manual Deployment

For manual deployment or other platforms:

```bash
# Install dependencies
npm install
cd website && npm install

# Build the application
npm run build

# Start the production server
npm run start
```

## Troubleshooting Deployment Issues

### Vercel: "routes-manifest.json couldn't be found"

This error occurs when Vercel can't find the Next.js build output. Solutions:

1. **Set Root Directory**: Add `"rootDirectory": "website"` to `vercel.json`
2. **Check Build Output**: Ensure the build creates `.next` folder in the correct location
3. **Verify Paths**: Make sure all paths in `vercel.json` are correct

### Vercel: Alternative Configuration

If the current configuration doesn't work, try this advanced setup:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "website/package.json",
      "use": "@vercel/next",
      "config": {
        "distDir": ".next"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/website/$1"
    }
  ]
}
```

### Build Command Issues

If builds fail, try these commands in order:

```bash
# Clean install
npm ci
cd website && npm ci

# Clean build
npm run clean
npm run build

# Check build output
ls -la website/.next/
```

### Environment Variables

Set these in your deployment platform:

```env
# Required for GitHub API integration
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here

# Optional: Custom API endpoints
NEXT_PUBLIC_API_URL=https://api.openlaunch.org

# Node.js version (for some platforms)
NODE_VERSION=18
```

## Platform-Specific Instructions

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from root directory
vercel

# Follow prompts and set:
# - Root Directory: website
# - Build Command: npm run build
# - Output Directory: .next
```

### Netlify CLI Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy from root directory
netlify deploy

# For production
netlify deploy --prod
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY website/package*.json ./website/

# Install dependencies
RUN npm ci
RUN cd website && npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

## Development

For local development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# This will start the Next.js dev server from the website/ directory
```

The development server will be available at `http://localhost:3000` (or the next available port).

## Release and Deployment Automation

The repository includes GitHub Actions for automated releases:

- **Tag and Release**: Automatically creates tags and releases when version changes
- **Manual Release**: Use `npm run release:patch/minor/major` for manual releases
- **Deployment**: Automatic deployment on successful builds

See `.github/workflows/` for the complete automation setup.