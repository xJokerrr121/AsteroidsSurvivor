---
aliases: []
date: '2026-09-11'
meeting_id: dcd07828
project: Asteroids Survivor
status: Accepted
summary: Vite + TypeScript + Phaser 3 + IndexedDB + GitHub Pages for the MVP increment.
tags:
- adr
- decision
- definition
title: ADR 001 — Stack choice
type: adr
---

# ADR 001 — Stack choice

**Status:** Accepted
**Date:** 2026-09-11
**Owner:** Lead Engineer
**Plan:** [[2026-09-11-execution-spec-plan-first]]

## Context

The 12-day MVP increment ships a core loop, local persistence and a deploy
target, and nothing else. The scaffold must not churn once Step 1 starts on
2026-09-12, so the stack is recorded here before the first commit lands.

## Decision

| Layer | Choice |
| --- | --- |
| Build tool | Vite 7 |
| Language | TypeScript 5 (strict) |
| Game runtime | Phaser 3 (Arcade physics) |
| Local persistence | IndexedDB (no wrapper library) |
| Telemetry transport | `navigator.sendBeacon()` to a managed endpoint |
| Hosting | GitHub Pages, `gh-pages` branch via `npx gh-pages -d dist` |
| Tests | Vitest (jsdom + `fake-indexeddb`) |

There is no backend, no leaderboard and no multiplayer in the MVP. Everything
the player accumulates lives on their own device.

## Rationale

- **Vite + TypeScript** — the default static-site toolchain; `npm run build`
  produces a `dist/` that GitHub Pages serves as-is with no server.
- **Phaser 3** — a mature 2D runtime with Arcade physics, which covers the
  move-only drift, the asteroid field and the collision that ends a run without
  us writing a physics loop.
- **IndexedDB** — structured async storage that survives reloads and is large
  enough for the progression data the Survivors loop will need, unlike
  `localStorage`. Chosen over a wrapper library to keep the dependency surface
  and the bundle small.
- **GitHub Pages** — zero hosting cost and zero infrastructure, matching the
  "zero backend" scope lock.

## Consequences

- The entire game runs on the client, so all telemetry is client-side and all
  state is device-local. Clearing site data clears a player's progress; there is
  no account recovery, and that is the accepted trade for the MVP.
- Static hosting cannot set response headers, so the CSP ships as a
  `<meta http-equiv>` in `index.html` and CI asserts the header separately.
- **Known conflict:** the Phaser 3 runtime is ~333 kB gzipped, well over the
  170 kB total-JS budget that Step 4 sets (the arcade-physics-only build is
  ~284 kB gzipped and does not close the gap). Either the budget or the runtime
  has to move at the Step 4 gate. Not decided here.
