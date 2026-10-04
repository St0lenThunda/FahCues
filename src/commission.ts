/**
 * @file commission.ts
 * @description Interactive Custom Cue Commission Estimator and Request Engine.
 * Dynamically computes estimated cost based on cue anatomy choices, materials, and joint mechanics.
 */

import { modalManager } from './modal.ts';
import { comicAudio } from './audio.ts';

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
    description: 'Traditional 4 or 6-point floating splices using Birdseye Maple, Gabon Ebony, Cocobolo, or Bocote.',
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
  { id: 'radial', name: 'Radial Pin (Solid Brass onto Hard Maple) — Crisp feel', priceDelta: 50 },
  { id: '3-8-10', name: '3/8 x 10 Modified Flat-Faced Joint — Warm feedback', priceDelta: 40 },
  { id: '5-16-14', name: '5/16 x 14 Piloted Stainless Joint — High acoustics', priceDelta: 60 },
  { id: 'uniloc', name: 'Uni-Loc Quick Release — Rapid breakdown', priceDelta: 75 }
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
 * Manages the interactive state of the commission form.
 */
export class CommissionController {
  private selectedStyle: string = STYLES[0].id;
  private selectedPin: string = JOINT_PINS[0].id;
  private selectedShaft: string = SHAFTS[0].id;
  private selectedWrap: string = WRAPS[0].id;
  private selectedWeight: number = 19.0;

  constructor() {
    this.renderForm();
  }

  /**
   * Calculates the total projected cost based on currently selected configuration.
   */
  public calculateTotal(): number {
    const styleObj = STYLES.find((s) => s.id === this.selectedStyle) || STYLES[0];
    const pinObj = JOINT_PINS.find((p) => p.id === this.selectedPin) || JOINT_PINS[0];
    const shaftObj = SHAFTS.find((s) => s.id === this.selectedShaft) || SHAFTS[0];
    const wrapObj = WRAPS.find((w) => w.id === this.selectedWrap) || WRAPS[0];

    return styleObj.basePrice + pinObj.priceDelta + shaftObj.priceDelta + wrapObj.priceDelta;
  }

  /**
   * Pre-fills the commission configurator with specifications from an inspected cue.
   */
  public prefillWithCueStyle(styleId: string): void {
    const match = STYLES.find((s) => s.id === styleId);
    if (match) {
      this.selectedStyle = match.id;
      const radio = document.querySelector<HTMLInputElement>(`input[name="cue-style"][value="${match.id}"]`);
      if (radio) radio.checked = true;
      this.updateTotalDisplay();
    }
  }

  /**
   * Updates the live price tag in the DOM.
   */
  private updateTotalDisplay(): void {
    const priceEl = document.getElementById('commission-price-display');
    if (priceEl) {
      const total = this.calculateTotal();
      priceEl.textContent = `$${total.toLocaleString()}`;
      priceEl.classList.remove('pulse-tag');
      void priceEl.offsetWidth; // Trigger reflow for animation restart
      priceEl.classList.add('pulse-tag');
    }
  }

  /**
   * Renders the interactive configuration form into #commission-form-container.
   */
  public renderForm(): void {
    const container = document.getElementById('commission-form-container');
    if (!container) return;

    container.innerHTML = `
      <form id="custom-cue-form" class="comic-commission-form">
        <!-- Step 1: Base Cue Style -->
        <fieldset class="form-panel">
          <legend class="panel-legend">1. SELECT BASE WEAPON STYLE</legend>
          <div class="style-cards-grid">
            ${STYLES.map((style, idx) => `
              <label class="style-choice-card ${idx === 0 ? 'selected' : ''}">
                <input type="radio" name="cue-style" value="${style.id}" ${idx === 0 ? 'checked' : ''} />
                <div class="card-inner">
                  <div class="choice-title">${style.name}</div>
                  <div class="choice-desc">${style.description}</div>
                  <div class="choice-price">Base: $${style.basePrice}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </fieldset>

        <!-- Step 2: Mechanics & Joint -->
        <div class="form-two-col">
          <fieldset class="form-panel">
            <legend class="panel-legend">2. JOINT PIN HARDWARE</legend>
            <div class="select-wrapper">
              <select id="select-joint-pin" class="comic-select" aria-label="Joint Pin">
                ${JOINT_PINS.map((p) => `
                  <option value="${p.id}">${p.name} (+$${p.priceDelta})</option>
                `).join('')}
              </select>
            </div>
          </fieldset>

          <fieldset class="form-panel">
            <legend class="panel-legend">3. SHAFT TECHNOLOGY</legend>
            <div class="select-wrapper">
              <select id="select-shaft" class="comic-select" aria-label="Shaft Technology">
                ${SHAFTS.map((s) => `
                  <option value="${s.id}">${s.name} ${s.priceDelta > 0 ? `(+$${s.priceDelta})` : ''}</option>
                `).join('')}
              </select>
            </div>
          </fieldset>
        </div>

        <!-- Step 3: Handle Wrap & Weight -->
        <div class="form-two-col">
          <fieldset class="form-panel">
            <legend class="panel-legend">4. GRIP & WRAP MATERIAL</legend>
            <div class="select-wrapper">
              <select id="select-wrap" class="comic-select" aria-label="Wrap Material">
                ${WRAPS.map((w) => `
                  <option value="${w.id}">${w.name} (+$${w.priceDelta})</option>
                `).join('')}
              </select>
            </div>
          </fieldset>

          <fieldset class="form-panel">
            <legend class="panel-legend">5. WEIGHT SPEC (OUNCES)</legend>
            <div class="weight-control">
              <input type="range" id="weight-slider" min="18.0" max="21.0" step="0.2" value="19.0" class="comic-slider" />
              <div class="weight-value"><span id="weight-display">19.0</span> oz</div>
            </div>
          </fieldset>
        </div>

        <!-- Step 4: Custom Notes & Details -->
        <fieldset class="form-panel">
          <legend class="panel-legend">6. CUSTOM STORY OR COMIC THEME NOTES</legend>
          <textarea id="custom-notes" class="comic-textarea" rows="3" placeholder="Tell Travis your dream comic series (e.g. 'Punisher vs Daredevil', 'Spawn #1', 'Silver Surfer'), favorite inlay woods, or custom tip preferences..."></textarea>
        </fieldset>

        <!-- Price Tally & Submission -->
        <div class="commission-footer-banner">
          <div class="price-callout">
            <span class="callout-label">PROJECTED CUSTOM ESTIMATE:</span>
            <span id="commission-price-display" class="callout-value">$${this.calculateTotal()}</span>
          </div>

          <button type="submit" class="comic-btn btn-primary submit-btn">
            <span class="btn-pow">POW!</span> TRANSMIT COMMISSION REQUEST ⚡
          </button>
        </div>
      </form>
    `;

    this.attachEventListeners(container);
  }

  /**
   * Binds change and submit listeners to the commission form.
   */
  private attachEventListeners(container: HTMLElement): void {
    // Style selection radio buttons
    const styleLabels = container.querySelectorAll<HTMLLabelElement>('.style-choice-card');
    const styleRadios = container.querySelectorAll<HTMLInputElement>('input[name="cue-style"]');
    styleRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        styleLabels.forEach((l) => l.classList.remove('selected'));
        const parentLabel = radio.closest('.style-choice-card');
        parentLabel?.classList.add('selected');
        this.selectedStyle = radio.value;
        comicAudio.playCrack();
        this.updateTotalDisplay();
      });
    });

    // Joint Pin select
    const pinSelect = container.querySelector<HTMLSelectElement>('#select-joint-pin');
    pinSelect?.addEventListener('change', (e) => {
      this.selectedPin = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    // Shaft select
    const shaftSelect = container.querySelector<HTMLSelectElement>('#select-shaft');
    shaftSelect?.addEventListener('change', (e) => {
      this.selectedShaft = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    // Wrap select
    const wrapSelect = container.querySelector<HTMLSelectElement>('#select-wrap');
    wrapSelect?.addEventListener('change', (e) => {
      this.selectedWrap = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    // Weight slider
    const weightSlider = container.querySelector<HTMLInputElement>('#weight-slider');
    const weightDisplay = container.querySelector('#weight-display');
    weightSlider?.addEventListener('input', (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      this.selectedWeight = val;
      if (weightDisplay) weightDisplay.textContent = val.toFixed(1);
    });

    // Form submission
    const form = container.querySelector<HTMLFormElement>('#custom-cue-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const notes = (container.querySelector('#custom-notes') as HTMLTextAreaElement)?.value || '';
      const notesSnippet = notes ? ` Note: "${notes.slice(0, 25)}..."` : '';

      const total = this.calculateTotal();

      modalManager.showToast(
        'COMMISSION TRANSMITTED! 🎱⚡',
        `Travis Kloss received your ${this.selectedWeight}oz build request${notesSnippet} (Est: $${total.toLocaleString()}). Check your email shortly for wood blank and comic selection confirmation!`,
        'chime'
      );

      // Reset notes
      const notesEl = container.querySelector('#custom-notes') as HTMLTextAreaElement;
      if (notesEl) notesEl.value = '';
    });
  }
}
