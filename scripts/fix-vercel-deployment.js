#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 OpenLaunch Vercel Deployment Fix');
console.log('===================================');

// Check if we're in the right directory
if (!fs.existsSync('website') || !fs.existsSync('package.json')) {
  console.error('❌ Error: This script must be run from the root of the OpenLaunch repository');
  process.exit(1);
}

// Option 1: Standard Vercel v2 configuration for monorepos
const vercelConfig = {
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
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('✅ Updated vercel.json with correct v2 configuration');

// Option 2: Alternative configuration using project settings (for dashboard)
const dashboardConfig = {
  "note": "Configure these settings in Vercel Dashboard:",
  "settings": {
    "rootDirectory": "website",
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "installCommand": "npm install",
    "framework": "nextjs"
  }
};

fs.writeFileSync('vercel-dashboard-config.json', JSON.stringify(dashboardConfig, null, 2));
console.log('✅ Created vercel-dashboard-config.json with dashboard settings');

// Create .vercelignore file
const vercelIgnore = `# Dependencies
node_modules/
website/node_modules/

# Build outputs
.next/
website/.next/
out/
website/out/

# Environment files
.env
.env.local
.env.production
.env.staging

# Logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed

# Coverage directory used by tools like istanbul
coverage/

# IDE files
.vscode/
.idea/

# OS generated files
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/`;

fs.writeFileSync('.vercelignore', vercelIgnore);
console.log('✅ Created .vercelignore file');

// Check build output
console.log('\n🔍 Checking build configuration...');

try {
  const websitePackage = JSON.parse(fs.readFileSync('website/package.json', 'utf8'));
  console.log(`✅ Website package.json found (version: ${websitePackage.version})`);
  
  if (websitePackage.scripts && websitePackage.scripts.build) {
    console.log(`✅ Build script found: ${websitePackage.scripts.build}`);
  } else {
    console.log('❌ No build script found in website/package.json');
  }
} catch (error) {
  console.log('❌ Error reading website/package.json:', error.message);
}

// Instructions
console.log('\n📋 Next Steps:');
console.log('1. Commit the updated vercel.json file');
console.log('2. Push to your repository');
console.log('3. Redeploy on Vercel');
console.log('\nAlternative: Configure via Vercel Dashboard:');
console.log('1. Go to your project settings on Vercel');
console.log('2. Set Root Directory: website');
console.log('3. Set Build Command: npm run build');
console.log('4. Set Output Directory: .next');
console.log('5. Set Install Command: npm install');
console.log('6. Remove or rename vercel.json to use dashboard settings');

console.log('\n🚀 Deployment should now work correctly!');