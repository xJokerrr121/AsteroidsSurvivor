---
aliases: []
date: '2026-09-17'
format: markdown
id: 0f667ace-roadmap
meeting_id: 0f667ace
project: Asteroids Survivor
summary: 'Strategic implementation roadmap for Refine: Discuss new features for this
  increment,.'
tags:
- roadmap
- asteroids-survivor
- planning
title: 'Roadmap — Refine: Discuss new features for this increment,'
type: roadmap
---

# Refine: Discuss new features for this increment

**Project:** Asteroids Survivor
**Date:** 2026-09-17
**Meeting:** Refine
**Attendees:**
- Product Manager
- Technical Engineering Manager
- Lead Engineer
- Security Engineer
- UX/UI Designer
- You

## Situation

The operator requested two changes for this increment: (1) give the player three skill options to pick on level-up, and (2) make wave difficulty scale with playtime instead of player level. The room responded that both items were already locked in from prior planning — wave difficulty by playtime is a survivors-genre standard and sits in the execution spec (step 1, security), and the three-option picker UX (three distinct icons, one tap, no scroll, five-second discovery) was specified in the previous refine session.

## Decisions

- **Wave difficulty scales by playtime, not player level** — locked in as survivors-genre standard; already in execution spec step 1 (security). Pushed by Lead Engineer, supported by Technical Engineering Manager, held by Product Manager.
- **Three-option skill picker UX is locked** — three distinct icons, one tap, no scroll, five-second discovery. Pinned by UX/UI Designer citing 2026-09-16 discuss-new-features minutes.

## Open questions / disagreements

- Security Engineer repeatedly refuted the framing of the operator's request ("for this refining we need to set the…") and raised a "who could abuse" concern, but neither gained traction. The room treated these as already-settled scope, not open threats.
- Operator restated locked-in decisions as new directives; Product Manager refuted this twice as "user repeats locked plan."

## Roadmap

### Now
- Implement wave difficulty curve driven by playtime (not player level) — owner: Lead Engineer
  - Risk: Curve must feel fair across session lengths; validate with playtest.
- Build three-option upgrade picker (three distinct icons, one tap, no scroll, five-second discovery) — owner: UX/UI Designer + Lead Engineer
  - Risk: Icon clarity at small sizes; test on mobile viewport.

### Next
- Hook picker into upgrade_chosen event emitter (ADR 001) — owner: Lead Engineer
- Wire playtime-driven wave director into core loop — owner: Lead Engineer

### Later
- Nothing parked for later.

## Next actions

- [ ] Lead Engineer: Confirm wave difficulty curve parameters (playtime buckets, enemy spawn rates, health multipliers) and add to spec.
- [ ] UX/UI Designer: Deliver three-icon picker mockups (idle, hover, pressed, disabled) for review.
- [ ] Lead Engineer: Implement picker component with one-tap selection, no scroll, auto-dismiss after 5s.
- [ ] Lead Engineer: Integrate upgrade_chosen emitter (ADR 001) with picker selection.
- [ ] Product Manager: Schedule playtest session for wave curve + picker flow.

## Links

- [[Asteroids Survivor]]
- [[2026-09-17-refine-discuss-new-features]]

- Meeting source: `0f667ace`
