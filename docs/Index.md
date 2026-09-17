---
aliases: []
project: Asteroids Survivor
summary: Project note index for council retrieval.
tags:
- index
- moc
title: Index
type: index
updated: '2026-09-17T16:51:06.605203'
---

# Index

## Definitions

- [[Architecture]] — Architecture — Asteroids Survivor
- [[backend-scope-contract]] — Expert recommendation: Zero backend for MVP — all state local (IndexedDB), analytics via client-side beacon to Plausible/Umami; leaderboard deferred to post-MVP.
- [[ci-pipeline-definition]] — Cheap budget: Single job: `npm ci && npm run build && npx gh-pages -d dist`; no lint/typecheck/test gates, deploy on every `main` push.
- [[client-side-telemetry-schema]] — Expert recommendation: Define a tiny JSON event schema (session_id, event_name, timestamp, properties) sent via `navigator.sendBeacon()` to a managed analytics endpoint (e.g., Plausible, Umami, or a Cloudflare Worker) — zero backend code, w
- [[concept]] — Classic Asteroids arcade game, with vampire survivor mechanics
- [[def-architecture-rule-product-like-metaphor]] — Room consensus after reviewing the operator's choice.
- [[def-data-rule-name-things-product]] — Room consensus after reviewing the operator's choice.
- [[def-delivery-rule-sees-first-learn]] — Room consensus after reviewing the operator's choice.
- [[def-scope-mvp-fantasy-survivors-vector]] — The operator chose the 'Survivors in Vector Clothing' fantasy to anchor the MVP on a single, proven retention loop with one control scheme and a concrete session-length target. This avoids the dual-mode compromise and the fundamental tension between reflex-first and build-first designs.
- [[def-security-rule-user-entitled-expect]] — Room consensus after reviewing the operator's choice.
- [[market-fit-name-runtime]] — Expert recommendation: Expose one documented endpoint plus a CSV export for Name the runtime; that covers the integrations customers ask for first.
- [[performance-budget-core-web]] — Expert recommendation: Add a GitHub Actions step running Lighthouse CI (headless Chrome) with budgets: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped; fail PR on any regression.
- [[technical-strategy-name]] — Expert recommendation: Sequence Name the runtime by risk: build the piece that can invalidate the design first, keep the rest behind flags.
- [[test-strategy-name-runtime]] — Expert recommendation: Cover the risky seams of Name the runtime with integration tests; unit-test only the logic that really branches.
- [[vault-index]] — Project note index for council retrieval.

## Findings

- [[2026-09-11-name-runtime]] — Grill interview on Name the runtime (7 settled decisions).
- [[2026-09-15-define-noun-phrase-8]] — Grill interview on Define: (noun phrase <=8 (1 settled decisions).
- [[2026-09-15-define-term-noun-phrase]] — Grill interview on Define: term (noun phrase, max 8 words) or none (1 settled decisions).
- [[2026-09-17-define]] — Grill interview on Define: and WHY: ... or (1 settled decisions).

## Meetings

- [[2026-09-10-classic-asteroids-arcade]] — Meeting note on Classic Asteroids arcade game, with vampire survivor mechanics.
- [[2026-09-11-plan-first-increment-ordered]] — Meeting note on Plan the first increment — ordered.
- [[2026-09-11-refine-plan-first-increment]] — Meeting note on Refine: Plan the first increment — ordered.
- [[2026-09-15-lets-deliver-next-increment]] — Meeting note on lets deliver the next increment.
- [[2026-09-15-todo-integrations]] — Meeting note on todo integrations.
- [[2026-09-16-auto-document-project]] — Meeting note on Auto-document project.
- [[2026-09-16-discuss-new-features]] — Meeting note on Discuss new features for this increment,.
- [[2026-09-16-refine-auto-document-project]] — Meeting note on Refine: Auto-document project.
- [[2026-09-17-asteroids-survivor]] — Meeting note on Asteroids Survivor.
- [[2026-09-17-lead-engineer-builds-world]] — Meeting note on Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, +18.
- [[2026-09-17-refine-discuss-new-features]] — Meeting note on Refine: Discuss new features for this increment,.

## Minutes

- [[2026-09-11-plan-first-increment-ordered-minutes]] — Minutes for Plan the first increment — ordered.
- [[2026-09-11-refine-plan-first-increment-minutes]] — Minutes for Refine: Plan the first increment — ordered.
- [[2026-09-15-lets-deliver-next-increment-minutes]] — Minutes for lets deliver the next increment.
- [[2026-09-15-todo-integrations-minutes]] — Minutes for todo integrations.
- [[2026-09-16-auto-document-project-minutes]] — Minutes for Auto-document project.
- [[2026-09-16-discuss-new-features-minutes]] — Minutes for Discuss new features for this increment,.
- [[2026-09-16-refine-auto-document-project-minutes]] — Minutes for Refine: Auto-document project.
- [[2026-09-17-lead-engineer-builds-world-minutes]] — Minutes for Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, +18.
- [[2026-09-17-refine-discuss-new-features-minutes]] — Minutes for Refine: Discuss new features for this increment,.

## Interviews

- [[2026-09-11-name-runtime-interview]] — Operator interview session on Name the runtime.
- [[2026-09-15-define-noun-phrase-8-interview]] — Operator interview session on Define: (noun phrase <=8.
- [[2026-09-15-define-term-noun-phrase-interview]] — Operator interview session on Define: term (noun phrase, max 8 words) or none.
- [[2026-09-16-define-noun-phrase-8-interview]] — Operator interview session on Define: (noun phrase <=8 words) or.
- [[2026-09-17-define-interview]] — Operator interview session on Define: and WHY: ... or.

## Research

- _No research yet_

## Roadmaps

- [[0f667ace-roadmap]] — Strategic implementation roadmap for Refine: Discuss new features for this increment,.
- [[66c0c184-roadmap]] — Strategic implementation roadmap for todo integrations.
- [[7fd59e2c-roadmap]] — Strategic implementation roadmap for Discuss new features for this increment,.
- [[90e0f1be-roadmap]] — Strategic implementation roadmap for Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, +18.
- [[9e074528-roadmap]] — Strategic implementation roadmap for lets deliver the next increment.
- [[dcd07828-roadmap]] — Strategic implementation roadmap for Plan the first increment — ordered.
- [[f9bddde9-roadmap]] — Strategic implementation roadmap for Refine: Plan the first increment — ordered.
- [[todos]] — Named overflow parked from council rooms. Tick here; do not copy into a meeting's Next actions.

## ADRs

- [[adr-001-registration-invocation]] — Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core loop calls `emitter.emit('upgrade_chosen', upgradeId)` and the UX validator subscribes via `emitter.on('upgrade_chosen', handler)`.

## Plans

- [[2026-09-11-execution-spec-plan-first]] — Execution Spec — Plan the first increment — ordered
- [[2026-09-11-unblock-execute-locked-12]] — Unblock and execute the locked 12-day first increment for Asteroids Survivor. Three hard prerequisites (telemetry schema
- [[2026-09-11-unblock-scaffold-start-step]] — Unblock scaffold start (Step 1) by completing the three hard prerequisites today (2026-09-11): freeze telemetry schema &
- [[2026-09-15-execution-spec-asteroids]] — Execution Spec — Asteroids Survivor: Three-Gate Scaffold Unblock
- [[2026-09-15-execution-spec-lets-deliver]] — Execution Spec — lets deliver the next increment
- [[2026-09-15-execution-spec-ship-wave]] — Execution Spec — Ship Wave-1 Core Loop Increment
- [[2026-09-15-todo-integrations-execution]] — todo integrations — Execution Spec
- [[2026-09-16-execution-spec-auto-document]] — Execution Spec — Auto-document project: Vault Index Creation
- [[2026-09-16-execution-spec-xp-skill]] — Execution Spec — XP & Skill Progression Slice (MVP Fantasy: Survivors in Vector Clothing)
- [[2026-09-17-execution-spec-world-picker]] — Execution Spec — In-World Picker Scene & Day-1 Retention Probe

## Prompts

- [[prompt-execution-execute-execution-spec-plan]] — Hand the "Execution Spec — Plan the first increment — ordered" plan to a coding agent for implementation.
- [[prompt-execution-execute-execution-spec-world]] — Hand the "Execution Spec — In-World Picker Scene & Day-1 Retention Probe" plan to a coding agent for implementation.
- [[prompt-execution-execute-execution-spec-xp]] — Hand the "Execution Spec — XP & Skill Progression Slice (MVP Fantasy: Survivors in Vector Clothing)" plan to a coding agent for implementation.
- [[prompt-execution-execute-lets-deliver-next]] — Hand the "lets deliver the next increment" plan to a coding agent for implementation.

## Code

- [[root]] — This area holds the project's build, lint, and test tooling configuration. It defines how source code is checked, compiled for production, and exercised in the test runner. The three files are independent of each other but together form the
- [[src-persistence]] — This area provides local game-state persistence using IndexedDB. It stores the player's best survival time, the timestamp of the last finished run, and a total run count. All data remains on the device; the only declared exception is the te
- [[src-telemetry]] — This area implements the client-side telemetry beacon used by the game. It sends a closed set of three event types (`session_start`, `death`, `continue_click`) to an allowlisted analytics endpoint using `navigator.sendBeacon()`. The transpo
- [[src]] — This area is the application entry point and the core gameplay scene. It wires Phaser, the persistence layer, and the telemetry beacon together, and it owns the single-player run loop: Newtonian ship movement, auto-fire targeting, asteroid

## Diagrams

- _No diagrams yet_

## Blueprints

- [[blueprint-2026-09-11-classic-asteroids-arcade]] — Incubation blueprint for Classic Asteroids arcade game, with vampire survivor mechanics with 5 authorized decisions.

## Locks

- [[Locks]] — Current accepted project-wide locks.

## Memory

- [[Memory]] — Working facts sitting attendees currently hold.

## Project

- [[Project]] — Map of notes for Asteroids Survivor.
