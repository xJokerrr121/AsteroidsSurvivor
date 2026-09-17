---
aliases: []
date: '2026-09-15'
format: markdown
id: 9e074528-roadmap
meeting_id: 9e074528
project: Asteroids Survivor
summary: Strategic implementation roadmap for lets deliver the next increment.
tags:
- roadmap
- asteroids-survivor
- planning
title: Roadmap — lets deliver the next increment
type: roadmap
---

# lets deliver the next increment

**Project:** Asteroids Survivor
**Date:** 2026-09-15
**Meeting:** Full directive
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Architect
- Tech Researcher
- You

## Situation

The room aligned on shipping the wave-1 core loop as a retention probe to GitHub Pages by tomorrow. Three parallel workstreams: CI pipeline (Lead Engineer), beacon event mapping (TEM), and the core loop itself (move, auto-fire, XP, upgrade choice, wave clear). Four telemetry events are locked as success criteria alongside Day-1 ≥35% / Day-7 ≥12% retention targets. The room explicitly shut down next-increment discussion four times — this increment ships first, then we measure.

## Decisions

- **Increment scope locked to three workstreams for tomorrow**: CI, beacon mapping, wave-1 core loop (Product Manager, Technical Engineering Manager)
- **Four telemetry events required from day one**: `session_start`, `wave_cleared`, `upgrade_chosen`, `session_end` with duration (Data Analyst)
- **Retention targets set as success criteria**: Day-1 ≥35%, Day-7 ≥12% (Data Analyst)
- **Gate 3 UX criteria defined**: 5-second control discovery, single-tap upgrade choice (text + icon, no hover-only), juicy wave-clear feedback that doesn't feel like a pause screen (UX/UI Designer)
- **Persistence layer stays pure**: generic store-change hook only; telemetry module maps to the four beacon events without pulling in UI logic (Architect)
- **Security Engineer review is async**: blocks merge only, does not block start (Product Manager)
- **Workbox offline queue is stretch**: ship without it if the day ends tight (Technical Engineering Manager)
- **ADR 001 settled**: typed event emitter (`mitt` or minimal custom `EventTarget`) in `upgradeHook.ts`; core loop emits `upgrade_chosen` with `upgradeId`, UX validator subscribes (You, Technical Engineering Manager, Data Analyst)

## Open questions / disagreements

- None recorded. The room converged on scope, telemetry, UX criteria, and the hook mechanism. Security Engineer was absent but review is async and non-blocking for start.

## Roadmap

### Now
- **CI pipeline to GitHub Pages** — owner: Lead Engineer
  - Risk: Single job (`npm ci && npm run build && npx gh-pages -d deploys`) with no lint/typecheck/test gates; any build break blocks deploy
- **Beacon event mapping layer** — owner: Technical Engineering Manager
  - Risk: Must wire `upgrade_chosen` hook before UX can validate the choice screen; mapping runs in parallel with core loop but is on the critical path for UX validation
- **Wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear)** — owner: Technical Engineering Manager / Lead Engineer
  - Risk: UX validation criteria (5-second discovery, single-tap upgrade, non-pause wave clear) can only be tested once the loop lands

### Next
- **Retention probe measurement** — owner: Data Analyst
  - Risk: Day-1/7 targets are hypotheses until real users hit the Pages deploy; funnel leaks may require loop changes, not just tuning
- **Security Engineer merge review** — owner: Security Engineer (async)
  - Risk: Findings could block merge after work is complete; no pre-flight review scheduled

### Later
- Nothing parked for later. The room explicitly deferred all next-increment planning until this increment ships and retention data is reviewed.

## Next actions

- [ ] Lead Engineer: Land CI pipeline to Pages (single job, deploy on `main` push)
- [ ] Technical Engineering Manager: Implement beacon mapping layer for four events (`session_start`, `wave_cleared`, `upgrade_chosen`, `session_end`)
- [ ] Technical Engineering Manager: Wire `upgrade_chosen` emitter (`upgradeHook.ts`) per ADR 001
- [ ] Technical Engineering Manager / Lead Engineer: Ship wave-1 core loop with move, auto-fire, XP, upgrade choice, wave clear
- [ ] UX/UI Designer: Validate Gate 3 criteria (5-second discovery, single-tap upgrade clarity, wave-clear momentum) against live build
- [ ] Data Analyst: Confirm telemetry events firing correctly in production; begin Day-1 retention watch
- [ ] Security Engineer: Async review — block merge only if findings require it

## Links

- [[Asteroids Survivor]]
- [[2026-09-15-lets-deliver-next-increment]]

- Meeting source: `9e074528`
- [[Project]]
- [[Index]]
- [[2026-09-15-lets-deliver-next-increment-minutes]]
