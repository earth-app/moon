---
title: Mantle2 Overview
outline: deep
---

## Mantle2 (Drupal/PHP backend)

Mantle2 is the authoritative REST API for The Earth App. It persists users, activities, events, prompts, and articles and exposes a live OpenAPI 3.1 schema.

Core traits:

- Drupal 11 + PHP 8.4 with Symfony routing/controllers
- OpenAPI auto-generation from route metadata
- Security: BasicAuth (admin/ops) + Bearer JWT (end users)
- Performance: Redis caching, rate limiting, pagination helpers
- Integration: Bridges to Cloud service for AI-enriched content

Flow overview

- Client -> Mantle2 -> Controllers -> Services/DB -> Response
- Cloud -> Mantle2 (POST articles/prompts) for persistent storage

Request lifecycle

1. Auth validated (Basic or Bearer)
2. CORS/rate limits applied
3. Controller reads inputs (query/path/body)
4. Service/query + optional Redis cache
5. JSON response with consistent schemas

OpenAPI docs

- Schema endpoint: /openapi (JSON)
- Swagger UI: /docs (if enabled)

Status codes

- 200 OK, 201 Created, 204 No Content
- 400 Bad Request, 401 Unauthorized, 403 Forbidden
- 404 Not Found, 409 Conflict, 429 Too Many Requests

Common parameters

- Pagination: limit, page
- Search: search
- Sort: sort=asc|desc|rand

Common error shape

```json
{
	"error": {
		"code": "E404",
		"message": "Resource not found",
		"details": {}
	}
}
```

Cross-service relationship

- Cloud enriches and curates content, then POSTs to Mantle2
- Crust (Nuxt) reads from Mantle2 for user-facing pages
- Ocean algorithms run in Cloud; Mantle2 remains the source of truth
