# ADR-002: GitHub Pages Automated Deployment Pipeline & Relative Base Resolution

**Date**: 2026-10-04  
**Status**: Accepted ✅  
**Context**: Production Deployment and Public Hosting for FahCues Showcase  

---

## 1. Context & Problem Statement
With the initial FahCues portfolio showcase built and verified locally, the site needed a free, robust, automated hosting solution that:
- Deploys automatically on every push to `main` without manual build artifact uploads.
- Handles static asset resolution correctly when served from a GitHub Pages subpath (e.g. `https://st0lenthunda.github.io/FahCues/`) without breaking if migrated to an apex custom domain.
- Requires zero infrastructure hosting fees.

## 2. Decision
1. **Host via GitHub Pages using GitHub Actions**:
   - Adopt the modern GitHub Actions workflow (`actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`) with `build_type: workflow`.
2. **Configure Vite Relative Base Resolution**:
   - Set `base: './'` in `vite.config.ts`.
   - Update catalog data and HTML image references from root-absolute (`/images/...`) to relative paths (`./images/...`).

## 3. Rationale & Analysis
1. **Path Agnosticism**:
   - Root-absolute paths (`/images/...` or `/assets/...`) fail on GitHub Pages project sites because the server serves from the domain root (`st0lenthunda.github.io`) rather than repository subpath (`st0lenthunda.github.io/FahCues/`).
   - Using relative base (`./`) enables the bundled assets to resolve cleanly relative to `index.html` regardless of the deployment path.
2. **Continuous Deployment (CI/CD)**:
   - Automated GitHub Actions build step ensures that `npx tsc --noEmit` and `vite build` run on Ubuntu runners before deployment, preventing broken builds or regressions from being published to the live site.
3. **Zero Maintenance & Free Hosting**:
   - GitHub Pages provides high availability, global CDN distribution via Fastly, and automated SSL/TLS termination at zero operational cost.

## 4. Consequences
- **Positive**: Site is live and accessible globally at `https://st0lenthunda.github.io/FahCues/`. Any future commits to `main` are automatically verified and deployed within 20 seconds.
- **Negative**: Deep sub-routes with HTML5 client-side history pushState (if added in the future) would require a 404.html redirect fallback on GitHub Pages. For the current single-page scroll architecture with hash anchors, this is not an issue.
