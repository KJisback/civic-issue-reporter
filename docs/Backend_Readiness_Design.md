# Backend Readiness Design

Last updated: 2026-06-01

## Purpose

This document prepares the production architecture without implementing backend, auth, database, deployment, external map, notification, or upload services.

The current app remains a static local-first MVP. Browser `localStorage` is useful for demo workflows only and is not a secure system of record.

## Current Local Data Shape

Issue records currently include:

- `id`
- `title`
- `category`
- `location`
- `ward`
- `landmark`
- `description`
- `status`
- `priority`
- `priorityReason`
- `assignedTeam`
- `duplicateHints`
- `activityLog`
- `coordinates`
- `photo`
- `reporterContactOptional`
- `createdAt`
- `updatedAt`
- `isSample`

This shape is suitable as a draft contract for backend API design, but production storage should add server-generated identifiers, trusted timestamps, audit actor metadata, and retention policy fields.

## Future API Boundaries

Recommended resources:

- `POST /issues` creates a citizen report.
- `GET /issues` lists reports with category, status, priority, team, and date filters.
- `GET /issues/:id` returns full detail, duplicate hints, and activity history.
- `PATCH /issues/:id/status` changes workflow status.
- `PATCH /issues/:id/priority` changes staff priority.
- `PATCH /issues/:id/assignment` changes municipal team ownership.
- `PATCH /issues/:id/duplicate-hints/:hintId` records duplicate review state.
- `GET /summaries/municipal` returns aggregate counts and priority queues.
- `POST /exports` creates an official export only if policy later allows it.

## Auth And Identity Assumptions

Do not implement auth until these decisions are made:

- Whether citizen reporting is anonymous, contact-optional, or account-based.
- Whether staff identity is individual, team-only, or role-based.
- Whether public issue pages expose reporter information.
- Whether assignment changes require named staff attribution.

The local MVP intentionally uses team labels only and does not collect sensitive personal data.

## Storage Model

Recommended entities:

- `issues`: core public report fields and workflow state.
- `issue_locations`: ward, landmark, coarse location, and optional precise coordinates.
- `issue_activity`: append-only status, priority, assignment, duplicate, and moderation events.
- `duplicate_hints`: candidate links and review state.
- `attachments`: metadata only until upload storage, retention, malware scanning, and privacy rules are approved.
- `exports`: generated export metadata if official exports are approved.

Activity history should be append-only. Corrections should be new events, not destructive edits.

## Privacy And Retention Gates

Human approval is required before:

- Collecting reporter contact details.
- Using browser geolocation.
- Displaying precise coordinates publicly.
- Adding external map providers.
- Storing photos or other attachments.
- Treating JSON exports as official records.
- Sending notifications.

Production retention policy must define how long reports, coordinates, attachments, exports, and audit events are kept.

## Migration Notes

The local backup JSON can help seed demos, but production import should validate:

- Required fields.
- Allowed category, status, priority, and team values.
- Timestamp formats.
- Coordinate ranges.
- Duplicate hint references.
- Activity event order.

Production migration should not trust browser-generated IDs, timestamps, priority suggestions, assignment labels, or activity history as authoritative.

## Recommended Next Implementation Phase

After explicit approval for backend, auth, database, and deployment decisions:

1. Define the production issue schema and API contract.
2. Add server-side validation for the current local issue fields.
3. Implement staff identity and audit actor metadata.
4. Add attachment policy before any upload implementation.
5. Add map provider and coordinate privacy policy before interactive maps.

Until those approvals exist, keep the static app local-only.
