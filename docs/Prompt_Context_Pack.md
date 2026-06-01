# Prompt Context Pack

Project: CivicVault

Problem statement:

Build a saffron civic issue vault that helps citizens submit local infrastructure or sanitation reports and helps municipal staff triage, assign, audit, export, and resolve them.

Primary inferred MVP:

- Citizen issue report form.
- Local issue list.
- Admin triage dashboard.
- Status workflow.
- Simple analytics.
- Local persistence before backend.

Current next ticket:

T0023 - Pitch and Hackathon Demo Mode.

Completed tickets:

- T0001 - Project Skeleton
- T0002 - Local Issue Data Model and Browser Storage
- T0003 - Admin Triage and Status Workflow
- T0004 - Map-Ready Location Experience
- T0005 - Duplicate and Priority Assistance
- T0006 - Apply Minimal Civic UI Direction
- T0007 - Manual Verification Pass and Backlog Refresh
- T0008 - Issue Detail and Timeline View
- T0009 - Duplicate Review Actions
- T0010 - Export and Print Summary
- T0011 - Backlog Refresh and Next Handoff
- T0011A - Git Repository Initialization and Manual UI Checklist
- T0012 - Accessibility and Keyboard Verification Pass
- T0013 - UI Snapshot Fidelity Pass
- T0014 - Photo Evidence Placeholder and Privacy Copy
- T0015 - Local Assignment Prototype
- T0016 - Admin Analytics Snapshot
- T0017 - Local Activity Timeline
- T0018 - Local Backup and Restore
- T0019 - Test Harness Decision and First Logic Tests
- T0020 - Backend Readiness Design
- T0021 - Saffron CivicVault Shell
- T0022 - CivicVault Document Modules Pass

Current implementation state:

- No-dependency static app.
- Browser storage through `localStorage`.
- Citizen report form.
- Category, status, and priority filters.
- Local triage controls.
- Map-ready location fields without external maps.
- Explainable duplicate hints and priority assistance.
- Local duplicate review actions for needs review, linked, and dismissed.
- Focused issue detail panel with local status timeline.
- Municipal review summary with print and JSON export actions.
- Accessibility hardening for focus visibility, skip navigation, field error associations, invalid-field focus, detail focus management, live status regions, and mobile text containment.
- Local team assignment labels, photo-evidence placeholders, admin analytics, local activity timelines, and full backup/restore.
- No-dependency Node checks for priority, duplicate scoring, normalization, backup import validation, summary generation, static DOM wiring, and local-only assets.
- Backend readiness design documented without implementing backend, auth, database, deployment, maps, notifications, or uploads.
- Saffron CivicVault shell applied with document-vault navigation, local workspace identity, and no DigiLocker branding or impersonation.
- Local-only CivicVault modules show issued report stats, uploaded evidence placeholders, municipal services workload, latest report retrieval, and recent activity from issue logs.

Saved UI/UX direction:

- `docs/UI_UX_Design_Direction.md`
- `docs/design-references/ui-ux-concept-sheet-001.png`
- `docs/Development_Plan.md`

Next handoff focus:

Continue local-only CivicVault fidelity work, then request explicit approval before any non-local production phase.

Next sequence after T0020:

- T0021 - Saffron CivicVault Shell: Done.
- T0022 - CivicVault Document Modules Pass: Done.
- T0023 - Pitch and Hackathon Demo Mode: guided sample scenarios, shareable demo states, and pitch-deck screenshots without external services.
- T0024 - Search and Retrieve Report Flow: local report lookup by ID, category, location, and status.
- T0025 - Backend Pilot Plan or Implementation: only after approval for auth, database, hosting, maps, and uploads.

Human-gated decisions:

- Authentication.
- External map provider.
- Database.
- Deployment.
- Reporter identity and privacy.
- Photo upload storage.
