---
aliases: []
date: '2026-09-11'
id: dcd07828-minutes
meeting_id: dcd07828
project: Asteroids Survivor
summary: Minutes for Plan the first increment — ordered.
tags:
- minutes
- asteroids-survivor
- meeting
title: Minutes — Plan the first increment — ordered
type: minutes
---

# Minutes — Plan the first increment — ordered

**Date:** 2026-09-11
**Kind:** Full directive
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

## Executive Summary

The room locked a 12-day increment plan for Asteroids Survivor MVP. Step 1 (scaffold deploy) starts tomorrow with current CI (lint + typecheck). Step 2 (UX one-page core loop flow + test group definition + pass/fail criteria) delivers tomorrow 9am. Step 3 (first-playable with named test group) runs Monday 10am. Step 4 gates all hardening (security review, full CI gates, Lighthouse budgets). Telemetry schema freezes today. CSP + npm audit land in Step 1 CI. Security review moves from post-increment to parallel gate before Step 3. Retention targets set at Day-1 ≥ 35%, Day-7 ≥ 12%. Only execution risk flagged: schema freeze landing before scaffold ships tomorrow.

## Discussion Highlights

- **Product Manager** opened with scope lock: core loop + local persistence + deploy only; everything else is a seat todo.
- **Technical Engineering Manager** and **Sales Manager** confirmed Step 1 starts tomorrow; Lead Engineer asked to confirm stack ADR recorded so scaffold doesn't churn.
- **Data Analyst** demanded retention numbers (Day-1 ≥ 35%, Day-7 ≥ 12%) and schema freeze today before Step 1; called shipping without them "hope."
- **QA Engineer** required lint + typecheck + unit test in CI before Step 1, schema freeze today; flagged security review as seat todo for post-increment.
- **Lead Engineer** countered: Step 1 tomorrow with current CI (lint + typecheck only); telemetry schema freeze today; UX delivers flow + test group + pass/fail tomorrow; security review and full CI gates run parallel, gate Step 4.
- **Security Engineer** mandated CSP + npm audit in Step 1 CI; threat-model IndexedDB→beacon before Step 3; schema freeze today; security review of beacon payload is a blocker, not follow-up.
- **UX/UI Designer** argued core loop undefined in UX terms — first-run experience, persistence, return visit; cited [[def-delivery-rule-sees-first-learn]] and [[def-architecture-rule-product-like-metaphor]]; pushed for a step producing first-playable for test group, not just a todo.
- **Sales Manager** backed UX: increment commercially honest — ships only thing that proves retention on zero-cost infra; schema freeze/CI gates/security harden but don't make it retain; asked UX for named test group details.
- **UX/UI Designer** defined test group: three weekly browser arcade players (one streamer, one speedrunner, one casual), recruited by Friday, session Monday 10am; pass/fail = survive 90s on first life AND hit "continue" after death without asking what to do; flow doc tomorrow 9am with criteria baked in.
- **Product Manager** closed: plan locked — Step 1 scaffold tomorrow, UX flow + test group criteria tomorrow 9am, schema freeze today, CSP+audit in CI, security review gates Step 3, named test group session Monday 10am with clear pass/fail.
- **Technical Engineering Manager** reiterated only risk: schema freeze actually happening today before scaffold ships.
- **Lead Engineer** still awaiting confirmation on stack ADR location.

## Key Decisions Made

- Step 1 (scaffold deploy) starts tomorrow with current CI (lint + typecheck only)
- Telemetry schema freezes today (before Step 1 ships)
- CSP header + `npm audit` added to Step 1 CI job
- Security review moves from post-increment to parallel gate before Step 3
- UX delivers one-page core loop flow + test group definition + pass/fail criteria tomorrow 9am
- Named test group: 3 players (streamer, speedrunner, casual), recruited by Friday, session Monday 10am
- Pass/fail criteria: survive 90 seconds on first life AND hit "continue" after death without asking what to do
- Retention targets set: Day-1 ≥ 35%, Day-7 ≥ 12% (industry baseline)
- Step 4 gates all remaining hardening (full CI gates, Lighthouse budgets, security review completion)
- Plan locked — only execution risk is schema freeze landing before scaffold ships tomorrow

## Action Items & Next Steps

- [ ] Confirm stack ADR is recorded — Lead Engineer
- [ ] Freeze telemetry schema today — (owner implicit from room pressure: Data Analyst / Security Engineer)
- [ ] Add CSP header + `npm audit` to Step 1 CI — Lead Engineer / Technical Engineering Manager
- [ ] Deliver one-page core loop flow + test group

## Open Questions & Risks

- @ux — the named test group: who are they, and when do we sit with them?
- @ux — the named test group: who, when, and what's the pass/fail signal?
- Stack ADR location not named in room — Lead Engineer to confirm path
- Analytics endpoint (Plausible/Umami/Cloudflare Worker) not selected — needed for beacon implementation in Step 1
- Test group recruitment deadline is today (2026-09-11) — if not confirmed, Step 3 slips
- Security review completion before 2026-09-14 10:00 is tight — parallel track must start today
- Whether unit test gate in Step 1 CI is feasible with scaffold-only codebase — QA Engineer to clarify minimum coverage
- Lighthouse CI budgets for Step 4 not yet configured — baseline measurements needed
- Validate core loop with named test group ([[todos]]) — @ux
- Validate stack ADR is recorded ([[todos]]) — @lead
- Validate the loop with the named test group ([[todos]]) — @ux
- Threat-model client beacon ([[todos]]) — @security

---
- Schema freeze today (2026-09-11) — if not done, Step 1 beacon ships blind; Data Analyst and Security Engineer must deliver before scaffold
- Stack ADR not yet recorded — Lead Engineer must confirm before 2026-09-12 morning
- Test group recruitment by 2026-09-11 2026-09-18 — UX/UI Designer owns; no backup plan named
- Security review of beacon payload before Monday 2026-09-21 — Security Engineer must complete in parallel
- Lighthouse CI budgets may fail on first run — budget values are expert recommendations, not yet validated against actual build
- Analytics endpoint (Plausible/Umami/Cloudflare Worker) not selected — beacon sender stub points nowhere until chosen

## Links

- [[Project]]
- [[2026-09-11-plan-first-increment-ordered]]
- [[dcd07828-roadmap]]
