#!/bin/bash

# Coding Party 2026 Setup Script
# This script sets up the development environment for contributors

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements
check_requirements() {
    log_info "Checking system requirements..."
    
    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_NODE_VERSION="18.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_NODE_VERSION" ]; then
            log_success "Node.js $NODE_VERSION is installed ✓"
        else
            log_error "Node.js version $REQUIRED_NODE_VERSION or higher is required. Found: $NODE_VERSION"
            log_info "Please install Node.js from https://nodejs.org/"
            exit 1
        fi
    else
        log_error "Node.js is not installed"
        log_info "Please install Node.js from https://nodejs.org/"
        exit 1
    fi
    
    # Check Git
    if command_exists git; then
        GIT_VERSION=$(git --version | cut -d' ' -f3)
        log_success "Git $GIT_VERSION is installed ✓"
    else
        log_error "Git is not installed"
        log_info "Please install Git from https://git-scm.com/"
        exit 1
    fi
    
    # Check for pnpm (preferred) or npm
    if command_exists pnpm; then
        PNPM_VERSION=$(pnpm --version)
        log_success "pnpm $PNPM_VERSION is installed ✓"
        PACKAGE_MANAGER="pnpm"
    elif command_exists npm; then
        NPM_VERSION=$(npm --version)
        log_warning "npm $NPM_VERSION is installed, but pnpm is recommended"
        log_info "Install pnpm with: npm install -g pnpm"
        PACKAGE_MANAGER="npm"
    else
        log_error "No package manager found"
        exit 1
    fi
    
    # Check Docker (optional)
    if command_exists docker; then
        DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
        log_success "Docker $DOCKER_VERSION is installed ✓"
        DOCKER_AVAILABLE=true
    else
        log_warning "Docker is not installed (optional for local development)"
        log_info "Install Docker from https://docs.docker.com/get-docker/"
        DOCKER_AVAILABLE=false
    fi
}

# Setup Git configuration
setup_git() {
    log_info "Setting up Git configuration..."
    
    # Check if Git is already configured
    if git config --global user.name >/dev/null 2>&1 && git config --global user.email >/dev/null 2>&1; then
        GIT_NAME=$(git config --global user.name)
        GIT_EMAIL=$(git config --global user.email)
        log_success "Git is already configured for $GIT_NAME <$GIT_EMAIL>"
    else
        log_warning "Git is not configured. Please set up your Git identity:"
        echo "Run the following commands:"
        echo "  git config --global user.name \"Your Name\""
        echo "  git config --global user.email \"your.email@example.com\""
        echo ""
        read -p "Press Enter to continue after configuring Git..."
    fi
    
    # Set up useful Git aliases
    log_info "Setting up helpful Git aliases..."
    git config --global alias.co checkout 2>/dev/null || true
    git config --global alias.br branch 2>/dev/null || true
    git config --global alias.ci commit 2>/dev/null || true
    git config --global alias.st status 2>/dev/null || true
    git config --global alias.unstage 'reset HEAD --' 2>/dev/null || true
    git config --global alias.last 'log -1 HEAD' 2>/dev/null || true
    git config --global alias.visual '!gitk' 2>/dev/null || true
    
    log_success "Git aliases configured ✓"
}

# Install dependencies
install_dependencies() {
    log_info "Installing project dependencies..."
    
    if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
        pnpm install
    else
        npm install
    fi
    
    log_success "Dependencies installed ✓"
}

# Setup environment files
setup_environment() {
    log_info "Setting up environment configuration..."
    
    # Create .env.local if it doesn't exist
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            log_success "Created .env.local from .env.example"
            log_warning "Please review and update .env.local with your configuration"
        else
            log_warning "No .env.example found, skipping environment setup"
        fi
    else
        log_info ".env.local already exists, skipping creation"
    fi
}

# Setup development tools
setup_dev_tools() {
    log_info "Setting up development tools..."
    
    # Setup pre-commit hooks if available
    if [ -f ".pre-commit-config.yaml" ] && command_exists pre-commit; then
        pre-commit install
        log_success "Pre-commit hooks installed ✓"
    elif [ -f "package.json" ] && grep -q "husky" package.json; then
        if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
            pnpm run prepare 2>/dev/null || true
        else
            npm run prepare 2>/dev/null || true
        fi
        log_success "Husky hooks installed ✓"
    fi
    
    # Setup VS Code settings if VS Code is available
    if command_exists code && [ ! -d ".vscode" ]; then
        mkdir -p .vscode
        
        # Create recommended settings
        cat > .vscode/settings.json << 'EOF'
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.next": true
  }
}
EOF
        
        # Create recommended extensions
        cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-vscode.vscode-docker"
  ]
}
EOF
        
        log_success "VS Code configuration created ✓"
    fi
}

# Run initial tests
run_tests() {
    log_info "Running initial tests to verify setup..."
    
    # Check if test script exists
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
            if pnpm test 2>/dev/null; then
                log_success "All tests passed ✓"
            else
                log_warning "Some tests failed, but setup is complete"
                log_info "You can run 'pnpm test' later to check test status"
            fi
        else
            if npm test 2>/dev/null; then
                log_success "All tests passed ✓"
            else
                log_warning "Some tests failed, but setup is complete"
                log_info "You can run 'npm test' later to check test status"
            fi
        fi
    else
        log_info "No test script found, skipping test run"
    fi
}

# Setup Docker environment (optional)
setup_docker() {
    if [ "$DOCKER_AVAILABLE" = true ] && [ -f "docker-compose.yml" ]; then
        log_info "Docker Compose file found. Setting up Docker environment..."
        
        read -p "Do you want to start Docker services now? (y/N): " -n 1 -r
        echo
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose up -d
            log_success "Docker services started ✓"
            log_info "You can stop services with: docker-compose down"
        else
            log_info "Docker services not started. You can start them later with: docker-compose up -d"
        fi
    fi
}

# Display next steps
show_next_steps() {
    log_success "Setup completed successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Review and update .env.local with your configuration"
    echo "2. Read the contributing guide: CONTRIBUTING.md"
    echo "3. Check out the onboarding guide: docs/onboarding.md"
    echo "4. Join our community discussions on GitHub"
    echo ""
    echo "Useful commands:"
    if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
        echo "  pnpm dev          # Start development server"
        echo "  pnpm test         # Run tests"
        echo "  pnpm lint         # Run linting"
        echo "  pnpm build        # Build for production"
    else
        echo "  npm run dev       # Start development server"
        echo "  npm test          # Run tests"
        echo "  npm run lint      # Run linting"
        echo "  npm run build     # Build for production"
    fi
    echo ""
    echo "Need help? Check out:"
    echo "  - Documentation: docs/"
    echo "  - Community discussions: https://github.com/coding-party-2026/coding-party-2026/discussions"
    echo "  - Issues: https://github.com/coding-party-2026/coding-party-2026/issues"
    echo ""
    log_success "Welcome to Coding Party 2026! 🚀"
}

# Main setup function
main() {
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    Coding Party 2026                         ║"
    echo "║                   Development Setup                          ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo ""
    
    log_info "Starting development environment setup..."
    echo ""
    
    # Run setup steps
    check_requirements
    echo ""
    
    setup_git
    echo ""
    
    install_dependencies
    echo ""
    
    setup_environment
    echo ""
    
    setup_dev_tools
    echo ""
    
    run_tests
    echo ""
    
    setup_docker
    echo ""
    
    show_next_steps
}

# Handle script interruption
trap 'log_error "Setup interrupted by user"; exit 1' INT

# Run main function
main "$@"