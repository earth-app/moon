---
title: Cloud Journeys
---

## Journeys & Streaks

Tracks user streaks and attaches activities to the daily journey using KV.

### Endpoints

- GET /users/:id/journey
- POST /users/:id/journey/increment
- POST /users/:id/journey/reset
- POST /users/:id/journey/activities/:activity_id

### Data Model (KV)

```json
{ "date": "2025-11-10", "streak": 7, "activities": ["a_1", "a_2"] }
```

### Semantics

- increment: idempotent per day
- reset: clears streak and activities for date
- attach activity: ensures uniqueness per day

### Errors

- 401 Unauthorized
- 404 User not found
