---
title: Crust Composables
---

## Composables Catalog

Lightweight state via Nuxt composables instead of Vuex/Pinia.

### useAuth

- Manages tokens and user session
- Wraps login/logout flows
- Exposes `currentUser` reactive ref

### useArticle

- Fetch & paginate articles via Mantle2 API proxy
- Caches last page in memory
- Provides `loadMore()` and `refresh()`

### useSiteTour

- Controls onboarding tour visibility
- Sequence steps + persistence in localStorage

### useUser

- Profile editing operations
- Debounced PATCH calls

### Patterns

- Each composable returns small surface (refs + actions)
- Avoid large reactive trees
- Server-side usage only for initial fetch; hydration picks up on client
