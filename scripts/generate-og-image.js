#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 OpenLaunch OG Image Generator');
console.log('================================');

// Check if we have the SVG file
const svgPath = path.join('website', 'public', 'og-image.svg');
const pngPath = path.join('website', 'public', 'og-image.png');

if (!fs.existsSync(svgPath)) {
  console.error('❌ SVG file not found:', svgPath);
  process.exit(1);
}

console.log('✅ SVG file found');

// For now, we'll just copy the SVG and provide instructions
// In a real scenario, you'd use a library like sharp or puppeteer to convert SVG to PNG

console.log('\n📋 To generate PNG from SVG:');
console.log('1. Use an online converter like https://convertio.co/svg-png/');
console.log('2. Or use a tool like Inkscape: inkscape --export-png=og-image.png og-image.svg');
console.log('3. Or use ImageMagick: convert og-image.svg og-image.png');
console.log('4. Or use a Node.js library like sharp or puppeteer');

console.log('\n📝 For now, creating a placeholder PNG reference...');

// Create a simple HTML file that can be used to generate the PNG
const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OpenLaunch OG Image</title>
    <style>
        body { margin: 0; padding: 0; }
        .og-container { 
            width: 1200px; 
            height: 630px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
            position: relative;
            overflow: hidden;
        }
        .decorative-circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.1);
        }
        .circle-1 { width: 100px; height: 100px; top: 50px; left: 50px; }
        .circle-2 { width: 160px; height: 160px; bottom: 100px; right: 50px; }
        .circle-3 { width: 60px; height: 60px; top: 120px; right: 100px; }
        .circle-4 { width: 80px; height: 80px; bottom: 130px; left: 100px; }
        .main-title { 
            font-size: 72px; 
            font-weight: bold; 
            margin: 0;
            background: linear-gradient(90deg, #ffffff 0%, #f0f9ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle { 
            font-size: 32px; 
            font-weight: 500; 
            margin: 20px 0;
            opacity: 0.9;
        }
        .description { 
            font-size: 24px; 
            font-weight: 400; 
            margin: 20px 0;
            opacity: 0.8;
        }
        .url { 
            font-size: 20px; 
            font-weight: 400; 
            margin: 40px 0 0 0;
            opacity: 0.7;
        }
        .code-bracket {
            position: absolute;
            font-family: monospace;
            font-size: 120px;
            font-weight: 300;
            opacity: 0.1;
        }
        .bracket-left { top: 100px; left: 150px; }
        .bracket-right { bottom: 180px; right: 100px; }
    </style>
</head>
<body>
    <div class="og-container">
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
        <div class="decorative-circle circle-3"></div>
        <div class="decorative-circle circle-4"></div>
        
        <div class="code-bracket bracket-left">&lt;</div>
        <div class="code-bracket bracket-right">/&gt;</div>
        
        <h1 class="main-title">OpenLaunch</h1>
        <h2 class="subtitle">Collaborative Innovation Lab</h2>
        <p class="description">Building real-world software through annual Coding Party initiatives</p>
        <p class="url">openlaunch.praisetech.tech</p>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join('website', 'public', 'og-image-template.html'), htmlContent);
console.log('✅ Created og-image-template.html');

console.log('\n🚀 You can now:');
console.log('1. Open og-image-template.html in a browser');
console.log('2. Take a screenshot at 1200x630 resolution');
console.log('3. Save as og-image.png');
console.log('4. Or use the SVG file directly (many platforms support SVG now)');

console.log('\n✨ Social media metadata is now properly configured!');