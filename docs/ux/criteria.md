---
aliases: []
date: '2026-09-15'
meeting_id: 66c0c184
project: Asteroids Survivor
summary: Gate 3 first-run UX acceptance criteria — wave 1 without tutorial, ≤5s
  control discovery, upgrade choice understood on first pick.
tags:
- ux
- definition
- gate-3
title: Gate 3 — First-run acceptance criteria
type: definition
---

# Gate 3 — First-run acceptance criteria

**Owner:** UX/UI Designer
**Written:** 2026-09-15, for verification once Gate 3 (playable core loop) ships
**Plan:** [[2026-09-15-todo-integrations-execution]]
**Related:** [[core-loop-flow]] (first-run flow for the shipped MVP increment, no
wave/upgrade mechanics yet)

## Criteria

A first-time player, with no tutorial and no briefing beyond the link:

1. **Completes wave 1** without a tutorial screen or explanatory modal.
2. **Discovers the controls within ≤5 seconds** of the page loading — movement
   input is attempted and the ship responds before the 5s mark.
3. **Understands the upgrade choice on the first pick** — when the first
   upgrade offer appears, the player selects one without asking what the
   options mean.

## Telemetry events this depends on

Gate 3 verification reads these four events from the event-bus contract:

| Event | Marks |
| --- | --- |
| `session_start` | Run begins — start of the ≤5s control-discovery window |
| `control_discovered` | First movement input recognised by the game |
| `wave1_complete` | Wave 1 cleared without a tutorial being shown |
| `upgrade_picked` | Player selects an upgrade at the first offer |

`session_start` is already implemented (`src/telemetry/beacon.ts`). The other
three are **not yet implemented** — the shipped MVP increment's frozen schema
(`docs/telemetry-schema.json`, frozen 2026-09-11) only defines `session_start`,
`death`, `continue_click`, and the game has no wave or upgrade system yet (see
`src/game/GameScene.ts`). Wiring these three events is Gate 3 work, scoped to
whoever builds the playable core loop (wave progression + upgrade picks) — see
the open risk in [[2026-09-15-todo-integrations-execution]] that Gate 3's owner
is unnamed.

## Pass/fail

**Gate:** all three criteria hold for the test session, read back from the four
events above once they are wired. Recruit/session logistics follow the same
model as [[core-loop-flow]] section 4 (test group, facilitated session,
≥2-of-3 pass bar) — a session date for Gate 3 has not been set.
