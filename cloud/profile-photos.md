---
title: Cloud Profile Photos
---

## Profile Photos

Generate photorealistic profile images using prompt engineering and an image model, cached via CDN/R2.

### Flow

User -> generate prompt -> call image model -> store -> return URL -> CDN caches

### Endpoints

- GET /users/profile_photo/:id (generate or return cached)
- DELETE /users/profile_photo/:id (invalidate & regenerate)

### Request/Response

200 OK:

```json
{ "url": "https://cdn.earth-app.com/u/u_123.jpg" }
```

### Errors

- 401 Unauthorized
- 429 Too Many Requests
