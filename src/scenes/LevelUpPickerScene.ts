import Phaser from 'phaser';
import Label from 'phaser3-rex-plugins/templates/ui/label/Label.js';
import RoundRectangle from 'phaser3-rex-plugins/templates/ui/roundrectangle/RoundRectangle.js';
import type { UpgradeDefinition } from '../core/upgrades';

/**
 * In-world level-up picker (`docs/Plans/2026-09-16-execution-spec-xp-skill.md`).
 * Launched on top of the paused `core-loop` scene — its own default camera is
 * the "second camera" the plan calls for: the world stays visible (just
 * paused and dimmed underneath), nothing scrolls with it, and it renders one
 * frame with no scroll offset, so a passed-in world position is also this
 * scene's local position.
 *
 * ≤5s control discovery: three distinct icons, ship-relative, no scroll, no
 * hover-only affordance — a single pointerdown/tap picks and closes it.
 */

export const UPGRADE_PICKED_EVENT = 'upgrade-picked';

export interface UpgradePickedPayload {
  upgrade: UpgradeDefinition;
  worldX: number;
  worldY: number;
}

export interface LevelUpPickerData {
  shipX: number;
  shipY: number;
  options: readonly UpgradeDefinition[];
}

const RADIUS = 96;
const CHIP_WIDTH = 116;
const CHIP_HEIGHT = 84;

export class LevelUpPickerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level-up-picker' });
  }

  create(data: LevelUpPickerData): void {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x05060b, 0.55).setDepth(0);

    const cx = Phaser.Math.Clamp(data.shipX, RADIUS + CHIP_WIDTH / 2, width - RADIUS - CHIP_WIDTH / 2);
    const cy = Phaser.Math.Clamp(data.shipY, RADIUS + CHIP_HEIGHT / 2, height - RADIUS - CHIP_HEIGHT / 2);

    const count = data.options.length;
    data.options.forEach((upgrade, index) => {
      // Spread evenly around the ship, starting straight up.
      const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
      const x = cx + Math.cos(angle) * RADIUS;
      const y = cy + Math.sin(angle) * RADIUS;
      this.createChip(upgrade, x, y, data);
    });
  }

  private createChip(
    upgrade: UpgradeDefinition,
    x: number,
    y: number,
    data: LevelUpPickerData,
  ): void {
    const background = new RoundRectangle(this, 0, 0, CHIP_WIDTH, CHIP_HEIGHT, 10, 0x0b1220, 0.95);
    background.setStrokeStyle(2, 0x8ef5c8);

    const label = new Label(this, {
      x,
      y,
      width: CHIP_WIDTH,
      height: CHIP_HEIGHT,
      background,
      icon: this.add.image(0, 0, upgrade.iconTexture),
      text: this.add.text(0, 0, upgrade.name, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#e8f0f7',
        align: 'center',
        wordWrap: { width: CHIP_WIDTH - 20 },
      }),
      orientation: 'y',
      space: { icon: 6, top: 10, bottom: 10 },
    });
    this.add.existing(label);
    label.setDepth(1).layout();

    label.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      this.pick(upgrade, data);
    });
  }

  private pick(upgrade: UpgradeDefinition, data: LevelUpPickerData): void {
    this.game.events.emit(UPGRADE_PICKED_EVENT, {
      upgrade,
      worldX: data.shipX,
      worldY: data.shipY,
    } satisfies UpgradePickedPayload);
    this.scene.stop();
    this.scene.resume('core-loop');
  }
}
