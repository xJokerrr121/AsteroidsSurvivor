---
aliases: []
date: '2026-09-16'
project: Asteroids Survivor
summary: Review of the currentBuild schema and the persisted session_id, prepared
  ahead of the two pre-coding blockers named in the XP & skill progression slice plan.
tags:
- security
- review
- definition
title: Security review — currentBuild schema and persisted session_id
type: definition
---

# Security review — `currentBuild` schema and persisted `session_id`

**Owner:** Security Engineer (currentBuild) / Data Analyst (session_id) — both sign-offs outstanding
**Under review:** `src/persistence/storage.ts` (`loadOrCreateSessionId`, `loadCurrentBuild`,
`addToCurrentBuild`, `resetCurrentBuild`) as implemented for
`docs/Plans/2026-09-16-execution-spec-xp-skill.md`.

Prepared from the shipped implementation by the coding agent, same pattern as
`docs/security/threat-model-indexeddb-beacon.md`. **Human sign-off from
Security Engineer and Data Analyst is outstanding** — countersign below
before this increment is treated as fully done.

## 1. `currentBuild: Upgrade[]` schema

```ts
interface Upgrade {
  id: string;    // one of: 'damage' | 'fire-rate' | 'max-speed' | 'magnet-radius'
  name: string;  // display label, from the fixed UPGRADE_POOL in src/core/upgrades.ts
  icon: string;  // texture key, also from the fixed pool
}
```

- Stored under a new IndexedDB key (`current-build`) in the existing `game-state`
  object store — same store as `run-state`, no new store, no new database.
- Values come only from the fixed 4-entry `UPGRADE_POOL` (`src/core/upgrades.ts`);
  the player never supplies free text, so nothing user-authored can ride along.
- Read/written locally only — `loadCurrentBuild` / `addToCurrentBuild` /
  `resetCurrentBuild` make no network calls. `resetCurrentBuild()` is called
  from `CoreLoopScene.startRun()`, so a build never survives past the run it
  was picked in.
- **No off-device trust boundary is crossed.** `currentBuild` is not sent to
  the telemetry beacon; only the *upgrade id* and *ship-relative world
  coordinates* of a pick go out (see §3), which is gameplay data, not the
  build list itself.

## 2. Persisted `session_id`

The prior review (`docs/security/threat-model-indexeddb-beacon.md`, T4)
mitigated cross-session correlation by keeping `session_id` in memory only,
per tab, discarded on close. **This plan's Locked decision explicitly
reverses that mitigation**: `session_id` must now survive browser close so
the upgrade-pick → next-session-start funnel is measurable across sessions.

- `loadOrCreateSessionId()` reads an existing UUID v4 from IndexedDB, or
  mints one with `crypto.randomUUID()` and writes it once, on first call.
- `src/main.ts` calls this once at bootstrap and overrides `beacon.ts`'s
  in-memory default via `setSessionId()` before any event fires, so every
  event in a session (and every session after) carries the same id.
- **Effect on the threat model:** `session_id` is now a stable per-device
  pseudonymous identifier, not a per-tab one. It is still opaque (a random
  UUID, not derived from anything identifying), still carries no name/email/
  account, and is still sent only to the allowlisted beacon endpoint over
  HTTPS. But it now *can* correlate a player's sessions over time on the
  analytics provider's side, which T4 previously ruled out. This is the
  explicit, intended trade-off of this plan (retention funnel needs it) —
  flagging it rather than silently reopening a closed threat is the point of
  this doc.

## 3. `upgrade_chosen` event payload

The event stays on the existing frozen four-name enum (`session_start`,
`wave_cleared`, `upgrade_chosen`, `session_end` — see
`docs/telemetry-schema.json`, updated same-day for this plan). No new event
name was added; two new optional numeric properties were added to
`upgrade_chosen`:

```json
{
  "session_id": "…",
  "event_name": "upgrade_chosen",
  "timestamp": "…",
  "properties": { "upgrade_id": "fire-rate", "world_x": 480, "world_y": 210 }
}
```

`world_x`/`world_y` are the ship's position in the play field at pick time
(0–960 / 0–600), never a real-world location. No identifiers were added.

## Sign-off

- Security Engineer (currentBuild schema, local-only guarantee): _______________________  Date: ____________
- Data Analyst (`session_id` persistence behavior, funnel measurability): _______________________  Date: ____________
