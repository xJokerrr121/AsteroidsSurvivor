---
aliases: []
date: '2026-09-16'
meeting_id: 7fd59e2c
project: Asteroids Survivor
status: planned
summary: 'Execution Spec — XP & Skill Progression Slice (MVP Fantasy: Survivors in
  Vector Clothing)'
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: 'Plan — Execution Spec — XP & Skill Progression Slice (MVP Fantasy: Survivors
  in Vector Clothing)'
type: plan
---

# Plan — Execution Spec — XP & Skill Progression Slice (MVP Fantasy: Survivors in Vector Clothing)

**Date:** 2026-09-16  
**Kind:** Full directive  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `7fd59e2c`  

## Attendees & Ownership

- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Tech Researcher
- Security Engineer

## Goal
Ship the smallest shippable slice: XP drops from shattered asteroids, fixed-threshold level-ups with an in-world 1-of-3 upgrade picker (phaser3-rex-plugins), and a `currentBuild: Upgrade[]` key persisted in IndexedDB for the current run only. Meta-progression is explicitly out. Success metric: upgrade-pick → next-session-start rate ≥35% (Day-1). Two blockers must clear before coding: Security sign-off on `currentBuild` schema (local-only, no new telemetry identifiers) and Data Analyst confirmation that `storage.ts` persists a stable `session_id` across browser close (or mint-in-`startRun()` fallback).

## Locked decisions
- Smallest shippable slice = XP drops on `shatter()` + level-up picker (1 of 3) + `currentBuild` for current run only; meta-progression explicitly out (owner: Technical Engineering Manager)
- Success metric: upgrade-pick → next-session-start rate ≥35% (owner: Data Analyst)
- XP drops on `shatter()` hook: 10–25 XP per large asteroid break; level-up at fixed thresholds (100, 250, 450…); pause physics, show picker, resume (owner: Lead Engineer)
- `currentBuild` key in IndexedDB holds three picks for current run only; wiped on `startRun()` (owner: Lead Engineer)
- UX: in-world picker floating near ship, physics paused, options radiating outward; ≤5s read time, three distinct icons, one-tap/click, no scroll, no tooltip hunt (owner: UX/UI Designer)
- Adopt `phaser3-rex-plugins` for level-up picker scene (owner: Tech Researcher)
- Picker Scene must render to a second camera so world stays visible but dimmed (owner: Technical Engineering Manager)
- `upgrade` event carries world coords (ship-relative) since in-world decided (owner: Lead Engineer)
- `currentBuild` schema is the only new IndexedDB key; must stay fully local with no off-device trust boundary per [[backend-scope-contract]] (owner: Security Engineer)
- `upgrade` event only adds to existing four-field telemetry schema per [[client-side-telemetry-schema]]; no new identifiers (owner: Security Engineer)
- `storage.ts` must persist stable `session_id` across browser close for beacon metric; if not, mint in `startRun()` and write once (owner: Lead Engineer)
- Bundle must stay inside Step 4 budget (owner: Tech Researcher)
- Security Engineer signs off `currentBuild: Upgrade[]` schema (owner: Security Engineer)
- Technical Engineering Manager wires picker after security sign-off (owner: Technical Engineering Manager)
- Lead Engineer implements picker scene (half day) and `session_id` persistence (owner: Lead Engineer)
- Ship to Pages for Day-1 retention probe (owner: Technical Engineering Manager)
- Meta-progression explicitly not in this increment (owner: Technical Engineering Manager)

## Constraints
- Must: `currentBuild` schema local-only, zero backend, IndexedDB only
- Must: `upgrade` event adds no new identifiers to existing four-field telemetry schema
- Must: Picker scene pauses physics (`scene.pause('game')` / `scene.resume('game')`)
- Must: Picker renders to second camera with dimmed world visible
- Must: `upgrade` event carries world coordinates (ship-relative)
- Must: `session_id` stable across browser close (persisted in `storage.ts` or minted once in `startRun()`)
- Must: Bundle stays within Step 4 budget
- Must: Control discovery ≤5 seconds (three icons, one-tap, no scroll, no tooltip hunt)
- Must not: Meta-progression in this increment
- Must not: New telemetry identifiers beyond existing schema
- Must not: Off-device trust boundary for `currentBuild`
- Out of scope: Meta-progression, ad-based continue, currency systems, backend persistence

## Surfaces
Files, modules, endpoints, data shapes, env vars, and commands the room named:
- `storage.ts` — IndexedDB persistence layer (must persist `session_id` and `currentBuild: Upgrade[]`)
- `shatter()` hook — asteroid break point where XP drops (10–25 XP)
- `startRun()` — wipes `currentBuild`, mints `session_id` if not persisted
- `game` scene — main Phaser scene (paused/resumed by picker)
- Picker Scene — new Phaser `Scene` using `phaser3-rex-plugins`
- `phaser3-rex-plugins` — adopted for picker UI
- Telemetry beacon — four events: `session-start`, `wave-cleared`, `upgrade`, `session-end`
- `upgrade` event payload — must include world coords (ship-relative) + `session_id`
- `currentBuild` schema — `Upgrade[]` (three picks for current run only)
- `DEATH_EVENT` — existing event emitting survival time (piggyback XP there)
- IndexedDB — sole persistence target for `currentBuild` and `session_id`

## Execution graph
```mermaid
flowchart TD
    A[Security signs off currentBuild: Upgrade[] schema] --> B[Data Analyst confirms session_id persistence in storage.ts]
    B --> C[Lead Engineer implements session_id persistence in storage.ts]
    C --> D[Lead Engineer builds in-world picker scene with Rex plugin]
    D --> E[TEM wires picker into game flow]
    E --> F[UX validates ≤5s control discovery]
    F --> G[Data Analyst verifies upgrade event carries world coords + session_id]
    G --> H[Ship to Pages for Day-1 retention probe]
```

## Steps
1. `security` — Security Engineer reviews and signs off `currentBuild: Upgrade[]` schema as local-only, no off-device trust boundary, no new telemetry identifiers — Acceptance: Security Engineer explicit sign-off recorded; schema shape documented
2. `data-analyst` — Data Analyst confirms `storage.ts` persists stable `session_id` across browser close; if not, documents mint-in-`startRun()` fallback — Acceptance: Data Analyst confirmation recorded; `session_id` behavior verified
3. `storage.ts` — Lead Engineer implements `session_id` persistence in `storage.ts`: read existing or mint UUID v4 on first `startRun()`, write once, survive browser close — Acceptance: `session_id` stable across browser close/reopen; written exactly once per browser profile
4. `src/scenes/LevelUpPickerScene.ts` — Lead Engineer creates in-world picker Phaser `Scene` using `phaser3-rex-plugins`: pauses `game` scene on enter, resumes on pick; renders to second camera with dimmed world; three upgrade options (damage, fire rate, max speed, magnet radius — pick 3 of 4) radiating from ship-relative world coords; one-tap/click, no scroll, no tooltips — Acceptance: Picker opens on level-up threshold, pauses physics, shows three distinct icons readable in ≤5s, pick resumes game, `currentBuild` updated in IndexedDB
5. `src/scenes/LevelUpPickerScene.ts` — Lead Engineer wires `upgrade` telemetry event on pick: payload includes `session_id`, world coords (ship-relative), upgrade id, timestamp — Acceptance: Beacon fires `upgrade` event with correct payload; no new identifiers beyond existing four-field schema
6. `src/main.ts` (or game bootstrap) — TEM wires picker into game flow: on XP threshold reached in `game` scene, launch `LevelUpPickerScene`, pass ship world position, handle resume — Acceptance: Level-up triggers picker at thresholds (100, 250, 450…); XP drops 10–25 on `shatter()`; `currentBuild` wiped on `startRun()`
7. `ux-validation` — UX/UI Designer validates control discovery ≤5s on mobile and desktop: three icons distinct, one-tap/click, no scroll, no tooltip hunt — Acceptance: UX sign-off recorded; ≤5s discovery confirmed
8. `data-analyst` — Data Analyst verifies `upgrade` event carries world coords + `session_id` in beacon; confirms upgrade-pick → next-session-start funnel measurable — Acceptance: Telemetry verified end-to-end; funnel queryable
9. `deploy` — TEM deploys to Pages for Day-1 retention probe — Acceptance: Live on Pages; Day-1 metric tracking active

## Verification
- `session_id` persists across browser close/reopen (Storage tab → IndexedDB)
- Large asteroid `shatter()` drops 10–25 XP; level-up triggers at 100, 250, 450 XP
- Picker opens, pauses `game` scene, renders to second camera with dimmed world
- Three upgrade icons readable in ≤5s; one-tap pick resumes game
- `currentBuild: Upgrade[]` written to IndexedDB on pick; wiped on `startRun()`
- `upgrade` beacon event fires with `session_id`, world coords, upgrade id, timestamp
- No new telemetry identifiers beyond existing four-field schema
- Bundle size within Step 4 budget
- Day-1 retention probe live on Pages; upgrade-pick → next-session-start funnel ≥35% target measurable

## Open risks
- Exact `Upgrade` type definition (fields: id, name, icon, effect?) not fully specified in room — Security sign-off depends on shape
- Which 3 of 4 upgrade types (damage, fire rate, max speed, magnet radius) appear per level-up — not decided (random? weighted?)
- `phaser3-rex-plugins` version compatibility with current Phaser version — not verified
- `storage.ts` current implementation unknown — may need migration for `session_id` and `currentBuild` keys
- Exact XP threshold formula beyond first three (100, 250, 450…) — pattern not defined
- Mobile touch target size for in-world icons — UX validation may require iteration
- Deployment to Pages pipeline not described — may need CI/CD step

---

## Links

- [[Project]]
- Source meeting: `7fd59e2c`
