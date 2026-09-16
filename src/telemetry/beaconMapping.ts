/**
 * Maps persistence's generic store-change hook (and the upgrade_chosen hook)
 * to the four locked beacon events. Persistence stays pure — it only knows
 * "the state changed", never "a wave cleared" or "a session ended"; that
 * translation lives here (Architect boundary from the 2026-09-15 plan).
 */
import { onStateChange, type GameState } from '../persistence/storage';
import { sendEvent } from './beacon';
import { off as offUpgradeChosen, on as onUpgradeChosen } from './upgradeHook';

let previous: GameState | null = null;
let unsubscribeState: (() => void) | null = null;

function handleUpgradeChosen(upgradeId: string): void {
  sendEvent('upgrade_chosen', { upgrade_id: upgradeId });
}

function handleStateChange(next: GameState): void {
  const prev = previous;
  previous = next;
  if (!prev) return;

  if (next.wavesCleared > prev.wavesCleared) {
    sendEvent('wave_cleared', { wave_number: next.wavesCleared });
  }
  if (next.runCount > prev.runCount) {
    sendEvent('session_end', {
      duration_ms: next.lastRunDurationMs,
      high_score_ms: next.highScoreMs,
    });
  }
}

/**
 * Wires the mapping to the persistence hook and the upgrade emitter, and
 * fires `session_start`. Call once at bootstrap with the freshly loaded state.
 */
export function initTelemetryMapping(initialState: GameState): void {
  previous = initialState;
  sendEvent('session_start', { returning: initialState.runCount > 0 });

  unsubscribeState?.();
  unsubscribeState = onStateChange(handleStateChange);

  offUpgradeChosen('upgrade_chosen', handleUpgradeChosen);
  onUpgradeChosen('upgrade_chosen', handleUpgradeChosen);
}
