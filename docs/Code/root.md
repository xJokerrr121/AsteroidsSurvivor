---
aliases: []
area: .
code_hash: 4abd5a2a1ca296a9
source_files:
- eslint.config.js
- vite.config.ts
- vitest.config.ts
summary: This area holds the project's build, lint, and test tooling configuration.
  It defines how source code is checked, compiled for production, and exercised in
  the test runner. The three files are independent of each other but together form
  the
tags: []
title: Code — Project root
type: code
---

# Code — Project root

> Written by an auto-documentation run from the source of 3 of 3 file(s) under `.` in Asteroids Survivor. Re-run auto-document to refresh it after the code changes.

## Responsibility

This area holds the project's build, lint, and test tooling configuration. It defines how source code is checked, compiled for production, and exercised in the test runner. The three files are independent of each other but together form the developer-facing pipeline that runs in CI and locally.

## File breakdown

**eslint.config.js**  
Configures ESLint with the TypeScript ESLint parser and recommended rule sets. It ignores the `dist/` output directory and `node_modules/`, targets ECMAScript 2022 modules, and treats unused variables as errors while allowing parameters prefixed with `_` (a common pattern for intentionally unused callbacks).

**vite.config.ts**  
Configures Vite for production builds. The `base` option is set to `/AsteroidsSurvivor/` by default but can be overridden with the `VITE_BASE_PATH` environment variable — this aligns asset URLs with GitHub Pages hosting under a repository subpath and satisfies a strict CSP `default-src 'self'` policy. The build targets `es2022` and omits sourcemaps.

**vitest.config.ts**  
Configures Vitest to run in a `jsdom` environment (browser-like DOM APIs), loads a shared test setup file at `src/test/setup.ts` before each suite, and discovers test files matching `src/**/*.test.ts`.

## Key configuration objects

Each file exports a single default configuration object consumed by its respective CLI:

- `tseslint.config(...)` — the ESLint flat-config array.
- `defineConfig({ base, build })` — the Vite user config.
- `defineConfig({ test })` — the Vitest user config.

There are no functions or classes to call; the tools read these objects directly.

## Integration with the rest of the project

- **CI / scripts** — The repository's package scripts (not shown here) invoke `eslint`, `vite build`, and `vitest run`; those commands read the configs above.
- **Source code** — `vite.config.ts` determines the public URL prefix that the game's `index.html` and hashed assets will use at runtime. `vitest.config.ts` points at the test setup file inside `src/test/`, which in turn can import project modules for unit tests.
- **Deployment** — The `base` path in Vite must match the GitHub Pages repository name; the default `/AsteroidsSurvivor/` reflects the current repo. Changing the repo name requires updating the env var or the default.

## Files

| File | Read | What it declares |
| --- | --- | --- |
| `eslint.config.js` | yes | `—` |
| `vite.config.ts` | yes | `—` |
| `vitest.config.ts` | yes | `—` |

## Links

- [[Architecture]]
- [[Project]]
