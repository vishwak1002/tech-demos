import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Bookmark, Search, Sparkles } from 'lucide-react'
import './App.css'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { phases, roles, type GstackRole, type Phase } from '@/data/roles'

const storageKey = 'gstack-playground-brief'
const starterBrief =
  'Build a self-contained playground that helps a founder understand when to use each gstack specialist and how a brief moves from CEO taste review into design and engineering planning.'

function getInitialBrief() {
  try {
    return localStorage.getItem(storageKey) ?? starterBrief
  } catch {
    return starterBrief
  }
}

function App() {
  const [query, setQuery] = useState('')
  const [phase, setPhase] = useState<Phase | 'All'>('All')
  const [selectedRole, setSelectedRole] = useState<GstackRole | null>(roles[0])
  const [brief, setBrief] = useState(getInitialBrief)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, brief)
    } catch {
      // Ignore storage failures so the playground remains usable.
    }
  }, [brief])

  const filteredRoles = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return roles.filter((role) => {
      const inPhase = phase === 'All' || role.phase === phase
      const haystack = `${role.command} ${role.title} ${role.blurb} ${role.does}`.toLowerCase()
      return inPhase && (!needle || haystack.includes(needle))
    })
  }, [phase, query])

  const briefSubject = brief.trim() || 'Untitled product brief'

  const handoff = [
    {
      role: 'CEO review',
      command: '/plan-ceo-review',
      output: `The wedge is founder education, not agent orchestration. Keep ${briefSubject.slice(0, 84)}${briefSubject.length > 84 ? '...' : ''} focused on showing why each specialist exists and where handoffs improve judgment.`,
    },
    {
      role: 'Designer review',
      command: '/plan-design-review',
      output:
        'Use a workbench layout: catalog on the left, brief and pipeline on the right. Make phase movement visible through badges, compact cards, and a clear active detail surface.',
    },
    {
      role: 'Eng Manager plan',
      command: '/plan-eng-review',
      output:
        'Implement as static typed data plus localStorage. Avoid API calls, isolate state in the top-level React component, and verify with the production build.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171411]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="grid gap-4 border-b border-[#d8d1c4] pb-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-[#766b5a]">
              <Sparkles className="h-4 w-4" />
              gstack specialist playground
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#171411] md:text-6xl">
              Browse the roles, then run the handoff.
            </h1>
          </div>
          <Card className="rounded-lg border-[#d8d1c4] bg-[#fffdf8] shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Static demo contract</CardTitle>
              <CardDescription>No live LLM calls. Role data is seeded from the public gstack README.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {['Browse', 'Compose', 'Handoff', 'Local save'].map((label) => (
                <Badge key={label} variant="secondary" className="rounded-md">
                  {label}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </header>

        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-[#e9e2d7] md:w-[360px]">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="handoff">Handoff</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="mt-5">
            <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
              <aside className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-[#7c715f]" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="rounded-lg border-[#cfc7ba] bg-[#fffdf8] pl-9"
                    placeholder="Search slash command or role"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['All', ...phases] as const).map((item) => (
                    <Button
                      key={item}
                      variant={phase === item ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-md"
                      onClick={() => setPhase(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </aside>

              <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRoles.map((role) => (
                  <button key={role.command} className="role-card text-left" onClick={() => setSelectedRole(role)}>
                    <div className="flex items-start justify-between gap-3">
                      <code>{role.command}</code>
                      <Badge className="rounded-md bg-[#1f4f46] text-white">{role.phase}</Badge>
                    </div>
                    <h2>{role.title}</h2>
                    <p>{role.blurb}</p>
                  </button>
                ))}
                {filteredRoles.length === 0 && (
                  <Card className="rounded-lg border-[#d8d1c4] bg-[#fffdf8] shadow-none sm:col-span-2 xl:col-span-3">
                    <CardHeader>
                      <CardTitle>No matching roles</CardTitle>
                      <CardDescription>Clear the search or switch back to all phases.</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </section>
            </div>
          </TabsContent>

          <TabsContent value="handoff" className="mt-5">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="rounded-lg border-[#d8d1c4] bg-[#fffdf8] shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5" />
                    Brief composer
                  </CardTitle>
                  <CardDescription>Saved automatically in this browser.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={brief}
                    onChange={(event) => setBrief(event.target.value)}
                    className="min-h-48 rounded-lg border-[#cfc7ba] bg-white"
                    placeholder="Paste a product idea, bug, feature request, or launch brief."
                  />
                  <Button variant="outline" className="rounded-md" onClick={() => setBrief(starterBrief)}>
                    Reset sample
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-lg border-[#d8d1c4] bg-[#fffdf8] shadow-none">
                <CardHeader>
                  <CardTitle>Mock CEO to Designer to Eng Manager handoff</CardTitle>
                  <CardDescription>Deterministic sample outputs for the current brief.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {handoff.map((step, index) => (
                    <div key={step.command} className="handoff-step">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <Badge variant="outline" className="rounded-md">
                            Step {index + 1}
                          </Badge>
                          <h3>{step.role}</h3>
                        </div>
                        <code>{step.command}</code>
                      </div>
                      <p>{step.output}</p>
                      {index < handoff.length - 1 && <ArrowRight className="mx-auto h-5 w-5 text-[#8b806f]" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Sheet open={selectedRole !== null} onOpenChange={(open) => !open && setSelectedRole(null)}>
        <SheetContent className="w-full border-[#d8d1c4] bg-[#fffdf8] sm:max-w-lg">
          {selectedRole && (
            <>
              <SheetHeader>
                <Badge className="w-fit rounded-md bg-[#1f4f46] text-white">{selectedRole.phase}</Badge>
                <SheetTitle className="text-3xl">{selectedRole.title}</SheetTitle>
                <SheetDescription className="font-mono text-base text-[#5d5549]">{selectedRole.command}</SheetDescription>
              </SheetHeader>
              <Separator className="my-5" />
              <div className="space-y-4 text-sm leading-6 text-[#4d453a]">
                <p>{selectedRole.blurb}</p>
                <p>{selectedRole.does}</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  )
}

export default App
