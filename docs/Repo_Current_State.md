# Repo Current State

## Current Branch

`main`

## Completed Tickets

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
- T0023 - Pitch and Hackathon Demo Mode

## Current App Status

The project has a no-dependency static app with a saffron CivicVault shell, citizen report form, local issue records, browser persistence through `localStorage`, sample issue cards, admin-style metrics, category/status/priority filters, local status and priority controls, map-ready location fields, a non-interactive location readiness preview, explainable local duplicate hints, local duplicate review actions, local priority assistance, a compact workflow summary, a focused issue detail panel with status and activity timelines, local team assignment, photo-evidence placeholders, an admin analytics snapshot, a municipal review summary with print and JSON export actions, full local backup/restore, no-dependency logic checks, and T0012 accessibility hardening for focus visibility, skip navigation, validation association, detail focus management, live status regions, and mobile text containment.

T0021 reframed the UI toward a DigiLocker-inspired civic document vault pattern using CivicVault naming, Home / Report vault / New report / Municipal services / Activity / Backup and exports navigation, a local workspace identity strip, and a saffron-led palette. The app does not use DigiLocker branding, government marks, external assets, or external services.

T0022 added local-only vault modules for issued reports, uploaded evidence placeholders, municipal services, retrieve report, and recent activity. These modules are computed from browser-stored issue records and do not add real uploads, identity collection, official document issuance, or external integrations.

T0023 added Pitch demo mode with local Ward operations, Safety sprint, and Sanitation drive scenarios plus pitch snapshot lines generated from local metrics. Scenario loading replaces browser-stored demo reports only and does not add network calls or backend dependencies.

A generated UI/UX concept sheet has been saved as the design reference for future UI implementation.

## Folder Structure Summary

- `src/` contains the static app shell.
- `checks/` contains no-dependency Node checks for core local logic and static UI wiring.
- `src/app.js` defines the local issue object shape, form submission behavior, validation, invalid-field focus behavior, sample data, map-ready location metadata, filters, triage controls, local duplicate/priority assistance, duplicate review actions, team assignment, activity logging, metrics, workflow summary, analytics snapshot, issue detail focus behavior, export/print summary, full backup/restore, and browser storage.
- `docs/` contains planning, ticket, verification, state, risk, review, manual UI checklist, development plan, and backend readiness documents.
- `docs/design-references/` contains saved visual references for UI implementation.
- `README.md`, `AGENTS.md`, and `WORKFLOW.md` define setup and project rules.

## Installed Dependencies

None. `package.json` exists only to provide dependency-free `npm test` and `npm run check` scripts.

## Available Commands

- Open `src/index.html` directly in a browser.
- `node --check src/app.js`
- `node checks/local-logic-check.js`
- `node checks/static-ui-check.js`
- `npm test`
- `npm run check`
- `git status --short`

## Latest Check Results

- Build: Not run, no build system.
- Tests: Pass, `node checks/local-logic-check.js` on 2026-06-01.
- Static UI wiring: Pass, `node checks/static-ui-check.js` on 2026-06-01.
- Lint: Not run, no lint system.
- Typecheck: Not run, no type system.
- Syntax: Pass, `node --check src/app.js` on 2026-06-01.
- Git: Local repository is initialized on `main` and connected to GitHub.
- GitHub: Remote `origin` points to `https://github.com/KJisback/civic-issue-reporter.git`; GitHub Pages serves the static app from the `gh-pages` branch.

## Known Issues

- Real map integration and photo upload are placeholders.
- Triage controls are local-only and include team assignment labels, but no real staff identity.
- Duplicate detection is a simple local heuristic and may miss real duplicates or flag weak matches.
- Visual verification should still be done manually in a browser at desktop and mobile widths.
- Duplicate review actions are local-only and do not merge records or record real staff identity.
- JSON summary and backup exports are browser-generated local files and are not secure official records.
- Browser-based keyboard and screen-reader behavior should continue to be spot-checked manually after future UI changes.
- CivicVault is inspired by document-vault UI patterns, but must not impersonate DigiLocker, claim government affiliation, or reuse protected branding.

## Current Risks

- Future real map, geolocation, image upload, identity, notification, and official-record features may create privacy concerns and need explicit product decisions.
- Branch-per-ticket workflow is enforceable locally.
- GitHub CLI works when the dead proxy environment variables are cleared for network commands.
- Direct Git HTTPS remote commands may need `GIT_EXEC_PATH=F:\Kuku\Workspace\.codex-tools\mingit\mingw64\bin` and cleared proxy variables in this Codex shell.
- Browser-based manual verification remains a human activity after implementation tickets.

## Next Recommended Ticket

T0024 - Search and Retrieve Report Flow. Add a vault-style local search box for report ID, title, category, location, status, priority, and assigned team. Backend, auth, database, external maps, notifications, and real uploads still require explicit approval before implementation.

## Last Updated

2026-06-01
