# Known Issues And Followups

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

### F0010 - Repair Git Repository Initialization

Source ticket: T0011A

Severity: Medium

Type: tooling / workflow

Description:

Git setup initially failed because Windows ACLs prevented Git from writing `.git/config` and `.git/index.lock`. The project was later recovered into a usable local repository and pushed to GitHub.

Recommended action:

Use `docs/Git_Setup_Recovery.md` for host-specific GitHub CLI and direct Git HTTPS command notes.

Status: Closed after recovery

## Closed Followups

### F0004 - Add Staff Assignment Later

Source ticket: T0003

Severity: Low

Type: feature

Description:

Issues can now be assigned to local municipal team labels without staff identity, auth, backend, or external services.

Recommended action:

Add real staff identity and ownership only after identity policy and backend decisions are approved.

Status: Closed in T0015

### F0009 - Run Dedicated Accessibility Pass

Source ticket: T0011

Severity: Medium

Type: accessibility / quality

Description:

The MVP now has forms, filters, detail panels, duplicate review controls, and export/print actions. T0012 added visible focus coverage, skip navigation, field error associations, live region labels, invalid-field focus, detail focus management, and mobile text containment safeguards.

Recommended action:

Continue manual keyboard and screen-reader spot checks during future UI tickets, especially after T0013 changes the visual rhythm.

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
