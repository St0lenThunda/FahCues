# Change Log: FahCues

All notable changes to this project will be documented in this file following the Keep a Changelog format.

## [0.3.0] - 2026-10-30

### Added
- **3-Tier Operational Engine**: Created dynamic `ShopModeManager` supporting `street` ($120–$150 turnkey batch drops), `restomod` ($395–$525 send-in re-skins), and `boutique` ($1,250+ 1-of-1 Vault Drops).
- **Street Wraps Batch Order System**: Built turnkey batch ordering form (`getStreetFormHtml`) with local PA pickup vs. ground shipping options.
- **Top Bar & Sticky HUD Switchers**: Responsive mode switcher buttons and mid-page sticky comic-issue banner controls.
- **Pool Hall Partnership Playbook**: Formulated consignment, tournament demo night, and league sponsorship strategy in `docs/vault/05 - Sales & Outreach/pool-hall-partnership-playbook.md`.
- **ASTP Global Brand Compliance**: Embedded signature `⚡ ASTP • Another Stolen Thunda Product` provenance badge into application footer, README, and project status docs.

### Changed
- Expanded `cuesData.ts` with `streetPrice` fields across all catalog items.
- Updated `main.ts` gallery cards to display adaptive badges, pricing rows, and button calls-to-action per operational mode.
- Synchronized partner profile copy to reflect Travis's car-wrap vinyl craftsmanship and Antonio's batch fulfillment stewardship.

## [0.2.0] - 2026-10-04

### Added
- **GitHub Pages CI/CD Workflow**: Automated deployment pipeline using GitHub Actions (`.github/workflows/deploy.yml`) on pushes to `main`.
- **Vite Relative Base Pathing**: Configured `base: './'` in `vite.config.ts` for subpath and custom domain compatibility.
- **Architectural Documentation**: Created ADR-002 covering hosting decision and relative asset resolution.
- **Live Status Badges**: Added live site URL, GitHub Actions status badges, and documentation links to `README.md`.
- **Release Walkthrough**: Created comprehensive deployment walkthrough in `docs/walkthroughs/2026-10-04-github-pages-deployment.md`.

### Changed
- Converted catalog image references in `src/cuesData.ts` and `index.html` from root-absolute (`/images/`) to relative (`./images/`).
- Updated `STATUS.md` and `Roadmap.md` to reflect production deployment milestones.

## [0.1.0] - 2026-10-04

### Added
- **Project Genesis**: Initialized Vite + TypeScript repository with educational code style and strict typechecking.
- **Asset Ingestion**: Ingested 9 cue photographs and original artwork from `~/Downloads` into `public/images/`.
- **Comic Pop-Art Design System**: Halftone Ben-Day dot screens, comic ink borders, hard offset shadows, and Google Fonts (`Bangers`, `Permanent Marker`, `Montserrat`, `Comic Neue`).
- **Web Audio Sound Synthesizer**: Pure Web Audio oscillators for ball cracks, comic POW punches, swooshes, and chimes with persistent mute toggle.
- **The Cue Arsenal**: Filterable gallery featuring 6 custom cues with 3D cursor tilt physics and quick specs badges.
- **Blueprint Inspector Modal**: High-res imagery with zoom, comprehensive craftsmanship specifications, and prefill commission button.
- **Interactive Cue Anatomy Explorer**: 6-zone interactive diagram detailing cue physics and master tonewood materials.
- **Custom Commission Estimator**: Live dynamic price calculator ($790 - $1,600+) with custom in-app comic toast notifications.
- **Mobile Touch Ergonomics**: Horizontal swipeable comic pill navigation, 44px tap targets, 16px iOS-safe inputs, and safe-area insets.
- **Vault Documentation & ADR**: 13-folder standardized Obsidian Vault, ADR-001, and technical walkthrough.
