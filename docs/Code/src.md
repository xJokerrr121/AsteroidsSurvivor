---
aliases: []
area: src
code_hash: 58fc30838c4c8741
source_files:
- src/game/GameScene.ts
- src/main.ts
- src/test/setup.ts
summary: 'This area is the application entry point and the core gameplay scene. It
  wires Phaser, the persistence layer, and the telemetry beacon together, and it owns
  the single-player run loop: Newtonian ship movement, auto-fire targeting, asteroid'
tags: []
title: Code — src
type: code
---

# Code — src

> Written by an auto-documentation run from the source of 3 of 3 file(s) under `src` in Asteroids Survivor. Re-run auto-document to refresh it after the code changes.

## Responsibility

This area is the application entry point and the core gameplay scene. It wires Phaser, the persistence layer, and the telemetry beacon together, and it owns the single-player run loop: Newtonian ship movement, auto-fire targeting, asteroid spawning with difficulty ramp, collision resolution, and the death/continue cycle that updates the high-score overlay.

## Files

**src/game/GameScene.ts** — The only Phaser `Scene` in the project. It creates vector textures at runtime (ship, bullet, two asteroid sizes), sets up Arcade physics groups, handles input (WASD + arrow keys), runs the per-frame update loop, and emits `DEATH_EVENT` with the survived milliseconds when the ship collides with an asteroid. It exposes `startRun()` so the outer UI can restart a run without destroying the scene.

**src/main.ts** — Bootstraps the Phaser `Game` instance, loads the persisted `GameState` via `loadState()`, sends a `session_start` telemetry event, and wires the HTML overlay (`#game-over`, `#continue-button`) to the scene's `DEATH_EVENT` and `startRun()`. On death it calls `recordRun()` to persist the new high score and run count, sends a `death` telemetry event, updates the overlay text, and shows the overlay. The continue button hides the overlay, fires a `continue_click` telemetry event, and calls `scene.startRun()`.

**src/test/setup.ts** — Test harness helper that enables `fake-indexeddb` so the persistence module can run in a Node test environment without a browser.

## Key Functions and Classes

`GameScene` (class) — The central type to read first. Its `create()` sets up physics, input, collisions, and textures; `update()` drives the live loop (timer, steering, auto-fire, spawning, world-wrap, bullet expiry); `startRun()` resets all dynamic state for a fresh run; `endRun()` stops the loop, hides the ship, and emits `DEATH_EVENT`.

`steer()` — Reads WASD/arrow keys, applies acceleration to the ship body, and rotates the ship to face its velocity vector (plus 90° so the triangle points forward).

`autoFire()` / `nearestAsteroid()` — On a fixed interval, finds the closest asteroid by Euclidean distance and fires a bullet toward it. Bullets carry a `firedAt` timestamp for lifetime expiry.

`spawnAsteroids()` / `spawnAsteroid()` — Spawns large asteroids just outside the viewport edges with a velocity pointed roughly at the ship plus jitter. The spawn interval ramps down linearly with elapsed time until it hits a floor.

`shatter()` — On bullet–asteroid overlap, destroys the bullet; if the asteroid was large, replaces it with two small asteroids at the same position.

`createVectorTextures()` — Draws all sprites procedurally with `Phaser.GameObjects.Graphics` so the bundle has no external image assets.

`bootstrap()` (in `main.ts`) — The async entry point. It loads state, creates the Phaser game, attaches the death handler once `Phaser.Core.Events.READY` fires, and wires the continue button.

`onDeath()` (closure in `bootstrap`) — Persists the run, sends telemetry, updates the overlay, and focuses the continue button.

## Integration with the Rest of the Project

- **Persistence (`src/persistence/storage`)** — `main.ts` imports `loadState`, `recordRun`, and the `GameState` type. The scene itself does not touch persistence; the outer bootstrap owns that boundary.
- **Telemetry (`src/telemetry/beacon`)** — `main.ts` imports `sendEvent` and fires three events: `session_start` (with `returning` flag), `death` (with `survived_ms` and `high_score_ms`), and `continue_click` (with `high_score_ms`). The scene emits no telemetry directly.
- **Phaser** — The only external runtime dependency used in this area. `GameScene` extends `Phaser.Scene`; `main.ts` constructs `Phaser.Game` with Arcade physics and `Scale.FIT`.
- **HTML Shell** — `main.ts` expects elements `#game-root`, `#game-over`, `#game-over-summary`, `#game-over-best`, and `#continue-button` to exist in the document. The scene renders into `#game-root`; the overlay is controlled entirely from `main.ts`.

## Files

| File | Read | What it declares |
| --- | --- | --- |
| `src/game/GameScene.ts` | yes | `DEATH_EVENT, GameScene` |
| `src/main.ts` | yes | `—` |
| `src/test/setup.ts` | yes | `—` |

## Declared interface

**`src/game/GameScene.ts`**

```python
class GameScene(Phaser.Scene)
preload()
create()
startRun()
update()
steer()
autoFire()
nearestAsteroid()
spawnAsteroids()
spawnAsteroid()
shatter()
edgePosition()
wrapAll()
expireBullets()
```

## Around it

- Imports from: `src/game`, `src/persistence`, `src/telemetry`

## Links

- [[Architecture]]
- [[Project]]
