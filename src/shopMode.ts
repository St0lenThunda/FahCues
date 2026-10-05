/**
 * @file shopMode.ts
 * @description Operational Mode Orchestrator for FahCues.
 * Allows Antonio Moses to toggle between:
 * 1. 'restomod': The current simpler reality (Bring Your Own Weapon mail-in re-skinning, 10–14 days, $395+).
 * 2. 'boutique': The step-up production model (1-of-1 Vault Drops, master lathe bespoke builds, 8–10 weeks, $1,250+).
 *
 * Implements the Triple-Threat Principle: Single Source of Truth, Modularity, and Efficiency.
 */

import type { ShopMode } from './types.ts';
import { comicAudio } from './audio.ts';

type ModeSubscriber = (mode: ShopMode) => void;

class ShopModeManager {
  /** Single Source of Truth for current operational model */
  private mode: ShopMode = 'restomod';
  /** Subscribers notified on mode transitions (e.g. commission engine, cue cards) */
  private subscribers: ModeSubscriber[] = [];

  constructor() {
    // Check saved preference or default to 'restomod' for immediate craftsman reality demo
    const saved = localStorage.getItem('fahcues_shop_mode') as ShopMode | null;
    if (saved === 'restomod' || saved === 'boutique') {
      this.mode = saved;
    }
  }

  /**
   * Returns current active operational mode.
   */
  public getMode(): ShopMode {
    return this.mode;
  }

  /**
   * Registers a subscriber callback to be invoked whenever mode changes.
   * @param cb - Callback function receiving new ShopMode
   */
  public subscribe(cb: ModeSubscriber): void {
    this.subscribers.push(cb);
  }

  /**
   * Changes the active shop mode, updates DOM state, and notifies listeners.
   * @param nextMode - The target ShopMode ('restomod' or 'boutique')
   * @param playSound - Whether to trigger comic sound effect
   */
  public setMode(nextMode: ShopMode, playSound: boolean = true): void {
    this.mode = nextMode;
    localStorage.setItem('fahcues_shop_mode', nextMode);

    // Update body dataset attribute so CSS can react declaratively
    document.body.dataset.shopMode = nextMode;

    // Update toggle buttons in UI
    this.updateToggleButtonsUI();

    // Update dynamic text tags
    this.updateDeclarativeTextElements();

    if (playSound) {
      if (nextMode === 'boutique') {
        comicAudio.playCrack();
      } else {
        comicAudio.playSwoosh();
      }
    }

    // Notify all subscribed components (commission builder, gallery)
    this.subscribers.forEach((fn) => fn(nextMode));
  }

  /**
   * Initializes the DOM event listeners on the mode switcher buttons.
   */
  public initUI(): void {
    document.body.dataset.shopMode = this.mode;

    const restomodBtn = document.getElementById('mode-btn-restomod');
    const boutiqueBtn = document.getElementById('mode-btn-boutique');

    restomodBtn?.addEventListener('click', () => {
      if (this.mode !== 'restomod') {
        this.setMode('restomod', true);
      }
    });

    boutiqueBtn?.addEventListener('click', () => {
      if (this.mode !== 'boutique') {
        this.setMode('boutique', true);
      }
    });

    this.updateToggleButtonsUI();
    this.updateDeclarativeTextElements();
  }

  /**
   * Synchronizes active state and ARIA attributes on switcher buttons.
   */
  private updateToggleButtonsUI(): void {
    const restomodBtn = document.getElementById('mode-btn-restomod');
    const boutiqueBtn = document.getElementById('mode-btn-boutique');

    if (this.mode === 'restomod') {
      restomodBtn?.classList.add('active');
      restomodBtn?.setAttribute('aria-checked', 'true');
      boutiqueBtn?.classList.remove('active');
      boutiqueBtn?.setAttribute('aria-checked', 'false');
    } else {
      boutiqueBtn?.classList.add('active');
      boutiqueBtn?.setAttribute('aria-checked', 'true');
      restomodBtn?.classList.remove('active');
      restomodBtn?.setAttribute('aria-checked', 'false');
    }
  }

  /**
   * Replaces inner text of DOM elements bearing data-mode-text-restomod and data-mode-text-boutique.
   */
  private updateDeclarativeTextElements(): void {
    const textEls = document.querySelectorAll<HTMLElement>('[data-mode-text-restomod]');
    textEls.forEach((el) => {
      const restomodText = el.getAttribute('data-mode-text-restomod');
      const boutiqueText = el.getAttribute('data-mode-text-boutique');

      if (this.mode === 'restomod' && restomodText) {
        el.textContent = restomodText;
      } else if (this.mode === 'boutique' && boutiqueText) {
        el.textContent = boutiqueText;
      }
    });
  }
}

export const shopModeManager = new ShopModeManager();
