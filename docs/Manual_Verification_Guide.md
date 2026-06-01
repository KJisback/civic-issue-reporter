# Manual Verification Guide

## T0001 - Project Skeleton

1. Open `src/index.html` in a browser.
2. Confirm the title and navigation render.
3. Confirm the report form renders.
4. Confirm sample issue cards render.
5. Confirm metrics render.
6. Open browser developer tools.
7. Confirm there are no console errors.

## Baseline Future Checks

For feature tickets:

1. Open the app locally.
2. Exercise the changed workflow.
3. Check for console errors.
4. Confirm mobile layout at a narrow viewport.
5. Confirm acceptance criteria one by one.

## End-To-End Smoke Pass

Use this before larger design, data, or release changes.

1. Open `src/index.html` in a browser.
2. Click `Reset demo data`.
3. Submit a new issue with title, category, location, area, landmark, description, and optional coordinates.
4. Confirm the new issue appears at the top of the queue.
5. Confirm local assistance appears while typing.
6. Confirm metrics, location readiness, and workflow summary update.
7. Change the new issue status and priority.
8. Reload the page.
9. Confirm the issue, status, priority, location context, priority reason, and duplicate hints persist.
10. Use category, status, and priority filters.
11. Resize to a mobile-width viewport.
12. Confirm no text overlap or broken controls.
13. Open browser developer tools and confirm there are no console errors.

## T0002 - Local Issue Data Model and Browser Storage

1. Open `src/index.html` in a browser.
2. Submit a valid issue with title, category, location, and description.
3. Confirm the issue appears at the top of the issue list.
4. Reload the page.
5. Confirm the submitted issue is still present.
6. Submit the form with title, location, or description missing.
7. Confirm the field-level validation messages are readable.
8. Click `Reset demo data`.
9. Confirm the original sample issues return.
10. Check the browser console for errors.

## T0003 - Admin Triage and Status Workflow

1. Open `src/index.html` in a browser.
2. Change an issue status from `Submitted` to `Triaged`.
3. Change an issue priority from `Low` or `Medium` to `High`.
4. Confirm the card chips update immediately.
5. Reload the page.
6. Confirm the status and priority changes persist.
7. Use the category, status, and priority filters.
8. Confirm the issue list and queue count update.
9. Confirm the workflow summary counts update after status changes.
10. Click `Reset demo data` and confirm filters and sample data reset.

## T0004 - Map-Ready Location Experience

1. Open `src/index.html` in a browser.
2. Submit an issue with location summary, ward or area, nearby landmark, latitude, and longitude.
3. Confirm the issue card displays area, landmark, and coordinates.
4. Reload the page.
5. Confirm the map-ready location fields persist.
6. Submit an issue without latitude and longitude.
7. Confirm it is accepted and displays `Coordinates not added`.
8. Try latitude outside `-90` to `90`.
9. Try longitude outside `-180` to `180`.
10. Confirm validation messages are readable.
11. Confirm no browser location permission prompt appears.
12. Confirm the location readiness preview updates.

## T0005 - Duplicate and Priority Assistance

1. Open `src/index.html` in a browser.
2. Start typing a report with safety wording such as `unsafe`, `school`, or `blocked`.
3. Confirm the local assistance panel suggests `High` priority with an explainable reason.
4. Submit a report with a similar category and location to an existing issue.
5. Confirm the submitted issue shows a possible duplicate hint.
6. Change the issue priority manually.
7. Confirm the priority note says it was manually adjusted by staff.
8. Reload the page.
9. Confirm priority reasons and duplicate hints persist.
10. Confirm no network request, AI service, or external dependency is required.

## T0006 - Apply Minimal Civic UI Direction

1. Open `src/index.html` in a browser.
2. Confirm the page has a calm civic layout with sidebar navigation, hero summary, report form, dashboard, and issue queue.
3. Confirm the issue queue is compact and scannable.
4. Confirm report form fields remain readable and usable.
5. Resize to a mobile-width viewport.
6. Confirm the layout stacks without text overlap.
7. Submit a report and confirm existing T0002-T0005 behavior still works.
8. Check the browser console for errors.

## T0007 - Manual Verification Pass and Backlog Refresh

1. Confirm `docs/Tickets.md` lists the current next ticket as ready.
2. Confirm `docs/Repo_Current_State.md` matches completed tickets.
3. Confirm `docs/Prompt_Context_Pack.md` points to the same next ticket as repo state.
4. Run `node --check src/app.js`.
5. Complete the End-To-End Smoke Pass manually in a browser when possible.

## T0008 - Issue Detail and Timeline View

1. Open `src/index.html` in a browser.
2. Click `View details` on any issue.
3. Confirm the detail panel opens below the issue queue.
4. Confirm it shows title, category, status, priority, description, location context, priority explanation, and duplicate hints when present.
5. Confirm the status timeline highlights the current status.
6. Change status or priority in the detail panel.
7. Confirm the issue card and detail panel update.
8. Close the detail panel.
9. Reopen the same issue and confirm state is preserved.
10. Reload and confirm locally stored issue details still render.

## T0009 - Duplicate Review Actions

1. Open `src/index.html` in a browser.
2. Submit a report similar enough to an existing issue to create a duplicate hint.
3. Open the new report detail panel.
4. Confirm each duplicate hint has a review action control.
5. Mark a hint as `Linked`.
6. Confirm the detail panel status tag and issue card duplicate summary update.
7. Mark the same hint as `Dismissed`.
8. Mark it back to `Needs review`.
9. Reload the page.
10. Confirm the latest duplicate review state persists.
11. Check the browser console for errors.

## T0010 - Export and Print Summary

1. Open `src/index.html` in a browser.
2. Click the `Summary` navigation link.
3. Confirm the municipal review summary shows total reports, open reports, high priority reports, map-ready reports, and duplicate hints needing review.
4. Change an issue status or priority.
5. Confirm the summary counts update.
6. Click `Export JSON`.
7. Confirm a local JSON summary file downloads.
8. Click `Print summary`.
9. Confirm the browser print dialog opens.
10. Confirm print preview focuses on the municipal summary rather than the full working UI.
11. Check the browser console for errors.

## T0011 - Backlog Refresh and Next Handoff

1. Confirm `docs/Tickets.md` marks T0011 as done.
2. Confirm `docs/Repo_Current_State.md` lists T0012 as the next recommended ticket.
3. Confirm `docs/Prompt_Context_Pack.md` lists T0012 as the current next ticket.
4. Confirm known follow-ups include export record policy and accessibility pass items.
5. Run `node --check src/app.js`.

## T0011A - Git Repository Initialization and Manual UI Checklist

1. Confirm `.git/` exists in the project folder.
2. Confirm `.gitignore` exists and excludes secrets, dependency folders, local database files, and exported JSON summaries.
3. Confirm `docs/Manual_UI_Checks.md` exists.
4. Run `git status --short`.
5. Confirm the working tree is clean after the local commit.
6. Run `git log --oneline -1`.
7. Confirm the latest commit is the initial project commit.
8. Confirm GitHub CLI is authenticated before attempting a remote push.

## T0012 - Accessibility and Keyboard Verification Pass

1. Open `src/index.html`.
2. Use only keyboard navigation from the top of the page through report form, dashboard, summary, issue filters, issue cards, detail panel, duplicate review controls, and export/print actions.
3. Confirm focus is visible at every step.
4. Use the skip link and confirm it moves focus to the report form area.
5. Submit invalid form data and confirm focus moves to the first invalid field.
6. Confirm validation messages are readable and associated with the affected fields.
7. Open and close an issue detail panel by keyboard.
8. Confirm detail focus moves into the panel on open and returns to the originating `View details` button on close.
9. Change filters and triage controls, then confirm queue/status updates remain understandable.
10. At a mobile-width viewport, confirm controls and text do not overlap or clip.
11. Run the T0010 export/print smoke steps.
12. Check browser console for errors.

## T0013-T0018 - Finished Local MVP Polish

1. Open `src/index.html`.
2. Confirm the public issue feed uses compact rows with category marks, team labels, photo placeholders, location context, and triage controls.
3. Open an issue detail panel and confirm report context, photo placeholders, workflow timeline, activity timeline, duplicate review, and team assignment render.
4. Change status, priority, team assignment, and duplicate review state.
5. Confirm the issue card, detail panel, analytics snapshot, workflow board, and summary update.
6. Reload the page and confirm status, priority, team assignment, duplicate review state, and activity timeline persist.
7. Confirm the dashboard shows priority queue, status mix, team load, stale/open indicators, and location readiness.
8. Click `Backup data` and confirm a full local backup JSON downloads.
9. Restore a valid backup JSON and confirm the app replaces the current browser reports after validation.
10. Try restoring invalid JSON and confirm an understandable error appears without replacing current data.
11. At desktop and mobile widths, confirm text and controls do not overlap or clip.
12. Run `node --check src/app.js`.

## T0019 - No-Dependency Logic Checks

1. Run `node --check src/app.js`.
2. Run `node checks/local-logic-check.js`.
3. Run `node checks/static-ui-check.js`.
4. Run `npm test`.
5. Run `npm run check`.
6. Confirm the checks report `local logic checks passed` and `static ui checks passed`.
7. Confirm no dependency install is required and `package.json` lists no runtime or development dependencies.

## T0020 - Backend Readiness Design

1. Open `docs/Backend_Readiness_Design.md`.
2. Confirm it documents future API boundaries, storage model, audit expectations, privacy gates, migration notes, and approval requirements.
3. Confirm no backend, auth, database, deployment, external map, notification, or upload code was added.

## T0021 - Saffron CivicVault Shell

1. Open `src/index.html`.
2. Confirm the browser title and top identity use `CivicVault`.
3. Confirm the first viewport uses a saffron-led palette, compact top bar, and vault-style sidebar.
4. Confirm navigation labels include Home, Report vault, New report, Municipal services, Activity, and Backup and exports.
5. Confirm no DigiLocker logo, government seal, or official-service claim appears.
6. Submit a report and confirm it appears in Verified local reports.
7. Change status, priority, team assignment, and duplicate review state.
8. Confirm dashboard, activity timelines, summary, backup, restore, print, and JSON export still work.
9. Resize to a mobile-width viewport and confirm text and controls do not overlap or clip.
10. Run `npm test` and `npm run check`.
