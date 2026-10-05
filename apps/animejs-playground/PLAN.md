# animejs-playground — MVP plan

## Goal
A single-user DevRel playground that makes [Anime.js v4](https://github.com/juliangarnier/anime) clickable: pick a motion demo, tweak easing / duration / stagger live, scrub the timeline, and copy the exact snippet.

## Single-user MVP
**In**
- Four demos on one page (tabs or stacked cards): (1) scrubbable timeline, (2) draggable card with springs, (3) scroll-revealed split text, (4) SVG line draw
- Live controls per demo: easing, duration, stagger (and any demo-specific knobs)
- “Copy code” that pastes the exact Anime.js v4 snippet matching current controls
- Taste-first UI per `~/.agents/skills/design-taste-frontend/SKILL.md` (one-line Design Read before UI; anti-slop — not purple mesh / generic AI dashboard)
- Self-contained `apps/animejs-playground`: `bun install && bun run dev` + `bun run build`
- `validation/` folder reserved for QA (≥1 screenshot + ≥1 happy-path video)

**Out**
- Multi-user auth, accounts, or saved projects to a server
- Full Anime.js API surface (stick to the four demos)
- Three.js / other animation engines
- New GitHub repository
- Publishing or deploy beyond local `bun run dev`

## Outcome-oriented tasks
1. Scaffold Vite + React + TS via `bunx create-vite` (skip install flag if available); add `bunfig.toml` with `[install] minimumReleaseAge = 259200`; then `bun install`
2. Add `animejs` (v4) and init shadcn/ui (minimalist); pull only needed components
3. Design Read + distinctive motion-studio UI (editorial dark or crisp paper — pick one and commit)
4. Timeline scrubber demo wired to Anime.js timeline API
5. Draggable spring card demo
6. Split-text scroll reveal demo
7. SVG line-draw demo
8. Shared live controls + copy-code for each demo
9. `bun run build` green; leave `validation/` for QA artifacts

## Stack
- **Bun** — monorepo default runtime / package manager
- **Vite + React + TypeScript** — light SPA; one primary playground flow
- **animejs (v4)** — the library under demo (`https://github.com/juliangarnier/anime`)
- **Tailwind + shadcn/ui** — Taste-compatible UI primitives
- **No backend** — pure client playground

## Deferred
- Persist preferred control presets beyond sessionStorage
- More demos (morph SVG, WAAPI bridge, staggered grids)
- Cloudflare Pages preview under sticky monorepo

## Source
- Repo: https://github.com/juliangarnier/anime (~73k★)
- Bookmark: https://x.com/himanshubuildss/status/2105902592886968702
- Scout date: 2026-10-05 · tracking commit 76097c6f

## QA acceptance
- Each of the four demos runs end-to-end with live controls
- Copy-code produces a usable Anime.js v4 snippet for the current knobs
- Empty / idle states look intentional (not blank white)
- Screenshot + happy-path video under `apps/animejs-playground/validation/`
- UI passes anti-slop bar (Taste skill)