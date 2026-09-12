---
aliases: []
date: '2026-09-11'
meeting_id: dcd07828
project: Asteroids Survivor
summary: Threat model of the IndexedDB -> telemetry beacon data flow for the MVP increment.
tags:
- security
- threat-model
- definition
title: Threat model — IndexedDB to telemetry beacon
type: definition
---

# Threat model — IndexedDB → telemetry beacon

**Owner:** Security Engineer
**Gate:** must complete before the Step 3 session (2026-09-21)
**Scope:** the data path from the device-local IndexedDB record to the managed
analytics endpoint, as implemented in `src/persistence/storage.ts`,
`src/telemetry/beacon.ts` and `src/main.ts`.

## 1. Data classification

| Data | Where it lives | Class |
| --- | --- | --- |
| `highScoreMs`, `lastRunAt`, `runCount` | IndexedDB, device-local | Non-personal game state |
| `session_id` | In memory, per tab | Pseudonymous, non-persistent |
| `survived_ms`, `high_score_ms`, `returning` | Beacon payload | Non-personal telemetry |
| Player name, email, account | **Not collected** | — |

No field in the frozen schema (`docs/telemetry-schema.json`) is a personal
identifier, and `properties` is constrained to string/number/boolean values, so
free text cannot ride along.

## 2. Trust boundaries

1. **Player device ↔ page origin.** IndexedDB is origin-scoped. Any script that
   executes on the origin can read the record; the CSP (`script-src 'self'`) is
   the control that keeps third-party script off the origin.
2. **Page origin ↔ analytics endpoint.** One outbound hop over HTTPS via
   `navigator.sendBeacon()`. `connect-src` in the CSP and the host allowlist in
   `beacon.ts` both constrain the destination.
3. **Analytics endpoint ↔ operator.** The managed provider (Plausible/Umami)
   holds the events. Out of scope for the code; covered by the provider's terms.

There is no server of ours anywhere on this path — nothing to compromise, and
nothing that could correlate events to a person on our side.

## 3. Threats and mitigations

| # | Threat | Mitigation | Status |
| --- | --- | --- | --- |
| T1 | Persisted state widens over time to hold PII (name for a leaderboard, chat) | `GameState` is a closed interface; schema is frozen; no backend to receive a name | Mitigated by scope lock |
| T2 | Beacon exfiltrates to an attacker endpoint via a mis-set `VITE_TELEMETRY_ENDPOINT` | `isAllowedEndpoint()` drops any non-https or non-allowlisted host; `connect-src` blocks it at the browser | Mitigated |
| T3 | Injected third-party script reads IndexedDB and posts it out | CSP `default-src 'self'`, `script-src 'self'`; no CDN script tags; no `eval` | Mitigated |
| T4 | `session_id` becomes a cross-session identifier | Generated per tab with `crypto.randomUUID()`, held in memory only, never written to IndexedDB | Mitigated |
| T5 | Timestamps + survival times fingerprint a returning player | Values are coarse game facts; no IP or UA is added by us; the provider's own retention policy applies | Accepted |
| T6 | IndexedDB unavailable (private mode) and failures leak through as errors | `loadState`/`saveState` swallow failures and fall back to empty state; a run stays playable | Mitigated |
| T7 | Player expects nothing to leave the device (trust rule: "nothing leaves without an explicit action") | Telemetry is the single declared exception and carries no identifiers; it is off entirely unless `VITE_TELEMETRY_ENDPOINT` is configured | Accepted, disclose before launch |

## 4. PII leakage mitigation (summary)

- Closed event-name enum and value-typed `properties` in the frozen schema.
- No input field anywhere in the MVP — the player cannot type anything that
  could be sent.
- Endpoint allowlist enforced twice: in code and in the CSP.
- No sourcemaps and no backend in the deployed artifact.

## 5. Sign-off

Prepared from the shipped implementation by the coding agent as part of the
execution spec. **Security Engineer sign-off is outstanding** — a human owner
must countersign here before the Step 3 session on 2026-09-21.

- Security Engineer: _______________________  Date: ____________
