# Development Plan

Last updated: 2026-05-21

## Process Coverage Review

The project is following the standalone agentic development model:

- Work is organized as one ticket at a time.
- `README.md`, `AGENTS.md`, `WORKFLOW.md`, and the required `docs/` pack exist.
- `docs/Tickets.md` is the active roadmap.
- `docs/Repo_Current_State.md` records completed work and the next ticket.
- `docs/Known_Issues_And_Followups.md` records out-of-scope items instead of folding them into unrelated tickets.
- `docs/Manual_Verification_Guide.md` records human-verifiable checks per ticket.
- `docs/Risk_Register.md` captures privacy, duplicate-report, export-record, and accessibility risks.
- Completion reports have been provided after recent tickets and should remain mandatory after every ticket.

Current caveats:

- The project is now a local git repository connected to GitHub; Codex may still need sandbox escalation for Git write commands on this host.
- Browser-based manual verification is documented but not fully completed for every recent UI ticket.
- T0003 through T0006 were early concise tickets and do not contain the same full handoff detail as later tickets.
- Auth, backend, database, external maps, deployment, and real photo storage remain intentionally unapproved and out of scope.

Conclusion:

The project is ready to continue with controlled ticket-by-ticket development. The next stage should not jump to backend, auth, map providers, or deployment. It should first finish quality hardening and deeper UI/UX snapshot fidelity against the saved concept sheet.

## UI/UX Snapshot Implementation Direction

Reference:

- `docs/UI_UX_Design_Direction.md`
- `docs/design-references/ui-ux-concept-sheet-001.png`

The current app already implements the concept direction at a broad level:

- Mobile-first citizen reporting.
- Public issue feed.
- Admin triage snapshot.
- Issue detail and timeline.
- Calm civic palette with green, teal, amber, coral, off-white surfaces, and compact controls.

Remaining snapshot-aligned work should be incremental:

1. Complete the remaining human browser checks for keyboard, focus, labels, responsive behavior, and UI snapshot comparison before accepting the next UI milestone.
2. Add a local audit/history surface for status, priority, duplicate review, and assignment changes.

## Next Development Sequence

### T0012 - Accessibility and Keyboard Verification Pass

Status: Done

Purpose:

Harden the current static MVP before more UI work. This addresses the biggest current quality gap in the process review.

Expected result:

Keyboard navigation, focus states, labels, live regions, and mobile text containment are improved. Human browser verification remains listed in `docs/Manual_UI_Checks.md`.

### T0013 - UI Snapshot Fidelity Pass

Status: Done

Purpose:

Bring the current UI closer to the saved concept sheet without adding new product behavior.

Expected result:

The citizen report, public feed, dashboard, and detail views better match the visual rhythm, density, and hierarchy of the reference snapshot. Human browser visual comparison remains listed in `docs/Manual_UI_Checks.md`.

### T0014 - Photo Evidence Placeholder and Privacy Copy

Status: Done

Purpose:

Clarify the photo evidence path before real file upload.

Expected result:

The form, issue cards, and issue detail surfaces explain that photo evidence is planned, privacy-sensitive, and not stored yet.

### T0015 - Local Assignment Prototype

Status: Done

Purpose:

Add local-only team assignment labels for admin triage.

Expected result:

Issues can be assigned to a small fixed set of municipal teams in local state, without staff identity or auth.

### T0016 - Admin Analytics Snapshot

Status: Done

Purpose:

Expand the dashboard toward the concept sheet with local-only operational summaries.

Expected result:

Dashboard shows priority queue, status distribution, category distribution, team load, and stale/open issue indicators using existing local data.

### T0017 - Local Activity Timeline

Status: Done

Purpose:

Make municipal workflow changes more auditable in local state.

Expected result:

Status, priority, duplicate review, and assignment changes append local timeline events visible in issue detail.

### T0018 - Local Backup and Restore

Status: Ready for Agent

Purpose:

Make local demo data portable without backend work.

Expected result:

Staff can export full local issue data and import it back into the browser with validation and clear overwrite warnings.

### T0019 - Test Harness Decision and First Logic Tests

Status: Planned

Purpose:

Decide whether to introduce a small test dependency for core logic, or keep no-dependency checks.

Expected result:

If approved, add focused tests for priority suggestion, duplicate scoring, normalization, and summary generation. If not approved, document why and keep syntax/manual verification only.

Human review trigger:

This ticket may require approval for a new dependency.

### T0020 - Backend Readiness Design

Status: Planned

Purpose:

Prepare the backend/data plan without implementing it.

Expected result:

Document API boundaries, data ownership, auth assumptions, storage model, audit needs, and migration risks.

Human review trigger:

Backend, database, auth, and deployment decisions require explicit approval before implementation tickets are created.

## Human Decisions Needed Before Later Phases

- Citizen identity: anonymous, contact-optional, or account-based.
- Staff identity and assignment policy.
- Map provider and precise-location privacy rules.
- Photo upload storage, retention, and public visibility.
- Whether local JSON exports can ever become official records.
- Whether to introduce dependencies for tests or framework migration.

## Recommended Immediate Action

Proceed with T0017 only after reviewing the T0016 completion report and keeping timeline events local-only.
