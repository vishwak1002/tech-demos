import {
  buildBrief,
  type ResearchBrief,
  type SourceId,
  type SourceStatus,
} from "@/data/fixtures"

export type Phase = "idle" | "running" | "done" | "error"

export interface SourceProgress {
  id: SourceId
  status: SourceStatus
  detail: string
  progress: number
}

const ORDER: SourceId[] = ["reddit", "x", "hn", "youtube", "web"]

const SCAN_LINES: Record<SourceId, string[]> = {
  reddit: [
    "Querying subreddit indexes…",
    "Scoring thread velocity…",
    "Pulling top comments…",
  ],
  x: ["Scanning recent posts…", "Clustering quote-tweets…", "Filtering noise…"],
  hn: ["Fetching frontpage + Ask…", "Ranking by points…", "Reading comment themes…"],
  youtube: [
    "Matching titles…",
    "Checking view velocity…",
    "Skimming descriptions…",
  ],
  web: ["Crawling docs & READMEs…", "Extracting claims…", "Attaching canonical URLs…"],
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function initialSourceProgress(): SourceProgress[] {
  return ORDER.map((id) => ({
    id,
    status: "queued" as const,
    detail: "Queued",
    progress: 0,
  }))
}

export async function runMockResearch(
  topic: string,
  windowDays: number,
  onProgress: (sources: SourceProgress[]) => void,
  signal?: AbortSignal,
): Promise<ResearchBrief> {
  const normalized = topic.trim().toLowerCase()
  if (!normalized) {
    throw new Error("Enter a topic to research.")
  }

  const sources = initialSourceProgress()
  onProgress([...sources])

  if (normalized === "fail" || normalized === "error") {
    for (let i = 0; i < 2; i++) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
      sources[i] = {
        id: ORDER[i],
        status: "scanning",
        detail: SCAN_LINES[ORDER[i]][0],
        progress: 35,
      }
      onProgress([...sources])
      await sleep(280)
    }
    throw new Error(
      'Mock provider refused the topic “fail”. Try another query, or pick a sample chip.',
    )
  }

  for (let i = 0; i < ORDER.length; i++) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
    const id = ORDER[i]
    const lines = SCAN_LINES[id]
    for (let step = 0; step < lines.length; step++) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError")
      await sleep(200 + Math.random() * 160)
      sources[i] = {
        id,
        status: "scanning",
        detail: lines[step],
        progress: Math.min(95, 18 + step * 30),
      }
      onProgress([...sources])
    }
    await sleep(100)
    sources[i] = {
      id,
      status: "done",
      detail: "Cached fixtures ready",
      progress: 100,
    }
    onProgress([...sources])
  }

  await sleep(180)
  return buildBrief(topic.trim(), windowDays)
}
