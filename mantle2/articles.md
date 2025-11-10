# Mantle2 Articles Endpoints

Scientific article metadata (ingested via Cloud + Ocean scraping pipeline). Parameter: `articleId`.

## Catalogue & Management

- GET /v2/articles — list articles
- POST /v2/articles — create article
- GET /v2/articles/random — random articles
- GET /v2/articles/{articleId} — retrieve article
- PATCH /v2/articles/{articleId} — update article
- DELETE /v2/articles/{articleId} — delete article
- POST /v2/articles/check_expired — admin check expired articles

## Endpoints and Responses

### GET /v2/articles

200 OK:

```json
{ "data": [{ "id": "art_1", "title": "Circadian Effects" }] }
```

### POST /v2/articles

Request body (example):

```json
{ "title": "Circadian Effects", "abstract": "..." }
```

201 Created:

```json
{ "id": "art_1", "title": "Circadian Effects" }
```

400 Bad Request; 401/403

Parameters: none

### GET /v2/articles/random

200 OK:

```json
{ "data": [{ "id": "art_7", "title": "Chronobiology Review" }] }
```

### GET /v2/articles/{articleId}

200 OK:

```json
{ "id": "art_1", "title": "Circadian Effects", "abstract": "..." }
```

404 Not Found:

```json
{ "error": { "code": "E404", "message": "Article not found" } }
```

### PATCH /v2/articles/{articleId}

200 OK — updated; 401/403; 404

Path parameters:

| Name      | Type   | Description        |
| --------- | ------ | ------------------ |
| articleId | string | Article identifier |

Body example:

```json
{ "title": "Updated Title" }
```

### DELETE /v2/articles/{articleId}

204 No Content — deleted; 401/403; 404

Path parameters: same as PATCH.

### POST /v2/articles/check_expired

204 No Content — processed; 401/403

Parameters: none. Body: none.

## Notes

- Spec omits detailed schema; actual implementation can include authors, source, links, keywords.
- User-scoped listing endpoints exist in `users.md` (/v2/users/{id|username|current}/articles).

## Error Format

```json
{ "error": { "code": "E404", "message": "Not found" } }
```
