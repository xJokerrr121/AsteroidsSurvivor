import { defineConfig } from 'vite';

// GitHub Pages serves the project from /<repo>/ — set a matching base so the
// hashed asset URLs resolve under the CSP `default-src 'self'` policy.
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/AsteroidsSurvivor/',
  build: {
    target: 'es2022',
    sourcemap: false,
  },
});
