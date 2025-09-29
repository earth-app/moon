# The Earth App Documentation

Comprehensive API documentation and technical specifications for The Earth App ecosystem, including all four core projects: Mantle (deprecated), Mantle2, Cloud, and Crust.

## 🌍 Project Overview

The Earth App is a sustainable technology platform that combines operational APIs, AI-powered content generation, and a modern frontend interface. This documentation repository serves as the central hub for all technical specifications and integration guides.

### Architecture

- **🏗️ Mantle2** (Primary API): Drupal-based operational backend for rapid development
- **☁️ Cloud** (AI Worker): TypeScript Cloudflare Worker for AI content generation
- **🎨 Crust** (Frontend): Vue/Nuxt application providing the user interface
- **⚠️ Mantle** (Deprecated): Original Cloudflare Worker API (migration recommended)

### Key Features

- **Hybrid API Architecture**: Seamless integration between Mantle2 and Cloud
- **AI-Powered Content**: Automated content generation and enhancement
- **Rapid Development**: 5-10x faster development using Drupal ecosystem
- **Modern Frontend**: Responsive, performant Vue.js application
- **Comprehensive Documentation**: Complete API references with multi-language examples

## 📚 Documentation Structure

### Project Documentation
- **[Mantle (Deprecated)](/docs/mantle/)** - Original CF Worker API (maintenance only)
- **[Mantle2 (Active)](/docs/mantle2/)** - Primary Drupal backend with extensive API
- **[Cloud (Active)](/docs/cloud/)** - AI-powered content generation worker
- **[Crust (Active)](/docs/crust/)** - Frontend Vue/Nuxt application

### Cross-Project Analysis
- **[Hybrid API Analysis](/docs/hybrid-api)** - Mantle2 ↔ Cloud integration patterns
- **[Mantle vs Mantle2](/docs/mantle-vs-mantle2)** - Migration guide and comparison
- **[Commit Summary](/docs/commit-summary)** - Git history and project evolution

### Developer Resources
- **[Contributing Guide](/docs/CONTRIBUTING)** - Per-project development instructions
- **[Organization Metadata](/docs/_data/ORG_METADATA)** - Project links and contact info
- **[TODO List](/docs/TODOS)** - Missing information and tasks for maintainers

## 🚀 Quick Start

### View Documentation
```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build
```

### API Examples

**Content Creation with Hybrid API:**
```bash
# Create enhanced content via Mantle2 → Cloud integration
curl -X POST "https://api.mantle2.earth-app.example/api/content/generate" \
  -H "Authorization: Bearer <token>" \
  -d '{"prompt": "Write about sustainable technology"}'
```

**Frontend Integration:**
```javascript
// Vue component using the hybrid API
const { data } = await $fetch('/api/content/generate', {
  method: 'POST',
  body: { prompt: 'AI-generated content...' }
});
```

## 🔗 Repository Links

- **Documentation**: https://github.com/earth-app/moon
- **Mantle (Deprecated)**: https://github.com/earth-app/mantle
- **Mantle2 (Active)**: https://github.com/earth-app/mantle2
- **Cloud (Active)**: https://github.com/earth-app/cloud
- **Crust (Active)**: https://github.com/earth-app/crust

## 🤝 Contributing

See our [Contributing Guide](/docs/CONTRIBUTING) for detailed instructions on contributing to each project:

- **Mantle**: Security fixes only (deprecated)
- **Mantle2**: Primary development - Drupal module contributions
- **Cloud**: AI worker enhancements and optimization
- **Crust**: Frontend improvements and new features
- **Documentation**: Accuracy improvements and missing information

## 📞 Support

- **GitHub Issues**: Project-specific bug reports and features
- **Primary Maintainer**: [@gmitch215](https://github.com/gmitch215)
- **Organization**: [@earth-app](https://github.com/earth-app)
- **Security Issues**: Report via private security advisory

## 📄 License

Documentation is available under the MIT License. Individual projects may have different licenses - see each repository for details.
