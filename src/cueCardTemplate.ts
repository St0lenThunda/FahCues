/**
 * @file cueCardTemplate.ts
 * @description Isolated HTML template generator for Cue Arsenal cards.
 * Extracted from main.ts to adhere to the Anti-God Component Rule (< 500 lines)
 * and maintain Single Responsibility for view rendering.
 */

import type { CueItem, ShopMode } from './types.ts';

/**
 * Generates the comic book card HTML for a given custom cue item based on the active ShopMode.
 * 
 * @param cue - The custom cue data item to render
 * @param mode - The active operational mode ('street', 'restomod', or 'boutique')
 * @returns Fully formatted comic card HTML string
 */
export function getCueCardHtml(cue: CueItem, mode: ShopMode): string {
  let badgeHtml = '';
  let statusHtml = '';
  let priceDisplayHtml = '';
  let claimBtnText = 'CLAIM WEAPON 🎱';

  if (mode === 'street') {
    badgeHtml = `<span class="serial-pill">${cue.serialNumber}</span> STREET WRAP RUN`;
    statusHtml = '🔥 READY TO SHIP (INVENTORY IN-SHOP)';
    priceDisplayHtml = `
      <div class="card-price-val">$${(cue.streetPrice || 135).toLocaleString()} <span class="price-mode-tag">COMPLETE CUE</span></div>
      <div class="card-deposit-val">Turnkey Finished • No Waiting • 100% In-Stock</div>
    `;
    claimBtnText = 'BUY CUE NOW 🎱';
  } else if (mode === 'restomod') {
    badgeHtml = `<span class="serial-pill">${cue.serialNumber}</span> ${cue.restomodTag || 'SEND-IN RE-SKIN'}`;
    statusHtml = '🔧 MAIL-IN BENCH OPEN (10–14 DAYS)';
    priceDisplayHtml = `
      <div class="card-price-val">$${(cue.restomodPrice || 425).toLocaleString()} <span class="price-mode-tag">RE-SKIN</span></div>
      <div class="card-deposit-val">50% Deposit: $${(cue.restomodDeposit || 212.5).toFixed(0)} • 10–14 Days</div>
    `;
    claimBtnText = 'TRANSFORM WEAPON 🎱';
  } else {
    badgeHtml = `<span class="serial-pill">${cue.serialNumber}</span> ${cue.badgeText}`;
    statusHtml = (cue.dropStatus === 'available' ? '🟢 1-OF-1 AVAILABLE FOR DISPATCH' : '🔒 RESERVED IN VAULT');
    priceDisplayHtml = `
      <div class="card-price-val">$${cue.priceEstimate.toLocaleString()}</div>
      <div class="card-deposit-val">50% Deposit: $${cue.depositAmount.toLocaleString()}</div>
    `;
    claimBtnText = 'CLAIM WEAPON 🎱';
  }

  const isClaimable = mode === 'street' || mode === 'restomod' || cue.dropStatus === 'available';

  return `
    <article class="cue-card" data-id="${cue.id}">
      <div class="card-badge">
        ${badgeHtml}
      </div>
      
      <div class="card-image-wrap" data-cue-id="${cue.id}">
        <img src="${cue.image}" alt="${cue.title}" loading="lazy" />
        <div class="card-sound-burst">${cue.soundEffect.toUpperCase()}!</div>
      </div>

      <div class="card-body">
        <div class="card-status-pill ${mode === 'street' ? 'available' : (mode === 'restomod' ? 'available' : cue.dropStatus)}">
          ${statusHtml}
        </div>

        <h3 class="card-title">${cue.title}</h3>
        <div class="card-subtitle">${cue.subtitle}</div>
        <p class="card-story-snippet">${cue.story}</p>

        <div class="card-quick-specs">
          <div class="quick-spec-item">
            <span>Joint:</span>
            <strong>${cue.specs.jointPin.split('(')[0]}</strong>
          </div>
          <div class="quick-spec-item">
            <span>Weight:</span>
            <strong>${cue.specs.weightOz} oz</strong>
          </div>
          <div class="quick-spec-item">
            <span>Shaft:</span>
            <strong>${cue.specs.shaft.split(' ')[0]} ${cue.specs.shaft.split(' ')[1] || ''}</strong>
          </div>
        </div>

        <div class="card-footer-stack">
          <div class="card-pricing-row">
            ${priceDisplayHtml}
          </div>

          <div class="card-actions-row">
            <button class="comic-btn btn-primary inspect-btn" data-cue-id="${cue.id}">
              INSPECT SPECS 🔍
            </button>
            ${isClaimable ? `
              <button class="comic-btn btn-secondary claim-btn" data-cue-id="${cue.id}">
                ${claimBtnText}
              </button>
            ` : `
              <button class="comic-btn btn-disabled" disabled>
                RESERVED 🔒
              </button>
            `}
          </div>
        </div>
      </div>
    </article>
  `;
}

