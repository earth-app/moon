---
title: Cloud Service Overview
---

## Cloud (Workers + AI)

The Cloud component is a Cloudflare Workers service orchestrating AI generation, scientific article enrichment, recommendation, image/profile workflows, and journey tracking.

### High-Level Flow

1. Request enters Hono app (middleware: headers, CORS, cache)
2. KV / HTTP cache checked (tryCache)
3. AI / WASM algorithms (Ocean) invoked if needed
4. Result persisted to Mantle2 (POST) when canonical
5. Response streamed or returned (JSON)

### Subsystems

- AI Generation: multi-model (classification, reranking, summarization)
- Article Pipeline: topic -> search -> rank -> summarize -> ingest
- Recommendation: activities & articles scoring (Ocean algorithms)
- Journeys: streak tracking & activity linking via KV
- Profile Photos: prompt generation -> image model -> CDN cache
- Caching: HTTP cache headers + KV tier + R2 for images

### Scheduled Tasks

- Hourly prompt generation cron
- Every 4 hours article creation cron

### Security

- API key in headers for privileged operations
- Rate limiting via Mantle2 upstream (secondary enforcement client-side)

### Error Modes

- 400 validation (prompt/article body issues)
- 404 resource not found
- 429 rate limit (cron overlap or burst)

### Cross-Component

- Uses Ocean (WASM) for algorithms & scraping
- Sends enriched articles/prompts to Mantle2
- Serves Crust frontend as upstream for dynamic features
