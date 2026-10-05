/**
 * @file commission.ts
 * @description Interactive Custom Cue Commission Estimator and Commercial Intake Engine.
 * Dynamically computes estimated cost and required 50% deposit based on cue anatomy,
 * and transparently displays shop lead times and craft policies.
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
 * Manages the interactive state of the commission form and deposit calculator.
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
   * Calculates required 50% non-refundable deposit.
   */
  public calculateDeposit(): number {
    return Math.round(this.calculateTotal() * 0.5);
  }

  /**
   * Pre-fills the commission configurator with specifications from an inspected cue.
   */
  public prefillWithCueStyle(styleId: string): void {
    const match = STYLES.find((s) => s.id === styleId);
    if (!match) return;

    this.selectedStyle = match.id;
    const radio = document.querySelector<HTMLInputElement>(`input[name="cue-style"][value="${match.id}"]`);
    if (radio) {
      radio.checked = true;
      const allLabels = document.querySelectorAll('.style-choice-card');
      allLabels.forEach((l) => l.classList.remove('selected'));
      radio.closest('.style-choice-card')?.classList.add('selected');
    }
    this.updateTotalDisplay();
  }

  /**
   * Pre-fills the form to claim a specific serialized Vault Drop piece.
   */
  public prefillVaultClaim(cueTitle: string, serialNumber: string, price: number): void {
    const notesEl = document.getElementById('custom-notes') as HTMLTextAreaElement;
    if (notesEl) {
      notesEl.value = `[VAULT DROP INQUIRY] Interested in claiming ${cueTitle} (Serial: ${serialNumber}, Listed: $${price}). Please provide intake instructions.`;
    }
    this.updateTotalDisplay();
  }

  /**
   * Updates the projected total and deposit amounts in the UI.
   */
  private updateTotalDisplay(): void {
    const total = this.calculateTotal();
    const deposit = this.calculateDeposit();

    const priceDisplay = document.getElementById('commission-price-display');
    const depositDisplay = document.getElementById('commission-deposit-display');

    if (priceDisplay) {
      priceDisplay.textContent = `$${total.toLocaleString()}`;
    }
    if (depositDisplay) {
      depositDisplay.textContent = `$${deposit.toLocaleString()}`;
    }
  }

  /**
   * Renders the complete comic commission form template.
   */
  private renderForm(): void {
    const container = document.getElementById('commission-form-container');
    if (!container) return;

    container.innerHTML = `
      <form id="custom-cue-form" class="commission-form">
        <!-- Step 1: Base Aesthetic Style -->
        <fieldset class="form-panel">
          <legend class="panel-legend">1. SELECT DESIGN DISCIPLINE</legend>
          <div class="style-cards-grid">
            ${STYLES.map((s, idx) => `
              <label class="style-choice-card ${idx === 0 ? 'selected' : ''}">
                <input type="radio" name="cue-style" value="${s.id}" ${idx === 0 ? 'checked' : ''} />
                <div class="style-choice-header">
                  <span class="style-title">${s.name}</span>
                  <span class="style-base-price">FROM $${s.basePrice}</span>
                </div>
                <p class="style-desc">${s.description}</p>
              </label>
            `).join('')}
          </div>
        </fieldset>

        <!-- Step 2: Joint & Shaft Selection -->
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

        <!-- Step 4: Collector Contact & Story Details -->
        <div class="form-two-col">
          <fieldset class="form-panel">
            <legend class="panel-legend">6. YOUR CONTACT DETAILS</legend>
            <div class="input-grid">
              <input type="text" id="client-name" class="comic-input" placeholder="Your Full Name / Player Handle *" required />
              <input type="email" id="client-email" class="comic-input" placeholder="Your Email Address *" required />
              <input type="tel" id="client-phone" class="comic-input" placeholder="Phone Number / Instagram Handle (Optional)" />
            </div>
          </fieldset>

          <fieldset class="form-panel">
            <legend class="panel-legend">7. CUSTOM STORY OR COMIC THEME NOTES</legend>
            <textarea id="custom-notes" class="comic-textarea" rows="4" placeholder="Tell us your dream comic series (e.g. 'Punisher vs Daredevil', 'Spawn #1', 'Silver Surfer'), preferred inlay timbers, or tournament weight balance point..."></textarea>
          </fieldset>
        </div>

        <!-- Craftsman Policies Banner -->
        <div class="craft-policies-grid">
          <div class="policy-pill">
            <span class="policy-icon">🛡️</span>
            <div>
              <strong>50% Deposit Architecture</strong>
              <p>50% non-refundable deposit locks your shop lathe slot and funds raw tonewood acquisition.</p>
            </div>
          </div>
          <div class="policy-pill">
            <span class="policy-icon">⏳</span>
            <div>
              <strong>8–10 Week Craft Window</strong>
              <p>Wood stabilization and multi-stage ceramic UV degassing are never rushed.</p>
            </div>
          </div>
          <div class="policy-pill">
            <span class="policy-icon">📦</span>
            <div>
              <strong>Inspection & Dispatch</strong>
              <p>Final balance due only upon high-definition spin & acoustic video hit approval.</p>
            </div>
          </div>
        </div>

        <!-- Price Tally & Submission -->
        <div class="commission-footer-banner">
          <div class="price-callout-dual">
            <div class="price-item">
              <span class="callout-label">PROJECTED CUSTOM ESTIMATE:</span>
              <span id="commission-price-display" class="callout-value">$${this.calculateTotal().toLocaleString()}</span>
            </div>
            <div class="price-item deposit-item">
              <span class="callout-label">50% DEPOSIT TO LOCK BUILD:</span>
              <span id="commission-deposit-display" class="callout-value-deposit">$${this.calculateDeposit().toLocaleString()}</span>
            </div>
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
      const clientName = (container.querySelector('#client-name') as HTMLInputElement)?.value || 'Player';
      const clientEmail = (container.querySelector('#client-email') as HTMLInputElement)?.value || '';
      const notes = (container.querySelector('#custom-notes') as HTMLTextAreaElement)?.value || '';
      const notesSnippet = notes ? ` Note: "${notes.slice(0, 30)}..."` : '';

      const total = this.calculateTotal();
      const deposit = this.calculateDeposit();

      modalManager.showToast(
        'COMMISSION INTAKE TRANSMITTED! 🎱⚡',
        `Thank you ${clientName}! Managing Partner Antonio Moses has received your ${this.selectedWeight}oz build request${notesSnippet} (Estimate: $${total.toLocaleString()} | 50% Deposit: $${deposit.toLocaleString()}). Antonio will contact you at ${clientEmail} within 24 hours with your formal specification blueprint and deposit invoice.`,
        'chime'
      );

      // Reset form fields
      const notesEl = container.querySelector('#custom-notes') as HTMLTextAreaElement;
      if (notesEl) notesEl.value = '';
    });
  }
}
