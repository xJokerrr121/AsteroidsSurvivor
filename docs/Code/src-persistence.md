---
aliases: []
area: src/persistence
code_hash: 23af84b85ffc8863
source_files:
- src/persistence/storage.test.ts
- src/persistence/storage.ts
summary: This area provides local game-state persistence using IndexedDB. It stores
  the player's best survival time, the timestamp of the last finished run, and a total
  run count. All data remains on the device; the only declared exception is the te
tags: []
title: Code — src/persistence
type: code
---

# Code — src/persistence

> Written by an auto-documentation run from the source of 2 of 2 file(s) under `src/persistence` in Asteroids Survivor. Re-run auto-document to refresh it after the code changes.

## Responsibility

This area provides local game-state persistence using IndexedDB. It stores the player's best survival time, the timestamp of the last finished run, and a total run count. All data remains on the device; the only declared exception is the telemetry beacon, which carries no identifiers (see `docs/security/threat-model-indexeddb-beacon.md`). Persistence is best-effort: reads return `EMPTY_STATE` on first visit or any failure, and writes silently no-op when IndexedDB is unavailable (e.g., private browsing).

## Files

**src/persistence/storage.ts** — Core persistence implementation. Defines the `GameState` shape, the `EMPTY_STATE` default, and three exported functions: `loadState`, `saveState`, and `recordRun`. It manages a single IndexedDB database (`asteroids-survivor` v1) with one object store (`game-state`) and a single key (`run-state`).

**src/persistence/storage.test.ts** — Unit tests covering the happy path: a first visit yields `EMPTY_STATE`; `recordRun` updates high score, last-run timestamp, and run count; and subsequent runs keep the best score while incrementing the count.

## Key Functions and Types

**GameState** — Interface with three fields: `highScoreMs` (number), `lastRunAt` (ISO 8601 string or null), `runCount` (number). Documented in `docs/ux/core-loop-flow.md`.

**EMPTY_STATE** — Constant default: high score 0, `lastRunAt` null, run count 0.

**openDb()** — Opens (and on first use creates) the IndexedDB database and object store. Returns a promise that resolves with the `IDBDatabase` instance.

**loadState()** — Reads the stored `GameState` from the object store. On success, merges any stored fields over `EMPTY_STATE`; on any error (including first visit), returns a fresh copy of `EMPTY_STATE`.

**saveState(state)** — Writes the provided `GameState` to the object store under `STATE_KEY`. Catches and ignores all errors so a run remains playable without persistence.

**recordRun(previous, survivedMs)** — Pure fold of a finished run: computes `highScoreMs` as the max of previous and current survival time, sets `lastRunAt` to `new Date().toISOString()`, increments `runCount`, persists the result via `saveState`, and returns the new state.

## Integration with the Project

The module is imported by the broader `src` tree (per the import graph). Gameplay code calls `loadState` on startup to hydrate the UI with the current high score and run count, and calls `recordRun` when a run ends (death or wave clear) to update and persist the new totals. No other project code directly touches IndexedDB; this module is the sole persistence boundary.

## Files

| File | Read | What it declares |
| --- | --- | --- |
| `src/persistence/storage.test.ts` | yes | `—` |
| `src/persistence/storage.ts` | yes | `STATE_KEY, GameState, EMPTY_STATE, loadState, saveState, recordRun` |

## Around it

- Imported by: `src`

## Links

- [[Architecture]]
- [[Project]]
