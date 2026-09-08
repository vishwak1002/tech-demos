export type Phase = 'Think' | 'Plan' | 'Build' | 'Review' | 'Test' | 'Ship' | 'Reflect'

export type GstackRole = {
  command: string
  title: string
  phase: Phase
  blurb: string
  does: string
}

export const phases: Phase[] = ['Think', 'Plan', 'Build', 'Review', 'Test', 'Ship', 'Reflect']

export const roles: GstackRole[] = [
  {
    command: '/office-hours',
    title: 'Founder Office Hours',
    phase: 'Think',
    blurb: 'Turns a vague product instinct into a sharper problem statement, wedge, constraints, and alternatives.',
    does: 'Challenges the premise, names the customer pain, and produces the design doc context later reviewers depend on.',
  },
  {
    command: '/spec',
    title: 'Spec Author',
    phase: 'Think',
    blurb: 'Converts intent into an executable specification with scope, technical notes, and quality gates.',
    does: 'Reads the codebase, drafts the implementation target, redacts secrets, dedupes against existing issues, and stores the spec for reuse.',
  },
  {
    command: '/autoplan',
    title: 'Review Pipeline',
    phase: 'Plan',
    blurb: 'Runs CEO, design, developer experience, and engineering review in sequence for a single amended plan.',
    does: 'Keeps the final engineering gate last so the shipping plan is reviewed after product and surface-level changes.',
  },
  {
    command: '/plan-ceo-review',
    title: 'CEO Reviewer',
    phase: 'Plan',
    blurb: 'Pressure-tests whether the plan is ambitious enough, narrow enough, and pointed at the right market wedge.',
    does: 'Surfaces taste decisions, scope tradeoffs, and the stronger product hidden inside the initial request.',
  },
  {
    command: '/plan-design-review',
    title: 'Design Reviewer',
    phase: 'Plan',
    blurb: 'Reviews planned user-facing work for product clarity, interaction quality, visual direction, and taste.',
    does: 'Pushes the interface toward an inevitable-feeling design with concrete layout, typography, and behavior guidance.',
  },
  {
    command: '/plan-devex-review',
    title: 'DX Reviewer',
    phase: 'Plan',
    blurb: 'Reviews developer-facing plans for time-to-hello-world, friction, docs, examples, and integration flow.',
    does: 'Traces developer personas through setup and first success, then flags confusing or magical-but-brittle steps.',
  },
  {
    command: '/plan-eng-review',
    title: 'Engineering Reviewer',
    phase: 'Plan',
    blurb: 'Audits the plan for architecture, data flow, edge cases, sequencing, tests, and maintainability.',
    does: 'Acts as the final shipping gate for the planned implementation and finds technical ambiguity before code starts.',
  },
  {
    command: '/implement',
    title: 'Builder',
    phase: 'Build',
    blurb: 'Executes the approved plan against the repository while staying inside the intended file and behavior boundaries.',
    does: 'Maps the spec to code changes, follows local patterns, and keeps the working tree focused on the requested demo.',
  },
  {
    command: '/checkpoint',
    title: 'Progress Checkpoint',
    phase: 'Build',
    blurb: 'Captures the current implementation state so a later agent or session can resume with less drift.',
    does: 'Summarizes decisions, files touched, remaining work, and known risks at a concrete point in the build.',
  },
  {
    command: '/review',
    title: 'Staff Engineer Review',
    phase: 'Review',
    blurb: 'Reviews completed code for bugs, regressions, edge cases, missing tests, and maintainability risk.',
    does: 'Prioritizes findings over summaries and pushes the implementation toward mergeable quality.',
  },
  {
    command: '/design-review',
    title: 'Live Design Audit',
    phase: 'Review',
    blurb: 'Audits the running UI after implementation for visual quality, usability, hierarchy, and polish.',
    does: 'Checks screenshots and real interaction states rather than relying only on intended design language.',
  },
  {
    command: '/devex-review',
    title: 'Live DX Audit',
    phase: 'Review',
    blurb: 'Audits shipped developer-facing changes from the point of view of a new or returning integrator.',
    does: 'Looks for broken quickstarts, missing examples, vague errors, and setup friction after the work is real.',
  },
  {
    command: '/security-review',
    title: 'Security Reviewer',
    phase: 'Review',
    blurb: 'Scans implementation choices for secrets exposure, unsafe defaults, auth gaps, and trust-boundary mistakes.',
    does: 'Turns security concerns into concrete fixes before the release path begins.',
  },
  {
    command: '/qa',
    title: 'Browser QA',
    phase: 'Test',
    blurb: 'Exercises the running app through realistic browser paths and reports functional breakage.',
    does: 'Validates core workflows, responsive states, console errors, and obvious user-facing regressions.',
  },
  {
    command: '/test',
    title: 'Test Runner',
    phase: 'Test',
    blurb: 'Runs the relevant automated checks for the current change and interprets failures.',
    does: 'Keeps verification tied to the blast radius instead of running unrelated checks blindly.',
  },
  {
    command: '/fix-ci',
    title: 'CI Repair',
    phase: 'Test',
    blurb: 'Investigates failing continuous integration runs and applies targeted repairs.',
    does: 'Reads failing logs, identifies the first useful failure, and avoids broad churn while restoring the build.',
  },
  {
    command: '/ship',
    title: 'Release Manager',
    phase: 'Ship',
    blurb: 'Prepares the change for delivery after review and verification are complete.',
    does: 'Coordinates final checks, release notes, PR hygiene, and merge readiness.',
  },
  {
    command: '/make-pdf',
    title: 'Publisher',
    phase: 'Ship',
    blurb: 'Turns markdown into a polished offline document with diagrams and export formats.',
    does: 'Renders Mermaid and excalidraw diagrams, handles images, and emits PDF, HTML, or DOCX artifacts.',
  },
  {
    command: '/setup-browser-cookies',
    title: 'Session Manager',
    phase: 'Test',
    blurb: 'Imports real browser cookies so authenticated product paths can be tested in a bundled browser.',
    does: 'Supports authenticated QA paths without hard-coding credentials into the project.',
  },
  {
    command: '/learn',
    title: 'Memory Curator',
    phase: 'Reflect',
    blurb: 'Manages durable project learnings so future sessions inherit useful patterns and preferences.',
    does: 'Reviews, searches, prunes, and exports lessons from previous work.',
  },
  {
    command: '/retro',
    title: 'Retrospective',
    phase: 'Reflect',
    blurb: 'Turns a finished effort into lessons about process, scope, risks, and better next moves.',
    does: 'Captures what changed, what surprised the team, and what should be done differently next time.',
  },
  {
    command: '/cso',
    title: 'Strategy Officer',
    phase: 'Think',
    blurb: 'Frames positioning, market sequencing, and strategic tradeoffs around a product bet.',
    does: 'Connects the feature idea to distribution, competition, narrative, and company-level leverage.',
  },
  {
    command: '/docs',
    title: 'Doc Engineer',
    phase: 'Ship',
    blurb: 'Shapes implementation details into clear user-facing or developer-facing documentation.',
    does: 'Builds concise docs that explain the path to value and reduce support load after release.',
  },
]
