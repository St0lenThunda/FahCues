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

    // Top workshop switcher buttons
    const restomodBtn = document.getElementById('mode-btn-restomod');
    const boutiqueBtn = document.getElementById('mode-btn-boutique');

    // Sticky comic issue banner buttons
    const bannerRestomodBtn = document.getElementById('banner-btn-restomod');
    const bannerBoutiqueBtn = document.getElementById('banner-btn-boutique');

    const handleRestomodClick = (): void => {
      if (this.mode !== 'restomod') {
        this.setMode('restomod', true);
      }
    };

    const handleBoutiqueClick = (): void => {
      if (this.mode !== 'boutique') {
        this.setMode('boutique', true);
      }
    };

    restomodBtn?.addEventListener('click', handleRestomodClick);
    bannerRestomodBtn?.addEventListener('click', handleRestomodClick);

    boutiqueBtn?.addEventListener('click', handleBoutiqueClick);
    bannerBoutiqueBtn?.addEventListener('click', handleBoutiqueClick);

    this.updateToggleButtonsUI();
    this.updateDeclarativeTextElements();

    // Initialize sticky scroll watcher to reveal buttons in comic-issue-banner mid-page
    this.initStickyScrollWatcher();
  }

  /**
   * Watches page scroll position to reveal the quick mode toggle buttons inside the
   * sticky Comic Issue Banner once the user scrolls down mid-page past the top workshop explanation.
   */
  private initStickyScrollWatcher(): void {
    const issueBanner = document.getElementById('comic-issue-banner') || document.querySelector<HTMLElement>('.comic-issue-banner');
    if (!issueBanner) return;

    // Throttle via requestAnimationFrame for 60fps scrolling performance
    let isTicking = false;

    const onScroll = (): void => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          // Reveal buttons in sticky banner once scrolled past the top explanation bar (60px)
          const shouldShowInBanner = window.scrollY > 60;
          if (shouldShowInBanner) {
            issueBanner.classList.add('is-scrolled');
          } else {
            issueBanner.classList.remove('is-scrolled');
          }
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial position on mount in case the browser restored scroll position
    onScroll();
  }

  /**
   * Synchronizes active state and ARIA attributes across all switcher buttons.
   */
  private updateToggleButtonsUI(): void {
    const restomodBtns = [
      document.getElementById('mode-btn-restomod'),
      document.getElementById('banner-btn-restomod'),
    ];
    const boutiqueBtns = [
      document.getElementById('mode-btn-boutique'),
      document.getElementById('banner-btn-boutique'),
    ];

    if (this.mode === 'restomod') {
      restomodBtns.forEach((btn) => {
        btn?.classList.add('active');
        btn?.setAttribute('aria-checked', 'true');
      });
      boutiqueBtns.forEach((btn) => {
        btn?.classList.remove('active');
        btn?.setAttribute('aria-checked', 'false');
      });
    } else {
      boutiqueBtns.forEach((btn) => {
        btn?.classList.add('active');
        btn?.setAttribute('aria-checked', 'true');
      });
      restomodBtns.forEach((btn) => {
        btn?.classList.remove('active');
        btn?.setAttribute('aria-checked', 'false');
      });
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
