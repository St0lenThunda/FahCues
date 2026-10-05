/**
 * @file commissionData.ts
 * @description Configuration options and pricing data for the FahCues Commission and Restomod engines.
 * Separated to prevent God Component bloat and maintain modular architecture.
 */

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

export interface ComponentOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface RestomodOption {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
}

/**
 * Boutique Bespoke Styles (Built from scratch with tonewoods)
 */
export const STYLES: StyleOption[] = [
  {
    id: 'comic-decoupage',
    name: 'Vintage Comic Decoupage',
    description: 'Authentic 1970s–1990s comic book panels laminated directly into the cue forearm & butt under 12 layers of crystal resin.',
    basePrice: 850
  },
  {
    id: 'exotic-points',
    name: 'Exotic Hardwood Spliced Points',
    description: 'Traditional 4 or 6-point floating splices using Birdseye Maple, Gabon Ebony, Cocobolo, or Purpleheart.',
    basePrice: 950
  },
  {
    id: 'pop-tribute',
    name: 'Pop-Culture / Saber Tribute',
    description: 'Machined aircraft-grade aluminum accents, laser-cut emblems, and character-inspired grips (e.g. Lightsaber hilt).',
    basePrice: 1050
  },
  {
    id: 'stealth-pure',
    name: 'Stealth Tactical Predator',
    description: 'Matte Cerakote armor finish, carbon fiber shaft, and minimalist high-impact aesthetics.',
    basePrice: 790
  }
];

export const JOINT_PINS: ComponentOption[] = [
  { id: 'radial', name: 'Radial Pin (Solid Brass onto Hard Maple) — Crisp acoustic hit', priceDelta: 50 },
  { id: '3-8-10', name: '3/8 x 10 Modified Flat-Faced Joint — Warm solid feedback', priceDelta: 40 },
  { id: '5-16-14', name: '5/16 x 14 Piloted Stainless Joint — High-energy click', priceDelta: 60 },
  { id: 'uniloc', name: 'Uni-Loc Quick Release — Rapid tournament breakdown', priceDelta: 75 }
];

export const SHAFTS: ComponentOption[] = [
  { id: 'hard-maple', name: '12.5mm Pro Taper Canadian Hard Rock Maple (Standard)', priceDelta: 0 },
  { id: 'carbon-fiber', name: '12.4mm Carbon Fiber Composite (Zero Squirt & Ultra-Stiff)', priceDelta: 280 },
  { id: 'kielwood', name: '12.5mm Torrefied Kielwood Roasted Maple (Silky Stroke)', priceDelta: 220 }
];

export const WRAPS: ComponentOption[] = [
  { id: 'comic-wrap', name: 'Full 360° Comic Book Decoupage with Glass Armor', priceDelta: 120 },
  { id: 'irish-linen', name: 'Double-Pressed Irish Linen (Black with White Specks)', priceDelta: 60 },
  { id: 'leather', name: 'Full-Grain Embossed Leather Wrap (Black / Cognac)', priceDelta: 140 },
  { id: 'fluted-bare', name: 'Hand-Chiseled 8-Flute Finger Grooves (No Wrap)', priceDelta: 160 }
];

/**
 * Restomod Options (Customer mail-in or donor blanks)
 */
export const RESTOMOD_SOURCES: RestomodOption[] = [
  {
    id: 'mail-in',
    name: 'I Am Mailing In My Own Cue (BYOW)',
    description: 'Send your trusted playing cue to Central PA. Travis strips the old clear coat, hand-applies comic decoupage, and seals in 12 coats of high-impact resin.',
    priceDelta: 395
  },
  {
    id: 'donor-blank',
    name: 'FahCues Supplies Tournament Donor Cue',
    description: 'We supply a brand new, zero-runout tested Canadian maple tournament cue (Players/Lucky foundation), customized and clear-coated from fresh wood.',
    priceDelta: 515
  }
];

export const RESTOMOD_COVERAGE: RestomodOption[] = [
  {
    id: 'handle-wrap',
    name: 'Handle / Grip Section (360° Decoupage)',
    description: 'Transforms your grip section into a comic masterpiece while keeping original forearm wood.',
    priceDelta: 0
  },
  {
    id: 'forearm-points',
    name: 'Forearm & Points Zone',
    description: 'Comic panels applied from joint collar down to wrap with dynamic floating points.',
    priceDelta: 50
  },
  {
    id: 'full-sleeve',
    name: 'Full 360° Master Sleeve (Forearm + Butt + Handle)',
    description: 'Complete end-to-end transformation. Your cue becomes an unbroken graphic novel weapon.',
    priceDelta: 100
  }
];

export const RESTOMOD_FINISHES: RestomodOption[] = [
  {
    id: 'high-gloss',
    name: '12-Coat Automotive UV High-Gloss Shield',
    description: 'Mirror-finish reflection with deep comic panel optical pop and UV yellowing protection.',
    priceDelta: 0
  },
  {
    id: 'ceramic-shield',
    name: 'Ceramic Diamond Scratch Armor',
    description: 'Micro-hardness additive infused into final coats for extreme pool hall wear resistance.',
    priceDelta: 35
  }
];
