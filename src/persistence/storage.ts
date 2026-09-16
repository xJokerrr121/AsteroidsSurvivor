/**
 * Local persistence. IndexedDB only — nothing leaves the device unless the
 * player takes an explicit action (telemetry is the one declared exception and
 * carries no identifiers; see `docs/security/threat-model-indexeddb-beacon.md`).
 */

const DB_NAME = 'asteroids-survivor';
const DB_VERSION = 1;
const STORE = 'game-state';

/** Keys written by the MVP increment. Documented in `docs/ux/core-loop-flow.md`. */
export const STATE_KEY = 'run-state';

export interface GameState {
  /** Best survival time in milliseconds. */
  highScoreMs: number;
  /** ISO 8601 timestamp of the last run that ended. */
  lastRunAt: string | null;
  /** Total runs finished on this device. */
  runCount: number;
  /** Highest wave number cleared on this device. */
  wavesCleared: number;
  /** Duration of the run that just ended, in milliseconds. */
  lastRunDurationMs: number;
}

export const EMPTY_STATE: GameState = {
  highScoreMs: 0,
  lastRunAt: null,
  runCount: 0,
  wavesCleared: 0,
  lastRunDurationMs: 0,
};

const changeTarget = new EventTarget();

/**
 * Generic store-change hook. Fires with the full new state after every
 * successful write — no event semantics here, callers decide what a change
 * means (see `src/telemetry/beaconMapping.ts`).
 */
export function onStateChange(handler: (state: GameState) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<GameState>).detail);
  changeTarget.addEventListener('change', listener);
  return () => changeTarget.removeEventListener('change', listener);
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** Reads the stored state. Returns EMPTY_STATE on a first visit or any failure. */
export async function loadState(): Promise<GameState> {
  try {
    const db = await openDb();
    const stored = await new Promise<GameState | undefined>((resolve, reject) => {
      const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(STATE_KEY);
      request.onsuccess = () => resolve(request.result as GameState | undefined);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return { ...EMPTY_STATE, ...stored };
  } catch {
    return { ...EMPTY_STATE };
  }
}

/** Writes the state. Silently no-ops when IndexedDB is unavailable (private mode). */
export async function saveState(state: GameState): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(state, STATE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    changeTarget.dispatchEvent(new CustomEvent('change', { detail: state }));
  } catch {
    // Persistence is best-effort; a run is still playable without it.
  }
}

/** Folds a finished run into the stored state and persists it. */
export async function recordRun(previous: GameState, survivedMs: number): Promise<GameState> {
  const next: GameState = {
    ...previous,
    highScoreMs: Math.max(previous.highScoreMs, survivedMs),
    lastRunAt: new Date().toISOString(),
    runCount: previous.runCount + 1,
    lastRunDurationMs: survivedMs,
  };
  await saveState(next);
  return next;
}

/** Folds a wave clear into the stored state and persists it. */
export async function recordWaveClear(previous: GameState, waveNumber: number): Promise<GameState> {
  const next: GameState = {
    ...previous,
    wavesCleared: Math.max(previous.wavesCleared, waveNumber),
  };
  await saveState(next);
  return next;
}
