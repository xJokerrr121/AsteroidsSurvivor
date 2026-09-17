---
aliases: []
date: '2026-09-17'
format: markdown
id: 7fd59e2c-roadmap
meeting_id: 7fd59e2c
project: Asteroids Survivor
summary: Strategic implementation roadmap for Discuss new features for this increment,.
tags:
- roadmap
- asteroids-survivor
- planning
title: Roadmap — Discuss new features for this increment,
type: roadmap
---

# Discuss new features for this increment

**Project:** Asteroids Survivor
**Date:** 2026-09-16
**Meeting:** Full directive
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Tech Researcher
- Security Engineer
- You

## Situation

The room convened to scope the next increment: XP and skill progression — the Vampire Survivors half of the **MVP Fantasy: Survivors in Vector Clothing** concept. The Product Manager framed the question around a single retention metric (Day-1 ≥35%) and proposed the smallest shippable slice: XP drops from shattered asteroids, a level-up picker (1 of 3 upgrades), and run-only persistence via a `currentBuild` key in IndexedDB. Two hard blockers emerged: Security sign-off on the new IndexedDB key, and confirmation that `storage.ts` persists a stable `session_id` across browser close for the retention probe.

## Decisions

- **XP source**: drops on `shatter()` hook (large asteroid breaks → two small spawn → 10–25 XP). Pushed by Lead Engineer; no dissent.
- **Level-up thresholds**: fixed (100, 250, 450…). Lead Engineer; no dissent.
- **Picker behavior**: pauses physics (`scene.pause('game')` / `scene.resume('game')`), shows three choices (damage, fire rate, max speed, magnet radius), resumes on pick. Lead Engineer; UX/UI Designer confirmed in-world presentation.
- **Persistence**: `currentBuild: Upgrade[]` key in IndexedDB, wiped on `startRun()`. No meta-progression this increment. Product Manager and Technical Engineering Manager aligned; Security Engineer required to sign off schema shape.
- **Picker implementation**: adopt `phaser3-rex-plugins` for in-world picker that satisfies UX requirements and stays inside bundle budget. Tech Researcher recommended; Technical Engineering Manager accepted.
- **Telemetry metric for this increment**: **upgrade-pick → next-session-start rate** ≥35%. Data Analyst proposed; room accepted as the single success signal.
- **Upgrade event payload**: carries world coordinates (ship-relative) because picker is in-world. UX/UI Designer dictated; Lead Engineer and Data Analyst accepted.
- **Session ID**: must survive browser close. If `storage.ts` doesn't already persist one, mint a UUID in `startRun()` and write once. Data Analyst raised; Lead Engineer and Security Engineer agreed.

## Open questions / disagreements

- **Security Engineer was initially absent** — Product Manager flagged them as missing; Data Analyst argued the room was sufficient to start. Security Engineer joined mid-meeting and confirmed they would approve `currentBuild` after local-only verification, and that `session_id` can be a local UUID. No further objection recorded.
- **In-world vs. overlay picker** — UX/UI Designer insisted on in-world ("space you inhabit") with vignette + enlarge-on-hover for mobile legibility; overlay was acknowledged as safer but rejected. Technical Engineering Manager asked UX to decide so the `upgrade` event schema stays stable. Decision landed on in-world.
- **Meta-progression** — explicitly parked. Product Manager and Technical Engineering Manager both stated it stays out of this increment. No one argued to include it.

## Roadmap

### Now
- Security Engineer signs off `currentBuild: Upgrade[]` schema (local-only, no new identifiers in telemetry) — owner: Security Engineer
  - Risk: if schema requires migration later, run-only persistence becomes a migration surface
- Data Analyst confirms `storage.ts` persists stable `session_id` across browser close, or team mints one in `startRun()` — owner: Data Analyst
  - Risk: without stable `session_id`, the upgrade-pick → next-session-start metric cannot be measured end-to-end
- Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, renders world coords) — owner: Lead Engineer
  - Risk: Rex plugin bundle impact must stay inside Step 4 budget; Tech Researcher claims it does, but unmeasured
- Technical Engineering Manager wires picker into game flow (XP thresholds, `shatter()` hook, `DEATH_EVENT` piggyback) — owner: Technical Engineering Manager
- UX/UI Designer validates ≤5 s control discovery on mobile (three icons, one-tap, no scroll/tooltip hunt) — owner: UX/UI Designer
- Data Analyst verifies `upgrade` event carries world coords + `session_id` in beacon — owner: Data Analyst
- Ship to Pages for Day-1 retention probe — owner: Technical Engineering Manager

### Next
- Nothing explicitly scoped for next increment. Meta-progression (persistent upgrades, currency, "continue" button) was discussed only as a comparison for retention impact and explicitly deferred.

### Later
- Nothing parked for later.

## Next actions

- [ ] Security Engineer: sign off `currentBuild: Upgrade[]` schema (local-only, no new telemetry identifiers)
- [ ] Data Analyst: confirm `session_id` persistence in `storage.ts` or specify mint-in-`startRun()` implementation
- [ ] Lead Engineer: scaffold picker `Scene` with `phaser3-rex-plugins`, `scene.pause('game')` / `scene.resume('game')`, world-coordinate layout
- [ ] Technical Engineering Manager: wire XP drops into `shatter()`, level-up thresholds, `currentBuild` write/read, `DEATH_EVENT` XP piggyback
- [ ] UX/UI Designer: review picker on mobile for ≤5 s discovery, vignette/enlarge-on-hover behavior
- [ ] Data Analyst: add `upgrade` event verification to beacon test (world coords, `session_id`, options shown, time-to-pick)
- [ ] Technical Engineering Manager: trigger Pages deploy for retention probe once all above clear

## Links

- [[Asteroids Survivor]]
- [[2026-09-16-discuss-new-features]]

- Meeting source: `7fd59e2c`
