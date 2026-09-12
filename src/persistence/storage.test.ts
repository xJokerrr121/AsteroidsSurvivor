import { beforeEach, describe, expect, it } from 'vitest';
import { EMPTY_STATE, loadState, recordRun, saveState } from './storage';

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
  });
});
