---
aliases: []
date: '2026-09-11'
format: markdown
id: f9bddde9-roadmap
meeting_id: f9bddde9
project: Asteroids Survivor
summary: 'Strategic implementation roadmap for Refine: Plan the first increment —
  ordered.'
tags:
- roadmap
- asteroids-survivor
- planning
title: 'Roadmap — Refine: Plan the first increment — ordered'
type: roadmap
---

# Refine: Plan the first increment — ordered

**Project:** Asteroids Survivor
**Date:** 2026-09-11
**Meeting:** Refine
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Lead Engineer
- Security Engineer
- QA Engineer
- You

## Situation

The operator asked to refine the recently applied plan for the first increment. The Product Manager immediately refuted the assumption that scaffolding could start tomorrow. The Technical Engineering Manager declared the plan locked: three hard prerequisites gate scaffold on 2026-09-12, and all must land today. The room aligned on the block — no refinement, no scaffold, until the prerequisites are complete.

## Decisions

- **Plan is locked** — Product Manager refuted the refine request: "plan-locked-three-prereqs-gate-scaffold-tomorrow." Lead Engineer confirmed: "plan-locked-prereqs-gate-scaffold."
- **Three prerequisites must complete today (2026-09-11)** before scaffold can begin tomorrow:
  1. **Telemetry freeze ADR** — schema defined, frozen, and committed (Lead Engineer pushed: "telemetry-freeze-adr-ci-must-land-today")
  2. **CI pipeline operational** — the cheap budget job (`npm ci && npm run build && npx gh-pages -d dist`) passing on `main` (TEM: "ci-must-be-done-not")
  3. **Performance budget guardrails in CI** — Lighthouse CI step with budgets (LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped) failing PR on regression (implied third gate from PROJECT LANGUAGE and "three-hard-gates")
- **No scaffold tomorrow if any prerequisite misses today** — TEM fix: "complete-prereqs-before-2026-09-12"; QA supported; PM corrected to "prereqs-gate-scaffold-today."

## Open questions / disagreements

- **Security Engineer refuted Lead Engineer's claim to refine** — the refutation was held by Lead Engineer but not resolved in the transcript. The disagreement remains: Security Engineer challenged the Lead Engineer's framing of the refine request.
- **QA Engineer raised "what-breaks-if-we-ship"** — TEM refuted with the three gates; QA then supported the prerequisites claim. The shipping-risk question was absorbed into the gate list, not answered separately.
- **Lead Engineer corrected Security Engineer's claim about telemetry freeze ADR CI today** — the correction suggests a mismatch on what "done" means for the telemetry ADR (schema freeze vs. CI integration vs. both).

## Roadmap

### Now
- **Freeze telemetry ADR** — owner: Lead Engineer
  - Risk: Schema must be final; any post-freeze change invalidates analytics contracts and CI gate.
- **Land CI pipeline** — owner: Technical Engineering Manager
  - Risk: Single-job pipeline must pass on `main` today; no lint/typecheck/test gates per PROJECT LANGUAGE, so breakage = deploy failure.
- **Add Lighthouse CI performance gate** — owner: Technical Engineering Manager
  - Risk: Budgets are tight (JS ≤ 170 kB gzipped); first build may exceed and block PR.

### Next
- **Scaffold project** — owner: Lead Engineer
  - Only after all three Now items are green on `main`.
- **Implement client-side telemetry beacon** — owner: Lead Engineer
  - Uses frozen schema; `navigator.sendBeacon()` to managed endpoint (Plausible/Umami/Cloudflare Worker).

### Later
- Nothing parked for later.

## Next actions

- [ ] Lead Engineer: Commit telemetry freeze ADR with final JSON schema (session_id, event_name, timestamp, properties)
- [ ] Technical Engineering Manager: Push CI workflow (build + gh-pages deploy) and verify green on `main`
- [ ] Technical Engineering Manager: Add Lighthouse CI step with budgets; verify it fails on budget miss
- [ ] Lead Engineer: Confirm all three gates pass on `main` before 2026-09-12 00:00
- [ ] Product Manager: Acknowledge plan lock; no further refine cycles until scaffold complete

## Links

- [[Project]]
- [[2026-09-11-refine-plan-first-increment]]

- Meeting source: `f9bddde9`
- [[Index]]
- [[2026-09-11-refine-plan-first-increment-minutes]]
