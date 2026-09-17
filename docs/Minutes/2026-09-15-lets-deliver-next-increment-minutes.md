---
aliases: []
date: '2026-09-15'
id: 9e074528-minutes
meeting_id: 9e074528
project: Asteroids Survivor
summary: Minutes for lets deliver the next increment.
tags:
- minutes
- asteroids-survivor
- meeting
title: Minutes — lets deliver the next increment
type: minutes
---

# Minutes — lets deliver the next increment

**Date:** 2026-09-15
**Kind:** Full directive
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Architect
- Tech Researcher
- You

## Executive Summary

The room aligned on shipping the wave-1 core loop as the third gate — a minimal retention probe (move, auto-fire, XP, upgrade choice, wave clear) deployed to GitHub Pages by tomorrow. Four telemetry events (session_start, wave_cleared, upgrade_chosen, session_end) are locked as success criteria alongside Day-1 ≥35% and Day-7 ≥12% retention targets. Workstreams: Lead Engineer owns CI (unblocks merge), TEM owns beacon mapping and core loop in parallel (mapping first, since core loop needs the upgrade_chosen hook), Security Engineer reviews async as a merge gate. Multiple attendees explicitly blocked next-increment discussion until this increment ships and retention data is reviewed. The upgrade_chosen hook mechanism was settled via Interview: a typed event emitter from a dedicated `upgradeHook.ts` module.

## Discussion Highlights

- Product Manager opened with three workstreams: repo+CI to Lead Engineer, persistence+beacon to TEM, third gate unnamed.
- Technical Engineering Manager defined gate three as "wave-1 core loop" — smallest retention probe shipped to Pages by tomorrow.
- Data Analyst locked four telemetry events (session_start, wave_cleared, upgrade_chosen, session_end with duration) as the measurable funnel for retention targets (≥35% Day-1, ≥12% Day-7).
- UX/UI Designer tied Gate 3 UX validation to the core loop landing: 5-second control discovery, upgrade choice clarity (single clear choice, text+icon, single tap/click), and juicy wave-clear feedback that preserves run momentum.
- Architect directed TEM to keep persistence pure — generic store-change hook only — with telemetry module mapping to beacon events, avoiding hidden coupling.
- Tech Researcher confirmed beacon schema matches four events and persistence has generic hook; mapping layer and optional Workbox queue are new wiring.
- Product Manager sequenced: Lead Engineer starts CI now; TEM picks up beacon mapping and core loop in parallel; Security Engineer async review blocks merge only.
- Technical Engineering Manager clarified CI unblocks merge; beacon mapping first (core loop needs upgrade_chosen hook wired before UX can validate); Workbox queue is stretch.
- Data Analyst, Lead Engineer, UX/UI Designer, Architect, and Tech Researcher each independently stated that next-increment discussion is scope creep — current increment (CI, beacon mapping, wave-1 core loop) must ship and be measured first.
- You presented Interview results settling the upgrade_chosen hook: typed event emitter (mitt or minimal EventTarget) from `upgradeHook.ts`; core loop emits, UX validator subscribes.
- Technical Engineering Manager and Data Analyst confirmed settled: four events locked, hook mechanism defined, increment scoped to ship tomorrow.

## Key Decisions Made

- Third gate = wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear) shipped to Pages tomorrow.
- Four telemetry events locked: session_start, wave_cleared, upgrade_chosen, session_end (with duration).
- Retention success criteria: ≥35% Day-1, ≥12% Day-7.
- Persistence layer stays pure — generic store-change hook only; telemetry module maps to beacon events.
- upgrade_chosen hook mechanism: typed event emitter from dedicated `upgradeHook.ts` module.
- Workstream ownership: Lead Engineer → CI; TEM → beacon mapping + core loop (mapping first); Security Engineer → async merge gate.
- No next-increment planning until current increment ships and retention data reviewed.

## Action Items & Next Steps

- [ ] Implement CI pipeline (npm ci && build && gh-pages deploy) — Lead Engineer
- [ ] Build beacon event mapping layer (persistence hook → four beacon events) — Technical Engineering Manager
- [ ] Implement wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear) — Technical Engineering Manager
- [ ] Wire upgrade_chosen hook (emitter from upgradeHook.ts) for UX validation — Technical Engineering Manager
- [ ] Validate Gate 3 UX criteria (5s control discovery, upgrade choice clarity, wave-clear feedback) — UX/UI Designer
- [ ] Async security review (merge gate) — Security Engineer

## Open Questions & Risks

- define wave-1 acceptance criteria ([[todos]]) — TEM
- verify beacon.ts emits exactly those four event shapes ([[todos]]) — TEM
- sketch telemetry mapping layer ([[todos]]) — Tech Researcher
- Security Engineer async gate review ([[todos]]) — Security Engineer
- Draft a versioned telemetry event schema ([[todos]]) — Architect
- third-gate-defined-as-wave-1-core-loop ([[memory]])
- telemetry-four-events-session-start-wave-cleared-upgrade-chosen-session-end ([[memory]])
- persistence has generic store-change hook ([[memory]])
- telemetry four events locked ([[memory]])

## Links

- [[Project]]
- [[2026-09-15-lets-deliver-next-increment]]
- [[9e074528-roadmap]]
- [[Index]]
