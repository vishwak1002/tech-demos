# gstack-playground — MVP plan

## Goal
A single-user web playground that teaches Garry Tan's gstack roles by letting you browse the specialist pack and walk a mock CEO → Designer → Eng Manager handoff.

## Single-user MVP
**In**
- Catalog of ~23 gstack roles/skills with short role + "what they do" copy (static data seeded from public gstack README).
- Role detail drawer/page: slash command name, specialty title, one-paragraph description, sprint phase tag (Think / Plan / Build / Review / Test / Ship / Reflect).
- Brief composer: paste or type a product idea; save locally (localStorage).
- Handoff walkthrough: three-step mock pipeline — CEO review → Design review → Eng Manager plan — showing generated mock outputs for the current brief (no real LLM required for MVP).
- Self-contained under `apps/gstack-playground` with `bun install && bun run dev`.

**Out**
- Real Claude Code / Codex skill execution
- Auth, multi-user, cloud sync
- Installing gstack onto the machine
- Browser automation /qa simulation beyond static mock steps
- Cloudflare deploy wiring (later)

## Outcome-oriented tasks
1. Scaffold Vite + React + TypeScript via `bunx create-vite` (skip install), add `bunfig.toml` with `minimumReleaseAge = 259200`, then `bun install`.
2. Init shadcn/ui (minimalist) and add only: button, card, input, textarea, badge, sheet/dialog, tabs, separator.
3. Seed `src/data/roles.ts` with the public gstack specialists (slash command, title, phase, blurb).
4. Build Roles browse UI (search + phase filter + detail).
5. Build Brief composer + localStorage persistence.
6. Build Handoff walkthrough that consumes the brief and shows three mock specialist outputs in order.
7. Polish empty/loading states; ensure `bun run build` succeeds.
8. Capture ≥1 screenshot and ≥1 short screen recording of the running app for the PR.

## Stack
- **Bun** — runtime / package manager / scripts (repo default).
- **Vite + React + TS** — light SPA; one-screen-plus utility, no Next needed.
- **Tailwind + shadcn/ui** — fast minimal UI without hand-rolled components.
- **Static role data** — no API; avoids auth and rate limits for a demo.

## Deferred
- Live agent calls (CEO/Design/Eng) via an API key
- Import roles dynamically from a cloned gstack checkout
- Persist briefs beyond localStorage
- Cloudflare Pages preview path under the sticky monorepo

## Source
- https://github.com/garrytan/gstack
- Bookmark: https://x.com/hasantoxr/status/2096255783415779684
