---
title: Crust Rendering Modes
---

## Rendering Modes

### SSR

Used for user-specific pages requiring fresh auth context.

### ISR

Leverages routeRules to revalidate content on interval (articles listing). Reduces backend load for popular pages.

### SWR

Client re-fetch after initial SSR/ISR HTML to keep data fresh without blocking first paint.

### Client-Only

Pages that must never SSR (profile editing) to avoid leaking sensitive tokens.

### Decision Flow

```text
Need auth-sensitive? -> SSR
Else mostly static & high traffic? -> ISR
Else needs live freshness with fallback? -> ISR + SWR
Pure personalization only? -> Client-only
```

### Metrics

Track TTFB (SSR), Revalidate hit rate (ISR), Stale display time (SWR), hydration errors.
