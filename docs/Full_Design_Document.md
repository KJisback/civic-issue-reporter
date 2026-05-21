# Full Design Document

## Product Idea

Civic Issue Reporter helps citizens report local civic problems and helps municipal teams resolve them transparently.

## Primary Users

- Citizens reporting issues such as potholes, garbage, streetlight failures, drainage problems, broken signage, unsafe public areas, or water leakage.
- Municipal staff reviewing, prioritizing, assigning, and resolving reports.
- Supervisors monitoring service quality and backlog health.

## MVP Success Condition

A user can create a civic issue report, see it appear in a list, and an admin can review issue status, priority, and category in a clear dashboard.

## Scope

MVP:

- Mobile-first issue reporting UI.
- Issue categories.
- Location text field and optional map-ready coordinates later.
- Photo placeholder for future upload.
- Status lifecycle: submitted, triaged, in progress, resolved.
- Admin dashboard placeholder.
- Local browser persistence before any backend.

Out of scope for MVP:

- Login and identity verification.
- Production deployment.
- Payments.
- Real municipal integrations.
- Real-time notifications.
- Public complaint escalation rules.

## Key Product Principles

- Make reporting fast for citizens.
- Make triage explainable for staff.
- Avoid collecting unnecessary personal data.
- Keep the system useful offline or under weak connectivity where possible.
- Prefer transparent status history over black-box automation.

## Risks

- False or duplicate reports.
- Privacy issues from photos or location data.
- Misuse if public identities are exposed.
- Overpromising municipal resolution without real integrations.

## Month-Long Build Direction

Week 1: static app foundation, local data model, report creation, issue list.

Week 2: admin triage dashboard, filters, status workflow, priority scoring.

Week 3: map view, duplicate detection, photo metadata flow, analytics.

Week 4: polish, accessibility, tests, export/reporting, deployment decision.
