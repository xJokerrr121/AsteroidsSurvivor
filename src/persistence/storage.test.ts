import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addToCurrentBuild,
  EMPTY_STATE,
  loadCurrentBuild,
  loadOrCreateSessionId,
  loadState,
  onStateChange,
  recordRun,
  recordWaveClear,
  resetCurrentBuild,
  saveState,
} from './storage';

beforeEach(async () => {
  await saveState({ ...EMPTY_STATE });
});

describe('game state persistence', () => {
  it('starts empty on a first visit', async () => {
    expect(await loadState()).toEqual(EMPTY_STATE);
  });

  it('writes high score, last run timestamp and run count on death', async () => {
    const after = await recordRun(await loadState(), 91_200);

    expect(after.highScoreMs).toBe(91_200);
    expect(after.runCount).toBe(1);
    expect(after.lastRunAt).not.toBeNull();
    expect(await loadState()).toEqual(after);
  });

  it('keeps the best run across subsequent deaths', async () => {
    const first = await recordRun(await loadState(), 91_200);
    const second = await recordRun(first, 42_000);

    expect(second.highScoreMs).toBe(91_200);
    expect(second.runCount).toBe(2);
    expect(second.lastRunDurationMs).toBe(42_000);
  });

  it('tracks the highest wave cleared', async () => {
    const first = await recordWaveClear(await loadState(), 1);
    const second = await recordWaveClear(first, 2);
    const stale = await recordWaveClear(second, 1);

    expect(stale.wavesCleared).toBe(2);
  });

  it('notifies the generic change hook on every write', async () => {
    const handler = vi.fn();
    const unsubscribe = onStateChange(handler);

    const next = await recordRun(await loadState(), 12_000);

    expect(handler).toHaveBeenCalledWith(next);
    unsubscribe();
  });
});

describe('session_id persistence', () => {
  it('mints a UUID once and returns the same one on every later call', async () => {
    const first = await loadOrCreateSessionId();
    const second = await loadOrCreateSessionId();

    expect(first).toMatch(/^[0-9a-f-]{36}$/i);
    expect(second).toBe(first);
  });
});

describe('currentBuild', () => {
  beforeEach(async () => {
    await resetCurrentBuild();
  });

  it('starts empty', async () => {
    expect(await loadCurrentBuild()).toEqual([]);
  });

  it('appends picks in order for the current run', async () => {
    await addToCurrentBuild({ id: 'fire-rate', name: 'Faster guns', icon: 'fire-rate' });
    const build = await addToCurrentBuild({ id: 'damage', name: 'Heavier rounds', icon: 'damage' });

    expect(build.map((u) => u.id)).toEqual(['fire-rate', 'damage']);
  });

  it('is wiped by resetCurrentBuild', async () => {
    await addToCurrentBuild({ id: 'magnet-radius', name: 'Wider magnet', icon: 'magnet-radius' });
    await resetCurrentBuild();

    expect(await loadCurrentBuild()).toEqual([]);
  });
});
