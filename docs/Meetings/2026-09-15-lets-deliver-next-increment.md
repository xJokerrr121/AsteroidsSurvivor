---
aliases: []
attendees:
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Architect
- Tech Researcher
date: '2026-09-15'
kind: full_directive
meeting_id: 9e074528
models:
  Architect: NVIDIA NIM/nvidia/nemotron-3-super-120b-a12b
  Data Analyst: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Lead Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Product Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Tech Researcher: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Technical Engineering Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  UX/UI Designer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
project: Asteroids Survivor
status: completed
summary: Meeting note on lets deliver the next increment.
tags:
- meeting
- full_directive
- asteroids-survivor
title: lets deliver the next increment
type: meeting
---

# lets deliver the next increment

**Kind:** Full directive
**Date:** 2026-09-15
**Status:** completed
**Project:** [[Project]]
**Roadmap:** [[9e074528-roadmap]]
**Minutes:** [[2026-09-15-lets-deliver-next-increment-minutes]]

## Attendees

- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Architect
- Tech Researcher

## Transcript

## Product Manager

Here. I'd wait for Security Engineer before we start.

## Data Analyst

Here. This room is enough. We can start.

## UX/UI Designer

Here. I'd wait for Tech Researcher before we start.

## Product Manager

Flagged as missing: Security Engineer, Tech Researcher. Add them or start without.

## You

lets discus about the next increment

## Product Manager

repo+CI to Lead Engineer, persistence+beacon to TEM. Third gate unnamed.

What's the third gate? And what's the smallest playable slice that proves retention — not just "it runs"?

## Technical Engineering Manager

Gate three = wave-1 core loop (move, auto-fire, XP, upgrade choice, wave clear). Smallest retention probe shipped to Pages by tomorrow.

## System

TEM parked: define wave-1 acceptance criteria

## System

Technical Engineering Manager pinned: third-gate-defined-as-wave-1-core-loop

## Data Analyst

wave-1 core loop. That gives us a measurable retention probe — but only if we log the right events from day one.

We need session_start, wave_cleared, upgrade_chosen, and session_end (with duration) in the beacon payload. That's four events. With those we can compute Day-1 and Day-7 retention per the targets (≥35% / ≥12%) and see where the funnel leaks.

TEM, does the persistence layer already emit those event hooks, or do we add them in this increment?

## Lead Engineer

three workstreams above, CI first, beacon events second, core loop third. TEM confirm beacon schema matches the four events?

## System

TEM parked: verify beacon.ts emits exactly those four event shapes

## System

Lead Engineer pinned: telemetry-four-events-session-start-wave-cleared-upgrade-chosen-session-end

## UX/UI Designer

The wave-1 core loop is our retention probe — so the first-time experience has to land. Gate 3 UX criteria calls out 5-second control discovery and upgrade choice clarity.

Two things I need to see in this increment:
1. **Upgrade choice presentation** — player gets one clear choice, not a menu they have to parse. Text + icon, single tap/click, no hover-only affordances.
2. **Wave clear feedback** — a visible, juicy "wave cleared" moment that also surfaces the upgrade. If that feels like a pause screen, we lose the run momentum.

TEM, does the persistence layer already have hooks for "upgrade_chosen" with the choice payload, or is that new wiring in this increment?

## Architect

TEM, keep the persistence layer pure—let it only store state and fire a generic store‑change hook; the telemetry module can map those to the four beacon events without pulling in UI logic. That way the core loop, CI, and UX each stay in their own boundary and we avoid hidden coupling.

## Tech Researcher

Beacon schema matches the four events; persistence has generic hook — mapping layer and optional Workbox queue are the new wiring.

## System

Tech Researcher parked: sketch telemetry mapping layer

## System

Tech Researcher pinned: persistence has generic store-change hook

## Product Manager

Lead Engineer starts CI now. TEM picks up beacon mapping and core loop in parallel. Security Engineer review async — block merge only, not start.

## System

Security Engineer parked: Security Engineer async gate review

## System

Product Manager pinned: telemetry four events locked

## Technical Engineering Manager

CI unblocks merge; beacon mapping and core loop run in parallel. Mapping first — core loop needs the upgrade_chosen hook wired before UX can validate the choice screen. Workbox queue is stretch; ship without it if day ends tight.

## Data Analyst

We haven't shipped this increment yet. CI, beacon mapping, and wave-1 core loop are the plan for tomorrow. Retention targets (≥35% Day-1, ≥12% Day-7) and the four telemetry events are the success criteria.

Let's land it, measure, then decide what's next. Discussing the next increment now is scope creep.

## Lead Engineer

PASS. Current increment not shipped yet — CI, beacon mapping, wave-1 core loop are tomorrow's work. Next increment discussion is scope creep per Data Analyst.

## UX/UI Designer

We haven't shipped the current increment yet. My UX validation for Gate 3 — 5-second control discovery, upgrade choice clarity, wave-clear feedback — is tied to the core loop landing tomorrow. Let's land that, measure the retention probe, then decide what's next.

## Architect

We hold off on next‑increment planning until the current increment ships and retention data is reviewed.

## System

Architect parked: Draft a versioned telemetry event schema

## Tech Researcher

PASS. The room just agreed four times — Data Analyst, Lead Engineer, UX Designer, Architect — that we don't discuss next increment until this one ships and we have retention data. Current increment is CI, beacon mapping, wave-1 core loop for tomorrow. Let's land that first.

## You

The Interview you asked for is done. These are now defined, and they are settled:

1. Registration and invocation mechanism for the upgrade_chosen hook: Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core loop calls `emitter.emit('upgrade_chosen', upgradeId)` and the UX validator subscribes via `emitter.on('upgrade_chosen', handler)`.

Reason from these as given. Do not re-argue them, and drop whichever assumptions you were each carrying instead.

## Technical Engineering Manager

Settled. The emitter approach matches what we need for the upgrade_chosen hook in this increment.

## Data Analyst

Settled. The four telemetry events are locked, the hook mechanism is defined, and the increment is scoped to ship tomorrow.

## Open questions

- What's the third gate? And what's the smallest playable slice that proves retention — not just "it runs"?
- TEM, does the persistence layer already emit those event hooks, or do we add them in this increment?
- three workstreams above, CI first, beacon events second, core loop third. TEM confirm beacon schema matches the four events?
- TEM, does the persistence layer already have hooks for "upgrade_chosen" with the choice payload, or is that new wiring in this increment?

---

Back to [[Project]]

## Links

- [[Index]]
- [[todos]]
- [[Memory]]
