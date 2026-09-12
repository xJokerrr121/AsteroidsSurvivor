/**
 * Telemetry beacon client.
 *
 * Event schema frozen 2026-09-11 — see `docs/telemetry-schema.json`.
 * Transport is `navigator.sendBeacon()` only: zero backend, fire-and-forget,
 * survives the tab being closed mid-run.
 */

/** Closed event set for the MVP increment. */
export type EventName = 'session_start' | 'death' | 'continue_click';

/** Properties carry facts about the run, never identifiers or free text. */
export type EventProperties = Record<string, string | number | boolean>;

export interface TelemetryEvent {
  session_id: string;
  event_name: EventName;
  timestamp: string;
  properties: EventProperties;
}

/**
 * Endpoint allowlist (Step 4 hardening). Mirrors the `connect-src` directive of
 * the CSP so a mis-set `VITE_TELEMETRY_ENDPOINT` cannot exfiltrate to a third
 * party — the beacon is dropped instead.
 */
export const ALLOWED_ENDPOINT_HOSTS = ['plausible.io', 'umami.is'] as const;

function isAllowedEndpoint(endpoint: string): boolean {
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:') return false;
  return ALLOWED_ENDPOINT_HOSTS.some(
    (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
  );
}

function newSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for browsers without crypto.randomUUID; still opaque and per-tab.
  return `s-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

const sessionId = newSessionId();

/** The id attached to every event from this tab. Not persisted, not a user id. */
export function getSessionId(): string {
  return sessionId;
}

/** Builds the frozen-schema payload without sending it. Exported for tests. */
export function buildEvent(
  eventName: EventName,
  properties: EventProperties = {},
): TelemetryEvent {
  return {
    session_id: sessionId,
    event_name: eventName,
    timestamp: new Date().toISOString(),
    properties,
  };
}

/**
 * Sends one event. Returns false when telemetry is not configured, the endpoint
 * is not allowlisted, or the browser refused to queue the beacon.
 */
export function sendEvent(
  eventName: EventName,
  properties: EventProperties = {},
): boolean {
  const endpoint = import.meta.env.VITE_TELEMETRY_ENDPOINT;
  if (!endpoint || !isAllowedEndpoint(endpoint)) return false;
  if (typeof navigator === 'undefined' || !navigator.sendBeacon) return false;

  const body = new Blob([JSON.stringify(buildEvent(eventName, properties))], {
    type: 'application/json',
  });
  return navigator.sendBeacon(endpoint, body);
}
