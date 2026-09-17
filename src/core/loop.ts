import Phaser from 'phaser';
import type { Upgrade } from '../persistence/storage';
import { UPGRADE_PICKED_EVENT, type UpgradePickedPayload } from '../scenes/LevelUpPickerScene';
import { emit as emitUpgradeChosen } from '../telemetry/upgradeHook';
import { pickThreeUpgrades, xpThresholdForLevel } from './upgrades';

/**
 * Core loop: move-only controls with Newtonian drift, auto-fire, XP orbs
 * dropped from shattered asteroids, and a level-up picker on fixed XP
 * thresholds (`docs/Plans/2026-09-16-execution-spec-xp-skill.md`). Vector
 * look is drawn at runtime — no image assets, so `img-src 'self' data:` stays
 * satisfied and the bundle stays inside the Step 4 budget.
 */

export const DEATH_EVENT = 'run-death';
/** Fired on every level-up. Kept as `wave_cleared` downstream (persistence +
 * beacon) — same closed four-event schema, "wave" now means "level". */
export const WAVE_CLEARED_EVENT = 'wave-cleared';
export const UPGRADE_APPLIED_EVENT = 'upgrade-applied';

const SHIP_DRAG = 18; // Low drag on purpose: the drift is the Asteroids identity.
const BULLET_SPEED = 520;
const BULLET_LIFETIME_MS = 1400;
const SPAWN_INTERVAL_START_MS = 1400;
const SPAWN_INTERVAL_FLOOR_MS = 420;
const SPAWN_RAMP_PER_SECOND = 14;
const XP_ORB_MIN = 10;
const XP_ORB_MAX = 25;
const ORB_PULL_SPEED = 260;

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
  private xpOrbs!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Keys;
  private timerText!: Phaser.GameObjects.Text;
  private hudText!: Phaser.GameObjects.Text;
  private runStartedAt = 0;
  private lastFiredAt = 0;
  private nextSpawnAt = 0;
  private alive = false;

  private shipAcceleration = 320;
  private shipMaxSpeed = 340;
  private fireIntervalMs = 340;
  private bulletDamage = 1;
  private magnetRadius = 70;

  private level = 1;
  private xp = 0;

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
    this.xpOrbs = this.physics.add.group();

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

    this.hudText = this.add
      .text(width / 2, 52, '', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#c9d4e3',
      })
      .setOrigin(0.5, 0);

    this.physics.add.overlap(this.ship, this.asteroids, () => this.endRun());
    this.physics.add.overlap(this.bullets, this.asteroids, (bullet, asteroid) =>
      this.hitAsteroid(
        bullet as Phaser.Physics.Arcade.Image,
        asteroid as Phaser.Physics.Arcade.Image,
      ),
    );
    this.physics.add.overlap(this.ship, this.xpOrbs, (_ship, orb) =>
      this.collectOrb(orb as Phaser.Physics.Arcade.Image),
    );

    this.game.events.on(UPGRADE_PICKED_EVENT, this.handleUpgradePicked, this);

    this.startRun();
  }

  /** Resets the field and starts a fresh run — used on create and on "continue". */
  startRun(): void {
    this.asteroids.clear(true, true);
    this.bullets.clear(true, true);
    this.xpOrbs.clear(true, true);
    this.ship.setPosition(this.scale.width / 2, this.scale.height / 2);
    this.ship.setVelocity(0, 0);
    this.ship.setVisible(true);
    this.ship.setActive(true);
    this.runStartedAt = this.time.now;
    this.lastFiredAt = 0;
    this.nextSpawnAt = this.time.now + SPAWN_INTERVAL_START_MS;
    this.alive = true;
    this.level = 1;
    this.xp = 0;
    this.shipAcceleration = 320;
    this.shipMaxSpeed = 340;
    this.fireIntervalMs = 340;
    this.bulletDamage = 1;
    this.magnetRadius = 70;
    this.ship.setMaxVelocity(this.shipMaxSpeed);
    this.updateHud();
  }

  update(): void {
    if (!this.alive) return;

    const elapsed = this.time.now - this.runStartedAt;
    this.timerText.setText(`${(elapsed / 1000).toFixed(1)}s`);

    this.steer();
    this.autoFire();
    this.spawnAsteroids(elapsed);
    this.pullOrbs();
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
    asteroid.setData('hp', texture === 'asteroid-large' ? 2 : 1);
    asteroid.setAngularVelocity(Phaser.Math.Between(-60, 60));
    const drift = Phaser.Math.Angle.Between(at.x, at.y, this.ship.x, this.ship.y);
    this.physics.velocityFromRotation(
      drift + Phaser.Math.FloatBetween(-0.5, 0.5),
      Phaser.Math.Between(40, 110),
      (asteroid.body as Phaser.Physics.Arcade.Body).velocity,
    );
  }

  private hitAsteroid(
    bullet: Phaser.Physics.Arcade.Image,
    asteroid: Phaser.Physics.Arcade.Image,
  ): void {
    bullet.destroy();
    const hp = (asteroid.getData('hp') as number) - this.bulletDamage;
    if (hp > 0) {
      asteroid.setData('hp', hp);
      return;
    }
    this.shatter(asteroid);
  }

  private shatter(asteroid: Phaser.Physics.Arcade.Image): void {
    const isLarge = asteroid.texture.key === 'asteroid-large';
    const { x, y } = asteroid;
    asteroid.destroy();
    this.spawnXpOrb(x, y, Phaser.Math.Between(XP_ORB_MIN, XP_ORB_MAX));
    if (!isLarge) return;
    for (let i = 0; i < 2; i += 1) {
      this.spawnAsteroid(new Phaser.Math.Vector2(x, y), 'asteroid-small');
    }
  }

  private spawnXpOrb(x: number, y: number, value: number): void {
    const orb = this.physics.add.image(x, y, 'xp-orb');
    this.xpOrbs.add(orb);
    orb.setCircle(4);
    orb.setData('value', value);
  }

  /** Pulls any XP orb inside `magnetRadius` toward the ship. */
  private pullOrbs(): void {
    for (const child of this.xpOrbs.getChildren()) {
      const orb = child as Phaser.Physics.Arcade.Image;
      const body = orb.body as Phaser.Physics.Arcade.Body;
      const distance = Phaser.Math.Distance.Between(this.ship.x, this.ship.y, orb.x, orb.y);
      if (distance <= this.magnetRadius) {
        const angle = Phaser.Math.Angle.Between(orb.x, orb.y, this.ship.x, this.ship.y);
        this.physics.velocityFromRotation(angle, ORB_PULL_SPEED, body.velocity);
      } else {
        body.setVelocity(0, 0);
      }
    }
  }

  private collectOrb(orb: Phaser.Physics.Arcade.Image): void {
    const value = orb.getData('value') as number;
    orb.destroy();
    this.gainXp(value);
  }

  private gainXp(amount: number): void {
    this.xp += amount;
    this.updateHud();
    if (this.xp >= xpThresholdForLevel(this.level)) {
      this.level += 1;
      this.updateHud();
      this.openPicker();
    }
  }

  private updateHud(): void {
    this.hudText.setText(`Level ${this.level} · XP ${this.xp}/${xpThresholdForLevel(this.level)}`);
  }

  private openPicker(): void {
    const options = pickThreeUpgrades();
    this.scene.pause();
    this.scene.launch('level-up-picker', {
      shipX: this.ship.x,
      shipY: this.ship.y,
      options,
    });
  }

  private handleUpgradePicked = (payload: UpgradePickedPayload): void => {
    const next = payload.upgrade.apply({
      bulletDamage: this.bulletDamage,
      fireIntervalMs: this.fireIntervalMs,
      shipAcceleration: this.shipAcceleration,
      shipMaxSpeed: this.shipMaxSpeed,
      magnetRadius: this.magnetRadius,
    });
    this.bulletDamage = next.bulletDamage;
    this.fireIntervalMs = next.fireIntervalMs;
    this.shipAcceleration = next.shipAcceleration;
    this.shipMaxSpeed = next.shipMaxSpeed;
    this.magnetRadius = next.magnetRadius;
    this.ship.setMaxVelocity(this.shipMaxSpeed);

    emitUpgradeChosen('upgrade_chosen', payload.upgrade.id, {
      worldX: payload.worldX,
      worldY: payload.worldY,
    });

    // Avoid a burst-spawn / instant-refire catch-up after the pause.
    this.nextSpawnAt = this.time.now + SPAWN_INTERVAL_START_MS;
    this.lastFiredAt = this.time.now;

    this.events.emit(WAVE_CLEARED_EVENT, this.level);
    this.events.emit(UPGRADE_APPLIED_EVENT, {
      id: payload.upgrade.id,
      name: payload.upgrade.name,
      icon: payload.upgrade.icon,
    } satisfies Upgrade);
  };

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
    this.physics.world.wrap(this.xpOrbs, 8);
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

    graphics.fillStyle(0x8ef5c8, 1);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('xp-orb', 8, 8);
    graphics.clear();

    this.strokeRock(graphics, 24, 8);
    graphics.generateTexture('asteroid-large', 48, 48);
    graphics.clear();

    this.strokeRock(graphics, 12, 7);
    graphics.generateTexture('asteroid-small', 24, 24);
    graphics.clear();

    this.strokeSpike(graphics);
    graphics.generateTexture('icon-damage', 24, 24);
    graphics.clear();

    this.strokeChevron(graphics);
    graphics.generateTexture('icon-fire-rate', 24, 24);
    graphics.clear();

    this.strokeDoubleChevron(graphics);
    graphics.generateTexture('icon-speed', 24, 24);
    graphics.clear();

    this.strokeMagnet(graphics);
    graphics.generateTexture('icon-magnet', 24, 24);
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

  private strokeSpike(graphics: Phaser.GameObjects.Graphics): void {
    graphics.lineStyle(3, 0x8ef5c8, 1);
    graphics.beginPath();
    graphics.moveTo(12, 2);
    graphics.lineTo(12, 22);
    graphics.moveTo(6, 8);
    graphics.lineTo(12, 2);
    graphics.lineTo(18, 8);
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

  private strokeMagnet(graphics: Phaser.GameObjects.Graphics): void {
    graphics.lineStyle(3, 0x8ef5c8, 1);
    graphics.beginPath();
    graphics.arc(12, 13, 8, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(0), true);
    graphics.strokePath();
    graphics.lineStyle(3, 0x8ef5c8, 1);
    graphics.beginPath();
    graphics.moveTo(4, 13);
    graphics.lineTo(4, 20);
    graphics.moveTo(20, 13);
    graphics.lineTo(20, 20);
    graphics.strokePath();
  }
}
