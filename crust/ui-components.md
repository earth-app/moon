---
title: Crust UI Components
---

## UI Components

### NavBar

- Dynamic avatar hydration
- Badge indicators (notifications)
- Responsive collapse

### InfoCard

- Color strip variant via prop
- Animated entrance on viewport

### ArticlePage

- Injects SEO citation meta tags
- Renders sanitized abstract HTML

### NotificationCard

- Visual read/unread state
- Click to mark read (PATCH)

### Footer

- External links
- User quick summary

### Principles

- Composition first; shallow props
- Keep DOM minimal for hydration speed
- Avoid expensive watchers; prefer computed
