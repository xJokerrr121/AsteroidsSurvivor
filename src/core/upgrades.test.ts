import { describe, expect, it } from 'vitest';
import { pickThreeUpgrades, UPGRADE_POOL, xpThresholdForLevel } from './upgrades';

describe('pickThreeUpgrades', () => {
  it('returns exactly 3 of the 4 pool entries, no duplicates', () => {
    const picked = pickThreeUpgrades(() => 0.5);

    expect(picked).toHaveLength(3);
    expect(new Set(picked.map((u) => u.id)).size).toBe(3);
    for (const upgrade of picked) {
      expect(UPGRADE_POOL.map((u) => u.id)).toContain(upgrade.id);
    }
  });

  it('can select every pool entry across a deterministic rng sweep', () => {
    const seen = new Set<string>();
    for (const value of [0, 0.24, 0.49, 0.74, 0.99]) {
      for (const upgrade of pickThreeUpgrades(() => value)) {
        seen.add(upgrade.id);
      }
    }
    expect(seen.size).toBe(UPGRADE_POOL.length);
  });
});

describe('xpThresholdForLevel', () => {
  it('matches the three thresholds given in the plan', () => {
    expect(xpThresholdForLevel(1)).toBe(100);
    expect(xpThresholdForLevel(2)).toBe(250);
    expect(xpThresholdForLevel(3)).toBe(450);
  });

  it('continues the pattern with an increasing step', () => {
    expect(xpThresholdForLevel(4)).toBe(700);
    expect(xpThresholdForLevel(5)).toBe(1000);
  });
});
