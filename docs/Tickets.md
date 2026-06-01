# Tickets

## T0001 - Project Skeleton

Status: Done

Priority: High

Branch: feature/t0001-project-skeleton

Goal:

Create the initial no-dependency project skeleton, documentation pack, and placeholder UI.

Dependencies:

None.

Allowed areas:

- `README.md`
- `AGENTS.md`
- `WORKFLOW.md`
- `docs/`
- `src/`
- workspace `WORKSPACE.txt`

Do not touch:

- auth
- database
- deployment config
- external APIs
- payment systems

Requirements:

- Create base app structure.
- Add project workflow docs.
- Add placeholder citizen and admin UI.
- Keep the app runnable by opening an HTML file.

Non-goals:

- No real persistence.
- No backend.
- No auth.
- No map provider.
- No real image upload.

Acceptance criteria:

- Project folder exists under `projects/civic-issue-reporter`.
- README explains the app and how to run it.
- Required docs exist in `docs/`.
- Static page renders a placeholder civic issue reporting experience.
- No dependencies are required.

Automated checks:

- Not applicable for T0001.

Manual verification:

1. Open `src/index.html`.
2. Confirm the citizen report form renders.
3. Confirm sample issue cards render.
4. Confirm admin metrics render.
5. Check browser console for errors.

Human review triggers:

- Need for new dependency.
- Need for external map API.
- Need for auth or sensitive personal data.

## T0002 - Local Issue Data Model and Browser Storage

Status: Done

Priority: High

Branch: feature/t0002-local-issue-storage

Goal:

Make the report form create issue records and persist them in browser storage.

Dependencies:

T0001.

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `src/app.js`
- `docs/Repo_Current_State.md`
- `docs/Known_Issues_And_Followups.md`
- `docs/Manual_Verification_Guide.md`

Do not touch:

- auth
- backend
- database
- external APIs
- deployment

Requirements:

- Define the local issue object shape.
- Save submitted issues to `localStorage`.
- Render stored issues after reload.
- Add a clear/reset sample data control if useful.
- Validate required fields.

Non-goals:

- No map integration.
- No file upload storage.
- No admin assignment workflow.
- No ML or AI.

Acceptance criteria:

- Submitting the form adds a new issue card.
- Reloading the page preserves submitted issues.
- Required fields show clear validation.
- Existing sample data remains available for first-run demo.

Automated checks:

- None unless a test harness is added later.

Manual verification:

1. Open the page.
2. Submit a valid issue.
3. Confirm the issue appears.
4. Reload.
5. Confirm the issue persists.
6. Try submitting with missing required fields.
7. Confirm validation is understandable.

Human review triggers:

- Any need for dependencies or browser permissions beyond normal form behavior.

## T0003 - Admin Triage and Status Workflow

Status: Done

Priority: High

Goal:

Allow admin-style status changes, category filtering, and priority labeling for locally stored issues.

Design reference:

- `docs/UI_UX_Design_Direction.md`
- `docs/design-references/ui-ux-concept-sheet-001.png`

Acceptance criteria:

- Issue cards expose local status controls.
- Issue cards expose local priority controls.
- Status and priority changes persist after reload.
- Category, status, and priority filters narrow the visible queue.
- Dashboard includes a status workflow summary.

## T0004 - Map-Ready Location Experience

Status: Done

Priority: Medium

Goal:

Improve location capture without adding an external map service yet.

Acceptance criteria:

- Report form captures location summary, ward or area, and nearby landmark.
- Report form supports optional manually entered latitude and longitude.
- Latitude and longitude validate their accepted ranges.
- Issue cards display map-ready location context.
- Dashboard includes a non-interactive location readiness preview.
- No external map provider, geolocation permission, or browser location API is used.

## T0005 - Duplicate and Priority Assistance

Status: Done

Priority: Medium

Goal:

Add simple, explainable duplicate detection and priority suggestions using local rules.

Acceptance criteria:

- Report form shows local priority assistance before submit.
- Submitted issues store a priority reason.
- Submitted issues can show possible duplicate hints.
- Duplicate detection uses explainable local rules only.
- No AI service, network request, or external dependency is added.

## T0006 - Apply Minimal Civic UI Direction

Status: Done

Priority: High

Goal:

Refine the application UI toward the saved concept sheet: mobile-first citizen reporting, clean public issue feed, restrained admin dashboard, and issue detail/timeline patterns.

Design reference:

- `docs/UI_UX_Design_Direction.md`
- `docs/design-references/ui-ux-concept-sheet-001.png`

Acceptance criteria:

- Page shell follows the saved minimal civic UI direction.
- Citizen reporting remains mobile-friendly and visually clearer.
- Public issue feed uses compact, scannable report rows.
- Admin dashboard feels restrained and useful.
- No new dependency, logo, fake government seal, heavy gradient, or decorative blob is added.

## T0007 - Manual Verification Pass and Backlog Refresh

Status: Done

Priority: High

Goal:

Refresh project state, manual verification guidance, known follow-ups, and the next implementation backlog after T0001-T0006.

Allowed areas:

- `docs/Tickets.md`
- `docs/Repo_Current_State.md`
- `docs/Known_Issues_And_Followups.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Prompt_Context_Pack.md`
- `docs/Review_Checklist.md`

Do not touch:

- `src/`
- auth
- backend
- database
- deployment
- external APIs

Acceptance criteria:

- Current state reflects T0001-T0007.
- Prompt context points to the next real ticket.
- Known follow-ups are organized into open and closed sections.
- Manual verification has an end-to-end smoke pass.
- Next 3 tickets are ready or planned.

## T0008 - Issue Detail and Timeline View

Status: Done

Priority: High

Goal:

Add an issue detail experience that shows report metadata, status timeline, location context, priority explanation, duplicate hints, and local triage controls.

Dependencies:

T0001-T0007.

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `src/app.js`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Known_Issues_And_Followups.md`

Do not touch:

- auth
- backend
- database
- external APIs
- deployment

Non-goals:

- No route framework.
- No real map integration.
- No staff identity.
- No file upload.

Acceptance criteria:

- A user can open a focused issue detail panel from the issue queue.
- Detail panel includes status timeline from current issue state.
- Detail panel includes priority and duplicate explanations.
- Detail panel preserves existing local triage behavior.
- Detail panel can be closed without losing state.

## T0009 - Duplicate Review Actions

Status: Done

Priority: Medium

Goal:

Let staff mark duplicate hints as linked, dismissed, or needs review using local state only.

Dependencies:

T0001-T0008.

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `src/app.js`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Known_Issues_And_Followups.md`
- `docs/Prompt_Context_Pack.md`
- `docs/Tickets.md`
- `docs/Risk_Register.md`

Do not touch:

- auth
- backend
- database
- external APIs
- deployment

Non-goals:

- No real issue merge.
- No staff identity.
- No backend audit log.
- No route framework.

Acceptance criteria:

- Duplicate hints expose local review actions for linked, dismissed, and needs review.
- Review actions persist after reload through browser storage.
- Older local duplicate hints normalize safely to needs review.
- Issue cards and the detail panel summarize duplicate review state.
- No dependency, backend, auth, or external service is added.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html` in a browser.
2. Submit a report similar enough to an existing issue to create a duplicate hint.
3. Open the new report detail panel.
4. Mark the duplicate hint as linked, dismissed, and needs review.
5. Confirm the detail panel and issue card summary update.
6. Reload the page and confirm the selected review state persists.
7. Confirm no console errors appear.

## T0010 - Export and Print Summary

Status: Done

Priority: Medium

Goal:

Add a simple local export or print-friendly summary for municipal review demos.

Dependencies:

T0001-T0009.

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `src/app.js`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Prompt_Context_Pack.md`
- `docs/Tickets.md`

Do not touch:

- auth
- backend
- database
- external APIs
- deployment

Non-goals:

- No server-generated files.
- No PDF library.
- No email or external sharing.
- No backend reporting dashboard.

Acceptance criteria:

- App includes a municipal review summary generated from local browser data.
- Summary includes high-level counts, status/priority/category breakdowns, and priority issue highlights.
- Staff can open the browser print dialog for a print-friendly summary.
- Staff can export the summary as a local JSON file.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html` in a browser.
2. Confirm the Summary navigation link reaches the export and print summary section.
3. Confirm the summary reflects current local issue counts.
4. Change an issue status or priority and confirm the summary updates.
5. Click `Export JSON` and confirm a local JSON summary downloads.
6. Click `Print summary` and confirm the browser print dialog opens.
7. Confirm the print preview focuses on the municipal summary.
8. Confirm no console errors appear.

## T0011 - Backlog Refresh and Next Handoff

Status: Done

Priority: High

Goal:

Review the MVP state after T0001-T0010, refresh project docs, and prepare the next implementation ticket.

Dependencies:

T0001-T0010.

Allowed areas:

- `README.md`
- `docs/Tickets.md`
- `docs/Repo_Current_State.md`
- `docs/Known_Issues_And_Followups.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Prompt_Context_Pack.md`
- `docs/Risk_Register.md`

Do not touch:

- `src/`
- auth
- backend
- database
- external APIs
- deployment

Non-goals:

- No new app behavior.
- No UI redesign.
- No dependency changes.
- No production, auth, backend, or database decisions.

Acceptance criteria:

- Current state reflects T0001-T0011.
- Prompt context points to the same next ticket as repo state.
- Known follow-ups include any new limitations discovered after export/print support.
- Manual verification includes T0011 and the next ticket has clear verification.
- At least one next implementation ticket is ready.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Confirm `docs/Tickets.md` marks T0011 done.
2. Confirm `docs/Repo_Current_State.md` and `docs/Prompt_Context_Pack.md` name the same next ticket.
3. Confirm open follow-ups and risks still reflect the current local-only MVP.
4. Run `node --check src/app.js`.

## T0011A - Git Repository Initialization and Manual UI Checklist

Status: Partially Complete / Blocked

Priority: High

Goal:

Initialize the project as a local git repository and document the browser/manual UI checks that need to be completed.

Dependencies:

T0011.

Allowed areas:

- `.gitignore`
- git metadata
- `README.md`
- `docs/Tickets.md`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Manual_UI_Checks.md`
- `docs/Known_Issues_And_Followups.md`

Do not touch:

- `src/`
- auth
- backend
- database
- external APIs
- deployment

Non-goals:

- No app behavior changes.
- No dependency changes.
- No production deployment.
- No GitHub repository creation without valid authentication.

Acceptance criteria:

- Local git repository is initialized. Blocked: a partial `.git` directory exists, but Windows ACLs prevent Git from writing `.git/config` and `.git/index.lock`.
- `.gitignore` exists and excludes local secrets, generated data, dependency folders, and exported JSON summaries.
- Initial project commit exists locally. Blocked until `.git` ACLs are fixed or the partial `.git` directory is recreated.
- Manual browser/UI checks are documented as a checklist.
- Remote push status is reported clearly. Blocked until local git is healthy and GitHub CLI is re-authenticated or a remote URL is provided.

Automated checks:

- `node --check src/app.js`
- `git status --short`
- `git log --oneline -1`

Manual verification:

1. Confirm `.git/` exists.
2. Confirm `docs/Manual_UI_Checks.md` lists pending browser/manual UI checks.
3. Confirm `git status --short` works without `safe.directory` errors.
4. Confirm `git add .` can create an index.
5. Confirm `git commit -m "chore: initial civic issue reporter project"` succeeds.
6. Re-authenticate GitHub CLI before remote push if required.

Human review triggers:

- Need to authenticate to GitHub.
- Need to choose a remote repository name, owner, visibility, or URL.

## T0012 - Accessibility and Keyboard Verification Pass

Status: Done

Priority: High

Goal:

Audit and improve the current static MVP for keyboard navigation, visible focus, semantic labels, responsive text containment, and accessible status messaging.

Dependencies:

T0001-T0011.

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `src/app.js`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Known_Issues_And_Followups.md`
- `docs/Prompt_Context_Pack.md`
- `docs/Tickets.md`

Do not touch:

- auth
- backend
- database
- external APIs
- deployment
- dependency files

Non-goals:

- No visual redesign.
- No new feature workflow.
- No automated accessibility dependency.
- No routing framework.

Acceptance criteria:

- All interactive controls are reachable by keyboard in a sensible order.
- Focus is visible on links, buttons, form fields, and select controls.
- Dynamic status, validation, summary, queue, and detail updates use understandable accessible labels or live regions where appropriate.
- Invalid form submissions focus the first invalid field and expose field-level error messages through `aria-describedby`.
- Issue detail open/close actions manage keyboard focus.
- Mobile-width layout avoids text overlap or clipped controls.
- Existing reporting, triage, duplicate review, detail, export, and print behaviors continue to work.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- Pass, `node --check src/app.js`.

Manual verification:

1. Open `src/index.html`.
2. Use only keyboard navigation from the top of the page through report form, dashboard, summary, issue filters, issue cards, detail panel, duplicate review controls, and export/print actions.
3. Confirm focus is visible at every step.
4. Submit invalid form data and confirm validation messages are readable and announced through nearby text.
5. Open and close an issue detail panel by keyboard.
6. At a mobile-width viewport, confirm controls and text do not overlap or clip.
7. Run the T0010 export/print smoke steps.
8. Check browser console for errors.

## T0013 - UI Snapshot Fidelity Pass

Status: Done

Priority: High

Goal:

Bring the current UI closer to the saved concept sheet without adding new product behavior.

Dependencies:

T0012.

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `src/app.js`
- `docs/Repo_Current_State.md`
- `docs/Manual_Verification_Guide.md`
- `docs/Known_Issues_And_Followups.md`
- `docs/Prompt_Context_Pack.md`
- `docs/Tickets.md`

Do not touch:

- auth
- backend
- database
- external APIs
- deployment
- dependency files

Non-goals:

- No new product workflow.
- No map provider.
- No photo upload.
- No auth, backend, or deployment.

Acceptance criteria:

- Citizen report, public feed, dashboard, and issue detail surfaces better match the saved UI/UX concept sheet.
- Existing local workflows remain unchanged.
- UI stays minimal, civic, mobile-friendly, and free of decorative blobs or heavy gradients.
- No text overlap or clipped controls at desktop and mobile widths.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- Pass, `node --check src/app.js`.

Manual verification:

1. Open `src/index.html`.
2. Compare the citizen report, public feed, dashboard, and issue detail surfaces against `docs/design-references/ui-ux-concept-sheet-001.png`.
3. Confirm reporting, triage, duplicate review, detail, export, and print workflows still work.
4. Check desktop and mobile-width layouts.
5. Check browser console for errors.

## T0014 - Photo Evidence Placeholder and Privacy Copy

Status: Done

Priority: Medium

Goal:

Clarify the future photo evidence workflow without storing files yet, including privacy-safe copy and report-card placeholders.

Result:

Issue cards and detail views show local photo-evidence placeholders and privacy-state messaging. No files are selected, stored, uploaded, or transmitted.

## T0015 - Local Assignment Prototype

Status: Done

Priority: Medium

Goal:

Add local-only assignment labels for municipal team ownership after staff identity decisions remain explicitly out of scope.

Result:

Reports now normalize to a local municipal team by category, and staff can adjust team assignment from issue cards and detail controls. Assignment changes persist in browser storage.

## T0016 - Admin Analytics Snapshot

Status: Done

Priority: Medium

Goal:

Expand the dashboard toward the concept sheet with local-only operational summaries and no external charting dependency.

Result:

The dashboard now includes priority queue, status mix, team load, stale/open indicators, and richer metric notes using only local issue data and CSS.

## T0017 - Local Activity Timeline

Status: Done

Priority: Medium

Goal:

Append local timeline events for status, priority, duplicate review, and assignment changes.

Result:

Issue records now carry a local activity log. Status, priority, duplicate review, and assignment updates append timeline events visible in issue detail.

## T0018 - Local Backup and Restore

Status: Done

Priority: Medium

Goal:

Add local full-data export and import with validation and clear overwrite warnings.

Result:

The summary section now supports full local backup export and JSON backup restore with basic validation and normalization before replacing browser-stored reports.

## T0019 - Test Harness Decision and First Logic Tests

Status: Done

Priority: Medium

Goal:

Decide whether to introduce a small test dependency and add first focused tests for core local logic if approved.

Result:

No dependency was introduced. `src/app.js` now safely exports core local logic for Node, `checks/local-logic-check.js` verifies priority suggestion, duplicate scoring, issue normalization, backup import validation, and municipal summary generation, and `checks/static-ui-check.js` verifies static DOM wiring and local-only assets.

Automated checks:

- Pass, `node --check src/app.js`.
- Pass, `node checks/local-logic-check.js`.
- Pass, `node checks/static-ui-check.js`.

## T0020 - Backend Readiness Design

Status: Done

Priority: High

Goal:

Prepare backend, data, audit, auth-assumption, and API boundary design without implementing backend code.

Result:

Added `docs/Backend_Readiness_Design.md` with future API boundaries, storage model, auth and identity assumptions, audit expectations, privacy gates, migration notes, and next-phase approval requirements. No backend, database, auth, deployment, external map, notification, or upload service was implemented.
