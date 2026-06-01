# Development Plan

Last updated: 2026-06-01

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

- The project has a local git repository and branch-per-ticket workflow is enforceable locally.
- Browser-based manual verification is documented but not fully completed for every recent UI ticket.
- T0003 through T0006 were early concise tickets and do not contain the same full handoff detail as later tickets.
- Auth, backend, database, external maps, deployment, and real photo storage remain intentionally unapproved and out of scope.

Conclusion:

The project now has a finished local-only static MVP shape and a saffron CivicVault shell. The next stage should keep improving document-vault fidelity locally, while avoiding DigiLocker branding or government-service impersonation. Backend, auth, map providers, uploads, and deployment changes still need explicit approval.

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
- Saffron CivicVault visual system with document-vault navigation and local workspace identity.

Completed snapshot-aligned work:

1. Keyboard, focus, labels, live regions, and responsive behavior were hardened in T0012.
2. Public issue feed density and metadata were improved in T0013.
3. Dashboard analytics were expanded in T0016.
4. Photo-evidence placeholders and privacy language were added in T0014.
5. Local-only team assignment labels were added in T0015.
6. Local activity history for workflow changes was added in T0017.
7. The app was reframed as a saffron CivicVault shell in T0021.

## CivicVault Iteration Direction

The target is a functional civic vault experience inspired by common document-locker patterns: a home dashboard, report vault, new report intake, municipal services, activity history, and backup/export controls. The product must remain visibly separate from DigiLocker and must not use DigiLocker marks, government seals, or language that implies official integration.

## Next Development Sequence

### T0012 - Accessibility and Keyboard Verification Pass

Status: Done

Purpose:

Harden the current static MVP before more UI work. This addresses the biggest current quality gap in the process review.

Expected result:

Keyboard navigation, focus states, labels, live regions, and mobile text containment are verified and improved.

### T0013 - UI Snapshot Fidelity Pass

Status: Done

Purpose:

Bring the current UI closer to the saved concept sheet without adding new product behavior.

Expected result:

The citizen report, public feed, dashboard, and detail views better match the visual rhythm, density, and hierarchy of the reference snapshot.

### T0014 - Photo Evidence Placeholder and Privacy Copy

Status: Done

Purpose:

Clarify the photo evidence path before real file upload.

Expected result:

The form and issue detail surfaces explain that photo evidence is planned, privacy-sensitive, and not stored yet.

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

Dashboard shows priority queue, status distribution, category distribution, and stale/open issue indicators using existing local data.

### T0017 - Local Activity Timeline

Status: Done

Purpose:

Make municipal workflow changes more auditable in local state.

Expected result:

Status, priority, duplicate review, and assignment changes append local timeline events visible in issue detail.

### T0018 - Local Backup and Restore

Status: Done

Purpose:

Make local demo data portable without backend work.

Expected result:

Staff can export full local issue data and import it back into the browser with validation and clear overwrite warnings.

### T0019 - Test Harness Decision and First Logic Tests

Status: Done

Purpose:

Decide whether to introduce a small test dependency for core logic, or keep no-dependency checks.

Expected result:

No dependency was introduced. Focused no-dependency checks cover priority suggestion, duplicate scoring, normalization, backup import validation, summary generation, static DOM wiring, and local-only asset loading.

Human review trigger:

This ticket may require approval for a new dependency.

### T0020 - Backend Readiness Design

Status: Done

Purpose:

Prepare the backend/data plan without implementing it.

Expected result:

Done in `docs/Backend_Readiness_Design.md`: API boundaries, data ownership, auth assumptions, storage model, audit needs, privacy gates, and migration risks are documented.

Human review trigger:

Backend, database, auth, and deployment decisions require explicit approval before implementation tickets are created.

### T0021 - Saffron CivicVault Shell

Status: Done

Purpose:

Reframe the existing local MVP into a saffron document-vault shell using CivicVault naming and vault-style navigation.

Expected result:

Done. The app now presents CivicVault as a local civic report vault with Home, Report vault, New report, Municipal services, Activity, and Backup and exports navigation while preserving existing local workflows.

### T0022 - CivicVault Document Modules Pass

Status: Done

Purpose:

Make the app feel more like a functional document-vault product without adding external services.

Expected result:

Done. Added local-only modules for issued reports, evidence placeholders, municipal services, recent activity, and report retrieval. All data remains in browser storage and the implementation remains dependency-free.

### T0023 - Pitch and Hackathon Demo Mode

Status: Planned

Purpose:

Make the product easier to demo in hackathons and pitch decks.

Expected result:

Add a resettable demo scenario set, clearer high-impact metrics, exportable demo summary language, and screenshot-ready states that explain the product without requiring backend access.

### T0024 - Search and Retrieve Report Flow

Status: Planned

Purpose:

Let users find and inspect local reports as a vault, not only as a queue.

Expected result:

Add local search by report ID, title, category, location, status, priority, and assignment. Add a retrieval-oriented empty state and detail entry point.

## Human Decisions Needed Before Later Phases

- Citizen identity: anonymous, contact-optional, or account-based.
- Staff identity and assignment policy.
- Map provider and precise-location privacy rules.
- Photo upload storage, retention, and public visibility.
- Whether local JSON exports can ever become official records.
- Whether to introduce dependencies for tests or framework migration.
- Whether and when to initialize this project as a git repository.
- Whether CivicVault should remain a standalone brand or be positioned as part of a broader software firm product suite.

## Recommended Immediate Action

Run manual browser verification for the saffron CivicVault shell and T0022 modules, then continue with T0023 pitch and hackathon demo mode. Any production phase still requires explicit approval for backend, auth, database, deployment, external maps, and real uploads.
