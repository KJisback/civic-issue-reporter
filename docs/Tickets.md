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

Status: Done

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

- Local git repository is initialized on `main`.
- `.gitignore` exists and excludes local secrets, generated data, dependency folders, and exported JSON summaries.
- Initial project commit exists locally.
- Manual browser/UI checks are documented as a checklist.
- Remote push status is reported clearly. GitHub `main` matched local `HEAD` at `5b0aa3d66083a6dc72241f08076cc43c26bc16b2` during the T0012 preflight.

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
- Dynamic status, validation, summary, and detail updates use understandable accessible labels or live regions where appropriate.
- Mobile-width layout avoids text overlap or clipped controls.
- Existing reporting, triage, duplicate review, detail, export, and print behaviors continue to work.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html`.
2. Use only keyboard navigation from the top of the page through report form, dashboard, summary, issue filters, issue cards, detail panel, duplicate review controls, and export/print actions.
3. Confirm focus is visible at every step.
4. Submit invalid form data and confirm validation messages are readable and announced through nearby text.
5. Open and close an issue detail panel by keyboard.
6. At a mobile-width viewport, confirm controls and text do not overlap or clip.
7. Run the T0010 export/print smoke steps.
8. Check browser console for errors.

Completion notes:

- T0012 added skip navigation, stronger visible focus, clearer dynamic control names, field error associations, live-region/status improvements, issue detail focus restoration, Escape-to-close support, and responsive text containment safeguards.
- `node --check src/app.js` passed.
- In-app browser automation was unavailable during verification, so the full human keyboard/mobile browser checklist remains listed in `docs/Manual_UI_Checks.md`.

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

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html`.
2. Compare the citizen report, public feed, dashboard, and issue detail surfaces against `docs/design-references/ui-ux-concept-sheet-001.png`.
3. Confirm reporting, triage, duplicate review, detail, export, and print workflows still work.
4. Check desktop and mobile-width layouts.
5. Check browser console for errors.

Completion notes:

- T0013 refined the citizen report surface with concept-style guidance cards.
- Public report rows now use denser composition, category visual markers, row metadata, and a local ward map-preview rail.
- Dashboard and detail surfaces received tighter panel, stat, status, and header styling without changing workflows.
- `node --check src/app.js` and `git diff --check` passed.
- Browser automation was unavailable during verification, so desktop/mobile visual comparison remains a human browser check.

## T0014 - Photo Evidence Placeholder and Privacy Copy

Status: Done

Priority: Medium

Goal:

Clarify the future photo evidence workflow without storing files yet, including privacy-safe copy and report-card placeholders.

Acceptance criteria:

- Report form explains photo evidence is planned but not stored in the MVP.
- Issue cards show a non-uploading photo evidence placeholder.
- Issue detail shows privacy-safe photo evidence status and future storage requirements.
- No file picker, file storage, backend, auth, deployment, or external service is added.
- Existing reporting, triage, duplicate review, detail, export, and print behaviors continue to work.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html`.
2. Confirm the report form explains photos are not uploaded, stored, exported, or sent anywhere.
3. Confirm issue cards show a photo evidence placeholder and do not expose an upload control.
4. Confirm issue detail shows the same non-storage privacy language.
5. Confirm reporting, detail, export, and print workflows still work.
6. Check browser console for errors.

Completion notes:

- T0014 added non-interactive photo evidence placeholders to intake, issue cards, and issue detail.
- Privacy copy now calls out faces, private property, license plates, retention, and public visibility decisions before real photo evidence.
- No file input, file storage, backend, dependency, auth, deployment, or external service was added.
- `node --check src/app.js` and `git diff --check` passed.

## T0015 - Local Assignment Prototype

Status: Done

Priority: Medium

Goal:

Add local-only assignment labels for municipal team ownership after staff identity decisions remain explicitly out of scope.

Acceptance criteria:

- Issues can display a local assigned team label.
- Issue cards and issue detail expose an assigned team control.
- Assignment changes persist through browser storage after reload.
- Municipal summary/export includes the assigned team label.
- Assignment copy makes clear there is no staff identity, auth, backend, or official routing.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html`.
2. Change an issue assigned team from `Unassigned` to a municipal team.
3. Confirm the issue card, detail panel, and municipal summary update.
4. Reload and confirm the assignment persists.
5. Export JSON and confirm the assigned team is included.
6. Confirm copy does not imply staff identity or authenticated routing.
7. Check browser console for errors.

Completion notes:

- T0015 added a fixed local team list and assignment controls to cards and detail.
- Older records normalize safely to `Unassigned`.
- Summary/JSON export now includes assigned team labels.
- Assignment remains local-only and does not add staff identity, auth, backend, deployment, dependencies, or external services.
- `node --check src/app.js` and `git diff --check` passed.

## T0016 - Admin Analytics Snapshot

Status: Done

Priority: Medium

Goal:

Expand the dashboard toward the concept sheet with local-only operational summaries and no external charting dependency.

Acceptance criteria:

- Dashboard includes a priority queue generated from local issue data.
- Dashboard includes status, category, and assignment/team load summaries.
- Dashboard includes stale/open issue indicators using existing local timestamps.
- Analytics use simple local markup/CSS, not an external charting dependency.
- Existing reporting, triage, assignment, duplicate review, detail, export, and print behaviors continue to work.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- `node --check src/app.js`

Manual verification:

1. Open `src/index.html`.
2. Confirm the dashboard shows priority queue, status mix, category load, team load, and stale open reports.
3. Change issue status, priority, and assigned team, then confirm dashboard analytics update.
4. Confirm mobile-width dashboard analytics do not overlap or clip.
5. Confirm reporting, triage, assignment, duplicate review, detail, export, and print workflows still work.
6. Check browser console for errors.

Completion notes:

- T0016 added a local analytics snapshot to the admin dashboard.
- Analytics include priority queue, status mix, category load, team load, and stale open report indicators.
- Charts are CSS/HTML only and use existing browser-local issue data.
- No dependency, backend, auth, deployment, or external service was added.
- `node --check src/app.js` and `git diff --check` passed.
- Full local automated/static system test passed after T0016; browser manual checks remain open in `docs/Full_System_Test_Report.md`.

## T0017 - Local Activity Timeline

Status: Done

Priority: Medium

Goal:

Append local timeline events for status, priority, duplicate review, and assignment changes.

Branch:

`feature/t0017-local-activity-timeline`

Dependencies:

- T0008 - Issue Detail and Timeline View
- T0009 - Duplicate Review Actions
- T0015 - Local Assignment Prototype

Allowed areas:

- `src/app.js`
- `src/styles.css`
- ticket, state, and verification docs

Do not touch:

- Do not add backend, auth, database, external services, analytics services, or staff identity.
- Do not implement backup/restore from T0018.
- Do not change photo evidence, map provider, or export record policy.

Requirements:

- Normalize a local `activityTimeline` array on issue records.
- Append local events when status, priority, assigned team, or duplicate review state changes.
- Do not append duplicate events when a control value is unchanged.
- Show activity events in issue detail.
- Keep copy clear that events are browser-local and not an official staff audit log.

Acceptance criteria:

- Status changes append visible local activity events.
- Priority changes append visible local activity events.
- Assigned team changes append visible local activity events.
- Duplicate review changes append visible local activity events.
- Activity events persist through existing browser storage.
- No dependency, backend, auth, deployment, external service, or official audit claim is added.

Automated checks:

- `node --check src/app.js`
- `git diff --check`

Manual verification:

1. Open `src/index.html`.
2. Change issue status, priority, duplicate review, and assigned team.
3. Confirm each change appends a local timeline event in issue detail.
4. Reload and confirm local timeline events persist.
5. Confirm timeline copy does not imply real staff identity or backend audit logging.
6. Check browser console for errors.

Completion notes:

- T0017 added normalized local activity events to issue records.
- Status, priority, assigned team, and duplicate review changes now append local events.
- Issue detail now shows a local activity section with explicit browser-local audit copy.
- No dependency, backend, auth, deployment, external service, or official audit system was added.

## T0018 - Local Backup and Restore

Status: Done

Priority: Medium

Goal:

Add local full-data export and import with validation and clear overwrite warnings.

Branch:

`feature/t0018-local-backup-restore`

Dependencies:

- T0002 - Local Issue Data Model and Browser Storage
- T0010 - Export and Print Summary
- T0017 - Local Activity Timeline

Allowed areas:

- `src/index.html`
- `src/app.js`
- `src/styles.css`
- ticket, state, and verification docs

Do not touch:

- Do not add backend, auth, database, deployment, or external services.
- Do not make JSON backups official municipal records.
- Do not add photo upload or media storage.
- Do not implement the test harness from T0019.

Requirements:

- Add a full local backup export separate from the existing municipal summary export.
- Add local JSON import through a browser file picker.
- Validate backup envelope, version, issue records, coordinates, dates, enums, and duplicate ids before restore.
- Confirm before overwriting existing local browser data.
- Restore through the existing normalization and local storage path.
- Make UI copy clear that import/export stays local and is not an official record.

Acceptance criteria:

- Full backup export downloads JSON with issue records.
- Import accepts a supported backup and replaces local data only after confirmation.
- Invalid JSON or unsupported backup files show a readable error and do not replace data.
- Imported records render through existing issue list, detail, dashboard, summary, and activity timeline views.
- No dependency, backend, auth, deployment, external service, photo upload, or official-record claim is added.

Automated checks:

- `node --check src/app.js`
- `git diff --check`

Manual verification:

1. Open `src/index.html`.
2. Click `Export backup` and confirm a local backup JSON downloads.
3. Change local data, then click `Import backup`.
4. Select the exported backup and confirm the overwrite warning.
5. Confirm issue list, detail, dashboard, summary, and local activity events render from the restored data.
6. Try an invalid JSON file and confirm local data is not replaced.
7. Check browser console for errors.

Completion notes:

- T0018 added full local backup export and JSON import controls.
- Import validates the backup envelope, version, issue records, coordinates, timestamps, enum fields, and duplicate ids before restore.
- Import requires a browser confirmation before replacing local data.
- No dependency, backend, auth, deployment, external service, photo upload, or official-record workflow was added.

## T0019 - Test Harness Decision and First Logic Tests

Status: Done

Priority: Medium

Goal:

Decide whether to introduce a small test dependency and add first focused tests for core local logic if approved.

Branch:

`feature/t0019-no-dependency-logic-tests`

Dependencies:

- T0018 - Local Backup and Restore
- T0018B - Reference UI Clone Pass

Allowed areas:

- `src/app.js`
- `tests/`
- ticket, state, and decision docs

Do not touch:

- Do not add dependencies without explicit approval.
- Do not add backend, auth, database, deployment, or external services.
- Do not refactor UI layout or product behavior beyond testability guards.

Requirements:

- Decide whether to add a test dependency.
- Add first focused tests for core local logic without changing browser behavior.
- Cover priority suggestion, duplicate scoring, normalization, backup validation, and municipal summary counts.
- Keep checks runnable with a simple command and no install step.

Acceptance criteria:

- Dependency decision is documented.
- First focused logic tests exist and run locally.
- Browser initialization remains guarded so `src/app.js` can be loaded in Node tests.
- No dependency, backend, auth, deployment, or external service is added.

Automated checks:

- `node --check src/app.js`
- `node tests/app.test.js`
- `git diff --check`

Manual verification:

1. Open `src/index.html`.
2. Confirm normal browser rendering still starts.
3. Run `node tests/app.test.js`.
4. Confirm all tests pass.

Completion notes:

- T0019 chose the no-dependency path because new package dependencies were not explicitly approved.
- Added `tests/app.test.js` using Node's built-in `node:assert/strict`.
- Added a document guard and CommonJS exports for selected core logic in `src/app.js`.
- Tests cover priority suggestion, duplicate scoring, issue normalization, backup validation, and municipal summary counts.
- No dependency, backend, auth, deployment, or external service was added.

## T0018A - Indian Civic Panel UI Refresh

Status: Done

Priority: High

Goal:

Refresh the UI/UX toward a modern, streamlined, quick-panel interface that feels associated with Indian civic bodies without using fake official marks.

Branch:

`feature/t0018a-indian-civic-ui-refresh`

Dependencies:

- T0018 - Local Backup and Restore

Allowed areas:

- `src/index.html`
- `src/styles.css`
- `docs/UI_UX_Design_Direction.md`
- `docs/design-references/`
- ticket, state, and verification docs

Do not touch:

- Do not add backend, auth, database, deployment, external services, or new dependencies.
- Do not add fake government seals, Ashoka emblems, official logos, political symbols, or flag-as-logo treatment.
- Do not change issue storage, import/export behavior, or triage business logic.

Requirements:

- Save the generated Indian civic panel UI concept into project design references.
- Update design docs to make the new panel refresh the current visual direction.
- Make the app feel more modern, streamlined, and panel-based.
- Use tasteful Indian civic color cues: deep green, saffron/orange, teal, off-white, charcoal, and limited sky-blue accents.
- Reduce the overfilled feeling through better section grouping, quick panels, and denser navigation.
- Preserve existing workflows and controls.

Acceptance criteria:

- App opens with a more modern Indian civic panel aesthetic.
- Header and quick panels communicate ward desk, reporting, triage, open issues, and backup/summary controls.
- Existing report, issue queue, dashboard, detail, export, backup, and restore workflows remain present.
- No official emblem, fake seal, political symbol, backend, dependency, or external service is added.

Automated checks:

- `node --check src/app.js`
- `git diff --check`

Manual verification:

1. Open `src/index.html`.
2. Confirm the UI reads as modern, streamlined, and Indian civic without fake official marks.
3. Confirm report, issue queue, dashboard, summary, backup, and restore controls remain usable.
4. Check desktop and mobile widths for no overlap or clipped controls.
5. Check browser console for errors.

Completion notes:

- Saved the generated Indian civic panel UI concept as `docs/design-references/ui-ux-indian-civic-panel-refresh-001.png`.
- Updated `docs/UI_UX_Design_Direction.md` to make the panel refresh the current visual direction.
- Refreshed the app shell with a ward-desk header, quick action panels, warmer civic colors, rounded panel treatments, and clearer municipal language.
- Preserved existing workflows and did not add dependencies, backend, official marks, fake seals, or external services.

## T0018B - Reference UI Clone Pass

Status: Done

Priority: High

Goal:

Make the app UI closely match the user-provided Indian civic dashboard screenshot while preserving the local prototype functionality.

Branch:

`feature/t0018b-reference-ui-clone`

Dependencies:

- T0018A - Indian Civic Panel UI Refresh

Allowed areas:

- `src/index.html`
- `src/app.js`
- `src/styles.css`
- ticket, state, and verification docs

Do not touch:

- Do not add backend, auth, database, deployment, external services, or new dependencies.
- Do not add fake government seals, official logos, political symbols, or official-record claims.
- Do not remove report, queue, dashboard, detail, export, backup, or restore workflows.

Requirements:

- Match the screenshot's compact top chrome, hamburger control, brand title, ward selector, operator card, left navigation, three-column operations desk, and bottom quick actions bar.
- Map screenshot controls onto existing local functionality.
- Keep the UI panel-based and avoid overfilled sections.
- Preserve existing JavaScript behavior and local-only constraints.

Acceptance criteria:

- App layout strongly resembles the supplied screenshot.
- Report form, open issues, triage overview, detail, backup/import, and summary/export controls remain available.
- No dependency, backend, auth, external service, official emblem, or fake official identity is added.

Automated checks:

- `node --check src/app.js`
- `git diff --check`
- Static reference UI selector check.

Manual verification:

1. Open `src/index.html`.
2. Compare the layout against the supplied screenshot.
3. Confirm the top chrome, left sidebar, three work panels, and bottom quick actions are present.
4. Confirm report, queue, dashboard, detail, export, backup, and restore workflows still work.
5. Check desktop and mobile widths for no overlap or clipped controls.
6. Check browser console for errors.

Completion notes:

- Reworked the app shell to closely follow the supplied reference screenshot.
- Added screenshot-like top chrome, ward selector, skyline strip, operator card, left sidebar, three-column operations workspace, compact open issue cards, triage overview metrics, and bottom quick actions dock.
- Existing local workflows remain mapped into the cloned layout.
- Corrective pass fixed narrow-width panel squeezing by adding safer breakpoints and compact report guidance tiles.

## T0020 - Backend Readiness Design

Status: Done

Priority: High

Goal:

Prepare backend, data, audit, auth-assumption, and API boundary design without implementing backend code.

Branch:

`feature/t0020-backend-readiness-design`

Dependencies:

- T0019 - Test Harness Decision and First Logic Tests

Allowed areas:

- `docs/Backend_Readiness_Design.md`
- architecture, ticket, risk, state, and handoff docs

Do not touch:

- Do not implement backend code.
- Do not add database, auth, deployment, external services, secrets, dependencies, or migrations.
- Do not change current local app behavior.

Requirements:

- Document backend responsibility boundaries.
- Document data ownership and proposed entities.
- Document auth assumptions and unresolved identity decisions.
- Document API boundary draft.
- Document audit, privacy, storage, migration, and implementation risks.
- List future human-gated implementation tickets.

Acceptance criteria:

- Backend readiness design exists.
- Design clearly states that no backend implementation is included.
- Auth, database, deployment, maps, photo evidence, official exports, and audit logging remain human-gated.
- T0021+ follow-up tickets are identified for future planning.

Automated checks:

- `node --check src/app.js`
- `node tests/app.test.js`
- `git diff --check`

Manual verification:

1. Read `docs/Backend_Readiness_Design.md`.
2. Confirm it contains no implementation instructions that bypass human approval.
3. Confirm future backend/auth/database/deployment work is explicitly gated.

Completion notes:

- Added `docs/Backend_Readiness_Design.md`.
- Documented proposed backend responsibilities, data ownership, API boundaries, validation, audit design, privacy rules, storage options, migration path, risks, human review triggers, and follow-up tickets.
- No backend code, database, auth, deployment, external service, dependency, secret, or migration was added.

## T0021 - Backend Architecture Decision Record

Status: Ready for Agent

Priority: High

Goal:

Create an architecture decision record for backend direction, options, trade-offs, and required product-owner decisions before implementation.

## T0022 - Citizen Identity Policy Decision

Status: Planned

Priority: High

Goal:

Decide whether citizen reporting remains anonymous, contact-optional, or account-based.

## T0023 - Staff Role And Permission Model

Status: Planned

Priority: High

Goal:

Define municipal staff roles, permissions, and audit identity expectations before backend implementation.
