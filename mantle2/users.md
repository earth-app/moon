# Mantle2 Users Endpoints

User identity, authentication, profiles, privacy, account type, relationships, and per-user resources.

Authentication: Basic (session) or Bearer (JWT). Write operations generally require authentication (401) and may enforce permissions (403).

## List Users — GET /v2/users

Retrieve users with pagination and optional search/sort.

Query parameters:

| Name   | Type   | Description           |
| ------ | ------ | --------------------- |
| limit  | int    | Page size             |
| page   | int    | Page index            |
| search | string | Free-text user search |
| sort   | string | Sort expression       |

### Responses

200 OK:

```json
{
	"data": [{ "id": "u_123", "username": "alice" }],
	"pagination": { "page": 1, "limit": 20, "total": 1 }
}
```

400 Bad Request — invalid query

401 Unauthorized — authentication required

## Authentication Endpoints

### POST /v2/users/login

Request body example:

```json
{ "username": "alice", "password": "secret" }
```

200 OK — returns session/JWT and user profile
400 Bad Request — malformed credentials
401 Unauthorized — invalid credentials

### POST /v2/users/logout

Request body: none

200 OK — session terminated
401 Unauthorized — not logged in

### POST /v2/users/create

Request body example:

```json
{ "username": "alice", "email": "alice@example.com", "password": "secret" }
```

201 Created — new user resource
400 Bad Request — validation errors

### POST /v2/users/reset_password

Request body example:

```json
{ "email": "alice@example.com" }
```

204 No Content — email sent if eligible
400 Bad Request — invalid email
429 Too Many Requests — throttled

## Users by ID — /v2/users/{id}

### GET /v2/users/{id}

Path parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | User ID     |

200 OK — user payload
404 Not Found

### PATCH /v2/users/{id}

Path parameters: same as GET.

Request body example:

```json
{ "username": "newname" }
```

200 OK — updated user
401 Unauthorized
403 Forbidden
404 Not Found

### DELETE /v2/users/{id}

Path parameters: same as GET. Body: none.

204 No Content
401 Unauthorized
403 Forbidden
404 Not Found

### PATCH /v2/users/{id}/field_privacy

Path parameters: same as GET.

200 OK — updated privacy
401 Unauthorized
403 Forbidden
404 Not Found

Body example:

```json
{ "profile": { "show_location": false, "show_events": true } }
```

### GET /v2/users/{id}/profile_photo

Path parameters: same as GET. Body: none.

200 OK (image/binary)
404 Not Found

### PUT /v2/users/{id}/profile_photo

Path parameters: same as GET.

Request body: binary image upload (e.g., multipart/form-data)

200 OK — updated photo
401 Unauthorized
403 Forbidden
404 Not Found

### PUT /v2/users/{id}/account_type

Path parameters: same as GET.

Request body example:

```json
{ "account_type": "pro" }
```

200 OK — updated account type
401 Unauthorized
403 Forbidden
404 Not Found

### Activities — /v2/users/{id}/activities

Path parameters: same as GET.

GET: 200 OK list; 404 Not Found
PATCH (replace list): 200 OK; 401/403/404
PUT (add one): 200 OK; 401/403/404; 409 Conflict (duplicate)
DELETE (remove one): 200 OK; 401/403/404
Recommend: GET /v2/users/{id}/activities/recommend -> 200 OK or 404 Not Found

Request bodies (examples):

- PATCH: `{ "activities": ["a_1", "a_2"] }`
- PUT: `{ "activity": "a_3" }`
- DELETE: `{ "activity": "a_1" }`

### Friends — /v2/users/{id}/friends

Path parameters: same as GET.

GET: 200 OK; 400 Bad Request; 404 Not Found
PUT: 200 OK; 400/401/403/404/409
DELETE: 200 OK; 400/401/403/404/409

Request bodies (examples):

- PUT: `{ "friend": "u_456" }`
- DELETE: `{ "friend": "u_456" }`

### Circle — /v2/users/{id}/circle

Path parameters: same as GET.

GET: 200 OK; 400; 404
PUT: 200 OK; 400/401/403/404/409
DELETE: 200 OK; 400/401/403/404/409

Request bodies (examples):

- PUT: `{ "user": "u_789" }`
- DELETE: `{ "user": "u_789" }`

### Email Verification

Path parameters: same as GET.

POST /v2/users/{id}/send_email_verification -> 200 OK; 400/401/403/404/409
POST /v2/users/{id}/verify_email -> 200 OK; 400/401/403/404/409

Request body example (verify_email):

```json
{ "code": "12345678" }
```

### Change Password — POST /v2/users/{id}/change_password

200 OK; 400/401/403/404
Body includes either reset token or current password + new password.

Path parameters: same as GET.

Request body examples:

- Using reset token: `{ "token": "abcd", "new_password": "s3cret!" }`
- Using current password: `{ "current_password": "old", "new_password": "new" }`

## Users by Username — /v2/users/{username}

All ID-based operations mirrored with `{username}` instead of `{id}` (same status codes):
GET / PATCH / DELETE user
field_privacy / profile_photo / account_type
Activities CRUD + recommend
Friends CRUD
Circle CRUD
send_email_verification / verify_email / change_password

Path parameters:

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| username | string | Username    |

## Current User — /v2/users/current

Targets the logged-in user via session/JWT.

### GET /v2/users/current

200 OK; 401 Unauthorized; 404 Not Found

### PATCH /v2/users/current

200 OK; 400 Bad Request; 404 Not Found

Request body: same shape as PATCH by ID.

### DELETE /v2/users/current

204 No Content; 401 Unauthorized

### PATCH /v2/users/current/field_privacy

200 OK; 401/404

Body: same as ID variant.

### GET /v2/users/current/profile_photo

200 OK or 404 Not Found if missing

### PUT /v2/users/current/profile_photo

200 OK; 401/404

Body: binary image upload.

### PUT /v2/users/current/account_type

200 OK; 401/403/404

Body: `{ "account_type": "pro" }`

### Activities — /v2/users/current/activities (+ recommend)

Same responses as ID-based.

### Friends & Circle — /v2/users/current/friends, /v2/users/current/circle

GET/PUT/DELETE: 200/400/401/403/404/409

Bodies:

- Friends PUT/DELETE: `{ "friend": "u_456" }`
- Circle PUT/DELETE: `{ "user": "u_789" }`

### Email Verification & Password

send_email_verification / verify_email / change_password — 200 OK (or 204), plus 400/401/409 errors.

Bodies: same as ID-based flows.

### Notifications (Current User)

See Notifications page for listing, marking read/unread, clearing.

## Errors

Standard error envelope:

```json
{ "error": { "code": "E404", "message": "User not found", "retry_after": null } }
```

Common statuses: 400 validation, 401 auth required/invalid, 403 forbidden, 404 not found, 409 conflict, 429 rate-limited.
