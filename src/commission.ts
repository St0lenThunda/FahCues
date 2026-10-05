/**
 * @file commission.ts
 * @description Interactive Cue Commission Controller and Commercial Intake Engine.
 * Dynamically switches between:
 * 1. 'restomod' mode: Bring Your Own Weapon (BYOW) re-skinning, 10–14 days, $395–$650.
 * 2. 'boutique' mode: Full bespoke 1-of-1 lathe builds, 8–10 weeks, $1,050–$1,600+.
 *
 * Implements the Triple-Threat Principle: Single Source of Truth, Modularity, and Efficiency.
 */

import { modalManager } from './modal.ts';
import { comicAudio } from './audio.ts';
import { shopModeManager } from './shopMode.ts';
import {
  STYLES,
  JOINT_PINS,
  SHAFTS,
  WRAPS,
  RESTOMOD_SOURCES,
  RESTOMOD_COVERAGE,
  RESTOMOD_FINISHES
} from './commissionData.ts';
import {
  getRestomodFormHtml,
  getBoutiqueFormHtml
} from './commissionTemplates.ts';

export {
  STYLES,
  JOINT_PINS,
  SHAFTS,
  WRAPS,
  RESTOMOD_SOURCES,
  RESTOMOD_COVERAGE,
  RESTOMOD_FINISHES
};

/**
 * Manages the interactive state of the commission form and deposit calculator.
 */
export class CommissionController {
  // Boutique state
  private selectedStyle: string = STYLES[0].id;
  private selectedPin: string = JOINT_PINS[0].id;
  private selectedShaft: string = SHAFTS[0].id;
  private selectedWrap: string = WRAPS[0].id;
  private selectedWeight: number = 19.0;

  // Restomod state
  private selectedRestomodSource: string = RESTOMOD_SOURCES[0].id;
  private selectedRestomodCoverage: string = RESTOMOD_COVERAGE[0].id;
  private selectedRestomodFinish: string = RESTOMOD_FINISHES[0].id;

  constructor() {
    shopModeManager.subscribe(() => {
      this.renderForm();
    });
    this.renderForm();
  }

  /**
   * Calculates total projected cost based on current mode and selections.
   */
  public calculateTotal(): number {
    const mode = shopModeManager.getMode();
    if (mode === 'restomod') {
      const sourceObj = RESTOMOD_SOURCES.find((s) => s.id === this.selectedRestomodSource) || RESTOMOD_SOURCES[0];
      const coverageObj = RESTOMOD_COVERAGE.find((c) => c.id === this.selectedRestomodCoverage) || RESTOMOD_COVERAGE[0];
      const finishObj = RESTOMOD_FINISHES.find((f) => f.id === this.selectedRestomodFinish) || RESTOMOD_FINISHES[0];
      return sourceObj.priceDelta + coverageObj.priceDelta + finishObj.priceDelta;
    }

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
   * Pre-fills the form to claim or inquire about a specific cue.
   */
  public prefillVaultClaim(cueTitle: string, serialNumber: string, price: number): void {
    const notesEl = document.getElementById('custom-notes') as HTMLTextAreaElement;
    const mode = shopModeManager.getMode();
    if (notesEl) {
      if (mode === 'restomod') {
        notesEl.value = `[RESTOMOD INQUIRY] Interested in a custom re-skin transformation inspired by ${cueTitle} (${serialNumber}). Please provide mail-in shipping tube instructions.`;
      } else {
        notesEl.value = `[VAULT DROP INQUIRY] Interested in claiming ${cueTitle} (Serial: ${serialNumber}, Listed: $${price}). Please provide deposit invoice and dispatch schedule.`;
      }
    }
    this.updateTotalDisplay();
  }

  /**
   * Updates projected total and deposit amounts in the UI.
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
   * Renders the complete commission form according to active ShopMode.
   */
  private renderForm(): void {
    const container = document.getElementById('commission-form-container');
    if (!container) return;

    const mode = shopModeManager.getMode();
    const total = this.calculateTotal();
    const deposit = this.calculateDeposit();

    if (mode === 'restomod') {
      container.innerHTML = getRestomodFormHtml(total, deposit);
      this.attachRestomodEventListeners(container);
    } else {
      container.innerHTML = getBoutiqueFormHtml(total, deposit);
      this.attachBoutiqueEventListeners(container);
    }
  }

  /**
   * Binds change and submit listeners to the Restomod form.
   */
  private attachRestomodEventListeners(container: HTMLElement): void {
    const sourceRadios = container.querySelectorAll<HTMLInputElement>('input[name="restomod-source"]');
    const sourceCards = container.querySelectorAll<HTMLLabelElement>('.style-choice-card');
    sourceRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        sourceCards.forEach((c) => c.classList.remove('selected'));
        radio.closest('.style-choice-card')?.classList.add('selected');
        this.selectedRestomodSource = radio.value;
        comicAudio.playCrack();
        this.updateTotalDisplay();
      });
    });

    const coverageSelect = container.querySelector<HTMLSelectElement>('#select-restomod-coverage');
    coverageSelect?.addEventListener('change', (e) => {
      this.selectedRestomodCoverage = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    const finishSelect = container.querySelector<HTMLSelectElement>('#select-restomod-finish');
    finishSelect?.addEventListener('change', (e) => {
      this.selectedRestomodFinish = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    const form = container.querySelector<HTMLFormElement>('#custom-cue-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = (container.querySelector('#client-name') as HTMLInputElement)?.value || 'Player';
      const clientEmail = (container.querySelector('#client-email') as HTMLInputElement)?.value || '';
      const total = this.calculateTotal();
      const deposit = this.calculateDeposit();

      modalManager.showToast(
        'RESTOMOD BENCH RESERVED! 🎱🔧',
        `Thank you ${clientName}! Managing Partner Antonio Moses has received your Restomod intake request (Estimate: $${total.toLocaleString()} | 50% Deposit: $${deposit.toLocaleString()} | Lead Time: 10–14 Days). Antonio will email your PVC mail-in tube guide and deposit link to ${clientEmail} within 24 hours.`,
        'chime'
      );
    });
  }

  /**
   * Binds change and submit listeners to the Boutique form.
   */
  private attachBoutiqueEventListeners(container: HTMLElement): void {
    const styleLabels = container.querySelectorAll<HTMLLabelElement>('.style-choice-card');
    const styleRadios = container.querySelectorAll<HTMLInputElement>('input[name="cue-style"]');
    styleRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        styleLabels.forEach((l) => l.classList.remove('selected'));
        radio.closest('.style-choice-card')?.classList.add('selected');
        this.selectedStyle = radio.value;
        comicAudio.playCrack();
        this.updateTotalDisplay();
      });
    });

    const pinSelect = container.querySelector<HTMLSelectElement>('#select-joint-pin');
    pinSelect?.addEventListener('change', (e) => {
      this.selectedPin = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    const shaftSelect = container.querySelector<HTMLSelectElement>('#select-shaft');
    shaftSelect?.addEventListener('change', (e) => {
      this.selectedShaft = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    const wrapSelect = container.querySelector<HTMLSelectElement>('#select-wrap');
    wrapSelect?.addEventListener('change', (e) => {
      this.selectedWrap = (e.target as HTMLSelectElement).value;
      comicAudio.playSwoosh();
      this.updateTotalDisplay();
    });

    const weightSlider = container.querySelector<HTMLInputElement>('#weight-slider');
    const weightDisplay = container.querySelector('#weight-display');
    weightSlider?.addEventListener('input', (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      this.selectedWeight = val;
      if (weightDisplay) weightDisplay.textContent = val.toFixed(1);
    });

    const form = container.querySelector<HTMLFormElement>('#custom-cue-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = (container.querySelector('#client-name') as HTMLInputElement)?.value || 'Player';
      const clientEmail = (container.querySelector('#client-email') as HTMLInputElement)?.value || '';
      const total = this.calculateTotal();
      const deposit = this.calculateDeposit();

      modalManager.showToast(
        'COMMISSION INTAKE TRANSMITTED! 🎱⚡',
        `Thank you ${clientName}! Managing Partner Antonio Moses has received your ${this.selectedWeight}oz bespoke build request (Estimate: $${total.toLocaleString()} | 50% Deposit: $${deposit.toLocaleString()}). Antonio will contact you at ${clientEmail} within 24 hours with your formal specification blueprint and deposit invoice.`,
        'chime'
      );
    });
  }
}
