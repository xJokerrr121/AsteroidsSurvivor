---
aliases: []
date: '2026-09-16'
meeting_id: 9c2a3a7b
project: Asteroids Survivor
status: planned
summary: Auto-document project — Execution Spec
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: Plan — Auto-document project — Execution Spec
type: plan
---

# Plan — Auto-document project — Execution Spec

**Date:** 2026-09-16  
**Kind:** Auto-document  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `9c2a3a7b`  

## Attendees & Ownership

- Technical Writer

## Goal
Create and populate the three living definition files (`Architecture.md`, `Definitions/vault-index.md`, `Locks.md`) with the content produced by the Technical Writer in this room, so the project's auto-generated documentation matches the current codebase and accepted locks.

## Locked decisions
- Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module for the `upgrade_chosen` hook [[ADR-001-registration-invocation]]
- Project structure documented by Technical Writer: `src/game`, `src/persistence`, `src/telemetry`, `src/test` with dependencies flowing game/telemetry → persistence, game → telemetry
- Build/lint/test tooling documented: `eslint.config.js`, `vite.config.ts`, `vitest.config.ts` with their specific configurations

## Constraints
- Must not invent file paths not named in the room. The three target files are explicitly named in Living definitions.
- Must use only the Technical Writer's transcript content for Architecture.md and vault-index.md; Locks.md comes from the accepted locks list.
- Do not modify source code under `src/` — this is documentation-only work.
- The plan `Plans/2026-09-15-lets-deliver-next-increment.md` exists but is not yet shipped; do not act on it here.

## Surfaces
Files the room named:
- `Architecture.md` (root)
- `Definitions/vault-index.md`
- `Locks.md` (root)
- `src/persistence/storage.ts` (referenced in transcript)
- `src/telemetry/beacon.ts` (referenced in transcript)
- `eslint.config.js`, `vite.config.ts`, `vitest.config.ts` (documented in transcript)
- `src/test/setup.ts` (referenced in vitest config)

## Steps
1. `Architecture.md` — Write the project architecture document using the Technical Writer's first transcript block (module layout, imports, dependencies, responsibility breakdown, file breakdown for tooling configs, key entry points, integration notes) — Acceptance: file exists at repo root and contains all sections from the transcript
2. `Definitions/vault-index.md` — Create the vault index (project note index for council retrieval) listing the living definitions and their one-line descriptions from the Living definitions block — Acceptance: file exists at `Definitions/vault-index.md` and lists Architecture, Vault index, Locks with their descriptions
3. `Locks.md` — Write the locks document enumerating the current accepted project-wide locks (ADR-001 typed event emitter for upgrade_chosen hook) — Acceptance: file exists at repo root and contains the locked decision with ADR reference
4. `docs/tooling-config.md` — Create a supplementary documentation file capturing the Technical Writer's second transcript block (eslint, vite, vitest config details) — Acceptance: file exists at `docs/tooling-config.md` and contains all three config breakdowns

## Verification
- All four documentation files exist at the specified paths
- `Architecture.md` matches the Technical Writer's first transcript block structure and content
- `Definitions/vault-index.md` lists the three living definitions with correct one-liners
- `Locks.md` contains the ADR-001 lock with correct phrasing
- `docs/tooling-config.md` captures the three config files' details from the second transcript block
- No source files under `src/` were modified

## Open risks
- The `Definitions/` directory may not exist — if missing, the agent must create it before writing `vault-index.md`
- The exact markdown formatting/heading hierarchy for each file was not specified in the room; agent should use sensible defaults (H1 for title, H2 for major sections)
- The plan `Plans/2026-09-15-lets-deliver-next-increment.md` may expect these docs to exist — coordination with that plan is out of scope for this spec

---

## Links

- [[Project]]
- Source meeting: `9c2a3a7b`
