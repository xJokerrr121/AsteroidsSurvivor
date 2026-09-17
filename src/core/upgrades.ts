import type { Upgrade } from '../persistence/storage';

/**
 * Fixed upgrade pool for the level-up picker. `Upgrade` (id/name/icon) is the
 * persisted shape; `apply` is runtime-only and never touches IndexedDB.
 */

export interface UpgradeEffectContext {
  bulletDamage: number;
  fireIntervalMs: number;
  shipAcceleration: number;
  shipMaxSpeed: number;
  magnetRadius: number;
}

export interface UpgradeDefinition extends Upgrade {
  iconTexture: string;
  apply: (ctx: UpgradeEffectContext) => UpgradeEffectContext;
}

export const UPGRADE_POOL: readonly UpgradeDefinition[] = [
  {
    id: 'damage',
    name: 'Heavier rounds',
    icon: 'damage',
    iconTexture: 'icon-damage',
    apply: (ctx) => ({ ...ctx, bulletDamage: ctx.bulletDamage + 1 }),
  },
  {
    id: 'fire-rate',
    name: 'Faster guns',
    icon: 'fire-rate',
    iconTexture: 'icon-fire-rate',
    apply: (ctx) => ({
      ...ctx,
      fireIntervalMs: Math.max(120, Math.round(ctx.fireIntervalMs * 0.85)),
    }),
  },
  {
    id: 'max-speed',
    name: 'Sharper thrust',
    icon: 'max-speed',
    iconTexture: 'icon-speed',
    apply: (ctx) => ({
      ...ctx,
      shipAcceleration: Math.round(ctx.shipAcceleration * 1.15),
      shipMaxSpeed: Math.round(ctx.shipMaxSpeed * 1.15),
    }),
  },
  {
    id: 'magnet-radius',
    name: 'Wider magnet',
    icon: 'magnet-radius',
    iconTexture: 'icon-magnet',
    apply: (ctx) => ({ ...ctx, magnetRadius: Math.round(ctx.magnetRadius * 1.4) }),
  },
];

/** Picks 3 of the 4 upgrades at random, without replacement. */
export function pickThreeUpgrades(rng: () => number = Math.random): UpgradeDefinition[] {
  const shuffled = [...UPGRADE_POOL];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 3);
}

/**
 * Cumulative XP required to reach `level`. Continues the arithmetic pattern
 * given in the plan (100, 250, 450 — step grows by 50 each level):
 * threshold(n) = 25n(n+3). threshold(1)=100, threshold(2)=250, threshold(3)=450.
 */
export function xpThresholdForLevel(level: number): number {
  return 25 * level * (level + 3);
}
