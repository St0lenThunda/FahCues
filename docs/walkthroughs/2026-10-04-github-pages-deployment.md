# Walkthrough: GitHub Pages Automated Deployment Pipeline (v0.2.0)

**Date**: 2026-10-04  
**Release**: v0.2.0  
**Repository**: [St0lenThunda/FahCues](https://github.com/St0lenThunda/FahCues)  
**Live Site**: [https://st0lenthunda.github.io/FahCues/](https://st0lenthunda.github.io/FahCues/)  

---

## 1. Overview
This walkthrough covers the configuration and automated deployment of the **FahCues** custom billiard cue showcase to free GitHub Pages hosting using GitHub Actions and Vite relative base path resolution.

---

## 2. Changes Implemented

### A. Relative Base Configuration (`vite.config.ts`)
- Created `vite.config.ts` specifying `base: './'`.
- This ensures that bundle references (`./assets/index-*.js`, `./assets/index-*.css`) and static assets resolve properly relative to the repository subpath `/FahCues/`.

### B. Asset Path Normalization
- Updated image paths in `src/cuesData.ts` and `index.html` from root-absolute (`/images/...`) to relative (`./images/...`).
- Verified that Vite copies `public/images/` to `dist/images/` during build and all assets load with `HTTP 200` on the live domain.

### C. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Configured automated deployment on push to `main`:
  - Checkout repository.
  - Setup Node.js 20 with npm caching.
  - Run `npm ci` and `npm run build` (`tsc && vite build`).
  - Upload `dist` directory via `actions/upload-pages-artifact@v3`.
  - Deploy to GitHub Pages via `actions/deploy-pages@v4`.

### D. Documentation & Badges
- Added live site and deployment status badges to `README.md`.
- Updated `STATUS.md` and `Roadmap.md` with deployment milestones and live links.
- Documented architectural decisions in `ADR-002`.

---

## 3. Verification & Live Status
- **Build Status**: Successful run in 19-23s via GitHub Actions.
- **HTTP Response**: Verified with `curl -sI https://st0lenthunda.github.io/FahCues/` (`HTTP/2 200`).
- **Asset Response**: Verified with `curl -sI https://st0lenthunda.github.io/FahCues/images/punisher_surround.jpg` (`HTTP/2 200`).
- **Typecheck**: `npx tsc --noEmit` clean with 0 errors.
