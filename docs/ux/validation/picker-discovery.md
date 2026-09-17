---
aliases: []
date: '2026-09-17'
project: Asteroids Survivor
summary: UX validation of the shipped in-world Rex picker (LevelUpPickerScene) against
  the ≤5s discovery / one-tap / no-scroll criteria from the 2026-09-17 world-picker plan.
tags:
- ux
- validation
- definition
title: UX validation — in-world upgrade picker discovery
type: definition
---

# UX validation — in-world upgrade picker discovery

**Owner:** UX/UI Designer — sign-off outstanding
**Under review:** `src/scenes/LevelUpPickerScene.ts`, launched from
`CoreLoopScene.openPicker()` (`src/core/loop.ts`)
**Plan:** `docs/Plans/2026-09-17-execution-spec-world-picker.md`, steps 9–11

Prepared from the shipped implementation by the coding agent, same pattern as
`docs/security/2026-09-16-xp-skill-review.md`. This is a code-level
compliance check against the three acceptance criteria; an actual timed pass
on a physical mobile device still needs a human UX/UI Designer to run it and
countersign below.

## Criteria and code-level findings

| Criterion | Finding |
| --- | --- |
| Physics pauses on open | `CoreLoopScene.openPicker()` calls `this.scene.pause()` before `this.scene.launch('level-up-picker', …)`; the core loop stops updating (asteroids, bullets, ship) while the picker is up. |
| Renders at world coordinates | `LevelUpPickerScene.create()` centers the three chips on `data.shipX`/`data.shipY` (clamped to stay on-screen), not a fixed HUD position — options appear where the ship is. |
| Three distinct options | `pickThreeUpgrades()` (`src/core/upgrades.ts`) draws 3 of the 4-entry `UPGRADE_POOL` without replacement — always exactly three. |
| Three distinct icons | Each `UpgradeDefinition` has its own `iconTexture` (`icon-damage`, `icon-fire-rate`, `icon-speed`, `icon-magnet`), baked as separate vector textures in `CoreLoopScene.createVectorTextures()` — visually distinct shapes (spike, chevron, double chevron, magnet arc). |
| One-tap selection | Each chip's `Label` is `setInteractive({ useHandCursor: true })` with a single `pointerdown` handler that immediately calls `pick()` — no confirm step, no drag. |
| No scroll / no tooltip hunt | All three chips render simultaneously, laid out on a fixed-radius circle around the ship; there is no scroll container and no hover-only affordance — `pointerdown` is the only interaction the chip listens for. |
| ≤5 s discovery | Not verifiable by static inspection — this requires a human timing a first-time player's actual tap-to-pick latency on a mobile viewport. **Pending.** |

## Pass/fail

- Physics pause, world-coordinate placement, three distinct icons, one-tap
  selection, no-scroll layout: **pass by code inspection.**
- ≤5 s first-pick timing on a real mobile device/viewport: **not yet run —
  outstanding, blocks Gate 2/3 sign-off** per the PR checklist
  (`.github/PULL_REQUEST_TEMPLATE.md`).

## Sign-off

- UX/UI Designer (≤5 s discovery timing, device + viewport, first-pick clarity): _______________________  Date: ____________
