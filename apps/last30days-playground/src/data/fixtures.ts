export type SourceId = "reddit" | "x" | "hn" | "youtube" | "web"
export type SourceStatus = "queued" | "scanning" | "done" | "error"
export type Confidence = "high" | "medium" | "low"

export interface SourceHit {
  id: string
  source: SourceId
  title: string
  snippet: string
  url: string
  engaged: string
  published: string
}

export interface Finding {
  id: string
  rank: number
  claim: string
  confidence: Confidence
  whyItMatters: string
  citationIds: string[]
}

export interface ResearchBrief {
  topic: string
  windowDays: number
  generatedAt: string
  summary: string
  findings: Finding[]
  hits: SourceHit[]
}

export const SOURCE_META: Record<
  SourceId,
  { label: string; short: string; accent: string }
> = {
  reddit: { label: "Reddit", short: "r/", accent: "#c45c26" },
  x: { label: "X", short: "𝕏", accent: "#1d1d1b" },
  hn: { label: "Hacker News", short: "HN", accent: "#f26522" },
  youtube: { label: "YouTube", short: "YT", accent: "#b91c1c" },
  web: { label: "Web", short: "Web", accent: "#2f6f4e" },
}

export const SAMPLE_TOPICS = [
  "AI agent research skills",
  "Bun + Vite monorepos",
  "Developer advocacy demos",
  "Local-first conference tooling",
]

const HITS: SourceHit[] = [
  {
    id: "h1",
    source: "reddit",
    title: "r/devops: We stopped pasting Slack links into exec updates",
    snippet:
      "Thread consensus: a one-pager with links beats a wall of screenshots. Several folks ask for auto-cited digests.",
    url: "https://www.reddit.com/r/devops/comments/mock-cited-digest",
    engaged: "412 ↑ · 89 comments",
    published: "12d ago",
  },
  {
    id: "h2",
    source: "x",
    title: "@devrel_notes on research skills for agents",
    snippet:
      "Hot take: the skill is not scraping — it is ranking claims with receipts. Mock demos convert better than live API roulette.",
    url: "https://x.com/devrel_notes/status/mock-research-skill",
    engaged: "2.4k ♡ · 410 ↺",
    published: "6d ago",
  },
  {
    id: "h3",
    source: "hn",
    title: "Show HN: Local-first multi-source brief builder",
    snippet:
      "Commenters praise offline fixtures for workshops. Top critique: show progress per source or it feels fake.",
    url: "https://news.ycombinator.com/item?id=mock-brief-builder",
    engaged: "286 points · 112 comments",
    published: "19d ago",
  },
  {
    id: "h4",
    source: "youtube",
    title: "How I brief a PM in 8 minutes with public sources",
    snippet:
      "Walkthrough of triage → claim → citation. Viewers ask for a playground they can fork without keys.",
    url: "https://www.youtube.com/watch?v=mockBrief8min",
    engaged: "48k views · 1.1k likes",
    published: "9d ago",
  },
  {
    id: "h5",
    source: "web",
    title: "Last 30 Days skill — README patterns for grounded synthesis",
    snippet:
      "Documents a windowed research loop and insists on clickable sources next to every claim.",
    url: "https://github.com/mvanhorn/last30days-skill",
    engaged: "62k ★",
    published: "updated 3d ago",
  },
  {
    id: "h6",
    source: "reddit",
    title: "r/LocalLLaMA: Mock providers beat flaky workshop Wi-Fi",
    snippet:
      "Speakers report higher completion when demos never leave the laptop. Live keys are a day-2 story.",
    url: "https://www.reddit.com/r/LocalLLaMA/comments/mock-providers-workshops",
    engaged: "198 ↑ · 44 comments",
    published: "21d ago",
  },
  {
    id: "h7",
    source: "hn",
    title: "Ask HN: How do you weight engagement vs. credibility?",
    snippet:
      "Most answers: engagement as a queue, human judgment for ranking. A few share scoring rubrics.",
    url: "https://news.ycombinator.com/item?id=mock-engagement-weight",
    engaged: "154 points · 97 comments",
    published: "27d ago",
  },
  {
    id: "h8",
    source: "x",
    title: "Postmortem: demo failed mid-keynote, recovered with fixtures",
    snippet:
      "Speaker flipped to canned research cards and still closed the narrative. Empty/error states saved the slot.",
    url: "https://x.com/stagecraft/status/mock-demo-recovery",
    engaged: "980 ♡ · 122 ↺",
    published: "15d ago",
  },
]

const FINDINGS: Finding[] = [
  {
    id: "f1",
    rank: 1,
    claim:
      "Builders want grounded digests more than raw feeds — citations beat vibes in DevRel demos.",
    confidence: "high",
    whyItMatters:
      "A playground that shows source cards → ranked claims maps cleanly to how advocates brief stakeholders.",
    citationIds: ["h1", "h2", "h5"],
  },
  {
    id: "f2",
    rank: 2,
    claim:
      "Mock-first research UIs lower the bar for trying multi-source workflows before wiring live keys.",
    confidence: "high",
    whyItMatters:
      "Conference and workshop audiences can click through the story without OAuth friction.",
    citationIds: ["h3", "h6"],
  },
  {
    id: "f3",
    rank: 3,
    claim:
      "Engagement signals (upvotes, stars, view velocity) are used as triage, not as truth.",
    confidence: "medium",
    whyItMatters:
      "Surface signals beside claims so viewers can challenge the ranking live on stage.",
    citationIds: ["h4", "h7"],
  },
  {
    id: "f4",
    rank: 4,
    claim:
      "Empty and error paths are part of the demo — audiences remember recovery as much as the happy path.",
    confidence: "medium",
    whyItMatters:
      "Keep failure theatrical and recoverable; it sells production readiness.",
    citationIds: ["h8"],
  },
]

export function buildBrief(topic: string, windowDays: number): ResearchBrief {
  const trimmed = topic.trim()
  return {
    topic: trimmed,
    windowDays,
    generatedAt: new Date().toISOString(),
    summary: `For “${trimmed}” over the last ${windowDays} days: across community threads, launch posts, and short-form explainers, the window clusters around practical adoption friction, pricing skepticism, and a few durable patterns worth shipping against.`,
    findings: FINDINGS.map((f) => ({
      ...f,
      claim: `${f.claim} (topic lens: ${trimmed})`,
    })),
    hits: HITS.map((h) => ({
      ...h,
      title: h.title.includes(trimmed) ? h.title : `${h.title} · ${trimmed}`,
    })),
  }
}
