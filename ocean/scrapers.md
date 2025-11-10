---
title: Ocean Scrapers
---

## Scraper Architecture

Coroutine-based concurrent fetchers for scholarly sources compiled to WASM.

### Sources

- PubMed (ESearch + EFetch)
- DOAJ (JSON API)
- SpringerOpen (HTML parsing)
- IMEJ (HTML parsing)
- RSS (generic feeds)

### Pipeline

1. Build query (keywords, sanitization)
2. Dispatch concurrent requests (coroutineScope + launch)
3. Parse & normalize (authors, abstract, link)
4. Create article object
5. Return unified list

### Normalization

- formatAuthors(): unify name list
- stripHTML(): remove tags from abstracts
- normalizeLink(): canonical URL

### Example Output

```json
{
	"id": "art_1",
	"title": "Circadian Effects on Immunity",
	"abstract": "...",
	"authors": ["A. Smith"],
	"source": "PubMed"
}
```

### Error Handling

- Individual source failure tolerated; others still return
- Timeout -> exclude source (soft fail)
- Malformed HTML skipped with log marker

### Performance

- Parallel fetch; merge after awaitAll
- Chunk large result sets before rerank
- Reuse HTTP client instances
