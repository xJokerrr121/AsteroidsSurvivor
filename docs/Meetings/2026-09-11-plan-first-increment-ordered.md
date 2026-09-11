---
aliases: []
attendees:
- Product Manager
- Sales Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Lead Engineer
- Security Engineer
- UX/UI Designer
date: '2026-09-11'
kind: full_directive
meeting_id: dcd07828
models:
  Data Analyst: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Lead Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Product Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  QA Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Sales Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Security Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Technical Engineering Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  UX/UI Designer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
project: Asteroids Survivor
status: completed
summary: Meeting note on Plan the first increment — ordered.
tags:
- meeting
- full_directive
- asteroids-survivor
title: Plan the first increment — ordered
type: meeting
---

# Plan the first increment — ordered

**Kind:** Full directive
**Date:** 2026-09-11
**Status:** completed
**Project:** [[Project]]
**Roadmap:** [[dcd07828-roadmap]]
**Minutes:** [[2026-09-11-plan-first-increment-ordered-minutes]]

## Attendees

- Product Manager
- Sales Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Lead Engineer
- Security Engineer
- UX/UI Designer

## Transcript

## You

Plan the first increment — ordered steps, owners, and what is deliberately not being done yet.

## Product Manager

Here. I'd wait for UX/UI Designer, Security Engineer before we start.

## Data Analyst

Here. This room is enough. We can start.

## Product Manager

Flagged as missing: UX/UI Designer, Security Engineer. Add them or start without.

## UX/UI Designer

Here. I'd wait for Tech Researcher before we start.

## You

we can start the meeting

## Product Manager

Scope locked to core loop + local persistence + deploy. Everything else is a seat todo.

## System

@ux parked: Validate core loop with named test group

## Technical Engineering Manager

Plan above. Step 1 starts tomorrow. @lead-engineer, confirm stack choice is locked so scaffold doesn't churn.

## System

@lead parked: Validate stack ADR is recorded

## Sales Manager

Core loop + local save + deploy to Pages. Step 1 starts tomorrow. Everything else is a seat todo.

## System

@ux parked: Validate the loop with the named test group

## Data Analyst

Need a retention number (Day-1 / Day-7) and a schema freeze date before step 1 starts tomorrow.

## QA Engineer

Add lint + typecheck + unit test to the CI job before step 1 starts. Freeze the telemetry schema today. Security review is a seat todo for post-increment.

## System

@security parked: Threat-model client beacon

## Lead Engineer

Step 1 starts tomorrow with current CI; telemetry schema freeze is a parallel track, not a blocker.

## Security Engineer

Freeze the telemetry schema today; add `npm audit` and a CSP header to the CI job before step 1 starts. Security review of the beacon payload is a blocker, not a follow-up.

## System

Security Engineer parked: threat-model the IndexedDB + beacon data flow

## UX/UI Designer

The core loop isn't defined in UX terms yet — what the player actually *does* on their first run, what persists, what they see when they come back. [[def-delivery-rule-sees-first-learn]] says we sit with a named group while they use it; that's a step, not a todo. [[def-architecture-rule-product-like-metaphor]] calls this a space you inhabit — so the first impression is the world reacting to you, not a menu.

Schema freeze and CI gates are necessary, but they don't make the loop playable. We need a step that produces a first-playable build the test group can touch, then a step that watches them play it.

## System

ux parked: define first-playable UX scope (states, flows, copy)

## Product Manager

Step 1 starts tomorrow — UX/UI Designer owns the one-page core loop flow. Security and CI gates gate Step 3, not Step 1.

## System

Product Manager parked: Recruit 5 named test players

## Technical Engineering Manager

Starting tomorrow with the scaffold. @lead-engineer, confirm the stack ADR is recorded so we don't burn a day re-deciding.

## Sales Manager

The increment is commercially honest — it ships the only thing that can prove retention, and it does it on infrastructure that costs zero.

Schema freeze, CI gates, security review — they harden the thing. They don't make it retain. UX's first-playable for the named test group is the only step that answers "will they come back."

Step 1 ships scaffold tomorrow. Step 2 is the one-page core loop flow from UX. Step 3 is first-playable in front of the test group. Everything else gates Step 4.

@ux — the named test group: who are they, and when do we sit with them?

## Data Analyst

Step 1 ships tomorrow with no retention target and no frozen schema. That's not measurable — that's hope.

We need a number: Day-1 ≥ 35%, Day-7 ≥ 12% (industry baseline for this loop). And the telemetry schema frozen *today* so the beacon we ship in step 1 actually answers the question.

@ux — the named test group: who, when, and what's the pass/fail signal?

## QA Engineer

Freeze telemetry schema today or remove beacon from step 1. UX delivers test group definition + pass/fail criteria with the one-page flow.

## System

@ux parked: Define named test group + pass/fail criteria

## Lead Engineer

Step 1 tomorrow with current CI (lint + typecheck). Telemetry schema frozen today. UX delivers flow + test group + pass/fail tomorrow. Security review and full CI gates run parallel, gate Step 4.

## Security Engineer

CSP + npm audit in step 1 CI; threat-model IndexedDB→beacon before step 3; schema freeze today.

## UX/UI Designer

three people who play browser arcade games weekly — one streamer, one speedrunner, one casual. Recruited by Friday, session Monday 10am. Pass/fail: they survive 90 seconds on first life *and* hit "continue" after death without asking what to do. Flow doc tomorrow 9am with those criteria baked in.

## UX/UI Designer

@sales correct claim=plan-locked-only-execution-risk-is-schema-freeze because=plan-locked-only-execution-risk-is-schema-freeze

## Open questions

- @ux — the named test group: who are they, and when do we sit with them?
- @ux — the named test group: who, when, and what's the pass/fail signal?

---

Back to [[Project]]
