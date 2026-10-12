import { useEffect, useState } from 'react';
import { isSoundOn } from './sound';

export const PREFS_EVENT = 'prefschange';

export const THEMES = [
  { id: 'poster', name: 'Poster Pop', note: 'Hot pink · acid lime', sw: ['#FF3EA5', '#E6FF00', '#2D4BFF', '#7AF7FF'] },
  { id: 'london', name: 'London Underground', note: 'Central red · Circle yellow · Piccadilly blue', sw: ['#DC241F', '#FFD329', '#0019A8', '#95CDBA'] },
  { id: 'tokyo', name: 'Tokyo Metro', note: 'Marunouchi red · Ginza orange · Chiyoda green', sw: ['#F62E36', '#FF9500', '#00785A', '#9ADCEB'] },
  { id: 'nyc', name: 'NYC Subway', note: '1/2/3 red · N/Q/R yellow · A/C/E blue', sw: ['#EE352E', '#FCCC0A', '#0039A6', '#6CBE45'] },
] as const;
// Swatches are literal hex because menus show every theme at once; keep in sync with index.css.

export type ThemeId = (typeof THEMES)[number]['id'];

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};
const changed = () => window.dispatchEvent(new Event(PREFS_EVENT));

export const isNight = () => document.documentElement.classList.contains('dark');
export const setNight = (on: boolean) => {
  document.documentElement.classList.toggle('dark', on);
  save('theme', on ? 'dark' : 'light');
  changed();
};

// No data-theme attribute means Poster Pop (index.html sets the default before paint).
export const getPalette = (): ThemeId => (document.documentElement.dataset.theme as ThemeId) || 'poster';
export const setPalette = (id: ThemeId) => {
  if (id === 'poster') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = id;
  save('palette', id);
  changed();
};

export const haptic = (ms = 12) => navigator.vibrate?.(ms);

const readPrefs = () => ({ night: isNight(), palette: getPalette(), sound: isSoundOn() });

export const usePrefs = () => {
  const [prefs, setPrefs] = useState(readPrefs);
  useEffect(() => {
    const sync = () => setPrefs(readPrefs());
    window.addEventListener(PREFS_EVENT, sync);
    return () => window.removeEventListener(PREFS_EVENT, sync);
  }, []);
  return prefs;
};
