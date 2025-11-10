---
title: Cloud AI Generation
---

## AI Generation Pipeline

Text generation, classification, reranking, summarization, and validation combine to produce high quality user-facing data.

### Stages

1. Topic/Prompt Creation (LLM)
2. Validation (heuristics: length, profanity, duplicates)
3. Article Search Terms Derived
4. Retrieval (external APIs / scrapers via Ocean)
5. Reranking (bge-reranker-base or similar)
6. Summarization (LLM condenses abstracts)
7. Packaging + POST to Mantle2

### Models

| Stage        | Model                           | Purpose                         |
| ------------ | ------------------------------- | ------------------------------- |
| Topic        | @cf/openai/gpt-oss-120b         | Creative, diverse prompt topics |
| Rerank       | @cf/baai/bge-reranker-base      | Semantic relevance scoring      |
| Summary      | @cf/meta/llama-3.1-70b-instruct | Concise scientific summaries    |
| Image Prompt | Stable Diffusion (profile)      | Photographic generation         |

### Validation Rules

- Reject if length < 10 chars
- Reject if duplicate in last N prompts
- Reject if flagged by moderation phrase list

### Example Response Structure

```json
{
	"id": "p_123",
	"topic": "The impact of circadian rhythm on immune response",
	"created_at": "2025-11-10T00:00:00Z"
}
```

### Error Handling

- Fallback: if model timeout -> retry with smaller model (llama-3.1-8b)
- Circuit break after 3 consecutive failures per stage

### Performance Notes

- Batch reranking in chunks of 125 items
- Parallel fetch of candidate abstracts with Promise.all
- KV memoization for identical topic searches
