---
aliases:
- locks
- locked-decisions
project: Asteroids Survivor
summary: Current accepted project-wide locks.
tags:
- lock
- ledger
- adr
title: Locks
type: lock
---

# Locks

Accepted project-wide decisions. Source of truth is ADRs/. Supersede; do not delete.

- registration-invocation — Expert recommendation: Use a typed event emitter (e.g., `mitt` or a minimal custom `EventTarget`) exported from a dedicated `upgradeHook.ts` module; the core… [[adr-001-registration-invocation]] · accepted · 680e29d1
