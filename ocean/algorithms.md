---
title: Ocean Algorithms
---

## Recommendation Algorithms

Implements scoring in Kotlin -> compiled to WASM/JS for Cloud usage.

### Activity Scoring

Components:

- Keyword Jaccard similarity
- Type weighting

Formula:

```text
score = 0.6 * keyword_jaccard + 0.4 * type_similarity
```

### Event Scoring

Factors:

- Base keyword similarity
- Event kind weight (map)
- Novelty (inverse of occurrence count)
- Recency (timestamp decay)

### Diversity

Applied as penalty if top-N contain similar titles (>80% token overlap).

### Performance

- Pre-computed keyword sets
- Single pass weighting
- WASM linear memory arrays for scores

## Data Normalization

Before scoring, articles/events normalized (lowercase, trimmed, stripped HTML).
