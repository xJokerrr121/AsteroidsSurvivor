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
}

export const EMPTY_STATE: GameState = {
  highScoreMs: 0,
  lastRunAt: null,
  runCount: 0,
};

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
  } catch {
    // Persistence is best-effort; a run is still playable without it.
  }
}

/** Folds a finished run into the stored state and persists it. */
export async function recordRun(previous: GameState, survivedMs: number): Promise<GameState> {
  const next: GameState = {
    highScoreMs: Math.max(previous.highScoreMs, survivedMs),
    lastRunAt: new Date().toISOString(),
    runCount: previous.runCount + 1,
  };
  await saveState(next);
  return next;
}
