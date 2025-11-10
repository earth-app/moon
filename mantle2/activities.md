# Mantle2 Activities Endpoints

Core activity catalogue (global) plus user activity management (see `users.md`). Parameter name in spec: `activityId`.

## Global Catalogue Endpoints

- GET /v2/activities — list activities
- POST /v2/activities — create activity (Admin Only)
- GET /v2/activities/random — random selection
- GET /v2/activities/{activityId} — retrieve by ID
- PATCH /v2/activities/{activityId} — update (Admin Only)
- DELETE /v2/activities/{activityId} — delete (Admin Only)
- GET /v2/activities/list — array of activity IDs (lightweight)

## User-Scoped Activity Operations (cross-reference)

Documented in `users.md` under:

- /v2/users/{id|username|current}/activities (GET/PATCH/PUT/DELETE)
- /v2/users/{id|username|current}/activities/recommend (GET)

## Endpoints and Responses

### GET /v2/activities

200 OK:

```json
{ "data": [{ "id": "a_1", "title": "Morning 5k" }] }
```

### POST /v2/activities

201 Created:

```json
{ "id": "a_2", "title": "Evening Yoga" }
```

400 Bad Request — validation error

401/403 — authentication/permission required

Parameters: none

Request body example:

```json
{ "title": "Evening Yoga" }
```

### GET /v2/activities/random

200 OK:

```json
{ "data": [{ "id": "a_7", "title": "Trail Hike" }] }
```

### GET /v2/activities/{activityId}

200 OK:

```json
{ "id": "a_1", "title": "Morning 5k" }
```

404 Not Found:

```json
{ "error": { "code": "E404", "message": "Activity not found" } }
```

### PATCH /v2/activities/{activityId}

200 OK — updated

401/403 — auth/permission

404 Not Found

Path parameters:

| Name       | Type   | Description         |
| ---------- | ------ | ------------------- |
| activityId | string | Activity identifier |

Body example:

```json
{ "title": "Updated Title" }
```

### DELETE /v2/activities/{activityId}

204 No Content — deleted

401/403 — auth/permission

404 Not Found

Path parameters: same as PATCH.

### GET /v2/activities/list

200 OK:

```json
["a_1", "a_2", "a_3"]
```

## Notes

- Spec omits explicit field schema details; representation may include type/category fields.
- Recommend endpoints return a list similar to catalogue but filtered for the user.

## Error Format

```json
{ "error": { "code": "E404", "message": "Not found" } }
```
