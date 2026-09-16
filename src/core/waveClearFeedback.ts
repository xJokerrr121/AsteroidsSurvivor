import Phaser from 'phaser';

/**
 * Juicy wave-clear moment. Deliberately not a pause screen: the field is
 * already clear when a wave completes (that's the clear condition), the ship
 * keeps drifting, and there is no full-screen overlay — just a camera pop and
 * a HUD banner the player taps once to claim the upgrade.
 */

export interface UpgradeOption {
  id: string;
  label: string;
  iconTexture: string;
}

const BANNER_WIDTH = 360;
const BANNER_HEIGHT = 96;
const SLIDE_MS = 220;

/** Plays the wave-clear beat and resolves once the player claims the upgrade. */
export function playWaveClearFeedback(
  scene: Phaser.Scene,
  waveNumber: number,
  upgrade: UpgradeOption,
  onClaim: () => void,
): void {
  const { width } = scene.scale;

  scene.cameras.main.flash(180, 142, 245, 200);
  scene.cameras.main.shake(160, 0.006);

  const banner = scene.add.container(width / 2, -BANNER_HEIGHT).setDepth(100);

  const background = scene.add
    .rectangle(0, 0, BANNER_WIDTH, BANNER_HEIGHT, 0x0b1220, 0.92)
    .setStrokeStyle(2, 0x8ef5c8);

  const icon = scene.add.image(-BANNER_WIDTH / 2 + 34, 0, upgrade.iconTexture);

  const title = scene.add
    .text(-BANNER_WIDTH / 2 + 64, -18, `Wave ${waveNumber} cleared`, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#8ef5c8',
    })
    .setOrigin(0, 0.5);

  const label = scene.add
    .text(-BANNER_WIDTH / 2 + 64, 10, upgrade.label, {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#e8f0f7',
    })
    .setOrigin(0, 0.5);

  const prompt = scene.add
    .text(BANNER_WIDTH / 2 - 16, 0, 'TAP TO CLAIM', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#8ef5c8',
    })
    .setOrigin(1, 0.5);

  banner.add([background, icon, title, label, prompt]);
  background.setInteractive({ useHandCursor: true });

  scene.tweens.add({
    targets: banner,
    y: 96,
    duration: SLIDE_MS,
    ease: 'Back.easeOut',
  });

  let claimed = false;
  const claim = (): void => {
    if (claimed) return;
    claimed = true;
    background.disableInteractive();
    scene.tweens.add({
      targets: banner,
      y: -BANNER_HEIGHT,
      duration: SLIDE_MS,
      ease: 'Back.easeIn',
      onComplete: () => banner.destroy(),
    });
    onClaim();
  };

  background.on('pointerdown', claim);
}
