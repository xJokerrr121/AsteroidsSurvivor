---
aliases: []
date: '2026-09-15'
meeting_id: 9e074528
project: Asteroids Survivor
status: planned
summary: Execution Spec — lets deliver the next increment
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: Plan — Execution Spec — lets deliver the next increment
type: plan
---

# Plan — Execution Spec — lets deliver the next increment

**Date:** 2026-09-15  
**Kind:** Full directive  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `9e074528`  

## Attendees & Ownership

- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Architect
- Tech Researcher

## Goal
Ship the wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear) as a minimal retention probe to GitHub Pages by 2026-09-16, with four locked telemetry events (session_start, wave_cleared, upgrade_chosen, session_end with duration) and CI pipeline unblocking merge. Success criteria: ≥35% Day-1 retention, ≥12% Day-7 retention, all four events firing.

## Locked decisions
- Gate 3 = wave-1 core loop shipped to Pages tomorrow (owner: Technical Engineering Manager)
- Four telemetry events locked: session_start, wave_cleared, upgrade_chosen, session_end (with duration) (owner: Data Analyst)
- Retention targets: ≥35% Day-1, ≥12% Day-7 (owner: Data Analyst)
- Persistence layer stays pure — generic store-change hook only; telemetry module maps to beacon events (owner: Architect)
- upgrade_chosen hook mechanism: typed event emitter (mitt or minimal EventTarget) from dedicated `upgradeHook.ts` module (owner: Technical Engineering Manager, per ADR [[adr-001-registration-invocation]])
- Workstream order: CI first → beacon mapping second → core loop third (owner: Lead Engineer)
- Beacon mapping runs before core loop (core loop needs upgrade_chosen hook wired) (owner: Technical Engineering Manager)
- Workbox queue is stretch; ship without it if day ends tight (owner: Technical Engineering Manager)
- Security Engineer review async — blocks merge only, not start (owner: Security Engineer)
- No next-increment discussion until current increment ships and retention data reviewed (owner: Architect)

## Constraints
- Must: CI pipeline (npm ci && build && gh-pages deploy) lands first and unblocks merge
- Must: Beacon mapping layer maps persistence generic hook → four beacon events
- Must: Core loop implements move, auto-fire, XP, upgrade choice, wave clear
- Must: Upgrade choice presentation — one clear choice, text + icon, single tap/click, no hover-only affordances
- Must: Wave clear feedback — visible juicy moment surfacing upgrade, must not feel like pause screen
- Must: 5-second control discovery for first-time players
- Must: session_end event includes duration
- Must-not: Couple persistence layer to UI/telemetry logic
- Must-not: Discuss or plan next increment
- Out of scope: Workbox offline queue (stretch only)
- Out of scope: Any feature beyond wave-1 core loop

## Surfaces
Files, modules, endpoints, data shapes, env vars, and commands the room named:
- `upgradeHook.ts` — typed event emitter module exporting emitter for `upgrade_chosen` event
- Persistence layer (existing) — generic store-change hook
- Beacon mapping layer (new) — maps persistence hook → four beacon events
- Telemetry module (new/existing) — emits beacon payloads
- CI pipeline — `npm ci && build && gh-pages deploy` (GitHub Actions)
- Four beacon event schemas:
  - `session_start` — { timestamp }
  - `wave_cleared` — { waveNumber, timestamp }
  - `upgrade_chosen` — { upgradeId, waveNumber, timestamp }
  - `session_end` — { durationMs, timestamp }
- GitHub Pages deployment target
- Security Engineer async review gate (merge block only)

## Execution graph
```mermaid
flowchart TD
    A[CI Pipeline: GitHub Actions workflow] --> B[upgradeHook.ts: typed event emitter]
    B --> C[Beacon Mapping Layer: persistence hook → 4 beacon events]
    C --> D[Core Loop: move, auto-fire, XP, upgrade choice, wave clear]
    C --> E[UX Validation: 5s discovery, upgrade clarity, wave-clear feedback]
    D --> E
    E --> F[Deploy to GitHub Pages]
    F --> G[Security Engineer async review]
    G --> H[Merge to main]
    I[Workbox Offline Queue (stretch)] -.-> F
```

## Steps
1. `.github/workflows/ci.yml` — Create GitHub Actions workflow: `npm ci`, `npm run build`, deploy to `gh-pages` branch; trigger on push to main/PR; cache node_modules — Acceptance: workflow runs green on push, produces deployable build artifact, Pages deployment succeeds
2. `src/upgradeHook.ts` — Implement typed event emitter (mitt or minimal EventTarget) exporting `upgradeEmitter` with `emit('upgrade_chosen', payload)` and `on('upgrade_chosen', handler)`; payload type `{ upgradeId: string; waveNumber: number; timestamp: number }` — Acceptance: TypeScript compiles; unit test emits and receives typed payload
3. `src/telemetry/beaconMapping.ts` — Create mapping layer subscribing to persistence generic store-change hook; translate relevant state changes into four beacon events (`session_start`, `wave_cleared`, `upgrade_chosen`, `session_end` with duration); export `initBeaconMapping()` — Acceptance: all four events fire with correct payload shapes in integration test; no UI logic imported
4. `src/telemetry/beaconSender.ts` — Implement beacon sender (navigator.sendBeacon or fetch with keepalive) posting to `/api/beacon` endpoint; queue events in memory; export `sendBeacon(eventName, payload)` — Acceptance: events reach endpoint in dev; payload matches locked schemas
5. `src/core/loop.ts` — Implement wave-1 core loop: player move (keyboard/touch), auto-fire at nearest enemy, XP accumulation, wave clear detection, upgrade choice trigger via `upgradeEmitter.emit('upgrade_chosen', ...)` — Acceptance: local playtest completes wave 1, triggers upgrade choice, emits upgrade_chosen
6. `src/ui/upgradeChoice.ts` — Render single upgrade choice: text + icon, single tap/click handler, no hover-only affordances; subscribe to `upgradeEmitter.on('upgrade_chosen', handler)` for UX validation; dismiss on selection — Acceptance: 5-second control discovery test passes; choice renders in <100ms; single interaction selects
7. `src/ui/waveClearFeedback.ts` — Implement juicy wave-clear moment: visual/audio feedback surfacing upgrade choice without pause-screen feel; auto-advance to upgrade choice screen — Acceptance: playtest confirms momentum preserved; upgrade choice appears within 500ms of wave clear
8. `src/game/init.ts` — Wire initialization order: `initBeaconMapping()` → core loop start → `session_start` beacon; on session end (page unload/game over) fire `session_end` with duration — Acceptance: session_start fires on load; session_end fires with durationMs on unload
9. `src/sw/workbox-config.js` (stretch) — Add Workbox offline queue for beacon events; register SW; fallback to in-memory queue if SW unavailable — Acceptance: events queue offline and flush on reconnect; build passes without Workbox if omitted
10. `deploy` — Push to main; verify CI passes; Security Engineer async review; merge; confirm GitHub Pages live at `https://<org>.github.io/<repo>/` — Acceptance: Pages serves playable wave-1 core loop; four beacon events visible in network tab; retention probe live

## Verification
- CI workflow green on main branch
- GitHub Pages URL serves playable game completing wave 1 → upgrade choice → wave 2
- Network tab shows four beacon events with exact payload schemas
- UX validation: 5-second control discovery, single-tap upgrade choice, non-pause wave-clear feedback
- Retention probe live — Data Analyst can measure Day-1/Day-7 from beacon data
- Security Engineer review completed (async, merge gate only)

## Open risks
- Exact persistence layer hook signature not named in room — infer from existing code or ask TEM
- Beacon endpoint `/api/beacon` not confirmed — may need serverless function or Pages-compatible alternative
- GitHub Pages deployment config (base path, SPA fallback) not specified
- Workbox stretch item may be dropped — no risk to core delivery
- Security Engineer review timing unknown — async but blocks merge
- Date 2026-09-16 assumed from "tomorrow" in 2026-09-15 meeting — confirm with operator

---

## Links

- [[Project]]
- Source meeting: `9e074528`
