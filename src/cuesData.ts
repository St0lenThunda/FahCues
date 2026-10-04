/**
 * @file cuesData.ts
 * @description Catalog and specifications of custom billiard cues handcrafted by Travis Kloss.
 * Incorporates authentic image assets from the workshop and downloads folder.
 */

import type { CueItem } from './types.ts';

export const CUES_DATA: CueItem[] = [
  {
    id: 'punisher-war-journal',
    title: 'The Punisher: War Journal',
    subtitle: 'Vengeance on the Felt — 360° Vintage Comic Decoupage',
    category: 'comic-wrap',
    image: './images/punisher_surround.jpg',
    gallery: [
      './images/punisher_surround.jpg',
      './images/stock6.jpg'
    ],
    story: 'Engineered for the player who executes every runout with cold, unyielding precision. Crafted using genuine, preserved pages from Marvel’s 1989 Punisher War Journal run, encased under 12 hand-rubbed coats of high-impact UV clear coat with a rock-solid radial pin.',
    specs: {
      jointPin: 'Radial Pin (Solid Brass onto Hard Maple)',
      shaft: '12.5mm Pro Taper Canadian Hard Rock Maple',
      weightOz: 19.0,
      wrap: 'Full 360° Comic Strip Decoupage with Ceramic Shield',
      ferrule: 'Aegis II High-Density Deflection-Dampened',
      tip: 'Kamui Black Medium 9-Layer Leather',
      finish: 'Automotive-Grade Ultra High-Gloss Acrylic Urethane'
    },
    badgeText: 'MARVEL ARSENAL',
    soundEffect: 'crack',
    priceEstimate: 1250
  },
  {
    id: 'jedi-master-lightsaber',
    title: 'The Jedi Master: Skywalker Saber',
    subtitle: 'An Elegant Weapon for a More Civilized Runout',
    category: 'pop-culture',
    image: './images/stock2.jpg',
    gallery: [
      './images/stock2.jpg',
      './images/stock4.jpg'
    ],
    story: 'Turned from custom aluminum billet and dense curly maple, this custom tribute replicates the iconic Luke Skywalker Return of the Jedi hilt with emerald-green textured grip. Balanced with a forward center-of-gravity for effortless draw shots and cue-ball control.',
    specs: {
      jointPin: '3/8 x 10 Aircraft-Grade Stainless Steel',
      shaft: '12.4mm Carbon Fiber Composite Stealth Shaft',
      weightOz: 19.2,
      wrap: 'Machined Grooved Saber Grip with Emerald Anodized Sleeve',
      ferrule: 'Juma High-Impact Low-Mass White',
      tip: 'Predator Victory Soft 8-Layer',
      finish: 'Matte Cerakote & Diamond Satin Clear'
    },
    badgeText: 'LUCASFILM TRIBUTE',
    soundEffect: 'swoosh',
    priceEstimate: 1450
  },
  {
    id: 'golden-age-squadron',
    title: 'The Golden Age 10-Cue Squadron',
    subtitle: 'Championship Felt Showcase — Comic Legends Arrayed',
    category: 'comic-wrap',
    image: './images/stock4.jpg',
    gallery: [
      './images/stock4.jpg',
      './images/stock7.jpg'
    ],
    story: 'The master collection that defined the FahCues legacy. Ten custom tournament-grade butts laid out around the apex cue ball, capturing DC, Marvel, and indie graphic novel panels. Each shaft is hand-seasoned over 18 months for zero warp stability.',
    specs: {
      jointPin: 'Uni-Loc Quick Release & Radial Hybrid Available',
      shaft: 'Torrefied Kielwood & Hard Rock Maple Pair',
      weightOz: 19.4,
      wrap: 'Assorted (Pressed Irish Linen & Comic Inlay)',
      ferrule: 'SABER-T Micro-Mass Synthetic',
      tip: 'Zan Premium Grip Medium',
      finish: 'Triple-Stage Glass Lacquer'
    },
    badgeText: 'MASTER COLLECTION',
    soundEffect: 'pow',
    priceEstimate: 1600
  },
  {
    id: 'workshop-heavyweights',
    title: 'The Gotham & Custom Fluted Lineup',
    subtitle: 'Batman Panels, Fluted Handles & Segmented Maple',
    category: 'exotic-wood',
    image: './images/stock6.jpg',
    gallery: [
      './images/stock6.jpg',
      './images/punisher_surround.jpg'
    ],
    story: 'Fresh off the lathe in the Travis Kloss workshop: from 1960s Batman comic butts to hand-fluted tactical finger-groove handles, floating razor-sharp spliced points, and vibrant neon pink fade butt sleeves. Built for serious pool sharks who love custom craftsmanship.',
    specs: {
      jointPin: '3/8 x 10 Modified Flat-Faced Joint',
      shaft: '12.75mm Conical Taper Curly Birdseye Maple',
      weightOz: 19.5,
      wrap: 'Ergonomic 8-Flute Hand-Chiseled Curly Walnut',
      ferrule: 'Micarta Vintage Ivory Composite',
      tip: 'Moori Medium Pigskin',
      finish: 'Hand-Rubbed Tung Oil & Poly-Gloss Shield'
    },
    badgeText: 'WORKSHOP ORIGINAL',
    soundEffect: 'crack',
    priceEstimate: 1350
  },
  {
    id: 'smokin-eight-break',
    title: 'The Smokin’ Eight Break Weapon',
    subtitle: 'High Kinetic Energy Transfer & Pure Badass Attitude',
    category: 'pop-culture',
    image: './images/stock5.jpg',
    gallery: [
      './images/stock5.jpg',
      './images/stock1.jpg'
    ],
    story: 'Built specifically for earth-shaking break shots that scatter the rack across the four corners. Features the signature FahCues grinning 8-ball chomping a cigar motif embedded directly into the butt cap, with ultra-hard phenolic tip and zero energy dissipation.',
    specs: {
      jointPin: 'Uni-Loc Radial Heavy Pin',
      shaft: '13.0mm Stiff-Taper Rock Maple Break Shaft',
      weightOz: 19.8,
      wrap: 'No-Wrap Glossy Hard Finish for Lightning Stroke Speed',
      ferrule: 'One-Piece Carbon-Phenolic Combo',
      tip: 'Taom 2.0 Break & Jump Tip',
      finish: 'Ceramic Scratch-Proof Armored Gloss'
    },
    badgeText: 'HEAVY ARTILLERY',
    soundEffect: 'pow',
    priceEstimate: 1100
  },
  {
    id: 'tournament-championship-felt',
    title: 'The Tournament Apex Series',
    subtitle: 'Diamond Rail Geometry & Pure Ball Pocketing Purity',
    category: 'exotic-wood',
    image: './images/stock7.jpg',
    gallery: [
      './images/stock7.jpg',
      './images/stock4.jpg'
    ],
    story: 'Photographed live on championship blue cloth right behind the cue ball. Each cue in the Apex series is weight-balanced to within 0.1 ounce of customer preference, delivering dead-true feedback on bank shots, masse curve, and delicate touch rollouts.',
    specs: {
      jointPin: '5/16 x 14 Piloted Stainless Steel Joint',
      shaft: '12.25mm Low-Deflection Hollow-Core Maple',
      weightOz: 18.8,
      wrap: 'Double-Pressed Black with White Spec Irish Linen',
      ferrule: 'G-10 Garolite Low-Deflection',
      tip: 'G2 Medium Japanese Pigskin',
      finish: 'Diamond-Hard Crystal Clear'
    },
    badgeText: 'TOURNAMENT READY',
    soundEffect: 'crack',
    priceEstimate: 1550
  }
];
