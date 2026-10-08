// Futuristic Web Audio API Sound Synthesizer for FATHIMA NAJHA.OS
// Generates low-latency sci-fi sound effects and atmospheric ambient drone without external audio assets

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted to respect autoplay & user preference
    this.ambientNodes = null;
    this.isAmbientPlaying = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbient();
    } else if (!this.isMuted && !this.isAmbientPlaying) {
      this.startAmbient();
    }
  }

  // Soft sci-fi UI hover chirp
  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore audio glitch
    }
  }

  // Futuristic mechanical/laser click
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  // Deep warp whoosh for camera transitions
  playWarp() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.init();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.2);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.7);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, t);
      filter.frequency.exponentialRampToValueAtTime(1400, t + 0.25);
      filter.frequency.exponentialRampToValueAtTime(150, t + 0.7);
      filter.Q.value = 4;

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.7);
    } catch {}
  }

  // Futuristic boot sequence chime
  playBoot() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.init();
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.25);
      });
    } catch {}
  }

  // Access Granted / Achievement unlock fanfare
  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.init();
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch {}
  }

  // Ambient cyberpunk drone loop
  startAmbient() {
    if (this.isMuted || this.isAmbientPlaying || !this.ctx) return;
    try {
      this.init();
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, t); // A1 note
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110.5, t); // slight detune for cyber warmth

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, t);
      filter.Q.value = 2;

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.025, t + 2.0);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);

      this.ambientNodes = { osc1, osc2, gain };
      this.isAmbientPlaying = true;
    } catch {}
  }

  stopAmbient() {
    if (!this.isAmbientPlaying || !this.ambientNodes) return;
    try {
      const t = this.ctx.currentTime;
      this.ambientNodes.gain.gain.linearRampToValueAtTime(0.0001, t + 0.5);
      setTimeout(() => {
        try {
          this.ambientNodes?.osc1?.stop();
          this.ambientNodes?.osc2?.stop();
          this.ambientNodes = null;
          this.isAmbientPlaying = false;
        } catch {}
      }, 550);
    } catch {
      this.isAmbientPlaying = false;
      this.ambientNodes = null;
    }
  }
}

export const soundManager = new SoundManager();
