# tanstack-ai-playground — MVP plan

## Goal
A single-user playground that demos TanStack AI (https://github.com/tanstack/ai): type-safe, provider-agnostic streaming chat + tool calling — without requiring real API keys.

## Single-user MVP
**In**
- Streaming chat UI with visible token/chunk stream
- Mock provider toggle (e.g. Mock OpenAI / Mock Anthropic / Mock Gemini) — all local, no keys
- At least one tool-call mock turn (tool invoked → result folded into reply)
- Empty state (no messages) and error state (mock failure / aborted stream)
- Self-contained `apps/tanstack-ai-playground` with `bun install && bun run dev` + `bun run build`
- Taste-first UI: read `~/.agents/skills/design-taste-frontend/SKILL.md` before UI; one-line Design Read; anti-slop

**Out**
- Real provider API keys / live network LLM calls
- Multi-user auth
- Full TanStack AI surface (voice, multimodal generation beyond chat)
- New GitHub repo

## Outcome-oriented tasks
1. Scaffold Vite + React + TS via bunx create-vite; bunfig.toml with minimumReleaseAge = 259200; bun install
2. Init shadcn/ui minimalist; pull only needed components
3. Design Read + distinctive chat shell (not generic AI purple/mesh/Inter-slate)
4. Mock stream engine + provider toggle + tool-call demo path
5. Empty + error states
6. bun run build green
7. Leave room for QA artifacts under validation/ (screenshot + happy-path video)

## Stack
- Bun, Vite, React, TS, Tailwind, shadcn/ui
- TanStack AI packages where useful; mock adapters for MVP if live providers need keys
- Static/mock data for tool results

## Deferred
- Live providers behind env keys
- Cloudflare Pages preview path
- Persisted chat history beyond session

## QA acceptance (from QA Lead)
- Mock provider toggle with visible stream chunks (no keys)
- ≥1 tool-call mock turn
- Empty + error states
- Screenshot + happy-path video under apps/tanstack-ai-playground/validation/
