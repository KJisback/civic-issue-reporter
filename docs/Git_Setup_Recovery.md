# Git Setup Recovery

Last updated: 2026-05-21

## Current State

Git setup is partially blocked.

What succeeded:

- `.gitignore` was created.
- `docs/Manual_UI_Checks.md` was created.
- A partial `.git` directory exists.

What failed:

- `git init -b main` could not finish because Windows denied writes to `.git/config`.
- `git add .` could not run because Windows denied writes to `.git/index.lock`.
- `gh auth status` reports the saved GitHub token for `KJisback` is invalid.
- No local commit was created.
- No remote push was completed.

## Manual Recovery Commands

Run these from a normal elevated PowerShell session, outside Codex:

```powershell
cd F:\Kuku\Workspace\projects\civic-issue-reporter
Remove-Item -LiteralPath .git -Recurse -Force
git init -b main
git add .
git commit -m "chore: initial civic issue reporter project"
```

If Git reports dubious ownership:

```powershell
git config --global --add safe.directory F:/Kuku/Workspace/projects/civic-issue-reporter
```

If GitHub CLI is still authenticated with an invalid token:

```powershell
gh auth login -h github.com
```

Then create or choose a GitHub repository and push:

```powershell
gh repo create civic-issue-reporter --private --source . --remote origin --push
```

If the repository already exists:

```powershell
git remote add origin https://github.com/<owner>/civic-issue-reporter.git
git push -u origin main
```

Replace `<owner>` with the intended GitHub account or organization.

## After Recovery

Run:

```powershell
git status --short
git log --oneline -1
git remote -v
```

Expected result:

- `git status --short` is clean.
- `git log --oneline -1` shows the initial commit.
- `git remote -v` shows the GitHub remote.
