---
workflow_name: controlled-ticket-development
active_states: ["Ready for Agent", "In Progress", "Needs Fix"]
review_states: ["Architect Review", "Human Review"]
terminal_states: ["Done", "Cancelled", "Duplicate"]
agent:
  max_concurrent_agents: 1
  max_turns: 5
  max_retry_attempts: 3
workspace:
  one_branch_per_ticket: true
  preserve_workspace_after_success: true
safety:
  require_human_approval_for:
    - auth
    - production_deployment
    - database_migrations
    - destructive_commands
    - dependency_changes
    - security_sensitive_changes
    - external_services
    - sensitive_personal_data
---

Read `AGENTS.md` first. Read the relevant docs before coding.

Implement only the assigned ticket. Stay inside allowed areas. Do not implement non-goals. If blocked by ambiguity, risk, missing credentials, forbidden files, or human-gated decisions, ask one concise clarification question and stop.

After every run, provide the required completion report.
