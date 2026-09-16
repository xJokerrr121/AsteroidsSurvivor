---
aliases: []
date: '2026-09-15'
format: markdown
id: 66c0c184-roadmap
meeting_id: 66c0c184
project: Asteroids Survivor
summary: Strategic implementation roadmap for todo integrations.
tags:
- roadmap
- asteroids-survivor
- planning
title: Roadmap — todo integrations
type: roadmap
---

# todo integrations

**Project:** Asteroids Survivor
**Date:** 2026-09-15
**Meeting:** Technical
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

## Situation

The team locked a three-gate plan to unblock scaffold tomorrow. Gate 1 (repo + CI) and Gate 2 (persistence + beacon) ship today with pass/fail checks; Gate 3 (first-run UX criteria) gets written today for tomorrow's verification. Security verification checklists are baked into each gate. An event-bus contract between persistence and beacon is TEM's responsibility with the telemetry schema frozen in repo.

## Decisions

- **Three gates with pass/fail checks** — Product Manager locked the plan; Technical Engineering Manager and Lead Engineer confirmed ownership and timeline.
- **Gate 1: Repo + CI** — Lead Engineer ships today on the cheap pipeline (`npm ci && npm run build && npx gh-pages -d dist`); no lint/typecheck/test gates (Day-2 follow-up per DevOps Engineer).
- **Gate 2: Persistence + Beacon** — Technical Engineering Manager ships today; includes Security Engineer's local-only/aggregated telemetry checks.
- **Gate 3: First-run UX criteria** — UX/UI Designer publishes today: wave 1 completion without tutorial, controls discovered in ≤5s, upgrade choice understood on first pick.
- **Security verification checklist added to each gate** — Security Engineer mandated verification that telemetry beacon only sends aggregated non-identifiable data and persistence stays local until opt-in.
- **Event-bus contract between persistence and beacon** — Architect required minimal contract; Lead Engineer freezes telemetry schema in repo, TEM defines the handshake with security checklist baked in.
- **Scaffold tomorrow if Gate 1 and Gate 2 land today** — All seats aligned; Tech Researcher confirmed plan is executable with no re-planning needed.

## Open questions / disagreements

- **Architect's coupling concern** — The plan "still lacks explicit contracts between the persistence and beacon components, risking hidden coupling." TEM accepted ownership of the event-bus handshake, but the contract itself is not yet written.
- **Security vs. UX on event-bus telemetry events** — Security Engineer initially refuted UX/UI Designer's claim that the event-bus needs four telemetry events due to missing security verification; UX/UI Designer then supported the claim because the persistence-beacon handshake must verify aggregated non-identifiable data. Resolution: security checklist baked into TEM's handshake definition.
- **CI quality gates deferred** — DevOps Engineer explicitly parked lint/typecheck/test gates as Day-2 work; cheap pipeline ships without them. No dissent recorded, but this is a known quality debt item.

## Roadmap

### Now
- **Lead Engineer pushes repo + CI with frozen telemetry schema** — owner: Lead Engineer
  - Risk: Cheap pipeline lacks lint/typecheck/test gates; regressions possible until Day-2 hardening.
- **Technical Engineering Manager pushes persistence + beacon with security checks** — owner: Technical Engineering Manager
  - Risk: Event-bus contract not yet defined; hidden coupling if handshake drifts from schema.
- **UX/UI Designer publishes first-run criteria doc** — owner: UX/UI Designer
  - Risk: Criteria must be testable tomorrow; vague criteria would block Gate 3 verification.

### Next
- **Scaffold playable core loop** — owner: Lead Engineer + Technical Engineering Manager
  - Risk: Only proceeds if both Gate 1 and Gate 2 land today with passing checks.
- **Verify first-run criteria against scaffold** — owner: UX/UI Designer + QA Engineer
  - Risk: No pass/fail bar exists until criteria doc lands; QA Engineer flagged need for pass/fail check on Gate 3.
- **Add lint/typecheck/test gates to CI pipeline** — owner: DevOps Engineer
  - Risk: Day-2 task; current pipeline deploys on every `main` push without quality gates.

### Later
- Nothing parked for later.

## Next actions

- [ ] Lead Engineer: Push repo + CI with telemetry schema frozen in repo
- [ ] Technical Engineering Manager: Push persistence + beacon with security verification checklist
- [ ] Technical Engineering Manager: Define event-bus handshake contract between persistence and beacon (with security checklist)
- [ ] UX/UI Designer: Publish first-run criteria doc (wave 1 no tutorial, controls ≤5s, upgrade understood on first pick)
- [ ] Security Engineer: Verify security checklist passes on both Gate 1 and Gate 2 deliveries
- [ ] QA Engineer: Prepare pass/fail verification for all three gates tomorrow
- [ ] DevOps Engineer: Schedule Day-2 CI hardening (lint/typecheck/test gates) after scaffold

## Links

- [[Project]]
- [[2026-09-15-todo-integrations]]

- Meeting source: `66c0c184`
