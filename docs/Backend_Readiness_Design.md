# Backend Readiness Design

Date: 2026-05-22

Status: Design only. No backend, database, auth, deployment, or external service is implemented by this document.

## Purpose

Prepare Civic Issue Reporter for a future backend phase while preserving the current local-first prototype boundary.

The current app is intentionally browser-local. A backend should be added only after product-owner decisions are made for identity, privacy, official records, staff ownership, maps, and photo evidence.

## Current Local Boundary

The browser app currently owns:

- issue creation
- issue list rendering
- local status, priority, assignment, duplicate review, and activity events
- manual ward, landmark, and optional coordinate fields
- local JSON summary export
- full local backup and restore
- no backend persistence
- no account identity
- no official audit log

## Proposed Backend Responsibilities

A future backend should own:

- durable issue persistence
- server-side validation
- report identifiers
- status and assignment history
- role-scoped access
- official audit events, if approved
- export generation, if exports become official records
- attachment metadata and storage policy, if photo evidence is approved
- map provider integration boundaries, if maps are approved

The frontend should remain responsible for:

- form presentation
- client-side helper validation
- dashboard presentation
- accessible controls
- optimistic UI only if rollback/error behavior is defined

## Data Ownership Model

### Issue

Recommended fields:

- id
- publicReference
- title
- category
- description
- status
- priority
- locationText
- ward
- landmark
- coordinates
- assignedTeamId
- createdAt
- updatedAt
- createdByIdentityId
- reporterVisibility
- sourceChannel

### Activity Event

Recommended fields:

- id
- issueId
- eventType
- fromValue
- toValue
- note
- actorIdentityId
- actorRole
- createdAt

Activity events should be append-only if used as an official audit trail.

### Duplicate Review

Recommended fields:

- id
- issueId
- duplicateIssueId
- score
- reviewStatus
- reviewedByIdentityId
- reviewedAt

### Team

Recommended fields:

- id
- name
- categoryScope
- wardScope
- active

### Attachment, If Approved Later

Recommended fields:

- id
- issueId
- fileName
- mimeType
- sizeBytes
- storageKey
- redactionStatus
- visibility
- uploadedByIdentityId
- uploadedAt
- retentionExpiresAt

Do not add this until photo evidence policy is approved.

## Identity And Auth Assumptions

No auth model is approved yet.

Future options:

- anonymous citizen reporting
- contact-optional reporting
- account-based citizen reporting
- staff-only authenticated dashboard
- role-based municipal admin access

Recommended minimum before implementation:

- citizens can submit without exposing public personal data
- staff dashboard requires authenticated staff identity
- team assignment should not imply individual responsibility unless staff identity policy is approved
- audit events should record actor identity only after the identity model is approved

## API Boundary Draft

Use stable JSON responses. Exact framework is undecided.

### Issues

- `GET /api/issues`
- `POST /api/issues`
- `GET /api/issues/{issueId}`
- `PATCH /api/issues/{issueId}`

### Activity

- `GET /api/issues/{issueId}/activity`

Activity creation should usually happen server-side as a side effect of status, priority, assignment, and duplicate-review changes.

### Duplicate Review

- `PATCH /api/issues/{issueId}/duplicates/{duplicateIssueId}`

### Teams

- `GET /api/teams`

### Exports

- `GET /api/exports/summary`

Only add official export endpoints after export record policy is approved.

## Validation Rules

Server-side validation should enforce:

- required title, category, location, and description
- category allow-list
- status allow-list
- priority allow-list
- coordinate latitude between `-90` and `90`
- coordinate longitude between `-180` and `180`
- description length limit
- allowed assignment team
- duplicate review status allow-list
- attachment rules, if approved later

Client validation can remain helpful but must not be trusted as the only boundary.

## Audit Design

Current local activity events are not official audit logs.

If official audit is approved:

- store append-only activity records
- write activity records server-side
- include actor identity and role
- do not allow client-supplied audit timestamps as authoritative
- expose audit history only to authorized staff unless public visibility is approved
- record export generation separately if exports become official records

## Privacy Design

Open decisions before backend implementation:

- citizen identity policy
- whether reporter contact is allowed or required
- precise coordinate handling
- public visibility of issue location
- photo evidence content, redaction, and retention
- export retention and official-record language

Recommended defaults:

- minimize personal data
- avoid public reporter identity
- store precise coordinates only when necessary
- show approximate public location unless precise location is approved
- keep photo evidence disabled until policy is approved

## Storage Options

No storage option is approved yet.

Reasonable future candidates:

- SQLite for single-instance prototype
- PostgreSQL for production-like municipal deployment
- object storage for approved attachments

Do not choose or implement storage until backend implementation is explicitly approved.

## Migration Path From Local Prototype

Recommended staged path:

1. Keep current local prototype as demo mode.
2. Add backend design acceptance review.
3. Choose identity model.
4. Choose database and hosting model.
5. Create backend skeleton ticket.
6. Add issue create/list endpoints.
7. Add staff update endpoints.
8. Add server-side activity event generation.
9. Add migration/import path only if local demo data must be preserved.

## Risks

- Privacy risk if citizen identity or precise location is exposed.
- Audit risk if client-side events are treated as official history.
- Operational risk if exports are treated as municipal records without retention policy.
- Abuse risk if anonymous reporting has no moderation or rate limit.
- Storage risk if photo evidence is added before redaction and retention policy.

## Human Review Triggers

Stop before implementation if work involves:

- auth or staff identity
- database schema
- deployment
- external map provider
- file upload or storage
- official audit logging
- official municipal record exports
- secrets, credentials, or paid services

## Recommended Follow-Up Tickets

- T0022 - Backend Architecture Decision Record
- T0023 - Citizen Identity Policy Decision
- T0024 - Staff Role And Permission Model
- T0024 - Database Selection And Schema Draft
- T0025 - API Contract And Error Shape
- T0026 - Audit Log Policy
- T0027 - Map And Location Privacy Decision
- T0028 - Photo Evidence Policy Decision
