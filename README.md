# tech-demos

Sticky monorepo for weekday X-bookmark tech demos. One app per pick under `apps/<slug>/`.

## Layout

- `AGENTS.md` — rules for agents working in this repo
- `skills/project-planning/` — MVP planning skill (Bun / shadcn)
- `apps/<slug>/` — self-contained demos (`bun install && bun run dev`)
- `tracking/seen-bookmarks.json` — proposed / built bookmark tracking

## Conventions

- Bun runtime + package manager
- One sticky repo (never a new GitHub repo per demo)
- PRs must include at least one screenshot **and** one video of the running app
