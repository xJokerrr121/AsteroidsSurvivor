---
aliases: []
date: '2026-09-15'
meeting_id: 66c0c184
project: Asteroids Survivor
status: planned
summary: todo integrations — Execution Spec
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: Plan — todo integrations — Execution Spec
type: plan
---

# Plan — todo integrations — Execution Spec

**Date:** 2026-09-15  
**Kind:** Technical  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `66c0c184`  

## Attendees & Ownership

- Product Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
- Tech Researcher

## Goal
Ship Gate 1 (repo + CI with frozen telemetry schema) and Gate 2 (IndexedDB persistence + beacon telemetry with security checks) today so the scaffold can land tomorrow. Gate 3 (playable core loop) gets UX acceptance criteria published today for tomorrow's verification. All gates require pass/fail checks and a security verification checklist (aggregated-only telemetry, local-only persistence until opt-in).

## Locked decisions
- Three gates with pass/fail checks: Gate 1 repo+CI (Lead Engineer), Gate 2 persistence+beacon (Technical Engineering Manager), Gate 3 playable core loop (owner unnamed) — [[ADR-three-gates]]
- Scaffold tomorrow if Gates 1 and 2 land today — [[ADR-scaffold-tomorrow]]
- Security verification checklist on every gate: beacon sends only aggregated, non-identifiable data; persistence stays local until opt-in — [[ADR-security-checklist]]
- Telemetry schema frozen in repo (session_id, event_name, timestamp, properties) — [[ADR-telemetry-schema]]
- Minimal event-bus contract between persistence and beacon owned by TEM; Lead Engineer exposes schema, TEM defines handshake — [[ADR-event-bus-contract]]
- UX acceptance criteria for Gate 3: first-run completes wave 1 without tutorial, controls discovered in ≤5s, upgrade choice understood on first pick — [[ADR-ux-criteria]]
- CI pipeline: cheap single job `npm ci && npm run build && npx gh-pages -d dist` on every `main` push; lint/typecheck/test gates added post-scaffold as Day-2 task — [[ADR-ci-pipeline]]
- Event-bus requires four telemetry events for first-run criteria; event-bus contract includes security checklist — [[ADR-event-bus-telemetry]]

## Constraints
- Must: Zero backend for MVP — all state local (IndexedDB), analytics via client-side beacon to managed endpoint (Plausible/Umami/Cloudflare Worker)
- Must: Telemetry uses `navigator.sendBeacon()` with frozen JSON schema
- Must: Persistence stays local until explicit opt-in
- Must: Each gate has a measurable pass/fail signal
- Must-not: Block scaffold on lint/typecheck/test gates (Day-2 follow-up only)
- Out of scope: Leaderboard, backend auth, rate-limiting, CSV export, Lighthouse CI budgets

## Surfaces
- **Repo root**: `package.json`, `tsconfig.json`, `.github/workflows/ci.yml` (single job: `npm ci && npm run build && npx gh-pages -d dist`)
- **Telemetry schema**: `src/telemetry/schema.json` — `{ session_id: string, event_name: string, timestamp: number, properties: Record<string, unknown> }`
- **Event-bus contract**: `src/event-bus/contract.ts` — minimal typed interface between persistence and beacon (four events: `session_start`, `wave1_complete`, `control_discovered`, `upgrade_picked`)
- **Persistence module**: `src/persistence/index.ts` — IndexedDB wrapper, local-only, exports `saveState`, `loadState`, `clearState`
- **Beacon module**: `src/telemetry/beacon.ts` — `sendEvent(event: TelemetryEvent)` using `navigator.sendBeacon()`, aggregates only, no PII
- **Security checklist**: `SECURITY_CHECKLIST.md` — per-gate verification steps (aggregated-only, local-only, opt-in guard)
- **UX criteria doc**: `UX_FIRST_RUN_CRITERIA.md` — wave-1 completion, ≤5s control discovery, upgrade choice understood
- **Scaffold entry**: `src/main.ts` — bootstraps persistence, beacon, event-bus; renders to `#app`

## Execution graph
```mermaid
flowchart TD
    A[Freeze telemetry schema in repo] --> B[Implement repo + CI pipeline]
    A --> C[Implement persistence (IndexedDB)]
    A --> D[Implement beacon telemetry]
    C --> E[Define event-bus contract + handshake]
    D --> E
    E --> F[Wire persistence + beacon via event-bus]
    F --> G[Add security checklist to Gate 1 & 2 done criteria]
    B --> H[Gate 1 pass/fail: CI green + schema frozen + security checklist pass]
    G --> I[Gate 2 pass/fail: persistence+beacon work + event-bus handshake + security checklist pass]
    J[Publish UX first-run criteria doc] --> K[Gate 3 criteria ready for tomorrow]
    H --> L[Scaffold tomorrow if Gate 1 & 2 pass]
    I --> L
    K --> L
```

## Steps
1. `src/telemetry/schema.json` — Write frozen telemetry schema (session_id, event_name, timestamp, properties) — Acceptance: file exists, valid JSON, matches expert schema, committed to `main`
2. `.github/workflows/ci.yml` — Add cheap CI pipeline: single job `npm ci && npm run build && npx gh-pages -d dist` on `main` push — Acceptance: workflow runs green on push, deploys to gh-pages
3. `src/persistence/index.ts` — Implement IndexedDB wrapper with `saveState`, `loadState`, `clearState`; enforce local-only, no network — Acceptance: unit test writes/reads/clears state in IndexedDB, no fetch/XHR calls
4. `src/telemetry/beacon.ts` — Implement `sendEvent(event)` using `navigator.sendBeacon()` to managed endpoint; serialize per frozen schema; strip PII — Acceptance: test sends beacon with aggregated payload, no identifier fields present
5. `src/event-bus/contract.ts` — Define minimal event-bus interface (four events: `session_start`, `wave1_complete`, `control_discovered`, `upgrade_picked`) and handshake types — Acceptance: TypeScript compiles, persistence and beacon import types without circular deps
6. `src/persistence/index.ts` + `src/telemetry/beacon.ts` — Wire persistence and beacon via event-bus: persistence emits events, beacon subscribes and sends — Acceptance: integration test shows `wave1_complete` persisted then beaconed with correct schema
7. `SECURITY_CHECKLIST.md` — Add per-gate security verification: (a) beacon payload contains only aggregated fields, (b) persistence never writes to network, (c) opt-in guard blocks sharing — Acceptance: checklist exists, Gate 1 and Gate 2 CI steps reference it
8. `UX_FIRST_RUN_CRITERIA.md` — Publish UX acceptance criteria: wave-1 completion without tutorial, controls discovered ≤5s, upgrade choice understood on first pick — Acceptance: doc exists, references four telemetry events, ready for tomorrow's verification
9. `src/main.ts` — Scaffold entry: bootstrap persistence, beacon, event-bus; render to `#app` — Acceptance: `npm run build` succeeds, `dist/` contains bootstrapped app, no console errors on load

## Verification
- Gate 1 pass: CI workflow green on `main`, `src/telemetry/schema.json` present and frozen, `SECURITY_CHECKLIST.md` Gate 1 items checked
- Gate 2 pass: Persistence+beacon integration test passes, event-bus handshake works, `SECURITY_CHECKLIST.md` Gate 2 items checked
- Gate 3 ready: `UX_FIRST_RUN_CRITERIA.md` published and references four telemetry events
- Scaffold unblocked: Both Gate 1 and Gate 2 pass today → scaffold runs tomorrow

## Open risks
- Gate 3 owner unnamed — who verifies playable core loop tomorrow?
- Managed analytics endpoint (Plausible/Umami/Cloudflare Worker) not selected — beacon URL placeholder needed
- Four telemetry event payload shapes not fully specified — only names locked
- Opt-in UI/flow for persistence sharing not designed — only "local until opt-in" constraint
- Date for scaffold tomorrow not explicitly confirmed as 2026-09-16 — assume next calendar day

---

## Links

- [[Project]]
- Source meeting: `66c0c184`
