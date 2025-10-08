# Contributing to Aurelio Platform

Thank you for your interest in contributing to Aurelio! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch (`git checkout -b feature/amazing-feature`)
4. Follow the [Getting Started Guide](./docs/getting-started.md) to set up your development environment

## Development Workflow

### 1. Making Changes

- Write clear, concise commit messages
- Follow the existing code style (enforced by ESLint and Prettier)
- Add tests for new features
- Update documentation as needed

### 2. Code Style

We use ESLint and Prettier to enforce code style:

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### 3. Testing

```bash
# Run all tests
pnpm test

# Run tests for a specific package
pnpm --filter @aurelio/ui test
```

### 4. Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

Examples:
```bash
git commit -m "feat(platform): add tenant provisioning interface"
git commit -m "fix(storefront): resolve cart total calculation"
git commit -m "docs: update API reference for payments"
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation with any new features or API changes
3. Ensure all tests pass and linters are satisfied
4. Request review from maintainers
5. Squash commits before merging (if requested)

### PR Title Format

```
[type](scope): description

Example: feat(mobile-admin): add push notifications
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Project Structure

```
aurelio-platform/
├── apps/                   # Applications
│   ├── platform/          # Super Admin Dashboard
│   ├── user-dashboard/    # User Dashboard
│   ├── storefront/        # Multi-tenant Storefront
│   ├── mobile-admin/      # Mobile App
│   └── medusa/            # Medusa Backend
├── packages/              # Shared Packages
│   ├── ui/               # UI Components
│   ├── lib/              # Utilities
│   ├── database/         # Database Schemas
│   └── ...
├── docs/                  # Documentation
└── scripts/               # Utility Scripts
```

## Adding a New Package

```bash
# Create package directory
mkdir packages/my-package

# Create package.json
cd packages/my-package
pnpm init

# Add to workspace in root package.json
```

## Adding a New App

```bash
# Create app directory
mkdir apps/my-app

# Initialize Next.js (for web apps)
cd apps/my-app
pnpm create next-app . --typescript

# Or initialize React Native (for mobile)
pnpm create expo-app . --template
```

## Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Production hotfixes

## Release Process

1. Bump version in package.json files
2. Update CHANGELOG.md
3. Create release PR to `main`
4. Tag release after merge
5. Deploy to production

## Areas for Contribution

### High Priority
- [ ] AI Customer Service Chatbot Training
- [ ] Shipping Provider Integrations
- [ ] Payment Gateway Extensions
- [ ] Mobile App Features
- [ ] Documentation Improvements

### Good First Issues
Look for issues labeled `good-first-issue` on GitHub.

## Questions?

- Discord: https://discord.gg/aurelio
- Email: dev@aurelio.app
- Discussions: https://github.com/your-org/aurelio-platform/discussions

Thank you for contributing to Aurelio! 🙏

