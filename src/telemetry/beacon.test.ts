import { afterEach, describe, expect, it, vi } from 'vitest';
import { ALLOWED_ENDPOINT_HOSTS, buildEvent, getSessionId, sendEvent, setSessionId } from './beacon';

const ENDPOINT = 'https://stats.plausible.io/api/event';

function stubBeacon(): ReturnType<typeof vi.fn> {
  const sendBeacon = vi.fn(() => true);
  vi.stubGlobal('navigator', { sendBeacon });
  return sendBeacon;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('buildEvent', () => {
  it('matches the schema shape', () => {
    const event = buildEvent('session_end', { duration_ms: 91_200 });

    expect(Object.keys(event).sort()).toEqual([
      'event_name',
      'properties',
      'session_id',
      'timestamp',
    ]);
    expect(event.session_id).toBe(getSessionId());
    expect(event.event_name).toBe('session_end');
    expect(new Date(event.timestamp).toISOString()).toBe(event.timestamp);
    expect(event.properties).toEqual({ duration_ms: 91_200 });
  });
});

describe('sendEvent', () => {
  it('sends to an allowlisted https endpoint', () => {
    const sendBeacon = stubBeacon();
    vi.stubEnv('VITE_TELEMETRY_ENDPOINT', ENDPOINT);

    expect(sendEvent('session_start', { returning: false })).toBe(true);
    expect(sendBeacon).toHaveBeenCalledWith(ENDPOINT, expect.any(Blob));
  });

  it.each([
    'https://evil.example.com/collect',
    'http://stats.plausible.io/api/event',
    'https://plausible.io.evil.example/collect',
    'not-a-url',
  ])('drops the beacon for %s', (endpoint) => {
    const sendBeacon = stubBeacon();
    vi.stubEnv('VITE_TELEMETRY_ENDPOINT', endpoint);

    expect(sendEvent('session_end', {})).toBe(false);
    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('no-ops when telemetry is not configured', () => {
    const sendBeacon = stubBeacon();
    vi.stubEnv('VITE_TELEMETRY_ENDPOINT', '');

    expect(sendEvent('wave_cleared', {})).toBe(false);
    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('keeps the allowlist aligned with the CSP connect-src', () => {
    expect([...ALLOWED_ENDPOINT_HOSTS]).toEqual(['plausible.io', 'umami.is']);
  });
});

describe('setSessionId', () => {
  it('overrides the id every subsequent event carries', () => {
    const original = getSessionId();
    setSessionId('persisted-uuid');

    expect(getSessionId()).toBe('persisted-uuid');
    expect(buildEvent('session_start').session_id).toBe('persisted-uuid');

    setSessionId(original);
  });
});
