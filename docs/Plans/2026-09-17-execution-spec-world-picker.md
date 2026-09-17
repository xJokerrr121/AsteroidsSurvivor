---
aliases: []
date: '2026-09-17'
meeting_id: 90e0f1be
project: Asteroids Survivor
status: planned
summary: Execution Spec — In-World Picker Scene & Day-1 Retention Probe
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: Plan — Execution Spec — In-World Picker Scene & Day-1 Retention Probe
type: plan
---

# Plan — Execution Spec — In-World Picker Scene & Day-1 Retention Probe

**Date:** 2026-09-17  
**Kind:** Technical  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `90e0f1be`  

## Attendees & Ownership

- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Product Manager
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer

## Goal
Ship a Day-1 retention probe to GitHub Pages consisting of: (1) a frozen telemetry schema + ADR, (2) a minimal scaffold with CI + Lighthouse gate, (3) an in-world upgrade picker scene built with the Rex plugin that pauses physics and renders world coordinates, (4) a three-option upgrade picker (three distinct icons, one-tap, no scroll, ≤5 s mobile discovery), (5) beacon event mapping for `upgrade_chosen` carrying world coords + `session_id`, and (6) the Wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear) with a playtime-driven difficulty curve. All gated by QA pass/fail criteria in the PR checklist. Meta-progression, full CI hardening, Workbox, leaderboard, and backend are explicitly out of scope.

## Locked decisions
- Telemetry schema frozen: `session_id`, `event_name`, `timestamp`, `properties` — Data Analyst
- Phase 0 executes today; Phase 1 starts tomorrow — Product Manager
- CI pipeline (0.6) and Lighthouse budgets (0.7) land after scaffold (0.4) and Security CSP/audit (0.5) — Technical Engineering Manager / DevOps Engineer
- UX/UI Designer validates ≤5 s control discovery on mobile after Lead Engineer lands Rex picker scene (1.1) — UX/UI Designer
- QA Engineer writes Gate 1–3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) to PR checklist today — QA Engineer
- Security Engineer reviews `currentBuild` schema (Upgrade[] local-only, no new telemetry IDs) before merge, dependent on telemetry ADR freeze + session_id persistence confirmed — Security Engineer
- Lead Engineer owns freezing telemetry ADR (deliverable: ADR committed, schema final) — Lead Engineer
- Data Analyst verifies `storage.ts` persists stable `session_id` across browser close or specs `startRun()` mint implementation today — Data Analyst
- Beacon mapping depends on `session_id` persistence / `startRun()` mint spec — Data Analyst / Technical Engineering Manager
- [[adr-001-registration-invocation]] — typed event emitter (`mitt` or minimal custom `EventTarget`) exported from dedicated module

## Constraints
- Must: Freeze telemetry schema and record ADR before scaffold ships
- Must: `session_id` persistence decision (storage.ts or startRun() mint) before beacon mapping lands
- Must: Security sign-off on `currentBuild` schema before merge
- Must: CI green on `main` with single-job pipeline (lint + typecheck only; no test gate per PROJECT LANGUAGE)
- Must: Lighthouse CI gate with JS ≤ 170 kB gzipped budget
- Must: Rex picker scene pauses physics, renders world coordinates
- Must: Three-option picker — three distinct icons, one tap, no scroll, ≤5 s discovery on mobile
- Must: `upgrade` beacon event carries world coords + `session_id`
- Must: Wave difficulty curve driven by playtime (not player level)
- Must not: Meta-progression, full CI hardening (lint/typecheck/test), Workbox, leaderboard, backend
- Must not: Reopen concept or locked stack issues
- Out of scope: Day-2+ hardening, full security review (gates Step 3), regression test suite

## Surfaces
Files, modules, endpoints, data shapes, env vars, and commands the room named:
- `storage.ts` — session_id persistence (verify or spec mint-in-startRun)
- `currentBuild` schema — `Upgrade[]` (local-only, no new telemetry IDs)
- Telemetry schema — `{ session_id: string, event_name: string, timestamp: number, properties: Record<string, unknown> }`
- Beacon event mapping layer — wires `upgrade_chosen` hook, emits `upgrade` event with world coords + `session_id`
- `shatter()` hook — XP threshold trigger for upgrade choice
- `DEATH_EVENT` — piggyback for wave clear / session end
- XP thresholds — numeric breakpoints for upgrade presentation
- Wave difficulty curve — function of playtime (ms), not player level
- Rex plugin — Phaser plugin for in-world UI (pauses physics, renders world coords)
- Three-option upgrade picker — three distinct icon assets, one-tap interaction, no scroll/tooltip
- CSP header — added to CI job
- `npm audit` — added to CI job
- Lighthouse CI — performance gate (JS ≤ 170 kB gzipped)
- GitHub Pages deploy — target for Day-1 retention probe
- ADR file — telemetry schema freeze (location per repo convention, e.g., `docs/adr/002-telemetry-schema-freeze.md`)

## Execution graph
```mermaid
flowchart TD
    A[0.1 Freeze telemetry schema + record ADR] --> B[0.2 Verify session_id persistence or spec startRun mint]
    B --> C[0.3 Security sign-off on currentBuild schema]
    C --> D[0.4 Ship scaffold repo + CI with frozen schema]
    D --> E[0.5 Add CSP header + npm audit to CI]
    E --> F[0.6 Land CI pipeline to Pages]
    F --> G[0.7 Add Lighthouse CI performance gate]
    G --> H[1.1 Build Rex in-world picker scene (pause physics, world coords)]
    H --> I[1.2 Three-option upgrade picker (icons, one-tap, no scroll)]
    I --> J[1.3 UX validation: ≤5s discovery on mobile]
    J --> K[2.1 Beacon event mapping layer + upgrade_chosen hook]
    K --> L[2.2 Data Analyst verifies upgrade event carries world coords + session_id]
    L --> M[3.1 Wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear)]
    M --> N[3.2 Implement playtime-driven wave difficulty curve]
    N --> O[3.3 Gate 3 UX validation (5s discovery, single-tap, non-pause wave clear)]
    O --> P[4.1 Ship to Pages for Day-1 retention probe]
    Q[QA: Write Gate 1-3 pass/fail criteria to PR checklist] -.-> D
    Q -.-> F
    Q -.-> G
    Q -.-> P
```

## Steps
1. `docs/adr/002-telemetry-schema-freeze.md` — Create ADR recording frozen telemetry schema (`session_id`, `event_name`, `timestamp`, `properties`) with rationale and immutable status — Acceptance: ADR committed to `main`, schema referenced in scaffold
2. `src/telemetry/schema.ts` — Export frozen schema types and runtime validator (e.g., zod or io-ts) matching ADR — Acceptance: Types compile, validator rejects extra/unknown fields, used by beacon mapping
3. `storage.ts` — Verify `session_id` persists across browser close (read/write `localStorage` with stable UUID v4) OR implement `startRun()` that mints new `session_id` per run — Acceptance: Manual test: close tab, reopen, `session_id` stable (persist) OR new per run (mint); Data Analyst signs off
4. `src/security/currentBuild-schema.ts` — Define `currentBuild` as `Upgrade[]` with no telemetry IDs; export for Security review — Acceptance: Security Engineer approves in PR review
5. `.github/workflows/ci.yml` — Single-job pipeline: `npm ci`, `npm run lint`, `npm run typecheck`, build, deploy to Pages on `main` green — Acceptance: Runs on `main`, passes with current code, deploys to Pages URL
6. `.github/workflows/ci.yml` — Add CSP header generation (via `helmet` or static header in Pages `_headers`) and `npm audit --audit-level=high` step — Acceptance: CSP header present on deployed Pages, `npm audit` passes in CI
7. `.github/workflows/lighthouse.yml` — Lighthouse CI job with budgets: JS ≤ 170 kB gzipped, LCP ≤ 2.5s, TBT ≤ 150ms; fails PR if exceeded — Acceptance: Job runs on PR, fails if budget exceeded, passes on scaffold build
8. `src/scenes/PickerScene.ts` — New Phaser scene using Rex plugin: pauses physics (`this.physics.pause()`), renders upgrade options at world coordinates, emits `upgrade_chosen` via typed event emitter — Acceptance: Scene loads, physics paused, three icons visible at world coords, tap emits event with `{ upgradeId, worldX, worldY }`
9. `src/ui/UpgradePicker.ts` — Three-option picker component: three distinct icon assets (SVG/PNG ≤ 32px), one-tap handler, no scroll container, auto-layout horizontal — Acceptance: Renders three icons on mobile viewport (375px), single tap selects, no scrollbar, no tooltip
10. `src/scenes/PickerScene.ts` — Integrate `UpgradePicker` into `PickerScene`, position at player world coords, wire `upgrade_chosen` to event bus — Acceptance: Picker appears at player position on `shatter()` hook, tap emits `upgrade_chosen` with world coords
11. `UX validation` — UX/UI Designer runs ≤5 s discovery test on physical mobile device: cold start → first upgrade pick ≤ 5 s, no hunt — Acceptance: Designer records pass/fail in PR checklist (Gate 1)
12. `src/telemetry/beacon.ts` — Beacon mapping layer: subscribes to `upgrade_chosen`, enriches with `session_id` (from storage/startRun), `timestamp`, sends `upgrade` event to endpoint (stub `navigator.sendBeacon` or `fetch` keepalive) — Acceptance: Network tab shows `upgrade` event with `session_id`, `worldX`, `worldY`, `upgradeId`; Data Analyst verifies payload shape
13. `src/game/WaveManager.ts` — Wave-1 core loop: spawn wave → auto-fire → XP accrual → on XP threshold call `shatter()` → show `PickerScene` → on `upgrade_chosen` apply upgrade → wave clear → next wave — Acceptance: Full loop runs in browser without errors, upgrade choice applies, wave advances
14. `src/game/DifficultyCurve.ts` — Implement `getWaveConfig(playtimeMs: number): WaveConfig` using playtime-driven formula (e.g., exponential with cap), not player level — Acceptance: Unit test (or manual) shows curve scales with playtime, feels fair across 30s / 2min / 10min sessions
15. `src/game/WaveManager.ts` — Wire `DifficultyCurve` into wave spawn logic — Acceptance: Wave params (enemy count, speed, health) change per playtime, not level
16. `Gate 3 UX validation` — QA/UX runs full loop on mobile: 5s discovery, single-tap upgrade, wave clear does not pause — Acceptance: All three criteria pass in PR checklist (Gate 3)
17. `Deploy to Pages` — Technical Engineering Manager merges to `main`, CI + Lighthouse pass, probe live — Acceptance: Pages URL serves game, telemetry beacon fires, retention probe active

## Verification
- All PR checklist gates (1–3) pass: Gate 1 (session_id persistence + schema freeze), Gate 2 (bundle budget + Lighthouse), Gate 3 (UX discovery + single-tap + non-pause wave clear)
- CI pipeline green on `main` with Pages deploy
- Lighthouse CI passes budgets
- Beacon `upgrade` event verified in network tab with correct payload
- Rex picker scene loads, pauses physics, renders at world coords
- Three-option picker meets mobile UX criteria (≤5 s, one tap, no scroll)
- Wave-1 core loop completes end-to-end with playtime-driven difficulty
- No regressions in existing Asteroids Survivor mechanics (move, auto-fire, XP)

## Open risks
- Rex plugin bundle impact unmeasured — may exceed 170 kB JS budget; mitigation: measure after Step 8, consider dynamic import or fallback if over
- Event-bus contract not yet defined — `upgrade_chosen` handshake may drift from schema; mitigation: define minimal contract in `src/events/bus.ts` before Step 12
- `session_id` persistence vs. mint-in-startRun decision not finalized — Data Analyst must choose today; blocks beacon mapping
- Icon clarity at small sizes untested — UX validation (Step 11) may fail; mitigation: prepare fallback larger icons
- Playtime-driven curve fairness across session lengths unvalidated — requires playtest; mitigation: ship with conservative curve, iterate post-probe
- Cheap CI lacks test gate — regressions possible until Day-2 hardening; mitigation: QA manual smoke test before merge
- Security review only covers `currentBuild` schema — full review gates Step 3 (out of scope)
- Lighthouse budget tight — first build may exceed and block PR; mitigation: budget headroom in scaffold, measure early

---

## Links

- [[Project]]
- Source meeting: `90e0f1be`
