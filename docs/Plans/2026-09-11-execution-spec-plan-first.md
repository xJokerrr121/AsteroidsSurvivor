---
aliases: []
date: '2026-09-11'
meeting_id: dcd07828
project: Asteroids Survivor
status: planned
summary: Execution Spec — Plan the first increment — ordered
tags:
- plan
- asteroids-survivor
- work-plan
- workflow
title: Plan — Execution Spec — Plan the first increment — ordered
type: plan
---

# Plan — Execution Spec — Plan the first increment — ordered

**Date:** 2026-09-11  
**Kind:** Full directive  
**Status:** Planned  
**Audience:** coding agent — execute this spec, do not re-litigate  
**Project:** [[Project]]  
**Meeting:** `dcd07828`  

## Attendees & Ownership

- Product Manager
- Sales Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Lead Engineer
- Security Engineer
- UX/UI Designer

## Goal
Ship a 12-day MVP increment for Asteroids Survivor: scaffold deploy (Step 1), UX core-loop flow + test-group definition (Step 2), first-playable session with named test group (Step 3), and hardening gate (Step 4). Scope is strictly core loop + local persistence (IndexedDB) + deploy to GitHub Pages; everything else is a seat todo.

## Locked decisions
- Scope locked to core loop + local persistence + deploy; everything else is a seat todo — **Product Manager**
- Step 1 (scaffold deploy) starts **2026-09-12** with current CI (lint + typecheck only) — **Technical Engineering Manager**, **Sales Manager**
- Telemetry schema freezes **today (2026-09-11)** before Step 1 ships — **Data Analyst**, **QA Engineer**, **Security Engineer**, **Lead Engineer**
- CSP header + `npm audit` added to Step 1 CI job — **Security Engineer**
- Security review of beacon payload is a blocker; moves from post-increment to parallel gate before Step 3 — **Security Engineer**
- UX delivers one-page core loop flow + test group definition + pass/fail criteria **2026-09-12 09:00** — **UX/UI Designer**, **Product Manager**
- Named test group: 3 weekly browser-arcade players (1 streamer, 1 speedrunner, 1 casual), recruited by **2026-09-18**, session **2026-09-21 10:00** — **UX/UI Designer**
- Pass/fail criteria: survive 90s on first life AND hit "continue" after death without asking what to do — **UX/UI Designer**
- Retention targets: Day-1 ≥ 35%, Day-7 ≥ 12% (industry baseline) — **Data Analyst**
- Step 4 gates all remaining hardening (full CI gates, Lighthouse budgets, security review completion) — **Lead Engineer**, **Product Manager**
- Lead Engineer to confirm stack ADR is recorded so scaffold doesn't churn — **Technical Engineering Manager**, **Lead Engineer**
- Threat-model IndexedDB→beacon before Step 3 — **Security Engineer**

## Constraints
- Must: Freeze telemetry schema **today (2026-09-11)** before Step 1 ships
- Must: Add CSP header + `npm audit` to CI job in Step 1
- Must: Security review of beacon payload completes before Step 3 (gate, not follow-up)
- Must: UX flow doc + test group + pass/fail delivered **2026-09-12 09:00**
- Must: Test group recruited by **2026-09-18**, session **2026-09-21 10:00**
- Must: Retention targets (Day-1 ≥ 35%, Day-7 ≥ 12%) defined before Step 1
- Must-not: Add lint/typecheck/unit-test gates to CI in Step 1 (current CI only: lint + typecheck)
- Must-not: Build any backend, leaderboard, or multiplayer — zero backend for MVP
- Out of scope: Full CI gates (unit test, Lighthouse), complete security hardening, analytics dashboard, onboarding polish — all gate Step 4
- Lead Engineer must confirm stack ADR location before Step 1 starts

## Surfaces
- **CI pipeline** (GitHub Actions): single job `npm ci && npm run build && npx gh-pages -d dist`; Step 1 adds CSP header + `npm audit`; Step 4 adds lint + typecheck + unit test + Lighthouse CI budgets (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms, total JS ≤ 170kB gzipped)
- **Telemetry schema**: JSON events `{ session_id, event_name, timestamp, properties }` sent via `navigator.sendBeacon()` to managed endpoint (Plausible/Umami/Cloudflare Worker) — schema frozen **2026-09-11**
- **Local persistence**: IndexedDB for game state (high score, progress, settings)
- **Deploy target**: GitHub Pages (`gh-pages` branch via `npx gh-pages -d dist`)
- **Stack ADR**: location TBD — Lead Engineer to confirm
- **UX flow doc**: one-page core loop flow + test group definition + pass/fail criteria (delivered 2026-09-12 09:00)
- **Security review**: threat-model IndexedDB→beacon; beacon payload review blocks Step 3

## Execution graph
```mermaid
flowchart TD
    A[Step 1: Scaffold deploy + CI hardening + schema freeze] --> B[Step 2: UX core-loop flow + test group + pass/fail]
    B --> C[Step 3: First-playable build + test group session]
    C --> D[Step 4: Hardening gate - full CI, Lighthouse, security review]
    A -.->|parallel| E[Security: threat-model IndexedDB→beacon]
    E --> C
    A -.->|parallel| F[Security: beacon payload review]
    F --> C
```

## Steps
1. `ci/pipeline` — Add CSP header (`Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.plausible.io https://*.umami.is`) and `npm audit --audit-level=high` to existing GitHub Actions job; keep job as `npm ci && npm run lint && npm run typecheck && npm run build && npx gh-pages -d dist` — Acceptance: CI passes on `main` push with CSP header present in deployed `index.html` response and `npm audit` exits 0
2. `telemetry/schema` — Freeze JSON event schema today: `{ "session_id": "string", "event_name": "string", "timestamp": "ISO8601", "properties": "object" }`; document in `docs/telemetry-schema.json`; add `navigator.sendBeacon()` client in `src/telemetry/beacon.ts` with endpoint configurable via `VITE_TELEMETRY_ENDPOINT` — Acceptance: schema file committed, beacon client compiles, no schema changes after 2026-09-11
3. `stack/adr` — Lead Engineer confirms stack ADR location and records decision (Vite + TypeScript + Phaser 3 + IndexedDB + GitHub Pages) — Acceptance: ADR file linked in `docs/adr/001-stack-choice.md` with status "Accepted"
4. `ux/core-loop-flow` — UX/UI Designer delivers one-page core loop flow doc (`docs/ux/core-loop-flow.md`) by 2026-09-12 09:00 covering: first-run experience, what persists (IndexedDB keys), return-visit flow, and embedded test group definition (3 players: streamer, speedrunner, casual; recruited by 2026-09-18; session 2026-09-21 10:00) + pass/fail criteria (survive 90s first life + hit "continue" after death without asking) — Acceptance: doc exists at path, contains all 4 sections, pass/fail criteria match verbatim
5. `game/scaffold` — Implement minimal playable scaffold: Phaser 3 scene with ship movement, asteroid spawning, collision → death, "continue" button, IndexedDB persistence (high score, last run timestamp), telemetry beacon on `session_start`, `death`, `continue_click` — Acceptance: `npm run build` succeeds, `dist/` deploys to Pages, local play shows ship + asteroids + death + continue, IndexedDB writes on death, beacon fires on 3 events
6. `security/threat-model` — Security Engineer completes threat-model of IndexedDB→beacon data flow (document in `docs/security/threat-model-indexeddb-beacon.md`) — Acceptance: doc identifies data classification, trust boundaries, mitigation for PII leakage, signed by Security Engineer
7. `security/beacon-review` — Security Engineer reviews beacon payload schema + transport; approves or requests changes — Acceptance: written approval in `docs/security/beacon-review.md` or blocking issues listed; must complete before Step 3 session
8. `test-group/recruit` — UX/UI Designer + Product Manager recruit 3 named testers (streamer, speedrunner, casual) by 2026-09-18; record handles + contact in `docs/ux/test-group.md` — Acceptance: 3 testers confirmed, available 2026-09-21 10:00
9. `test-group/session` — Conduct observed session 2026-09-21 10:00: each tester plays first-playable build; facilitator records pass/fail per criteria (survive 90s first life + hit "continue" without asking) — Acceptance: session notes in `docs/ux/session-2026-09-21.md` with pass/fail per tester; ≥2/3 pass to proceed
10. `ci/hardening` — Add full CI gates: `npm run test:unit`, Lighthouse CI step with budgets (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms, total JS ≤ 170kB gzipped); fail PR on regression — Acceptance: PR with failing budget is blocked; green PR deploys with budgets met
11. `security/hardening` — Complete remaining security hardening: CSP report-only → enforce, dependency audit baseline, beacon endpoint allowlist — Acceptance: CSP enforced in production, `npm audit` clean, beacon endpoint locked to allowlist

## Verification
- Step 1 CI passes with CSP + audit on 2026-09-12
- Telemetry schema frozen and documented by 2026-09-11 EOD
- UX flow doc delivered 2026-09-12 09:00 with test group + pass/fail
- Stack ADR recorded before 2026-09-12
- First-playable builds and deploys by 2026-09-19 (pre-session)
- Security threat-model + beacon review complete before 2026-09-21
- Test group session runs 2026-09-21 10:00 with ≥2/3 pass
- Step 4 hardening gates merge to `main` after session

## Open risks
- Schema freeze not completed today (2026-09-11) before Step 1 ships tomorrow — **execution blocker**
- Stack ADR location unconfirmed — Lead Engineer must confirm before 2026-09-12
- Security beacon review may require schema changes after freeze — conflicts with "schema frozen today"
- Test group recruitment by 2026-09-18 — no backup plan if streamer/speedrunner/casual unavailable
- 12-day timeline assumes no churn in Step 1 scaffold; any scope creep breaks Step 3 date
- Lighthouse budgets (Step 4) not yet validated against Phaser 3 bundle size — may exceed 170kB JS budget

---

## Links

- [[Project]]
- Source meeting: `dcd07828`
- [[Index]]
- [[001-stack-choice]]
- [[core-loop-flow]]
