/**
 * @file types.ts
 * @description Core TypeScript interfaces and domain types for the FahCues application.
 * Defines the shape of custom billiard cues, commission options, and interactive anatomy components.
 */

/**
 * Filter categories for the cue showcase gallery.
 */
export type CueCategory = 'all' | 'comic-wrap' | 'pop-culture' | 'exotic-wood';

/**
 * Detailed technical specifications of a custom billiard cue.
 */
export interface CueSpecs {
  /** The joint threading standard connecting shaft to butt (e.g., 'Radial Pin', '3/8 x 10') */
  jointPin: string;
  /** Shaft wood type, taper geometry, and tip diameter */
  shaft: string;
  /** Cue weight in ounces */
  weightOz: number;
  /** Grip and wrap material (e.g., 'Authentic Comic Decoupage', 'Pressed Irish Linen') */
  wrap: string;
  /** Ferrule composite material */
  ferrule: string;
  /** Tip leather brand and hardness grade */
  tip: string;
  /** Protective finish and resin type */
  finish: string;
}

/**
 * Represents a single custom handcrafted cue in the Travis Kloss catalog.
 */
export interface CueItem {
  /** Unique slug identifier for routing and modal lookups */
  id: string;
  /** Comic-styled display name of the cue */
  title: string;
  /** Punchy comic subtitle */
  subtitle: string;
  /** Category bucket for filtering */
  category: CueCategory;
  /** Path to primary display image */
  image: string;
  /** Array of secondary gallery images or detail crops */
  gallery: string[];
  /** Narrative description written in comic book voice */
  story: string;
  /** Precise technical craftsmanship specs */
  specs: CueSpecs;
  /** Comic badge ribbon text (e.g. 'MARVEL CLASSIC', 'ONE-OF-A-KIND') */
  badgeText: string;
  /** Comic onomatopoeia sound triggered on click (e.g. 'POW!', 'CRACK!') */
  soundEffect: 'crack' | 'pow' | 'swoosh' | 'ding';
  /** Base starting value or commission estimate */
  priceEstimate: number;
  /** Unique permanent serial number for registry provenance (e.g. FC-2026-001) */
  serialNumber: string;
  /** Serialized Drop edition label (e.g. 'VAULT DROP #001') */
  dropEdition: string;
  /** Availability status for immediate purchase or custom queue */
  dropStatus: 'available' | 'reserved' | 'commission-only';
  /** Required 50% non-refundable deposit to lock build slot */
  depositAmount: number;
  /** Restomod Re-Skin estimate when customer provides base cue */
  restomodPrice?: number;
  /** Restomod 50% bench deposit */
  restomodDeposit?: number;
  /** Restomod edition or service tag */
  restomodTag?: string;
}

/**
 * Operational model of the FahCues workshop for demoing to Travis Kloss:
 * - 'restomod': Current simpler reality — Bring Your Own Weapon (BYOW) re-skinning, resurfacing, 10–14 day turnaround, $395–$525 pricing.
 * - 'boutique': Step-up boutique production — Full 1-of-1 bespoke builds, tonewood curing, radial joints, 8–10 week turnaround, $1,250+ pricing.
 */
export type ShopMode = 'restomod' | 'boutique';

/**
 * Options chosen in the Custom Cue Commission Estimator.
 */
export interface CommissionConfig {
  /** Core visual design theme */
  style: string;
  /** Joint pin mechanics */
  jointPin: string;
  /** Shaft technology and material */
  shaft: string;
  /** Handle grip wrap */
  wrap: string;
  /** Weight in ounces */
  weightOz: number;
  /** Custom collector or comic story notes */
  notes: string;
}

/**
 * Represents a highlighted segment in the interactive Cue Anatomy explorer.
 */
export interface AnatomyPart {
  /** Unique key */
  id: string;
  /** Display title */
  name: string;
  /** Comic caption / onomatopoeia callout */
  callout: string;
  /** Plain English explanation of how this part affects shot mechanics */
  physicsExplanation: string;
  /** Materials Travis Kloss employs for this component */
  materialsUsed: string;
  /** High-resolution visual schematic or macro photo path */
  image: string;
  /** Descriptive alt tag for accessibility and comic labeling */
  imageAlt: string;
}
