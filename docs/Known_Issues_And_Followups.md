# Known Issues And Followups

Last reviewed: 2026-05-22 during the full system test pass recorded in `docs/Full_System_Test_Report.md`.

Review result:

No open follow-up can be closed by code alone at this point. Remaining open items are either product-owner decisions or human browser verification tasks.

## Open Followups

### F0001 - Decide Citizen Identity Policy

Source ticket: T0001

Severity: Medium

Type: privacy

Description:

The product needs a future decision on whether reports are anonymous, contact-optional, or account-based.

Recommended action:

Decide before adding auth, reporter contact fields, or public reporter visibility.

Status: Open

### F0002 - Decide Map Provider and Location Privacy

Source ticket: T0001

Severity: Medium

Type: privacy / architecture

Description:

The MVP will need location capture. External map providers and precise coordinates may create privacy and API-key decisions.

Recommended action:

Start with location text and map-ready data fields. Add external maps only after approval.

Status: Open; T0004 added map-ready fields without external maps

### F0005 - Decide Real Map Integration

Source ticket: T0004

Severity: Medium

Type: architecture / privacy

Description:

The app now stores optional manual coordinates and location context, but it does not use a real map provider or browser geolocation.

Recommended action:

Before adding an interactive map, decide provider, API-key handling, privacy language, and whether precise coordinates are appropriate for public display.

Status: Open

### F0008 - Clarify Export Record Policy

Source ticket: T0010

Severity: Low

Type: product / operations

Description:

The app can export a local JSON summary for demos, but this file is not an official municipal record, signed report, or secure audit artifact.

Recommended action:

Before any production reporting workflow, decide export retention, official record language, staff ownership, and audit requirements.

Status: Open

### F0013 - Decide Photo Evidence Policy

Source ticket: T0014

Severity: Medium

Type: privacy / product

Description:

The app now clearly shows photo evidence as a future placeholder, but real uploads remain unapproved because photos may include faces, private property, license plates, or other sensitive context.

Recommended action:

Before adding real photo upload or storage, decide redaction expectations, allowed content, retention, public visibility, export behavior, and whether staff must review images before publication.

Status: Open

### F0011 - Complete Human Browser Accessibility Run

Source ticket: T0012

Severity: Low

Type: accessibility / verification

Description:

T0012 implemented the accessibility and keyboard hardening pass and passed syntax/static checks, but the in-app browser automation runtime was unavailable during verification.

Recommended action:

Run the T0012 keyboard and mobile-width checklist manually in a browser before accepting the next UI milestone.

Status: Open

### F0012 - Complete Human UI Snapshot Browser Run

Source ticket: T0013

Severity: Low

Type: design / verification

Description:

T0013 tightened the UI toward the saved concept sheet, but the in-app browser automation runtime was unavailable during verification.

Recommended action:

Run the desktop and mobile visual comparison checklist in `docs/Manual_UI_Checks.md` before accepting the UI milestone.

Status: Open

## Closed Followups

### F0004 - Add Staff Assignment Later

Source ticket: T0003

Severity: Low

Type: feature

Description:

Status and priority could be changed locally, but issues could not yet be assigned to a municipal team.

Recommended action:

Handled in T0015 with fixed local team labels only. Real staff identity, authentication, and official routing remain out of scope.

Status: Closed in T0015

### F0010 - Repair Git Repository Initialization

Source ticket: T0011A

Severity: Medium

Type: tooling / workflow

Description:

Git setup initially failed because Windows ACLs prevented Git from writing `.git/config` and `.git/index.lock`. The project was later recovered into a usable local repository and pushed to GitHub.

Recommended action:

Use `docs/Git_Setup_Recovery.md` for host-specific GitHub CLI and direct Git HTTPS command notes.

Status: Closed after recovery

### F0009 - Run Dedicated Accessibility Pass

Source ticket: T0011

Severity: Medium

Type: accessibility / quality

Description:

The MVP had forms, filters, detail panels, duplicate review controls, and export/print actions, but keyboard and accessibility behavior had not had a dedicated pass.

Recommended action:

Handled in T0012 with skip navigation, visible focus styling, live-region/status improvements, field error associations, more specific dynamic control names, detail focus restoration, Escape-to-close support, and responsive text containment rules.

Status: Closed in T0012

### F0007 - Add Issue Detail Timeline

Source ticket: T0007

Severity: Medium

Type: feature

Description:

The queue now has a focused detail panel with status timeline and complete issue context.

Recommended action:

Use the detail panel as the home for future per-issue review workflows.

Status: Closed in T0008

### F0006 - Improve Duplicate Review Workflow

Source ticket: T0005

Severity: Medium

Type: feature / moderation

Description:

The app shows possible duplicate hints and now lets staff mark each local hint as needs review, linked, or dismissed.

Recommended action:

Add real merge behavior, staff identity, and audit trails only after backend and identity decisions are approved.

Status: Closed in T0009

### F0003 - Add Admin Status Controls

Source ticket: T0002

Severity: Medium

Type: feature

Description:

Issues can now be created and persisted locally, but status changes are not editable from the UI yet.

Recommended action:

Handle in T0003 with local status changes, category filtering, and priority labels.

Status: Closed in T0003
