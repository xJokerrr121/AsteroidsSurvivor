import { afterEach, describe, expect, it, vi } from 'vitest';
import { EMPTY_STATE, recordRun, recordWaveClear, saveState } from '../persistence/storage';
import * as beacon from './beacon';
import { initTelemetryMapping } from './beaconMapping';
import { emit } from './upgradeHook';

afterEach(async () => {
  vi.restoreAllMocks();
  await saveState({ ...EMPTY_STATE });
});

describe('initTelemetryMapping', () => {
  it('fires session_start immediately with the returning flag', async () => {
    const sendEvent = vi.spyOn(beacon, 'sendEvent');

    initTelemetryMapping({ ...EMPTY_STATE, runCount: 2 });

    expect(sendEvent).toHaveBeenCalledWith('session_start', { returning: true });
  });

  it('maps a wave-clear state change to wave_cleared', async () => {
    const sendEvent = vi.spyOn(beacon, 'sendEvent');
    const initial = await recordWaveClear({ ...EMPTY_STATE }, 0);
    initTelemetryMapping(initial);

    await recordWaveClear(initial, 1);

    expect(sendEvent).toHaveBeenCalledWith('wave_cleared', { wave_number: 1 });
  });

  it('maps a run-ended state change to session_end with duration', async () => {
    const sendEvent = vi.spyOn(beacon, 'sendEvent');
    const initial = { ...EMPTY_STATE };
    initTelemetryMapping(initial);

    await recordRun(initial, 45_000);

    expect(sendEvent).toHaveBeenCalledWith('session_end', {
      duration_ms: 45_000,
      high_score_ms: 45_000,
    });
  });

  it('maps an upgrade_chosen emission to the upgrade_chosen beacon event', () => {
    const sendEvent = vi.spyOn(beacon, 'sendEvent');
    initTelemetryMapping({ ...EMPTY_STATE });

    emit('upgrade_chosen', 'fire-rate');

    expect(sendEvent).toHaveBeenCalledWith('upgrade_chosen', { upgrade_id: 'fire-rate' });
  });
});
