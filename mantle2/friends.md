# Mantle2 Friends Endpoints

Friendship management is user-scoped. Endpoints exist for user by ID, by username, and for the current user. Paths do not include a friend ID segment; instead, PUT/DELETE accept a body with the target user.

## By ID — /v2/users/{id}/friends

### GET /v2/users/{id}/friends

Path parameters:

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | User ID     |

Responses:

- 200 OK

```json
{ "data": [{ "id": "u_456", "username": "bob" }] }
```

### PUT /v2/users/{id}/friends

Add a friend.

Path parameters: same as GET.

Request body example:

```json
{ "friend": "u_456" }
```

Responses: 200 OK; 400/401/403/404/409

### DELETE /v2/users/{id}/friends

Remove a friend.

Path parameters: same as GET.

Request body example:

```json
{ "friend": "u_456" }
```

Responses: 200 OK; 400/401/403/404/409

## By Username — /v2/users/{username}/friends

Mirrors ID-based routes using `username` path parameter instead of `id`.

### GET /v2/users/{username}/friends — 200 OK; 400/404

### PUT /v2/users/{username}/friends — 200; 400/401/403/404/409

### DELETE /v2/users/{username}/friends — 200; 400/401/403/404/409

Body for PUT/DELETE:

```json
{ "friend": "u_456" }
```

## Current User — /v2/users/current/friends

### GET /v2/users/current/friends — 200 OK; 401/404

### PUT /v2/users/current/friends — 200; 400/401/403/404/409

### DELETE /v2/users/current/friends — 200; 400/401/403/404/409

Body for PUT/DELETE:

```json
{ "friend": "u_456" }
```
