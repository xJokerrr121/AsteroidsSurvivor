/**
 * Registration/invocation mechanism for the upgrade_chosen hook (ADR-001).
 * A minimal typed emitter over `EventTarget` — no dependency, `on`/`off`/`emit`
 * surface. The core loop calls `emit('upgrade_chosen', upgradeId)`; the beacon
 * mapping layer (and anything else, e.g. a UX validator) subscribes via
 * `on('upgrade_chosen', handler)`.
 *
 * `meta` is an additive, optional third argument (2026-09-16 XP & skill plan)
 * carrying the ship-relative world coordinates of the pick for the beacon
 * payload. It does not change the ADR-001 `(event, upgradeId)` call shape.
 */

export interface UpgradeChosenMeta {
  worldX: number;
  worldY: number;
}

export type UpgradeChosenHandler = (upgradeId: string, meta?: UpgradeChosenMeta) => void;

interface Detail {
  upgradeId: string;
  meta?: UpgradeChosenMeta;
}

const target = new EventTarget();
const wrappers = new WeakMap<UpgradeChosenHandler, EventListener>();

function wrapperFor(handler: UpgradeChosenHandler): EventListener {
  let wrapper = wrappers.get(handler);
  if (!wrapper) {
    wrapper = (event) => {
      const detail = (event as CustomEvent<Detail>).detail;
      handler(detail.upgradeId, detail.meta);
    };
    wrappers.set(handler, wrapper);
  }
  return wrapper;
}

export function on(event: 'upgrade_chosen', handler: UpgradeChosenHandler): void {
  target.addEventListener(event, wrapperFor(handler));
}

export function off(event: 'upgrade_chosen', handler: UpgradeChosenHandler): void {
  target.removeEventListener(event, wrapperFor(handler));
}

export function emit(
  event: 'upgrade_chosen',
  upgradeId: string,
  meta?: UpgradeChosenMeta,
): void {
  target.dispatchEvent(new CustomEvent(event, { detail: { upgradeId, meta } }));
}
