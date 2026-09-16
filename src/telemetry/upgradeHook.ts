/**
 * Registration/invocation mechanism for the upgrade_chosen hook (ADR-001).
 * A minimal typed emitter over `EventTarget` — no dependency, `on`/`off`/`emit`
 * surface. The core loop calls `emit('upgrade_chosen', upgradeId)`; the beacon
 * mapping layer (and anything else, e.g. a UX validator) subscribes via
 * `on('upgrade_chosen', handler)`.
 */

export type UpgradeChosenHandler = (upgradeId: string) => void;

const target = new EventTarget();
const wrappers = new WeakMap<UpgradeChosenHandler, EventListener>();

function wrapperFor(handler: UpgradeChosenHandler): EventListener {
  let wrapper = wrappers.get(handler);
  if (!wrapper) {
    wrapper = (event) => handler((event as CustomEvent<string>).detail);
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

export function emit(event: 'upgrade_chosen', upgradeId: string): void {
  target.dispatchEvent(new CustomEvent(event, { detail: upgradeId }));
}
