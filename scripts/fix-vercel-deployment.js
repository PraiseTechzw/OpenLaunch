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

// Option 1: Update vercel.json with correct configuration
const vercelConfig = {
  "buildCommand": "cd website && npm run build",
  "outputDirectory": "website/.next",
  "installCommand": "npm install && cd website && npm install",
  "framework": "nextjs",
  "rootDirectory": "website"
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('✅ Updated vercel.json with correct configuration');

// Option 2: Create alternative vercel.json for advanced setup
const advancedVercelConfig = {
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

fs.writeFileSync('vercel-advanced.json', JSON.stringify(advancedVercelConfig, null, 2));
console.log('✅ Created vercel-advanced.json as alternative configuration');

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
console.log('\nIf the standard configuration doesn\'t work:');
console.log('1. Rename vercel-advanced.json to vercel.json');
console.log('2. Or configure manually in Vercel dashboard:');
console.log('   - Root Directory: website');
console.log('   - Build Command: npm run build');
console.log('   - Output Directory: .next');
console.log('   - Install Command: npm install');

console.log('\n🚀 Deployment should now work correctly!');