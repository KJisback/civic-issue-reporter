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

### F0004 - Add Staff Assignment Later

Source ticket: T0003

Severity: Low

Type: feature

Description:

Status and priority can now be changed locally, but issues cannot yet be assigned to a team or staff member.

Recommended action:

Add assignment only after the admin workflow and identity policy are clearer.

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

### F0009 - Run Dedicated Accessibility Pass

Source ticket: T0011

Severity: Medium

Type: accessibility / quality

Description:

The MVP now has forms, filters, detail panels, duplicate review controls, and export/print actions, but keyboard and accessibility behavior has not had a dedicated pass.

Recommended action:

Handle in T0012 before adding heavier workflows.

Status: Open

### F0010 - Repair Git Repository Initialization

Source ticket: T0011A

Severity: Medium

Type: tooling / workflow

Description:

`git init` created a partial `.git` directory, but Windows ACLs prevented Git from writing `.git/config` and `.git/index.lock`. The approval layer rejected removing the partial `.git` directory from inside Codex, so the local repository could not be completed in this run.

Recommended action:

Manually remove or repair the partial `.git` directory from a normal elevated PowerShell session, then rerun `git init -b main`, `git add .`, and the initial commit. Re-authenticate GitHub CLI before pushing.

Status: Open

## Closed Followups

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
