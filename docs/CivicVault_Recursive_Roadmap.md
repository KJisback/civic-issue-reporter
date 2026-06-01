# CivicVault Recursive Roadmap

Last updated: 2026-06-01

## Product North Star

CivicVault should become a marketable civic issue vault for hackathons, municipal demos, and pitch decks. It should feel like a complete document-vault product for civic reports while staying clearly independent from DigiLocker and any government identity system unless a future official integration is approved.

## Guardrails

- Use DigiLocker-style information architecture only as inspiration.
- Do not copy DigiLocker branding, logos, government marks, or official-service claims.
- Keep the saffron CivicVault visual system.
- Preserve a no-dependency static demo path until a backend phase is approved.
- Treat identity, uploads, maps, notifications, official records, and government integrations as approval-gated work.

## Iteration Loop

Each recursive pass should follow the same cycle:

1. Pick the highest-impact product gap from the roadmap.
2. Implement the smallest complete local-only version.
3. Update checks and manual verification steps.
4. Run `npm test`, `npm run check`, and `git diff --check`.
5. Publish through GitHub and refresh GitHub Pages.
6. Record the next gap in `docs/Tickets.md` and `docs/Repo_Current_State.md`.

## Planned Passes

### T0022 - CivicVault Document Modules Pass

Add local-only modules for issued reports, uploaded evidence placeholders, municipal services, recent activity, and report retrieval.

### T0023 - Pitch and Hackathon Demo Mode

Add demo scenarios, demo metrics, screenshot-ready copy, and shareable local summaries that make the product usable in hackathons and pitch decks.

### T0024 - Search and Retrieve Report Flow

Add vault-style search by report ID, title, category, location, status, priority, and assigned team.

### T0025 - Report Detail Vault Page

Upgrade the detail panel into a more complete report record view with timeline, evidence placeholders, duplicate decisions, location metadata, assignment, and export actions grouped like a record dossier.

### T0026 - Release and Pages Automation

Document and script the GitHub Pages publish flow so releases are repeatable.

### T0027 - Backend Pilot Decision

After approval, choose auth, database, hosting, map provider, upload storage, audit model, and privacy rules. Only then start backend implementation.

## Marketable Product Themes

- Citizen trust: simple reporting, transparent status, local-language-ready labels.
- Municipal operations: triage, ownership, duplicate review, activity history, and exportable summaries.
- Pitch readiness: clear metrics, repeatable demo data, screenshot-friendly states, and a realistic backend migration plan.
- Privacy posture: no hidden network calls in the static MVP and explicit approval gates for sensitive features.
