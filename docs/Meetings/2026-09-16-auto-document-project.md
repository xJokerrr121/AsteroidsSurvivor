---
aliases: []
attendees:
- Technical Writer
date: '2026-09-16'
kind: docs
meeting_id: 9c2a3a7b
models: {}
project: Asteroids Survivor
status: completed
summary: Meeting note on Auto-document project.
tags:
- meeting
- docs
- asteroids-survivor
title: Auto-document project
type: meeting
---

# Auto-document project

**Kind:** docs
**Date:** 2026-09-16
**Status:** completed
**Project:** [[Project]]
**Roadmap:** [[9c2a3a7b-roadmap]]
**Minutes:** [[2026-09-16-auto-document-project-minutes]]

## Attendees

- Technical Writer

## Transcript

## System

Read 10 source files and 50 vault notes. 0 notes are invisible to the docs graph. 4 area(s) of the codebase will be documented from source.

## System

Staged 32 link and frontmatter repairs.

## Technical Writer

Asteroids Survivor is a TypeScript project organized under a `src/` root with four primary subdirectories: `game`, `persistence`, `telemetry`, and `test`. The codebase contains ten source files and five internal imports, with no HTTP routes exposed.

The `persistence` layer provides local storage via IndexedDB through `src/persistence/storage.ts`, which explicitly keeps all data on-device. The `telemetry` layer exposes a beacon client in `src/telemetry/beacon.ts` for sending aggregated, non-identifiable events. The `game` directory holds core gameplay code, while `test` contains test utilities. Three files sit at the repository root, and one file resides directly under `src/`.

Dependencies flow from the game and telemetry modules toward persistence for storage, and from game toward telemetry for event emission. No external network endpoints or server-side surfaces are present in the module graph.

## System

Applied 31 note(s) to the vault. 2 skipped as changed on disk.

## Technical Writer

## Responsibility

This area holds the project's build, lint, and test tooling configuration. The three files define how source code is checked, compiled for production, and exercised in the test runner. They are consumed by the respective CLI tools (`eslint`, `vite`, `vitest`) and by CI pipelines that invoke those tools.

## File breakdown

**eslint.config.js**  
Configures ESLint with the JavaScript and TypeScript recommended rule sets via `typescript-eslint`. It ignores the `dist/` and `node_modules/` outputs, targets ECMAScript 2022 modules, and relaxes the `no-unused-vars` rule to allow identifiers prefixed with `_` (a common pattern for intentionally unused parameters).

**vite.config.ts**  
Configures Vite for production builds. The `base` option defaults to `/AsteroidsSurvivor/` (overridable via `VITE_BASE_PATH`) so that hashed asset URLs resolve correctly when the site is served from a GitHub Pages subpath under a strict CSP `default-src 'self'` policy. The build targets ES2022 and omits sourcemaps.

**vitest.config.ts**  
Configures Vitest to run in a `jsdom` environment (simulating a browser DOM), loads a shared test setup file at `src/test/setup.ts`, and discovers test files matching `src/**/*.test.ts`.

## Key entry points

These are configuration objects exported as default from each file; there are no callable functions or classes to invoke directly. The relevant exports are:

- `eslint.config.js` → the `tseslint.config(...)` array passed to ESLint
- `vite.config.ts` → the object returned by `defineConfig({ base, build })`
- `vitest.config.ts` → the object returned by `defineConfig({ test })`

## Integration with the rest of the project

- **Source code** (`src/`) is linted against the ESLint config, built by Vite into `dist/`, and tested by Vitest using the patterns and setup defined here.
- **CI/CD** runs `eslint`, `vite build`, and `vitest run` (or their package-script aliases) using these configs.
- The `base` path in Vite must match the deployment target (GitHub Pages repository name) so that the generated `index.html` references assets with the correct prefix.
- The Vitest setup file (`src/test/setup.ts`) is the place where global test utilities or DOM polyfills would be registered; it is referenced only from this config.

## Technical Writer

## Responsibility

This area is the application entry point and the core gameplay scene. It wires the Phaser game instance, binds the game-over overlay to persistence and telemetry, and implements the single-screen survival loop: Newtonian ship movement, auto-fire at the nearest asteroid, escalating asteroid spawns, vector-rendered graphics, and a single collision that ends the run.

## Files

**src/game/GameScene.ts** — The sole Phaser `Scene` subclass. It owns the physics world, input handling, spawn timers, collision logic, and the vector texture factory. All gameplay state lives here; the scene emits `DEATH_EVENT` with the survival time when the ship hits an asteroid.

**src/main.ts** — Bootstraps the Phaser `Game` config, loads initial persisted state, sends a `session_start` telemetry event, and attaches the game-over overlay handlers. It bridges the scene's `DEATH_EVENT` to `recordRun` (persistence) and `sendEvent` (telemetry), then shows the overlay with the run summary and best score. The "Continue" button hides the overlay and calls `scene.startRun()` to reset the field without reloading the page.

**src/test/setup.ts** — Test harness setup that installs `fake-indexeddb/auto` so persistence tests run against an in-memory IndexedDB implementation.

## Key classes and functions

**GameScene** — Central gameplay class. `preload()` calls `createVectorTextures()` to draw ship, bullet, and asteroid shapes into GPU textures at runtime (no image assets). `create()` builds the ship body (circular hitbox, drag, max velocity), asteroid and bullet groups, keyboard cursors plus WASD keys, the survival timer text, and two overlap handlers: ship–asteroid ends the run; bullet–asteroid destroys the bullet and shatters the asteroid. `update()` is the per-frame loop: updates the timer, reads input via `steer()`, fires via `autoFire()`, spawns via `spawnAsteroids()`, wraps positions, and expires old bullets.

**steer()** — Computes acceleration from arrow keys or WASD, applies it to the ship body, and rotates the ship to face its velocity vector (plus 90° so the triangle points forward).

**autoFire()** — On a fixed interval (`FIRE_INTERVAL_MS`), finds the nearest asteroid via `nearestAsteroid()`, creates a bullet at the ship position, and sets its velocity toward that target.

**spawnAsteroids(elapsed)** — Uses a ramped interval that decreases from `SPAWN_INTERVAL_START_MS` toward `SPAWN_INTERVAL_FLOOR_MS` based on seconds elapsed. Each spawn picks a random screen edge via `edgePosition()` and creates a large asteroid drifting toward the ship with angular velocity and a small angle jitter.

**shatter(asteroid)** — When a large asteroid is hit, it is replaced by two small asteroids at the same position. Small asteroids simply disappear on hit.

**startRun()** — Clears all asteroids and bullets, recenters the ship, zeroes velocity, resets spawn timer and `runStartedAt`, and sets `alive = true`. Called on initial `create()` and on "Continue" from the overlay.

**endRun()** — Stops the ship, hides it, sets `alive = false`, and emits `DEATH_EVENT` with the rounded survival milliseconds.

**bootstrap()** (main.ts) — Async entry point. Loads `GameState` from persistence, sends `session_start` with a `returning` flag, constructs the Phaser `Game` with the `GameScene`, waits for `Phaser.Core.Events.READY` to hook `scene.events.on(DEATH_EVENT, onDeath)`, and wires the continue button.

**onDeath(survivedMs)** — Persists the run via `recordRun`, sends a `death` telemetry event with `survived_ms` and `high_score_ms`, updates the overlay text, reveals the overlay, and focuses the continue button.

## Integration with the rest of the project

- **Persistence (`src/persistence/storage`)** — `main.ts` imports `loadState`, `recordRun`, and `GameState`. On boot it loads the saved high score and run count; on death it records the new run and receives the updated state for the overlay.
- **Telemetry (`src/telemetry/beacon`)** — `main.ts` imports `sendEvent` and fires three events: `session_start` (with `returning`), `death` (with `survived_ms` and `high_score_ms`), and `continue_click` (with `high_score_ms`).
- **Phaser** — The only external runtime dependency. `GameScene` uses Arcade physics, the scale manager, input/keyboard, and the graphics texture generator.
- **DOM overlay** — The game-over UI lives in `index.html` (elements `#game-over`, `#game-over-summary`, `#game-over-best`, `#continue-button`). `main.ts` selects them and toggles visibility; no other HTML is required.

---

Back to [[Project]]
