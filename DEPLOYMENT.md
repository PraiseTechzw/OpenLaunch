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

### Vercel

The repository includes a `vercel.json` configuration file for Vercel deployment:

1. **Automatic Detection**: Vercel should automatically detect the Next.js app
2. **Build Command**: `cd website && npm run build`
3. **Output Directory**: `website/.next`
4. **Install Command**: `npm install && cd website && npm install`

### Netlify

The repository includes a `netlify.toml` configuration file:

1. **Base Directory**: `website`
2. **Build Command**: `npm run build`
3. **Publish Directory**: `website/.next`

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

## Environment Variables

If you need to set environment variables, create them in the deployment platform's dashboard or add a `.env.local` file in the `website/` directory:

```env
# Example environment variables
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_API_URL=https://api.openlaunch.org
```

## Root Package.json

The root `package.json` includes Next.js dependencies to satisfy deployment platform requirements while maintaining the monorepo structure. All build commands properly delegate to the `website/` subdirectory.

## Troubleshooting

### "No Next.js version detected" Error

This error occurs when deployment platforms can't find Next.js in the root directory. The current configuration should resolve this by:

1. Including Next.js dependencies in the root `package.json`
2. Providing proper build commands that navigate to the `website/` directory
3. Including platform-specific configuration files (`vercel.json`, `netlify.toml`)

### Build Failures

If builds fail:

1. Ensure all dependencies are installed: `npm install && cd website && npm install`
2. Check that the build works locally: `npm run build`
3. Verify environment variables are set correctly
4. Check the deployment platform's build logs for specific errors

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