---
title: "Mantle2 Overview"
description: "Primary Drupal-based API backend for The Earth App"
sidebarDepth: 2
lastUpdated: true
---

# Mantle2 - Primary API Backend

::: tip ACTIVE DEVELOPMENT
**Mantle2 is the primary operational API** for The Earth App. All new backend development happens here.
:::

## Overview

Mantle2 is a Drupal custom module that serves as the main API backend, providing rapid development capabilities through the extensive Drupal ecosystem while integrating seamlessly with Cloud for AI-powered features.

```mermaid
graph TB
    Crust[Crust Frontend] --> Mantle2[Mantle2 Drupal Module]
    Mantle2 --> Cloud[Cloud AI Worker]
    
    Mantle2 --> Drupal[Drupal Core]
    Drupal --> MySQL[(MySQL Database)]
    Drupal --> Files[(File System)]
    
    Mantle2 --> Modules[Community Modules]
    Modules --> Users[User Management]
    Modules --> Content[Content Types]
    Modules --> API[REST/JSON:API]
    Modules --> Workflow[Workflows]
    
    Cloud --> R2[(Cloudflare R2)]
    Cloud --> KV[(Cloudflare KV)]
    Cloud --> AI[AI Providers]
    
    style Mantle2 fill:#4caf50
    style Cloud fill:#f3e5f5
    style Drupal fill:#c8e6c9
```

## Key Features

### 🚀 Rapid Development
- **5-10x faster** feature development compared to custom solutions
- **Pre-built modules** for user management, content types, and workflows
- **Built-in admin interface** eliminates custom dashboard development
- **Established patterns** for API development and security

### 🔧 Drupal Ecosystem Benefits
- **45,000+ modules** available for extension
- **Security updates** from the Drupal security team
- **Community support** from thousands of contributors
- **Best practices** well-documented and battle-tested

### 🔗 Hybrid API Integration
- **Seamless integration** with Cloud for AI operations
- **Orchestration layer** for complex multi-service workflows
- **State management** for all business data and user information
- **Error handling** and retry logic for external service calls

---

## Architecture

### Technology Stack
- **Platform:** Drupal 10.x
- **Language:** PHP 8.1+
- **Framework:** Symfony components
- **Database:** MySQL 8.0+ / PostgreSQL 13+
- **Cache:** Redis (optional)
- **Storage:** Local files + Cloudflare R2 integration
- **API:** REST + JSON:API + Custom endpoints

### Module Structure
```
mantle2/
├── mantle2.info.yml           # Module definition
├── mantle2.module             # Hook implementations
├── mantle2.routing.yml        # Route definitions
├── mantle2.services.yml       # Service definitions
├── config/                    # Configuration schemas
├── src/
│   ├── Controller/           # API controllers
│   ├── Entity/              # Custom entities
│   ├── Plugin/              # Plugin implementations
│   ├── Service/             # Business logic services
│   └── EventSubscriber/     # Event listeners
├── templates/               # Twig templates (if needed)
└── tests/                   # PHPUnit tests
```

### Integration Points

#### With Cloud (AI Worker)
```php
<?php
// Example: Content generation integration
class ContentGenerationService {
  
  public function generateContent($prompt, $type = 'article') {
    $cloud_url = $this->configFactory
      ->get('mantle2.settings')
      ->get('cloud_api_url');
    
    $response = $this->httpClient->post($cloud_url . '/ai/generate', [
      'json' => [
        'prompt' => $prompt,
        'type' => $type,
        'options' => $this->getGenerationOptions()
      ],
      'headers' => [
        'Authorization' => 'Bearer ' . $this->getCloudApiKey(),
        'Content-Type' => 'application/json'
      ]
    ]);
    
    return json_decode($response->getBody(), TRUE);
  }
}
```

#### With Drupal Core
```php
<?php
// Example: Content entity integration
class ContentController extends ControllerBase {
  
  public function createContent(Request $request) {
    $data = json_decode($request->getContent(), TRUE);
    
    // Create Drupal entity
    $node = Node::create([
      'type' => $data['type'],
      'title' => $data['title'],
      'body' => $data['content'],
      'field_ai_generated' => $data['ai_generated'] ?? FALSE,
    ]);
    
    $node->save();
    
    return new JsonResponse([
      'id' => $node->uuid(),
      'status' => 'created'
    ]);
  }
}
```

---

## API Reference

### Authentication

Mantle2 uses Drupal's built-in authentication system with JWT token support.

#### POST /user/login
**Description:** User authentication

**Request:**
```bash
curl -X POST "{{API_BASE_URL}}/user/login?_format=json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "username",
    "pass": "password"
  }'
```

**Response:**
```json
{
  "current_user": {
    "uid": "123",
    "roles": ["authenticated"],
    "name": "username"
  },
  "csrf_token": "token_here",
  "logout_token": "logout_token_here"
}
```

**Node.js Example:**
```javascript
const response = await fetch(`${API_BASE_URL}/user/login?_format=json`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'username', pass: 'password' })
});
const data = await response.json();
```

**Python Example:**
```python
import requests

response = requests.post(
    f"{API_BASE_URL}/user/login",
    params={"_format": "json"},
    json={"name": "username", "pass": "password"}
)
data = response.json()
```

**Java Example:**
```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(API_BASE_URL + "/user/login?_format=json"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\"name\":\"username\",\"pass\":\"password\"}"
    ))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
```

### Content Management

#### GET /jsonapi/node/article
**Description:** List articles using JSON:API

**Request:**
```bash
curl -X GET "{{API_BASE_URL}}/jsonapi/node/article" \
  -H "Accept: application/vnd.api+json" \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "jsonapi": { "version": "1.0" },
  "data": [
    {
      "type": "node--article",
      "id": "uuid-here",
      "attributes": {
        "title": "Example Article",
        "body": {
          "value": "Article content...",
          "format": "basic_html"
        },
        "created": "2025-09-29T12:34:56+00:00"
      },
      "relationships": {
        "uid": {
          "data": { "type": "user--user", "id": "author-uuid" }
        }
      }
    }
  ],
  "meta": { "count": 1 }
}
```

**Node.js (Axios) Example:**
```javascript
const axios = require('axios');

const response = await axios.get(`${API_BASE_URL}/jsonapi/node/article`, {
  headers: {
    'Accept': 'application/vnd.api+json',
    'Authorization': `Bearer ${token}`
  }
});
console.log(response.data);
```

#### POST /jsonapi/node/article
**Description:** Create new article

**Request:**
```bash
curl -X POST "{{API_BASE_URL}}/jsonapi/node/article" \
  -H "Content-Type: application/vnd.api+json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "data": {
      "type": "node--article",
      "attributes": {
        "title": "New Article",
        "body": {
          "value": "Article content...",
          "format": "basic_html"
        }
      }
    }
  }'
```

**Response:**
```json
{
  "jsonapi": { "version": "1.0" },
  "data": {
    "type": "node--article",
    "id": "new-uuid",
    "attributes": {
      "title": "New Article",
      "body": {
        "value": "Article content...",
        "format": "basic_html"
      },
      "created": "2025-09-29T12:34:56+00:00",
      "status": true
    }
  }
}
```

### Custom API Endpoints

#### POST /api/mantle2/content/generate
**Description:** Generate content using AI integration

**Request:**
```bash
curl -X POST "{{API_BASE_URL}}/api/mantle2/content/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "prompt": "Write about sustainable technology",
    "type": "article",
    "options": {
      "max_words": 500,
      "tone": "professional"
    }
  }'
```

**Response:**
```json
{
  "id": "content_uuid",
  "title": "Sustainable Technology: A Path Forward",
  "content": "Generated content...",
  "metadata": {
    "word_count": 487,
    "generation_time": 2.3,
    "ai_model": "gpt-4"
  },
  "status": "draft",
  "created_at": "2025-09-29T12:34:56Z"
}
```

**Node.js (Fetch) Example:**
```javascript
const response = await fetch(`${API_BASE_URL}/api/mantle2/content/generate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    prompt: 'Write about sustainable technology',
    type: 'article',
    options: { max_words: 500, tone: 'professional' }
  })
});
const result = await response.json();
```

**Python (Requests) Example:**
```python
import requests

response = requests.post(
    f"{API_BASE_URL}/api/mantle2/content/generate",
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    },
    json={
        "prompt": "Write about sustainable technology",
        "type": "article",
        "options": {"max_words": 500, "tone": "professional"}
    }
)
data = response.json()
```

#### GET /api/mantle2/content/{id}/enhance
**Description:** Enhance existing content with AI

**Request:**
```bash
curl -X GET "{{API_BASE_URL}}/api/mantle2/content/content_uuid/enhance" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "original_id": "content_uuid",
  "enhanced_content": "Enhanced version...",
  "improvements": [
    "Added compelling introduction",
    "Improved readability",
    "Added relevant examples"
  ],
  "enhancement_time": 1.8
}
```

### File Management

#### POST /jsonapi/file/file
**Description:** Upload file

**Request:**
```bash
curl -X POST "{{API_BASE_URL}}/jsonapi/file/file" \
  -H "Content-Type: application/octet-stream" \
  -H "Content-Disposition: attachment; filename=\"example.jpg\"" \
  -H "Authorization: Bearer <token>" \
  --data-binary @example.jpg
```

**Response:**
```json
{
  "jsonapi": { "version": "1.0" },
  "data": {
    "type": "file--file",
    "id": "file-uuid",
    "attributes": {
      "filename": "example.jpg",
      "uri": "public://2025-09/example.jpg",
      "filesize": 102400,
      "status": true,
      "created": "2025-09-29T12:34:56+00:00"
    }
  }
}
```

---

## Hybrid API Integration

### Content Generation Flow

```mermaid
sequenceDiagram
    participant C as Crust Frontend
    participant M2 as Mantle2
    participant Cloud as Cloud Worker
    participant AI as AI Provider
    participant DB as Drupal DB

    C->>M2: POST /api/mantle2/content/generate
    Note over M2: Validate request & user permissions
    M2->>Cloud: POST /ai/generate
    Cloud->>AI: Generate content
    AI-->>Cloud: Generated content
    Cloud-->>M2: Return content + metadata
    M2->>DB: Save content as Drupal entity
    M2-->>C: Return created content with ID
```

### Integration Code Examples

**Mantle2 Service calling Cloud:**
```php
<?php
namespace Drupal\mantle2\Service;

use GuzzleHttp\ClientInterface;
use Drupal\Core\Config\ConfigFactoryInterface;

class CloudIntegrationService {
  
  public function __construct(
    ClientInterface $http_client,
    ConfigFactoryInterface $config_factory
  ) {
    $this->httpClient = $http_client;
    $this->config = $config_factory->get('mantle2.settings');
  }
  
  public function generateContent(array $parameters) {
    $cloud_endpoint = $this->config->get('cloud_api_url') . '/ai/generate';
    
    try {
      $response = $this->httpClient->post($cloud_endpoint, [
        'json' => $parameters,
        'headers' => [
          'Authorization' => 'Bearer ' . $this->config->get('cloud_api_key'),
          'Content-Type' => 'application/json'
        ],
        'timeout' => 30
      ]);
      
      return json_decode($response->getBody(), TRUE);
      
    } catch (\Exception $e) {
      \Drupal::logger('mantle2')->error('Cloud API error: @error', [
        '@error' => $e->getMessage()
      ]);
      throw $e;
    }
  }
  
  public function enhanceContent($content_id, array $options = []) {
    // Load content from Drupal
    $node = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->load($content_id);
      
    if (!$node) {
      throw new \InvalidArgumentException('Content not found');
    }
    
    // Prepare enhancement request
    $enhancement_data = [
      'content' => $node->body->value,
      'title' => $node->getTitle(),
      'type' => $node->getType(),
      'options' => $options
    ];
    
    return $this->callCloudEndpoint('/ai/enhance', $enhancement_data);
  }
  
  private function callCloudEndpoint($endpoint, array $data) {
    $url = $this->config->get('cloud_api_url') . $endpoint;
    
    $response = $this->httpClient->post($url, [
      'json' => $data,
      'headers' => [
        'Authorization' => 'Bearer ' . $this->config->get('cloud_api_key')
      ]
    ]);
    
    return json_decode($response->getBody(), TRUE);
  }
}
```

### Error Handling Strategy

```php
<?php
// Robust error handling for hybrid operations
class HybridApiController extends ControllerBase {
  
  public function generateWithFallback(Request $request) {
    try {
      // Primary: Use Cloud AI generation
      $result = $this->cloudService->generateContent($request_data);
      
    } catch (CloudServiceException $e) {
      // Fallback: Use cached templates or manual processing
      \Drupal::logger('mantle2')->warning('Cloud service unavailable, using fallback');
      $result = $this->fallbackService->generateContent($request_data);
      
    } catch (\Exception $e) {
      // Error: Return appropriate error response
      return new JsonResponse([
        'error' => 'Content generation failed',
        'message' => 'Please try again later'
      ], 500);
    }
    
    return new JsonResponse($result);
  }
}
```

---

## Development

### Local Setup

#### Prerequisites
- PHP 8.1+
- Composer
- MySQL 8.0+ or PostgreSQL 13+
- Docker (recommended)

#### Quick Start with Lando
```bash
# Clone repository
git clone https://github.com/earth-app/mantle2.git
cd mantle2

# Start Lando environment
lando start

# Install Drupal
lando composer install
lando drush site:install --db-url=mysql://drupal10:drupal10@database/drupal10

# Enable mantle2 module
lando drush en mantle2 -y

# Import configuration
lando drush config:import -y

# Access site: https://mantle2.lndo.site
```

#### Alternative: DDEV Setup
```bash
# Initialize DDEV
ddev config --project-type=drupal10 --docroot=web
ddev start

# Install dependencies
ddev composer install

# Install Drupal
ddev drush site:install

# Enable module
ddev drush en mantle2 -y
```

### Development Workflow

#### 1. Creating New API Endpoints
```bash
# Generate controller
lando drush generate controller \
  --class=ExampleController \
  --module=mantle2

# Generate service
lando drush generate service \
  --class=ExampleService \
  --module=mantle2
```

#### 2. Database Migrations
```bash
# Create migration
lando drush generate migration \
  --migration-id=example_migration \
  --module=mantle2

# Run migration
lando drush migrate:import example_migration

# Rollback migration
lando drush migrate:rollback example_migration
```

#### 3. Testing
```bash
# Run unit tests
lando phpunit modules/custom/mantle2/tests/src/Unit/

# Run functional tests
lando phpunit modules/custom/mantle2/tests/src/Functional/

# Run kernel tests
lando phpunit modules/custom/mantle2/tests/src/Kernel/
```

### Configuration Management

#### Environment Configuration
```yaml
# config/mantle2.settings.yml
cloud_api_url: 'https://cloud.earth-app.example'
cloud_api_key: !env CLOUD_API_KEY
max_generation_time: 30
fallback_enabled: true
cache_ttl: 3600
```

#### Service Definitions
```yaml
# mantle2.services.yml
services:
  mantle2.cloud_integration:
    class: Drupal\mantle2\Service\CloudIntegrationService
    arguments: ['@http_client', '@config.factory']
    
  mantle2.content_generator:
    class: Drupal\mantle2\Service\ContentGeneratorService
    arguments: ['@mantle2.cloud_integration', '@entity_type.manager']
```

---

## Performance & Optimization

### Caching Strategy
- **Entity cache:** Drupal's built-in entity caching
- **API responses:** Custom cache tags for API endpoints
- **Cloud responses:** Cache AI generation results for repeated requests
- **Redis integration:** Optional Redis cache backend for high-traffic sites

### Database Optimization
```php
<?php
// Example: Optimized content query
$query = \Drupal::entityQuery('node')
  ->condition('type', 'article')
  ->condition('status', 1)
  ->sort('created', 'DESC')
  ->range(0, 20)
  ->addTag('node_access');  // Adds proper access checks

$nids = $query->execute();
$nodes = \Drupal::entityTypeManager()
  ->getStorage('node')
  ->loadMultiple($nids);
```

### Monitoring & Observability
```php
<?php
// Example: Performance monitoring
class PerformanceSubscriber implements EventSubscriberInterface {
  
  public function onRequest(RequestEvent $event) {
    $request = $event->getRequest();
    $start_time = microtime(TRUE);
    
    // Store start time for later measurement
    $request->attributes->set('request_start_time', $start_time);
  }
  
  public function onResponse(ResponseEvent $event) {
    $request = $event->getRequest();
    $start_time = $request->attributes->get('request_start_time');
    
    if ($start_time) {
      $duration = microtime(TRUE) - $start_time;
      
      // Log slow requests
      if ($duration > 2.0) {
        \Drupal::logger('mantle2_performance')->warning(
          'Slow request: @path took @duration seconds',
          ['@path' => $request->getPathInfo(), '@duration' => $duration]
        );
      }
    }
  }
}
```

---

## Security

### Authentication & Authorization
- **Drupal permissions:** Fine-grained permission system
- **Role-based access:** User roles with specific capabilities
- **JWT tokens:** Optional JWT authentication for API clients
- **CSRF protection:** Built-in CSRF token validation

### API Security
```php
<?php
// Example: API endpoint with proper validation
class SecureApiController extends ControllerBase {
  
  public function createContent(Request $request) {
    // Validate content type
    if (!$request->headers->get('Content-Type') === 'application/json') {
      return new JsonResponse(['error' => 'Invalid content type'], 400);
    }
    
    // Validate user permissions
    if (!$this->currentUser()->hasPermission('create article content')) {
      return new JsonResponse(['error' => 'Access denied'], 403);
    }
    
    // Validate input data
    $data = json_decode($request->getContent(), TRUE);
    if (empty($data['title']) || empty($data['content'])) {
      return new JsonResponse(['error' => 'Missing required fields'], 400);
    }
    
    // Sanitize input
    $title = Html::escape($data['title']);
    $content = Xss::filter($data['content']);
    
    // Process request...
  }
}
```

### Cloud Integration Security
- **API key rotation:** Regular rotation of service-to-service keys
- **Request signing:** Optional request signing for additional security
- **Rate limiting:** Protection against abuse and DoS attacks
- **Input validation:** Strict validation of all data sent to Cloud

---

## Deployment

### Production Deployment
```bash
# Build production assets
composer install --no-dev --optimize-autoloader

# Database updates
drush updatedb -y

# Configuration import
drush config:import -y

# Clear caches
drush cache:rebuild

# Enable production modules
drush en memcache redis -y
drush dis devel webprofiler -y
```

### Environment Configuration
```yaml
# docker-compose.production.yml
version: '3.8'
services:
  web:
    image: drupal:10-apache
    volumes:
      - ./:/opt/drupal
    environment:
      DRUPAL_DB_HOST: mysql
      DRUPAL_DB_NAME: mantle2_prod
      CLOUD_API_KEY: ${CLOUD_API_KEY}
      CLOUD_API_URL: https://cloud.earth-app.example
      
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: mantle2_prod
```

### Monitoring Setup
- **Application Performance Monitoring:** New Relic or similar
- **Error tracking:** Sentry or Drupal's built-in logging
- **Uptime monitoring:** External monitoring service
- **Database monitoring:** Query performance and slow query logs

---

## TODO: Implementation Details

This documentation requires deeper analysis of the actual mantle2 repository:

### Required Investigation:
1. **Actual module structure** in mantle2 repository
2. **Existing API endpoints** and their implementations
3. **Cloud integration patterns** and service classes
4. **Database schema** and content types
5. **Configuration management** and environment setup

### Files to Analyze:
```bash
# Clone and examine the actual repository
git clone https://github.com/earth-app/mantle2
cd mantle2

# Examine module structure
find . -name "*.info.yml" -o -name "*.routing.yml" -o -name "*.services.yml"

# Find controllers and services
find ./src -name "*Controller.php" -o -name "*Service.php"

# Check for Cloud integration
grep -r "cloud\|http" src/
```

---

## Support & Resources

### Documentation
- **Drupal API:** https://api.drupal.org/
- **JSON:API:** https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module
- **REST API:** https://www.drupal.org/docs/core-modules-and-themes/core-modules/rest

### Community
- **Repository:** https://github.com/earth-app/mantle2
- **Issues:** Report bugs and feature requests
- **Discussions:** General questions and community support
- **Maintainer:** [@gmitch215](https://github.com/gmitch215)

### Getting Help
- **Development Questions:** File issues in the repository
- **Security Issues:** Email security@earth-app.example (TODO: Add real email)
- **Integration Help:** See [Hybrid API documentation](/docs/hybrid-api)
- **Migration from Mantle:** See [Migration Guide](/docs/mantle-vs-mantle2)