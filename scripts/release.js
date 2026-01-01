#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'inherit', ...options });
  } catch (error) {
    log(`Error executing: ${command}`, 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

function updateVersion(newVersion) {
  // Update root package.json
  const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  rootPackage.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(rootPackage, null, 2) + '\n');

  // Update website package.json
  const websitePackage = JSON.parse(fs.readFileSync('website/package.json', 'utf8'));
  websitePackage.version = newVersion;
  fs.writeFileSync('website/package.json', JSON.stringify(websitePackage, null, 2) + '\n');
}

function generateChangelog() {
  try {
    const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""', { encoding: 'utf8' }).trim();
    let commits;
    
    if (lastTag) {
      commits = execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s (%h)" --no-merges`, { encoding: 'utf8' });
    } else {
      commits = execSync('git log --pretty=format:"- %s (%h)" --no-merges | head -20', { encoding: 'utf8' });
    }
    
    return commits.trim();
  } catch (error) {
    return '- Initial release';
  }
}

function main() {
  const args = process.argv.slice(2);
  const releaseType = args[0] || 'patch';
  
  if (!['patch', 'minor', 'major'].includes(releaseType)) {
    log('Usage: npm run release:manual [patch|minor|major]', 'red');
    process.exit(1);
  }

  log('🚀 Starting OpenLaunch Release Process', 'cyan');
  log('=====================================', 'cyan');

  // Check if we're on main/master branch
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  if (!['main', 'master'].includes(currentBranch)) {
    log(`Warning: You're on branch '${currentBranch}'. Releases should typically be made from 'main' or 'master'.`, 'yellow');
  }

  // Check for uncommitted changes
  try {
    execSync('git diff-index --quiet HEAD --', { stdio: 'ignore' });
  } catch (error) {
    log('Error: You have uncommitted changes. Please commit or stash them first.', 'red');
    process.exit(1);
  }

  const currentVersion = getCurrentVersion();
  log(`Current version: ${currentVersion}`, 'blue');

  // Calculate new version
  const versionParts = currentVersion.split('.').map(Number);
  switch (releaseType) {
    case 'major':
      versionParts[0]++;
      versionParts[1] = 0;
      versionParts[2] = 0;
      break;
    case 'minor':
      versionParts[1]++;
      versionParts[2] = 0;
      break;
    case 'patch':
      versionParts[2]++;
      break;
  }
  const newVersion = versionParts.join('.');

  log(`New version: ${newVersion}`, 'green');

  // Run tests
  log('\n🧪 Running tests...', 'yellow');
  exec('npm test');

  // Build project
  log('\n🔨 Building project...', 'yellow');
  exec('npm run build');

  // Update version in package.json files
  log('\n📝 Updating version in package.json files...', 'yellow');
  updateVersion(newVersion);

  // Generate changelog
  log('\n📋 Generating changelog...', 'yellow');
  const changelog = generateChangelog();

  // Commit version changes
  log('\n💾 Committing version changes...', 'yellow');
  exec('git add package.json website/package.json');
  exec(`git commit -m "chore: bump version to v${newVersion}"`);

  // Create and push tag
  log('\n🏷️  Creating and pushing tag...', 'yellow');
  exec(`git tag -a "v${newVersion}" -m "Release v${newVersion}"`);
  exec('git push origin HEAD');
  exec(`git push origin "v${newVersion}"`);

  // Create release notes
  const releaseNotes = `## 🚀 Release v${newVersion}

### Changes
${changelog}

### 📊 Project Stats
- **Release Type**: ${releaseType}
- **Previous Version**: ${currentVersion}
- **New Version**: ${newVersion}

### 🔗 Links
- **Repository**: https://github.com/PraiseTechzw/OpenLaunch
- **Issues**: https://github.com/PraiseTechzw/OpenLaunch/issues
- **Documentation**: https://github.com/PraiseTechzw/OpenLaunch#readme

---
*This release was created using the OpenLaunch release script* 🤖`;

  // Save release notes to file
  fs.writeFileSync(`release-notes-v${newVersion}.md`, releaseNotes);

  log('\n✅ Release process completed successfully!', 'green');
  log('=====================================', 'green');
  log(`🎉 Version ${newVersion} has been released!`, 'bright');
  log(`📝 Release notes saved to: release-notes-v${newVersion}.md`, 'blue');
  log(`🏷️  Tag: v${newVersion}`, 'blue');
  log(`🔗 GitHub will automatically create a release from the tag`, 'blue');
  log('\nNext steps:', 'yellow');
  log('1. Check GitHub for the automatic release creation', 'yellow');
  log('2. Edit the release on GitHub if needed', 'yellow');
  log('3. Announce the release to your community', 'yellow');
}

if (require.main === module) {
  main();
}

module.exports = { getCurrentVersion, updateVersion, generateChangelog };