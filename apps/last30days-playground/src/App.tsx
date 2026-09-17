import { useMemo, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  Loader2,
  Radio,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  SAMPLE_TOPICS,
  SOURCE_META,
  type ResearchBrief,
  type SourceHit,
} from "@/data/fixtures"
import {
  initialSourceProgress,
  runMockResearch,
  type Phase,
  type SourceProgress,
} from "@/lib/research"
import { cn } from "@/lib/utils"

const WINDOWS = [
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
  { value: "30", label: "Last 30 days" },
  { value: "60", label: "Last 60 days" },
]

function hitById(hits: SourceHit[], id: string) {
  return hits.find((h) => h.id === id)
}

function SourceRail({
  sources,
  active,
}: {
  sources: SourceProgress[]
  active: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
          Sources · parallel scan
        </p>
        {active ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-800">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
            </span>
            live mock
          </span>
        ) : null}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {sources.map((s) => {
          const meta = SOURCE_META[s.id]
          return (
            <div
              key={s.id}
              className={cn(
                "rounded-md border border-[color:var(--rule)] bg-[color:var(--paper-raised)] px-3 py-2.5",
                s.status === "scanning" && "border-emerald-800/25 bg-emerald-50/40",
              )}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-5 min-w-5 items-center justify-center rounded px-1 font-mono text-[10px] font-semibold text-white"
                    style={{ background: meta.accent }}
                  >
                    {meta.short}
                  </span>
                  <span className="text-sm font-medium text-[color:var(--ink)]">
                    {meta.label}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-sm bg-[color:var(--chip)] font-mono text-[10px] uppercase tracking-wide text-[color:var(--ink-muted)]"
                >
                  {s.status}
                </Badge>
              </div>
              <p className="mb-2 truncate font-mono text-[11px] text-[color:var(--ink-muted)]">
                {s.detail}
              </p>
              <Progress value={s.progress} className="w-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EmptyDesk() {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[color:var(--rule)] bg-[color:var(--paper-raised)]/60 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)]">
        <BookOpen className="h-5 w-5 text-[color:var(--ink-muted)]" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="font-serif text-2xl tracking-tight text-[color:var(--ink)]">
          No brief on the desk yet
        </h2>
        <p className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
          Pick a sample topic or type your own. The mock run fans out across Reddit,
          X, HN, YouTube, and the web — then lands a ranked synthesis with citations.
          No API keys required.
        </p>
      </div>
    </div>
  )
}

function ErrorPanel({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-start justify-center gap-4 rounded-lg border border-red-900/20 bg-red-50/50 px-6 py-10">
      <div className="flex items-center gap-2 text-red-900">
        <AlertCircle className="h-5 w-5" />
        <h2 className="font-serif text-2xl tracking-tight">Research stalled</h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-red-950/80">{message}</p>
      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="rounded-md border-red-900/30 bg-[color:var(--paper)]"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </div>
  )
}

function SourceCard({ hit }: { hit: SourceHit }) {
  const meta = SOURCE_META[hit.source]
  return (
    <a
      href={hit.url}
      target="_blank"
      rel="noreferrer"
      className="mb-3 block break-inside-avoid rounded-lg border border-[color:var(--rule)] bg-[color:var(--paper-raised)] p-3 transition hover:border-emerald-900/30"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium"
          style={{ color: meta.accent }}
        >
          {meta.label}
        </span>
        <span className="font-mono text-[10px] text-[color:var(--ink-muted)]">
          {hit.published}
        </span>
      </div>
      <p className="mb-1 text-sm font-medium leading-snug text-[color:var(--ink)]">
        {hit.title}
      </p>
      <p className="mb-2 text-xs leading-relaxed text-[color:var(--ink-muted)]">
        {hit.snippet}
      </p>
      <p className="font-mono text-[10px] text-[color:var(--ink-muted)]">{hit.engaged}</p>
    </a>
  )
}

function BriefView({ brief }: { brief: ResearchBrief }) {
  return (
    <div className="space-y-8">
      <header className="space-y-3 border-b border-[color:var(--rule)] pb-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
          <span>Synthesis brief</span>
          <span aria-hidden>·</span>
          <span>window {brief.windowDays}d</span>
          <span aria-hidden>·</span>
          <span>{new Date(brief.generatedAt).toLocaleString()}</span>
        </div>
        <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-[color:var(--ink)] md:text-4xl">
          {brief.topic}
        </h2>
        <p className="max-w-3xl text-[15px] leading-relaxed text-[color:var(--ink-body)]">
          {brief.summary}
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
          Ranked findings
        </h3>
        <ol className="space-y-4">
          {brief.findings.map((f) => (
            <li
              key={f.id}
              className="grid gap-3 rounded-lg border border-[color:var(--rule)] bg-[color:var(--paper-raised)] p-4 md:grid-cols-[auto_1fr]"
            >
              <div className="font-serif text-3xl leading-none text-emerald-900/80 tabular-nums">
                {String(f.rank).padStart(2, "0")}
              </div>
              <div className="space-y-3">
                <Badge
                  className={cn(
                    "rounded-sm font-mono text-[10px] uppercase tracking-wide",
                    f.confidence === "high" && "bg-emerald-100 text-emerald-950",
                    f.confidence === "medium" && "bg-amber-100 text-amber-950",
                    f.confidence === "low" && "bg-stone-200 text-stone-800",
                  )}
                >
                  {f.confidence} confidence
                </Badge>
                <p className="text-base font-medium leading-snug text-[color:var(--ink)]">
                  {f.claim}
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
                  {f.whyItMatters}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {f.citationIds.map((cid) => {
                    const hit = hitById(brief.hits, cid)
                    if (!hit) return null
                    const meta = SOURCE_META[hit.source]
                    return (
                      <a
                        key={cid}
                        href={hit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-sm border border-[color:var(--rule)] bg-[color:var(--paper)] px-2 py-1 font-mono text-[11px] text-[color:var(--ink-body)] transition hover:border-emerald-800/40 hover:text-emerald-950"
                      >
                        <span style={{ color: meta.accent }}>{meta.short}</span>
                        <span className="max-w-[180px] truncate">{hit.title}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
          Source ledger
        </h3>
        <div className="columns-1 gap-3 md:columns-2">
          {brief.hits.map((hit) => (
            <SourceCard key={hit.id} hit={hit} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const [topic, setTopic] = useState("")
  const [windowDays, setWindowDays] = useState("30")
  const [phase, setPhase] = useState<Phase>("idle")
  const [sources, setSources] = useState<SourceProgress[]>(() =>
    initialSourceProgress(),
  )
  const [brief, setBrief] = useState<ResearchBrief | null>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const canRun = topic.trim().length > 0 && phase !== "running"

  const statusLabel = useMemo(() => {
    if (phase === "running") return "Scanning sources"
    if (phase === "done") return "Brief ready"
    if (phase === "error") return "Needs attention"
    return "Idle desk"
  }, [phase])

  async function startResearch(nextTopic = topic) {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setTopic(nextTopic)
    setPhase("running")
    setError(null)
    setBrief(null)
    setSources(initialSourceProgress())
    try {
      const result = await runMockResearch(
        nextTopic,
        Number(windowDays),
        setSources,
        controller.signal,
      )
      setBrief(result)
      setPhase("done")
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      setPhase("error")
      setError(err instanceof Error ? err.message : "Unknown research failure")
    }
  }

  function resetDesk() {
    abortRef.current?.abort()
    setPhase("idle")
    setBrief(null)
    setError(null)
    setSources(initialSourceProgress())
    setTopic("")
  }

  return (
    <div className="min-h-svh bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(47,111,78,0.06),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(196,92,38,0.05),transparent_40%)]" />
      <div className="relative mx-auto grid min-h-svh w-full max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[340px_1fr] lg:gap-8 lg:px-8 lg:py-8">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-8 lg:self-start">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-900/80">
              <Radio className="h-3.5 w-3.5" />
              last30days playground
            </p>
            <h1 className="font-serif text-3xl leading-[1.1] tracking-tight md:text-[2.15rem]">
              Research desk for the last month.
            </h1>
            <p className="text-sm leading-relaxed text-[color:var(--ink-muted)]">
              Type a topic. Watch five sources progress in parallel. Read a cited
              brief. All fixtures — zero keys.
            </p>
          </div>

          <Card className="rounded-lg border-[color:var(--rule)] bg-[color:var(--paper-raised)] shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">New research run</CardTitle>
              <CardDescription>
                Tip: topic <span className="font-mono">fail</span> forces the error
                state for QA.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. AI agent research skills"
                  className="rounded-md border-[color:var(--rule)] bg-[color:var(--paper)]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canRun) void startResearch()
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="window">Window</Label>
                <Select
                  value={windowDays}
                  onValueChange={(v) => setWindowDays(String(v ?? "30"))}
                >
                  <SelectTrigger
                    id="window"
                    className="w-full rounded-md border-[color:var(--rule)] bg-[color:var(--paper)]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WINDOWS.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  disabled={!canRun}
                  onClick={() => void startResearch()}
                  className="rounded-md bg-emerald-900 text-emerald-50 hover:bg-emerald-800"
                >
                  {phase === "running" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Run research
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetDesk}
                  className="rounded-md border-[color:var(--rule)]"
                >
                  Clear
                </Button>
              </div>
              <Separator className="bg-[color:var(--rule)]" />
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                  Samples
                </p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_TOPICS.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => void startResearch(sample)}
                      className="rounded-sm border border-[color:var(--rule)] bg-[color:var(--chip)] px-2.5 py-1 text-left text-xs text-[color:var(--ink-body)] transition hover:border-emerald-900/30"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {(phase === "running" || phase === "done") && (
            <div className="hidden xl:block">
              <SourceRail sources={sources} active={phase === "running"} />
            </div>
          )}

          <p className="flex items-center gap-2 font-mono text-[11px] text-[color:var(--ink-muted)]">
            <Sparkles className="h-3.5 w-3.5" />
            Status: {statusLabel}
          </p>
        </aside>

        <main className="min-w-0">
          {phase === "idle" && <EmptyDesk />}
          {phase === "running" && (
            <div className="space-y-4 rounded-lg border border-[color:var(--rule)] bg-[color:var(--paper-raised)] p-6">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-900" />
                <h2 className="font-serif text-2xl tracking-tight">
                  Gathering the last {windowDays} days…
                </h2>
              </div>
              <p className="text-sm text-[color:var(--ink-muted)]">
                Mock adapters are streaming progress for{" "}
                <span className="font-medium text-[color:var(--ink)]">{topic}</span>.
                Synthesis unlocks when every source lands.
              </p>
              <SourceRail sources={sources} active />
            </div>
          )}
          {phase === "error" && error && (
            <ErrorPanel message={error} onRetry={() => void startResearch()} />
          )}
          {phase === "done" && brief && <BriefView brief={brief} />}
        </main>
      </div>
    </div>
  )
}
