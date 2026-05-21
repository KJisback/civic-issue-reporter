# AGENTS.md

Project rules for Civic Issue Reporter.

Workspace-level rules in `F:\Kuku\Workspace\AGENTS.md` and `F:\Kuku\Workspace\STANDALONE_AGENTIC_DEVELOPMENT_SYSTEM.md` take priority. This file adds project-specific guardrails.

## Role

Codex is a scoped implementation worker for one ticket at a time.

## Rules

- Implement only the assigned ticket.
- Do not implement future-ticket features early.
- Do not refactor unrelated files.
- Do not add dependencies unless the ticket explicitly allows them.
- Do not add auth, production deployment, payments, real user tracking, or external services without human approval.
- Do not collect sensitive personal data in the MVP.
- Keep citizen-facing flows simple, accessible, and mobile-friendly.
- Prefer explainable triage and priority rules over opaque automation.
- Keep municipal/admin workflows auditable.

## Completion Report

Every implementation report must include:

- summary of changes
- files changed
- commands run
- automated check results
- manual verification
- acceptance criteria status
- risks or concerns
- suggested follow-up tickets
- docs to update
- final status
