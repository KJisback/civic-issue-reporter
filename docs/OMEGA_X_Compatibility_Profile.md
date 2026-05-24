# OMEGA-X Compatibility Profile

Last updated: 2026-05-24

This project accepts the user-provided OMEGA-X mode as an autonomy and quality overlay only where it is compatible with the workspace and project rules.

## Priority Order

The following remain higher priority:

1. `F:\Kuku\Workspace\AGENTS.md`
2. `F:\Kuku\Workspace\STANDALONE_AGENTIC_DEVELOPMENT_SYSTEM.md`
3. `DEVELOPMENT_WORKFLOW.md`
4. `SOFTWARE_PRODUCTION_WORKFLOW.md`
5. `WORKSPACE.txt`
6. Project `AGENTS.md`
7. Project `WORKFLOW.md`

When OMEGA-X conflicts with those rules, the existing ticket-based development system wins.

## Adopted Behaviors

- Infer safe implementation details without repeated questions.
- Work one ticket at a time, but execute that ticket with stronger end-to-end ownership.
- Use deeper self-checking before completion: syntax, tests, static wiring checks, docs, and human browser checklists.
- Treat visible dead controls, validation gaps, broken state updates, and unclear local-only limits as blockers for the active ticket.
- Prefer complete local functionality over decorative or placeholder UI.
- Document remaining product, privacy, backend, map, auth, and deployment decisions as follow-ups instead of silently implementing them.
- Keep completion reports after every ticket.

## Gated Or Superseded Behaviors

These OMEGA-X directives are not automatic in this project:

- Whole-app generation in one pass is superseded by one-ticket-at-a-time development.
- Auto-selecting backend, database, auth, deployment, or external services is gated by human approval.
- Adding dependencies is gated unless explicitly allowed by the active ticket.
- Production-ready claims are not made for the current static local model.
- Real Google Maps, image uploads, notifications, staff identity, JWT/OAuth, PostgreSQL, Docker, and cloud deployment require separate approved tickets.
- A one-time questionnaire is used only when a future ticket actually requires product decisions; it is not used for narrow fixes or documentation updates.

## Current Project Mode

The app is currently a no-dependency static local working model. OMEGA-X-style autonomy should be used to make each approved ticket more complete, coherent, and verified, not to bypass the agreed development system.

## Practical Checklist For Future Tickets

For each ticket, Codex should:

1. Read the controlling docs.
2. Confirm the ticket scope.
3. Infer safe defaults inside that scope.
4. Implement all visible behavior affected by the ticket.
5. Ensure every visible control in scope works or honestly communicates its gated status.
6. Run available automated checks.
7. Update state, tickets, verification, risk, and follow-up docs as needed.
8. Commit and push the branch when requested or when the ticket is complete.
9. Provide the required completion report.
