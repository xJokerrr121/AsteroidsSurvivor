import { describe, expect, it, vi } from 'vitest';
import { emit, off, on } from './upgradeHook';

describe('upgradeHook', () => {
  it('round-trips a typed payload from emit to a subscribed handler', () => {
    const handler = vi.fn();
    on('upgrade_chosen', handler);

    emit('upgrade_chosen', 'fire-rate');

    expect(handler).toHaveBeenCalledWith('fire-rate');
    off('upgrade_chosen', handler);
  });

  it('stops notifying a handler once it is unsubscribed', () => {
    const handler = vi.fn();
    on('upgrade_chosen', handler);
    off('upgrade_chosen', handler);

    emit('upgrade_chosen', 'shield');

    expect(handler).not.toHaveBeenCalled();
  });

  it('supports multiple independent subscribers', () => {
    const first = vi.fn();
    const second = vi.fn();
    on('upgrade_chosen', first);
    on('upgrade_chosen', second);

    emit('upgrade_chosen', 'ship-speed');

    expect(first).toHaveBeenCalledWith('ship-speed');
    expect(second).toHaveBeenCalledWith('ship-speed');
    off('upgrade_chosen', first);
    off('upgrade_chosen', second);
  });
});
