---
aliases: []
project: Asteroids Survivor
summary: Project note index for council retrieval.
tags:
- index
- moc
title: Index
type: index
updated: '2026-09-11T17:19:09.448419'
---

# Index

## Definitions

- [[Architecture]] — Living architecture map for Asteroids Survivor.
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

## Meetings

- [[2026-09-10-classic-asteroids-arcade]] — Meeting note on Classic Asteroids arcade game, with vampire survivor mechanics.
- [[2026-09-11-plan-first-increment-ordered]] — Meeting note on Plan the first increment — ordered.

## Minutes

- [[2026-09-11-plan-first-increment-ordered-minutes]] — Minutes for Plan the first increment — ordered.

## Interviews

- [[2026-09-11-name-runtime-interview]] — Operator interview session on Name the runtime.

## Research

- _No research yet_

## Roadmaps

- [[dcd07828-roadmap]] — Strategic implementation roadmap for Plan the first increment — ordered.
- [[todos]] — Named overflow parked from council rooms. Tick here; do not copy into a meeting's Next actions.

## ADRs

- _No ADRs yet_

## Plans

- [[2026-09-11-execution-spec-plan-first]] — Execution Spec — Plan the first increment — ordered

## Prompts

- [[prompt-execution-execute-execution-spec-plan]] — Hand the "Execution Spec — Plan the first increment — ordered" plan to a coding agent for implementation.

## Code

- _No code yet_

## Diagrams

- _No diagrams yet_

## Blueprints

- [[blueprint-2026-09-11-classic-asteroids-arcade]] — Incubation blueprint for Classic Asteroids arcade game, with vampire survivor mechanics with 5 authorized decisions.

## Locks

- _No locks yet_

## Project

- [[Project]] — Map of notes for Asteroids Survivor.
