---
aliases: []
date: '2026-09-15'
id: 66c0c184-minutes
meeting_id: 66c0c184
project: Asteroids Survivor
summary: Minutes for todo integrations.
tags:
- minutes
- asteroids-survivor
- meeting
title: Minutes — todo integrations
type: minutes
---

# Minutes — todo integrations

**Date:** 2026-09-15
**Kind:** Technical
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
- Tech Researcher
- You

## Executive Summary

The room locked a three-gate plan to unblock the scaffold. Gate 1 (repo + CI) is owned by Lead Engineer; Gate 2 (persistence + beacon) by Technical Engineering Manager; Gate 3 (playable core loop) remains unnamed but now has UX acceptance criteria. Both Gate 1 and Gate 2 owners commit to shipping today with pass/fail checks, security verification (aggregated-only telemetry, local-only persistence), and a frozen telemetry schema in repo. UX/UI Designer will publish first-run criteria today for tomorrow's verification. Scaffold proceeds tomorrow if Gates 1 and 2 land. DevOps will add lint/typecheck/test gates post-scaffold as a Day-2 task. Architect flagged missing explicit contracts between persistence and beacon; Security and UX resolved that the event-bus handshake must include a security checklist.

## Discussion Highlights

- Product Manager asked whether the "three hard gates" from the project note were the todo items or a separate list.
- Technical Engineering Manager named the gates: Lead Engineer takes repo+CI; TEM takes persistence+beacon; scaffold tomorrow if Gate 1 lands today.
- Data Analyst and QA Engineer insisted on one measurable done signal and a pass/fail check per gate, including the third gate.
- Architect required naming the third gate and giving each a pass/fail check before calling it a plan.
- Lead Engineer defined Gates 1–3 with pass/fail checks: repo+CI today, persistence+beacon today, playable core loop tomorrow if both land.
- Security Engineer added a security check to each gate: verify telemetry beacon sends only aggregated, non-identifiable data and persistence stays local until opt-in.
- DevOps Engineer confirmed the cheap CI pipeline (single job: `npm ci && npm run build && npx gh-pages -d dist`) for Gate 1; both gates include Security's checks; scaffold tomorrow if both land.
- UX/UI Designer defined Gate 3 UX criteria: first-run completes wave 1 without tutorial, controls discovered in ≤5s, upgrade choice understood on first pick; will write criteria today.
- Product Manager locked the plan: three gates, pass/fail on each, two owners shipping today, UX criteria written today for tomorrow's verification.
- Architect added a minimal event-bus contract between persistence and beacon and froze the telemetry schema in repo.
- Lead Engineer confirmed shipping repo+CI today with telemetry schema frozen; TEM defines the event-bus handshake.
- Security Engineer required a security verification checklist on each gate's done criteria.
- DevOps Engineer noted follow-up: add lint/typecheck/test gates to CI after scaffold (Day-2, not a blocker).
- UX/UI Designer noted the event-bus needs four telemetry events for the first-run criteria.
- Security Engineer and UX/UI Designer resolved: event-bus contract requires security checklist because persistence-beacon handshake must verify aggregated, non-identifiable data.
- Council LOG confirmed alignment: plan executable, two owners delivering today, third gate criteria written today, event-bus contract owned by TEM with security checklist baked in.

## Key Decisions Made

- Three gates defined with pass/fail checks: Gate 1 repo+CI (Lead Engineer), Gate 2 persistence+beacon (Technical Engineering Manager), Gate 3 playable core loop (owner unnamed).
- Scaffold tomorrow if Gates 1 and 2 land today.
- Security verification checklist added to each gate: telemetry beacon sends only aggregated, non-identifiable data; persistence stays local until opt-in.
- Telemetry schema frozen in repo; minimal event-bus contract between persistence and beacon owned by Technical Engineering Manager.
- UX acceptance criteria for Gate 3 defined: wave-1 completion without tutorial, ≤5s control discovery, upgrade clarity on first pick.
- DevOps will add lint/typecheck/test gates to CI pipeline post-scaffold (Day-2 task, not a blocker).
- Event-bus handshake requires security checklist (resolved between Security Engineer and UX/UI Designer).

## Action Items & Next Steps

- [ ] Ship repo+CI with frozen telemetry schema — Lead Engineer
- [ ] Ship persistence+beacon with security checks and event-bus handshake — Technical Engineering Manager
- [ ] Publish first-run UX criteria doc (wave 1, 5s discovery, upgrade clarity) — UX/UI Designer
- [ ] Add lint/typecheck/test gates to CI pipeline after scaffold — DevOps Engineer

## Open Questions & Risks

- Third gate owner unnamed; playable core loop delivery depends on Gates 1 & 2 landing today [[memory:third-gate-undefined]]
- Explicit contracts between persistence and beacon components still risk hidden coupling (Architect flag) [[memory]]
- Event-bus contract requires four telemetry events; security checklist must be baked into handshake [[todos:Scaffold telemetry beacon client]] [[todos:Add a security verification checklist to each gate's done criteria]]
- Gate 3 UX criteria not yet written; without it tomorrow's scaffold verification has no pass/fail bar [[todos:Write UX acceptance criteria for gate three]] [[memory:gate-three-ux-criteria includes wave-1 completion, 5s control discovery, upgrade clarity]]
- Telemetry beacon sends only aggregated, non-identifiable data and persistence stays local until opt-in — must be verified at each gate [[memory:Telemetry beacon sends only aggregated, non‑identifiable data and persistence stays local until opt‑in]]
- Define done signals for repo+CI and persistence+beacon [[todos:Define done signals for repo+CI and persistence+beacon]]
- Define acceptance criteria for each gate [[todos:Define acceptance criteria for each gate]]
- Define third gate with owner and acceptance criteria [[todos:Define third gate with owner and acceptance criteria]]
- Implement Gate 3 playable core loop [[todos:Implement Gate 3 playable core loop]]
- Add lint/typecheck/test gates to CI pipeline [[todos:Add lint/typecheck/test gates to CI pipeline]] [[todos:Add lint/typecheck/test gates to CI pipeline after scaffold]]

## Links

- [[Project]]
- [[2026-09-15-todo-integrations]]
- [[66c0c184-roadmap]]
