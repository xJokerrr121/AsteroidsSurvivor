---
aliases: []
date: '2026-09-11'
format: markdown
id: dcd07828-roadmap
meeting_id: dcd07828
project: Asteroids Survivor
summary: Strategic implementation roadmap for Plan the first increment — ordered.
tags:
- roadmap
- asteroids-survivor
- planning
title: Roadmap — Plan the first increment — ordered
type: roadmap
---

# Plan the first increment — ordered

**Project:** Asteroids Survivor
**Date:** 2026-09-11
**Meeting:** Full directive
**Attendees:**
- Product Manager
- Sales Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Lead Engineer
- Security Engineer
- UX/UI Designer
- You

## Situation

The room planned the first 12-day increment for Asteroids Survivor, locking scope to the core loop + local persistence + deploy to GitHub Pages. The sequence is: Step 1 ships a minimal scaffold tomorrow; Step 2 delivers a one-page UX flow with a named test group and pass/fail criteria; Step 3 puts a first-playable build in front of that test group on Monday; Step 4 gates everything else (full CI hardening, security review, retention measurement). The only execution risk called out: telemetry schema freeze must land before the scaffold ships tomorrow.

## Decisions

- **Plan locked and sequenced** — PM, TEM, Sales, LE, SE, UX all confirmed. Step 1 scaffold tomorrow; UX flow + test group criteria tomorrow 9am; schema freeze today; CSP + `npm audit` in Step 1 CI; security review gates Step 3; named test group session Monday 10am with clear pass/fail.
- **Step 1 = scaffold only** — LE: "thinnest deployable proof that the loop compiles and deploys." Current CI (lint + typecheck) ships with scaffold; full gates wait for Step 4.
- **Telemetry schema freezes today** — DA, QA, LE, SE all required it before Step 1 ships. Beacon payload must answer retention questions from day one.
- **Retention targets set** — DA: Day-1 ≥ 35%, Day-7 ≥ 12% (industry baseline for survivor loop). These are the pass/fail numbers for the increment.
- **Test group defined** — UX: three people who play browser arcade games weekly (one streamer, one speedrunner, one casual). Recruited by Friday, session Monday 10am. Pass/fail: survive 90 seconds on first life AND hit "continue" after death without asking what to do.
- **Security review moves to parallel gate before Step 3** — SE: CSP + `npm audit` in Step 1 CI; threat-model IndexedDB→beacon before Step 3. Acceptable if minimal hardening lands in Step 1.
- **Stack ADR must be recorded** — TEM and LE both flagged: Lead Engineer to confirm ADR is recorded so scaffold doesn't stall re-deciding.

## Open questions / disagreements

- **DA vs. PM/LE on Step 1 measurability** — DA: "Step 1 ships tomorrow with no retention target and no frozen schema. That's not measurable — that's hope." PM/LE: schema freeze today makes it measurable; retention targets apply to Step 3 test session.
- **QA vs. LE on CI gates** — QA wanted lint + typecheck + unit test in CI before Step 1. LE: current CI (lint + typecheck) is enough for scaffold; unit tests come later.
- **SE vs. PM on security timing** — SE wanted security review as blocker before Step 3, not post-increment. PM accepted: security review gates Step 3.
- **UX vs. room on "core loop defined"** — UX: "The core loop isn't defined in UX terms yet — what the player actually *does* on their first run." This is why UX owns the flow doc as Step 2, not a todo.
- **Schema freeze execution risk** — TEM, PM both flagged: only execution risk is schema freeze actually happening today before scaffold ships tomorrow.

## Roadmap

### Now
- **Freeze telemetry schema (session_id, event_name, timestamp, properties)** — owner: Data Analyst
  - Risk: Must land before scaffold ships tomorrow; beacon in Step 1 depends on it
- **Record stack ADR** — owner: Lead Engineer
  - Risk: Scaffold stalls tomorrow if ADR not recorded
- **Ship scaffold (Step 1)** — owner: Lead Engineer
  - Risk: None if ADR recorded and schema frozen; current CI (lint + typecheck) only
- **Add CSP header + `npm audit` to CI job** — owner: Security Engineer
  - Risk: Minimal hardening for Step 1; full security review gates Step 3

### Next
- **Deliver one-page core loop flow + test group definition + pass/fail criteria** — owner: UX/UI Designer (due tomorrow 9am)
  - Risk: Without this, Step 2 builds the wrong thing (PM)
- **Recruit named test group (3 players: streamer, speedrunner, casual)** — owner: UX/UI Designer (by Friday)
  - Risk: Session Monday 10am is fixed; no recruits = no validation
- **Run first-playable test session with named group** — owner: UX/UI Designer + Lead Engineer (Monday 10am)
  - Risk: Pass/fail = survive 90s first life + hit "continue" without asking; failure means loop redesign

### Later
- **Full CI hardening (Lighthouse CI budgets, unit test gate, typecheck gate)** — gates Step 4
- **Security review of beacon payload + threat model** — gates Step 4
- **Retention measurement against Day-1 ≥ 35% / Day-7 ≥ 12%** — gates Step 4
- **Leaderboard, backend, analytics dashboard** — explicitly deferred post-MVP per Architecture

## Next actions

- [ ] Freeze telemetry schema today (Data Analyst)
- [ ] Record stack ADR (Lead Engineer)
- [ ] Add CSP header + `npm audit` to CI (Security Engineer)
- [ ] Ship scaffold to GitHub Pages tomorrow (Lead Engineer)
- [ ] Deliver one-page core loop flow + test group + pass/fail criteria by 9am tomorrow (UX/UI Designer)
- [ ] Recruit 3-person test group by Friday (UX/UI Designer)
- [ ] Run test session Monday 10am; record pass/fail (UX/UI Designer + Lead Engineer)

## Links

- [[Project]]
- [[2026-09-11-plan-first-increment-ordered]]

- Meeting source: `dcd07828`
- [[Index]]
- [[2026-09-11-plan-first-increment-ordered-minutes]]
