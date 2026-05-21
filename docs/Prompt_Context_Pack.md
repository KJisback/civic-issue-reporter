# Prompt Context Pack

Project: Civic Issue Reporter

Problem statement:

Build a crowdsourced civic issue reporting and resolution system that helps citizens submit local infrastructure or sanitation issues and helps municipal staff triage and resolve them.

Primary inferred MVP:

- Citizen issue report form.
- Local issue list.
- Admin triage dashboard.
- Status workflow.
- Simple analytics.
- Local persistence before backend.

Current next ticket:

T0014 - Photo Evidence Placeholder and Privacy Copy

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
- Accessibility and keyboard hardening for skip navigation, focus states, live regions, validation associations, detail focus restoration, and responsive text containment.
- UI snapshot fidelity refinements for citizen guidance, denser public issue rows, local map-preview context, category markers, dashboard stat treatment, and detail header composition.
- Minimal civic UI direction applied from saved concept sheet.

Saved UI/UX direction:

- `docs/UI_UX_Design_Direction.md`
- `docs/design-references/ui-ux-concept-sheet-001.png`
- `docs/Development_Plan.md`

Next handoff focus:

Clarify the future photo evidence workflow without storing files yet, including privacy-safe copy and report-card placeholders.

Next sequence after T0014:

- T0015 - Local Assignment Prototype
- T0016 - Admin Analytics Snapshot
- T0017 - Local Activity Timeline
- T0018 - Local Backup and Restore
- T0019 - Test Harness Decision and First Logic Tests
- T0020 - Backend Readiness Design

Human-gated decisions:

- Authentication.
- External map provider.
- Database.
- Deployment.
- Reporter identity and privacy.
- Photo upload storage.
