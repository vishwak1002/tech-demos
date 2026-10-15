# agency-agents-playground — MVP plan

## Goal
A single-user DevRel playground that makes [Agency Agents](https://github.com/msitarzewski/agency-agents) clickable: browse departments, open an agent's card (persona, process, deliverables), and copy a ready-to-use prompt.

## Single-user MVP
**In**
- Department browser (engineering, design, marketing, sales, security, etc.) built from the repo's agent markdown files, bundled at build time as static data (pinned commit)
- Search/filter across agents
- Agent detail card: persona, process, deliverables, source link to the file on GitHub
- "Copy prompt" button that copies the full agent prompt
- Empty, no-results, and load-error states
- Taste-first UI per `~/.agents/skills/design-taste-frontend/SKILL.md` (one-line Design Read before UI; anti-slop)
- Self-contained `apps/agency-agents-playground`: `bun install && bun run dev` + `bun run build`
- `validation/` reserved for QA (≥1 screenshot + ≥1 happy-path video)

**Out**
- Running agents or calling any LLM
- Accounts, server storage, or live GitHub fetching at runtime
- Editing or authoring agents
- New GitHub repository

## Outcome-oriented tasks
1. Scaffold Vite + React + TS via `bunx create-vite`; add `bunfig.toml` with `[install] minimumReleaseAge = 259200`; then `bun install`
2. Script that pulls agent markdown from a pinned commit of msitarzewski/agency-agents and generates a typed JSON index (respect the repo's license; keep attribution)
3. Init shadcn/ui (minimalist); add only needed components
4. Design Read + distinctive "agency roster" UI
5. Department browser + search
6. Agent detail card + copy prompt
7. Empty / no-results / error states
8. `bun run build` green; leave `validation/` for QA

## Stack
- **Bun** — monorepo default
- **Vite + React + TypeScript** — light client-only SPA
- **Tailwind + shadcn/ui** — Taste-compatible primitives
- **Build-time static index** — no backend, works offline

## Deferred
- "Assemble a team" multi-agent picker that exports a combined prompt
- Live sync with upstream repo
- Cloudflare Pages preview

## Source
- Repo: https://github.com/msitarzewski/agency-agents (~160k★)
- Bookmark: https://x.com/VaibhavSisinty/status/2109989791995695607
- Scout date: 2026-10-15 · tracking commit 4fc7f6bb

## QA acceptance
- Browse → search → open agent → copy prompt works end to end
- Copied text matches the source agent file
- Empty / no-results / error states look intentional
- Screenshot + happy-path video under `apps/agency-agents-playground/validation/`
- UI passes the Taste anti-slop bar
