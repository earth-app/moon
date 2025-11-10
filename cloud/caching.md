---
title: Cloud Caching Strategy
---

## Caching Layers

1. HTTP cache (Cache-Control, ETag)
2. KV cache (tryCache wrapper)
3. Source fetch (Ocean scraper or external API)

### Flow

Request -> HTTP cache hit? -> KV hit? -> Source fetch -> KV write -> Response

### KV Key Design

```text
user:{id}:activities:recommendations
articles:topic:{slug}
journey:{user_id}:{date}
profile_photo:{user_id}
```

### TTL Guidelines

- Recommendations: 5m
- Article candidates: 24h
- Journeys: 1d
- Profile photo prompt: 1h

### Invalidation

- Explicit clearCache() on profile photo regeneration
- Automatic override if stale TTL exceeded

### Performance Notes

- Minimal JSON serialization (avoid large nested arrays)
- Chunking large candidate sets before KV write
