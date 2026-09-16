---
aliases: []
date: '2026-09-15'
format: markdown
id: 9e074528-roadmap
meeting_id: 9e074528
project: Asteroids Survivor
summary: Strategic implementation roadmap for lets deliver the next increment.
tags:
- roadmap
- asteroids-survivor
- planning
title: Roadmap — lets deliver the next increment
type: roadmap
---

# lets deliver the next increment

**Project:** Asteroids Survivor
**Date:** 2026-09-15
**Meeting:** Full directive
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Architect
- Tech Researcher
- You

## Situation

The room aligned on tomorrow's increment: three parallel workstreams (CI, beacon event mapping, wave-1 core loop) targeting a playable retention probe on GitHub Pages by end of day. The upgrade_chosen hook mechanism and four telemetry events are settled. Security Engineer review runs async and blocks merge only. The room explicitly refused to discuss any next increment until this one ships and retention data (≥35% Day-1, ≥12% Day-7) is reviewed — a position stated four times.

## Decisions

- **Three workstreams for tomorrow** — Lead Engineer owns CI (single job: `npm ci && npm run build && npx gh-pages -d dist`); TEM owns beacon mapping and wave-1 core loop in parallel, mapping first because core loop needs the upgrade_chosen hook wired before UX can validate the choice screen. (Product Manager, Technical Engineering Manager)
- **upgrade_chosen hook mechanism settled** — typed event emitter (`mitt` or minimal custom `EventTarget`) exported from `upgradeHook.ts`; core loop emits `upgrade_chosen` with upgradeId, UX validator subscribes. (You, Technical Engineering Manager, Data Analyst)
- **Four telemetry events locked** — session_start, wave_cleared, upgrade_chosen, session_end (with duration). Beacon schema matches; persistence layer has generic store-change hook; mapping layer is new wiring this increment. (Data Analyst, Tech Researcher, Architect)
- **Retention targets as success criteria** — ≥35% Day-1, ≥12% Day-7. (Data Analyst)
- **Security Engineer review async** — blocks merge only, does not block start. (Product Manager, Technical Engineering Manager)
- **Workbox offline queue is stretch** — ship without it if day ends tight. (Technical Engineering Manager)
- **No next-increment planning** — room consensus (Data Analyst, Lead Engineer, UX/UI Designer, Architect, Tech Researcher) to land current increment, measure, then decide.

## Open questions / disagreements

- **Security Engineer absent** — review is async but no one in room represents security posture. Merge gate depends on a person not present.
- **Third gate initially unnamed** — Product Manager asked "what's the third gate?" and TEM defined it as wave-1 core loop. No pushback recorded, but the gate wasn't pre-agreed.
- **UX validation criteria not yet testable** — 5-second control discovery, upgrade choice clarity (single choice, text+icon, single tap, no hover-only), wave-clear feedback that doesn't feel like a pause screen. All depend on core loop landing tomorrow.
- **Architect's boundary concern** — persistence layer must stay pure (store state + generic hook only); telemetry module maps to beacon events. This is a constraint on TEM's implementation, not a disagreement, but it couples the mapping work to a specific architecture.

## Roadmap

### Now
- **CI pipeline to GitHub Pages** — owner: Lead Engineer
  - Risk: Single job with no lint/typecheck/test gates; any build break blocks deploy
- **Beacon event mapping layer** — owner: Technical Engineering Manager
  - Risk: Must wire upgrade_chosen hook before UX can validate; mapping sits between generic persistence hook and four-event schema
- **Wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear)** — owner: Technical Engineering Manager
  - Risk: UX validation criteria (5s discovery, choice clarity, wave-clear juice) can only be tested once this lands; retention probe fails if choice screen confuses players
- **Security Engineer async review** — owner: Product Manager (to coordinate)
  - Risk: Blocks merge; no timeline committed

### Next
- Nothing until current increment ships and retention data (≥35% Day-1, ≥12% Day-7) is reviewed. Room consensus recorded four times.

### Later
- Nothing parked for later. Workbox offline queue mentioned as stretch but not parked.

## Next actions

- [ ] Lead Engineer: Land CI pipeline (single job, deploy on main push)
- [ ] Technical Engineering Manager: Implement beacon mapping layer (four events, upgrade_chosen hook wiring)
- [ ] Technical Engineering Manager: Ship wave-1 core loop with upgrade choice screen and wave-clear feedback
- [ ] UX/UI Designer: Validate Gate 3 criteria (5s control discovery, choice clarity, wave-clear momentum) once core loop lands
- [ ] Data Analyst: Verify four telemetry events fire correctly in beacon payload
- [ ] Product Manager: Coordinate Security Engineer async review before merge
- [ ] All: Retention probe live on Pages by EOD tomorrow; measure Day-1/Day-7 before any next-increment discussion

## Links

- [[Asteroids Survivor]]
- [[2026-09-15-lets-deliver-next-increment]]

- Meeting source: `9e074528`
