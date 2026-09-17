---
aliases: []
date: '2026-09-17'
id: 90e0f1be-minutes
meeting_id: 90e0f1be
project: Asteroids Survivor
summary: Minutes for Lead Engineer builds in-world picker scene with Rex plugin (pauses
  physics, +18.
tags:
- minutes
- asteroids-survivor
- meeting
title: Minutes — Lead Engineer builds in-world picker scene with Rex plugin (pauses
  physics, +18
type: minutes
---

# Minutes — Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, +18

**Date:** 2026-09-17
**Kind:** Technical
**Attendees:**
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Product Manager
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
- You

## Executive Summary

The room consolidated the locked XP & Skill Progression slice into a four-phase executable sequence for the Day-1 retention probe. Phase 0 (schema freeze, security sign-off, session_id persistence decision, scaffold, CI, Lighthouse gate) is the critical path and must land today; Phase 1 (Rex picker scene, UX validation, icon polish) starts tomorrow; Phase 2 (beacon mapping, upgrade_chosen wiring, Data Analyst verification) follows Phase 0.2/0.3; Phase 3 (core loop wiring, wave curve by playtime, Gate 3 UX validation) follows Phase 1.1/2.1; Phase 4 deploys to Pages. Meta-progression, full CI hardening, Workbox, leaderboard, and backend are explicitly not this increment. The single point of failure is Phase 0.3 (session_id persistence decision) — if it slips past today, Phase 2 stalls and the Pages deploy misses its window.

## Discussion Highlights

- Product Manager confirmed the room is complete and authorized the consolidated plan with no new scope.
- Technical Engineering Manager presented the phased action plan with explicit owners, dependencies, and done-when criteria for Phases 0–3.
- Data Analyst confirmed telemetry schema frozen; session_id persistence check is the gate before beacon mapping lands.
- Lead Engineer committed to Phase 0.1–0.3 today, Phase 1 starting tomorrow; recorded stack ADR and scaffold ship as dependencies.
- Security Engineer will review currentBuild schema for security once telemetry ADR is frozen and session_id persistence confirmed.
- DevOps Engineer owns CI pipeline (0.6) and Lighthouse budgets (0.7), both landing after scaffold (0.4) and Security CSP/audit (0.5).
- UX/UI Designer will validate ≤5 s control discovery on mobile the moment Lead Engineer lands the Rex picker scene (1.1).
- QA Engineer will write gate 1–3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) to the PR checklist today.
- Architect noted schema, session_id, and Rex picker are the only variables left; each draws trust boundaries (device identifier, upgrade state, in-world coordinates).
- Council log (hard review) reinforced Phase 0 as the single point of failure; QA pass/fail criteria must land in PR checklist to gate Pages deploy without rework.

## Key Decisions Made

- Phase 0 executes today; Phase 1 starts tomorrow; Phases 2

## Action Items & Next Steps

- [ ] ### 1. Schema & Persistence Gates (must land before beacon mapping) — Lead Engineer
- [ ] Alright, let's get the security checks in early. I'll review the currentBuild schema before we merge. — Security Engineer
- [ ] Picker UX validation waits on Lead Engineer's Rex scene; I'll own the ≤5s discovery check and the first-pick clarity pass. — UX/UI Designer
- [ ] No new scope. Ship the probe. — Product Manager
- [ ] | 0.4 | Ship scaffold (Step 1) — repo + CI with frozen schema | Lead Engineer | 0.1, 0.2, 0.3 | Green on `main` | — Technical Engineering Manager
- [ ] Schema freeze and session_id gate are the critical path for measurement — I'll confirm storage.ts persistence or spec the startRun() mint today so beacon mapping doesn't stall. — Data Analyst
- [ ] Let's start. I'll review the currentBuild schema for security once the telemetry ADR is frozen and session_id persistence is confirmed. — Security Engineer
- [ ] I'll verify storage.ts session_id persistence or write the startRun() mint spec today — beacon mapping depends on it. — Data Analyst

## Open Questions & Risks

- verify storage.ts persists stable session_id across browser close or specify mint-in-startRun implementation ([[todos]]) — Data Analyst
- write gate 1-3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) ([[todos]]) — QA Engineer
- Harden CI with lint/typecheck/test gates and Lighthouse budgets ([[todos]]) — DevOps Engineer
- Validate picker on mobile viewport ([[todos]]) — UX/UI Designer
- Define pass/fail criteria for each gate in repo ([[todos]]) — QA Engineer
- Codify QA pass/fail criteria (bundle budget, event-bus contract, physics-regression test for pause/resume) into PR checklist ([[todos]]) — QA Engineer
- Verify session_id persistence proof lands in PR today ([[todos]]) — Data Analyst
- session_id must survive browser close for retention probe ([[memory]])

---

## Links

- [[Project]]
- [[2026-09-17-lead-engineer-builds-world]]
- [[90e0f1be-roadmap]]
