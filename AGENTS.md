# Agent rules — tech-demos

## Scope
- Only add or update files under `apps/<kebab-slug>/` for a given demo.
- Never create a new GitHub repository for a demo.
- Plan with `skills/project-planning/` and write `apps/<slug>/PLAN.md` before building.

## Stack defaults
- Bun for install / run / scripts
- Prefer official scaffolds via `bunx create-*`
- Every Bun project: root `bunfig.toml` with `[install] minimumReleaseAge = 259200` before `bun install`
- UI: shadcn/ui with a minimalist preset when applicable

## Validation (required)
Every PR for a new or updated demo must attach:
1. At least one screenshot of the running app
2. At least one video of the running app

## App contract
Each `apps/<slug>/` must be self-contained:
```bash
cd apps/<slug>
bun install
bun run dev
```

## Tracking
Update `tracking/seen-bookmarks.json` when proposing or shipping a bookmark-derived demo.
Do not re-propose entries already listed there.
