<!--
  QA Engineer's Gate 1-3 PR checklist, per the Locked decision in
  docs/Plans/2026-09-17-execution-spec-world-picker.md ("QA Engineer writes
  Gate 1-3 pass/fail criteria ... to PR checklist"). Every box must be
  checkable against something in the diff or the repo, not a promise.
-->

## Summary

<!-- What changed and why. -->

## Gate 1 — Foundation (schema, session, event bus)

- [ ] `session_id` persists across browser close — `src/persistence/storage.ts`
      `loadOrCreateSessionId()` reads/writes IndexedDB, not per-tab memory.
- [ ] JS bundle stays inside the Lighthouse budget: `resource-summary:script:size`
      ≤ 170 kB gzipped (`lighthouse-budgets.json`, `lighthouserc.json`).
- [ ] Event-bus contract unchanged or extended in place — `upgrade_chosen` is
      still `(event, upgradeId, meta?)` per ADR-001
      (`docs/ADRs/adr-001-registration-invocation.md`); no new emit/subscribe
      shape introduced.
- [ ] Telemetry schema freeze respected — `docs/telemetry-schema.json` is
      unchanged, or the PR carries a new dated freeze note explaining why it
      had to move.

## Gate 2 — Picker UX

- [ ] Picker offers exactly three options with three distinct icons, no
      scroll/tooltip hunt, single-tap selection.
- [ ] Control discovery measured at ≤5 s on a mobile viewport — result
      recorded in `docs/ux/validation/`.

## Gate 3 — Core loop

- [ ] Wave/level clears without pausing the run (`this.physics.pause()` only
      opens the picker, never blocks progression on its own).
- [ ] `DEATH_EVENT` still fires exactly once per run on ship/asteroid overlap.
- [ ] Difficulty scales with playtime (elapsed run time), not player
      level/XP.

## Verification run

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test:unit`
- [ ] `npm run build` (confirms the Lighthouse budget input exists)

## Security / privacy

- [ ] No new telemetry identifiers added beyond the frozen schema.
- [ ] No new data leaves the device outside `navigator.sendBeacon()` to the
      allowlisted endpoint.
