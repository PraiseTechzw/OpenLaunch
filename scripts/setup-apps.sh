#!/bin/bash

# OpenLaunch Apps Setup Script
# This script helps set up the apps directory and submodules

echo "🚀 Setting up OpenLaunch Apps..."

# Initialize and update submodules
echo "📦 Initializing git submodules..."
git submodule update --init --recursive

# Check if Versify is properly set up
if [ -d "apps/versify" ]; then
    echo "✅ Versify submodule found"
    
    # Navigate to Versify and check if it's a valid Next.js project
    cd apps/versify
    
    if [ -f "package.json" ]; then
        echo "📋 Installing Versify dependencies..."
        npm install
        
        echo "✅ Versify setup complete!"
        echo "🎨 You can now run Versify locally with:"
        echo "   cd apps/versify && npm run dev"
    else
        echo "❌ Versify package.json not found. Please check the submodule."
    fi
    
    cd ../..
else
    echo "❌ Versify submodule not found. Please run:"
    echo "   git submodule add https://github.com/PraiseTechzw/versify.git apps/versify"
fi

echo ""
echo "🎉 Apps setup complete!"
echo ""
echo "Available apps:"
echo "  📁 apps/versify - AI-powered poetry from images"
echo ""
echo "To contribute to apps:"
echo "  1. For Versify: Work in the apps/versify directory"
echo "  2. For new apps: Propose in GitHub Discussions"
echo "  3. For integration: Work in the main OpenLaunch repo"
echo ""
echo "Happy coding! 🎊"