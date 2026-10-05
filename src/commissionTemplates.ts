/**
 * @file commissionTemplates.ts
 * @description Pure HTML template generators for the Restomod and Boutique commission forms.
 * Separated to prevent God Component bloat and keep presentation modular.
 */

import {
  STYLES,
  JOINT_PINS,
  SHAFTS,
  WRAPS,
  RESTOMOD_SOURCES,
  RESTOMOD_COVERAGE,
  RESTOMOD_FINISHES
} from './commissionData.ts';

/**
 * Generates the HTML markup for the Restomod (Send-In Re-Skin) intake form.
 */
export function getRestomodFormHtml(total: number, deposit: number): string {
  return `
    <form id="custom-cue-form" class="commission-form restomod-mode">
      <!-- Step 1: Base Cue Sourcing -->
      <fieldset class="form-panel">
        <legend class="panel-legend">1. BASE CUE SOURCING (SEND-IN OR TURNKEY)</legend>
        <div class="style-cards-grid">
          ${RESTOMOD_SOURCES.map((s, idx) => `
            <label class="style-choice-card ${idx === 0 ? 'selected' : ''}">
              <input type="radio" name="restomod-source" value="${s.id}" ${idx === 0 ? 'checked' : ''} />
              <div class="style-choice-header">
                <span class="style-title">${s.name}</span>
                <span class="style-base-price">$${s.priceDelta}</span>
              </div>
              <p class="style-desc">${s.description}</p>
            </label>
          `).join('')}
        </div>
      </fieldset>

      <!-- Step 2: Coverage & Finish -->
      <div class="form-two-col">
        <fieldset class="form-panel">
          <legend class="panel-legend">2. COMIC DECOUPAGE COVERAGE</legend>
          <div class="comic-select-wrap">
            <select id="select-restomod-coverage" class="comic-select">
              ${RESTOMOD_COVERAGE.map((c) => `
                <option value="${c.id}">${c.name} ${c.priceDelta > 0 ? `(+$${c.priceDelta})` : '(Included)'}</option>
              `).join('')}
            </select>
          </div>
          <p class="panel-helper-text">Travis precisely borders the graphic decoupage under the lathe.</p>
        </fieldset>

        <fieldset class="form-panel">
          <legend class="panel-legend">3. PROTECTIVE FINISH ARMOR</legend>
          <div class="comic-select-wrap">
            <select id="select-restomod-finish" class="comic-select">
              ${RESTOMOD_FINISHES.map((f) => `
                <option value="${f.id}">${f.name} ${f.priceDelta > 0 ? `(+$${f.priceDelta})` : '(Standard)'}</option>
              `).join('')}
            </select>
          </div>
          <p class="panel-helper-text">12 hand-buffed coats cured in temperature-regulated drying cabinets.</p>
        </fieldset>
      </div>

      <!-- Step 3: Contact & Comic Story -->
      <fieldset class="form-panel">
        <legend class="panel-legend">4. COLLECTOR CONTACT & COMIC THEME VISION</legend>
        <div class="form-three-col">
          <div class="form-input-group">
            <label for="client-name" class="input-label">YOUR NAME / PLAYER HANDLE *</label>
            <input type="text" id="client-name" class="comic-input" placeholder="e.g. Fast Eddie / Sarah Chen" required />
          </div>
          <div class="form-input-group">
            <label for="client-email" class="input-label">EMAIL ADDRESS *</label>
            <input type="email" id="client-email" class="comic-input" placeholder="player@billiards.com" required />
          </div>
          <div class="form-input-group">
            <label for="client-phone" class="input-label">PHONE / INSTAGRAM HANDLE</label>
            <input type="text" id="client-phone" class="comic-input" placeholder="e.g. @poolshark_official" />
          </div>
        </div>

        <div class="form-input-group full-width-group">
          <label for="custom-notes" class="input-label">WHAT COMIC OR CHARACTER DO YOU WANT ON YOUR CUE? *</label>
          <textarea id="custom-notes" class="comic-textarea" rows="3" placeholder="Tell us your dream story (e.g. '1989 Punisher War Journal issue #1 cover', 'Todd McFarlane Venom panels', or 'Batman vs Joker duel'). We source authentic vintage physical issues."></textarea>
        </div>
      </fieldset>

      <!-- Restomod Policies Banner -->
      <div class="craft-policies-grid">
        <div class="policy-pill">
          <span class="policy-icon">🛡️</span>
          <div>
            <strong>50% Bench Deposit</strong>
            <p>Locks your shop bench slot and immediately funds physical vintage comic curation.</p>
          </div>
        </div>
        <div class="policy-pill">
          <span class="policy-icon">⏱️</span>
          <div>
            <strong>10–14 Day Turnaround</strong>
            <p>Rapid shop execution without waiting for lumber curing. Degas and resin cure are never cut short.</p>
          </div>
        </div>
        <div class="policy-pill">
          <span class="policy-icon">📦</span>
          <div>
            <strong>Packing Guide & Insured Return</strong>
            <p>Antonio emails PVC shipping tube packing instructions and returns your cue tracked & insured.</p>
          </div>
        </div>
      </div>

      <!-- Price Tally & Submission -->
      <div class="commission-footer-banner">
        <div class="price-callout-dual">
          <div class="price-item">
            <span class="callout-label">PROJECTED RE-SKIN ESTIMATE:</span>
            <span id="commission-price-display" class="callout-value">$${total.toLocaleString()}</span>
          </div>
          <div class="price-item deposit-item">
            <span class="callout-label">50% DEPOSIT TO LOCK BENCH:</span>
            <span id="commission-deposit-display" class="callout-value-deposit">$${deposit.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" class="comic-btn btn-primary submit-btn">
          <span class="btn-pow">POW!</span> LOCK IN RESTOMOD BENCH SLOT 🎱
        </button>
      </div>
    </form>
  `;
}

/**
 * Generates the HTML markup for the Boutique (1-of-1 Bespoke Build) form.
 */
export function getBoutiqueFormHtml(total: number, deposit: number): string {
  return `
    <form id="custom-cue-form" class="commission-form boutique-mode">
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
          <div class="comic-select-wrap">
            <select id="select-joint-pin" class="comic-select">
              ${JOINT_PINS.map((p) => `
                <option value="${p.id}">${p.name} (+$${p.priceDelta})</option>
              `).join('')}
            </select>
          </div>
          <p class="panel-helper-text">All joints precision aligned on Travis's lathe for dead-flat face mating.</p>
        </fieldset>

        <fieldset class="form-panel">
          <legend class="panel-legend">3. SHAFT ARCHITECTURE</legend>
          <div class="comic-select-wrap">
            <select id="select-shaft" class="comic-select">
              ${SHAFTS.map((s) => `
                <option value="${s.id}">${s.name} ${s.priceDelta > 0 ? `(+$${s.priceDelta})` : '(Included)'}</option>
              `).join('')}
            </select>
          </div>
          <p class="panel-helper-text">12.5mm Pro Taper standard. Finished with 9-layer Japanese pigskin tip.</p>
        </fieldset>
      </div>

      <!-- Step 3: Handle Wrap & Weight -->
      <div class="form-two-col">
        <fieldset class="form-panel">
          <legend class="panel-legend">4. HANDLE / WRAP DISCIPLINE</legend>
          <div class="comic-select-wrap">
            <select id="select-wrap" class="comic-select">
              ${WRAPS.map((w) => `
                <option value="${w.id}">${w.name} (+$${w.priceDelta})</option>
              `).join('')}
            </select>
          </div>
          <p class="panel-helper-text">Seamless transition rings hand-turned from black phenolic or nickel silver.</p>
        </fieldset>

        <fieldset class="form-panel">
          <legend class="panel-legend">5. WEIGHT & BALANCE (OUNCES)</legend>
          <div class="weight-slider-box">
            <div class="weight-slider-header">
              <span>TARGET PLAYING WEIGHT:</span>
              <span id="weight-display" class="weight-bubble">19.0</span>
              <span>OZ</span>
            </div>
            <input type="range" id="weight-slider" min="18.0" max="21.0" step="0.2" value="19.0" class="comic-slider" />
            <div class="slider-ticks">
              <span>18.0 oz (Speed)</span>
              <span>19.0 oz (Balanced)</span>
              <span>21.0 oz (Heavy Break)</span>
            </div>
          </div>
        </fieldset>
      </div>

      <!-- Step 4: Collector Contact & Vision -->
      <fieldset class="form-panel">
        <legend class="panel-legend">6. COLLECTOR INTAKE & SPECIFICATION NOTES</legend>
        <div class="form-three-col">
          <div class="form-input-group">
            <label for="client-name" class="input-label">COLLECTOR / PLAYER NAME *</label>
            <input type="text" id="client-name" class="comic-input" placeholder="e.g. Marcus Brody" required />
          </div>
          <div class="form-input-group">
            <label for="client-email" class="input-label">EMAIL ADDRESS *</label>
            <input type="email" id="client-email" class="comic-input" placeholder="brody@precisioncues.com" required />
          </div>
          <div class="form-input-group">
            <label for="client-phone" class="input-label">PHONE / WHATSAPP</label>
            <input type="text" id="client-phone" class="comic-input" placeholder="+1 (717) 555-0199" />
          </div>
        </div>

        <div class="form-input-group full-width-group">
          <label for="custom-notes" class="input-label">CUSTOM VISION & COMIC ARC NOTES</label>
          <textarea id="custom-notes" class="comic-textarea" rows="3" placeholder="Describe the comic era, specific artist run (e.g. Frank Miller Daredevil), or custom wood combination for your 1-of-1 build."></textarea>
        </div>
      </fieldset>

      <!-- Craftsman Policies Banner -->
      <div class="craft-policies-grid">
        <div class="policy-pill">
          <span class="policy-icon">🛡️</span>
          <div>
            <strong>50% Deposit Architecture</strong>
            <p>Locks your shop lathe slot and funds raw tonewood acquisition.</p>
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
          <span class="policy-icon">📜</span>
          <div>
            <strong>Certificate of Authenticity (COA)</strong>
            <p>Every piece arrives with an official dual-signed Master Registry COA.</p>
          </div>
        </div>
      </div>

      <!-- Price Tally & Submission -->
      <div class="commission-footer-banner">
        <div class="price-callout-dual">
          <div class="price-item">
            <span class="callout-label">PROJECTED CUSTOM ESTIMATE:</span>
            <span id="commission-price-display" class="callout-value">$${total.toLocaleString()}</span>
          </div>
          <div class="price-item deposit-item">
            <span class="callout-label">50% DEPOSIT TO LOCK BUILD:</span>
            <span id="commission-deposit-display" class="callout-value-deposit">$${deposit.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" class="comic-btn btn-primary submit-btn">
          <span class="btn-pow">POW!</span> TRANSMIT COMMISSION REQUEST ⚡
        </button>
      </div>
    </form>
  `;
}
