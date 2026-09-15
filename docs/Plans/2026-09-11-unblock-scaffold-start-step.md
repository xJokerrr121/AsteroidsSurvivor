---
aliases: []
date: '2026-09-11'
meeting_id: f9bddde9
project: Asteroids Survivor
status: planned
summary: 'Unblock scaffold start (Step 1) by completing the three hard prerequisites
  today (2026-09-11): freeze telemetry schema &'
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: 'Plan — Unblock scaffold start (Step 1) by completing the three hard prerequisites
  today (2026-09-11): freeze telemetry schema &'
type: plan
---

# Plan — Unblock scaffold start (Step 1) by completing the three hard prerequisites today (2026-09-11): freeze telemetry schema &

**Date:** 2026-09-11  
**Kind:** Refine  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `f9bddde9`  

## Attendees & Ownership

- Product Manager
- Technical Engineering Manager
- Lead Engineer
- Security Engineer
- QA Engineer

Unblock scaffold start (Step 1) by completing the three hard prerequisites today (2026-09-11): freeze telemetry schema & transport, record Stack ADR, and implement CI pipeline with Performance budget & Core Web Vitals guardrails. Once these land, the original 12-day increment plan can execute as locked.

## Already settled
- Scope locked to core loop + local persistence (IndexedDB) + deploy to GitHub Pages; everything else is a seat todo — Product Manager
- Retention targets: Day-1 ≥ 35%, Day-7 ≥ 12% — Data Analyst
- Telemetry schema freezes today (2026-09-11) — Data Analyst, Security Engineer, QA Engineer
- Stack ADR must be recorded before scaffold starts tomorrow — Lead Engineer, Technical Engineering Manager
- CI for Step 1 includes CSP header + `npm audit`; lint + typecheck already present; full gates (Lighthouse CI, etc.) gate Step 4 — Security Engineer, QA Engineer, Lead Engineer
- Security review of beacon payload moves to parallel gate before Step 3 — Security Engineer
- Threat-model IndexedDB→beacon before Step 3 — Security Engineer
- UX delivers one-page core loop flow + test group definition + pass/fail criteria by tomorrow 9am (2026-09-12 09:00) — UX/UI Designer
- Test group: 3 named players (streamer, speedrunner, casual), recruited by 2026-09-18, session Monday 2026-09-21 10:00 — UX/UI Designer
- Pass/fail criteria: survive 90s on first life AND hit "continue" after death without asking what to do — UX/UI Designer
- Step 3 = first-playable test session with named group; Step 4 = all hardening gates — Lead Engineer, Product Manager
- Deploy to GitHub Pages on zero-cost infra via `npx gh-pages -d dist`
- Must-not: Add backend, leaderboard, multiplayer, or any feature outside core loop + local save + deploy

## Still open
The review found three hard gates blocking scaffold tomorrow (2026-09-12) that must complete today (2026-09-11):
1. **Client-side telemetry schema & transport** freeze — schema file not committed, analytics endpoint not selected, owner not named
2. **Stack ADR** not recorded — includes unit test framework choice (Vitest/Jest), Lead Engineer must confirm before scaffold
3. **CI pipeline definition** with **Performance budget & Core Web Vitals guardrails in CI** not implemented — needs Lighthouse CI step with budgets (LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped)

Additional unstartable work:
- Test player recruitment — no explicit owner named (depends on UX/UI Designer or Product Manager)
- Threat model and beacon review — Security Engineer bandwidth, no date committed before 2026-09-21
- First-playable scope (ship, asteroids, movement, shooting, collision, death, continue) not broken into tasks — Lead Engineer must sequence implementation

## Execution graph
```mermaid
flowchart TD
    A[Freeze telemetry schema & select analytics endpoint] --> B[Record Stack ADR with unit test framework choice]
    B --> C[Implement CI pipeline with Performance budget & Core Web Vitals guardrails]
    C --> D[Scaffold can start tomorrow (Step 1)]
    D --> E[UX delivers core loop flow + test group + pass/fail by 9am]
    E --> F[Recruit 3 test players by 2026-09-18]
    F --> G[Threat-model IndexedDB→beacon]
    G --> H[Security review beacon payload]
    H --> I[Step 3: First-playable session 2026-09-21 10:00]
    I --> J[Step 4: All hardening gates]
```

## Instructions
1. `docs/telemetry/schema.json` — create and commit the frozen telemetry event schema with fields: `session_id` (string, UUID), `event_name` (string, enum: session_start, session_end, death, continue, upgrade_pick, wave_complete), `timestamp` (ISO 8601), `properties` (object, extensible) — Acceptance: file exists in repo, schema validated against sample events, no further changes after today
2. `docs/telemetry/endpoint.md` — document selected analytics endpoint (Plausible/Umami/Cloudflare Worker) with endpoint URL, payload format, and sendBeacon integration snippet — Acceptance: endpoint chosen, URL recorded, snippet ready for Step 1 beacon integration
3. `docs/adr/001-stack.md` — record Stack ADR locking: framework (Vite + TypeScript), rendering (Canvas via Phaser 3 or raw Canvas — pick one), unit test framework (Vitest or Jest — pick one), build output (`dist/`), deploy target (GitHub Pages) — Acceptance: ADR committed, Lead Engineer confirms before 2026-09-12
4. `.github/workflows/ci.yml` — add/replace CI job to: `npm ci && npm run build && npx gh-pages -d dist` + CSP header generation + `npm audit` + Lighthouse CI step with budgets (LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped) — Acceptance: workflow runs on push to main, fails on any budget regression, CSP header present in deployed Pages response, `npm audit` passes
5. `src/telemetry/beacon.ts` — implement `sendBeacon` wrapper using frozen schema and selected endpoint; export `track(eventName, properties)` — Acceptance: TypeScript compiles, wrapper calls `navigator.sendBeacon` with correct payload shape, no console errors in dev
6. `docs/security/threat-model-indexeddb-beacon.md` — write threat model covering IndexedDB read/exfiltration, beacon payload tampering, replay, and PII leakage — Acceptance: document exists, Security Engineer reviews and signs off before Step 3
7. `docs/ux/core-loop-flow.md` — UX delivers one-page core loop flow: first-run actions, persistence (IndexedDB keys), return experience, test group roster (3 named players with contact/availability), pass/fail criteria (survive 90s on first life AND hit "continue" after death without asking) — Acceptance: file committed by 2026-09-12 09:00, all three players named and confirmed
8. `tasks/first-playable.md` — Lead Engineer breaks first-playable scope into ordered tasks: ship entity, asteroid spawning, movement, shooting, collision detection, death, continue flow, IndexedDB save/load — Acceptance: task list with dependencies, estimates, and owner per task; enables Step 3 session on 2026-09-21 10:00

## Verification
- All three prerequisites (telemetry schema file, Stack ADR, CI pipeline with Lighthouse budgets) are committed and passing on `main` before 2026-09-12 00:00
- Scaffold (Step 1) can begin tomorrow without waiting on any of the above
- UX artifact delivered by 2026-09-12 09:00 with named test group
- Security threat model and beacon review complete before 2026-09-21
- First-playable session runs 2026-09-21 10:00 with pass/fail criteria baked in

## Open risks
- No explicit owner named for committing telemetry schema file today — if Lead Engineer does not pick this up, scaffold stays blocked
- Analytics endpoint selection (Plausible/Umami/Cloudflare Worker) not decided — blocks beacon implementation
- Security Engineer bandwidth for threat model and beacon review — no date committed before 2026-09-21
- Test player recruitment — no explicit owner (UX/UI Designer or Product Manager), deadline 2026-09-18
- Unit test framework choice (Vitest/Jest) undecided — part of Stack ADR, must be picked today
- First-playable task breakdown not started — Lead Engineer must sequence before implementation begins

---

## Links

- [[Project]]
- Source meeting: `f9bddde9`
