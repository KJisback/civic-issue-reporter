# Git Setup Notes

Last updated: 2026-05-21

## Current State

Git setup has been recovered for local branch-per-ticket work.

What succeeded:

- `.gitignore` was created.
- `docs/Manual_UI_Checks.md` was created.
- The project is a local git repository on `main`.
- Initial commit exists: `ed25f63 chore: initial civic issue reporter project`.
- Latest documented remote-matched commit before T0012 work: `5b0aa3d66083a6dc72241f08076cc43c26bc16b2`.
- Remote exists: `https://github.com/KJisback/civic-issue-reporter.git`.
- GitHub API confirmed remote `main` at `5b0aa3d66083a6dc72241f08076cc43c26bc16b2` during the T0012 preflight.
- Git safe-directory config includes this project path.
- Git write operations work outside the Codex filesystem sandbox; sandboxed Git writes may still require escalation on this host.

Remaining host-specific caveats:

- This Codex shell has proxy variables such as `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `GIT_HTTP_PROXY`, and `GIT_HTTPS_PROXY` pointed at `127.0.0.1:9`, which blocks GitHub network calls unless cleared for the command.
- The bundled MinGit HTTPS helper works from `F:\Kuku\Workspace\.codex-tools\mingit\mingw64\bin`; direct Git HTTPS commands in this shell may need `GIT_EXEC_PATH` set to that folder.
- GitHub CLI authentication is valid when the dead proxy variables are cleared.

## Useful Verification Commands

From `F:\Kuku\Workspace\projects\civic-issue-reporter`:

```powershell
git status --short
git log --oneline -1
git remote -v
git branch -vv
```

For GitHub CLI checks in this Codex shell:

```powershell
$env:HTTP_PROXY=''
$env:HTTPS_PROXY=''
$env:ALL_PROXY=''
Remove-Item Env:GIT_HTTP_PROXY -ErrorAction SilentlyContinue
Remove-Item Env:GIT_HTTPS_PROXY -ErrorAction SilentlyContinue
gh auth status
gh repo view KJisback/civic-issue-reporter --json name,url,defaultBranchRef,pushedAt
```

For direct Git HTTPS checks in this Codex shell:

```powershell
$env:GIT_EXEC_PATH='F:\Kuku\Workspace\.codex-tools\mingit\mingw64\bin'
$env:HTTP_PROXY=''
$env:HTTPS_PROXY=''
$env:ALL_PROXY=''
Remove-Item Env:GIT_HTTP_PROXY -ErrorAction SilentlyContinue
Remove-Item Env:GIT_HTTPS_PROXY -ErrorAction SilentlyContinue
git ls-remote origin refs/heads/main
```
