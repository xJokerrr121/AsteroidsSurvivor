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

# CI pipeline definition

Cheap budget: Single job: `npm ci && npm run build && npx gh-pages -d dist`; no lint/typecheck/test gates, deploy on every `main` push.

Recommended: Matrix job on Node 20: `npm ci` → `npm run lint` → `npm run typecheck` → `npm run test` → `npm run build` → deploy to GitHub Pages via `actions/deploy-pages`; deploy only on green `main` push or tagged release.
