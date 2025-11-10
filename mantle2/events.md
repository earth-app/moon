# Mantle2 Events Endpoints

Event lifecycle management and participation. Parameter name in spec: `eventId`.

## Endpoints

- GET /v2/events — list events
- POST /v2/events — create event
- GET /v2/events/{eventId} — retrieve event
- PATCH /v2/events/{eventId} — update event
- DELETE /v2/events/{eventId} — delete event
- GET /v2/events/{eventId}/attendees — list attendees
- POST /v2/events/{eventId}/signup — current user signs up
- POST /v2/events/{eventId}/leave — current user cancels signup
- GET /v2/events/current — events for current user

## Endpoints and Responses

### GET /v2/events

200 OK:

```json
{ "data": [{ "id": "ev_1", "title": "Community Run" }] }
```

### POST /v2/events

201 Created:

```json
{ "id": "ev_2", "title": "Park Cleanup" }
```

400 Bad Request — validation error

401/403 — authentication/permission

Parameters: none

Request body example:

```json
{ "title": "Park Cleanup", "starts_at": "2025-11-15T10:00:00Z" }
```

### GET /v2/events/{eventId}

200 OK:

```json
{ "id": "ev_42", "title": "Community Run" }
```

404 Not Found:

```json
{ "error": { "code": "E404", "message": "Event not found" } }
```

### PATCH /v2/events/{eventId}

200 OK — updated

401/403 — auth/permission

404 Not Found

Path parameters:

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| eventId | string | Event ID    |

Body example:

```json
{ "title": "Updated Title" }
```

### DELETE /v2/events/{eventId}

204 No Content — deleted

401/403 — auth/permission

404 Not Found

Path parameters: same as PATCH.

### GET /v2/events/{eventId}/attendees

200 OK:

```json
{ "data": [{ "id": "u_123", "username": "alice" }] }
```

404 Not Found

Path parameters: same as PATCH.

### POST /v2/events/{eventId}/signup

200 OK — joined

401 Unauthorized; 404 Not Found

Path parameters: same as PATCH. Body: none.

### POST /v2/events/{eventId}/leave

200 OK — left

401 Unauthorized; 404 Not Found

Path parameters: same as PATCH. Body: none.

### GET /v2/events/current

200 OK — events for current user

401 Unauthorized

Parameters: none. Body: none.

## Notes

- Attendees endpoint returns an array of user references.
- Signup/leave endpoints typically return 200 on success (or 404 if event/user invalid).

## Error Format

```json
{ "error": { "code": "E404", "message": "Not found" } }
```
