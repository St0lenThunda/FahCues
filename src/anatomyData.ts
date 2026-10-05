/**
 * @file anatomyData.ts
 * @description Educational data for the Interactive Cue Anatomy Explorer.
 * Explains billiard cue physics, materials, and craftsmanship principles in comic book style.
 */

import type { AnatomyPart } from './types.ts';

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'tip-ferrule',
    name: '1. Tip & Ferrule',
    callout: 'CRACK! THE IMPACT ZONE',
    physicsExplanation: 'When cue strikes ball at 15+ mph, maximum energy transfer happens in under 0.001 seconds. The tip holds chalk to generate spin ("english"), while the lightweight ferrule prevents cue squash and absorbs impact shock.',
    materialsUsed: 'Multi-layer Japanese pigskin tips (Kamui, Moori, Zan) seated on micro-mass Aegis II or Juma ferrules.',
    image: './images/anatomy_tip_ferrule.jpg',
    imageAlt: 'Extreme macro of chalked multi-layer leather tip and low-deflection Aegis ferrule on maple shaft'
  },
  {
    id: 'shaft',
    name: '2. Pro Taper Shaft',
    callout: 'SWOOSH! THE FLEX ENGINE',
    physicsExplanation: 'A genuine Pro Taper stays flat and uniform for 12 to 14 inches from the tip, preventing the cue from binding against your bridge hand. Low end-mass minimizes squirt when applying extreme draw or side-spin.',
    materialsUsed: 'Hand-selected Canadian Hard Rock Maple dried and turned in 6 gradual stages over 18 months, or ultra-stiff Torrefied Kielwood.',
    image: './images/anatomy_shaft_taper.jpg',
    imageAlt: 'Silky smooth Canadian Hard Rock Maple pro-taper shaft showing flawless wood grain and straightness'
  },
  {
    id: 'joint',
    name: '3. Joint & Pin Connection',
    callout: 'CLINK! THE ZERO-PLAY CORE',
    physicsExplanation: 'The joint is the acoustic and energetic bridge between both halves of your cue. A tight wood-to-wood or piloted stainless pin produces a crisp, solid feedback hit so you feel every millimeter of cue ball touch.',
    materialsUsed: 'Solid Brass or Stainless Radial Pins, classic 3/8x10 wood threads, or Uni-Loc quick-release collars.',
    image: './images/anatomy_joint_pin.jpg',
    imageAlt: 'Precision uncoupled joint revealing solid brass Radial pin, stainless steel collar, and maple threads'
  },
  {
    id: 'forearm',
    name: '4. Forearm & Splice Points',
    callout: 'KAPOW! STRUCTURAL SOUL',
    physicsExplanation: 'The forearm bears the torque of each stroke. Traditional four-to-six point splices or segmented coring provide immense torsional rigidity to keep the cue straight under the heaviest break strokes.',
    materialsUsed: 'Exotic hardwoods (Gabon Ebony, Bocote, Curly Birdseye Maple) integrated with comic panel decoupaged skins.',
    image: './images/anatomy_forearm_splice.jpg',
    imageAlt: 'Four sharp wood splice points seamlessly framing vintage comic book decoupage under clear epoxy'
  },
  {
    id: 'wrap',
    name: '5. Wrap & Handle Section',
    callout: 'GRIP! STROKE CONTROL',
    physicsExplanation: 'Grip friction must match the player’s hand moisture and stroke speed. Smooth decoupage resin offers lightning-fast stroke release, while double-pressed Irish linen absorbs perspiration during pressure matches.',
    materialsUsed: '100% Comic Book Decoupage sealed in high-impact gloss, genuine double-pressed Irish linen, or hand-chiseled fluted finger channels.',
    image: './images/anatomy_wrap_handle.jpg',
    imageAlt: '360-degree decoupage wrap displaying vibrant comic panels under high-impact automotive gloss'
  },
  {
    id: 'butt-sleeve',
    name: '6. Butt Sleeve & Bumper',
    callout: 'BOOM! THE COUNTER-BALANCE',
    physicsExplanation: 'Houses the internal threaded weight cartridge. Adjusting the weight bolt by 0.2 ounces shifts the balance point toward or away from the bridge hand, customizing the cue’s natural pendulum pivot.',
    materialsUsed: 'Custom comic cast butt caps, aircraft aluminum weight cartridges, and rubber bumpers with quick-lock extension threads.',
    image: './images/anatomy_butt_bumper.jpg',
    imageAlt: 'Cue butt sleeve and bumper with engraved logo cap and internal adjustable balance weight chamber'
  }
];
