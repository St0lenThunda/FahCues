# ADR-001: Architecture Selection for FahCues Showcase

**Date**: 2026-10-04
**Status**: Accepted ✅
**Context**: Project Genesis Architectural Selection

---

## 1. Context & Problem Statement
The goal is to build an interactive, comic-book styled web application for custom billiard cue maker **Travis Kloss**. The site requires:
- Rapid initial load times and smooth 60fps animations.
- Custom pop-art comic aesthetic (Ben-Day halftones, angled panels, hard drop-shadows, speech bubbles).
- Interactive cue catalog, 3D card perspective tilt, modal blueprints, anatomy breakdown, custom quote estimator, and sound effects.

## 2. Decision
Adopt **Vite + Vanilla TypeScript + Modern CSS3 + Web Audio API** over a full-featured frontend framework (such as React or Next.js).

## 3. Rationale & Analysis
1. **Performance & Footprint**:
   - Zero framework runtime overhead.
   - Production bundle size is under 30kB gzipped compared to 150kB+ for React/Next.
2. **Design Freedom**:
   - Pure CSS3 provides absolute control over custom comic panel filters, halftone radial backgrounds, and layout without fighting utility class limitations or CSS-in-JS abstractions.
3. **Web Audio API**:
   - Synthesizing comic audio hits directly in browser oscillators eliminates audio asset download latency and external file requests.
4. **Modularity & Maintenance**:
   - Clean architectural decomposition (audio, catalog, anatomy, commission, modal, types) keeps every source file well under the 500-line God Component threshold.

## 4. Consequences
- **Positive**: Blazing fast LCP, zero hydration lag, 100% control over animations and audio, frictionless local dev.
- **Negative**: If a multi-step user account or e-commerce cart is introduced later, a lightweight reactive state library (or migration to Vue 3) may be considered.
