/**
 * @file vite.config.ts
 * @description Vite configuration for FahCues portfolio.
 * Configured with relative base path ('./') to ensure static assets resolve
 * properly whether deployed to GitHub Pages subpath (e.g., /FahCues/) or a custom domain.
 */

import { defineConfig } from 'vite';

export default defineConfig({
  /**
   * By using relative base ('./'), built asset URLs (JS, CSS, images) in index.html
   * will be relative to the index.html location rather than the server root.
   * This guarantees seamless hosting on GitHub Pages project sites (https://username.github.io/repo-name/).
   */
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});
