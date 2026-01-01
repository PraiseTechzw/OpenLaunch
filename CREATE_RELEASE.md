# Creating Releases for OpenLaunch

This document explains how to create releases and tags for the OpenLaunch project.

## 🚀 Automated Release (Recommended)

### Method 1: Using npm scripts (Manual)
```bash
# Patch release (1.0.0 -> 1.0.1)
npm run release:patch

# Minor release (1.0.0 -> 1.1.0)
npm run release:minor

# Major release (1.0.0 -> 2.0.0)
npm run release:major

# Custom release with interactive script
npm run release:manual
```

### Method 2: GitHub Actions (Automatic)
The project includes two GitHub Actions workflows:

1. **Automatic Release on Version Change**
   - Triggers when `package.json` version is updated and pushed to main/master
   - Automatically creates tags and GitHub releases
   - Located: `.github/workflows/tag-and-release.yml`

2. **Manual Release Workflow**
   - Can be triggered manually from GitHub Actions tab
   - Allows specifying version and release type
   - Located: `.github/workflows/release.yml`

## 📋 What Happens During a Release

1. **Version Update**: Updates version in both root and website `package.json`
2. **Testing**: Runs all tests to ensure code quality
3. **Building**: Builds the project to verify it compiles
4. **Git Operations**: 
   - Commits version changes
   - Creates and pushes Git tag
   - Pushes changes to repository
5. **GitHub Release**: Creates a GitHub release with:
   - Changelog from git commits
   - Project statistics
   - Download links
   - Release notes

## 🏷️ Manual Tag Creation

If you prefer to create tags manually:

```bash
# Create a tag
git tag -a v1.0.1 -m "Release version 1.0.1"

# Push the tag
git push origin v1.0.1

# Push all tags
git push --tags
```

## 📝 Release Notes Format

Our releases automatically include:

- **What's New**: List of changes since last release
- **Project Stats**: Contributors, commits, files changed
- **Links**: Full changelog, documentation, issues
- **Assets**: Downloadable source code archives

## 🔧 Configuration Files

### Package.json Scripts
```json
{
  "scripts": {
    "release": "npm run release:patch",
    "release:patch": "npm version patch && git push && git push --tags",
    "release:minor": "npm version minor && git push && git push --tags",
    "release:major": "npm version major && git push && git push --tags",
    "release:manual": "node scripts/release.js"
  }
}
```

### GitHub Actions
- `.github/workflows/release.yml` - Manual release workflow
- `.github/workflows/tag-and-release.yml` - Automatic release on version change

### Release Script
- `scripts/release.js` - Interactive release script with changelog generation

## 🚨 Prerequisites

Before creating a release:

1. **Clean Working Directory**: No uncommitted changes
2. **Main Branch**: Should be on main/master branch
3. **Tests Passing**: All tests should pass
4. **Build Success**: Project should build without errors
5. **Git Remote**: Should have push access to the repository

## 📊 Version Numbering

We follow [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, backward compatible

## 🎯 Quick Start

To create your first release:

1. **Update version** (if not using automated scripts):
   ```bash
   npm version patch  # or minor/major
   ```

2. **Create release**:
   ```bash
   npm run release:manual
   ```

3. **Check GitHub**: Visit the releases page to see your new release

## 🔍 Troubleshooting

### Common Issues

1. **"No changes to commit"**: Version already updated, just push tags
2. **"Permission denied"**: Check GitHub access and branch protection rules
3. **"Tests failing"**: Fix tests before creating release
4. **"Build errors"**: Resolve build issues first

### Debug Commands
```bash
# Check current version
node -p "require('./package.json').version"

# Check git status
git status

# Check remote
git remote -v

# List tags
git tag -l
```

## 📚 Additional Resources

- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Semantic Versioning](https://semver.org/)
- [npm version command](https://docs.npmjs.com/cli/v8/commands/npm-version)
- [Git Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)