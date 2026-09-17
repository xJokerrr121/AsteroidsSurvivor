---
aliases: []
date: '2026-09-15T23:57:27.899056'
deciders: []
id: adr-001
meeting_id: 680e29d1
project: Asteroids Survivor
status: accepted
summary: 'Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal
  custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core
  loop calls `emitter.emit(''upgrade_chosen'', upgradeId)` and the UX validator subscribes
  via `emitter.on(''upgrade_chosen'', handler)`.'
tags:
- adr
- asteroids-survivor
- decision
- accepted
title: 'ADR 001: Registration and invocation mechanism for the upgrade_chosen hook'
type: adr
---

# ADR 001: Registration and invocation mechanism for the upgrade_chosen hook

**Status:** accepted  
**Date:** 2026-09-15T23:57:27.899056  
**Deciders:** Virtual Directive Council  
**Project:** [[Project]]  
**Meeting:** [[680e29d1]]  

## Context & Problem Statement

How should listeners subscribe to and receive the hook call?

## Decision Outcome

Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core loop calls `emitter.emit('upgrade_chosen', upgradeId)` and the UX validator subscribes via `emitter.on('upgrade_chosen', handler)`.

## Consequences

### Positive
- _Positive improvements and alignment._

### Negative / Trade-offs
- _No severe drawbacks identified._

### Neutral / Constraints
- This is now a project-wide constraint. Do not reopen it locally.

---

## Links & Related Records

- [[Project]]

## Links

- [[Index]]
- [[2026-09-15-define-noun-phrase-8]]
- [[2026-09-15-define-noun-phrase-8-interview]]
- [[Locks]]
- [[2026-09-15-execution-spec-lets-deliver]]
- [[2026-09-15-execution-spec-ship-wave]]
- [[2026-09-16-auto-document-project]]
