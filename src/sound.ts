let ctx: AudioContext | null = null;
let enabled = true;
try {
  enabled = localStorage.getItem('sound') !== 'off';
} catch {
  /* ignore */
}

export const isSoundOn = () => enabled;

export const setSound = (on: boolean) => {
  enabled = on;
  try {
    localStorage.setItem('sound', on ? 'on' : 'off');
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('prefschange')); // PREFS_EVENT inlined to avoid a prefs <-> sound import cycle
};

const tone = (freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.15) => {
  const c = ctx!;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur);
};

const SOUNDS = {
  chime: () => (tone(659, 0, 0.6), tone(523, 0.32, 0.8)),
  punch: () => tone(180, 0, 0.08, 'square', 0.12),
  toot: () => (tone(392, 0, 0.18, 'square', 0.06), tone(392, 0.24, 0.3, 'square', 0.06)),
};

export const play = (name: keyof typeof SOUNDS) => {
  // Browsers block audio until the visitor clicks or types; stay silent until then.
  if (!enabled || (navigator.userActivation && !navigator.userActivation.hasBeenActive)) return;
  ctx ??= new AudioContext();
  SOUNDS[name]();
};
