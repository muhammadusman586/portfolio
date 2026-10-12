import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, TrainFront } from 'lucide-react';
import { play } from '../sound';

// Swatches are literal hex because the menu shows every theme at once, not just the active one.
// Keep in sync with the [data-theme] blocks in index.css.
const THEMES = [
  { id: 'poster', name: 'Poster Pop', note: 'Hot pink · acid lime', sw: ['#FF3EA5', '#E6FF00', '#2D4BFF', '#7AF7FF'] },
  { id: 'london', name: 'London Underground', note: 'Central red · Circle yellow · Piccadilly blue', sw: ['#DC241F', '#FFD329', '#0019A8', '#95CDBA'] },
  { id: 'tokyo', name: 'Tokyo Metro', note: 'Marunouchi red · Ginza orange · Chiyoda green', sw: ['#F62E36', '#FF9500', '#00785A', '#9ADCEB'] },
  { id: 'nyc', name: 'NYC Subway', note: '1/2/3 red · N/Q/R yellow · A/C/E blue', sw: ['#EE352E', '#FCCC0A', '#0039A6', '#6CBE45'] },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];

const current = (): ThemeId => (document.documentElement.dataset.theme as ThemeId) || 'poster';

/** "Choose your line": switches the colour theme; saved per visitor. */
const ThemePicker = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(current);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => (document.removeEventListener('pointerdown', close), document.removeEventListener('keydown', close));
  }, [open]);

  const choose = (id: ThemeId) => {
    setTheme(id);
    if (id === 'poster') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem('palette', id);
    } catch {
      /* storage blocked: choice lasts this visit only */
    }
    play('chime');
  };

  const active = THEMES.find((t) => t.id === theme)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Colour theme: ${active.name}`}
        title="Choose your line"
        className="focus-ring flex h-9 items-center gap-1.5 border-2 border-ink bg-paper px-2 text-ink shadow-hard-sm"
      >
        <TrainFront size={16} />
        <span className="flex">
          {active.sw.slice(0, 3).map((c) => (
            <span key={c} style={{ background: c }} className="-ml-1 h-3.5 w-3.5 rounded-full border-2 border-ink first:ml-0" />
          ))}
        </span>
        <span className="hidden font-mono text-[11px] font-bold uppercase tracking-wider sm:inline">Line</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-50 w-[min(86vw,300px)] origin-top-right border-[3px] border-ink bg-paper p-2 text-ink shadow-hard"
          >
            <p className="px-2 pb-2 pt-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted">Choose your line</p>
            <div role="radiogroup" aria-label="Colour theme" className="space-y-1">
              {THEMES.map((t) => {
                const on = t.id === theme;
                return (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={on}
                    onClick={() => choose(t.id)}
                    className={`focus-ring flex w-full items-center gap-3 border-2 px-2 py-2 text-left transition-colors ${
                      on ? 'border-ink bg-signal/40' : 'border-transparent hover:border-ink'
                    }`}
                  >
                    <span className="grid shrink-0 grid-cols-2 gap-0.5">
                      {t.sw.map((c) => (
                        <span key={c} style={{ background: c }} className="h-3.5 w-3.5 border border-ink" />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-sm font-extrabold">{t.name}</span>
                      <span className="block truncate font-mono text-[10px] text-muted">{t.note}</span>
                    </span>
                    {on && <Check size={16} className="shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;
