# Vercel Deployment Guide for OpenLaunch

This guide provides multiple approaches to deploy the OpenLaunch monorepo on Vercel.

## 🚀 Quick Start (Recommended)

### Option 1: Dashboard Configuration (Easiest)

1. **Remove vercel.json** (if it causes issues):
   ```bash
   mv vercel.json vercel.json.backup
   ```

2. **Configure in Vercel Dashboard**:
   - Go to your project settings on Vercel
   - Set **Root Directory**: `website`
   - Set **Build Command**: `npm run build`
   - Set **Output Directory**: `.next`
   - Set **Install Command**: `npm install`
   - Set **Framework Preset**: Next.js

3. **Deploy**: Trigger a new deployment

### Option 2: Using vercel.json (Current)

The repository includes a working `vercel.json`:

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

## 🔧 Troubleshooting

### Error: "routes-manifest.json couldn't be found"

**Solution 1**: Use dashboard configuration (remove vercel.json)
**Solution 2**: Run the fix script:
```bash
npm run fix-vercel
```

### Error: "should NOT have additional property"

This happens with invalid vercel.json properties. The current configuration uses only valid Vercel v2 API properties.

### Build Failures

1. **Check build locally**:
   ```bash
   cd website
   npm install
   npm run build
   ls -la .next/  # Should show build output
   ```

2. **Check dependencies**:
   ```bash
   npm install  # Root dependencies
   cd website && npm install  # Website dependencies
   ```

## 📁 File Structure

```
OpenLaunch/
├── vercel.json              # Vercel configuration
├── vercel-simple.json       # Alternative simple config
├── vercel-dashboard-config.json  # Dashboard settings reference
├── .vercelignore           # Files to ignore during deployment
├── website/                # Next.js application
│   ├── package.json        # Website dependencies
│   ├── next.config.js      # Next.js configuration
│   └── .next/              # Build output (created during build)
└── package.json            # Root dependencies
```

## 🛠️ Alternative Configurations

### Simple Configuration

Use `vercel-simple.json` (rename to `vercel.json`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "website/next.config.js",
      "use": "@vercel/next"
    }
  ]
}
```

### No Configuration

Remove `vercel.json` entirely and use dashboard settings:
- Root Directory: `website`
- Framework: Next.js
- Let Vercel auto-detect everything else

## 🔍 Debugging

### Check Build Output

```bash
# Build locally
npm run build

# Check if .next directory exists
ls -la website/.next/

# Check for routes-manifest.json
ls -la website/.next/routes-manifest.json
```

### Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with debug info
vercel --debug

# Check deployment logs
vercel logs [deployment-url]
```

## 📋 Deployment Checklist

- [ ] Next.js app builds successfully locally
- [ ] `website/.next/` directory is created after build
- [ ] `routes-manifest.json` exists in `website/.next/`
- [ ] Vercel configuration is valid (no schema errors)
- [ ] Environment variables are set (if needed)
- [ ] Dependencies are properly installed

## 🎯 Best Practices

1. **Use Dashboard Configuration** for simplicity
2. **Test builds locally** before deploying
3. **Keep vercel.json minimal** to avoid schema issues
4. **Use .vercelignore** to exclude unnecessary files
5. **Set proper environment variables** for GitHub API integration

## 🆘 Need Help?

If you're still having issues:

1. Run the automated fix: `npm run fix-vercel`
2. Check the deployment logs on Vercel dashboard
3. Try the dashboard configuration approach
4. Ensure your local build works: `npm run build`

The key is that Vercel needs to understand that your Next.js app is in the `website/` subdirectory, not the root.