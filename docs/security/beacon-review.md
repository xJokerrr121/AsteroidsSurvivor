---
aliases: []
date: '2026-09-11'
meeting_id: dcd07828
project: Asteroids Survivor
summary: Review of the beacon payload schema and transport; blocks the Step 3 session
  until signed.
tags:
- security
- review
- definition
title: Security review — beacon payload and transport
type: definition
---

# Security review — beacon payload and transport

**Owner:** Security Engineer
**Gate:** blocks the Step 3 session (2026-09-21) — not a follow-up
**Under review:** `docs/telemetry-schema.json` (frozen 2026-09-11) and
`src/telemetry/beacon.ts`

## Payload

```json
{
  "session_id": "9f1d…",
  "event_name": "death",
  "timestamp": "2026-09-11T23:41:02.118Z",
  "properties": { "survived_ms": 91200, "high_score_ms": 91200 }
}
```

Three events only: `session_start`, `death`, `continue_click`.

| Check | Finding |
| --- | --- |
| Personal data in the payload | None. No name, email, account, IP or user agent added by us. |
| `session_id` scope | Per tab, `crypto.randomUUID()`, in memory only, never persisted — cannot link sessions. |
| `properties` openness | Constrained to string/number/boolean; no free text can be carried. |
| Schema closed | `additionalProperties: false` at the top level; `event_name` is a closed enum. |
| Transport | `navigator.sendBeacon()` over https only; `isAllowedEndpoint()` rejects `http:` and any host outside `plausible.io` / `umami.is`. |
| Defence in depth | The same allowlist is expressed in the CSP `connect-src`, so a code regression alone cannot redirect the beacon. |
| Failure mode | Returns `false` and drops the event when unconfigured or disallowed; never throws into the game loop. |
| Test coverage | `src/telemetry/beacon.test.ts` asserts the schema shape and four rejection cases, including the `plausible.io.evil.example` suffix trap. |

## Findings

No blocking issues found in the payload or the transport. Two items for the
Step 4 hardening gate, neither of which requires a schema change (the freeze
holds):

1. **Provider-side retention.** The managed endpoint's own retention and
   log policy is not covered by this review — confirm before public launch.
2. **Disclosure.** The trust rule says nothing leaves without an explicit
   action. Telemetry is the declared exception; it needs one line of visible
   disclosure on the page before launch.

## Approval

Prepared from the shipped implementation by the coding agent as part of the
execution spec. **Security Engineer approval is outstanding** — this review is
not discharged until a human owner signs below, and the Step 3 session is
gated on that signature.

- [ ] Approved — Security Engineer: _______________________  Date: ____________
