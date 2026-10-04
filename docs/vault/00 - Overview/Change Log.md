# Change Log: FahCues

All notable changes to this project will be documented in this file following the Keep a Changelog format.

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
