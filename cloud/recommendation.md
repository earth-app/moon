---
title: Cloud Recommendation Engine
---

## Recommendation

Combines user activity context with Ocean WASM algorithms to suggest activities and articles.

### Activity Scoring (Ocean)

Formula (conceptual):

```text
score = 0.6 * keyword_jaccard + 0.4 * type_similarity
```

### Article Scoring

- Base relevance (reranker score)
- Novelty (recent created_at boost)
- Diversity penalty if too similar to prior suggestions

### Endpoints

- GET /users/recommend_activities
- GET /users/recommend_articles

### Response Example

```json
{
	"data": [
		{ "id": "a_1", "title": "Morning Run", "score": 0.87 },
		{ "id": "a_2", "title": "Meditation", "score": 0.78 }
	]
}
```

### Performance

- Batch scoring in WASM memory
- Memoize keyword sets per user session
- Limit output to top N (default 10)

### Errors

- 401 Unauthorized
- 429 Too Many Requests
