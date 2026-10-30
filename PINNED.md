# Pinned Session Context: FahCues

> Brand: ⚡ **ASTP - Another Stolen Thunda Product**
**Project**: FahCues — Custom Billiard Cues by Travis Kloss & Antonio Moses  
**Status**: v0.3.0 Shipped • 3-Tier Operating Engine Live • Dev Server: `http://localhost:5173/` • Live Site: `https://st0lenthunda.github.io/FahCues/`

---

## 📌 Pinned Priorities & Backlog
- [ ] **[P1] Direct Payment & Reserve Links for Street Drops (Suggestion 4)**:
  - Add optional `paymentUrl?: string` (Stripe / Square checkout link) to Street batch items.
  - Enable instant remote deposits/payments ($120–$150) so cues don't sit reserved on unverified inquiries.
  - Integrate with local pickup / delivery options.

---

## 🎯 What We Built (Inception to v0.3.0)
- **Vite + TypeScript + Vanilla CSS**: High-octane comic book website tailored for cue maker Travis Kloss and operator Antonio Moses.
- **3-Tier Operational Switcher (`ShopModeManager`)**:
  - `street`: Immediate $120–$150 automotive-grade vinyl car wrap drops (turnkey inventory, zero wait, batch drops).
  - `restomod`: Send-in re-skinning with 360° vintage comic decoupage and 12-coat UV clear ($395–$525).
  - `boutique`: Bespoke 1-of-1 lathe builds from exotic tonewoods with permanent registry provenance ($1,250+).
- **Comic Aesthetics**: Halftone Ben-Day dot background, ink borders, drop shadows, speech bubbles, and Google Fonts (`Bangers`, `Permanent Marker`, `Montserrat`).
- **Web Audio Sound FX Engine**: Synthesizes comic cracks, hits, swooshes, and chimes on button clicks and card inspects.
- **The Cue Arsenal (Interactive Gallery)**: Filterable catalog displaying 6 custom cues with adaptive pricing and badges per mode.
- **High-Res Blueprint Inspector Modal**: Full technical specs, zoomable photography, and quick-commission trigger.
- **Custom Commission & Batch Ordering Engine**: Dynamically shifts between turnkey batch pickup/delivery, mail-in re-skinning intake, and bespoke master commissions.
- **Interactive Cue Anatomy Explorer**: Physics breakdown of tips, ferrules, joints, forearms, wraps, and butt sleeves with synchronized macro photography.
- **Mobile & Touch Ergonomics**: Horizontal swipeable comic tab bar, minimum 44px tap targets, 16px form inputs, and safe-area-inset toast positioning.
- **Strategic Vault Documentation**: 13-folder standardized vault with ADRs, 20 business scenarios, Travis Kloss interview matrices, and pool hall partnership playbooks.
- **ASTP Global Provenance Badge**: Embedded `⚡ ASTP • Another Stolen Thunda Product` badge in footer and documentation.

---

## 📂 Hot Files
- [`index.html`](file:///Users/thunda/Desktop/Development/FahCues/index.html) — Master page structure, 3-mode switcher, semantic layout, ASTP footer badge.
- [`src/shopMode.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/shopMode.ts) — Single Source of Truth orchestrator for `'street' | 'restomod' | 'boutique'`.
- [`src/commission.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/commission.ts) — Controller managing dynamic forms and pricing summaries.
- [`src/commissionTemplates.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/commissionTemplates.ts) — Modular template generators for Street, Restomod, and Boutique intake.
- [`src/cuesData.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/cuesData.ts) — Cue catalog with street, restomod, and boutique price matrices.
- [`src/main.ts`](file:///Users/thunda/Desktop/Development/FahCues/src/main.ts) — App entrypoint, reactive gallery rendering, 3D card tilt physics.
- [`src/style.css`](file:///Users/thunda/Desktop/Development/FahCues/src/style.css) — Comic design system, mode switcher styles, and responsive layout.

---

## 🚀 Key Commands
- `npm run dev`: Launch local Vite dev server (`http://localhost:5173/`).
- `npx tsc --noEmit`: Run strict TypeScript type check.
- `npm run build`: Production bundle compilation.
- `git push origin main --tags`: Deploy latest release to GitHub Pages.
