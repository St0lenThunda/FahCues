# Pinned Session Context: FahCues

**Project**: FahCues — Custom Billiard Cues by Travis Kloss
**Status**: Genesis Complete • v0.1.0 Ready • Dev Server Live (`http://localhost:5173/`)

---

## 🎯 What We Built
- **Vite + TypeScript + Vanilla CSS** comic book website tailored for cue maker Travis Kloss.
- **Comic Aesthetics**: Halftone Ben-Day dot background, thick ink borders, comic drop shadows, angled cards, speech bubbles, and Google Fonts (`Bangers`, `Permanent Marker`, `Montserrat`).
- **Web Audio Sound FX Engine**: Synthesizes comic cracks, hits, swooshes, and chimes on button clicks and card inspects.
- **The Cue Arsenal (Interactive Gallery)**: Filterable catalog displaying 6 custom cues with images ingested from `~/Downloads`.
- **High-Res Blueprint Inspector Modal**: Full technical specs, zoomable photography, and quick-commission trigger.
- **Custom Commission Estimator**: Dynamic cost tally ($790 - $1,600+) based on chosen joint pin, shaft type, wrap, and style, with custom comic toast notifications.
- **Interactive Cue Anatomy Explorer**: Physics breakdown of tips, ferrules, joints, forearms, wraps, and butt sleeves with mobile-first reordering.
- **Mobile & Touch Ergonomics**: Horizontal swipeable comic tab bar, minimum 44px tap targets, 16px form inputs (preventing iOS Safari auto-zoom), 0px horizontal overflow, and safe-area-inset toast positioning.
- **Vault Documentation**: 13-folder standardized vault structure initialized in `docs/vault/`.

---

## 📂 Hot Files
- [`index.html`](file:///Users/thunda/Desktop/Development/FahCues/index.html) — Master page structure, semantic layout, SEO meta tags.
- [`src/style.css`](file:///Users/thunda/Desktop/Development/FahCues/src/style.css) — Comic book design system, halftone shaders, responsive grid.
- [`src/main.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/main.ts) — App entrypoint, 3D card tilt physics, event orchestrator.
- [`src/cuesData.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/cuesData.ts) — Cue models, photography links, blueprints and stories.
- [`src/commission.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/commission.ts) — Dynamic price calculator and commission form.
- [`src/audio.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/audio.ts) — Web Audio API sound synthesizer with mute toggle.
- [`src/modal.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/modal.ts) — Accessible modal inspector and toast system (No native dialogs).

---

## 🚀 Key Commands
- `npm run dev`: Launch local Vite dev server (`http://localhost:5173/`).
- `npx tsc --noEmit`: Run strict TypeScript type check.
- `npm run build`: Production bundle compilation.
