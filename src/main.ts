/**
 * @file main.ts
 * @description Application Entrypoint and Orchestrator for FahCues.
 * Binds the interactive comic gallery, sound effects synthesizer, cue anatomy breakdown,
 * and custom commission form.
 */

import './style.css';
import { CUES_DATA } from './cuesData.ts';
import { ANATOMY_PARTS } from './anatomyData.ts';
import { comicAudio } from './audio.ts';
import { modalManager } from './modal.ts';
import { CommissionController } from './commission.ts';
import type { CueCategory, CueItem } from './types.ts';

class FahCuesApp {
  private activeCategory: CueCategory = 'all';
  private commissionController: CommissionController | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initializes the application components after DOM is loaded.
   */
  public init(): void {
    this.initAudioControls();
    this.renderCuesGrid();
    this.initFilterTabs();
    this.initAnatomyExplorer();
    this.commissionController = new CommissionController();
    this.attachCardTiltPhysics();
    this.initSmoothNav();
  }

  /**
   * Initializes the Comic Sound Effects toggle in the top banner.
   */
  private initAudioControls(): void {
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (!audioBtn) return;

    const updateBtnUi = (isMuted: boolean) => {
      if (isMuted) {
        audioBtn.classList.add('muted');
        audioBtn.innerHTML = `<span>🔇</span> SOUND FX: OFF`;
      } else {
        audioBtn.classList.remove('muted');
        audioBtn.innerHTML = `<span>⚡</span> SOUND FX: ON`;
      }
    };

    updateBtnUi(comicAudio.getMuted());

    audioBtn.addEventListener('click', () => {
      const isMuted = comicAudio.toggleMute();
      updateBtnUi(isMuted);
      if (!isMuted) {
        comicAudio.playCrack();
      }
    });
  }

  /**
   * Renders the filterable Cue Arsenal grid cards.
   */
  private renderCuesGrid(): void {
    const gridEl = document.getElementById('cues-grid');
    if (!gridEl) return;

    const filtered = this.activeCategory === 'all'
      ? CUES_DATA
      : CUES_DATA.filter((cue) => cue.category === this.activeCategory);

    gridEl.innerHTML = filtered.map((cue) => `
      <article class="cue-card" data-id="${cue.id}">
        <div class="card-badge">${cue.badgeText}</div>
        
        <div class="card-image-wrap" data-cue-id="${cue.id}">
          <img src="${cue.image}" alt="${cue.title}" loading="lazy" />
          <div class="card-sound-burst">${cue.soundEffect.toUpperCase()}!</div>
        </div>

        <div class="card-body">
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

          <div class="card-footer">
            <div class="card-price">
              <span>FROM</span>
              $${cue.priceEstimate}
            </div>
            <button class="comic-btn btn-primary inspect-btn" data-cue-id="${cue.id}">
              INSPECT SPECS 🔍
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to cards and inspect buttons
    gridEl.querySelectorAll('.inspect-btn, .card-image-wrap').forEach((el) => {
      el.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const cueId = target.dataset.cueId;
        const cue = CUES_DATA.find((c) => c.id === cueId);
        if (cue) {
          modalManager.openCueModal(cue, (inspectedCue) => {
            this.handleCommissionFromModal(inspectedCue);
          });
        }
      });
    });

    this.attachCardTiltPhysics();
  }

  /**
   * Smoothly scrolls to commission section and pre-fills the style.
   */
  private handleCommissionFromModal(cue: CueItem): void {
    if (this.commissionController) {
      if (cue.category === 'comic-wrap') {
        this.commissionController.prefillWithCueStyle('comic-decoupage');
      } else if (cue.category === 'pop-culture') {
        this.commissionController.prefillWithCueStyle('pop-tribute');
      } else {
        this.commissionController.prefillWithCueStyle('exotic-points');
      }
    }

    const formEl = document.getElementById('commission-section');
    formEl?.scrollIntoView({ behavior: 'smooth' });
    modalManager.showToast('BLUEPRINT LOADED', `Pre-filled configurator for ${cue.title}!`, 'pow');
  }

  /**
   * Initializes the category filter tabs.
   */
  private initFilterTabs(): void {
    const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.category as CueCategory;
        this.activeCategory = cat || 'all';

        comicAudio.playCrack();
        this.renderCuesGrid();
      });
    });
  }

  /**
   * Initializes the Interactive Cue Anatomy Explorer.
   */
  private initAnatomyExplorer(): void {
    const listContainer = document.getElementById('anatomy-buttons-list');
    const displayPanel = document.getElementById('anatomy-display-panel');
    if (!listContainer || !displayPanel) return;

    listContainer.innerHTML = ANATOMY_PARTS.map((part, idx) => `
      <button class="anatomy-part-btn ${idx === 0 ? 'active' : ''}" data-part-id="${part.id}">
        <div class="part-btn-name">${part.name}</div>
        <div class="part-btn-callout">${part.callout}</div>
      </button>
    `).join('');

    const updateDisplay = (part: typeof ANATOMY_PARTS[0]) => {
      displayPanel.innerHTML = `
        <div class="anatomy-physics-title">${part.callout}</div>
        <p class="anatomy-physics-body">${part.physicsExplanation}</p>
        <div class="anatomy-materials-tag">🛠️ MASTER MATERIALS: ${part.materialsUsed}</div>
      `;
    };

    updateDisplay(ANATOMY_PARTS[0]);

    const buttons = listContainer.querySelectorAll<HTMLButtonElement>('.anatomy-part-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const partId = btn.dataset.partId;
        const part = ANATOMY_PARTS.find((p) => p.id === partId);
        if (part) {
          comicAudio.playSwoosh();
          updateDisplay(part);
        }
      });
    });
  }

  /**
   * Adds dynamic 3D perspective tilt effect to cue cards on desktop mousemove.
   */
  private attachCardTiltPhysics(): void {
    const cards = document.querySelectorAll<HTMLElement>('.cue-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /**
   * Smoothly navigates to page sections when clicking header or CTA links.
   */
  private initSmoothNav(): void {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            comicAudio.playCrack();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new FahCuesApp();
});
