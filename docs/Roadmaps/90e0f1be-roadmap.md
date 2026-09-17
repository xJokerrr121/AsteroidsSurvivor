---
aliases: []
date: '2026-09-17'
format: markdown
id: 90e0f1be-roadmap
meeting_id: 90e0f1be
project: Asteroids Survivor
summary: Strategic implementation roadmap for Lead Engineer builds in-world picker
  scene with Rex plugin (pauses physics, +18.
tags:
- roadmap
- asteroids-survivor
- planning
title: Roadmap — Lead Engineer builds in-world picker scene with Rex plugin (pauses
  physics, +18
type: roadmap
---

# Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, +18

**Project:** Asteroids Survivor
**Date:** 2026-09-17
**Meeting:** Technical
**Attendees:**
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Product Manager
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
- You

## Situation

The team consolidated the locked XP progression scope into a single executable sequence for the retention probe: in-world picker scene (Rex plugin), telemetry schema freeze and beacon mapping, wave-1 core loop wiring, and a Pages deploy. No new scope was added; the meeting produced an ordered, owner-assigned plan with explicit dependencies and a declared "not this increment" list.

## Decisions

- **Phased execution plan adopted** — Product Manager and Technical Engineering Manager confirmed the four-phase sequence (Phase 0 today, Phase 1 tomorrow, Phases 2–3 after dependencies land, Phase 4 deploy). Lead Engineer and Architect endorsed the consolidation.
- **Phase 0 is the critical path** — Schema freeze (Lead Engineer), Security sign-off on `currentBuild: Upgrade[]` (Security Engineer), and `session_id` persistence decision (Data Analyst) must all land today. Everything else unblocks from these three.
- **Cheap CI pipeline to Pages** — DevOps Engineer owns the single-job pipeline (`npm ci && npm run build && npx gh-pages -d dist`) and the Lighthouse CI gate (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms, JS ≤170kB gzipped). Both land after scaffold (0.4) and Security's CSP/audit (0.5).
- **Rex picker scene first** — Lead Engineer builds the in-world `Scene` with `phaser3-rex-plugins` (pauses physics, renders world coords, three icons, one-tap, auto-dismiss 5s). UX/UI Designer validates ≤5s discovery on mobile; this is the Go/No-Go for the probe.
- **Beacon mapping after schema + session_id** — Technical Engineering Manager implements the mapping layer for four events (`session_start`, `wave_cleared`, `upgrade_chosen`, `session_end`); Lead Engineer wires the `upgrade_chosen` emitter per ADR 001 with `worldX`, `worldY`, `session_id`; Data Analyst verifies in CI.
- **Wave-1 core loop after picker + beacon** — Technical Engineering Manager and Lead Engineer wire move, auto-fire, XP, upgrade choice, wave clear; difficulty curve driven by playtime (not player level).
- **Explicitly not this increment** — Meta-progression, full CI hardening (lint/typecheck/test gates), Workbox/offline, leaderboard/backend. Product Manager and Technical Engineering Manager both confirmed.

## Open questions / disagreements

- **`session_id` persistence is the single point of failure** — Data Analyst must confirm today whether `storage.ts` already survives browser close, or spec the `startRun()` mint in the same PR as the schema freeze. If this slips past today, Phase 2 stalls and the Pages deploy window is missed (Data Analyst, QA Engineer, Technical Engineering Manager, Product Manager, Lead Engineer all flagged this).
- **Trust boundaries on the three critical items** — Security Engineer noted that `session_id` persistence exposes a device identifier, `currentBuild` stores upgrade state locally, and the Rex picker renders in-world coordinates. Each draws a trust boundary; Security sign-off on `currentBuild` is a gate before beacon mapping lands.
- **Architect questioned "lets start the meeting" phrasing** — DevOps Engineer refuted the claim that a rewrite would be needed; the room treated it as noise and moved on.
- **QA gate criteria must land in PR checklist today** — Pass/fail for session_id persistence, bundle budget (beyond Lighthouse), event-bus contract test, and physics-regression test for pause/resume cycle. QA Engineer owns this; Architect agreed the Pages deploy gates on it.

## Roadmap

### Now (Phase 0 — today)
- Freeze telemetry ADR (session_id, event_name, timestamp, properties) — owner: Lead Engineer
  - Risk: Scaffold stalls tomorrow if ADR not recorded
- Security sign-off `currentBuild: Upgrade[]` (local-only, no new telemetry IDs) — owner: Security Engineer
  - Risk: Blocks beacon mapping if delayed
- Confirm `storage.ts` persists stable `session_id` across browser close **or** spec mint-in-`startRun()` — owner: Data Analyst
  - Risk: Single point of failure for retention probe; Phase 2 cannot wire without it
- Ship scaffold (Step 1) — repo + CI with frozen schema — owner: Lead Engineer
  - Risk: None if ADR recorded and schema frozen; current CI (lint + typecheck) only
- Add CSP header + `npm audit` to CI job — owner: Security Engineer
  - Risk: Minimal hardening for Step 1; full security review gates Step 3
- Land CI pipeline (cheap budget job) — owner: Technical Engineering Manager
  - Risk: Single-job pipeline must pass on `main` today; no lint/typecheck/test gates per PROJECT LANGUAGE, so breakage = deploy failure
- Add Lighthouse CI performance gate — owner: Technical Engineering Manager
  - Risk: Budgets are tight (JS ≤170kB gzipped); first build may exceed and block PR

### Next (Phase 1 — tomorrow)
- Build in-world picker `Scene` with `phaser3-rex-plugins` — pauses physics, renders world coords, three distinct icons, one-tap, no scroll, auto-dismiss 5s — owner: Lead Engineer
  - Risk: Rex plugin bundle impact must stay inside Step 4 budget; Tech Researcher claims it does, but unmeasured
- UX validates ≤5s control discovery on mobile (vignette + enlarge-on-hover) — owner: UX/UI Designer
  - Risk: Go/No-Go for the probe; if discovery fails, picker redesign required
- Three-option upgrade picker polish (idle/hover/pressed/disabled states) — owner: UX/UI Designer + Lead Engineer
  - Risk: Icon clarity at small sizes; test on mobile viewport

### Later (Phases 2–4 — after dependencies land)
- Implement beacon event mapping layer for four events — owner: Technical Engineering Manager
  - Risk: Must wire `upgrade_chosen` hook before UX can validate choice screen; mapping runs in parallel with core loop but is on critical path for UX validation
- Wire `upgrade_chosen` emitter (`upgradeHook.ts` per ADR 001) with `worldX`, `worldY`, `session_id` — owner: Lead Engineer
  - Risk: Payload must be verified in beacon before UX validation
- Data Analyst verifies `upgrade` event carries world coords + `session_id` — owner: Data Analyst
- Wave-1 core loop wiring (move, auto-fire, XP, upgrade choice, wave clear) — owner: Technical Engineering Manager / Lead Engineer
  - Risk: UX validation criteria (5-second discovery, single-tap upgrade, non-pause wave clear) can only be tested once the loop lands
- Implement wave difficulty curve driven by playtime (not player level) — owner: Lead Engineer
  - Risk: Curve must feel fair across session lengths; validate with playtest
- Ship to Pages for Day-1 retention probe — owner: Technical Engineering Manager
- Nothing else parked for later — meta-progression, full CI hardening, Workbox, leaderboard/backend explicitly excluded from this increment.

## Next actions

- [ ] Lead Engineer: Commit telemetry ADR freeze (schema final) today
- [ ] Security Engineer: Write security approval for `currentBuild: Upgrade[]` in PR today
- [ ] Data Analyst: Confirm `storage.ts` session_id persistence or write `startRun()` mint spec in same PR as schema freeze today
- [ ] Lead Engineer: Push scaffold (repo + CI with frozen schema) after 0.1–0.3 land
- [ ] Security Engineer: Add CSP header + `npm audit` to CI job after scaffold
- [ ] Technical Engineering Manager: Land cheap CI pipeline to Pages after Security's CSP/audit
- [ ] Technical Engineering Manager: Add Lighthouse CI gate with budgets after pipeline lands
- [ ] QA Engineer: Write Gate 1–3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) to PR checklist today
- [ ] Lead Engineer: Build Rex picker scene (Phase 1.1) tomorrow
- [ ] UX/UI Designer: Validate ≤5s discovery on device the moment picker scene lands

## Links

- [[Asteroids Survivor]]
- [[2026-09-17-lead-engineer-builds-world]]

- Meeting source: `90e0f1be`
