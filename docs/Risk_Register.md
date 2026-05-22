# Risk Register

## R0001 - Location Privacy

Severity: Medium

Description:

Civic reports may contain precise location data, photos, and contextual clues about private citizens.

Mitigation:

Start with plain location text, optional manual coordinates, non-uploading photo placeholders, and avoid external maps, device geolocation, or real photo storage until privacy decisions are made.

Status: Open

## R0002 - False or Duplicate Reports

Severity: Medium

Description:

Crowdsourced reports may be duplicated, inaccurate, malicious, or spammy.

Mitigation:

T0005 adds explainable local duplicate hints. T0009 adds local review actions for needs review, linked, and dismissed. Later tickets should add real merge behavior, staff identity, and audit trails only after backend and identity decisions are approved.

Status: Open

## R0003 - Admin Authority Assumption

Severity: Low

Description:

The prototype may imply municipal authority or real resolution ability.

Mitigation:

Keep demo wording focused on prototype workflow until real stakeholder integrations exist.

Status: Open

## R0004 - Local Export Misread as Official Record

Severity: Low

Description:

The browser-generated JSON export may be mistaken for an official municipal record or secure audit artifact.

Mitigation:

Keep export wording local and demo-oriented until production reporting, retention, signing, and audit requirements are approved.

Status: Open

## R0005 - Accessibility Gaps in Static MVP

Severity: Medium

Description:

The app has several interactive controls and dynamic regions that may have keyboard, focus, status announcement, or mobile text containment issues.

Mitigation:

T0012 added skip navigation, stronger visible focus, clearer control names, error associations, live-region improvements, focus restoration, and text containment rules. Complete the remaining manual browser checklist before accepting the next UI milestone.

Status: Reduced after T0012; manual browser verification remains open
# Risk Register

## R0001 - Backend Decisions May Expose Privacy And Audit Risk

Status: Open

Severity: High

Description:

Future backend implementation could accidentally turn browser-local demo behavior into official persistence, audit logging, or public records before product-owner policies are approved.

Mitigation:

Use `docs/Backend_Readiness_Design.md` as the gate for backend planning. Require explicit approval before auth, database, deployment, official exports, map providers, photo storage, or audit logging implementation.

Owner:

Product owner

Decision needed by:

Before any backend implementation ticket.
