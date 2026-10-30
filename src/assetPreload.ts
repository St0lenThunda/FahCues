/**
 * @file assetPreload.ts
 * @description Utility for asynchronously preloading critical catalog and macro imagery.
 * Prevents visual pops during tab/mode transitions and ensures snappy 60fps rendering.
 *
 * Implements the Triple-Threat Principle: Single Purpose, Pure Modularity, and Zero Overhead.
 */

/**
 * Asynchronously preloads an array of image source paths into browser cache.
 * 
 * @param imagePaths - Array of image URLs/paths to preheat
 */
export function preloadImages(imagePaths: string[]): void {
  // Use requestIdleCallback or immediate execution based on browser environment
  const schedulePreload = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));

  schedulePreload(() => {
    imagePaths.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  });
}

