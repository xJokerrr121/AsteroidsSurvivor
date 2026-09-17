---
aliases: []
date: '2026-09-17'
id: 0f667ace-minutes
meeting_id: 0f667ace
project: Asteroids Survivor
summary: 'Minutes for Refine: Discuss new features for this increment,.'
tags:
- minutes
- asteroids-survivor
- meeting
title: 'Minutes — Refine: Discuss new features for this increment,'
type: minutes
---

# Minutes — Refine: Discuss new features for this increment

**Date:** 2026-09-17
**Kind:** Refine
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Lead Engineer
- Security Engineer
- UX/UI Designer
- You

## Executive Summary

The room reviewed the proposed increment scope: three upgrade options per level-up and wave difficulty driven by playtime rather than player level. All seats confirmed both items are already locked in the execution plan (MVP Fantasy: Survivors in Vector Clothing, spec step 1 security). No new directives were accepted; the session served to reaffirm existing commitments and surface the remaining implementation unknowns.

## Discussion Highlights

- You proposed: three skill options for player pick; waves independent of player level, difficulty scaling by playtime.
- Product Manager refuted the proposal as a new directive — the plan already covers both points.
- Technical Engineering Manager added claim: wave difficulty by playtime is in the plan.
- Lead Engineer supported: decouples progression from difficulty; amended that it's already locked in plan as MVP Fantasy: Survivors in Vector Clothing.
- Security Engineer refuted the original proposal twice; also raised an abuse-vector question that was refuted by TEM and UX.
- UX/UI Designer pinned: picker UX is locked — three distinct icons, one tap, no scroll, five-second discovery (cites 2026-09-16 minutes).
- Product Manager refuted twice more: user repeats locked plan (wave difficulty by playtime + three-option picker).
- Lead Engineer held claim: wave difficulty by playtime already locked in execution spec step 1 security.
- Technical Engineering Manager supported the hold: already locked in execution spec step 1 security.

## Key Decisions Made

- Wave difficulty scales by playtime, not player level — confirmed locked in execution plan (MVP Fantasy: Survivors in Vector Clothing, spec step 1 security).
- Level-up picker presents exactly three distinct upgrade options — one tap, no scroll, five-second discovery — confirmed locked in plan.

## Action Items & Next Steps

- [ ] Verify `phaser3-rex-plugins` version compatibility with current Phaser version — Lead Engineer
- [ ] Inspect `storage.ts` implementation for migration needs (`session_id`, `currentBuild` keys) — Lead Engineer
- [ ] Define exact `Upgrade` type (fields: id, name, icon, effect?) — Lead Engineer / Security Engineer
- [ ] Decide which 3 of 4 upgrade types (damage, fire rate, max speed, magnet radius) appear per level-up and selection logic (random? weighted?) — Product Manager / Lead Engineer
- [ ] Define XP threshold formula beyond first three values (100, 250, 450…) — Lead Engineer
- [ ] Validate mobile touch target size for in-world icons — UX/UI Designer
- [ ] Describe Deployment to Pages pipeline (CI/CD step) — Technical Engineering Manager

## Open Questions & Risks

- Exact `Upgrade` type definition (fields: id, name, icon, effect?) not fully specified in room — Security sign-off depends on shape
- Which 3 of 4 upgrade types (damage, fire rate, max speed, magnet radius) appear per level-up — not decided (random? weighted?)
- `phaser3-rex-plugins` version compatibility with current Phaser version — not verified
- `storage.ts` current implementation unknown — may need migration for `session_id` and `currentBuild` keys
- Exact XP threshold formula beyond first three (100, 250, 450…) — pattern not defined
- Mobile touch target size for in-world icons — UX validation may require iteration
- Deployment to Pages pipeline not described — may need CI/CD step

## Links

- [[Project]]
- [[2026-09-17-refine-discuss-new-features]]
- [[0f667ace-roadmap]]
