# Contributing to Coding Party 2026

Thank you for your interest in contributing to Coding Party 2026! This guide will help you get started and ensure your contributions align with our community standards.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## Getting Started

### Prerequisites

- Git installed on your machine
- Node.js (version 18 or higher)
- A GitHub account
- Basic understanding of Git workflows

### First-Time Setup

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/coding-party-2026.git
   cd coding-party-2026
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/coding-party-2026/coding-party-2026.git
   ```

3. **Run Setup Script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

4. **Verify Installation**
   ```bash
   # Check that everything is working
   npm test
   ```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Fixes**: Help us squash bugs and improve stability
- **Feature Development**: Build new functionality
- **Documentation**: Improve guides, tutorials, and API docs
- **Design**: Contribute to UI/UX and visual design
- **Testing**: Add tests and improve code coverage
- **Code Review**: Help review pull requests
- **Community**: Help with discussions, issues, and onboarding

### Finding Work

1. **Browse Issues**: Check our [issue tracker](https://github.com/coding-party-2026/coding-party-2026/issues)
2. **Good First Issues**: Look for issues labeled `good first issue`
3. **Help Wanted**: Check issues labeled `help wanted`
4. **Discussions**: Join conversations in [GitHub Discussions](https://github.com/coding-party-2026/coding-party-2026/discussions)

### Before You Start

1. **Check Existing Work**: Search issues and PRs to avoid duplication
2. **Discuss Big Changes**: For major features, create an issue first
3. **Read Documentation**: Familiarize yourself with our [architecture](docs/architecture.md)

## Development Workflow

### Branch Strategy

We use a feature branch workflow:

```bash
# Always start from the latest main
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Branch Naming Conventions

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring
- `test/test-description` - Adding or updating tests

### Making Changes

1. **Write Clean Code**: Follow our coding standards
2. **Add Tests**: Include tests for new functionality
3. **Update Documentation**: Keep docs in sync with changes
4. **Test Locally**: Ensure all tests pass before pushing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Run type checking (if applicable)
npm run type-check
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```bash
# Good commit messages
git commit -m "feat(auth): add user authentication system"
git commit -m "fix(api): resolve timeout issue in user endpoint"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(utils): add unit tests for helper functions"

# Bad commit messages
git commit -m "fix stuff"
git commit -m "update"
git commit -m "changes"
```

## Pull Request Process

### Before Submitting

1. **Sync with Upstream**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run Final Checks**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. **Push Your Branch**
   ```bash
   git push origin your-feature-branch
   ```

### Creating the Pull Request

1. **Use Our Template**: Fill out the PR template completely
2. **Write Clear Description**: Explain what changes you made and why
3. **Link Related Issues**: Use "Closes #123" or "Fixes #123"
4. **Add Screenshots**: For UI changes, include before/after images
5. **Request Review**: Tag relevant maintainers or team members

### PR Requirements

- [ ] All tests pass
- [ ] Code follows our style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow our conventions
- [ ] PR description is clear and complete
- [ ] Related issues are linked

### Review Process

1. **Automated Checks**: CI must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: Reviewers may test your changes
4. **Feedback**: Address any requested changes
5. **Merge**: Maintainers will merge approved PRs

## Community Guidelines

### Communication

- **Be Respectful**: Treat everyone with kindness and respect
- **Be Patient**: Remember that everyone is learning
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Inclusive**: Welcome newcomers and different perspectives

### Getting Help

- **GitHub Discussions**: For general questions and ideas
- **Issues**: For bug reports and feature requests
- **Code Review**: For technical feedback on your contributions
- **Documentation**: Check our [docs](docs/) for detailed guides

### Recognition

We believe in recognizing our contributors:

- **Contributors File**: All contributors are listed in [contributors.md](community/contributors.md)
- **Release Notes**: Significant contributions are highlighted in releases
- **Community Events**: Regular contributor spotlights and celebrations

## Development Environment

### Recommended Tools

- **Code Editor**: VS Code with recommended extensions
- **Git Client**: Command line or GitHub Desktop
- **Browser**: Chrome/Firefox with dev tools
- **Terminal**: Your preferred terminal application

### Coding Standards

- **Formatting**: We use Prettier for code formatting
- **Linting**: ESLint for JavaScript/TypeScript
- **Testing**: Jest for unit tests, Cypress for e2e
- **Documentation**: JSDoc for code documentation

### Performance Guidelines

- **Bundle Size**: Keep bundle size impact minimal
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Browser Support**: Support modern browsers (last 2 versions)
- **Mobile**: Ensure responsive design works on mobile devices

## Questions?

Don't hesitate to ask questions! We're here to help:

- **New Contributor?** Check our [onboarding guide](docs/onboarding.md)
- **Technical Questions?** Start a [discussion](https://github.com/coding-party-2026/coding-party-2026/discussions)
- **Found a Bug?** Create an [issue](https://github.com/coding-party-2026/coding-party-2026/issues)

Thank you for contributing to Coding Party 2026! 🎉