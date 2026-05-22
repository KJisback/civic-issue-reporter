# Civic Issue Reporter

A civic issue reporting and resolution platform for citizens and municipal teams.

The MVP will let citizens report local issues with category, location, description, and photo evidence, then let administrators triage, prioritize, assign, and resolve those reports through a dashboard.

## Current Status

T0001 through T0018 and T0018A are complete.

The current version is a no-dependency static prototype with a modern Indian civic panel UI, local browser storage, citizen reporting, triage controls, local municipal team assignment labels, duplicate review actions, issue details with local activity events, dashboard operational analytics, local export/print summary support, full local backup/restore, a first accessibility/keyboard hardening pass, and privacy-safe photo evidence placeholders without upload or storage.

## Run Locally

Open `src/index.html` in a browser.

No install step is required for T0001.

## Project Structure

```text
civic-issue-reporter/
  AGENTS.md
  WORKFLOW.md
  README.md
  docs/
  src/
    index.html
    styles.css
    app.js
```

## Verification

- Open `src/index.html`.
- Confirm the report form, issue cards, and metrics render.
- Confirm the summary section renders.
- Confirm keyboard focus is visible across navigation, forms, buttons, selects, issue detail, and export/print controls.
- Use `Export JSON` to download a local summary.
- Use `Export backup` and `Import backup` to test full local data portability.
- Use `Print summary` to open the browser print dialog.
- Use `docs/Manual_UI_Checks.md` for the full browser/manual UI checklist.
- Confirm the browser console has no errors.

## Next Ticket

T0019 - Test Harness Decision and First Logic Tests

## Development Plan

See `docs/Development_Plan.md` for the process coverage review and next ticket sequence.

## Git Status

Git is initialized locally and connected to GitHub. See `docs/Git_Setup_Recovery.md` for host-specific Git/GitHub command notes.
