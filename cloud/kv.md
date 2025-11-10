---
title: Cloud KV Usage
---

## KV Usage

Key-Value store provides low-latency global data: journeys, cached recommendations, intermediate article sets, profile photo prompts.

### Consistency Model

Eventual consistency; design assumes tolerant reads. Critical persistence (articles/prompts) sent to Mantle2 instead.

### Patterns

- Read-through: tryCache(key, fetcher)
- Write-back: compute -> store -> respond
- Expiration via TTL embed (stored metadata)

### Serialization

Compact JSON objects; avoid deeply nested arrays. Example:

```json
{ "recommendations": ["a_1", "a_2"], "generated_at": 1731206400 }
```

### Size Constraints

- Keep values < 100KB for latency
- Split large arrays into shards (<25KB each)

### Failure Handling

- Soft fail on KV read (fallback to source fetch)
- Log latency >200ms for tuning
