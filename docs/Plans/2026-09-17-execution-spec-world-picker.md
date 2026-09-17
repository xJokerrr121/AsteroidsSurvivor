---
aliases: []
date: '2026-09-17'
meeting_id: 90e0f1be
project: Asteroids Survivor
status: planned
summary: Execution Spec — In-World Picker Scene & Day-1 Retention Probe
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: Plan — Execution Spec — In-World Picker Scene & Day-1 Retention Probe
type: plan
---

# Plan — Execution Spec — In-World Picker Scene & Day-1 Retention Probe

**Date:** 2026-09-17  
**Kind:** Technical  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `90e0f1be`  

## Attendees & Ownership

- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Product Manager
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer

## Goal
Ship a Day-1 retention probe to GitHub Pages consisting of: (1) a frozen telemetry schema and ADR, (2) a scaffold repo with CI + Lighthouse gate, (3) an in-world upgrade picker scene built with the Rex plugin that pauses physics and renders world coordinates, (4) a three-option upgrade picker (three distinct icons, one-tap, no scroll, ≤5 s mobile discovery), (5) beacon event mapping for `upgrade_chosen` carrying world coords + `session_id`, (6) wave-1 core loop (move, auto-fire, XP, upgrade choice, non-pause wave clear) with difficulty curve driven by playtime, and (7) QA gate criteria in PR checklist gating the Pages deploy. Meta-progression, full CI hardening, Workbox, leaderboard, and backend are explicitly out of scope.

## Locked decisions
- Telemetry schema frozen: `session_id`, `event_name`, `timestamp`, `properties` — Data Analyst
- Typed event emitter (mitt or minimal custom `EventTarget`) exported from dedicated module — [[adr-001-registration-invocation]]
- Phase 0 executes today (schema freeze, security sign-off, session_id persistence decision, scaffold, CI, Lighthouse gate); Phase 1 starts tomorrow (Rex picker scene, UX validation, icon polish) — Product Manager
- `currentBuild` schema is `Upgrade[]` (local-only, no new telemetry IDs); Security Engineer reviews before merge — Security Engineer
- CI green on `main`; schema freeze and Security sign-off unblock beacon mapping and Pages deploy — Technical Engineering Manager
- UX/UI Designer owns ≤5 s discovery check and first-pick clarity pass for Picker UX validation, depends on Lead Engineer landing Rex scene (1.1) — UX/UI Designer
- DevOps Engineer / Technical Engineering Manager own CI pipeline (0.6) and Lighthouse budgets (0.7), both land after scaffold (0.4) and Security CSP/audit (0.5) — Technical Engineering Manager / DevOps Engineer
- Data Analyst verifies `storage.ts` persists stable `session_id` across browser close or specs `startRun()` mint implementation today — Data Analyst
- QA Engineer writes Gate 1–3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) to PR checklist today — QA Engineer
- Architect: schema, session_id, and Rex picker are the only remaining variables; each draws trust boundaries (device identifier, upgrade state, in-world coordinates) — Architect

## Constraints
- Must: Freeze telemetry schema and record ADR before scaffold ships
- Must: `session_id` persistence decision (storage.ts or startRun() mint) before beacon mapping lands
- Must: Security Engineer sign-off on `currentBuild` schema after telemetry ADR freeze and session_id persistence confirmed
- Must: CI pipeline (single job) passes on `main` today; no lint/typecheck/test gates per project language — breakage = deploy failure
- Must: Lighthouse CI budgets: JS ≤ 170 kB gzipped; first build may exceed and block PR
- Must: Rex plugin bundle impact stays inside Step 4 budget (unmeasured; Tech Researcher claims it fits)
- Must: Three-option picker — three distinct icons, one tap, no scroll, ≤5 s discovery on mobile viewport
- Must: Wave difficulty curve driven by playtime (not player level); validate fairness across session lengths via playtest
- Must: `upgrade` beacon event carries world coords + `session_id`
- Must: `upgrade_chosen` hook wired before UX can validate choice screen (critical path for UX validation)
- Must: Non-pause wave clear in core loop
- Must not: Meta-progression, full CI hardening (lint/typecheck/test gates), Workbox, leaderboard, backend — explicitly not this increment
- Must not: Reopen concept or locked stack issues
- Out of scope: Customer interviews, willingness-to-pay, mockups, "collect N responses" — operator work

## Surfaces
- `storage.ts` — session_id persistence (read/write stable ID across browser close)
- `startRun()` — mint spec for session_id if storage.ts not used
- Telemetry schema: `{ session_id: string, event_name: string, timestamp: number, properties: Record<string, unknown> }`
- Event bus: typed emitter (mitt / custom EventTarget) per ADR-001
- Events: `upgrade` (world coords + session_id), `upgrade_chosen`, `DEATH_EVENT`, `shatter()`
- `currentBuild` schema: `Upgrade[]` (local-only)
- Rex plugin — in-world picker scene (pauses physics, renders world coordinates)
- Picker UI: three distinct icons, one-tap, no scroll/tooltip hunt
- CI pipeline: single job, deploys to Pages
- Lighthouse CI: performance gate (JS ≤ 170 kB gzipped)
- CSP header + `npm audit` in CI job
- ADR files: stack ADR, telemetry ADR (committed to repo)
- PR checklist: Gate 1–3 pass/fail criteria
- GitHub Pages deploy target

## Execution graph
```mermaid
flowchart TD
    A[0.1 Freeze telemetry schema] --> B[0.2 Record telemetry ADR]
    A --> C[0.3 Decide session_id persistence]
    B --> D[0.4 Ship scaffold repo + CI with frozen schema]
    C --> D
    C --> E[0.5 Security: CSP header + npm audit + currentBuild review]
    D --> F[0.6 Land CI pipeline to Pages]
    E --> F
    F --> G[0.7 Add Lighthouse CI performance gate]
    G --> H[1.1 Lead Engineer: Rex picker scene (pause physics, world coords)]
    H --> I[1.2 UX/UI Designer: ≤5s discovery + first-pick clarity validation]
    H --> J[1.3 Build three-option upgrade picker (icons, one-tap, no scroll)]
    I --> K[2.1 Beacon event mapping layer + upgrade_chosen hook]
    J --> K
    C --> K
    K --> L[2.2 Data Analyst: verify upgrade event carries world coords + session_id]
    K --> M[3.1 Wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear)]
    H --> M
    M --> N[3.2 Implement wave difficulty curve by playtime]
    N --> O[3.3 Gate 3 UX validation (5s discovery, single-tap, non-pause clear)]
    O --> P[4.1 Ship to Pages for Day-1 retention probe]
    L --> P
```

## Steps
1. `docs/adr/telemetry-schema.md` — Freeze telemetry schema (session_id, event_name, timestamp, properties) and commit as ADR — Acceptance: ADR file exists in repo with final schema; no further edits after commit
2. `docs/adr/stack.md` — Record stack ADR (typed event emitter per ADR-001) and commit — Acceptance: ADR file exists; emitter module exported and importable
3. `src/storage.ts` — Verify `storage.ts` persists stable `session_id` across browser close OR write `startRun()` mint spec in `src/session.ts` — Acceptance: Either storage.ts read/write test passes in console, or startRun() spec document committed with mint algorithm
4. `src/scaffold/` — Ship scaffold repo + CI with frozen schema (package.json, tsconfig, index.html, minimal entry point, telemetry types) — Acceptance: `npm run build` succeeds; `main` branch green; telemetry types match frozen schema
5. `.github/workflows/ci.yml` — Add CSP header middleware + `npm audit` step to CI job — Acceptance: CI job runs `npm audit` and sets CSP header in preview deploy; no high/critical vulns block
6. `security/currentBuild-review.md` — Security Engineer reviews `currentBuild` (Upgrade[]) schema; written approval in PR — Acceptance: PR comment with "Security sign-off: currentBuild schema approved" from Security Engineer
7. `.github/workflows/ci.yml` — Land CI pipeline (single job) deploying to Pages on `main` push — Acceptance: Push to `main` triggers deploy; Pages URL serves built artifact
8. `.github/workflows/lighthouse.yml` — Add Lighthouse CI performance gate with budget JS ≤ 170 kB gzipped — Acceptance: PR fails if budget exceeded; passes on scaffold build
9. `src/scenes/PickerScene.ts` — Lead Engineer: Implement in-world picker scene using Rex plugin; pause physics on open, resume on close; render upgrade options at world coordinates — Acceptance: Scene loads; physics pauses/resumes; three options rendered at correct world coords; Rex plugin bundle size measured and ≤ budget
10. `src/ui/UpgradePicker.ts` — Build three-option upgrade picker: three distinct SVG icons (imported), one-tap selection, no scroll/tooltip, mobile viewport tested — Acceptance: Three icons visible at 320px width; tap selects and emits `upgrade_chosen`; no scroll container; icon clarity verified on device
11. `ux/validation/picker-discovery.md` — UX/UI Designer: Conduct ≤5 s control discovery test on mobile; document first-pick clarity pass/fail — Acceptance: Markdown file with timestamped test result (pass/fail), device, duration, notes
12. `src/events/beacon.ts` — Implement beacon event mapping layer: wire `upgrade_chosen` hook, map to `upgrade` event with world coords + session_id, emit to beacon endpoint — Acceptance: `upgrade_chosen` fires → `upgrade` event emitted with `{ x, y, session_id }`; unit test or console log verifies payload shape
13. `src/game/coreLoop.ts` — Implement Wave-1 core loop: move, auto-fire, XP accumulation, upgrade choice at threshold, wave clear (non-pause), DEATH_EVENT piggyback, shatter() hook — Acceptance: Playable loop in browser; XP thresholds trigger picker; wave clears without pausing; DEATH_EVENT fires on death
14. `src/game/waveCurve.ts` — Implement wave difficulty curve driven by playtime (not player level); config-driven parameters — Acceptance: Curve function exported; playtime input produces difficulty params; playtest note attached confirming fairness across short/long sessions
15. `qa/gates.md` — QA Engineer: Write Gate 1–3 pass/fail criteria to PR checklist (session_id persistence, bundle budget, event-bus contract, schema freeze, 5s discovery, single-tap, non-pause clear) — Acceptance: PR template updated with checkboxes; each gate has measurable pass/fail condition
16. `deploy/pages` — Technical Engineering Manager: Trigger Pages deploy for Day-1 retention probe — Acceptance: Pages URL live; beacon events received in analytics; probe active

## Verification
- All Phase 0 steps (1–8) complete: `main` green, Pages deploy serves scaffold, Lighthouse passes, Security sign-off recorded, telemetry ADR frozen, session_id persistence decided
- Phase 1 steps (9–11) complete: Rex picker scene loads, physics pauses/resumes, three icons render at world coords, UX validation doc shows ≤5 s discovery pass, picker emits `upgrade_chosen`
- Phase 2 steps (12) complete: `upgrade` beacon event captured with world coords + session_id; Data Analyst confirms in analytics
- Phase 3 steps (13–15) complete: Core loop playable, wave curve implemented and playtested, Gate 3 criteria in PR checklist all pass
- Phase 4 step (16) complete: Pages URL live, Day-1 retention probe collecting data

## Open risks
- Rex plugin bundle size unmeasured — may exceed Step 4 (170 kB JS gzipped) budget; no fallback plan documented
- `storage.ts` session_id persistence across browser close unverified — if fails, `startRun()` mint spec must be implemented and tested same day
- Event-bus contract not yet defined in code — handshake drift between beacon mapping and schema possible
- Lighthouse CI budget tight — first build may exceed 170 kB gzipped and block PR; no mitigation step defined
- Wave difficulty curve fairness across session lengths unvalidated — playtest not scheduled
- Icon

---

## Links

- [[Project]]
- Source meeting: `90e0f1be`
