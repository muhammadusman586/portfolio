import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { STATIONS } from '../data';
import { play } from '../sound';
import Train from './Train';

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const readFlag = (k: string) => {
  try {
    return localStorage.getItem(k) === '1';
  } catch {
    return false;
  }
};
const setFlag = (k: string) => {
  try {
    localStorage.setItem(k, '1');
  } catch {
    /* ignore */
  }
};

/**
 * The metro line: a vertical rail on the right (lg+) and a horizontal rail along the
 * bottom on smaller screens. One stop per section, a train that follows scroll and can
 * be dragged to scrub, J/K to hop stations, and "now arriving" banners.
 */
const MetroRail = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });
  const trainPos = useTransform(progress, (v) => `${v * 100}%`);
  const ridePct = useTransform(progress, (v) => `RIDE ${Math.round(v * 100)}%`);
  const trail = useTransform(useVelocity(scrollYProgress), [-1.5, 0, 1.5], [1, 0, 1]);

  // Stop positions follow real section offsets, so the train reaches a stop as its section arrives.
  const [stops, setStops] = useState<number[]>(STATIONS.map((_, i) => i / (STATIONS.length - 1)));
  const [active, setActive] = useState(0);
  const [banner, setBanner] = useState<number | null>(null);
  const [grabbed, setGrabbed] = useState(false);
  const [hint, setHint] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const hRailRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const measure = () =>
      setStops(
        STATIONS.map(({ id }) => {
          const el = document.getElementById(id);
          return el ? Math.min(1, el.offsetTop / Math.max(1, maxScroll())) : 0;
        })
      );
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // A station counts as reached once its section's top passes 40% of the viewport.
    const lead = (window.innerHeight * 0.4) / Math.max(1, maxScroll());
    let idx = 0;
    stops.forEach((s, i) => v + lead >= s && (idx = i));
    if (idx !== active) setActive(idx);
  });

  // Announce a station only once the reader settles on it, not while flying past.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) return void (first.current = false);
    const show = setTimeout(() => (setBanner(active), play('chime')), 300);
    const hide = setTimeout(() => setBanner(null), 1700);
    return () => (clearTimeout(show), clearTimeout(hide));
  }, [active]);

  // J / K hop between stations (ignored while typing).
  const activeRef = useRef(active);
  activeRef.current = active;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest?.('input, textarea, [contenteditable="true"]')) return;
      const k = e.key.toLowerCase();
      if (k !== 'j' && k !== 'k') return;
      const next = Math.min(STATIONS.length - 1, Math.max(0, activeRef.current + (k === 'j' ? 1 : -1)));
      goTo(STATIONS[next].id);
      setHint(false);
      setFlag('kbdHint');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Show the keyboard tip once per visitor, on wide screens only.
  useEffect(() => {
    if (readFlag('kbdHint') || !window.matchMedia('(min-width: 1024px)').matches) return;
    const show = setTimeout(() => setHint(true), 2500);
    const hide = setTimeout(() => (setHint(false), setFlag('kbdHint')), 9000);
    return () => (clearTimeout(show), clearTimeout(hide));
  }, []);

  const scrub = (ratio: number) => window.scrollTo({ top: clamp01(ratio) * maxScroll(), behavior: 'instant' });

  const dragProps = (axis: 'x' | 'y') => ({
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      dragging.current = true;
      setGrabbed(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const r = (axis === 'y' ? railRef : hRailRef).current!.getBoundingClientRect();
      scrub(axis === 'y' ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width);
    },
    onPointerUp: () => (dragging.current = false),
  });

  return (
    <>
      {/* vertical rail, lg+ */}
      <nav aria-label="Sections" className="fixed right-8 top-[10vh] z-40 hidden h-[72vh] w-10 select-none lg:block">
        <div ref={railRef} className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 bg-fg" />
        <div className="absolute -bottom-7 left-1/2 h-4 w-8 -translate-x-1/2 border-2 border-ink bg-[repeating-linear-gradient(45deg,#111_0_5px,rgb(var(--signal))_5px_10px)]" />

        {STATIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(s.id)}
            style={{ top: `${stops[i] * 100}%` }}
            className="group focus-ring absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            aria-label={`Go to ${s.label}`}
            aria-current={i === active ? 'step' : undefined}
          >
            <span
              className={`block rounded-full border-[3px] border-ink transition-all duration-300 ${
                i === active ? 'h-6 w-6 bg-signal' : i < active ? 'h-4 w-4 bg-accent' : 'h-4 w-4 bg-paper'
              }`}
            />
            <span
              className={`label pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 whitespace-nowrap shadow-hard-sm transition-opacity ${
                i === active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}

        <motion.div
          style={{ top: trainPos, x: '-50%', y: '-50%' }}
          className="absolute left-1/2 z-10 cursor-grab touch-none active:cursor-grabbing"
          {...dragProps('y')}
          whileHover={{ scale: 1.08 }}
          title="Drag me to ride"
        >
          <motion.div
            style={{ opacity: trail, scaleY: trail, x: '-50%' }}
            className="absolute bottom-1/2 left-1/2 h-24 w-6 origin-bottom bg-[repeating-linear-gradient(90deg,rgb(var(--accent))_0_2px,transparent_2px_6px)]"
          />
          <Train className="relative w-[84px] rotate-90 drop-shadow-[2px_2px_0_#111]" />
          <AnimatePresence>
            {!grabbed && (
              <motion.span
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute right-10 top-12 -rotate-6 whitespace-nowrap font-marker text-sm text-accent"
              >
                grab me &amp; ride ↓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.span className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold tracking-widest">
          {ridePct}
        </motion.span>

        <AnimatePresence>
          {hint && (
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute -bottom-6 right-12 w-max border-2 border-ink bg-paper px-3 py-2 font-mono text-[11px] text-ink shadow-hard-sm"
            >
              Tip: press <kbd className="border border-ink bg-signal px-1 font-bold">J</kbd> /{' '}
              <kbd className="border border-ink bg-signal px-1 font-bold">K</kbd> to hop stations
            </motion.p>
          )}
        </AnimatePresence>
      </nav>

      {/* horizontal rail, below lg */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-40 flex h-14 select-none items-center gap-3 border-t-[3px] border-ink bg-bg/95 px-4 backdrop-blur-sm lg:hidden"
      >
        <span className="w-[5.5rem] shrink-0 truncate font-mono text-[10px] font-bold uppercase tracking-widest">
          {STATIONS[active].label}
        </span>
        <div className="relative h-full flex-1">
          <div ref={hRailRef} className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 bg-fg" />
          {STATIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              style={{ left: `${stops[i] * 100}%` }}
              aria-label={`Go to ${s.label}`}
              aria-current={i === active ? 'step' : undefined}
              className="focus-ring absolute top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            >
              <span
                className={`block rounded-full border-[3px] border-ink ${
                  i === active ? 'h-4 w-4 bg-signal' : i < active ? 'h-3 w-3 bg-accent' : 'h-3 w-3 bg-paper'
                }`}
              />
            </button>
          ))}
          <motion.div
            style={{ left: trainPos, x: '-50%', y: '-50%' }}
            className="absolute top-1/2 z-10 cursor-grab touch-none p-2"
            {...dragProps('x')}
            aria-hidden
          >
            <Train className="w-14 drop-shadow-[2px_2px_0_#111]" />
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {active === STATIONS.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => goTo('home')}
            aria-label="Back to departure"
            title="Back to departure"
            className="btn focus-ring fixed bottom-[72px] right-4 z-40 h-11 w-11 justify-center bg-ink p-0 text-signal lg:bottom-4 lg:right-[30px]"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {banner !== null && (
          <motion.div
            key={banner}
            role="status"
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, y: -30, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="pointer-events-none fixed left-1/2 top-1/3 z-50 -ml-[min(45vw,210px)] w-[min(90vw,420px)] border-b-[6px] border-r-[6px] border-accent bg-ink px-6 py-4 text-center"
          >
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-paper">
              Now arriving · Station #{String(banner).padStart(2, '0')}
            </p>
            <p className="font-display text-4xl uppercase leading-tight text-signal [text-shadow:3px_3px_0_rgb(var(--accent))] sm:text-5xl">
              {STATIONS[banner].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MetroRail;
