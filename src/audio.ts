/**
 * @file audio.ts
 * @description Comic Book Sound Effects Synthesizer using the Web Audio API.
 * Synthesizes dynamic pool cue hits, comic "POW!" punches, and page turns in pure browser code
 * without needing external audio files.
 */

class ComicSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check saved user preference in localStorage
    const saved = localStorage.getItem('fahcues_sound_muted');
    this.isMuted = saved === 'true';
  }

  /**
   * Initializes or resumes the AudioContext after user gesture.
   * Browsers restrict audio autoplay until the first click or tap.
   */
  private initContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Toggles mute state and returns current muted status.
   * @returns boolean - True if currently muted
   */
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('fahcues_sound_muted', String(this.isMuted));
    return this.isMuted;
  }

  /**
   * Checks if sound engine is currently muted.
   */
  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a crisp, instantaneous "CRACK!" sound.
   * Simulates the high-velocity collision between cue tip and billiard ball.
   */
  public playCrack(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Oscillator 1: High frequency square/sine transient for the initial sharp snap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    // Rapid amplitude decay
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Plays a comic "POW!" bass drop effect.
   * Uses frequency modulation to create a cinematic impact thud.
   */
  public playPow(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    // Pitch drops from 220Hz down to 40Hz
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Plays a "SWOOSH!" whoosh effect.
   * Simulates swinging a cue stick or turning a comic book page.
   */
  public playSwoosh(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  /**
   * Plays a bright pop chime for UI confirmations and badge unlocks.
   */
  public playChime(): void {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.16);
    });
  }
}

export const comicAudio = new ComicSoundEngine();
