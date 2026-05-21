# Manual UI Checks

Last updated: 2026-05-21

Use this checklist after UI tickets and before accepting a milestone. Check items manually in a browser because the current project has no automated browser test harness.

## Baseline Setup

- [ ] Open `src/index.html` directly in a browser.
- [ ] Open browser developer tools.
- [ ] Confirm the console has no errors on first load.
- [ ] Click `Reset demo data`.
- [ ] Confirm sample reports, metrics, dashboard, summary, and issue queue render.

## Desktop Layout

- [ ] Confirm top navigation links work: `Report`, `Issues`, `Dashboard`, `Summary`.
- [ ] Confirm sidebar links work: `Report issue`, `Open reports`, `Dashboard`, `Triage`, `Watchlist`, `Summary`.
- [ ] Compare the citizen guidance cards, report form, public report rows, dashboard, and detail header against the saved concept sheet.
- [ ] Confirm the citizen report form fits without clipped labels or controls.
- [ ] Confirm the admin dashboard metrics and workflow summary are readable.
- [ ] Confirm the issue queue cards are compact, readable, and not overlapping.
- [ ] Confirm the local ward map-preview rail is readable and does not imply a real map provider.
- [ ] Confirm the detail panel opens below the issue queue.
- [ ] Confirm the municipal review summary is readable.
- [ ] Confirm no page section uses card-inside-card styling in a way that hurts scanning.

## Mobile Layout

- [ ] Resize to a narrow mobile-width viewport.
- [ ] Confirm the report form stacks cleanly.
- [ ] Confirm field labels, validation text, and buttons do not overlap.
- [ ] Confirm issue cards stack cleanly and preserve readable controls.
- [ ] Confirm the detail panel stacks cleanly.
- [ ] Confirm duplicate review controls fit within the viewport.
- [ ] Confirm summary stat blocks and table rows do not clip text.
- [ ] Confirm navigation remains usable without horizontal page overflow.

## Report Form

- [ ] Submit with blank required fields.
- [ ] Confirm title, location, and description validation messages are readable.
- [ ] Confirm the photo evidence placeholder states photos are not uploaded, stored, exported, or sent anywhere.
- [ ] Confirm there is no file picker or upload button.
- [ ] Enter invalid latitude outside `-90` to `90`.
- [ ] Enter invalid longitude outside `-180` to `180`.
- [ ] Confirm coordinate validation messages are readable.
- [ ] Submit a valid report with title, category, location, ward, landmark, description, and optional coordinates.
- [ ] Confirm the new report appears at the top of the queue.
- [ ] Reload the page and confirm the report persists.

## Local Assistance

- [ ] Type safety wording such as `unsafe`, `blocked`, or `school`.
- [ ] Confirm priority assistance updates before submit.
- [ ] Submit a report similar to an existing report.
- [ ] Confirm a duplicate hint appears when the local heuristic finds a match.
- [ ] Confirm assistance does not require network access, AI, or external APIs.

## Triage Controls

- [ ] Change issue status from `Submitted` to `Triaged`.
- [ ] Change issue status to `In progress`.
- [ ] Change issue status to `Resolved`.
- [ ] Change priority to `High`, `Medium`, and `Low`.
- [ ] Change assigned team from `Unassigned` to a municipal team.
- [ ] Confirm status and priority chips update immediately.
- [ ] Confirm assigned team labels update in the issue card and detail panel.
- [ ] Reload and confirm status and priority persist.
- [ ] Reload and confirm assigned team persists.
- [ ] Confirm metrics and workflow summary update after changes.

## Filters

- [ ] Filter by category.
- [ ] Filter by status.
- [ ] Filter by priority.
- [ ] Confirm queue count updates.
- [ ] Confirm empty state appears when no issue matches.
- [ ] Reset filters or demo data and confirm the queue returns.

## Issue Detail

- [ ] Open an issue with `View details`.
- [ ] Confirm title, category, status, priority, description, location, reported date, and updated date render.
- [ ] Confirm the photo evidence placeholder remains non-uploading and privacy-safe.
- [ ] Confirm the status timeline highlights the current status.
- [ ] Change status and priority from the detail panel.
- [ ] Confirm the issue card and detail panel stay in sync.
- [ ] Close and reopen the detail panel.
- [ ] Reload and confirm the selected issue data still renders.

## Duplicate Review

- [ ] Open an issue with duplicate hints.
- [ ] Mark a hint as `Linked`.
- [ ] Confirm the detail tag and issue card summary update.
- [ ] Mark the same hint as `Dismissed`.
- [ ] Mark it back to `Needs review`.
- [ ] Reload and confirm the latest duplicate review state persists.

## Summary, Export, and Print

- [ ] Open the `Summary` section.
- [ ] Confirm total reports, open reports, high priority reports, map-ready reports, and duplicate hints needing review render.
- [ ] Change an issue status or priority.
- [ ] Change an issue assigned team.
- [ ] Confirm the summary updates.
- [ ] Click `Export JSON`.
- [ ] Confirm a local JSON file downloads and includes assigned team labels.
- [ ] Click `Print summary`.
- [ ] Confirm the browser print dialog opens.
- [ ] Confirm print preview focuses on the municipal summary rather than the full working UI.

## Keyboard and Accessibility

- [ ] Press `Tab` from the address bar and confirm the skip link appears before the main navigation.
- [ ] Use only the keyboard to move from the top navigation through the report form.
- [ ] Continue keyboard navigation through dashboard, summary, filters, issue cards, detail panel, duplicate review controls, and export/print actions.
- [ ] Confirm focus is visible on links, buttons, fields, and select controls.
- [ ] Confirm controls have clear visible labels.
- [ ] Confirm dynamic status text is close to the control that triggered it.
- [ ] Confirm validation messages are not color-only.
- [ ] Submit the blank report form and confirm focus moves to the first invalid field.
- [ ] Open issue detail with the keyboard and confirm focus moves to the detail panel.
- [ ] Press `Escape` in the detail panel and confirm focus returns to the original `View details` button.

## Final Pass

- [ ] Run `node --check src/app.js`.
- [ ] Confirm no browser console errors after the full smoke pass.
- [ ] Record any failures in `docs/Known_Issues_And_Followups.md`.
