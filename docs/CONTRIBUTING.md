---
title: "Contributing Guide"
description: "Comprehensive contribution guide for all Earth App projects"
sidebarDepth: 2
lastUpdated: true
---

# Contributing to The Earth App

Welcome to The Earth App project! This guide provides instructions for contributing to all components of the Earth App ecosystem.

## General Guidelines

### Code of Conduct
- Be respectful and inclusive in all interactions
- Follow established coding standards and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting

### Getting Started
1. Fork the relevant repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with appropriate tests
4. Submit a pull request with a clear description

### Commit Message Format
```
type(scope): brief description

Longer description if needed

- Bullet points for details
- Reference issues: Fixes #123
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Project-Specific Instructions

## 📱 Mantle (DEPRECATED - Limited Maintenance Only)

::: danger DEPRECATION NOTICE
**Mantle is deprecated.** Only critical security fixes and essential maintenance are accepted.
All new development should target **Mantle2**.
:::

### Repository
**GitHub:** https://github.com/earth-app/mantle

### Allowed Contributions
- **Security fixes only**
- **Critical bug fixes**
- **Documentation updates**
- **Migration assistance tools**

### Development Setup
```bash
# Clone repository
git clone https://github.com/earth-app/mantle.git
cd mantle

# Install dependencies
npm install

# Local development
wrangler dev

# Run tests
npm test
```

### Technology Stack
- **Platform:** Cloudflare Workers
- **Language:** JavaScript/TypeScript
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare KV + R2
- **Deployment:** Wrangler CLI

### Submission Guidelines
- **Security Issues:** Email security@earth-app.example (TODO: Add real email)
- **PRs:** Must include security justification or migration context
- **Testing:** Include tests for any logic changes
- **Documentation:** Update deprecation notices and migration guides

### Migration Priority
Help users migrate to Mantle2:
- Document API equivalencies
- Create migration scripts
- Update README with deprecation timeline

---

## 🏗️ Mantle2 (Primary Development)

::: tip ACTIVE DEVELOPMENT
**Mantle2 is the primary API backend.** All new operational features should be implemented here.
:::

### Repository
**GitHub:** https://github.com/earth-app/mantle2

### Development Setup
```bash
# Clone repository
git clone https://github.com/earth-app/mantle2.git
cd mantle2

# Install dependencies
composer install

# Local development (choose one)
# Option A: Lando
lando start
lando drush site:install

# Option B: DDEV
ddev start
ddev drush site:install

# Option C: Docker Compose
docker-compose up -d
docker-compose exec web drush site:install
```

### Technology Stack
- **Platform:** Drupal 9/10 Custom Module
- **Language:** PHP 8.1+
- **Framework:** Symfony components
- **Database:** MySQL 8.0+ / PostgreSQL 13+
- **Testing:** PHPUnit + Drupal Test Framework
- **Code Quality:** PHP_CodeSniffer + PHPMD

### Development Workflow

#### 1. Module Development
```bash
# Enable module for development
drush en mantle2 -y

# Generate new code
drush generate controller
drush generate service
drush generate plugin

# Clear caches
drush cr
```

#### 2. API Development
```bash
# Create new API endpoint
drush generate controller --class=ApiController

# Test endpoint
curl -X GET "http://localhost/api/mantle2/endpoint" \
  -H "Accept: application/json"
```

#### 3. Database Changes
```bash
# Create migration
drush generate migration

# Run migrations
drush migrate:import migration_name

# Rollback if needed
drush migrate:rollback migration_name
```

### Testing
```bash
# Run unit tests
./vendor/bin/phpunit modules/custom/mantle2/tests/

# Run Drupal functional tests
./vendor/bin/phpunit -c web/core modules/custom/mantle2/tests/src/Functional/

# Test coverage
./vendor/bin/phpunit --coverage-html coverage/

# Code quality checks
./vendor/bin/phpcs --standard=Drupal modules/custom/mantle2/
./vendor/bin/phpcbf --standard=Drupal modules/custom/mantle2/
```

### Coding Standards
- **PSR-12** for PHP code style
- **Drupal Coding Standards** for Drupal-specific code
- **DocBlock** comments for all public methods
- **Type hints** for parameters and return values

### Contribution Areas
- **API Endpoints:** New business logic endpoints
- **Drupal Integration:** Content types, fields, workflows
- **Performance:** Caching, query optimization
- **Security:** Authentication, authorization improvements
- **Testing:** Unit tests, functional tests, integration tests

---

## ☁️ Cloud (AI & Content Processing)

::: tip AI WORKER
**Cloud handles AI operations** and integrates with Mantle2 for hybrid functionality.
:::

### Repository
**GitHub:** https://github.com/earth-app/cloud

### Development Setup
```bash
# Clone repository
git clone https://github.com/earth-app/cloud.git
cd cloud

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your API keys and configuration

# Local development
wrangler dev --port 8787

# Test with local requests
curl http://localhost:8787/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test"}'
```

### Technology Stack
- **Platform:** Cloudflare Workers
- **Language:** TypeScript
- **Runtime:** V8 isolates
- **Storage:** Cloudflare KV + R2
- **AI:** OpenAI API / Anthropic / Local models
- **Build:** Wrangler + esbuild

### Development Workflow

#### 1. Worker Development
```bash
# Start development server
wrangler dev

# Deploy to staging
wrangler publish --env staging

# Deploy to production
wrangler publish --env production
```

#### 2. AI Integration
```bash
# Test AI endpoints
curl -X POST "http://localhost:8787/ai/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <api-key>" \
  -d '{
    "prompt": "Generate a blog post about sustainability",
    "model": "gpt-4",
    "max_tokens": 1000
  }'
```

#### 3. Storage Operations
```bash
# Test R2 file upload
curl -X POST "http://localhost:8787/files/upload" \
  -H "Authorization: Bearer <api-key>" \
  -F "file=@example.pdf"

# Test KV operations
curl "http://localhost:8787/cache/key123" \
  -H "Authorization: Bearer <api-key>"
```

### Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test against live APIs (staging)
npm run test:e2e

# Performance testing
npm run test:performance
```

### Environment Configuration
```bash
# Required secrets (managed via Wrangler)
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put MANTLE2_API_KEY

# KV namespaces
wrangler kv:namespace create "CACHE"
wrangler kv:namespace create "AI_PROMPTS"

# R2 buckets
wrangler r2 bucket create generated-content
```

### Contribution Areas
- **AI Models:** Integration with new AI providers
- **Content Processing:** File format support, transformations
- **Performance:** Caching strategies, response optimization
- **Security:** API key management, rate limiting
- **Monitoring:** Logging, metrics, alerting

---

## 🎨 Crust (Frontend Application)

::: tip FRONTEND
**Crust provides the user interface** and integrates with Mantle2 + Cloud APIs.
:::

### Repository
**GitHub:** https://github.com/earth-app/crust

### Development Setup
```bash
# Clone repository
git clone https://github.com/earth-app/crust.git
cd crust

# Install dependencies
npm install
# or
pnpm install

# Set up environment
cp .env.example .env
# Configure API endpoints for Mantle2 and Cloud

# Local development
npm run dev
# Visit http://localhost:3000
```

### Technology Stack
- **Framework:** Nuxt 3 + Vue 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS / Vuetify / Custom CSS
- **Build:** Vite
- **Deployment:** Cloudflare Pages / Vercel / Netlify
- **Testing:** Vitest + Vue Test Utils

### Development Workflow

#### 1. Component Development
```bash
# Generate new components
npm run generate

# Run development server
npm run dev

# Build for production
npm run build
```

#### 2. API Integration
```typescript
// Example API integration
const { data } = await $fetch('/api/content', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${useAuthStore().token}`
  },
  body: {
    type: 'article',
    content: 'Example content'
  }
});
```

#### 3. State Management
```typescript
// Pinia store example
export const useContentStore = defineStore('content', () => {
  const items = ref([]);
  
  const fetchContent = async () => {
    const response = await $fetch('/api/content');
    items.value = response.data;
  };
  
  return { items, fetchContent };
});
```

### Testing
```bash
# Run unit tests
npm run test

# Run component tests
npm run test:component

# Run e2e tests
npm run test:e2e

# Visual regression tests
npm run test:visual

# Test coverage
npm run test:coverage
```

### Code Quality
```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Formatting
npm run format

# Pre-commit hooks
npm run prepare
```

### Contribution Areas
- **UI Components:** Reusable Vue components
- **User Experience:** Interaction design, accessibility
- **Performance:** Bundle optimization, loading strategies
- **Mobile:** Responsive design, PWA features
- **Integration:** API client improvements, error handling

---

## 📖 Documentation (This Repository)

### Repository
**GitHub:** https://github.com/earth-app/moon

### Development Setup
```bash
# Clone repository
git clone https://github.com/earth-app/moon.git
cd moon

# Install dependencies
npm install

# Local development
npm run docs:dev
# Visit http://localhost:5173

# Build documentation
npm run docs:build
```

### Technology Stack
- **Framework:** VitePress
- **Language:** Markdown + TypeScript
- **Styling:** Default VitePress theme
- **Deployment:** GitHub Pages
- **Diagrams:** Mermaid

### Contribution Guidelines
- **Accuracy:** Ensure all code examples work
- **Completeness:** Include all necessary context
- **Consistency:** Follow established patterns
- **Currency:** Keep information up-to-date

---

## Cross-Project Coordination

### Hybrid API Development
When working on features that span multiple projects:

1. **Design Phase:** Create design document in moon repository
2. **API Changes:** Implement backend changes in mantle2/cloud first
3. **Frontend Integration:** Update crust to use new APIs
4. **Documentation:** Update API docs and integration guides
5. **Testing:** End-to-end testing across all services

### Release Coordination
```bash
# Typical release sequence
1. Deploy cloud changes (backward compatible)
2. Deploy mantle2 changes
3. Deploy crust frontend updates
4. Update documentation
5. Announce release
```

### Issue Tracking
- **Cross-project issues:** File in moon repository
- **Project-specific bugs:** File in respective project repository
- **Security issues:** Email security@earth-app.example (TODO: Add real email)

---

## Getting Help

### Communication Channels
- **GitHub Issues:** For bugs and feature requests
- **GitHub Discussions:** For questions and community discussion
- **Pull Request Reviews:** For code feedback

### Maintainer Contact
- **Primary Maintainer:** [@gmitch215](https://github.com/gmitch215)
- **Organization:** [@earth-app](https://github.com/earth-app)

### Response Times
- **Security Issues:** 24 hours
- **Bug Reports:** 3-5 business days
- **Feature Requests:** 1-2 weeks
- **Pull Requests:** 3-7 business days

Thank you for contributing to The Earth App! 🌍