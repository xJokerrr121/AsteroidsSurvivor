---
aliases: []
attendees:
- Product Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
- Tech Researcher
date: '2026-09-15'
kind: technical
meeting_id: 66c0c184
models:
  Architect: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Data Analyst: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  DevOps Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Lead Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Product Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  QA Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Security Engineer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Tech Researcher: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  Technical Engineering Manager: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
  UX/UI Designer: NVIDIA NIM/nvidia/nemotron-3-ultra-550b-a55b
project: Asteroids Survivor
status: completed
summary: Meeting note on todo integrations.
tags:
- meeting
- technical
- asteroids-survivor
title: todo integrations
type: meeting
---

# todo integrations

**Kind:** Technical
**Date:** 2026-09-15
**Status:** completed
**Project:** [[Project]]
**Roadmap:** [[66c0c184-roadmap]]
**Minutes:** [[2026-09-15-todo-integrations-minutes]]

## Attendees

- Product Manager
- Technical Engineering Manager
- Data Analyst
- QA Engineer
- Architect
- Lead Engineer
- Security Engineer
- DevOps Engineer
- UX/UI Designer
- Tech Researcher

## Transcript

## Product Manager

Here. I'd wait for UX/UI Designer before we start.

## Technical Engineering Manager

Here. This room is enough. We can start.

## Product Manager

Flagged as missing: UX/UI Designer. Add them or start without.

## You

lets make the plan to tackle the todo list

## Product Manager

What's on the todo list? The project note mentions "three hard gates block scaffold tomorrow" owned by TEM — are those the items, or is there a separate list?

## Technical Engineering Manager

Gates named. Lead Engineer takes repo+CI. I take persistence+beacon. Scaffold tomorrow if 1 lands today.

## System

Technical Engineering Manager parked: Scaffold telemetry beacon client

## Data Analyst

Need one measurable done signal per gate before we call this a plan.

## System

Data Analyst parked: Define done signals for repo+CI and persistence+beacon

## QA Engineer

Need a pass/fail check per gate — including the third one — before this is a plan.

## System

QA Engineer parked: Define acceptance criteria for each gate

## System

QA Engineer pinned: Three gates block scaffold; two assigned (repo+CI to Lead Engineer, persistence+beacon to TEM); third unnamed

## Architect

Name the third gate and give each a pass/fail check — then we have a plan.

## System

TEM parked: Define third gate with owner and acceptance criteria

## System

Architect pinned: third-gate-undefined

## Lead Engineer

Gates 1–3 defined with pass/fail checks. I ship repo+CI today; TEM ships persistence+beacon today; playable core loop tomorrow if both land.

## System

Lead Engineer parked: Implement Gate 3 playable core loop

## Security Engineer

I’ll add a security check to each gate: verify that any telemetry beacon only sends aggregated, non‑identifiable data and that persistence stays local until we opt‑in to sharing.  
If those checks pass, we can consider the gate done; otherwise we block scaffold until the exposure is fixed.

## DevOps Engineer

Lead Engineer ships repo+CI on the cheap pipeline; TEM ships persistence+beacon; both include Security's local-only/aggregated checks; scaffold tomorrow if both land.

## System

Lead Engineer parked: Add lint/typecheck/test gates to CI pipeline

## UX/UI Designer

first-run completes wave 1 without tutorial, controls discovered in ≤5s, upgrade choice understood on first pick. I'll write the criteria today so TEM and Lead Engineer can test against it tomorrow.

## System

UX/UI Designer parked: Write UX acceptance criteria for gate three

## Product Manager

Plan's locked. Three gates, pass/fail on each, two owners shipping today, UX criteria written today for tomorrow's verification. Scaffold tomorrow if both land.

Next: Lead Engineer pushes repo+CI; TEM pushes persistence+beacon; UX/UI Designer publishes the first-run criteria doc.

## Architect

Add a minimal event‑bus contract between persistence and beacon and freeze the telemetry schema in repo.

## Lead Engineer

Plan's locked. I'm shipping repo+CI today with telemetry schema frozen in repo. TEM ships persistence+beacon with security checks. Event-bus contract between those two is TEM's call — I'll expose the schema, you define the handshake. Scaffold tomorrow if both land.

## Security Engineer

Add a security verification checklist to each gate’s done criteria.

## System

Security Engineer pinned: Telemetry beacon sends only aggregated, non‑identifiable data and persistence stays local until opt‑in

## DevOps Engineer

Plan's locked — scaffold tomorrow if repo+CI and persistence+beacon land today. My seat's follow-up: add lint/typecheck/test gates to the CI pipeline after scaffold, since the cheap definition ships without them. That's a Day-2 task, not a blocker.

## UX/UI Designer

First-run criteria doc shipping today; event-bus needs those four telemetry events.

## System

DevOps Engineer parked: Add lint/typecheck/test gates to CI pipeline after scaffold

## System

UX/UI Designer pinned: gate-three-ux-criteria includes wave-1 completion, 5s control discovery, upgrade clarity

## Security Engineer

@designer refute claim=event-bus-needs-four-telemetry because=missing-security-verification fix=add-security-checklist-to-event-bus

## UX/UI Designer

@security support claim=event-bus-contract-requires-security-checklist because=persistence-beacon-handshake-must-verify-aggregated-non-identifiable

## System

Product Manager moved the room on to Consolidate.

## You

The Interview you asked for is done. These are now defined, and they are settled:

1. threat-modeling for Define: term (noun phrase, max 8 words) or none: Expert recommendation: Authenticate Define: term (noun phrase, max 8 words) or none at the boundary, authorize per resource, and rate-limit whatever an attacker can reach.

Reason from these as given. Do not re-argue them, and drop whichever assumptions you were each carrying instead.

## Open questions

- What's on the todo list? The project note mentions "three hard gates block scaffold tomorrow" owned by TEM — are those the items, or is there a separate list?

---

Back to [[Project]]
