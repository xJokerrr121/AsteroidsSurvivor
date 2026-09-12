import Phaser from 'phaser';
import { DEATH_EVENT, GameScene } from './game/GameScene';
import { loadState, recordRun, type GameState } from './persistence/storage';
import { sendEvent } from './telemetry/beacon';

const GAME_WIDTH = 960;
const GAME_HEIGHT = 600;

function element<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node as T;
}

function formatSeconds(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

async function bootstrap(): Promise<void> {
  let state: GameState = await loadState();

  sendEvent('session_start', { returning: state.runCount > 0 });

  const overlay = element<HTMLDivElement>('game-over');
  const summary = element<HTMLParagraphElement>('game-over-summary');
  const best = element<HTMLParagraphElement>('game-over-best');
  const continueButton = element<HTMLButtonElement>('continue-button');

  const scene = new GameScene();
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game-root',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#05060b',
    physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 } } },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene,
  });

  // `scene.events` only exists once the scene manager has booted the scene.
  game.events.once(Phaser.Core.Events.READY, () => {
    scene.events.on(DEATH_EVENT, onDeath);
  });

  function onDeath(survivedMs: number): void {
    void (async () => {
      state = await recordRun(state, survivedMs);
      sendEvent('death', {
        survived_ms: survivedMs,
        high_score_ms: state.highScoreMs,
      });
      summary.textContent = `You survived ${formatSeconds(survivedMs)}.`;
      best.textContent = `Best: ${formatSeconds(state.highScoreMs)} · Runs: ${state.runCount}`;
      overlay.hidden = false;
      continueButton.focus();
    })();
  }

  continueButton.addEventListener('click', () => {
    sendEvent('continue_click', { high_score_ms: state.highScoreMs });
    overlay.hidden = true;
    scene.startRun();
  });

  // Keep the canvas sized to the viewport without stretching the play field.
  window.addEventListener('resize', () => game.scale.refresh());
}

void bootstrap();
