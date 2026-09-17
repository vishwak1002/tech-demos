# last30days-playground — MVP plan

## Goal
A single-user DevRel playground that demos the “Last 30 Days” research skill idea: type a topic → multi-source research over a recent window → grounded synthesis with sources — without requiring live API keys for the first cut.

## Single-user MVP
**In**
- Topic search input + optional window control (default last 30 days)
- Mock / sample research run that shows parallel source cards (Reddit, X, HN, YouTube, web) with engagement-style signals
- Synthesis brief: ranked findings + cited sources (clickable mock URLs)
- Empty state, loading/streaming progress, and error/empty-results state
- Taste-first UI per `~/.agents/skills/design-taste-frontend/SKILL.md` (Design Read before UI; anti-slop)
- Self-contained `apps/last30days-playground`: `bun install && bun run dev` + `bun run build`
- Room for QA artifacts under `validation/` (≥1 screenshot + ≥1 happy-path video)

**Out**
- Real Reddit/X/YouTube/HN live scraping or OAuth for MVP
- Multi-user auth, history sync to a server
- Installing the real Claude/Codex skill onto the machine
- Full v3 source matrix (Polymarket, TikTok, Meta Ads, etc.) — show 4–5 sources max in mock
- New GitHub repository

## Outcome-oriented tasks
1. Scaffold Vite + React + TS via `bunx create-vite`; add `bunfig.toml` with `[install] minimumReleaseAge = 259200`; `bun install`
2. Init shadcn/ui (minimalist); add only needed components
3. Design Read + distinctive research-brief UI (not generic AI chat purple/mesh)
4. Topic form → mock research pipeline with visible per-source progress
5. Synthesis view with ranked claims + source citations
6. Empty / loading / error states
7. `bun run build` green; leave `validation/` for QA

## Stack
- **Bun** — repo default runtime/package manager
- **Vite + React + TS** — light SPA; one primary research flow
- **Tailwind + shadcn/ui** — fast Taste-compatible UI
- **Static/mock research fixtures** — no keys for MVP; optional later live adapters

## Deferred
- Live adapters behind env keys (Reddit/HN free paths first)
- Persist past briefs beyond sessionStorage
- Cloudflare Pages preview path under sticky monorepo

## Source
- https://github.com/mvanhorn/last30days-skill (~62k★)
- Bookmark: https://x.com/hasantoxr/status/2096255783415779684

## QA acceptance
- Topic → research progress → synthesis with sources works end-to-end on mock data
- Empty + error states visible
- Screenshot + happy-path video under `apps/last30days-playground/validation/`
