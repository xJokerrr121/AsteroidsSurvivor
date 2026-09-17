---
aliases: []
date: '2026-09-11'
meeting_id: b67ab027
project: Asteroids Survivor
summary: 'Expert recommendation: Add a GitHub Actions step running Lighthouse CI (headless
  Chrome) with budgets: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped;
  fail PR on any regression.'
tags:
- definition
title: Performance budget & Core Web Vitals guardrails in CI
type: definition
updated: '2026-09-11T12:48:56.676365'
---

# Performance Budget & Core Web Vitals Guardrails in CI

**Purpose:** Document the CI-enforced performance budgets that must pass for every PR.

## Recommended CI Step

Add a GitHub Actions step that runs **Lighthouse CI** (headless Chrome) with the following budgets:

| Metric | Budget |
|--------|--------|
| LCP (Largest Contentful Paint) | ≤ 2.5 s |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |
| INP (Interaction to Next Paint) | ≤ 200 ms |
| Total JavaScript (gzipped) | ≤ 170 kB |

**Gate behavior:** Fail the PR on any regression against these budgets.

## Links

- [[Project]]
- [[Index]]
- [[2026-09-11-name-runtime]]
