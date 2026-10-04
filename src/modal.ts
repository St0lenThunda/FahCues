/**
 * @file modal.ts
 * @description Accessible, custom comic-styled Modal and Toast Notification Controller.
 * Adheres strictly to the "No Native Dialogs" rule by replacing all alert() and confirm() calls
 * with themed, animated comic panels and toast overlays.
 */

import type { CueItem } from './types.ts';
import { comicAudio } from './audio.ts';

/**
 * Initializes and manages modal dialogs and notification toasts.
 */
export class ModalManager {
  private cueModalEl: HTMLElement | null = null;
  private toastContainerEl: HTMLElement | null = null;
  private confirmModalEl: HTMLElement | null = null;

  constructor() {
    this.createDomElements();
    this.attachKeyListeners();
  }

  /**
   * Injects the required dialog containers into the document body if not present.
   */
  private createDomElements(): void {
    // 1. Cue Inspector Modal
    let cueModal = document.getElementById('cue-inspector-modal');
    if (!cueModal) {
      cueModal = document.createElement('div');
      cueModal.id = 'cue-inspector-modal';
      cueModal.className = 'comic-modal-overlay';
      cueModal.setAttribute('role', 'dialog');
      cueModal.setAttribute('aria-modal', 'true');
      cueModal.setAttribute('aria-hidden', 'true');
      cueModal.innerHTML = `
        <div class="comic-modal-card">
          <button class="comic-modal-close" id="modal-close-btn" aria-label="Close Inspector">✕</button>
          <div class="comic-modal-body" id="modal-content-area"></div>
        </div>
      `;
      document.body.appendChild(cueModal);

      cueModal.addEventListener('click', (e) => {
        if (e.target === cueModal) {
          this.closeCueModal();
        }
      });

      const closeBtn = cueModal.querySelector('#modal-close-btn');
      closeBtn?.addEventListener('click', () => this.closeCueModal());
    }
    this.cueModalEl = cueModal;

    // 2. Custom Confirmation Modal
    let confirmModal = document.getElementById('comic-confirm-modal');
    if (!confirmModal) {
      confirmModal = document.createElement('div');
      confirmModal.id = 'comic-confirm-modal';
      confirmModal.className = 'comic-modal-overlay';
      confirmModal.setAttribute('role', 'alertdialog');
      confirmModal.setAttribute('aria-modal', 'true');
      confirmModal.setAttribute('aria-hidden', 'true');
      confirmModal.innerHTML = `
        <div class="comic-modal-card confirm-card">
          <div class="comic-speech-badge">TRAVIS SAYS...</div>
          <h3 id="confirm-title" class="confirm-title">HEADS UP!</h3>
          <p id="confirm-message" class="confirm-message"></p>
          <div class="confirm-actions">
            <button id="confirm-cancel-btn" class="comic-btn btn-secondary">CANCEL</button>
            <button id="confirm-ok-btn" class="comic-btn btn-primary">CONFIRM</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);
    }
    this.confirmModalEl = confirmModal;

    // 3. Comic Toast Container
    let toastContainer = document.getElementById('comic-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'comic-toast-container';
      toastContainer.className = 'comic-toast-container';
      document.body.appendChild(toastContainer);
    }
    this.toastContainerEl = toastContainer;
  }

  /**
   * Closes modals when ESC is pressed.
   */
  private attachKeyListeners(): void {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.cueModalEl && this.cueModalEl.classList.contains('active')) {
          this.closeCueModal();
        }
        if (this.confirmModalEl && this.confirmModalEl.classList.contains('active')) {
          this.closeConfirmModal();
        }
      }
    });
  }

  /**
   * Opens the detailed Cue Inspector Modal for a selected cue item.
   * @param cue - CueItem instance containing specs and imagery
   * @param onCommissionClick - Callback when user wants to commission this model
   */
  public openCueModal(cue: CueItem, onCommissionClick?: (cue: CueItem) => void): void {
    if (!this.cueModalEl) return;
    const contentArea = this.cueModalEl.querySelector('#modal-content-area');
    if (!contentArea) return;

    comicAudio.playCrack();

    contentArea.innerHTML = `
      <div class="inspector-grid">
        <div class="inspector-visual">
          <div class="inspector-badge">${cue.badgeText}</div>
          <div class="image-zoom-wrapper" id="modal-zoom-frame">
            <img src="${cue.image}" alt="${cue.title}" class="inspector-img" id="inspector-main-img" />
          </div>
          <div class="zoom-hint">🔍 CLICK IMAGE TO TOGGLE HIGH-RES ZOOM</div>
          
          <div class="inspector-thumbs">
            ${cue.gallery.map((img, i) => `
              <img src="${img}" alt="Thumbnail ${i + 1}" class="thumb-img ${i === 0 ? 'active' : ''}" data-full="${img}" />
            `).join('')}
          </div>
        </div>

        <div class="inspector-details">
          <div class="comic-caption-label">CUE DOSSIER # ${cue.id.toUpperCase()}</div>
          <h2 class="inspector-title">${cue.title}</h2>
          <p class="inspector-subtitle">${cue.subtitle}</p>
          <p class="inspector-story">${cue.story}</p>

          <div class="specs-box">
            <div class="specs-header">⚙️ BLUEPRINT SPECIFICATIONS</div>
            <dl class="specs-list">
              <div class="spec-row"><dt>Joint Pin:</dt><dd>${cue.specs.jointPin}</dd></div>
              <div class="spec-row"><dt>Shaft & Taper:</dt><dd>${cue.specs.shaft}</dd></div>
              <div class="spec-row"><dt>Standard Weight:</dt><dd>${cue.specs.weightOz} oz (Adjustable)</dd></div>
              <div class="spec-row"><dt>Grip / Wrap:</dt><dd>${cue.specs.wrap}</dd></div>
              <div class="spec-row"><dt>Ferrule:</dt><dd>${cue.specs.ferrule}</dd></div>
              <div class="spec-row"><dt>Tip System:</dt><dd>${cue.specs.tip}</dd></div>
              <div class="spec-row"><dt>Protective Coat:</dt><dd>${cue.specs.finish}</dd></div>
            </dl>
          </div>

          <div class="inspector-footer">
            <div class="inspector-price">
              <span class="price-label">STARTING AT</span>
              <span class="price-val">$${cue.priceEstimate}</span>
            </div>
            <button class="comic-btn btn-primary" id="modal-commission-cta">
              COMMISSION SIMILAR BUILD ⚡
            </button>
          </div>
        </div>
      </div>
    `;

    // Handle thumbnail switching
    const thumbs = contentArea.querySelectorAll<HTMLImageElement>('.thumb-img');
    const mainImg = contentArea.querySelector<HTMLImageElement>('#inspector-main-img');
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImg) {
          mainImg.src = thumb.dataset.full || thumb.src;
          comicAudio.playSwoosh();
        }
      });
    });

    // Toggle zoom on image click
    const zoomFrame = contentArea.querySelector('#modal-zoom-frame');
    zoomFrame?.addEventListener('click', () => {
      zoomFrame.classList.toggle('zoomed');
      comicAudio.playSwoosh();
    });

    // Connect Commission Button
    const commissionBtn = contentArea.querySelector('#modal-commission-cta');
    commissionBtn?.addEventListener('click', () => {
      this.closeCueModal();
      if (onCommissionClick) {
        onCommissionClick(cue);
      }
    });

    this.cueModalEl.classList.add('active');
    this.cueModalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the active Cue Inspector Modal.
   */
  public closeCueModal(): void {
    if (!this.cueModalEl) return;
    this.cueModalEl.classList.remove('active');
    this.cueModalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    comicAudio.playSwoosh();
  }

  /**
   * Shows a custom confirmation modal replacing native confirm().
   */
  public showConfirm(title: string, message: string, onConfirm: () => void): void {
    if (!this.confirmModalEl) return;

    const titleEl = this.confirmModalEl.querySelector('#confirm-title');
    const msgEl = this.confirmModalEl.querySelector('#confirm-message');
    const okBtn = this.confirmModalEl.querySelector('#confirm-ok-btn');
    const cancelBtn = this.confirmModalEl.querySelector('#confirm-cancel-btn');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    comicAudio.playCrack();

    const handleOk = () => {
      this.closeConfirmModal();
      onConfirm();
      cleanup();
    };

    const handleCancel = () => {
      this.closeConfirmModal();
      cleanup();
    };

    const cleanup = () => {
      okBtn?.removeEventListener('click', handleOk);
      cancelBtn?.removeEventListener('click', handleCancel);
    };

    okBtn?.addEventListener('click', handleOk);
    cancelBtn?.addEventListener('click', handleCancel);

    this.confirmModalEl.classList.add('active');
    this.confirmModalEl.setAttribute('aria-hidden', 'false');
  }

  /**
   * Closes the confirmation modal.
   */
  public closeConfirmModal(): void {
    if (!this.confirmModalEl) return;
    this.confirmModalEl.classList.remove('active');
    this.confirmModalEl.setAttribute('aria-hidden', 'true');
  }

  /**
   * Displays an animated comic toast notification.
   * @param title - Toast title / header
   * @param message - Toast description
   * @param soundType - Sound to play
   */
  public showToast(title: string, message: string, soundType: 'chime' | 'pow' | 'crack' = 'chime'): void {
    if (!this.toastContainerEl) return;

    if (soundType === 'chime') comicAudio.playChime();
    else if (soundType === 'pow') comicAudio.playPow();
    else comicAudio.playCrack();

    const toast = document.createElement('div');
    toast.className = 'comic-toast';
    toast.innerHTML = `
      <div class="toast-badge">POW!</div>
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-msg">${message}</p>
      </div>
      <button class="toast-close" aria-label="Dismiss">✕</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 250);
    });

    this.toastContainerEl.appendChild(toast);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      if (toast.isConnected) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 250);
      }
    }, 5000);
  }
}

export const modalManager = new ModalManager();
