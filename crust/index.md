---
title: Crust Technical Overview
---

## Crust (Nuxt Frontend)

Nuxt 4 app extending @nuxt/ui, optimized with a hybrid SSR/ISR/SWR strategy and API proxying to Mantle2/Cloud.

### Rendering Strategy

- SSR for authenticated and dynamic pages
- ISR for semi-static content (articles index) with revalidate
- SWR client hydration for user-local data (notifications)
- Client-only routes for auth/profile flows

### routeRules Highlights

- `/` -> prerender + ISR
- `/articles/**` -> ISR + SWR
- `/user/**` -> SSR only (auth)

### Performance Impacts

- Preconnect to API/CDN origins
- Cache headers for static assets
- Minimal global state (composables over stores)
- Avoid waterfall via parallel fetch in server routes

### API Proxy Pattern (Nitro)

- Server routes under `/api/**` forward to Mantle2/Cloud
- Inject runtimeConfig base URLs and auth headers
- Centralized error handling (translate to standard JSON)

### UI Extension of @nuxt/ui

- Compose over override: wrap base components with app-specific props
- Theming via Tailwind tokens (v4)
- SEO helpers: schema.org, meta module

### Troubleshooting

- If ISR not updating: verify routeRules and cache-control
- If auth flickers: ensure client-only components for tokens
