# Mantle2 Notifications Endpoints

All notification routes are scoped to a user. There is no top-level `/v2/notifications` route in the provided OpenAPI.

## Per-User by ID

### GET /v2/users/{id}/notifications

Responses:

- 200 OK — list of notifications
- 401 Unauthorized
- 404 Not Found (user not found)

Example 200:

```json
{ "data": [{ "id": "n_1", "type": "article", "read": false }] }
```

Path parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | User ID     |

### GET /v2/users/{id}/notifications/{notificationId}

Responses:

- 200 OK — notification detail
- 401 Unauthorized
- 404 Not Found

Path parameters:

| Name           | Type   | Description     |
| -------------- | ------ | --------------- |
| id             | string | User ID         |
| notificationId | string | Notification ID |

### DELETE /v2/users/{id}/notifications/{notificationId}

Responses:

- 204 No Content — deleted
- 401 Unauthorized
- 404 Not Found

### POST /v2/users/{id}/notifications/mark_all_read

Responses:

- 204 No Content
- 401 Unauthorized
- 404 Not Found

### POST /v2/users/{id}/notifications/mark_all_unread

Responses:

- 204 No Content
- 401 Unauthorized
- 404 Not Found

### POST /v2/users/{id}/notifications/{notificationId}/mark_read

Responses:

- 204 No Content
- 401 Unauthorized
- 404 Not Found

### POST /v2/users/{id}/notifications/{notificationId}/mark_unread

Responses:

- 204 No Content
- 401 Unauthorized
- 404 Not Found

### DELETE /v2/users/{id}/notifications/clear

Responses:

- 204 No Content — all cleared
- 401 Unauthorized
- 404 Not Found

## Per-User by Username

All endpoints mirror ID-based responses:

### GET /v2/users/{username}/notifications

200 OK; 401; 404

Path parameters:

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| username | string | Username    |

### GET /v2/users/{username}/notifications/{notificationId}

200 OK; 401; 404

Path parameters:

| Name           | Type   | Description     |
| -------------- | ------ | --------------- |
| username       | string | Username        |
| notificationId | string | Notification ID |

### DELETE /v2/users/{username}/notifications/{notificationId}

204; 401; 404

### POST /v2/users/{username}/notifications/mark_all_read

204; 401; 404

### POST /v2/users/{username}/notifications/mark_all_unread

204; 401; 404

### POST /v2/users/{username}/notifications/{notificationId}/mark_read

204; 401; 404

### POST /v2/users/{username}/notifications/{notificationId}/mark_unread

204; 401; 404

### DELETE /v2/users/{username}/notifications/clear

204; 401; 404

## Current User

### GET /v2/users/current/notifications

200 OK; 401

### GET /v2/users/current/notifications/{notificationId}

200 OK; 401; 404

Path parameters:

| Name           | Type   | Description     |
| -------------- | ------ | --------------- |
| notificationId | string | Notification ID |

### DELETE /v2/users/current/notifications/{notificationId}

204; 401; 404

### POST /v2/users/current/notifications/mark_all_read

204; 401; 404

### POST /v2/users/current/notifications/mark_all_unread

204; 401; 404

### POST /v2/users/current/notifications/{notificationId}/mark_read

204; 401; 404

### POST /v2/users/current/notifications/{notificationId}/mark_unread

204; 401; 404

### DELETE /v2/users/current/notifications/clear

204; 401; 404

## Error Format

```json
{ "error": { "code": "E404", "message": "Notification not found" } }
```
