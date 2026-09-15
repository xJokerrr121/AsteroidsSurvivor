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

The team locked a three-gate plan to unblock tomorrow's scaffold: Lead Engineer ships repo+CI today, Technical Engineering Manager ships persistence+beacon today, UX/UI Designer writes first-run criteria today for tomorrow's verification. All gates require pass/fail checks; Security adds local-only/aggregated telemetry verification to each; Architect requires a minimal event-bus contract between persistence and beacon with frozen telemetry schema in repo.

## Decisions

- Three gates with explicit pass/fail checks (Product Manager, Technical Engineering Manager, Lead Engineer, Architect)
- Gate 1 — Lead Engineer owns repo+CI on the cheap pipeline (`npm ci && npm run build && npx gh-pages -d dist`), telemetry schema frozen in repo (Lead Engineer)
- Gate 2 — Technical Engineering Manager owns persistence (IndexedDB, local-only) + beacon (client-side `navigator.sendBeacon` to Plausible/Umami) with Security's aggregated/non-identifiable checks baked in (Technical Engineering Manager, Security Engineer)
- Gate 3 — UX/UI Designer owns first-run criteria doc today: wave 1 without tutorial, controls discovered ≤5s, upgrade choice understood on first pick (UX/UI Designer)
- Scaffold tomorrow iff Gate 1 and Gate 2 both land today (Product Manager, Technical Engineering Manager, Lead Engineer, DevOps Engineer)
- Security verification checklist added to each gate's done criteria (Security Engineer)
- Minimal event-bus contract between persistence and beacon; TEM defines the handshake, Lead Engineer exposes the schema (Architect, Lead Engineer)
- DevOps follow-up: add lint/typecheck/test gates to CI after scaffold (Day-2, not a blocker) (DevOps Engineer)

## Open questions / disagreements

- Architect: plan still lacks explicit contracts between persistence and beacon components, risking hidden coupling.
- Security Engineer: security verification was missing; without it we risk shipping identifiable data. Refuted UX's claim that event-bus needs four telemetry events until security checklist is added.
- UX/UI Designer: UX criteria is the only gate-three artifact not yet written; without it tomorrow's scaffold verification has no pass/fail bar. Supported Security's requirement that event-bus contract must verify aggregated/non-identifiable data.
- Security Engineer ↔ UX/UI Designer resolved: event-bus handshake requires security checklist (persistence-beacon handshake must verify aggregated, non-identifiable data).

## Roadmap

### Now
- Lead Engineer pushes repo+CI with telemetry schema frozen in repo — owner: Lead Engineer
  - Risk: cheap pipeline ships without lint/typecheck/test gates
- Technical Engineering Manager pushes persistence+beacon with security checks — owner: Technical Engineering Manager
  - Risk: event-bus contract handshake not yet defined; hidden coupling risk per Architect
- UX/UI Designer publishes first-run criteria doc — owner: UX/UI Designer
  - Risk: only gate-three artifact not yet written; scaffold verification has no bar without it
- Technical Engineering Manager defines event-bus contract/handshake with security checklist — owner: Technical Engineering Manager
  - Risk: Security and UX both flagged this as required before gate passes

### Next
- Scaffold tomorrow if Gate 1 and Gate 2 land today — owner: Lead Engineer + Technical Engineering Manager
- Add lint/typecheck/test gates to CI pipeline — owner: DevOps Engineer
  - Risk: Day-2 task, not a blocker for scaffold

### Later
- Nothing parked for later.

## Next actions

- [ ] Lead Engineer: push repo+CI with telemetry schema frozen in repo
- [ ] Technical Engineering Manager: push persistence+beacon with security checks (local-only IndexedDB, aggregated beacon)
- [ ] UX/UI Designer: publish first-run criteria doc (wave 1, ≤5s control discovery, upgrade choice understood)
- [ ] Technical Engineering Manager: define event-bus contract/handshake between persistence and beacon with security checklist
- [ ] Security Engineer: add security verification checklist to each gate's done criteria
- [ ] DevOps Engineer: prepare lint/typecheck/test gate additions for Day-2 CI enhancement

## Links

- [[Project]]
- [[2026-09-15-todo-integrations]]

- Meeting source: `66c0c184`
