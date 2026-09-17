---
aliases: []
attendees:
- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Tech Researcher
- Security Engineer
date: '2026-09-16'
kind: full_directive
meeting_id: 7fd59e2c
models:
  Data Analyst: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Lead Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Product Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Security Engineer: NVIDIA NIM/nvidia/nemotron-3-super-120b-a12b
  Tech Researcher: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Technical Engineering Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  UX/UI Designer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
project: Asteroids Survivor
status: completed
summary: Meeting note on Discuss new features for this increment,.
tags:
- meeting
- full_directive
- asteroids-survivor
title: Discuss new features for this increment,
type: meeting
---

# Discuss new features for this increment,

**Kind:** Full directive
**Date:** 2026-09-16
**Status:** completed
**Project:** [[Project]]
**Roadmap:** [[7fd59e2c-roadmap]]
**Minutes:** [[2026-09-16-discuss-new-features-minutes]]

## Attendees

- Product Manager
- Technical Engineering Manager
- Data Analyst
- Lead Engineer
- UX/UI Designer
- Tech Researcher
- Security Engineer

## Transcript

## You

Discuss new features for this increment, against the authorized concept and locked stack.

## Product Manager

Here. I'd wait for Security Engineer before we start.

## Data Analyst

Here. This room is enough. We can start.

## Product Manager

Flagged as missing: Security Engineer. Add them or start without.

## You

lets start a new feature for xp, and skill progression

## Product Manager

XP and skill progression is the Vampire Survivors half of the concept. But we have no retention proof yet — just a survival timer that ends on first hit.

Before we scope: what's the *one* metric that tells us this increment worked? Day-1 ≥35% is the target — does XP move that needle, or does a "continue" button (watch ad / spend currency) move it more?

Smallest shippable slice I can see:
- XP drops from shattered asteroids (already have `shatter()` hook)
- Level-up = pick 1 of 3 upgrades (damage, fire rate, max speed, magnet radius)
- Persist only the *current run's* choices — no meta-progression yet

That's one new scene (level-up overlay), one new persistence key (current build), and the existing `DEATH_EVENT` already emits survival time — we can piggyback XP there.

TEM, what's the engineering cost of a modal upgrade picker that pauses physics? UX, does "space you inhabit" mean the picker floats in-world or a clean overlay?

Security Engineer still missing — if we persist builds to IndexedDB, they need to sign off on the schema change.

## Technical Engineering Manager

XP drops + level-up picker + `currentBuild` persistence is the slice. Picker scene (2–3 days), schema sign-off (Security), in-world vs overlay (UX). Meta-progression explicitly out.

## System

Lead Engineer parked: build level-up picker scene

## System

Technical Engineering Manager pinned: xp-progression-slice-defined

## Data Analyst

session-start, wave-cleared, upgrade, session-end. The `upgrade` event is the hook — but it fires on *pick*, not on *impact*.

One metric for this increment: **upgrade-pick → next-session-start rate**. If players who pick an upgrade come back tomorrow at ≥35%, XP moved the needle. If they don't, the picker is theater.

We can log that today with the existing beacon — no schema change. But we need a session ID that survives browser close. Does `storage.ts` already persist a `session_id` across runs, or do we mint a new one each `startRun()`?

TEM, UX — answer PM's overlay vs in-world question so we know what "upgrade" event properties carry (position, options shown, time-to-pick). Security — schema sign-off only if we add a `currentBuild` key; the four-event schema is locked.

## Lead Engineer

XP drops on `shatter()` is the cleanest hook — large asteroid breaks, two small spawn, drop 10–25 XP there. Level-up at fixed thresholds (100, 250, 450…), pause physics, show picker, resume. `currentBuild` key in IndexedDB holds the three picks for this run only; wiped on `startRun()`.

Engineering cost: picker scene is one Phaser `Scene` that `scene.pause('game')` / `scene.resume('game')` — half a day if UX decides overlay vs in-world today. Schema change is one key (`currentBuild: Upgrade[]`) — Security signs off on the shape, not the transport.

Blocker: `storage.ts` — does it persist a stable `session_id` across browser close? Beacon needs that for the upgrade-pick → next-session-start metric. If not, mint one in `startRun()` and write it once.

@security — `currentBuild` schema is the only new key. Sign off so TEM can wire the picker.

@ux — overlay or in-world? Dictates whether `upgrade` event carries screen coords or world coords.

## UX/UI Designer

"Space you inhabit" means in-world — the picker should float near the ship, physics paused, options radiating outward like debris. But it must read in ≤5 s: three distinct icons, one-tap/click each, no scroll, no tooltip hunt. That satisfies the Gate 3 control-discovery bar.

Overlay is safer for legibility on mobile; if we go in-world we need a subtle vignette + enlarge-on-hover so fat fingers don't miss. TEM, can the picker Scene render to a second camera so the world stays visible but dimmed?

@engineer — `upgrade` event should carry world coords (ship-relative) if in-world, screen coords if overlay. Decide now so the beacon schema stays stable.

## Tech Researcher

Adopt `phaser3-rex-plugins` for the level-up picker — it satisfies in-world UX, pauses physics cleanly, and keeps the bundle inside the Step 4 budget.

## System

@tech parked: Evaluate Rex plugin bundle impact

## System

Tech Researcher pinned: rex-plugin-evaluated-for-picker

## Security Engineer

We should confirm that storing the currentBuild key in IndexedDB stays fully local and doesn't create an off‑device trust boundary, as required by the zero‑backend lock [[backend-scope-contract]].

We also need to ensure the upgrade‑pick event only adds to the existing four‑field telemetry schema [[client-side-telemetry-schema]] and doesn't introduce new identifiers.

## Product Manager

XP drops on shatter, fixed thresholds, in-world picker with Rex plugin — that's the slice. Security signs off currentBuild schema today so TEM can wire the picker; meta-progression stays out.

## Technical Engineering Manager

Security signs off currentBuild schema today; Lead Engineer starts picker scene with Rex plugin once unblocked; Data Analyst confirms session_id persistence in storage.ts.

## System

Data Analyst parked: verify session_id persistence in storage.ts

## System

Technical Engineering Manager pinned: currentBuild schema is Upgrade[] local-only in IndexedDB

## Lead Engineer

This slice is already authorized and sequenced — XP drops on `shatter()`, fixed thresholds, in-world picker with Rex plugin, `currentBuild` key in IndexedDB for this run only. Meta-progression explicitly out.

Two things unblock coding:
1. **Security** — sign off `currentBuild: Upgrade[]` schema (local-only, no new identifiers in telemetry)
2. **Data Analyst** — confirm `storage.ts` persists a stable `session_id` across browser close, or we mint one in `startRun()`

Once those clear, TEM wires the picker scene with Rex plugin.

## Tech Researcher

Slice is locked. Unblock Security sign-off and session_id confirmation so Lead Engineer can start the picker scene.

## System

Data Analyst parked: Confirm session_id persistence in storage.ts

## Security Engineer

Security will approve currentBuild after local-only check; session_id can be a local UUID.

## Security Engineer

@engineer correct claim=who-could-abuse-lets-start-a-new-feature because=who-could-abuse-lets-start-a-new-feature

## UX/UI Designer

@engineer correct claim=feature-already-authorized-and-sequenced-slice-is-locked because=feature-already-authorized-and-sequenced-slice-is-locked

## Lead Engineer

@designer correct claim=the-simplest-version-of-lets-start-a-new because=the-simplest-version-of-lets-start-a-new

## You

The Interview you asked for is done. These are now defined, and they are settled:

1. Noun phrase length enforcement: Cheap budget: Define the phrase as a hard‑coded const string and rely on code‑review and a lint rule that flags any string literal longer than eight words (using eslint-plugin-todo with custom rule).

Reason from these as given. Do not re-argue them, and drop whichever assumptions you were each carrying instead.

## Technical Engineering Manager

@tem support claim=xp-progression-slice-locked because=security-schema-signoff-sessionid-confirmation-unblocks-coding

## UX/UI Designer

@tem support claim=xp-progression-slice-locked because=ux-decision-settled-rex-plugin-in-world-picker

## Tech Researcher

@tem support claim=noun-phrase-lint-enforcement-settled because=eslint-plugin-todo-custom-rule-proven-pattern

## Security Engineer

[LLM error] model 'nvidia/nemotron-3-super-120b-a12b' — Connection error.

## Product Manager

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Technical Engineering Manager

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Data Analyst

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Lead Engineer

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## UX/UI Designer

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Tech Researcher

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Security Engineer

[LLM error] model 'nvidia/nemotron-3-super-120b-a12b' — Connection error.

## Product Manager

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Technical Engineering Manager

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Data Analyst

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## Lead Engineer

[LLM error] model 'nvidia/nemotron-3-ultra-550b-a55b' — Connection error.

## System

Product Manager picked Action plan back up - the last pass stopped short of finishing it.

## Product Manager

Finalize action plan with ordered steps, owners, dependencies — done when Refine can execute without clarification.

## Technical Engineering Manager

Action plan ordered — 1) Security signs off currentBuild: Upgrade[] schema today (local-only) 2) Data Analyst confirms session_id persists in storage.ts or we mint in startRun() 3) Lead Engineer builds in-world picker scene with Rex plugin (pauses physics, world coords) 4) TEM wires picker into game flow 5) UX validates ≤5s control discovery 6) Data Analyst verifies upgrade event carries world coords + session_id 7) Ship to Pages for Day-1 retention probe. Meta-progression explicitly not this increment.

## System

Technical Engineering Manager pinned: currentBuild schema is Upgrade[] local-only in IndexedDB

## System

me parked: check storage.ts for persisted session_id

## Decisions

- We should confirm that storing the currentBuild key in IndexedDB stays fully local and doesn't create an off‑device trust boundary, as required by the zero‑backend lock [[backend-scope-contract]].

## Open questions

- Before we scope: what's the *one* metric that tells us this increment worked? Day-1 ≥35% is the target — does XP move that needle, or does a "continue" button (watch ad / spend currency) move it more?
- TEM, what's the engineering cost of a modal upgrade picker that pauses physics? UX, does "space you inhabit" mean the picker floats in-world or a clean overlay?
- We can log that today with the existing beacon — no schema change. But we need a session ID that survives browser close. Does `storage.ts` already persist a `session_id` across runs, or do we mint a new one each `startRun()`?
- Overlay is safer for legibility on mobile; if we go in-world we need a subtle vignette + enlarge-on-hover so fat fingers don't miss. TEM, can the picker Scene render to a second camera so the world stays visible but dimmed?

---

Back to [[Project]]
