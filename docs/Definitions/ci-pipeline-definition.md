---
aliases: []
date: '2026-09-11'
meeting_id: b67ab027
project: Asteroids Survivor
summary: 'Cheap budget: Single job: `npm ci && npm run build && npx gh-pages -d dist`;
  no lint/typecheck/test gates, deploy on every `main` push.'
tags:
- definition
title: CI pipeline definition
type: definition
updated: '2026-09-11T12:48:56.413832'
---

# CI Pipeline Definition

This note defines the two CI pipeline configurations used in the project: a minimal "cheap budget" option and a full "recommended" matrix job. The recommended pipeline is gated by the project's three-gate scaffold, with repo+CI ownership assigned to the Lead Engineer per [[three-gates-block-scaffold-two-assigned-repo-ci]].

## Cheap Budget (Single Job)

- Runs on every push to `main`
- Single job: `npm ci && npm run build && npx gh-pages -d dist`
- No lint, typecheck, or test gates
- Deploys directly to GitHub Pages

## Recommended (Matrix Job on Node 20)

- Runs on green `main` push or tagged release only
- Matrix job on Node 20 with sequential steps:
  1. `npm ci`
  2. `npm run lint`
  3. `npm run typecheck`
  4. `npm run test`
  5. `npm run build`
- Deploys to GitHub Pages via `actions/deploy-pages`

## Links

- [[Project]]
- [[Index]]
- [[2026-09-11-name-runtime]]
