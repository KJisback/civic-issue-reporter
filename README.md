# Civic Issue Reporter

A civic issue reporting and resolution platform for citizens and municipal teams.

The MVP will let citizens report local issues with category, location, description, and photo evidence, then let administrators triage, prioritize, assign, and resolve those reports through a dashboard.

## Current Status

T0001 through T0016 are complete.

The current version is a no-dependency static prototype with local browser storage, citizen reporting, triage controls, local municipal team assignment labels, duplicate review actions, issue details, dashboard operational analytics, local export/print summary support, a first accessibility/keyboard hardening pass, a UI snapshot fidelity pass against the saved concept sheet, and privacy-safe photo evidence placeholders without upload or storage.

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
- Use `Print summary` to open the browser print dialog.
- Use `docs/Manual_UI_Checks.md` for the full browser/manual UI checklist.
- Confirm the browser console has no errors.

## Next Ticket

T0017 - Local Activity Timeline

## Development Plan

See `docs/Development_Plan.md` for the process coverage review and next ticket sequence.

## Git Status

Git is initialized locally and connected to GitHub. See `docs/Git_Setup_Recovery.md` for host-specific Git/GitHub command notes.
