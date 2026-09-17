---
aliases: []
date: '2026-09-16'
id: 7fd59e2c-minutes
meeting_id: 7fd59e2c
project: Asteroids Survivor
summary: Minutes for Discuss new features for this increment,.
tags:
- minutes
- asteroids-survivor
- meeting
title: Minutes — Discuss new features for this increment,
type: minutes
---

# Minutes — Discuss new features for this increment,

**Date:** 2026-09-16
**Kind:** Full directive
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Tech Researcher
- Security Engineer
- You

## Executive Summary

The room locked the XP and skill progression slice for the **MVP Fantasy: Survivors in Vector Clothing** increment: XP drops on asteroid `shatter()`, fixed level-up thresholds, an in-world picker built with `phaser3-rex-plugins` that pauses physics, and a `currentBuild: Upgrade[]` key persisted locally in IndexedDB for the current run only. Meta-progression is explicitly deferred. Two blockers remain before coding starts: Security sign-off on the `currentBuild` schema (local-only, no new telemetry identifiers) and Data Analyst confirmation that `storage.ts` persists a stable `session_id` across browser close (or a mint-in-`startRun()` fallback). The action plan sequences seven steps ending with a Day-1 retention probe on Pages.

## Discussion Highlights

- **Product Manager** framed the slice as the Vampire Survivors half of the **Concept — Asteroids Survivor (aka concept, pitch, asteroids survivor)**: XP drops from shattered asteroids, level-up = pick 1 of 3 upgrades (damage, fire rate, max speed, magnet radius), persist only current run's choices. One metric: upgrade-pick → next-session-start rate ≥35% Day-1.
- **Technical Engineering Manager** confirmed engineering cost: picker scene (2–3 days), schema sign-off (Security), in-world vs overlay (UX). Meta-progression out.
- **Data Analyst** defined the four-event telemetry (session-start, wave-cleared, upgrade, session-end) using existing **Client-side telemetry schema & transport**; the `upgrade` event fires on pick. Asked whether `storage.ts` already persists `session_id` across runs.
- **Lead Engineer** specified implementation: XP drop 10–25 on `shatter()`, thresholds (100, 250, 450…), picker as Phaser `Scene` pausing/resuming `game` scene, `currentBuild` key wiped on `startRun()`. Blocker: `session_id` persistence in `storage.ts`.
- **UX/UI Designer** ruled for in-world picker floating near ship, physics paused, options radiating like debris; ≤5 s read time, three icons, one-tap. Asked TEM if picker `Scene` can render to a second camera with dimmed world. Event coords: world coords (ship-relative) for in-world.
- **Tech Researcher** recommended `phaser3-rex-plugins` for picker — satisfies in-world UX, pauses physics cleanly, stays inside Step 4 bundle budget.
- **Security Engineer** required confirmation that `currentBuild` stays fully local per **Backend scope & contract** (zero backend, IndexedDB only) and that `upgrade` event adds no new identifiers to the four-field telemetry schema.
- **Product Manager** closed: slice authorized — XP drops on shatter, fixed thresholds, in-world picker with Rex plugin. Security signs off `currentBuild` schema today; meta-progression stays out.
- **Technical Engineering Manager** published ordered action plan (7 steps) with owners and dependencies; "done when Refine can execute without clarification."
- **Council LOG** (hard review, not spoken) recorded unreadable entries for all seats, then final confirmations from PM, TEM, Data Analyst, Lead Engineer.

## Key Decisions Made

- XP and skill progression slice locked: XP drops on `shatter()`, fixed thresholds, in-world picker with Rex plugin, `currentBuild: Upgrade[]` in IndexedDB (current run only).
- Meta-progression explicitly excluded from this increment.
- In-world picker (not overlay) — floats near ship, physics paused, world coords in `upgrade` event.
- `phaser3-rex-plugins` adopted for picker scene.
- `currentBuild` schema is local-only; no new identifiers in telemetry (per **Backend scope & contract** and **Client-side telemetry schema & transport**).
- Action plan sequenced with seven ordered steps; meta-progression not this increment.

## Action Items & Next Steps

- [ ] Security signs off `currentBuild: Upgrade[]` schema (local-only) — Security Engineer
- [ ] Data Analyst confirms `session_id` persists in `storage.ts` across browser close, or mint in `startRun()` — Data Analyst
- [ ] Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, world coords) — Lead Engineer
- [ ] TEM wires picker into game flow — Technical Engineering Manager
- [ ] UX validates ≤5 s control discovery — UX/UI Designer
- [ ] Data Analyst verifies `upgrade` event carries world coords + `session_id` — Data Analyst
- [ ] Ship to Pages for Day-1 retention probe — Technical Engineering Manager

## Open Questions & Risks

- **Security schema sign-off** — `currentBuild: Upgrade[]` must be confirmed local-only with no off-device trust boundary ([[backend-scope-contract]]).
- **session_id persistence** — `storage.ts` must yield a stable `session_id` across browser close; otherwise mint in `startRun()`.
- **Picker scene bundle impact** — Rex plugin bundle size must stay within Step 4 budget (Evaluate Rex plugin bundle impact ([[todos]]) — @tech).
- **Control discovery validation** — UX must confirm ≤5 s read time on mobile with in-world picker (fat-finger risk, vignette/enlarge-on-hover).
- **Telemetry completeness** — `upgrade` event must carry world coords and `session_id` for the upgrade-pick → next-session-start metric.
- **Parked todos** (cite under Open Questions & Risks as [[todos]] lines):
  - build level-up picker scene ([[todos]]) — Lead Engineer
  - Evaluate Rex plugin bundle impact ([[todos]]) — @tech
  - verify session_id persistence in storage.ts ([[todos]]) — Data Analyst
  - Confirm session_id persistence in storage.ts ([[todos]]) — Data Analyst
  - check storage.ts for persisted session_id ([[todos]]) — me
- **Pinned facts** (cite as [[memory]] lines):
  - xp-progression-slice-defined ([[memory]])
  - rex-plugin-evaluated-for-picker ([[memory]])
  - currentBuild schema is Upgrade[] local-only in IndexedDB ([[memory]])

## Links

- [[Project]]
- [[2026-09-16-discuss-new-features]]
- [[7fd59e2c-roadmap]]
