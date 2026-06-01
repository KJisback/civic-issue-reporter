# Civic Issue Reporter

A civic issue reporting and resolution platform for citizens and municipal teams.

The MVP will let citizens report local issues with category, location, description, and photo evidence, then let administrators triage, prioritize, assign, and resolve those reports through a dashboard.

## Current Status

T0001 through T0020 are complete locally.

The current version is a no-dependency static MVP with local browser storage, citizen reporting, triage controls, team assignment labels, duplicate review actions, issue details, activity timelines, photo-evidence placeholders, dashboard analytics, local export/print summary support, full local backup/restore, no-dependency logic checks, and backend readiness documentation.

## Run Locally

Open `src/index.html` in a browser.

No install step is required.

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
- Use `Export JSON` to download a local summary.
- Use `Backup data` and `Restore backup` to verify local backup/restore.
- Use `Print summary` to open the browser print dialog.
- Run `node checks/local-logic-check.js`.
- Use `docs/Manual_UI_Checks.md` for the full browser/manual UI checklist.
- Confirm the browser console has no errors.

## Next Ticket

No further local-only implementation ticket is currently ready. Backend, auth, database, deployment, external maps, and real uploads require explicit approval before implementation.

## Development Plan

See `docs/Development_Plan.md` for the process coverage review and next ticket sequence.

## Git Status

Git is initialized locally and connected to GitHub. See `docs/Git_Setup_Recovery.md` for host-specific Git/GitHub command notes.
