---
aliases: []
area: src/telemetry
code_hash: 1cd27d1b35ef911c
source_files:
- src/telemetry/beacon.test.ts
- src/telemetry/beacon.ts
summary: This area implements the client-side telemetry beacon used by the game. It
  sends a closed set of three event types (`session_start`, `death`, `continue_click`)
  to an allowlisted analytics endpoint using `navigator.sendBeacon()`. The transpo
tags: []
title: Code — src/telemetry
type: code
---

# Code — src/telemetry

> Written by an auto-documentation run from the source of 2 of 2 file(s) under `src/telemetry` in Asteroids Survivor. Re-run auto-document to refresh it after the code changes.

## Responsibility

This area implements the client-side telemetry beacon used by the game. It sends a closed set of three event types (`session_start`, `death`, `continue_click`) to an allowlisted analytics endpoint using `navigator.sendBeacon()`. The transport is fire-and-forget, requires no backend, and survives tab closure. The schema is frozen and documented externally; the code enforces an endpoint allowlist that mirrors the CSP `connect-src` directive so a misconfigured `VITE_TELEMETRY_ENDPOINT` cannot exfiltrate data.

## Files

**src/telemetry/beacon.ts** — Core beacon client. Defines the event type union, the payload interface, the endpoint allowlist, session-id generation, payload construction, and the send function. All logic is pure except for the final `navigator.sendBeacon` call.

**src/telemetry/beacon.test.ts** — Unit tests covering schema shape, allowlist enforcement, HTTPS requirement, and the no-op behavior when telemetry is unconfigured. The tests stub `navigator.sendBeacon` and the Vite env variable.

## Key functions and classes

- **`EventName` / `EventProperties` / `TelemetryEvent`** — Type definitions that close the event set and restrict properties to scalar values (string, number, boolean). No identifiers or free-text fields are permitted.

- **`ALLOWED_ENDPOINT_HOSTS`** — Constant tuple `['plausible.io', 'umami.is']` used by the allowlist check. Exported so tests and CSP tooling can verify alignment.

- **`isAllowedEndpoint(endpoint)`** — Validates that the endpoint is a well-formed HTTPS URL whose hostname matches or is a subdomain of an allowlisted host. Returns `false` for any parsing failure, non-HTTPS scheme, or non-matching host.

- **`newSessionId()` / `getSessionId()`** — Generates a per-tab opaque session ID using `crypto.randomUUID()` when available, with a `Math.random` + timestamp fallback. The ID is created once per module load and never persisted.

- **`buildEvent(eventName, properties)`** — Constructs a `TelemetryEvent` with the current session ID, an ISO timestamp, and the provided properties. Exported for testing; does not send.

- **`sendEvent(eventName, properties)`** — Reads `import.meta.env.VITE_TELEMETRY_ENDPOINT`, validates it via `isAllowedEndpoint`, serializes the event to a JSON `Blob`, and queues it with `navigator.sendBeacon`. Returns `true` only when the beacon was accepted by the browser; returns `false` for missing config, failed allowlist, missing `sendBeacon`, or browser refusal.

## Integration with the rest of the project

The module is imported by the broader `src` tree (per the structural facts). Game code calls `sendEvent` at the three lifecycle points: session start, player death, and continue-button click. The only external dependency is the Vite-injected env var `VITE_TELEMETRY_ENDPOINT`; if unset or empty, telemetry is a no-op. The allowlist is designed to stay in sync with the CSP `connect-src` header configured at deploy time. No other project modules depend on telemetry internals.

## Files

| File | Read | What it declares |
| --- | --- | --- |
| `src/telemetry/beacon.test.ts` | yes | `—` |
| `src/telemetry/beacon.ts` | yes | `EventName, EventProperties, TelemetryEvent, ALLOWED_ENDPOINT_HOSTS, getSessionId, buildEvent, sendEvent` |

## Around it

- Imported by: `src`

## Links

- [[Architecture]]
- [[Project]]
