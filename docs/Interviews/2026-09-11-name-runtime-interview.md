---
aliases: []
attendees:
- Product Manager
- Sales Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
date: '2026-09-11'
meeting_id: b67ab027
project: Asteroids Survivor
summary: Operator interview session on Name the runtime.
tags:
- interview
- asteroids-survivor
- grill
- operator-qa
title: Interview — Name the runtime
type: interview
---

# Interview — Name the runtime

**Date:** 2026-09-11  
**Kind:** Interview (Grill)  
**Project:** [[Project]]  
**Session:** `b67ab027`  

## Interviewers

- Product Manager
- Sales Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer

## Transcript & Deliberation

[You] Name the language, runtime, and how this is hosted. What is already locked, and what is still a guess?

[Product Manager] Here. This room is enough. We can start.

[Product Manager] No gaps flagged. Confirm when the room is complete.

[Product Manager] Node 20 + browser (Phaser 3) on GitHub Pages — locked.

[Sales Manager] Node 20 + Phaser 3 on GitHub Pages. Guess: CI pipeline and backend scope.

[Technical Engineering Manager] Node 20 + Phaser 3 in the browser on GitHub Pages. CI pipeline and backend scope are the two open items.

[Data Analyst] TypeScript on Node 20 for build, Phaser 3 running in the browser, hosted on GitHub Pages. Still open: CI pipeline definition and whether we need any backend at all.

[Product Manager] Asked Q1 — CI pipeline definition. Asked Q2 — Backend scope & contract.

[Sales Manager] Asked Q3 — market-fit for Name the runtime.

[Technical Engineering Manager] Asked Q4 — technical-strategy for Name the runtime.

[Data Analyst] Asked Q5 — Client-side telemetry schema & transport. Asked Q6 — Performance budget & Core Web Vitals guardrails in CI.

[QA Engineer] Asked Q7 — test-strategy for Name the runtime.

[You] Cheap budget: Single job: `npm ci && npm run build && npx gh-pages -d dist`; no lint/typecheck/test gates, deploy on every `main` push.

[You] Expert recommendation: Zero backend for MVP — all state local (IndexedDB), analytics via client-side beacon to Plausible/Umami; leaderboard deferred to post-MVP.

[You] Expert recommendation: Expose one documented endpoint plus a CSV export for Name the runtime; that covers the integrations customers ask for first.

[You] Expert recommendation: Sequence Name the runtime by risk: build the piece that can invalidate the design first, keep the rest behind flags.

[You] Expert recommendation: Define a tiny JSON event schema (session_id, event_name, timestamp, properties) sent via `navigator.sendBeacon()` to a managed analytics endpoint (e.g., Plausible, Umami, or a Cloudflare Worker) — zero backend code, works on static hosting.

[You] Expert recommendation: Add a GitHub Actions step running Lighthouse CI (headless Chrome) with budgets: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped; fail PR on any regression.

[You] Expert recommendation: Cover the risky seams of Name the runtime with integration tests; unit-test only the logic that really branches.

[Product Manager] Technical interview on Name the runtime is complete. Decisions are in the settled tree. Confirm shared technical understanding before anyone implements.

[Sales Manager] Locked. TypeScript on Node 20 for build, Phaser 3 in the browser, hosted on GitHub Pages. The two former guesses — CI pipeline and backend scope — now have expert recommendations in the settled tree. No open runtime questions remain.

[Technical Engineering Manager] **Locked — no guesses remain.**

- **Language/build runtime:** TypeScript on Node 20
- **Browser runtime:** Phaser 3 (ES modules)
- **Hosting:** GitHub Pages (static)

The two former open items now have expert recommendations in the settled tree:
- CI pipeline → Lighthouse CI budgets + lint/typecheck/test gates in GitHub Actions
- Backend scope → zero backend for MVP; IndexedDB local state, client-side beacon analytics, leaderboard deferred

Interview complete.

[Data Analyst] **Locked — no guesses remain.**

- **Language/build runtime:** TypeScript on Node 20
- **Browser runtime:** Phaser 3 (ES modules)
- **Hosting:** GitHub Pages (static)

The two former open items now have expert recommendations in the settled tree:
- CI pipeline → Lighthouse CI budgets + lint/typecheck/test gates in GitHub Actions
- Backend scope → zero backend for MVP; IndexedDB local state, client-side beacon analytics, leaderboard deferred

Interview complete.

[QA Engineer] **Confirmed — shared technical understanding is locked.**

**Settled (no guesses remain):**
- **Language/build runtime:** TypeScript on Node 20
- **Browser runtime:** Phaser 3 (ES modules)
- **Hosting:** GitHub Pages (static)
- **CI pipeline:** GitHub Actions with Lighthouse CI budgets (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms, JS ≤ 170kB gzipped) + lint/typecheck/test gates
- **Backend scope:** Zero backend for MVP — IndexedDB local state, client-side `navigator.sendBeacon()` analytics to managed endpoint (Plausible/Umami/CF Worker), leaderboard deferred
- **Telemetry schema:** `{ session_id, event_name, timestamp, properties }` JSON via beacon
- **Test strategy:** Integration tests on risky seams; unit tests only on branching logic

**Open risks:** None on this frontier. All seats confirmed locked.

Ready for implementation.

Council LOG (hard review, not spoken):
- QA Engineer: Here. This room is enough. We can start.
- Product Manager: Stack is locked; only deployment plumbing and optional backend remain open.
- Sales Manager: Stack is clear; only deployment automation and optional backend are unresolved.
- Technical Engineering Manager: Stack is solid; only deployment automation and optional backend remain open.
- Data Analyst: TypeScript on Node 20 for build, Phaser 3 running in the browser, hosted on GitHub Pages. Still open: CI pipeline definition and whether we need any backend at all.
- QA Engineer: Runtime is settled; only CI pipeline and backend scope remain open.
- Product Manager: proposed 2 frontier question(s)
- Sales Manager: proposed 1 frontier question(s)
- Technical Engineering Manager: proposed 1 frontier question(s)
- Data Analyst: proposed 2 frontier question(s)
- QA Engineer: proposed 1 frontier question(s) (fallback)
- Product Manager: review addendum (fallback)
- Sales Manager: review addendum
- Technical Engineering Manager: review addendum
- Data Analyst: review addendum
- QA Engineer: review addendum

---

## Links

- [[Project]]
- [[Index]]
