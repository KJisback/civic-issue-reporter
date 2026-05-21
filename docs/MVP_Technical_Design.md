# MVP Technical Design

## Initial Stack

T0001 uses plain HTML, CSS, and JavaScript with no package dependencies.

This avoids early dependency decisions and gives the project a working baseline. A future ticket may introduce a framework if it has clear value.

## Proposed Architecture

```text
src/
  index.html   Main app shell
  styles.css   Visual system and responsive layout
  app.js       Placeholder data rendering and UI behavior
docs/
  *.md         Product, workflow, ticket, and verification docs
```

## Data Model Draft

```text
Issue
- id
- title
- category
- description
- locationText
- ward
- landmark
- coordinates
- photo
- status
- priority
- createdAt
- updatedAt
- assignedTeam
- reporterContactOptional
```

## Status Lifecycle

```text
submitted -> triaged -> in_progress -> resolved
```

Later statuses may include duplicate, rejected, blocked, or needs_more_info.

## Future Technical Options

- Local browser storage for T0002.
- Manual map-ready location fields for T0004.
- Lightweight backend only after the workflow is proven locally.
- Map provider only after human approval for external services.
- Authentication only after a product decision on citizen/admin roles.

## Non-Goals

- No database in the first skeleton.
- No auth in the first skeleton.
- No external APIs in the first skeleton.
- No production deployment in the first skeleton.
