# Mantle2 General Endpoints

High-level service/health endpoints. No authentication or error responses are defined in the OpenAPI for these paths.

## GET /v2/hello

Summary: Say hi to mantle2 (connectivity test).

Parameters: none

Request body: none

Example 200:

```json
{ "message": "hello" }
```

## GET /v2/info

Summary: Retrieve mantle2 module information (version/build metadata).

Parameters: none

Request body: none

Example 200:

```json
{ "version": "1.0.0" }
```

### Notes

- Spec shows empty responses objects; implementation may include additional fields (commit, generated_at) but they are not guaranteed.
- Used by Cloud & Crust for lightweight readiness checks.
