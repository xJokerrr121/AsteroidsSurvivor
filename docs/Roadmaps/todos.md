---
aliases:
- todos
date: '2026-09-11'
format: markdown
id: todos
project: Asteroids Survivor
summary: Named overflow parked from council rooms. Tick here; do not copy into a meeting's
  Next actions.
tags:
- roadmap
- asteroids-survivor
- todo
title: Seat todos
type: roadmap
---

# Seat todos

Checkable overflow from council rooms. Tick here; do not copy into a meeting's Next actions.

## Next actions
- [x] Validate core loop with named test group -- owner: @ux -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: not this increment
- [ ] Validate stack ADR is recorded -- owner: @lead -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: not this increment if unsettled.
- [ ] Validate the loop with the named test group -- owner: @ux -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: not this increment, but the only signal that matters for the next one.
- [ ] Threat-model client beacon -- owner: @security -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: not this increment
- [ ] threat-model the IndexedDB + beacon data flow -- owner: Security Engineer -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: ships in step 1, not this increment
- [ ] define first-playable UX scope (states, flows, copy) -- owner: ux -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: not in current step list, blocks validation with named group
- [ ] Recruit 5 named test players -- owner: Product Manager -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: Step 5 cannot start without them.
- [ ] Define named test group + pass/fail criteria -- owner: @ux -- from: [[2026-09-11-plan-first-increment-ordered]] -- why: step 2 deliverable, not step 3 discovery
- [ ] Scaffold telemetry beacon client -- owner: Technical Engineering Manager -- from: [[2026-09-15-todo-integrations]] -- why: gate 3, client-side schema locked
- [ ] Define done signals for repo+CI and persistence+beacon -- owner: Data Analyst -- from: [[2026-09-15-todo-integrations]] -- why: cannot verify scaffold gate without them.
- [ ] Define acceptance criteria for each gate -- owner: QA Engineer -- from: [[2026-09-15-todo-integrations]] -- why: not this increment until TEM names gate 3 and we agree on signals.
- [ ] Define third gate with owner and acceptance criteria -- owner: TEM -- from: [[2026-09-15-todo-integrations]] -- why: scaffold blocked until all three gates have done signals.
- [ ] Implement Gate 3 playable core loop -- owner: Lead Engineer -- from: [[2026-09-15-todo-integrations]] -- why: not this increment (depends on Gates 1+2 green)
- [ ] Add lint/typecheck/test gates to CI pipeline -- owner: Lead Engineer -- from: [[2026-09-15-todo-integrations]] -- why: not this increment, but required before team scales.
- [ ] Write UX acceptance criteria for gate three -- owner: UX/UI Designer -- from: [[2026-09-15-todo-integrations]] -- why: scaffold tomorrow depends on testable "playable" definition
- [ ] Add lint/typecheck/test gates to CI pipeline after scaffold -- owner: DevOps Engineer -- from: [[2026-09-15-todo-integrations]] -- why: not this increment.
- [ ] define wave-1 acceptance criteria -- owner: TEM -- from: [[2026-09-15-lets-deliver-next-increment]] -- why: needed before scaffold but not this increment's code.
- [ ] verify beacon.ts emits exactly those four event shapes -- owner: TEM -- from: [[2026-09-15-lets-deliver-next-increment]] -- why: retention funnel needs them day one
- [ ] sketch telemetry mapping layer -- owner: Tech Researcher -- from: [[2026-09-15-lets-deliver-next-increment]] -- why: keeps telemetry decoupled from persistence per Architect boundary; not this increment unless TEM asks.
- [ ] Security Engineer async gate review -- owner: Security Engineer -- from: [[2026-09-15-lets-deliver-next-increment]] -- why: not on critical path for tomorrow's ship.
- [ ] Draft a versioned telemetry event schema -- owner: Architect -- from: [[2026-09-15-lets-deliver-next-increment]] -- why: not this increment
- [ ] build level-up picker scene -- owner: Lead Engineer -- from: [[2026-09-16-discuss-new-features]] -- why: not this increment unless operator pulls it forward
- [ ] Evaluate Rex plugin bundle impact -- owner: @tech -- from: [[2026-09-16-discuss-new-features]] -- why: not this increment unless operator pulls it.
- [ ] verify session_id persistence in storage.ts -- owner: Data Analyst -- from: [[2026-09-16-discuss-new-features]] -- why: needed for upgrade-pick → next-session-start metric, not this increment if already present
- [ ] Confirm session_id persistence in storage.ts -- owner: Data Analyst -- from: [[2026-09-16-discuss-new-features]] -- why: needed for upgrade-pick → next-session-start metric
- [ ] check storage.ts for persisted session_id -- owner: me -- from: [[2026-09-16-discuss-new-features]] -- why: unblocks upgrade-pick → next-session-start metric for Day-1 retention probe
- [ ] verify storage.ts persists stable session_id across browser close or specify mint-in-startRun implementation -- owner: Data Analyst -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: without stable session_id the upgrade-pick → next-session-start metric cannot be measured end-to-end
- [ ] write gate 1-3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) -- owner: QA Engineer -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: scaffold ships tomorrow per roadmap; verification must be executable not aspirational
- [ ] Harden CI with lint/typecheck/test gates and Lighthouse budgets -- owner: DevOps Engineer -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: not this increment; probe ships on cheap pipeline first.
- [ ] Validate picker on mobile viewport -- owner: UX/UI Designer -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: depends on Lead Engineer delivering Rex picker scene first.
- [ ] write gate 1-3 pass/fail criteria (session_id persistence, bundle budget, event-bus contract, schema freeze) -- owner: QA Engineer -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: not this increment
- [ ] Define pass/fail criteria for each gate in repo -- owner: QA Engineer -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: gates currently ship on unverifiable claims
- [ ] Codify QA pass/fail criteria (bundle budget, event-bus contract, physics-regression test for pause/resume) into PR checklist -- owner: QA Engineer -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: gates must not ship green on unverifiable claims; this is Day-1 work, not a later increment
- [ ] Verify session_id persistence proof lands in PR today -- owner: Data Analyst -- from: [[2026-09-17-lead-engineer-builds-world]] -- why: blocks beacon mapping and retention funnel
## Links

- [[Project]]
- [[Index]]
- [[2026-09-11-plan-first-increment-ordered-minutes]]
- [[2026-09-15-lets-deliver-next-increment-minutes]]
