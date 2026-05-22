# Decision Log

## D0001 - Start With No-Dependency Static Skeleton

Date: 2026-05-20

Status: Accepted

Decision:

Begin with plain HTML, CSS, and JavaScript.

Reason:

This avoids early dependency approval and creates a quick, inspectable foundation for the controlled ticket workflow.

Consequences:

- Faster initial start.
- No package install required.
- A future ticket can introduce a framework if justified.

## D0002 - Keep First Logic Tests Dependency-Free

Date: 2026-05-22

Status: Accepted

Decision:

Use Node's built-in `node:assert/strict` module for the first focused logic tests instead of introducing a package dependency.

Reason:

T0019 needed first coverage for core local logic, but dependency changes require explicit approval. A no-dependency test file preserves the static app setup and still verifies important pure behavior.

Consequences:

- `node tests/app.test.js` runs without install steps.
- Tests cover priority suggestion, duplicate scoring, issue normalization, backup validation, and municipal summary counts.
- Future richer browser or DOM testing can be proposed separately if approved.
