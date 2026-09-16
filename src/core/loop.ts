import Phaser from 'phaser';
import { emit as emitUpgradeChosen } from '../telemetry/upgradeHook';
import { playWaveClearFeedback, type UpgradeOption } from './waveClearFeedback';

/**
 * Wave-1 core loop: move-only controls with Newtonian drift, auto-fire, XP
 * from destroyed asteroids, and an upgrade choice on every wave clear. Vector
 * look is drawn at runtime — no image assets, so `img-src 'self' data:` stays
 * satisfied and the bundle stays inside the Step 4 budget.
 */

export const DEATH_EVENT = 'run-death';
export const WAVE_CLEARED_EVENT = 'wave-cleared';

const SHIP_DRAG = 18; // Low drag on purpose: the drift is the Asteroids identity.
const BULLET_SPEED = 520;
const BULLET_LIFETIME_MS = 1400;
const SPAWN_INTERVAL_START_MS = 1400;
const SPAWN_INTERVAL_FLOOR_MS = 420;
const SPAWN_RAMP_PER_SECOND = 14;
const XP_PER_LARGE_ASTEROID = 10;
const XP_PER_SMALL_ASTEROID = 5;
const WAVE_1_XP_TARGET = 60;
const WAVE_XP_TARGET_STEP = 30;

const UPGRADES: readonly UpgradeOption[] = [
  { id: 'fire-rate', label: 'Faster guns', iconTexture: 'icon-fire-rate' },
  { id: 'ship-speed', label: 'Sharper thrust', iconTexture: 'icon-speed' },
  { id: 'shield', label: 'Shield charge', iconTexture: 'icon-shield' },
];

type Keys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

export class CoreLoopScene extends Phaser.Scene {
  private ship!: Phaser.Physics.Arcade.Image;
  private asteroids!: Phaser.Physics.Arcade.Group;
  private bullets!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Keys;
  private timerText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;
  private runStartedAt = 0;
  private lastFiredAt = 0;
  private nextSpawnAt = 0;
  private alive = false;
  private awaitingUpgrade = false;

  private shipAcceleration = 320;
  private shipMaxSpeed = 340;
  private fireIntervalMs = 340;
  private hasShield = false;

  private wave = 1;
  private xp = 0;
  private xpTarget = WAVE_1_XP_TARGET;
  private claimedUpgradeIds = new Set<string>();

  constructor() {
    super('core-loop');
  }

  preload(): void {
    this.createVectorTextures();
  }

  create(): void {
    const { width, height } = this.scale;

    this.ship = this.physics.add.image(width / 2, height / 2, 'ship');
    this.ship.setDamping(false);
    this.ship.setDrag(SHIP_DRAG);
    this.ship.setMaxVelocity(this.shipMaxSpeed);
    this.ship.setCircle(10, 2, 2);

    this.asteroids = this.physics.add.group();
    this.bullets = this.physics.add.group();

    const keyboard = this.input.keyboard!;
    this.cursors = keyboard.createCursorKeys();
    this.keys = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    this.timerText = this.add
      .text(width / 2, 24, '0.0s', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#8ef5c8',
      })
      .setOrigin(0.5, 0);

    this.waveText = this.add
      .text(width / 2, 52, '', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#c9d4e3',
      })
      .setOrigin(0.5, 0);

    this.physics.add.overlap(this.ship, this.asteroids, (_ship, asteroid) =>
      this.hitShip(asteroid as Phaser.Physics.Arcade.Image),
    );
    this.physics.add.overlap(this.bullets, this.asteroids, (bullet, asteroid) => {
      (bullet as Phaser.Physics.Arcade.Image).destroy();
      this.shatter(asteroid as Phaser.Physics.Arcade.Image);
    });

    this.startRun();
  }

  /** Resets the field and starts a fresh run — used on create and on "continue". */
  startRun(): void {
    this.asteroids.clear(true, true);
    this.bullets.clear(true, true);
    this.ship.setPosition(this.scale.width / 2, this.scale.height / 2);
    this.ship.setVelocity(0, 0);
    this.ship.setVisible(true);
    this.ship.setActive(true);
    this.runStartedAt = this.time.now;
    this.lastFiredAt = 0;
    this.nextSpawnAt = this.time.now + SPAWN_INTERVAL_START_MS;
    this.alive = true;
    this.awaitingUpgrade = false;
    this.wave = 1;
    this.xp = 0;
    this.xpTarget = WAVE_1_XP_TARGET;
    this.shipAcceleration = 320;
    this.shipMaxSpeed = 340;
    this.fireIntervalMs = 340;
    this.hasShield = false;
    this.claimedUpgradeIds.clear();
    this.ship.setMaxVelocity(this.shipMaxSpeed);
    this.updateWaveText();
  }

  update(): void {
    if (!this.alive) return;

    const elapsed = this.time.now - this.runStartedAt;
    this.timerText.setText(`${(elapsed / 1000).toFixed(1)}s`);

    this.steer();
    if (!this.awaitingUpgrade) {
      this.autoFire();
      this.spawnAsteroids(elapsed);
    }
    this.wrapAll();
    this.expireBullets();
  }

  private steer(): void {
    const left = this.cursors.left.isDown || this.keys.left.isDown;
    const right = this.cursors.right.isDown || this.keys.right.isDown;
    const up = this.cursors.up.isDown || this.keys.up.isDown;
    const down = this.cursors.down.isDown || this.keys.down.isDown;

    this.ship.setAcceleration(
      (Number(right) - Number(left)) * this.shipAcceleration,
      (Number(down) - Number(up)) * this.shipAcceleration,
    );

    const body = this.ship.body as Phaser.Physics.Arcade.Body;
    if (body.velocity.lengthSq() > 1) {
      this.ship.setRotation(body.velocity.angle() + Math.PI / 2);
    }
  }

  /** Auto-fire at the nearest asteroid — the MVP has no fire input. */
  private autoFire(): void {
    if (this.time.now - this.lastFiredAt < this.fireIntervalMs) return;

    const target = this.nearestAsteroid();
    if (!target) return;

    this.lastFiredAt = this.time.now;
    const bullet = this.physics.add.image(this.ship.x, this.ship.y, 'bullet');
    this.bullets.add(bullet);
    bullet.setData('firedAt', this.time.now);
    this.physics.velocityFromRotation(
      Phaser.Math.Angle.Between(this.ship.x, this.ship.y, target.x, target.y),
      BULLET_SPEED,
      (bullet.body as Phaser.Physics.Arcade.Body).velocity,
    );
  }

  private nearestAsteroid(): Phaser.Physics.Arcade.Image | null {
    let best: Phaser.Physics.Arcade.Image | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const child of this.asteroids.getChildren()) {
      const asteroid = child as Phaser.Physics.Arcade.Image;
      const distance = Phaser.Math.Distance.Between(
        this.ship.x,
        this.ship.y,
        asteroid.x,
        asteroid.y,
      );
      if (distance < bestDistance) {
        bestDistance = distance;
        best = asteroid;
      }
    }
    return best;
  }

  private spawnAsteroids(elapsed: number): void {
    if (this.time.now < this.nextSpawnAt) return;

    const interval = Math.max(
      SPAWN_INTERVAL_FLOOR_MS,
      SPAWN_INTERVAL_START_MS - (elapsed / 1000) * SPAWN_RAMP_PER_SECOND,
    );
    this.nextSpawnAt = this.time.now + interval;
    this.spawnAsteroid(this.edgePosition(), 'asteroid-large');
  }

  private spawnAsteroid(
    at: Phaser.Math.Vector2,
    texture: 'asteroid-large' | 'asteroid-small',
  ): void {
    const asteroid = this.physics.add.image(at.x, at.y, texture);
    this.asteroids.add(asteroid);
    asteroid.setCircle(texture === 'asteroid-large' ? 22 : 11);
    asteroid.setAngularVelocity(Phaser.Math.Between(-60, 60));
    const drift = Phaser.Math.Angle.Between(at.x, at.y, this.ship.x, this.ship.y);
    this.physics.velocityFromRotation(
      drift + Phaser.Math.FloatBetween(-0.5, 0.5),
      Phaser.Math.Between(40, 110),
      (asteroid.body as Phaser.Physics.Arcade.Body).velocity,
    );
  }

  private shatter(asteroid: Phaser.Physics.Arcade.Image): void {
    const isLarge = asteroid.texture.key === 'asteroid-large';
    const { x, y } = asteroid;
    asteroid.destroy();
    this.gainXp(isLarge ? XP_PER_LARGE_ASTEROID : XP_PER_SMALL_ASTEROID);
    if (!isLarge) return;
    for (let i = 0; i < 2; i += 1) {
      this.spawnAsteroid(new Phaser.Math.Vector2(x, y), 'asteroid-small');
    }
  }

  private gainXp(amount: number): void {
    if (this.awaitingUpgrade) return;
    this.xp += amount;
    this.updateWaveText();
    if (this.xp >= this.xpTarget) {
      this.clearWave();
    }
  }

  private updateWaveText(): void {
    this.waveText.setText(`Wave ${this.wave} · XP ${Math.min(this.xp, this.xpTarget)}/${this.xpTarget}`);
  }

  private clearWave(): void {
    this.awaitingUpgrade = true;
    this.asteroids.clear(true, true);
    this.bullets.clear(true, true);

    const upgrade = this.pickUpgrade();
    playWaveClearFeedback(this, this.wave, upgrade, () => this.claimUpgrade(upgrade));
  }

  private pickUpgrade(): UpgradeOption {
    const available = UPGRADES.filter((upgrade) => !this.claimedUpgradeIds.has(upgrade.id));
    const pool = available.length > 0 ? available : UPGRADES;
    return pool[Phaser.Math.Between(0, pool.length - 1)];
  }

  private claimUpgrade(upgrade: UpgradeOption): void {
    this.applyUpgrade(upgrade.id);
    this.claimedUpgradeIds.add(upgrade.id);
    emitUpgradeChosen('upgrade_chosen', upgrade.id);

    this.wave += 1;
    this.xp = 0;
    this.xpTarget += WAVE_XP_TARGET_STEP;
    this.awaitingUpgrade = false;
    this.nextSpawnAt = this.time.now + SPAWN_INTERVAL_START_MS;
    this.updateWaveText();
    this.events.emit(WAVE_CLEARED_EVENT, this.wave - 1);
  }

  private applyUpgrade(upgradeId: string): void {
    switch (upgradeId) {
      case 'fire-rate':
        this.fireIntervalMs = Math.max(140, Math.round(this.fireIntervalMs * 0.85));
        break;
      case 'ship-speed':
        this.shipAcceleration = Math.round(this.shipAcceleration * 1.15);
        this.shipMaxSpeed = Math.round(this.shipMaxSpeed * 1.15);
        this.ship.setMaxVelocity(this.shipMaxSpeed);
        break;
      case 'shield':
        this.hasShield = true;
        break;
      default:
        break;
    }
  }

  private hitShip(asteroid: Phaser.Physics.Arcade.Image): void {
    if (!this.alive) return;
    if (this.hasShield) {
      this.hasShield = false;
      asteroid.destroy();
      return;
    }
    this.endRun();
  }

  private edgePosition(): Phaser.Math.Vector2 {
    const { width, height } = this.scale;
    const margin = 48;
    switch (Phaser.Math.Between(0, 3)) {
      case 0:
        return new Phaser.Math.Vector2(Phaser.Math.Between(0, width), -margin);
      case 1:
        return new Phaser.Math.Vector2(Phaser.Math.Between(0, width), height + margin);
      case 2:
        return new Phaser.Math.Vector2(-margin, Phaser.Math.Between(0, height));
      default:
        return new Phaser.Math.Vector2(width + margin, Phaser.Math.Between(0, height));
    }
  }

  private wrapAll(): void {
    this.physics.world.wrap(this.ship, 16);
    this.physics.world.wrap(this.asteroids, 48);
  }

  private expireBullets(): void {
    for (const child of this.bullets.getChildren()) {
      const bullet = child as Phaser.Physics.Arcade.Image;
      if (this.time.now - (bullet.getData('firedAt') as number) > BULLET_LIFETIME_MS) {
        bullet.destroy();
      }
    }
  }

  private endRun(): void {
    if (!this.alive) return;
    this.alive = false;
    this.ship.setVelocity(0, 0);
    this.ship.setAcceleration(0, 0);
    this.ship.setVisible(false);
    this.ship.setActive(false);
    this.events.emit(DEATH_EVENT, Math.round(this.time.now - this.runStartedAt));
  }

  /** Draws the vector shapes once and bakes them into textures. */
  private createVectorTextures(): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false);

    graphics.lineStyle(2, 0x8ef5c8, 1);
    graphics.strokeTriangle(12, 0, 24, 28, 0, 28);
    graphics.generateTexture('ship', 24, 28);
    graphics.clear();

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(0, 0, 3, 3);
    graphics.generateTexture('bullet', 3, 3);
    graphics.clear();

    this.strokeRock(graphics, 24, 8);
    graphics.generateTexture('asteroid-large', 48, 48);
    graphics.clear();

    this.strokeRock(graphics, 12, 7);
    graphics.generateTexture('asteroid-small', 24, 24);
    graphics.clear();

    this.strokeChevron(graphics);
    graphics.generateTexture('icon-fire-rate', 24, 24);
    graphics.clear();

    this.strokeDoubleChevron(graphics);
    graphics.generateTexture('icon-speed', 24, 24);
    graphics.clear();

    graphics.lineStyle(2, 0x8ef5c8, 1);
    graphics.strokeCircle(12, 12, 10);
    graphics.generateTexture('icon-shield', 24, 24);
    graphics.destroy();
  }

  private strokeRock(
    graphics: Phaser.GameObjects.Graphics,
    radius: number,
    points: number,
  ): void {
    graphics.lineStyle(2, 0xc9d4e3, 1);
    graphics.beginPath();
    for (let i = 0; i <= points; i += 1) {
      const angle = (i / points) * Math.PI * 2;
      const jitter = radius * (i === points ? 1 : Phaser.Math.FloatBetween(0.72, 1));
      const x = radius + Math.cos(angle) * jitter;
      const y = radius + Math.sin(angle) * jitter;
      if (i === 0) graphics.moveTo(x, y);
      else graphics.lineTo(x, y);
    }
    graphics.closePath();
    graphics.strokePath();
  }

  private strokeChevron(graphics: Phaser.GameObjects.Graphics): void {
    graphics.lineStyle(3, 0x8ef5c8, 1);
    graphics.beginPath();
    graphics.moveTo(6, 4);
    graphics.lineTo(18, 12);
    graphics.lineTo(6, 20);
    graphics.strokePath();
  }

  private strokeDoubleChevron(graphics: Phaser.GameObjects.Graphics): void {
    this.strokeChevron(graphics);
    graphics.lineStyle(3, 0x8ef5c8, 1);
    graphics.beginPath();
    graphics.moveTo(2, 4);
    graphics.lineTo(10, 12);
    graphics.lineTo(2, 20);
    graphics.strokePath();
  }
}
