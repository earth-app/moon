# Mantle2 Prompts Endpoints

Prompt catalogue and user responses. Path parameter names: `prompt`, `response`.

## Catalogue & Management

- GET /v2/prompts — list prompts
- POST /v2/prompts — create prompt
- GET /v2/prompts/random — random prompts
- GET /v2/prompts/{prompt} — retrieve prompt
- PATCH /v2/prompts/{prompt} — update prompt
- DELETE /v2/prompts/{prompt} — delete prompt
- POST /v2/prompts/check_expired — admin task to check expired prompts

## Responses to Prompts

- GET /v2/prompts/{prompt}/responses — list responses for a prompt
- POST /v2/prompts/{prompt}/responses — create response
- GET /v2/prompts/{prompt}/responses/{response} — get single response
- PATCH /v2/prompts/{prompt}/responses/{response} — update response
- DELETE /v2/prompts/{prompt}/responses/{response} — delete response

## Endpoints and Responses

### GET /v2/prompts

200 OK:

```json
{ "data": [{ "id": "p_1", "topic": "Daily Reflection" }] }
```

### POST /v2/prompts

201 Created:

```json
{ "id": "p_2", "topic": "Gratitude" }
```

400 Bad Request; 401/403

Parameters: none

Request body example:

```json
{ "topic": "Gratitude" }
```

### GET /v2/prompts/random

200 OK:

```json
{ "data": [{ "id": "p_7", "topic": "Mindfulness" }] }
```

### GET /v2/prompts/{prompt}

200 OK:

```json
{ "id": "p_1", "topic": "Daily Reflection" }
```

404 Not Found

Path parameters:

| Name   | Type   | Description       |
| ------ | ------ | ----------------- |
| prompt | string | Prompt identifier |

### PATCH /v2/prompts/{prompt}

200 OK — updated; 401/403; 404

Path parameters: same as GET.

Body example:

```json
{ "topic": "Updated Topic" }
```

### DELETE /v2/prompts/{prompt}

204 No Content — deleted; 401/403; 404

Path parameters: same as GET. Body: none.

### POST /v2/prompts/check_expired

204 No Content — processed; 401/403

Parameters: none. Body: none.

### GET /v2/prompts/{prompt}/responses

200 OK:

```json
{ "data": [{ "id": "r_1", "prompt_id": "p_1", "response": "Today I..." }] }
```

404 Not Found

Path parameters: same as prompt GET.

### POST /v2/prompts/{prompt}/responses

Request body:

```json
{ "response": "Today I...", "visibility": "private" }
```

201 Created:

```json
{ "id": "r_99", "prompt_id": "p_1", "response": "Today I..." }
```

400 Bad Request; 401/403; 404

Path parameters: same as prompt GET.

### GET /v2/prompts/{prompt}/responses/{response}

200 OK — single response

404 Not Found

Path parameters:

| Name     | Type   | Description         |
| -------- | ------ | ------------------- |
| prompt   | string | Prompt identifier   |
| response | string | Response identifier |

### PATCH /v2/prompts/{prompt}/responses/{response}

200 OK — updated

400 Bad Request; 401/403; 404

Path parameters: same as GET response.

Body example:

```json
{ "response": "Edited response text" }
```

### DELETE /v2/prompts/{prompt}/responses/{response}

204 No Content — deleted

401/403; 404

Path parameters: same as GET response. Body: none.

## Error Format

```json
{ "error": { "code": "E404", "message": "Not found" } }
```

```json
{ "error": { "code": "E404", "message": "Prompt not found" } }
```
