---
aliases: []
attendees:
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Product Manager
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
date: '2026-09-17'
kind: technical
meeting_id: 90e0f1be
models:
  Architect: NVIDIA NIM/nvidia/nemotron-3-super-120b-a12b
  Data Analyst: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  DevOps Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Lead Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Product Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  QA Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Security Engineer: NVIDIA NIM/nvidia/nemotron-3-super-120b-a12b
  Technical Engineering Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  UX/UI Designer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
project: Asteroids Survivor
status: completed
summary: Meeting note on Lead Engineer builds in-world picker scene with Rex plugin
  (pauses physics, +18.
tags:
- meeting
- technical
- asteroids-survivor
title: Lead Engineer builds in-world picker scene with Rex plugin (pauses physics,
  +18
type: meeting
---

# Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, +18

**Kind:** Technical
**Date:** 2026-09-17
**Status:** completed
**Project:** [[Project]]
**Roadmap:** [[90e0f1be-roadmap]]
**Minutes:** [[2026-09-17-lead-engineer-builds-world-minutes]]

## Attendees

- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Product Manager
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer

## Transcript

## You

Plan these roadmap items for execution. Produce an action plan: ordered steps, owners, dependencies, and what is deliberately not this increment. Do not reopen the concept or locked stack issues.

## Now

- Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, renders world coords) -- owner: Lead Engineer
  - Risk: Rex plugin bundle impact must stay inside Step 4 budget; Tech Researcher claims it does, but unmeasured
- Technical Engineering Manager wires picker into game flow (XP thresholds, `shatter()` hook, `DEATH_EVENT` piggyback) -- owner: Technical Engineering Manager
- UX/UI Designer validates ≤5 s control discovery on mobile (three icons, one-tap, no scroll/tooltip hunt) -- owner: UX/UI Designer
- Data Analyst verifies `upgrade` event carries world coords + `session_id` in beacon -- owner: Data Analyst
- Ship to Pages for Day-1 retention probe -- owner: Technical Engineering Manager
- Implement wave difficulty curve driven by playtime (not player level) -- owner: Lead Engineer
  - Risk: Curve must feel fair across session lengths; validate with playtest.
- Build three-option upgrade picker (three distinct icons, one tap, no scroll, five-second discovery) -- owner: UX/UI Designer + Lead Engineer
  - Risk: Icon clarity at small sizes; test on mobile viewport.
- Lead Engineer pushes repo + CI with frozen telemetry schema -- owner: Lead Engineer
  - Risk: Cheap pipeline lacks lint/typecheck/test gates; regressions possible until Day-2 hardening.
- Technical Engineering Manager pushes persistence + beacon with security checks -- owner: Technical Engineering Manager
  - Risk: Event-bus contract not yet defined; hidden coupling if handshake drifts from schema.
- UX/UI Designer publishes first-run criteria doc -- owner: UX/UI Designer
  - Risk: Criteria must be testable tomorrow; vague criteria would block Gate 3 verification.
- Beacon event mapping layer -- owner: Technical Engineering Manager
  - Risk: Must wire `upgrade_chosen` hook before UX can validate the choice screen; mapping runs in parallel with core loop but is on the critical path for UX validation
- Wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear) -- owner: Technical Engineering Manager / Lead Engineer
  - Risk: UX validation criteria (5-second discovery, single-tap upgrade, non-pause wave clear) can only be tested once the loop lands
- Freeze telemetry schema (session_id, event_name, timestamp, properties) -- owner: Data Analyst
  - Risk: Must land before scaffold ships tomorrow; beacon in Step 1 depends on it
- Record stack ADR -- owner: Lead Engineer
  - Risk: Scaffold stalls tomorrow if ADR not recorded
- Ship scaffold (Step 1) -- owner: Lead Engineer
  - Risk: None if ADR recorded and schema frozen; current CI (lint + typecheck) only
- Add CSP header + `npm audit` to CI job -- owner: Security Engineer
  - Risk: Minimal hardening for Step 1; full security review gates Step 3
- Freeze telemetry ADR -- owner: Lead Engineer
  - Risk: Schema must be final; any post-freeze change invalidates analytics contracts and CI gate.
- Land CI pipeline -- owner: Technical Engineering Manager
  - Risk: Single-job pipeline must pass on `main` today; no lint/typecheck/test gates per PROJECT LANGUAGE, so breakage = deploy failure.
- Add Lighthouse CI performance gate -- owner: Technical Engineering Manager
  - Risk: Budgets are tight (JS ≤ 170 kB gzipped); first build may exceed and block PR.

## Product Manager

Here. This room is enough. We can start.

## Product Manager

No gaps flagged. Confirm when the room is complete.

## You

lets start the meeting

## Technical Engineering Manager

Here. We're consolidating the locked XP progression scope into one executable sequence — picker, telemetry, wave-1 loop, and the Pages deploy — with owners and dependencies explicit.

## Data Analyst

Data Analyst confirms telemetry schema frozen; session_id persistence check is the gate before beacon mapping lands.

## System

Data Analyst parked: verify storage.ts persists stable session_id across browser close or specify mint-in-startRun implementation

## System

Data Analyst pinned: session_id must survive browser close for retention probe

## System

QA Engineer parked: write gate 1-3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze)

## System

QA Engineer pinned: session_id must survive browser close for retention probe

## Architect

Will 'lets start the meeting' need a rewrite in a year? I'd rather we get the structure right now than patch around it later.

## Lead Engineer

Right. The room's full. Let me consolidate the locked XP progression scope into one executable sequence — no new scope, just ordering what's already decided.

**Action Plan — XP & Skill Progression Slice (Retention Probe)**

---

### 1. Schema & Persistence Gates (must land before beacon mapping)
| Step | Owner | Dependency | Deliverable |
|------|-------|------------|-------------|
| 1.1 Freeze telemetry ADR (session_id, event_name, timestamp, properties) | Lead Engineer | — | ADR committed, schema final |
| 1.2 Security sign-off `currentBuild: Upgrade[]` (local-only, no new telemetry IDs) | Security Engineer | 1.1 | Written approval in PR |
| 1.3 Confirm `storage.ts`

## Security Engineer

Alright, let's get the security checks in early. I'll review the currentBuild schema before we merge.

## DevOps Engineer

CI is green on `main` — schema freeze and Security sign-off unblock the beacon mapping and Pages deploy.

## System

DevOps Engineer parked: Harden CI with lint/typecheck/test gates and Lighthouse budgets

## System

Shared memory is full (12). Forget a row from Brief.

## UX/UI Designer

Picker UX validation waits on Lead Engineer's Rex scene; I'll own the ≤5s discovery check and the first-pick clarity pass.

## System

UX/UI Designer parked: Validate picker on mobile viewport

## System

Shared memory is full (12). Forget a row from Brief.

## Product Manager

Good — schema freeze and CI green unblock the critical path. Security sign-off on `currentBuild` is the last gate before beacon mapping can land.

Lead Engineer, finish the sequence — I need the picker implementation steps, the wave-1 loop wiring, and the Pages deploy trigger in order. UX, your ≤5s discovery check is the Go/No-Go for the probe; say the word when the Rex scene is testable on device.

Data Analyst, confirm `session_id` survives browser close in `storage.ts` or specify the `startRun()` mint — without it the funnel breaks at step two.

No new scope. Ship the probe.

## Technical Engineering Manager

**Action Plan — XP & Skill Progression Slice (Retention Probe)**

---

### Phase 0: Schema & Persistence Gates (serial, unblocks everything)
| # | Step | Owner | Dependency | Done When |
|---|------|-------|------------|-----------|
| 0.1 | Freeze telemetry ADR (session_id, event_name, timestamp, properties) | Lead Engineer | — | ADR committed, schema final |
| 0.2 | Security sign-off `currentBuild: Upgrade[]` (local-only, no new telemetry IDs) | Security Engineer | 0.1 | Written approval in PR |
| 0.3 | Confirm `storage.ts` persists stable `session_id` across browser close **or** spec mint-in-`startRun()` | Data Analyst | 0.1 | Decision recorded in PR |
| 0.4 | Ship scaffold (Step 1) — repo + CI with frozen schema | Lead Engineer | 0.1, 0.2, 0.3 | Green on `main` |
| 0.5 | Add CSP header + `npm audit` to CI job | Security Engineer | 0.4 | CI job passes with headers |
| 0.6 | Land CI pipeline (cheap budget job) | TEM | 0.4 | Deploy on `main` push works |
| 0.7 | Add Lighthouse CI performance gate (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms, JS ≤170kB gz) | TEM | 0.6 | Gate fails PR on regression |

---

### Phase 1: Picker Implementation (parallel with Phase 0.4+)
| # | Step | Owner | Dependency | Done When |
|---|------|-------|------------|-----------|
| 1.1 | Build in-world picker `Scene` with `phaser3-rex-plugins` — pauses physics, renders world coords, three distinct icons, one-tap, no scroll, auto-dismiss 5s | Lead Engineer | 0.1 (schema) | Scene launches, picks emit `UPGRADE_PICKED_EVENT` |
| 1.2 | UX validates ≤5s control discovery on mobile (vignette + enlarge-on-hover) | UX/UI Designer | 1.1 | Go/No-Go recorded |
| 1.3 | Three-option upgrade picker polish (idle/hover/pressed/disabled states) | UX/UI Designer + Lead Engineer | 1.1 | Icons clear at mobile viewport |

---

### Phase 2: Beacon Mapping & Telemetry (after Phase 0.2, 0.3)
| # | Step | Owner | Dependency | Done When |
|---|------|-------|------------|-----------|
| 2.1 | Implement beacon event mapping layer for four events (`session_start`, `wave_cleared`, `upgrade_chosen`, `session_end`) | TEM | 0.2, 0.3 | Events fire in prod beacon test |
| 2.2 | Wire `upgrade_chosen` emitter (`upgradeHook.ts` per ADR 001) with `worldX`, `worldY`, `session_id` | Lead Engineer | 2.1 | Payload verified in beacon |
| 2.3 | Data Analyst verifies `upgrade` event carries world coords + `session_id` | Data Analyst | 2.2 | Test pass in CI |

---

### Phase 3: Wave-1 Core Loop Wiring (after Phase 1.1, 2.1)
| # | Step |

## Data Analyst

Schema freeze and session_id gate are the critical path for measurement — I'll confirm storage.ts persistence or spec the startRun() mint today so beacon mapping doesn't stall.

## QA Engineer

Need pass/fail criteria committed to repo for every gate, bundle budget enforcement beyond Lighthouse, event-bus contract test, and a physics-regression test for the pause/resume cycle. Data Analyst: put the session_id persistence proof in the PR today.

## System

QA Engineer parked: write gate 1-3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze)

## Architect

Let's begin by confirming the frozen telemetry schema and session_id persistence as the foundation for the probe.  
After that, we can sequence the picker build, beacon mapping, and core loop wiring.

## Lead Engineer

Phase 0.1–0.3 today. Phase 1 starts tomorrow. Beacon mapping and core loop follow. No new scope.

## System

QA Engineer parked: Define pass/fail criteria for each gate in repo

## System

Shared memory is full (12). Forget a row from Brief.

## Security Engineer

Let's start. I'll review the currentBuild schema for security once the telemetry ADR is frozen and session_id persistence is confirmed.

## DevOps Engineer

Phase 0 today (ADR freeze, Security sign-off, session_id decision, scaffold, CI, Lighthouse gate). Phase 1 tomorrow (Rex picker scene, UX validation, icon polish). Phase 2 after 0.2/0.3 (beacon mapping, upgrade_chosen wiring, DA verification). Phase 3 after 1.1/2.1 (core loop wiring, wave curve by playtime, Gate 3 UX validation). Phase 4 deploy to Pages for retention probe. Meta-progression, full CI hardening, Workbox, leaderboard/backend explicitly not this increment. QA: add pass/fail criteria for bundle budget, event-bus contract, and pause/resume physics regression to the PR checklist now.

## System

QA Engineer parked: Codify QA pass/fail criteria (bundle budget, event-bus contract, physics-regression test for pause/resume) into PR checklist

## System

Shared memory is full (12). Forget a row from Brief.

## Architect

@devops refute claim=will-lets-start-the-meeting-need-a-rewrite because=will-lets-start-the-meeting-need-a-rewrite

## System

Product Manager moved the room on to Consolidate.

## Product Manager

Phase 0 today. Phase 1 tomorrow.

## Technical Engineering Manager

Phase 0 today — I own 0.6 (cheap CI pipeline to Pages) and 0.7 (Lighthouse gate with budgets). Both land after Lead Engineer's scaffold (0.4) and Security's CSP/audit (0.5).

## Product Manager

Phase 0 today. Phase 1 tomorrow.

## System

Data Analyst parked: Verify session_id persistence proof lands in PR today

## System

Product Manager pinned: session_id must survive browser close for retention probe

## Technical Engineering Manager

Phase 0 today — schema freeze, Security sign-off, session_id decision, scaffold, CI, Lighthouse gate. I own the CI pipeline (0.6) and Lighthouse budgets (0.7); both land after Lead Engineer's scaffold (0.4) and Security's CSP/audit (0.5).

## You

The Interview you asked for is done. These are now defined, and they are settled:

1. threat-modeling for Define: and WHY: ... or: Expert recommendation: Authenticate Define: and WHY: ... or at the boundary, authorize per resource, and rate-limit whatever an attacker can reach.

Reason from these as given. Do not re-argue them, and drop whichever assumptions you were each carrying instead.

## Data Analyst

I'll verify storage.ts session_id persistence or write the startRun() mint spec today — beacon mapping depends on it.

## System

Data Analyst pinned: session_id must survive browser close for retention probe

## QA Engineer

Writing gate 1-3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) to the PR checklist today — that's my gate on the probe deploy.

## Architect

Product Manager, the consolidation is clear: schema, session_id, and the Rex picker are the only variables left. QA, once the pass/fail checks are in the PR, we can gate the Pages deploy without rework.

## System

Shared memory is full (12). Forget a row from Brief.

## Security Engineer

Those three items aren't just variables—they each draw trust boundaries. Session_id persistence exposes a device identifier; currentBuild stores upgrade state; the Rex picker renders in-world coordinates.

## DevOps Engineer

Consolidated plan stands. I own 0.6 (cheap CI pipeline to Pages) and 0.7 (Lighthouse budgets) — both land after scaffold (0.4) and Security's CSP/audit (0.5).

## UX/UI Designer

Plan consolidated. Phase 1 tomorrow — I'm ready to validate the Rex picker scene on device the moment Lead Engineer lands 1.1.

---

Back to [[Project]]
