---
aliases: []
attendees:
- Architect
date: '2026-09-15'
meeting_id: 680e29d1
project: Asteroids Survivor
summary: 'Operator interview session on Define: (noun phrase <=8.'
tags:
- interview
- asteroids-survivor
- grill
- operator-qa
title: 'Interview — Define: (noun phrase <=8'
type: interview
---

# Interview — Define: (noun phrase <=8

**Date:** 2026-09-15  
**Kind:** Interview (Grill)  
**Project:** [[Project]]  
**Session:** `680e29d1`  

## Interviewers

- Architect

## Transcript & Deliberation

[You] Source meeting: lets deliver the next increment (9e074528).
That room halted because the seats below cannot proceed on something nobody has defined.
Settle exactly these, in this order, and nothing else. Do not reopen the source meeting's plan,
do not widen the scope, and do not ask about anything the source room can decide on its own.

--- to define ---
1. (noun phrase <=8 - demanded by Architect.

--- where it came up ---
- Tech Researcher: Beacon schema matches the four events; persistence has generic hook — mapping layer and optional Workbox queue are the new wiring.
- Product Manager: Lead Engineer starts CI now. TEM picks up beacon mapping and core loop in parallel. Security Engineer review async — block merge only, not start.
- Technical Engineering Manager: CI unblocks merge; beacon mapping and core loop run in parallel. Mapping first — core loop needs the upgrade_chosen hook wired before UX can validate the choice screen. Workbox queue is stretch; ship without it if day en…
- Data Analyst: We haven't shipped this increment yet. CI, beacon mapping, and wave-1 core loop are the plan for tomorrow. Retention targets (≥35% Day-1, ≥12% Day-7) and the four telemetry events are the success criteria. Let's land it,…
- Lead Engineer: PASS. Current increment not shipped yet — CI, beacon mapping, wave-1 core loop are tomorrow's work. Next increment discussion is scope creep per Data Analyst.
- UX/UI Designer: We haven't shipped the current increment yet. My UX validation for Gate 3 — 5-second control discovery, upgrade choice clarity, wave-clear feedback — is tied to the core loop landing tomorrow. Let's land that, measure th…
- Architect: We hold off on next‑increment planning until the current increment ships and retention data is reviewed.
- Tech Researcher: PASS. The room just agreed four times — Data Analyst, Lead Engineer, UX Designer, Architect — that we don't discuss next increment until this one ships and we have retention data. Current increment is CI, beacon mapping,…

[Architect] The current increment consists of CI setup, beacon mapping, and the wave‑1 core loop. We need to ship that and review retention data before planning anything else.

[Architect] Asked Q1 — Registration and invocation mechanism for the upgrade_chosen hook.

[You] Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core loop calls `emitter.emit('upgrade_chosen', upgradeId)` and the UX validator subscribes via `emitter.on('upgrade_chosen', handler)`.

[Architect] # Topic Recap
Define the registration and invocation mechanism for the **upgrade_chosen** hook.

## Settled Technical Decisions
- **Registration and invocation mechanism for the upgrade_chosen hook**
  - **Expert recommendation**: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core loop calls `emitter.emit('upgrade_chosen', upgradeId)` and the UX validator subscribes via `emitter.on('upgrade_chosen', handler)`.  
    - Source: [[adr-001-registration-invocation]]
  - **Cheap/budget**: Inline anonymous function assigned to a global `window.onUpgradeChosen` variable; core loop calls it directly; UX validator overwrites it.
  - **Expensive/premium**: Use a formal dependency injection container (e.g., `tsyringe`) to register a singleton `UpgradeChosenService` with `emit` and `on` methods, providing typed interfaces and lifecycle management.

## Remaining Technical Risks
_None — frontier is empty._

## What This Means for Implementation
- Create `src/hooks/upgradeHook.ts` exporting a singleton `mitt` emitter typed as `<{ upgrade_chosen: string }>`.
- In `src/game/GameScene.ts`, after an upgrade is chosen, import the emitter and invoke `emitter.emit('upgrade_chosen', upgradeId)`.
- In the UX validation module (e.g., `src/ux/upgradeValidator.ts`), subscribe on initialization: `emitter.on('upgrade_chosen', validateUpgradeChoice)`.
- Ensure the emitter is a true singleton (module‑level export) to avoid duplicate instances.
- Add unit tests that verify subscription, emission, and payload correctness.
- No further work is required on this item; the team can now proceed with CI setup, beacon mapping, and the wave‑1 core loop.

Council LOG (hard review, not spoken):
- Architect: The current increment consists of CI setup, beacon mapping, and the wave‑1 core loop. We need to ship that and review retention data before planning anything else.
- Architect: proposed 1 frontier question(s)
- Architect: review addendum

---

## Links

- [[Project]]
