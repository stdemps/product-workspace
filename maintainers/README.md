# Maintainers

**You can ignore this folder.** Nothing here is needed to use the template.

These are the scripts and notes used to maintain the template itself — keeping it in
sync with its sibling repo. They refer to repos and workflows that only exist for the
people who publish the template.

If you cloned this to build something, delete this folder. Nothing else depends on it.

## What's in here

| File | What it's for |
| --- | --- |
| `sync-to-prototype-starter.sh` | Copies agents, skills, commands and rules between the two template repos |
| `sync-agent-updates-to-prototype-starter.md` | Notes on how that sync works and what it can miss |
| `migrate-to-separate-repo.sh` | One-off helper from when the template moved to its own repo |

## Not in here

`scripts/create-workspace.sh` stays where it is — that one creates a new project from
this template, so it is for users, not maintainers.
