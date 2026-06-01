# CivicVault

A saffron civic issue vault for citizens and municipal teams.

The MVP lets citizens report local issues with category, location, description, and evidence placeholders, then lets municipal teams triage, prioritize, assign, audit, export, and resolve those reports through a DigiLocker-inspired document-vault interface.

## Current Status

T0001 through T0023 are complete locally.

The current version is a no-dependency static MVP with saffron CivicVault UI, local browser storage, citizen reporting, document-vault modules, pitch demo scenarios, triage controls, team assignment labels, duplicate review actions, issue details, activity timelines, photo-evidence placeholders, dashboard analytics, local export/print summary support, full local backup/restore, no-dependency logic checks, and backend readiness documentation.

## Run Locally

Open `src/index.html` in a browser.

No install step is required.

Optional command checks use Node only:

```sh
npm test
npm run check
```

## Project Structure

```text
civic-issue-reporter/
  AGENTS.md
  WORKFLOW.md
  README.md
  package.json
  checks/
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
- Run `node checks/static-ui-check.js`.
- Run `node checks/local-logic-check.js`.
- Or run `npm test`.
- Use `docs/Manual_UI_Checks.md` for the full browser/manual UI checklist.
- Confirm the browser console has no errors.

## Next Ticket

T0024 - Search and Retrieve Report Flow. Backend, auth, database, deployment, external maps, and real uploads require explicit approval.

## Development Plan

See `docs/Development_Plan.md` for the process coverage review and next ticket sequence.

## Git Status

Git is initialized locally and connected to GitHub. See `docs/Git_Setup_Recovery.md` for host-specific Git/GitHub command notes.
