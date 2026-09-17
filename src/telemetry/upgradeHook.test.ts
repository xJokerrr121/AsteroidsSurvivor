import { describe, expect, it, vi } from 'vitest';
import { emit, off, on } from './upgradeHook';

describe('upgradeHook', () => {
  it('round-trips a typed payload from emit to a subscribed handler', () => {
    const handler = vi.fn();
    on('upgrade_chosen', handler);

    emit('upgrade_chosen', 'fire-rate');

    expect(handler).toHaveBeenCalledWith('fire-rate', undefined);
    off('upgrade_chosen', handler);
  });

  it('carries optional ship-relative world coordinates', () => {
    const handler = vi.fn();
    on('upgrade_chosen', handler);

    emit('upgrade_chosen', 'magnet-radius', { worldX: 480, worldY: 210 });

    expect(handler).toHaveBeenCalledWith('magnet-radius', { worldX: 480, worldY: 210 });
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

    emit('upgrade_chosen', 'max-speed');

    expect(first).toHaveBeenCalledWith('max-speed', undefined);
    expect(second).toHaveBeenCalledWith('max-speed', undefined);
    off('upgrade_chosen', first);
    off('upgrade_chosen', second);
  });
});
