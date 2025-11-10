---
title: Cloud Article Pipeline
---

## Article Creation & Curation

End-to-end flow from topic to stored article in Mantle2.

### Flowchart (textual)

User/cron -> Generate topic -> Build query -> Fetch candidates (Ocean scrapers/APIs) -> Rerank -> Summarize -> Check cache/dupes -> POST /v2/articles (Mantle2) -> Return article

### Steps

1. createActivityData/findArticle: derive query terms from topic
2. findArticles: fetch candidates from PubMed/DOAJ/SpringerOpen/RSS (Ocean)
3. rerank: score candidates by relevance & novelty
4. summarize: LLM condenses abstract into 2–3 sentences
5. postArticle: persist to Mantle2; handle 409 duplicate

### Request to Mantle2 (example)

```json
{
	"title": "Circadian effects on immunity",
	"abstract": "...",
	"authors": ["A. Smith"],
	"source": "PubMed",
	"url": "https://pubmed.ncbi.nlm.nih.gov/..."
}
```

### Responses

- 201 Created: returns { id, title }
- 409 Conflict: duplicate article by URL/DOI

### Caching

- KV: store article candidates by topic key for 24h
- HTTP cache: ETag on article GET responses
